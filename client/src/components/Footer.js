import React from "react";

import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="pt-4 my-md-5 pt-md-5 border-top text-center">
      <div className="row">
        <div className="col-sm-12">
          <h5>{t("created")}</h5>
          <ul className="list-unstyled text-small">
            <li className="mb-1">
              <a
                className="link-secondary text-decoration-none"
                href="https://github.com/cagatay135"
              >
                Çağatay Çürük
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
