import React, { useEffect, useState } from "react";
import { Table, Button, Input, Space, message, Typography } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { fetchUsers, updateUser, deleteUser } from "../services/userService";

const { Text } = Typography;

const UserTableInlineEdit = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [editingKey, setEditingKey] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [filters, setFilters] = useState({ filterBy: "", filterValue: "" });
  const [sorter, setSorter] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async (
    page = pagination.current,
    pageSize = pagination.pageSize,
    search = "",
    sort = sorter,
    filterBy = filters.filterBy,
    filterValue = filters.filterValue
  ) => {
    setLoading(true);
    const data = await fetchUsers({
      page,
      limit: pageSize,
      search,
      sort,
      filterBy,
      filterValue,
    });
    setUsers(data.data);
    setPagination({ current: page, pageSize, total: data.total });
    setLoading(false);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    message.success("Usuario eliminado");
    loadUsers();
  };

  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    setEditingKey(record.id);
    setEditingUser({ ...record });
  };

  const save = async (id) => {
    await updateUser(id, editingUser);
    message.success("Usuario actualizado");
    setEditingKey("");
    loadUsers();
  };

  const cancel = () => {
    setEditingKey("");
    setEditingUser(null);
  };

  const handleChange = (e, field) => {
    setEditingUser({
      ...editingUser,
      [field]: e.target.value,
    });
  };

  const handleFilter = (value, dataIndex) => {
    setFilters({ filterBy: dataIndex, filterValue: value });
    loadUsers(1, pagination.pageSize, "", "", dataIndex, value);
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Buscar ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleFilter(selectedKeys[0], dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
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
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Limpiar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
  });

  const handleReset = (clearFilters) => {
    clearFilters();
    setFilters({ filterBy: "", filterValue: "" });
    loadUsers(1, pagination.pageSize);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    const sort = sorter.field
      ? `${sorter.field}_${sorter.order === "ascend" ? "asc" : "desc"}`
      : "";
    setSorter(sort);
    loadUsers(
      pagination.current,
      pagination.pageSize,
      "",
      sort,
      filters.filterBy,
      filters.filterValue
    );
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id", sorter: true },
    {
      title: "Usuario",
      dataIndex: "usuario",
      key: "usuario",
      sorter: true,
      ...getColumnSearchProps("usuario"),
      render: (text, record) => {
        return isEditing(record) ? (
          <Input
            value={editingUser?.usuario}
            onChange={(e) => handleChange(e, "usuario")}
          />
        ) : (
          text
        );
      },
    },
    {
      title: "Tipo de Usuario",
      dataIndex: "tipo_usuario",
      key: "tipo_usuario",
      sorter: true,
      ...getColumnSearchProps("tipo_usuario"),
      render: (text, record) => {
        return isEditing(record) ? (
          <Input
            value={editingUser?.tipo_usuario}
            onChange={(e) => handleChange(e, "tipo_usuario")}
          />
        ) : (
          text
        );
      },
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Space>
            <Button icon={<SaveOutlined />} onClick={() => save(record.id)} />
            <Button onClick={cancel} danger>
              Cancelar
            </Button>
          </Space>
        ) : (
          <Space>
            <Button icon={<EditOutlined />} onClick={() => edit(record)} />
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.id)}
              type="danger"
            />
          </Space>
        );
      },
    },
  ];

  return (
    <Table
      dataSource={users}
      columns={columns}
      loading={loading}
      rowKey="id"
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total,
      }}
      onChange={handleTableChange}
    />
  );
};

export default UserTableInlineEdit;
