import React, { useEffect, useState } from "react";
import { Badge, Dropdown, MenuProps, Space } from "antd";
import { Menu, Input } from "antd";
import Style from "./Navbar.module.css";
// import { useRouter } from "next/router";
import { useRouter } from "next/router";
import {} from "react-icons/ai";
import { useAuthStore } from "@/hook/useAuthStore";

import {
  UserAddOutlined,
  LoginOutlined,
  LogoutOutlined,
  PhoneOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  BranchesOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import axios from "axios";
import { useCartStore } from "../../hook/useCountStore";

const { Search } = Input;
type Props = {};

function NavBar({}: Props) {
  const URL_ENV = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:9000";

  const { auth }: any = useAuthStore((state: any) => state);
  const { items: itemsCart }: any = useCartStore((state: any) => state);
  const E_URL = `${URL_ENV}/customers/${auth?.payload?._id}`;
  //Em config LInk thành như ri hết
  const [user, setUser] = useState<any>();
  const [current, setCurrent] = useState<any>();
  const [productName, setProductName] = useState<any>();
  const [link, setLink] = useState<any>();

  console.log("««««« user »»»»»", user);
  const { logout } = useAuthStore((state: any) => state);

  const router = useRouter();

  useEffect(() => {
    axios
      .get(E_URL)
      .then((res: any) => {
        setUser(res.data.result);
      })
      .catch((err) => console.log(err));
  }, [E_URL]);

  const handleNavigation = (path: any) => {
    router.push(path);
  };

  const onSearch = (value: any) => {
    console.log("click");
    axios
      .get(`http://localhost:9000/products?productName=${value}`)
      .then((response) => {
        console.log(response.data.results[0]._id);
        router.push(`products/${response.data.results[0]._id}`);
      });
  };

  const itemsAccount = [
    {
      key: "information",
      label: (
        <div
          onClick={() => {
            router.push("/account");
          }}
        >
          <Space>
            <UserOutlined />
            <span>Information</span>
          </Space>
        </div>
      ),
    },
    {
      key: "logout",
      label: (
        <div
          onClick={() => {
            logout();
            router.push("/");
          }}
        >
          <Space>
            <LogoutOutlined />
            <span>Logout</span>
          </Space>
        </div>
      ),
    },
  ];

  return (
    <>
      <div>
        <div className={` ${Style.container}`}>
          <ul className={`${Style.listTop}`}>
            <li
              className={Style.listTopItem2}
              onClick={() => {
                handleNavigation("/phone");
              }}
            >
              <div className="mb-2 ">
                <PhoneOutlined />
              </div>
              <div className={Style.items}>Điện Thoại</div>
            </li>
            <li
              className={Style.listTopItem2}
              onClick={() => {
                handleNavigation("/Branch");
              }}
            >
              <div className="mb-2">
                <BranchesOutlined />
              </div>
              <span className={Style.items}>Chi nhánh</span>
            </li>
            <li
              className={`${Style.listTopIcon}`}
              onClick={() => {
                handleNavigation("/");
              }}
            >
              JewelShop
            </li>
            {auth && (
              <>
                <li
                  className={Style.listTopItem2}
                  onClick={() => {
                    handleNavigation("/cart");
                  }}
                >
                  <div className={Style.icon}>
                    <Badge count={itemsCart.length}>
                      <ShoppingCartOutlined
                        style={{ fontSize: 20, cursor: "pointer" }}
                      />
                    </Badge>
                  </div>
                </li>
                <li className={Style.listTopItem2}>
                  {" "}
                  <div className={Style.icon}>
                    {" "}
                    <Dropdown
                      overlay={
                        <Menu>
                          {itemsAccount.map((item) => (
                            <Menu.Item key={item.key}>{item.label}</Menu.Item>
                          ))}
                        </Menu>
                      }
                    >
                      <Badge>
                        <UserOutlined
                          style={{ fontSize: 20, cursor: "pointer" }}
                        />
                      </Badge>
                    </Dropdown>
                  </div>
                </li>
              </>
            )}
            {auth === null && (
              <>
                <li
                  className={Style.listTopItem1}
                  onClick={() => {
                    handleNavigation("/login");
                  }}
                >
                  <div className="mb-2">
                    <LoginOutlined />
                  </div>
                  <div className={Style.items}>Đăng nhập</div>
                </li>
                <li
                  className={Style.listTopItem1}
                  onClick={() => {
                    handleNavigation("/register");
                  }}
                >
                  <div className="mb-2">
                    <UserAddOutlined />
                  </div>
                  <div className={Style.items}>Đăng ký</div>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className={Style.menuAnt}>
          <Menu
            mode="horizontal"
            className={Style.length}
            selectedKeys={[current]}
          >
            <Menu.Item
              key="products"
              onClick={() => handleNavigation("/products")}
            >
              Sản phẩm
            </Menu.Item>
            <Menu.Item key="collection">Bộ sưu tập </Menu.Item>
            <Menu.Item key="brand">Thương hiệu</Menu.Item>
            <Menu.Item key="contact">Liên hệ</Menu.Item>
          </Menu>
          <Search
            placeholder="input search text"
            style={{ margin: "10px 0px", width: 150 }}
            onSearch={onSearch}
          />
        </div>
      </div>
    </>
  );
}

export default NavBar;
