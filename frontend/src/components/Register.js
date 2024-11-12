import React from "react";
import { Form, Input, Button, Checkbox, Typography, Space } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import deskImage from "../assets/signup.png"; // Cambia la ruta si es necesario
import "./Register.css";

const { Title, Text } = Typography;

const Register = ({ onRegister, errorMessage }) => {
  const onFinish = (values) => {
    // Modifica los datos para enviarlos con las propiedades correctas
    const userData = {
      usuario: values.username,
      correo: values.email,
      contrasena: values.password,
      nombre: values.nombre,
      apell_paterno: values.apell_paterno,
      apell_materno: values.apell_materno,
      tipo_usuario: "user", // Forzar el tipo de usuario a "user"
    };
    onRegister(userData);
  };

  return (
    <div className="register-container">
      <div className="register-card">
        {/* Sección del Formulario */}
        <div className="register-form">
          <Title level={2} className="register-title">
            Sign up
          </Title>
          <Form name="register" onFinish={onFinish} layout="vertical">
            <Form.Item
              name="nombre"
              rules={[
                { required: true, message: "Please enter your first name" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="First Name" />
            </Form.Item>
            <Form.Item
              name="apell_paterno"
              rules={[
                { required: true, message: "Please enter your last name" },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Last Name (Paternal)"
              />
            </Form.Item>
            <Form.Item
              name="apell_materno"
              rules={[
                {
                  required: true,
                  message: "Please enter your maternal last name",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Last Name (Maternal)"
              />
            </Form.Item>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please enter your username" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input prefix={<MailOutlined />} placeholder="Your Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              rules={[
                { required: true, message: "Please confirm your password" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Repeat your password"
              />
            </Form.Item>
            <Form.Item name="agreement" valuePropName="checked">
              <Checkbox>
                I agree all statements in <a href="/terms">Terms of service</a>
              </Checkbox>
            </Form.Item>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}{" "}
            {/* Muestra el mensaje de error */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="register-button"
              >
                Register
              </Button>
            </Form.Item>
          </Form>
          <Text className="already-member">
            <a href="/login">I am already member</a>
          </Text>
        </div>

        {/* Sección de Imagen */}
        <div className="register-image">
          <img src={deskImage} alt="Desk with laptop" className="image-desk" />
        </div>
      </div>
    </div>
  );
};

export default Register;
