import React from 'react'
import '../style.scss';

import { useTranslation } from 'react-i18next';

function Navbar(props) {
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  function changeLanguage(e) {
    console.log(e.target.value)
    i18n.changeLanguage(e.target.value);
  }
  return (
    <header>
    <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
      <a href="/" className="d-flex align-items-center text-dark text-decoration-none">
        <img src='https://cdn-icons.flaticon.com/png/512/1982/premium/1982530.png?token=exp=1647460402~hmac=da75ea7d0361b6f2d738eab986a149d2' width={40} height={40} className="me-2"></img>
        <span className="fs-4 mx-2">{t('forecast')}</span>
      </a>
      <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
        <div class="wrapper">
        <div class="toggle">
          <input class="toggle-input" type="checkbox" onClick={()=> props.switchTheme()}/>
          <div class="toggle-bg"></div>
          <div class="toggle-switch">
            <div class="toggle-switch-figure"></div>
            <div class="toggle-switch-figureAlt"></div>
          </div>  
        </div>
      </div>
      </nav>
    </div>
    <div className='text-center mb-3'>
      <select className="selectpicker" data-width="fit" onChange={changeLanguage}>
            <option value='en'>English</option>
            <option value='tr'>Turkish</option>
      </select>
    </div>
    
  </header>
  )
}

export default Navbar