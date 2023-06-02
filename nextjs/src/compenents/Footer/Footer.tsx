import { memo } from "react";
import React from "react";
import Style from "./Footer.module.css";
import Link from "next/link";
import Image from "next/image";

type Props = {};
const URL_ENV = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:9000";
function Footer({}: Props) {
  return (
    <>
      <hr />
      <div className={`container ${Style.container}`}>
        <div className={Style.content1}>
          <h3>JewelShop</h3>
          <h5>Công ty cổ phần trang sức & đá quý Jewel </h5>
          <p>Thanh Sơn, phường Thanh Bình, quận Hải Châu, TP. Đà Nẵng</p>
          <p>
            Điện thoại:{" "}
            <Link href={"/LienHe"} className="text-decoration-none">
              0356057252
            </Link>
          </p>
          <p>
            Tổng đài CSKH:{" "}
            <Link href={"/LienHe"} className="text-decoration-none">
              18000000
            </Link>
          </p>
        </div>
        <div className={Style.content2}>
          <h5>Về chúng tôi</h5>

          <p>
            <Link href={"/ThuongHieu"} className="text-decoration-none">
              Giới thiệu về thương hiệu
            </Link>
          </p>
          <p>
            {" "}
            <Link href={"/ThuongHieu"} className="text-decoration-none">
              Các chi nhánh trên toàn quốc
            </Link>
          </p>
        </div>
        <div className={Style.content3}>
          <div>
            {" "}
            <h5>Hỗ trợ thanh toán</h5>
            <Image
              alt=""
              src={`${URL_ENV}/uploads/features/6464a16b41926a2ae52c34f5/momo-logo.png`}
              width={50}
              height={50}
              style={{ fontSize: "24px", color: "white" }}
            />
            <Image
              alt=""
              src={`${URL_ENV}/uploads/features/6464a1c941926a2ae52c34fd/vnpay-logo.png`}
              width={50}
              height={50}
              style={{ fontSize: "24px", color: "white" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(Footer);
