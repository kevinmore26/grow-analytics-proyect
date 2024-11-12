import React, { useEffect, useState } from "react";
import { Typography, Button, Tabs, Card, Switch, Layout } from "antd";
import UserTableWithModal from "../components/UserTableWithModal";
import { useTheme } from "../context/ThemeContext";
import UserTableInlineEdit from "../components/UserTableInlineEdit";
import { logout } from "../services/authService";
import { useNavigate } from "react-router-dom";

const { Text, Title } = Typography;
const { TabPane } = Tabs;
const { Content, Header } = Layout;

const Dashboard = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [nombreapellido, setNombreapellido] = useState("");
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Obtener el nombre y rol del usuario al cargar el Dashboard
    setRole(localStorage.getItem("userRole") || "user");
    setUsername(localStorage.getItem("userName") || "Invitado");
    setNombreapellido(
      localStorage.getItem("nombreapellido") || "Nombreapellido"
    );
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Layout
      style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}
      className="dark:bg-gray-800"
    >
      <Header
        style={{
          backgroundColor: "#001529",
          padding: "10px 20px",
          margin: "50px !important",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 100,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "white",
          }}
        >
          <Title level={3} style={{ color: "white", margin: 0 }}>
            Dashboard
          </Title>
          {/* Intento de version dark */}
          {/* <Switch
            checked={isDarkMode}
            onChange={toggleTheme}
            checkedChildren="🌙"
            unCheckedChildren="☀️"
          /> */}
          <Button onClick={handleLogout} type="primary">
            Cerrar sesión
          </Button>
        </div>
      </Header>

      <Content style={{ padding: "40px 20px", margin: "10px" }}>
        <Card
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <Title
            level={2}
            style={{ textAlign: "center" }}
            className="dark:bg-gray-900 text-gray-900"
          >
            Bienvenido, {nombreapellido}
          </Title>
          <Text
            type="secondary"
            style={{
              display: "block",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            Rol: {role}
          </Text>

          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Tabla de Usuarios" key="1">
              <UserTableWithModal />
            </TabPane>

            {role === "admin" && (
              <TabPane tab="Administración Avanzada de Usuarios" key="2">
                <UserTableInlineEdit />
              </TabPane>
            )}
          </Tabs>
        </Card>
      </Content>
    </Layout>
  );
};

export default Dashboard;
