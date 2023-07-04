import axios from "axios";
import React, { useEffect, useState } from "react";
import { Avatar, Badge, Dropdown, Space, Button, MenuProps } from "antd";
import { Menu, Input, Form } from "antd";
import Style from "./Navbar.module.css";
import { useRouter } from "next/router";
import { useAuthStore } from "@/hook/useAuthStore";
import { PropsSearch } from "./PropsSearch";

import {
  UserAddOutlined,
  LoginOutlined,
  LogoutOutlined,
  PhoneOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  BranchesOutlined,
} from "@ant-design/icons";
const { Search } = Input;
import { useCartStore } from "../../hook/useCountStore";

const URL_ENV = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:9000";

function NavBar() {
  const { items: itemsCart, removeAllCheck }: any = useCartStore(
    (state: any) => state
  );
  const { search }: any = PropsSearch((state) => state);

  const [user, setUser] = useState<any>();
  const [current, setCurrent] = useState<any>();
  const [findProduct, setFindProduct] = useState<Array<any>>([]);
  const [fresh, setFresh] = useState<number>(0);
  const [scroll, setScroll] = useState<number>(10);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  const { logout } = useAuthStore((state: any) => state);
  const router = useRouter();
  const [findForm]: any = Form.useForm();

  const { dataFromToken, setLogout, auth } = useAuthStore(
    (state: any) => state
  );
  useEffect(() => {
    dataFromToken(auth?.token);
    if (auth?.payload) setUser(auth?.payload);

    const refreshToken = setTimeout(() => {
      setLogout();
    }, 2 * 3000);
    // return () => {
    //   clearTimeout(refreshToken);
    // };
  }, [auth?.token]);

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
    axios
      .get(`${URL_ENV}/customers/${auth?.payload?._id}`)
      .then((res: any) => {
        setUser(res.data.result);
      })
      .catch((err) => console.log(err));
  }, [auth?.payload?._id]);

  const handleNavigation = (path: any) => {
    // router.reload();
    router.push(path);
  };

  const handleFind = (value: any) => {
    search(value);
    // setInputValue("");
    findForm.resetFields();
    router.push(`/searchpage`);
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
            removeAllCheck();
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
      <div className={scroll > 60 ? Style.container : Style.contaier__Scroll}>
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
                handleNavigation("/branch");
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
                        menu={{
                          items: itemsCart.map((item: any, index: number) => ({
                            key: index.toString(),
                            label: (
                              <div className="d-flex justify-content-between">
                                <div className="w-75 text-truncate py-3">
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
                            ),
                            icon: (
                              <Badge color="blue" count={item.quantity}>
                                <Avatar
                                  shape="square"
                                  size="large"
                                  src={`${URL_ENV}${item.product?.imageUrl}`}
                                />
                              </Badge>
                            ),
                          })),
                        }}
                        className="d-flex"
                      >
                        <Badge
                          count={itemsCart?.length}
                          className={
                            scroll > 60
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
                        count={itemsCart.length}
                        className={
                          scroll > 60
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
                <li className={Style.listTopItem1}>
                  {" "}
                  <div>
                    {" "}
                    <Dropdown
                      overlayStyle={{ zIndex: 10000 }}
                      trigger={windowWidth < 900 ? ["click"] : ["hover"]}
                      menu={{ items: itemsAccount }}
                      className="d-flex"
                    >
                      <Badge
                        className={
                          scroll > 60
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
            className={scroll > 60 ? Style.lengths : Style.length__Scroll}
            selectedKeys={[current]}
          >
            <Menu.Item
              key="products"
              onClick={() => handleNavigation("/products")}
            >
              Các sản phẩm
            </Menu.Item>
            <Menu.Item key="DongHo" onClick={() => handleNavigation("/dongho")}>
              Đồng hồ{" "}
            </Menu.Item>
            <Menu.Item
              key="brand"
              onClick={() => handleNavigation("/thuonghieu")}
            >
              Thương hiệu
            </Menu.Item>
            <Menu.Item
              key="contact "
              onClick={() => handleNavigation("/lienhe")}
            >
              Liên hệ
            </Menu.Item>
          </Menu>

          <Form className="my-2" form={findForm}>
            <Search
              placeholder="Nhập sản phẩm ..."
              onSearch={handleFind}
              style={{ width: 200 }}
              allowClear
            />
          </Form>
        </div>
      </div>
    </>
  );
}

export default NavBar;

export async function getStaticProps() {
  const data = await axios.get(`${URL_ENV}/products`).then((response) => {
    return response.data;
  });
  return {
    props: {
      data,
    },
  };
}
