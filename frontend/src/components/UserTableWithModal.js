import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Space, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { fetchUsers, updateUser, deleteUser } from '../services/userService';

const UserTableWithModal = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [editingUser, setEditingUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState({ filterBy: '', filterValue: '' });
  const [sorter, setSorter] = useState('');

  const [form] = Form.useForm();

  useEffect(() => {
    loadUsers();
  }, [pagination.current, pagination.pageSize, searchText, sorter]);

  const loadUsers = async (page = pagination.current, pageSize = pagination.pageSize, search = searchText, sort = sorter, filterBy = filters.filterBy, filterValue = filters.filterValue) => {
    setLoading(true);
    const data = await fetchUsers({ page, limit: pageSize, search, sort, filterBy, filterValue });
    setUsers(data.data);
    setPagination({ current: page, pageSize, total: data.total });
    setLoading(false);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    const sort = sorter.field ? `${sorter.field}_${sorter.order === 'ascend' ? 'asc' : 'desc'}` : '';
    setSorter(sort);
    setPagination({
      ...pagination,
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
    loadUsers(pagination.current, pagination.pageSize, searchText, sort, filters.filterBy, filters.filterValue);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    message.success('Usuario eliminado');
    loadUsers();
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setIsModalVisible(true);
  };

  const handleUpdate = async (values) => {
    await updateUser(editingUser.id, values);
    message.success('Usuario actualizado');
    loadUsers();
    setIsModalVisible(false);
  };

  const handleSearch = (value) => {
    setSearchText(value);
    loadUsers(1, pagination.pageSize, value);
  };

  const handleFilter = (value, dataIndex) => {
    setFilters({ filterBy: dataIndex, filterValue: value });
    loadUsers(1, pagination.pageSize, '', '', dataIndex, value);
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Buscar ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleFilter(selectedKeys[0], dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleFilter(selectedKeys[0], dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Buscar
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Limpiar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
  });

  const handleReset = (clearFilters) => {
    clearFilters();
    setFilters({ filterBy: '', filterValue: '' });
    loadUsers(1, pagination.pageSize);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: true,
      responsive: ['xs', 'sm'],
      ellipsis: true,
    },
    {
      title: 'Usuario',
      dataIndex: 'usuario',
      key: 'usuario',
      sorter: true,
      responsive: ['xs', 'sm'],
      ellipsis: true,
      ...getColumnSearchProps('usuario'),
    },
    {
      title: 'Correo',
      dataIndex: 'correo',
      key: 'correo',
      sorter: true,
      responsive: ['xs', 'sm'],
      ellipsis: true,
    },
    {
      title: 'Nombre Completo',
      key: 'nombre_completo',
      render: (text, record) => `${record.nombre} ${record.apell_paterno} ${record.apell_materno}`,
      sorter: true,
      responsive: ['xs', 'sm'],
      ellipsis: true,
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (text, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} type="primary" />
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} type="danger" />
        </Space>
      ),
      fixed: 'right',
      responsive: ['xs', 'sm'],
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Buscar por Nombre Completo"
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: 300 }}
          prefix={<SearchOutlined />}
          allowClear
        />
      </Space>

      <Table
        dataSource={users}
        columns={columns}
        loading={loading}
        rowKey="id"
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
        }}
        onChange={handleTableChange}
        scroll={{ x: 'max-content' }}
      />

      <Modal title="Editar Usuario" open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
        <Form form={form} onFinish={handleUpdate} layout="vertical">
          <Form.Item name="usuario" label="Usuario" rules={[{ required: true, message: 'Por favor ingresa el usuario' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="correo" label="Correo" rules={[{ required: true, message: 'Por favor ingresa el correo' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="nombre" label="Nombre" rules={[{ required: true, message: 'Por favor ingresa el nombre' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="apell_paterno" label="Apellido Paterno" rules={[{ required: true, message: 'Por favor ingresa el apellido paterno' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="apell_materno" label="Apellido Materno" rules={[{ required: true, message: 'Por favor ingresa el apellido materno' }]}>
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Guardar Cambios
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default UserTableWithModal;
  