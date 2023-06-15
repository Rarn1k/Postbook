import React, { useState, useContext } from "react";
import { Button, Form, Image } from "react-bootstrap";
import axiosService from "../../helpers/axios";
import { getUser } from "../../hooks/user.actions";
import { Context } from "../Layout";

function CreateComment(props) {
  const { postId, refresh } = props;
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({ author: "", body: "", post: "" });

  const { setToaster } = useContext(Context);

  const user = getUser();

  const handleSubmit = (event) => {
    if (form.body) {
      event.preventDefault();
      const createCommentForm = event.currentTarget;
      if (createCommentForm.checkValidity() === false) {
        event.stopPropagation();
      }
      setValidated(true);
      const data = {
        author: user.id,
        body: form.body,
        post: postId,
      };
      axiosService
        .post(`/post/${postId}/comment/`, data)
        .then(() => {
          setForm({ ...form, body: "" });
          setToaster({
            type: "success",
            message: "Комментарий успешно отправлен 🚀",
            show: true,
            title: "Успех",
          });
          refresh();
        })
        .catch(() => {
          setToaster({
            type: "danger",
            message: "Не удалось отправить комментарий",
            show: true,
            title: "Ошибка",
          });
        });
    }
  };

  return (
    <Form
      className="d-flex flex-row justify-content-between"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      data-testid="create-comment-test"
    >
      <Image
        src={user.avatar}
        roundedCircle
        width={48}
        height={48}
        className="my-2"
      />
      <Form.Group className="m-3 w-75">
        <Form.Control
          className="py-2 border-primary"
          as="textarea"
          data-testid="comment-body-field"
          placeholder="Напишите комментарий"
          value={form.body}
          name="body"
          onChange={(e) => setForm({ ...form, body: e.target.value })}
        />
      </Form.Group>
      <div className="m-auto">
        <Button
          variant="primary"
          data-testid="create-comment-submit"
          onClick={handleSubmit}
          size="small"
        >
          Отправить
        </Button>
      </div>
    </Form>
  );
}
export default CreateComment;
