import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Space,
  Typography,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../services/userService";

const { Title } = Typography;

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [editingUser, setEditingUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    loadUsers(pagination.current, pagination.pageSize);
  }, []);

  const loadUsers = async (page, pageSize) => {
    setLoading(true);
    const data = await fetchUsers(page, pageSize);
    setUsers(data.data);
    setPagination({ current: page, pageSize, total: data.total });
    setLoading(false);
  };

  const handleTableChange = (pagination) => {
    loadUsers(pagination.current, pagination.pageSize);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    message.success("Usuario eliminado");
    loadUsers(pagination.current, pagination.pageSize);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setIsModalVisible(true);
  };

  const handleUpdate = async (values) => {
    await updateUser(editingUser.id, values);
    message.success("Usuario actualizado");
    loadUsers(pagination.current, pagination.pageSize);
    setIsModalVisible(false);
  };

  const handleAddUser = async (values) => {
    await createUser(values);
    message.success("Usuario agregado");
    loadUsers(pagination.current, pagination.pageSize);
    setIsAddModalVisible(false);
  };

  const columns = [
    {
      title: "Usuario",
      dataIndex: "usuario",
      key: "usuario",
      responsive: ["md"], // visible en pantallas medianas o más grandes
    },
    {
      title: "Correo",
      dataIndex: "correo",
      key: "correo",
    },
    {
      title: "Nombre Completo",
      key: "nombre_completo",
      render: (text, record) =>
        `${record.nombre} ${record.apell_paterno} ${record.apell_materno}`,
    },
    {
      title: "Tipo de Usuario",
      dataIndex: "tipo_usuario",
      key: "tipo_usuario",
      responsive: ["lg"], // visible solo en pantallas grandes
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (text, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            type="primary"
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            type="danger"
          />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Title level={3}>Gestión de Usuarios</Title>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsAddModalVisible(true)}
        style={{ marginBottom: "16px" }}
      >
        Agregar Usuario
      </Button>

      <Table
        dataSource={users}
        columns={columns}
        loading={loading}
        rowKey="id"
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          onChange: handleTableChange,
        }}
        responsive // Hace la tabla responsiva automáticamente
      />

      {/* Modal para Editar Usuario */}
      <Modal
        title="Editar Usuario"
        open={isModalVisible} // Cambia `visible` por `open`
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleUpdate} layout="vertical">
          <Form.Item
            name="usuario"
            label="Usuario"
            rules={[
              { required: true, message: "Por favor ingresa el usuario" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="correo"
            label="Correo"
            rules={[{ required: true, message: "Por favor ingresa el correo" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="nombre"
            label="Nombre"
            rules={[{ required: true, message: "Por favor ingresa el nombre" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="apell_paterno"
            label="Apellido Paterno"
            rules={[
              {
                required: true,
                message: "Por favor ingresa el apellido paterno",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="apell_materno"
            label="Apellido Materno"
            rules={[
              {
                required: true,
                message: "Por favor ingresa el apellido materno",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="tipo_usuario"
            label="Tipo de Usuario"
            rules={[
              {
                required: true,
                message: "Por favor ingresa el tipo de usuario",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Guardar Cambios
          </Button>
        </Form>
      </Modal>

      {/* Modal para Agregar Usuario */}
      <Modal
        title="Agregar Nuevo Usuario"
        visible={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        footer={null}
      >
        <Form onFinish={handleAddUser} layout="vertical">
          <Form.Item
            name="usuario"
            label="Usuario"
            rules={[
              { required: true, message: "Por favor ingresa el usuario" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="correo"
            label="Correo"
            rules={[{ required: true, message: "Por favor ingresa el correo" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="nombre"
            label="Nombre"
            rules={[{ required: true, message: "Por favor ingresa el nombre" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="apell_paterno"
            label="Apellido Paterno"
            rules={[
              {
                required: true,
                message: "Por favor ingresa el apellido paterno",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="apell_materno"
            label="Apellido Materno"
            rules={[
              {
                required: true,
                message: "Por favor ingresa el apellido materno",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="tipo_usuario"
            label="Tipo de Usuario"
            rules={[
              {
                required: true,
                message: "Por favor ingresa el tipo de usuario",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Agregar Usuario
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default UserTable;
