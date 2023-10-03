import React, { Fragment } from 'react';

import { logCTA } from '../../utils/client/analytics';
import { apiLogo } from './logos';
const DATAPASS_URL =
  process.env.NEXT_PUBLIC_DATAPASS_URL || 'https://datapass.api.gouv.fr';

export const HEADER_PAGE = {
  APIS: 'apis',
  SERVICES: 'services',
  GUIDES: 'guides',
  ABOUT: 'about',
  ADDAPI: 'addapi',
};

const HEADER = [
  {
    href: '/rechercher-api',
    txt: 'Rechercher une API VNF',
    key: HEADER_PAGE.APIS,
  },
  {
    href: '/ajout-api',
    txt: 'Ajouter une API',
    key: HEADER_PAGE.ADDAPI,
  },
  { href: '/apropos', txt: 'À propos', key: HEADER_PAGE.ABOUT },
];

const Header = ({ headerKey = 'home' }) => {
  return (
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
                  title="Accueil - API VNF"
                >
                </a>
              </div>
            </div>
            <div className="fr-header__tools">
              <div className="fr-header__tools-links">
                <ul className="fr-links-group">
                  <li className="external">
                  <a
                      className="fr-link fr-fi-question-fill"
                      href="/parcours-client?source=header"
                      onClick={() => logCTA('CTA header')}
                    >
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
          >
            <ul className="fr-nav__list">
              {HEADER.map(item => (
                <Fragment key={item.href}>
                  <li
                    className={`fr-nav__item ${
                      headerKey === item.key ? 'current' : ''
                    }`}
                  >
                    <a className="fr-nav__link" href={`${item.href}`}>
                      {item.txt}
                    </a>
                  </li>
                </Fragment>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <style jsx>{`
        a.api-logo {
          display: block;
          width: 160px;
        }
        .fr-nav__list{
          margin-left: 300px;
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
          margin-left: -70px;
          margin-bottom: -8.5rem;
          background-position: 0 -0.0625rem, 0 0, 0 0;
        }
        .fr-logo::before {
          display: block;
          content: "";
          background-repeat: no-repeat, no-repeat, no-repeat;
          background-image: url('../images/api-logo/vnf.svg');
          background-size: contain;
          width: 300px;
          height: 300px; 
        }
        .fr-logo::after {
          background-image: url(none);
        }
      `}</style>
    </header>
  );
};

export default Header;
