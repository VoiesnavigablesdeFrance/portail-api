const Footer = () => {
  return (
    <footer className="fr-footer" role="contentinfo">
      <div className="fr-footer__top">
        <div className="fr-container">
          <div className="fr-grid-row fr-grid-row--start fr-grid-row--gutters">
            <div className="fr-col-12 fr-col-sm-3 fr-col-md-2">
              <a className="fr-footer__top-link" href="/feuille-de-route">
                Notre feuille de route
              </a>
            </div>
            <div className="fr-col-12 fr-col-sm-3 fr-col-md-2">
              <a className="fr-footer__top-link" href="/equipe">
                Notre équipe
              </a>
            </div>
            {/*<div className="fr-col-12 fr-col-sm-3 fr-col-md-2">
              <a className="fr-footer__top-link" href="/statistiques">
                Nos chiffres clés
              </a>
            </div>*/}
          </div>
        </div>
      </div>
      <div className="fr-container">
        <div className="fr-footer__body">
          <div className="fr-footer__brand fr-enlarge-link">
            <a href="/" title="Retour à l’accueil">
              <p className="fr-logo" title="Voies Navigables De France">
                Voies Navigables
                <br />
                De France
              </p>
            </a>
            <div className="footer__social">
              <a href="https://twitter.com/vnf_officiel" title="Twitter">
                <img
                  src="/images/social/twitter.svg"
                  alt="Twitter"
                  className="icon icon-twitter"
                />
              </a>
              <a
                href="https://www.linkedin.com/company/voies-navigables-de-france/"
                title="Linkedin"
              >
                <img
                  src="/images/social/linkedin.svg"
                  alt="Linkedin"
                  className="icon icon-linkedin"
                />
              </a>
              <a href="http://www.facebook.com/vnf.fr" title="Facebook">
                <img
                  src="/images/social/facebook.svg"
                  alt="Facebook"
                  className="icon icon-github"
                />
              </a>
              <a href="/contact" title="Nous contacter">
                <img
                  src="/images/social/email.svg"
                  alt="Email"
                  className="icon icon-mail"
                />
              </a>
            </div>
          </div>
          <div className="fr-footer__content">
            <p className="fr-footer__content-desc">
              Créé en 2023, <a href="/">api.vnf.fr</a> est le site qui
              référence les API de VNF, mises à la disposition pour construire
              des services informatiques.
            </p>
          </div>
        </div>
        
        <div className="fr-footer__bottom">
          <ul className="fr-footer__bottom-list">
            <li className="fr-footer__bottom-item">
              <a className="fr-footer__bottom-link" href="/mentions-legales">
                Mentions Légales
              </a>
            </li>
            <li className="fr-footer__bottom-item">
              <a className="fr-footer__bottom-link" href="/accessibilite">
                Accessibilité : non-conforme
              </a>
            </li>
            <li className="fr-footer__bottom-item">
              <a className="fr-footer__bottom-link" href="/contact/">
                Nous contacter
              </a>
            </li>
            <li className="fr-footer__bottom-item">
              <a className="fr-footer__bottom-link" href="/documentation">
                Documentation des API
              </a>
            </li>
          </ul>
        </div>
      </div>
      <style jsx>{`
        .footer__social {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: end;
          margin-left: 40px;
        }
        .fr-footer .footer__social a {
          margin-right: 1rem;
        }
        .fr-footer .fr-footer__brand a:before {
          display: none;
        }

        .fr-footer .footer__social .icon {
          width: 20px;
          height: 20px;
        }

        .fr-footer__partners-sub ul li > a {
          height: auto;
          width: auto;
          font-weight: bold;
          font-size: 0.9rem;
          margin-right: 20px;
        }
        .fr-logo {
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
          margin-bottom: 0;
        }
        .fr-logo::before {
          width: 2.75rem;
          height: 1rem;
          margin-bottom: -1.5rem;
          background-size: 2.75rem 1.125rem, 2.75rem 1rem, 0;
          background-position: 0 -0.0625rem, 0 0, 0 0;
        }
        .fr-logo::before {
          display: block;
          content: "";
          background-repeat: no-repeat, no-repeat, no-repeat;
          background-image: url('../images/api-logo/vnf3.svg');
          background-size: contain;
          width: 100px;
          height: 100px; 
        }
        .fr-logo::after {
          background-image: url(none);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
