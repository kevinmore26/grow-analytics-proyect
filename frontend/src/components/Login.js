import React from "react";
import { Form, Input, Button, Checkbox, Typography, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import person from "../assets/person.png";
import "./Login.css";

const { Title } = Typography;

const Login = ({ onLogin }) => {
  const onFinish = (values) => {
    onLogin(values);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Sección de Imagen */}
        <div className="login-image">
          <img src={person} alt="Person with laptop" className="image-person" />
        </div>

        {/* Sección del Formulario */}
        <div className="login-form">
          <Title level={2} className="login-title text-left">
            Log in
          </Title>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
            className="m-5"
          >
            <Form.Item
              name="usuario"
              rules={[{ required: true, message: "Por favor ingresa tu usuario o correo" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Your Name" className="p-10" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Por favor ingresa tu contraseña" }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>  
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-button">
                Log in
              </Button>
            </Form.Item>
          </Form>
          <Space direction="vertical" className="login-options">
            <a href="/signup" className="create-account">
              Create an account
            </a>
            <div className="social-login">
              Or login with{" "}
              <Button shape="circle" icon={<i className="fab fa-facebook-f" />} className="social-button fb" />
              <Button shape="circle" icon={<i className="fab fa-twitter" />} className="social-button twitter" />
              <Button shape="circle" icon={<i className="fab fa-google" />} className="social-button google" />
            </div>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default Login;
