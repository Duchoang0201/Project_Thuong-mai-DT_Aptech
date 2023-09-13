import React, { useEffect, useState } from "react";
import style from "./Navbar.module.css";
import dinamontImage from "./transparent-jewelry-icon-diamond-icon-60251ec5ca3757.4392206316130454458283.png";
import Image from "next/image";
import { Avatar, Badge, Dropdown, Space, message } from "antd";
import { useCartStore } from "@/hook/useCountStore";
import { API_URL } from "@/contants/URLS";
import {
  LogoutOutlined,
  PhoneOutlined,
  SearchOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import router from "next/router";
import Link from "next/link";
import { PropsSearch } from "@/hook/PropsSearch";
import { signOut, useSession } from "next-auth/react";
const NavabarTailwind = () => {
  const { items: itemsCart, removeAllCheck }: any = useCartStore(
    (state: any) => state
  );

  const { data: session } = useSession();
  const user = session?.user;
  const { search } = PropsSearch((state: any) => state);
  const [scroll, setScroll] = useState<number>(10);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [openNavbar, setOpenNavbar] = useState(false);
  const [searchProduct, setSearchProduct] = useState("");
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
            signOut();
            removeAllCheck();
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
      <div className={scroll > 60 ? style.container : style.contaier__Scroll}>
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <div className="flex flex-wrap w-32  items-center justify-between p-2">
              <div className="transition duration-300 ease-in-out hover:scale-110 cursor-pointer ">
                {" "}
                <ShopOutlined style={{ fontSize: 30, color: "white" }} />
              </div>

              <div className="transition duration-300 ease-in-out hover:scale-110 cursor-pointer">
                {" "}
                <PhoneOutlined style={{ fontSize: 30, color: "white" }} />
              </div>
            </div>
            <Link href="/" className="items-center md:flex hidden">
              <Image width={80} src={dinamontImage} alt={"Dianamont"} />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Diamont
              </span>
            </Link>
            <div className="flex flex-wrap w-32  items-center justify-between p-2">
              {user ? (
                <Dropdown
                  overlayStyle={{ zIndex: 10000 }}
                  menu={{
                    items: itemsCart.map((item: any, index: number) => ({
                      key: index.toString(),
                      label: (
                        <div className="flex justify-between">
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
                  className="flex"
                >
                  <Badge count={itemsCart?.length}>
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
                  trigger={["hover"]} // Change this to "hover" if you want the dropdown to appear on hover instead of click
                >
                  <Badge count={0}>
                    <ShoppingCartOutlined
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
          </div>
        </nav>

        <nav className="bg-white border-gray-200 dark:bg-gray-900">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <div className="w-20 md:hidden"></div>
            <div className="text-center justify-center">
              {" "}
              <Link href="/" className="items-center md:hidden">
                <Image width={80} src={dinamontImage} alt={"Dianamont"} />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
              </Link>
            </div>
            <div className="flex md:order-2">
              <div className="relative hidden md:block">
                <div className="Search relative">
                  <input
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
                    className="absolute inset-y-0 right-0 text-white  border-l-2 border-primary px-2 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
                    type="button"
                    id="button-addon3"
                    data-te-ripple-init
                    onClick={() => {
                      if (searchProduct) {
                        search(searchProduct);
                        router.push(`/searchpage`);
                        setTimeout(() => {
                          setSearchProduct("");
                        }, 1000);
                      }
                      {
                        message.error("Vui lòng nhập tên sản phẩm!!");
                      }
                    }}
                  >
                    <SearchOutlined />
                  </button>
                </div>
              </div>
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            </div>
            <div
              className={`${
                openNavbar ? `` : "hidden"
              }   items-center justify-between  w-full md:flex md:w-auto md:order-1`}
              id="navbar-search"
            >
              <div className="relative mt-3 md:hidden">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <div className="Search relative">
                  <input
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
                    className="absolute inset-y-0  text-white   border-primary px-2 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
                    type="button"
                    id="button-addon3"
                    onClick={async () => {
                      if (searchProduct) {
                        await search(searchProduct);
                        router.push(`/searchpage`);
                        setSearchProduct("");
                        setOpenNavbar(false);
                      }
                      {
                        message.error("Vui lòng nhập tên sản phẩm!!");
                      }
                    }}
                  >
                    <SearchOutlined />
                  </button>
                </div>
              </div>
              <ul className=" md:flex p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <Link
                    href="/"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    aria-current="page"
                  >
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Sản phẩm
                  </Link>
                </li>
                <li>
                  <Link
                    href="thuonghieu"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Thương hiệu
                  </Link>
                </li>
                <li>
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
