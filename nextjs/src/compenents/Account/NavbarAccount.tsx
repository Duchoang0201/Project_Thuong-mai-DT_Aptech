import React, { useState, useEffect } from "react";
import { OrderedListOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Layout, Menu } from "antd";
import { useAuthStore } from "@/hook/useAuthStore";
import AccountOrders from "./orders";
import AccountInformation from "./AccountInformation";

const { Content, Sider } = Layout;

const NavbarAccount: React.FC = () => {
  const [auth, setAuth] = useState<any>(null);
  const [keyActive, setKeyActive] = useState<string>("information");
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [trigger, setTrigger] = useState<boolean>(false);

  useEffect(() => {
    const authData = useAuthStore.getState();
    setAuth(authData);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize(); // Set initial window width
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const itemsNavbar = [
    { key: "information", icon: <UserOutlined />, label: "Thông tin cá nhân" },
    { key: "order", icon: <OrderedListOutlined />, label: "Đơn hàng của bạn" },
  ];

  useEffect(() => {
    if (windowWidth < 900) {
      setTrigger(true);
    } else {
      setTrigger(false);
    }
  }, [windowWidth]);

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
            setTrigger(collapsed);
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
          {windowWidth < 900 && trigger && (
            <Content style={{ margin: "24px 16px 0" }}>
              {keyActive === "information" && <AccountInformation />}
              {keyActive === "order" && <AccountOrders />}
            </Content>
          )}
          {windowWidth > 900 && (
            <Content style={{ margin: "24px 16px 0" }}>
              {keyActive === "information" && <AccountInformation />}
              {keyActive === "order" && <AccountOrders />}
            </Content>
          )}
        </Layout>
      </Layout>
    </Card>
  );
};

export default NavbarAccount;
