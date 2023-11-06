import React from 'react';

import { apiLogo } from './logos';
import { logCTA } from '../../utils/client/analytics';

const DocHeader = () => (
  <header role="banner" className="fr-header">
    <div className="fr-header__body">
      <div className="fr-container">
        <div className="fr-header__body-row">
          <div className="fr-header__brand fr-enlarge-link">
            <div className="fr-header__brand-top">
              <div className="fr-header__logo">
                <p className="fr-logo">
                  Voies Navigables
                  <br />
                  De France
                </p>
              </div>
              <div className="fr-header__navbar">
                <button
                  className="fr-btn--menu fr-btn"
                  data-fr-opened="false"
                  aria-controls="modal-833"
                  aria-haspopup="menu"
                  title="Menu"
                >
                  Menu
                </button>
              </div>
            </div>
            <div className="fr-header__service">
              <a
                className="api-logo"
                href="/"
                title="Accueil - VNF API"
              >
              </a>
              <p className="fr-header__service-tagline">
                Documentation technique
              </p>
            </div>
          </div>
          <div className="fr-header__tools">
            <div className="fr-header__tools-links">
              <ul className="fr-links-group">
                <li className="external">
                  <a
                    className="fr-link fr-fi-question-fill"
                    href="/parcours-client?source=header"
                    onClick={() => logCTA('CTA header')}>
                    Une question ?
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      className="fr-header__menu fr-modal"
      id="modal-833"
      aria-labelledby="button-834"
    >
      <div className="fr-container">
        <button className="fr-link--close fr-link" aria-controls="modal-833">
          Fermer
        </button>
        <div className="fr-header__menu-links"></div>
        <nav
          className="fr-nav"
          id="navigation-832"
          role="navigation"
          aria-label="Menu principal"
        ></nav>
      </div>
    </div>

    <style jsx>{`
      a.api-logo {
        display: block;
        width: 140px;
      }

      .fr-header__service-tagline {
        font-weight: bold;
        font-size: 0.8rem;
        font-variant: small-caps;
      }

      .fr-logo {
        margin-top: -60px;
        --is-link: false;
        display: inline-block;
        padding: 1em;
        font-weight: 700;
        line-height: 1.03175em;
        letter-spacing: -0.01em;
        text-transform: uppercase;
        vertical-align: middle;
        text-indent: -0.1em;
        color: var(--g800);
        font-size: 1.05rem;
        margin-bottom: -50px;
        margin-left: -15px;
      }
      .fr-logo::before {
        margin-left: -20px;
        margin-bottom: -6rem;
        background-position: 0 -0.0625rem, 0 0, 0 0;
      }
      .fr-logo::before {
        display: block;
        content: "";
        background-repeat: no-repeat, no-repeat, no-repeat;
        background-image: url('../images/api-logo/vnf.svg');
        background-size: contain;
        width: 200px;
        height: 200px; 
      }
      .fr-logo::after {
        background-image: url(none);
      }
    `}</style>
  </header>
);

export default DocHeader;
