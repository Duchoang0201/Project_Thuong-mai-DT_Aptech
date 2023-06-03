import React from "react";
import { Collapse } from "antd";
const { Panel } = Collapse;
import Style from "./index.module.css";
type Props = {};

function AboutUs({}: Props) {
  return (
    <>
      <div className="container">
        <h2 className="d-flex justify-content-center pt-5 pb-4">
          Về chúng tôi
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

                  <li>
                    Slogan/ Câu khẩu hiệu: Niềm Tin và Phong Cách Tầm nhìn: Trở
                    thành công ty hàng đầu Châu Á về chế tác trang sức và bán lẻ
                    sản phẩm tôn vinh vẻ đẹp, vươn tầm thế giới. Sứ mệnh: Jewel
                    không ngừng sáng tạo để mang lại những sản phẩm tinh tế với
                    giá trị thật để tôn vinh vẻ đẹp cho con người và cuộc sống.
                    Giá trị cốt lõi: Chính trực để trường tồn, Kiên định bám mục
                    tiêu, Quan tâm cùng phát triển, Tận tâm vì khách hàng, Tiên
                    phong tạo khác biệt.
                  </li>
                </ul>
              </Panel>
            </Collapse>
            <Collapse size="small">
              <Panel
                header="Quá trình phát triển Trang sức & đá quý Jewel"
                key="1"
              >
                <ul>
                  <span>
                    2022: Tăng tốc tái tạo – Ứng biến vươn cao Năm 2022, Jewel
                    tiếp tục kiên định với các định hướng đến giai đoạn tăng
                    trưởng mới: Tăng trưởng vững chắc với trọng tâm duy trì vị
                    thế số một tại thị trường; Không ngừng phát triển đồng bộ
                    năng lực sản xuất, quản trị chuỗi cung ứng, quản trị chiến
                    lược, marketing,.. để tạo sức mạnh toàn diện của doanh
                    nghiệp; tiếp tục công cuộc làm giàu tài nguyên nguồn nhân
                    lực, tài nguyên thương hiệu, tài nguyên khách hàng, để gia
                    tăng giá trị cốt lõi của doanh nghiệp… Đặc biệt, trong năm
                    2022 khi bối cảnh thị trường vẫn còn nhiều khó khăn và biến
                    động, tuy nhiên Jewel vẫn đạt được kết quả kinh doanh ấn
                    tượng với doanh thu thuần và lợi nhuận sau thuế đạt 33,876
                    tỷ đồng (tăng 73.3% so với cùng kỳ) và 1,807 tỷ đồng (tăng
                    75.6% so với cùng kỳ).
                  </span>
                  <span>
                    2018 – 2021: F5 – REFRESH: Kiến tạo kỳ tích mới Năm 2018,
                    Jewel đánh dấu mốc son 30 năm với Fashion Show trang sức lớn
                    nhất Việt Nam, lập bộ huy chương Niềm tin vàng tặng đội
                    tuyển U23 Việt Nam, 3 lần liên tiếp lọt Top 10 trong 100
                    Doanh nghiệp phát triển bền vững, trở thành doanh nghiệp vốn
                    hóa tỷ đô cùng nhiều giải thưởng khác. Năm 2019, chính thức
                    mở ra giai đoạn phát triển mới khi trở thành nhà bán lẻ số 1
                    ngành kim hoàn Châu Á và bắt tay “ông lớn” Walt Disney mở ra
                    cơ hội thâm nhập thị trường quốc tế. Jewel tiếp tục khẳng
                    định uy tín của mình với sự kiện thiết kế chế tác tranh trao
                    tặng Chủ tịch Triều Tiên với nhiều giải thưởng uy tín trong
                    nước và quốc tế. Năm 2020, Jewel trở thành Doanh nghiệp xuất
                    sắc nhất ngành kim hoàn Châu Á – Thái Bình Dương và được
                    Forbes Việt Nam định giá 93,1 triệu USD, tăng 18% so với kỳ
                    đánh giá 2019. Bên cạnh đó cùng những hành động kịp thời và
                    hiệu quả trong tiến trình F5-Refresh cũng đã được Talentnet
                    đánh giá cao và vinh danh Chính sách nhân sự ứng biến Covid
                    xuất sắc. Ngoài ra, nhãn hiệu mới STYLE By Jewel đã được ra
                    đời vào năm này. Năm 2021, nối tiếp trên con đường trở thành
                    nhà bán lẻ chuyên nghiệp và mở đầu chiến lược phân phối đa
                    thương hiệu với sự hợp tác cùng Pandora. Sự tích hợp thương
                    hiệu quốc tế trên toàn hệ thống giúp Jewel khai thác thêm
                    tập khách hàng tiềm năng, ưa chuộng sản phẩm đẳng cấp quốc
                    tế, đồng thời kích thích trải nghiệm các dòng sản phẩm trong
                    hệ sinh thái thương hiệu Jewel. Đồng thời, năm 2021 cũng
                    đánh dấu nhiều thành công của Jewel trên con đường hoàn
                    thiện hệ thống bán hàng đa kênh và tiến nhanh vào thị trường
                    số hóa trên cơ sở phân tích tâm lý, hành vi tiêu dùng của cư
                    dân số hóa.
                  </span>
                </ul>
              </Panel>
            </Collapse>
            <Collapse size="small">
              <Panel header="Thành tựu đạt được" key="1">
                <ul>
                  <li>Top 3 nhà bán lẻ khu vực Châu Á - JNA</li>
                  <li>Top 6 thương hiệu của năm – JNA</li>
                  <li>Môi trường làm việc tốt nhất Châu Á</li>
                  <li>Top 100 môi trường làm việc tốt nhất Việt Nam</li>
                  <li>Top 50 công ty kinh doanh hiệu quả nhất</li>
                  <li>Hàng Việt Nam chất lượng cao</li>
                  <li>Top 6 thương hiệu của năm – JNA</li>
                  <li>Thương hiệu quốc gia</li>
                  <li>Top 50 thương hiệu tuyển dụng hấp dẫn nhất</li>
                  <li>Top 50 công ty kinh doanh hiệu quả nhất</li>
                </ul>
              </Panel>
            </Collapse>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
