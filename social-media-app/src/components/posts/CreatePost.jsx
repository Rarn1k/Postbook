import React, { useState, useContext } from "react";
import { Button, Form } from "react-bootstrap";
import axiosService from "../../helpers/axios";
import { getUser } from "../../hooks/user.actions";
import { Context } from "../Layout";

function CreatePost(props) {
  const { refresh } = props;
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({ author: "", body: "" });
  const { setToaster } = useContext(Context);

  const user = getUser();

  const handleSubmit = (event) => {
    if (form.body) {
      event.preventDefault();
      const createPostForm = event.currentTarget;
      if (createPostForm.checkValidity() === false) {
        event.stopPropagation();
      }
      setValidated(true);
      const data = {
        author: user.id,
        body: form.body,
      };

      axiosService
        .post("/post/", data)
        .then(() => {
          setToaster({
            type: "success",
            message: "Запись опубликована 🚀",
            show: true,
            title: "Успех",
          });
          setForm({...form, body: ""});
          refresh();
        })
        .catch((error) => {
          setToaster({
            type: "danger",
            message: "Не удалось опубликовать запись",
            show: true,
            title: "Ошибка",
          });
        });
    }
  };
  return (
    <>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="w-100 my-3"
        data-testid="create-post-form"
      >
        <Form.Group>
          <Form.Control
            name="body"
            className="border-primarytext-primary"
            value={form.body}
            data-testid="post-body-field"
            as="textarea"
            placeholder="Поделитесь своими мюслями"
            onChange={(e) => setForm({ ...form, body: e.target.value })}
          />
        </Form.Group>
      </Form>
      <Button
        variant="primary"
        onClick={handleSubmit}
        data-testid="create-post-submit"
        className="my-2"
      >
        Опубликовать
      </Button>
    </>
  );
}
export default CreatePost;
