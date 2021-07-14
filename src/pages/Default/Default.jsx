import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { ListGroup, Form, Button, Col, Row } from 'react-bootstrap';
import {
  getTodoAction,
  addTodoAction,
  setCheckAction,
  deleteTodoAction,
  deleteCheckedAction,
} from "../../global/reducers/todoSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Spinner from "../../common/Spinner";
import Alert from "../../common/Alert";
import Modal from "../../common/Modal";
import './default.scss';

export default function Default() {
  const { t } = useTranslation();
  const todo = useSelector(state => state.todoList.todo);
  const inProgress = useSelector(state => state.todoList.inProgress);
  const error = useSelector(state => state.todoList.error);
  const dispatch = useDispatch();
  const [ newTodo, setNewTodo ] = useState('');
  const [ added, setAdded ] = useState(false);
  const [ newError, setNewError ] = useState('');
  const [ deleteWarning, setDeleteWarning ] = useState(null);
  const [ deleteChecked, setDeleteChecked ] = useState(false);

  const formInvalid = newError && !newTodo;

  useEffect(() => {
    getTodo();
  // eslint-disable-next-line
  }, []);

  function getTodo() {
    dispatch(getTodoAction());
  }

  function handleSubmit(e) {
    e.preventDefault();
    setNewError('');

    if(!newTodo) {
      setNewError(t('default.newError'))
    } else {
      setAdded(true)
      setNewTodo('');
      dispatch(addTodoAction(newTodo));
      setTimeout(() => setAdded(false), 3000);
    }
  }

  function handleCheck(id) {
    dispatch(setCheckAction(id));
  }

  function handleDeleteOne(id, check) {
    if (check) {
      dispatch(deleteTodoAction(id));
    } else {
      setDeleteWarning(id);
    }
  }

  function handleModal() {
    dispatch(deleteTodoAction(deleteWarning));
    setDeleteWarning(null);
  }

  function handleDeleteChecked() {
    dispatch(deleteCheckedAction(deleteWarning));
    setDeleteChecked(false);
  }

  function renderList() {
    return !todo || !todo.length
      ? <p>{t('default.empty')}</p>
      : (
        <ListGroup className="list-group">
          {
            todo.map(({id, title, check}) => (
              <ListGroup.Item key={id}>
                <Row>
                  <Col xs={1}>
                    <Form.Check
                      type="checkbox"
                      checked={check}
                      className="item-check"
                      onChange={() => handleCheck(id)}
                    />
                  </Col>

                  <Col xs={10}>
                    <span className={check ? 'checked' : ''}>{title}</span>
                  </Col>

                  <Col xs={1}>
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className="delete-icon"
                      onClick={() => handleDeleteOne(id, check)}
                    />
                  </Col>
                </Row>
              </ListGroup.Item>
            ))
          }
        </ListGroup>
      )
  }

  return (
    <div className="container-fluid col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
      <h1 className="title">{t('default.title')}</h1>

      <Form onSubmit={handleSubmit} className="add-form w-100">
        <Form.Group>
          <Form.Row>
            <Col xs={9} md={6}>
              <Form.Control
                type="text"
                placeholder={t('default.todoTitle')}
                value={newTodo}
                className="add-input"
                onChange={e => setNewTodo(e.currentTarget.value)}
                // required
                isInvalid={formInvalid}
              />
              <Form.Control.Feedback type="invalid">
                {newError}
              </Form.Control.Feedback>
            </Col>

            <Col xs={3}>
              <Button type="submit" className="w-100">
                {t('default.add')}
              </Button>
            </Col>

            <Col xs={12} md={3} className="mt-2 mt-md-0">
              <Button className="w-100" onClick={() => setDeleteChecked(true)}>
                {t('default.deleteChecked')}
              </Button>
            </Col>
          </Form.Row>
        </Form.Group>
      </Form>

      {
        inProgress ? <Spinner /> : renderList()
      }

      <Modal
        show={!!deleteWarning}
        title={t('default.modalWarning.title')}
        description={t('default.modalWarning.description')}
        cancelLabel={t('default.modalWarning.buttons.cancel')}
        successLabel={t('default.modalWarning.buttons.success')}
        onHide={() => setDeleteWarning(null)}
        onSuccess={handleModal}
      />
      <Modal
        show={!!deleteChecked}
        title={t('default.modalChecked.title')}
        description={t('default.modalChecked.description')}
        cancelLabel={t('default.modalChecked.buttons.cancel')}
        successLabel={t('default.modalChecked.buttons.success')}
        onHide={() => setDeleteChecked(false)}
        onSuccess={handleDeleteChecked}
      />

      <Alert show={added} label={t('default.success')} variant={'success'} />
      <Alert show={!!error} label={error} variant={'danger'} />
    </div>
  )
}
