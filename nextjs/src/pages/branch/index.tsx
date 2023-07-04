import React from "react";
import { Collapse } from "antd";
const { Panel } = Collapse;
type Props = {};

function LienHePage({}: Props) {
  return (
    <>
      <div className="container">
        <h2 className="d-flex justify-content-center pt-5 pb-4">
          Trụ sở và chi nhánh Trang sức đá quý Jewel
        </h2>
        <div className="  d-flex justify-content-center mb-5">
          <div className="w-75">
            <Collapse size="small">
              <Panel header="Trụ sở của Trang sức & đá quý Jewel" key="1">
                <ul>
                  <li>Thanh Bình - Hải Châu - TP.Đà Nẵng - Việt Nam</li>
                </ul>
              </Panel>
            </Collapse>
            <Collapse size="small">
              <Panel
                header="Các chi nhánh của Trang sức & đá quý Jewel"
                key="1"
              >
                <ul>
                  <b> 12 trung tâm kim hoàn tại 8 tỉnh thành trên cả nước:</b>

                  <li>
                    Jewel Centre Mall Củ Chi - 1239 Tỉnh lộ 8, Ấp Thạnh An, Xã
                    Trung An, Huyện Củ Chi, TP. Hồ Chí Minh
                  </li>
                  <li>622K-624 Lê Duẩn Bàu Xéo, Huyện Long Thành, Đồng Nai</li>
                  <li>
                    357 Quốc lộ 22, Xã Tân Thông Hội, H. Củ Chi, TP. Hồ Chí Minh
                  </li>
                  <li>
                    Đường Quang Trung, Phường An Phú, Tx An Khê, Tỉnh Gia Lai
                  </li>
                  <li>
                    Số 27, đường Cổ linh, P. Long Biên, Q. Long Biên, TP. Hà Nội
                  </li>
                  <li>
                    K13-14 tầng hầm B1, Vincom Mega Mall Times City, 458 Đường
                    Minh Khai, P. Vĩnh Tuy, Q. Hai Bà Trưng, TP. Hà Nội
                  </li>
                  <li>
                    Lô 1F, tầng trệt LOTTE Mart, 06 Nại Nam, P. Hòa Cường Bắc,
                    Q. Hải Châu, TP. Đà Nẵng
                  </li>
                  <li>Lê Duẩn, P. Thạc Gián, Q. Thanh Khê, TP. Đà Nẵng</li>
                  <li>
                    QL 91, KV Phụng Thạnh 1, Phường Thốt Nốt, Q. Thốt Nốt, Thốt
                    Nốt, Cần Thơ, Việt Nam
                  </li>
                  <li>54-56 Cầu Đất, P. Cầu Đất, Q. Ngô Quyền, Hải Phòng</li>
                  <li>
                    Kiosk L1- 18B Tầng 1F TTTM Gold Coast. Số 1 Trần Hưng Đạo,
                    P. Lộc Thọ, Tp. Nha Trang
                  </li>
                  <li>
                    Khu LK 03-05 Đường Quang Trung - Phường Quang Trung - TP
                    Vinh - Nghệ An
                  </li>
                </ul>
              </Panel>
            </Collapse>
          </div>
        </div>
      </div>
    </>
  );
}

export default LienHePage;
