import React, { useState, useContext } from "react";
import { Button, Modal, Form, Dropdown } from "react-bootstrap";
import axiosService from "../../helpers/axios";

import { Context } from "../Layout";

function UpdateComment(props) {
  const { postId, comment, refresh } = props;
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    author: comment.author.id,
    body: comment.body,
    post: postId,
  });

  const { setToaster } = useContext(Context);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updateCommentForm = event.currentTarget;

    if (updateCommentForm.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    const data = {
      author: form.author,
      body: form.body,
      post: postId,
    };

    axiosService
      .put(`/post/${postId}/comment/${comment.id}/`, data)
      .then(() => {
        handleClose();
        setToaster({
          type: "success",
          message: "Комментарий отредактирован 🚀",
          show: true,
          title: "Успех",
        });
        refresh();
      })
      .catch(() => {
        setToaster({
          type: "danger",
          message: "Не удалось отредактировать комментарий",
          show: true,
          title: "Ошибка",
        });
      });
  };

  return (
    <>
      <Dropdown.Item data-testid="show-modal-form" onClick={handleShow}>
        Редактировать
      </Dropdown.Item>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="border-0">
          <Modal.Title>Редактировать комментарий</Modal.Title>
        </Modal.Header>
        <Modal.Body className="border-0">
          <Form
            data-testid="update-comment-test"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Form.Group className="mb-3">
              <Form.Control
                name="body"
                value={form.body}
                data-testid="comment-body-field"
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                as="textarea"
                rows={3}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            data-testid="update-comment-submit"
            variant="primary"
            onClick={handleSubmit}
          >
            Редактировать
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateComment;
