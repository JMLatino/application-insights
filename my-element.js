/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { LitElement, html, css } from 'lit';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';


const appInsights = new ApplicationInsights({
  config: {
    
  },
});

appInsights.config.instrumentationKey = '6aaa2b34-7484-4df5-bae0-4036f120703d';
appInsights.loadAppInsights();

/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class MyElement extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        border: solid 1px gray;
        padding: 16px;
        max-width: 800px;
      }
    `;
  }

  static get properties() {
    return {
      /**
       * The name to say "Hello" to.
       * @type {string}
       */
      name: { type: String },

      /**
       * The number of times the button has been clicked.
       * @type {number}
       */
      count: { type: Number },
    };
  }

  constructor() {
    super();
    this.name = 'World';
    this.count = 0;
    this.players = [
      { name: 'Ronaldo', img: 'https://cdn.nos.nl/image/2022/11/24/919035/768x576a.jpg' },
      { name: 'Messi', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Lionel_Messi_WC2022.jpg/640px-Lionel_Messi_WC2022.jpg' },
      { name: 'Mbappé', img: 'https://ronaldo.com/wp-content/uploads/2019/09/GettyImages-1159265415.jpg' },
      { name: 'Neymar', img: 'https://media.nu.nl/m/2m2x54gamlhw_wd854/neymar.jpg' },
      { name: 'de Jong', img: 'https://vp.cdn.pxr.nl/news/2022/12/20/v2_large_97d9760e1867827bd773a20a4af2cff37de5314c.jpg' },
      { name: 'Hakimi', img: 'https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/bltf4389e5af01ea4c3/60dab80f892a730f58805a04/ae5d85fe4883d988d81024996c9b8892d664c4e4.jpg' },
      { name: 'Modrić', img: 'https://img.a.transfermarkt.technology/portrait/header/27992-1661426133.jpg?lm=1' },

    ];
    this.selectedPlayer = '';
    appInsights.startTrackPage('players overview')
  }

  firstUpdated(){
    appInsights.stopTrackPage('players overview');
  }

  render() {
    return html`
    ${this.players
        .map(
          player => this.selectedPlayer === player.name
            ? html`
          <div ><button class="btn-primary" @click="${() => this.setPlayer(player.name)}">
            <h5 class="card-title">${player.name}</h5>
            <img width="200" src="${player.img}" class="card-img-top" >
          </button></div>
          `
            : ``)
      }
      ${this.players
        .map(
          player =>  html`
          <button @click="${() => this.setPlayer(player.name)}">
            <h5 class="card-title">${player.name}</h5>
            <img width="200" src="${player.img}" class="card-img-top" >
          </button>
          `
          )
      }
      `
    // return html`
    //   <h1>Request Insurance</h1>
    //   <label>Name</label> </br>
    //   <input type="text" /> </br>
    //   <label>Date of birth</label> </br>
    //   <input type="date" /> </br>
    //   <label>Insurance date</label> </br>
    //   <input type="month" /> </br>
    //   <slot></slot>
    // `;
  }


  setPlayer(name) {
    this.selectedPlayer = name;
    appInsights.trackEvent({ name: 'player selected', properties: {selectedPlayer: name}})
    appInsights.trackEvent({ name: 'player selected', properties: {selectedPlayer: name}})
    this.requestUpdate();
  }
  _onClick() {
    this.count++;
    this.dispatchEvent(new CustomEvent('count-changed'));
  }

  /**
   * Formats a greeting
   * @param name {string} The name to say "Hello" to
   * @returns {string} A greeting directed at `name`
   */
  sayHello(name) {
    return `Hello, ${name}`;
  }
}

window.customElements.define('my-element', MyElement);
