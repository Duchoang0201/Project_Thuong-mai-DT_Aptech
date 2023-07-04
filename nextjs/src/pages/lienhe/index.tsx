import React from "react";
import { Collapse } from "antd";
const { Panel } = Collapse;
type Props = {};

function LienHePage({}: Props) {
  return (
    <>
      <div className="container">
        <h2 className="d-flex justify-content-center pt-5 pb-4">
          Liên hệ chúng tôi
        </h2>
        <div className="  d-flex justify-content-center mb-5">
          <div className="w-75">
            <Collapse size="small">
              <Panel header="Thông tin về Trang sức & đá quý Jewel" key="1">
                <ul>
                  <li>
                    Sở hữu: trên 12 trung tâm kim hoàn tại 8 tỉnh thành trên cả
                    nước
                  </li>
                  <li>
                    Địa chỉ trụ sở chính: Thanh Sơn, Thanh Bình, Hải Châu, Đà
                    Nẵng, Việt Nam
                  </li>
                  <li>Điện thoại: (+84) (356) 057 252</li>
                  <li>Tổng đài CSKH: 1800000000</li>
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
