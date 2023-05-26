import axios from "axios";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Badge, Divider, Dropdown, MenuProps, Space } from "antd";
import { Menu, Input, Select } from "antd";
import Style from "./Navbar.module.css";
import { useRouter } from "next/router";
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

import { useCartStore } from "../../hook/useCountStore";

type Props = {};
const URL_ENV = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:9000";

function NavBar({}: Props) {
  const { auth }: any = useAuthStore((state: any) => state);
  const { items: itemsCart }: any = useCartStore((state: any) => state);
  const E_URL = `${URL_ENV}/customers/${auth?.payload?._id}`;

  const [user, setUser] = useState<any>();
  const [current, setCurrent] = useState<any>();
  const [findProduct, setFindProduct] = useState<Array<any>>([]);
  const [fresh, setFresh] = useState<number>(0);
  const [scroll, setScroll] = useState<number>(10);

  const { logout } = useAuthStore((state: any) => state);

  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setScroll(window.scrollY);
    };

    handleResize(); // Set initial window width
    window.addEventListener("scroll", handleResize);

    return () => {
      window.removeEventListener("scroll", handleResize);
    };
  }, []);

  useEffect(() => {
    axios
      .get(`${URL_ENV}/products`)
      .then((res) => {
        setFindProduct(res.data.results);
      })
      .catch((err) => console.log(err));
  }, [URL_ENV, fresh]);

  const handleNavigation = (path: any) => {
    // router.reload();
    router.push(path);
  };

  const onSearch = async (value: any) => {
    console.log("value: ", value);
    const data = await axios
      .get(`${URL_ENV}/products?productName=${value}`)
      .then((response) => {
        return response.data.results;
      });

    if (typeof value !== "undefined") {
      setFindProduct(data);
      router.push(`/products/${value}`);
      setFresh((pre) => pre + 1);
    }
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
      <div className={scroll > 150 ? Style.container : Style.contaier__Scroll}>
        <div>
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
              {/* JewelShop */}
            </li>
            {auth && (
              <>
                <li
                  className={Style.listTopItem1}
                  onClick={() => {
                    handleNavigation("/cart");
                  }}
                >
                  <div>
                    <Badge
                      count={itemsCart.length}
                      className={
                        scroll > 150
                          ? `d-flex ${Style.icon__scroll}`
                          : `d-flex ${Style.icon}`
                      }
                    >
                      <ShoppingCartOutlined style={{ fontSize: 20 }} />
                      <div style={{ fontSize: 20 }} className={Style.items}>
                        Giỏ hàng
                      </div>
                    </Badge>
                  </div>
                </li>
                <li
                  className={Style.listTopItem1}
                  onClick={() => {
                    handleNavigation("/account");
                  }}
                >
                  {" "}
                  <div>
                    {" "}
                    <Dropdown
                      overlay={
                        <Menu>
                          {itemsAccount.map((item) => (
                            <Menu.Item key={item.key}>{item.label}</Menu.Item>
                          ))}
                        </Menu>
                      }
                      className="d-flex"
                    >
                      <Badge
                        className={
                          scroll > 150
                            ? `d-flex ${Style.icon__scroll}`
                            : `d-flex ${Style.icon}`
                        }
                      >
                        <UserOutlined
                          style={{ fontSize: 20, cursor: "pointer" }}
                        />
                        <span style={{ fontSize: 20 }} className={Style.items}>
                          Cá nhân
                        </span>
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
            className={scroll > 150 ? Style.lengths : Style.length__Scroll}
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
            <Menu.Item key="contact ">Liên hệ</Menu.Item>
          </Menu>

          <Select
            allowClear
            // style={{ width: "125px", marginTop: "5px" }}
            className={scroll > 150 ? Style.input : Style.input__Scroll}
            placeholder="Search"
            optionFilterProp="children"
            onChange={onSearch}
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={findProduct.map((item: any, index: any) => {
              return {
                label: `${item.name}`,
                value: item._id,
              };
            })}
          />
        </div>
      </div>
    </>
  );
}

export default NavBar;
