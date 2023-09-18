import { memo } from "react";
import React from "react";
import Style from "./Footer.module.css";
import Link from "next/link";
import Image from "next/image";
import dinamontImage from "../Navbar/transparent-jewelry-icon-diamond-icon-60251ec5ca3757.4392206316130454458283.png";

type Props = {};
const URL_ENV = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:9000";
function Footer({}: Props) {
  return (
    <>
      <hr />

      <footer className="bg-white dark:bg-gray-900">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <a href="https://flowbite.com/" className="flex items-center">
                <Image width={40} src={dinamontImage} alt={"Dianamont"} />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  Jwelry Shop
                </span>
              </a>
              <div className="text-white">
                Công ty cổ phần trang sức & đá quý Jewel Thanh Sơn, phường Thanh
                Bình, quận Hải Châu, TP. Đà Nẵng Điện thoại: 0356057252 Tổng đài
                CSKH: 18000000
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Thương hiệu
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <Link href="/thuonghieu" className="hover:underline">
                      Thông tin về Trang sức & đá quý Jewel
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Hỗ trợ thanh toán
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      MOMO
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      VN PAY
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        </div>
      </footer>
    </>
  );
}

export default memo(Footer);
