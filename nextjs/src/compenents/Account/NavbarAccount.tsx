import React, { useState, useEffect } from "react";
import { OrderedListOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Layout, Menu, theme } from "antd";
import { useAuthStore } from "@/hook/useAuthStore";
import AccountOrders from "./orders";
import AccountInformation from "./AccountInformation";

const { Content, Sider } = Layout;

const NavbarAccount: React.FC = () => {
  const [auth, setAuth] = useState<any>(null);
  const [keyActive, setKeyActive] = useState<string>("information");

  useEffect(() => {
    const authData = useAuthStore.getState();
    setAuth(authData);
  }, []);

  const itemsNavbar = [
    { key: "information", icon: <UserOutlined />, label: "Thông tin cá nhân" },
    { key: "order", icon: <OrderedListOutlined />, label: "Đơn hàng của bạn" },
  ];

  if (!auth) {
    return null; // or a loading state if needed
  }

  return (
    <Card className="container">
      <Layout className="container">
        <Sider
          className="py-2 bg-body-secondary my-4 rounded-end-circle"
          style={{ height: "500px" }}
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="text-center py-3">
            <strong className="text-center">INFORMATION</strong>
          </div>
          <Menu
            mode="inline"
            defaultSelectedKeys={["information"]}
            items={itemsNavbar}
            onClick={(e: any) => {
              setKeyActive(e.key);
            }}
          />
        </Sider>
        <Layout>
          {keyActive === "information" && (
            <Content style={{ margin: "24px 16px 0" }}>
              <AccountInformation />
            </Content>
          )}
          {keyActive === "order" && (
            <Content style={{ margin: "24px 16px 0" }}>
              <AccountOrders />
            </Content>
          )}
        </Layout>
      </Layout>
    </Card>
  );
};

export default NavbarAccount;
