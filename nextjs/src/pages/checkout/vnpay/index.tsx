import React from "react";

const PaymentForm = () => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission
    // You can access form data using e.target.elements
  };
  const URL_ENV = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:9000";

  return (
    <div>
      <h3>123</h3>
      <div className="table-responsive">
        <form action={`${URL_ENV}/orders/pay/create_vnpay_url`} method="POST">
          <div className="form-group">
            <label htmlFor="amount">Số tiền</label>
            <input
              className="form-control"
              type="text"
              id="amount"
              name="amount"
              placeholder="Số tiền"
            />
          </div>

          <div className="form-group">
            <label>Chọn Phương thức thanh toán:</label>
            <div className="controls">
              <label className="radio-inline">
                <input
                  type="radio"
                  name="bankCode"
                  id="defaultPaymentMethod"
                  value=""
                  checked={true}
                />{" "}
                Cổng thanh toán VNPAYQR
              </label>
              <div className="controls">
                <label className="radio-inline">
                  <input
                    type="radio"
                    name="bankCode"
                    id="vnpayqrPaymentMethod"
                    value="VNPAYQR"
                  />{" "}
                  Thanh toán qua ứng dụng hỗ trợ VNPAYQR
                </label>
              </div>
              <div className="controls">
                <label className="radio-inline">
                  <input
                    type="radio"
                    name="bankCode"
                    id="vnbankPaymentMethod"
                    value="VNBANK"
                  />{" "}
                  Thanh toán qua ATM-Tài khoản ngân hàng nội địa
                </label>
              </div>
              <div className="controls">
                <label className="radio-inline">
                  <input
                    type="radio"
                    name="bankCode"
                    id="intcardPaymentMethod"
                    value="INTCARD"
                  />{" "}
                  Thanh toán qua thẻ quốc tế
                </label>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Ngôn ngữ</label>
            <div className="controls">
              <label className="radio-inline">
                <input
                  type="radio"
                  name="language"
                  id="vnLanguage"
                  value="vn"
                  checked={true}
                />{" "}
                Tiếng việt
              </label>
              <div className="controls">
                <label className="radio-inline">
                  <input
                    type="radio"
                    name="language"
                    id="enLanguage"
                    value="en"
                  />{" "}
                  Tiếng anh
                </label>
              </div>
            </div>
          </div>

          <button className="btn btn-default" type="submit" id="btnPopup">
            Thanh toán
          </button>
        </form>
      </div>
      <p>&nbsp;</p>
    </div>
  );
};

export default PaymentForm;
