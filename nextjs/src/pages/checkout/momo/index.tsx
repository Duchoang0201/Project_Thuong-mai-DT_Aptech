import React from "react";

type Props = {};

const momoCheckout = (props: Props) => {
  const URL_ENV = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:9000";

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">
                  Initial payment/Khởi tạo thanh toán ATM qua MoMo
                </h3>
              </div>
              <div className="panel-body">
                <form
                  method="POST"
                  target="_blank"
                  encType="application/x-www-form-urlencoded"
                  action={`${URL_ENV}:9000/orders/pay/create_momo_url`}
                >
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="col-form-label">PartnerCode</label>
                        <div className="input-group date" id="fxRate">
                          <input
                            type="text"
                            name="partnerCode"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="col-form-label">AccessKey</label>
                        <div className="input-group date" id="fxRate">
                          <input
                            type="text"
                            name="accessKey"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="col-form-label">SecretKey</label>
                        <div className="input-group date" id="fxRate">
                          <input
                            type="text"
                            name="secretKey"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="col-form-label">OrderId</label>
                        <div className="input-group date" id="fxRate">
                          <input
                            type="text"
                            name="orderId"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="col-form-label">ExtraData</label>
                        <div className="input-group date" id="fxRate">
                          <input
                            type="text"
                            name="extraData"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="col-form-label">OrderInfo</label>
                        <div className="input-group date" id="orderInfo">
                          <input
                            type="text"
                            name="orderInfo"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="col-form-label">Amount</label>
                        <div className="input-group date" id="fxRate">
                          <input
                            type="text"
                            name="amount"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="col-form-label">IpnUrl</label>
                        <div className="input-group date" id="fxRate">
                          <input
                            type="text"
                            name="ipnUrl"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="col-form-label">RedirectUrl</label>
                        <div className="input-group date" id="fxRate">
                          <input
                            type="text"
                            name="redirectUrl"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <p>
                    <div style={{ marginTop: "1em" }}>
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                        Start MoMo payment....
                      </button>
                    </div>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default momoCheckout;
