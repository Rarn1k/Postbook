import React, { useState, useContext } from "react";
import { Form, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useUserActions } from "../../hooks/user.actions";
import { Context } from "../Layout";

function UpdateProfileForm(props) {
  const { profile } = props;

  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState(profile);
  const [error, setError] = useState(null);
  const userActions = useUserActions();

  const [avatar, setAvatar] = useState();

  const { setToaster } = useContext(Context);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updateProfileForm = event.currentTarget;

    if (updateProfileForm.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    const data = {
      first_name: form.first_name,
      last_name: form.last_name,
      bio: form.bio,
    };

    const formData = new FormData();

    // Checking for null values in the form and removing it.

    Object.keys(data).forEach((key) => {
      if (data[key]) {
        formData.append(key, data[key]);
      }
    });

    if (avatar) {
      formData.append("avatar", avatar);
    }

    userActions
      .edit(formData, profile.id)
      .then(() => {
        setToaster({
          type: "success",
          message: "Профиль успешно редактирован 🚀",
          show: true,
          title: "Профиль редактирован",
        });
        navigate(-1);
      })
      .catch((err) => {
        if (err.message) {
          setError(err.request.response);
        }
      });
  };
  return (
    <Form
      id="registration-form"
      className="border p-4 rounded"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <Form.Group className="mb-3 d-flex flex-column">
        <Form.Label className="text-center">Фотография профиля</Form.Label>
        <Image
          src={form.avatar}
          roundedCircle
          width={120}
          height={120}
          className="m-2 border border-primary border-2 align-self-center"
        />
        <Form.Control
          onChange={(e) => setAvatar(e.target.files[0])}
          className="w-50 align-self-center"
          type="file"
          size="sm"
        />
        <Form.Control.Feedback type="invalid">
          Данное поле обязательно.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Имя</Form.Label>
        <Form.Control
          value={form.first_name}
          onChange={(e) => setForm({ ...form, first_name: e.target.value })}
          required
          type="text"
          placeholder="Введите имя"
        />
        <Form.Control.Feedback type="invalid">
        Данное поле обязательно.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Фамилия</Form.Label>
        <Form.Control
          value={form.last_name}
          onChange={(e) => setForm({ ...form, last_name: e.target.value })}
          required
          type="text"
          placeholder="Введите фамилию"
        />
        <Form.Control.Feedback type="invalid">
        Данное поле обязательно.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Информация о себе</Form.Label>
        <Form.Control
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
          as="textarea"
          rows={3}
          placeholder="Введите информацию о себе ... (по желанию)"
        />
      </Form.Group>

      <div className="text-content text-danger">{error && <p>{error}</p>}</div>

      <Button variant="primary" type="submit">
        Сохранить изменения
      </Button>
    </Form>
  );
}

export default UpdateProfileForm;