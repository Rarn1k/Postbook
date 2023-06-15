import React, { useContext, useState } from "react";
import { Button, Modal, Form, Dropdown } from "react-bootstrap";
import axiosService from "../../helpers/axios";
import { Context } from "../Layout";

function UpdatePost(props) {
  const { post, refresh } = props;
  const [show, setShow] = useState(false);
  const { setToaster } = useContext(Context);
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    author: post.author.id,
    body: post.body,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatePostForm = event.currentTarget;

    if (updatePostForm.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    const data = {
      author: form.author,
      body: form.body,
    };
    axiosService
      .put(`/post/${post.id}/`, data)
      .then(() => {
        handleClose();
        setToaster({
          type: "success",
          message: "Запись отредактирована 🚀",
          show: true,
          title: "Успех",
        });
        refresh();
      })
      .catch(() => {
        setToaster({
          type: "danger",
          message: "Не удалось отредактировать запись",
          show: true,
          title: "Ошибка",
        });
      });
  };
  return (
    <>
      <Dropdown.Item data-testid="show-modal-form" onClick={handleShow}>Редактировать</Dropdown.Item>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="border-0">
          <Modal.Title>Редактировать запись</Modal.Title>
        </Modal.Header>
        <Modal.Body className="border-0">
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            data-testid="update-post-form"
          >
            <Form.Group className="mb-3">
              <Form.Control
                name="body"
                value={form.body}
                data-testid="post-body-field"
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                as="textarea"
                rows={3}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            data-testid="update-post-submit"
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
export default UpdatePost;
