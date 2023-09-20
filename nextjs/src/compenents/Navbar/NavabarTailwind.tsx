import React, { useEffect, useRef, useState } from "react";
import dinamontImage from "./transparent-jewelry-icon-diamond-icon-60251ec5ca3757.4392206316130454458283.png";
import Image from "next/image";
import { Avatar, Badge, Dropdown, Space, message } from "antd";
import { useCartStore } from "@/hook/useCountStore";
import { API_URL } from "@/contants/URLS";
import {
  LogoutOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import router from "next/router";
import Link from "next/link";
import { PropsSearch } from "@/hook/PropsSearch";
import { signOut, useSession } from "next-auth/react";
import Aos from "aos";
const NavabarTailwind = () => {
  const timeoutSearch = useRef<any>();
  const { items: itemsCart, removeAllCheck }: any = useCartStore(
    (state: any) => state
  );

  const { data: session } = useSession();
  const user = session?.user;
  const { productSearch } = PropsSearch((state: any) => state);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [openNavbar, setOpenNavbar] = useState(true);
  const [searchProduct, setSearchProduct] = useState("");

  useEffect(() => {
    Aos.init();
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
          onClick={async () => {
            await signOut({ redirect: false });
            await removeAllCheck();
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

  const itemsAccountOut = [
    {
      key: "login",
      label: (
        <div
          onClick={() => {
            router.push("/login");
          }}
        >
          <Space>
            <UserOutlined />
            <span>Đăng nhập</span>
          </Space>
        </div>
      ),
    },
    {
      key: "register",
      label: (
        <div
          onClick={() => {
            router.push("/register");
          }}
        >
          <Space>
            <LogoutOutlined />
            <span>Đăng ký</span>
          </Space>
        </div>
      ),
    },
  ];
  return (
    <>
      <div>
        <nav className="bg-white border-gray-200 dark:bg-gray-900 py-2">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1">
            <div className="text-center justify-center">
              {" "}
              <Link href="/" className="items-center ">
                <Image
                  data-aos="fade-left"
                  data-aos-duration="400"
                  width={40}
                  src={dinamontImage}
                  alt={"Dianamont"}
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
              </Link>
            </div>

            <div className="flex md:order-2 items-center justify-between gap-x-3">
              <button
                onClick={() => {
                  setOpenNavbar(!openNavbar);
                }}
                data-collapse-toggle="navbar-search"
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-search"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
              <div className="relative hidden md:block">
                <div className="Search relative">
                  <input
                    data-aos="fade-up"
                    data-aos-duration="400"
                    value={searchProduct}
                    type="text"
                    id="search-navbar"
                    className="block w-full p-2 pl-10 pr-12 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Nhập sản phẩm ..."
                    onChange={(e: any) => {
                      setSearchProduct(e?.target?.value);
                    }}
                  />
                  <button
                    data-aos="fade-right"
                    data-aos-duration="600"
                    className="absolute inset-y-0 right-0 text-white  border-l-2 border-primary px-2 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
                    type="button"
                    id="button-addon3"
                    data-te-ripple-init
                    onClick={() => {
                      if (searchProduct) {
                        if (timeoutSearch.current) {
                          clearTimeout(timeoutSearch.current);
                        }
                        productSearch(searchProduct);
                        router.push(`/searchpage`);

                        timeoutSearch.current = setTimeout(() => {
                          setSearchProduct("");
                        }, 2000);
                      }
                      if (!searchProduct) {
                        message.error("Vui lòng nhập tên sản phẩm!!");
                      }
                    }}
                  >
                    <SearchOutlined />
                  </button>
                </div>
              </div>
              {user ? (
                <Dropdown
                  overlayStyle={{ zIndex: 10000 }}
                  menu={{
                    items: itemsCart.map((item: any, index: number) => ({
                      key: index.toString(),
                      label: (
                        <div
                          onClick={() => {
                            router.push("/cart");
                          }}
                          className="flex justify-between"
                        >
                          <div className="w-3/4 py-3 ">
                            <p className="md:truncate"> {item.product?.name}</p>
                          </div>

                          <div className="py-3">
                            {item.product?.price?.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </div>
                        </div>
                      ),
                      icon: (
                        <Badge color="blue" count={item.quantity}>
                          <Avatar
                            shape="square"
                            size="large"
                            src={`${API_URL}${item.product?.imageUrl}`}
                          />
                        </Badge>
                      ),
                    })),
                  }}
                >
                  <Badge count={itemsCart?.length}>
                    {" "}
                    <ShoppingCartOutlined
                      onClick={() => {
                        router.push("/cart");
                      }}
                      className="transition duration-300 ease-in-out hover:scale-110 cursor-pointer"
                      style={{
                        fontSize: 30,
                        color: "white",
                      }}
                    />
                  </Badge>
                </Dropdown>
              ) : (
                <Dropdown
                  overlayStyle={{ zIndex: 10000 }}
                  menu={{
                    items: [
                      {
                        key: "Null",
                        label: (
                          <div>Vui lòng đăng nhập để thêm vào giỏ hàng !!!</div>
                        ),
                      },
                    ],
                  }}
                  className="d-flex"
                  trigger={["hover"]}
                >
                  <Badge count={0}>
                    <ShoppingCartOutlined
                      data-aos="fade-left"
                      data-aos-duration="1500"
                      className="transition duration-300 ease-in-out hover:scale-110 cursor-pointer"
                      style={{
                        fontSize: 30,
                        color: "white",
                      }}
                    />
                  </Badge>
                </Dropdown>
              )}
              {user ? (
                <Dropdown
                  overlayStyle={{ zIndex: 10000 }}
                  trigger={windowWidth < 900 ? ["click"] : ["hover"]}
                  menu={{ items: itemsAccount }}
                  className="d-flex"
                >
                  <Badge>
                    <UserOutlined
                      className="transition duration-300 ease-in-out hover:scale-110 cursor-pointer"
                      style={{
                        fontSize: 30,
                        color: "white",
                      }}
                    />
                  </Badge>
                </Dropdown>
              ) : (
                <Dropdown
                  overlayStyle={{ zIndex: 10000 }}
                  trigger={windowWidth < 900 ? ["click"] : ["hover"]}
                  menu={{ items: itemsAccountOut }}
                  className="d-flex"
                >
                  <Badge>
                    <UserOutlined
                      data-aos="fade-left"
                      data-aos-duration="1500"
                      className="transition duration-300 ease-in-out hover:scale-110 cursor-pointer"
                      style={{
                        fontSize: 30,
                        color: "white",
                      }}
                    />
                  </Badge>
                </Dropdown>
              )}
            </div>
            <div
              className={`${
                openNavbar ? `h-0` : "h-72"
              }   items-center justify-between md:h-5  w-full md:flex  md:w-auto md:order-1 transition-all ease-out duration-500 md:transition-none`}
              id="navbar-search"
            >
              <div
                className={`${
                  openNavbar ? `h-0 hidden` : "h-10"
                } mt-3 md:hidden `}
              >
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
                <div>
                  <input
                    data-aos="fade-up"
                    data-aos-duration="400"
                    value={searchProduct}
                    type="text"
                    id="search-navbar"
                    className="block w-full p-2 pl-10 pr-12 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Nhập sản phẩm ..."
                    onChange={(e: any) => {
                      setSearchProduct(e?.target?.value);
                    }}
                  />
                  <button
                    data-aos="fade-right"
                    data-aos-duration="400"
                    className="absolute inset-y-0  text-white   border-primary px-2 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
                    type="button"
                    id="button-addon3"
                    onClick={async () => {
                      if (searchProduct) {
                        await productSearch(searchProduct);
                        router.push(`/searchpage`);
                        setSearchProduct("");
                        setOpenNavbar(false);
                      } else {
                        message.error("Vui lòng nhập tên sản phẩm!!");
                      }
                    }}
                  >
                    <SearchOutlined />
                  </button>
                </div>
              </div>
              <ul
                className={`${
                  openNavbar ? `h-0 hidden` : ""
                } md:flex items-center p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700`}
              >
                <li data-aos="fade-left" data-aos-duration="600">
                  <Link
                    href="/"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    aria-current="page"
                  >
                    Trang chủ
                  </Link>
                </li>
                <li data-aos="fade-left" data-aos-duration="800">
                  <Link
                    href="/products"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Sản phẩm
                  </Link>
                </li>
                <li data-aos="fade-left" data-aos-duration="1000">
                  <Link
                    href="thuonghieu"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Thương hiệu
                  </Link>
                </li>
                <li data-aos="fade-left" data-aos-duration="1200">
                  <Link
                    href="lienhe"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Liên hệ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavabarTailwind;
