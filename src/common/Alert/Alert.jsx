import React from "react";
import { Alert as RBAlert } from 'react-bootstrap';
import './alert.scss';

export default function Alert ({ show, label, variant }) {
  return (
    <RBAlert variant={variant} show={show} className="alert">
      {label}
    </RBAlert>
  )
}
