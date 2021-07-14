import React from "react";
import { Modal as RBModal, Button } from "react-bootstrap";

export default function Modal(props) {
  const {
    show,
    title,
    description,
    cancelLabel,
    successLabel,
    onHide,
    onSuccess,
  } = props;

  return (
    <RBModal show={show} onHide={onHide}>
      <RBModal.Header closeButton><RBModal.Title>{title}</RBModal.Title></RBModal.Header>

      <RBModal.Body><p>{description}</p></RBModal.Body>

      <RBModal.Footer>
        <Button variant="secondary" onClick={onHide}>{cancelLabel}</Button>
        <Button variant="danger" onClick={onSuccess}>{successLabel}</Button>
      </RBModal.Footer>
    </RBModal>
  )
}
