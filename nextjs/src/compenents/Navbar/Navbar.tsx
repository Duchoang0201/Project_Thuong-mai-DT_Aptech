import axios from "axios";
import React, { useEffect, useState } from "react";
import { Avatar, Badge, Dropdown, Space, message } from "antd";
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

  const [user, setUser] = useState<any>();
  const [current, setCurrent] = useState<any>();
  const [findProduct, setFindProduct] = useState<Array<any>>([]);
  const [fresh, setFresh] = useState<number>(0);
  const [scroll, setScroll] = useState<number>(10);
  const [windowWidth, setWindowWidth] = useState<number>(0);

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
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize(); // Set initial window width
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    axios
      .get(`${URL_ENV}/products`)
      .then((res) => {
        setFindProduct(res.data.results);
      })
      .catch((err) => console.log(err));
  }, [fresh]);

  useEffect(() => {
    if (auth) {
      axios
        .get(`${URL_ENV}/customers/${auth?.payload?._id}`)
        .then((res: any) => {
          setUser(res.data.result);
        })
        .catch((err) => console.log(err));
    } else {
    }
  }, [auth, auth?.payload?._id]);

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
            setUser(null);
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
            ></li>
            {user && (
              <>
                {windowWidth > 900 ? (
                  <li
                    className={Style.listTopItem1}
                    onClick={() => {
                      handleNavigation("/cart");
                    }}
                  >
                    <div>
                      <Dropdown
                        overlayStyle={{ zIndex: 10000 }}
                        overlay={
                          <Menu>
                            {itemsCart?.length > 0 &&
                              itemsCart?.map((item: any) => (
                                <Menu.Item key={item.product?._id}>
                                  <div className="d-flex justify-content-between">
                                    <div className="w-75 text-truncate py-3">
                                      <Badge color="blue" count={item.quantity}>
                                        <Avatar
                                          shape="square"
                                          size="large"
                                          src={`${URL_ENV}${item.product?.imageUrl}`}
                                        />
                                      </Badge>
                                      <span> {item.product?.name}</span>
                                    </div>

                                    <div className="py-3">
                                      {item.product?.price?.toLocaleString(
                                        "vi-VN",
                                        {
                                          style: "currency",
                                          currency: "VND",
                                        }
                                      )}
                                    </div>
                                  </div>
                                </Menu.Item>
                              ))}
                          </Menu>
                        }
                        className="d-flex"
                      >
                        <Badge
                          count={itemsCart?.length}
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
                      </Dropdown>
                    </div>
                  </li>
                ) : (
                  <li
                    className={Style.listTopItem1}
                    onClick={() => {
                      handleNavigation("/cart");
                    }}
                  >
                    <div>
                      <Badge
                        count={itemsCart?.length}
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
                )}
                <li
                  className={Style.listTopItem1}
                  // onClick={() => {
                  //   handleNavigation("/account");
                  // }}
                >
                  {" "}
                  <div>
                    {" "}
                    <Dropdown
                      overlayStyle={{ zIndex: 10000 }}
                      overlay={
                        <Menu>
                          {itemsAccount.length > 0 &&
                            itemsAccount.map((item) => (
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
            {!user && (
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
            dropdownMatchSelectWidth={false}
            dropdownStyle={{
              position: "fixed",
              top: scroll > 150 ? 140 : 130,
              width: 300,
            }}
            allowClear
            className={scroll > 150 ? `${Style.input} ` : Style.input__Scroll}
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
