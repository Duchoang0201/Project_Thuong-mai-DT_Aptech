import React from "react";
import { Collapse } from "antd";
const { Panel } = Collapse;
type Props = {};

function LienHePage({}: Props) {
  return (
    <>
      <div className="container">
        <h2 className="d-flex justify-content-center pt-5 pb-4">
          Điện thoại và dịch vụ CSKH
        </h2>
        <div className="  d-flex justify-content-center mb-5">
          <div className="w-75">
            <Collapse size="small">
              <Panel
                header="Điện thoại và CSKH của Trang sức & đá quý Jewel"
                key="1"
              >
                <ul>
                  <li>Đường dây nóng: (+84) (356) 057 252</li>
                  <li>Tổng đài CSKH: 1800000000</li>
                  <li>Fax: 54621521</li>
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
