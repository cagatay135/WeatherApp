import React from "react";
import "../style.scss";

import { useTranslation } from "react-i18next";

function Navbar(props) {
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  function changeLanguage(e) {
    i18n.changeLanguage(e.target.value);
  }
  return (
    <header>
      <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
        <a
          href="/"
          className="d-flex align-items-center text-dark text-decoration-none"
        >
          <img
            src="./images/icon.png"
            width={45}
            height={45}
            className="me-2"
            alt="icon"
          ></img>
          <span className="fs-4 mx-2">{t("forecast")}</span>
        </a>
        <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
          <div className="wrapper">
            <div className="toggle">
              <input
                className="toggle-input"
                type="checkbox"
                checked={props.theme === "dark" ? true : false}
                onChange={() => props.switchTheme()}
              />
              <div className="toggle-bg"></div>
              <div className="toggle-switch">
                <div className="toggle-switch-figure"></div>
                <div className="toggle-switch-figureAlt"></div>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div className="text-center mb-3">
        <select
          className="selectpicker"
          data-width="fit"
          onChange={changeLanguage}
        >
          <option value="en">{t("english")}</option>
          <option value="tr">{t("turkish")}</option>
        </select>
      </div>
    </header>
  );
}

export default Navbar;
