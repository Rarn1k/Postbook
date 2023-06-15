import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useUserActions } from "../../hooks/user.actions";

function RegistrationForm() {
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    bio: "",
  });
  const [error, setError] = useState(null);
  const userActions = useUserActions();

  const handleSubmit = (event) => {
    event.preventDefault();
    const registrationForm = event.currentTarget;

    if (registrationForm.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);

    const data = {
      username: form.username,
      password: form.password,
      email: form.email,
      first_name: form.first_name,
      last_name: form.last_name,
      bio: form.bio,
    };
    userActions.register(data).catch((err) => {
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
      data-testid="register-form"
    >
      <Form.Group className="mb-3">
        <Form.Label>Имя</Form.Label>
        <Form.Control
          value={form.first_name}
          data-testid="first-name-field"
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
          data-testid="last-name-field"
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
        <Form.Label>Логин</Form.Label>
        <Form.Control
          value={form.username}
          data-testid="username-field"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
          type="text"
          placeholder="Введите логин"
        />
        <Form.Control.Feedback type="invalid">
          Данное поле обязательно.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Адрес электронной почты</Form.Label>
        <Form.Control
          value={form.email}
          data-testid="email-field"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          type="email"
          placeholder="Введите адрес электронной почты"
        />
        <Form.Control.Feedback type="invalid">
          Пожалуйста, введите действительный адрес электронной почты.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Пароль</Form.Label>
        <Form.Control
          value={form.password}
          data-testid="password-field"
          minLength="8"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          type="password"
          placeholder="Придумайте пароль"
        />
        <Form.Control.Feedback type="invalid">
          Пожалуйста, введите корректный пароль.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Информация о себе</Form.Label>
        <Form.Control
          value={form.bio}
          data-testid="bio-field"
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
          as="textarea"
          rows={3}
          placeholder="Введите информацию о себе ... (по желанию)"
        />
      </Form.Group>
      <div className="text-content text-danger">{error && <p>{error}</p>}</div>
      <Button data-testid="submit-button" variant="primary" type="submit">
        Зарегистрироваться
      </Button>
    </Form>
  );
}
export default RegistrationForm;
