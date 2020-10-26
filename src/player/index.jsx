import React, { Component } from 'react';
import { Player, PlayerEvent } from 'bitmovin-player/modules/bitmovinplayer-core';
import EngineBitmovinModule from 'bitmovin-player/modules/bitmovinplayer-engine-bitmovin';
import MseRendererModule from 'bitmovin-player/modules/bitmovinplayer-mserenderer';
import HlsModule from 'bitmovin-player/modules/bitmovinplayer-hls';
import AbrModule from 'bitmovin-player/modules/bitmovinplayer-abr';
import ContainerTSModule from 'bitmovin-player/modules/bitmovinplayer-container-ts';
import PolyfillModule from 'bitmovin-player/modules/bitmovinplayer-polyfill';
import StyleModule from 'bitmovin-player/modules/bitmovinplayer-style';
import XmlModule from 'bitmovin-player/modules/bitmovinplayer-xml';
import DashModule from 'bitmovin-player/modules/bitmovinplayer-dash';
import { UIFactory } from 'bitmovin-player/bitmovinplayer-ui';
import 'bitmovin-player/bitmovinplayer-ui.css';

Player.addModule(EngineBitmovinModule);
Player.addModule(MseRendererModule);
Player.addModule(HlsModule);
Player.addModule(AbrModule);
Player.addModule(ContainerTSModule);
Player.addModule(PolyfillModule);
Player.addModule(StyleModule);
Player.addModule(XmlModule);
Player.addModule(DashModule);

class BitmovinPlayer extends Component {
  constructor(props) {
    super(props);

    this.setContainerElement = containerElement => {
      this.containerElement = containerElement;
    };
  }

  componentDidMount() {
    this.buildPlayer();
    this.loadSource();
  }
  
  componentWillUnmount() {
    this.destroyPlayer();
  }
  
  buildPlayer() {
    const config = {
      style: {
        width: '800px',
        aspectratio: '16/9'
      },
      key: process.env.REACT_BITMOVIE_LICENSE
    };
    this.player = new Player(this.containerElement, config);
    this.addPlayerEventListeners();
    this.buildUI();
  }

  addPlayerEventListeners() {
    this.player.on(PlayerEvent.Playing, () => console.log('player is playing'));
  }

  buildUI() {
    UIFactory.buildDefaultUI(this.player);
  }

  loadSource() {
    const source = {
      "title": "Art of Motion",
      "description": "What is this event... Parcour?",
      "hls": "//bitmovin-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8",
      "progressive": "//bitmovin-a.akamaihd.net/content/MI201109210084_1/MI201109210084_mpeg-4_hd_high_1080p25_10mbits.mp4"
    };
  
    this.player.load(source);
  }

  destroyPlayer() {
    this.player.destroy();
  }

  render() {
    return (
      <div className="bitmovin-player" ref={this.setContainerElement} />
    );
  }
}

export default BitmovinPlayer;