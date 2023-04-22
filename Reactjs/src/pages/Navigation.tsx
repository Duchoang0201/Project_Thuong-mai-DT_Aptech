import React, { useState } from "react";
import {
  ExportOutlined,
  HomeOutlined,
  PlusOutlined,
  SettingOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

type Props = {
  setIsLogin: (value: boolean) => void; //setIsLogin(true)
};
const items: MenuProps["items"] = [
  {
    label: "Home",
    key: "home",
    icon: <HomeOutlined />,
  },

  {
    label: "Mangement",
    key: "management",
    icon: <SettingOutlined />,
    children: [
      {
        key: "/categories",
        label: "Categories",
      },
      {
        key: "/suppliers",
        label: "Suppliers",
      },
      {
        key: "/customers",
        label: "Customers",
      },
      {
        key: "/employees",
        label: "Employees",
      },
      {
        key: "/products",
        label: "Products",
      },
    ],
  },
  {
    label: "Products",
    key: "productCreate",
    icon: <PlusOutlined />,
  },
  {
    label: "Orders",
    key: "orders",
    icon: <HomeOutlined />,
  },
  {
    label: "Account",
    key: "/infomation",
    icon: <UsergroupAddOutlined />,
    children: [
      {
        key: "/infomation",
        label: "Infomation",
        icon: <UserOutlined />,
      },
      {
        key: "/logout",
        label: "Logout",
        icon: <ExportOutlined />,
      },
    ],
  },
];

const Navigation = (props: Props) => {
  const { setIsLogin } = props;
  const navigate = useNavigate();
  const onMenuClick = (value: any) => {
    console.log(value.key);
    if (value.key === "/logout") {
      setIsLogin(true);
    } else {
      navigate(value.key);
    }

    setCurrent(value.key);
  };
  const [current, setCurrent] = useState("category");

  // const onClick: MenuProps["onClick"] = (e) => {
  //   console.log("click ", e);
  //   setCurrent(e.key);
  // };

  return (
    <Menu
      onClick={onMenuClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Navigation;
