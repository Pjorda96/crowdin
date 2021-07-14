import React from "react";
// import { Link } from "react-router-dom";
import {
  Navbar as RBNavbar,
  Nav,
  Dropdown,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";

import { langAvailables } from "../../services/internationalization/i18n";
// import routes from "../../routes/routes";
import './navbar.scss';

export default function Navbar() {
  const { i18n } = useTranslation();
  // const { t, i18n } = useTranslation();

  function handleLangChange(lang) {
    i18n.changeLanguage(lang);
  }

  return (
    <RBNavbar bg="dark" expand="md">
      <RBNavbar.Brand className="navbar-brand align-middle">crowdin</RBNavbar.Brand>
      <RBNavbar.Toggle aria-controls="basic-navbar-nav" bg="dark" className="navbar-toggle" />
      <RBNavbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {/*<Link to={routes.home.path} className="router-link" >{t(routes.home.label)}</Link>*/}
          {/*TODO: uncomment when tha app has more than one route*/}
        </Nav>
        <Dropdown className="dropdown-language">
          <Dropdown.Toggle variant="transparent" className="dropdown-toggle">
            {i18n.language}
          </Dropdown.Toggle>

          <Dropdown.Menu align={{ md: 'right' }}>
            {
              langAvailables.map(lang => (
                <Dropdown.Item key={lang.name} onClick={() => handleLangChange(lang.name)} className="dropdown-item">
                  {lang.label}
                </Dropdown.Item>
              ))
            }
          </Dropdown.Menu>
        </Dropdown>
      </RBNavbar.Collapse>
    </RBNavbar>
  )
}
