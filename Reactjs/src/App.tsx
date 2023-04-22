import React from "react";
import Login from "./pages/Auth/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuthStore } from "./hooks/useAuthStore";
import { Layout } from "antd";

import numeral from "numeral";
import "numeral/locales/vi";

import NotFoundPage from "./pages/NotFoundPage";
import MainMenu from "./components/MainMenu";
import HomePage from "./pages/HomePage";
import CategoryCRUD from "./pages/Management/categoryCRUD";
import ProductsCRUD from "./pages/Management/ProductsCRUD";
import EmployeesCRUD from "./pages/Management/EmployeesCRUD";
import CustomerCRUD from "./pages/Management/CustomerCRUD";
import SupperliersCRUD from "./pages/SupperliersCRUD";

numeral.locale("vi");

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const { auth } = useAuthStore((state: any) => state);

  console.log(auth);
  return (
    <>
      <div>
        <BrowserRouter>
          {!auth && (
            <Content style={{ padding: 24 }}>
              <Routes>
                <Route path="/" element={<Login />} />
                {/* NO MATCH ROUTE */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Content>
          )}

          {auth && (
            <Layout>
              <Sider theme="dark" style={{ minHeight: "100vh" }}>
                <MainMenu />
              </Sider>
              <Layout>
                <Header style={{ backgroundColor: "rgba(0,21,41)" }}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h1 style={{ color: "white" }}> ONLINE SHOP </h1>
                    <div style={{ display: "flex", color: "white" }}>
                      <strong>
                        {auth?.payload?.firstName} {auth?.payload?.lastName}
                      </strong>
                    </div>
                  </div>
                </Header>

                <Content style={{ padding: 24 }}>
                  {/* Register routes */}
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/home" element={<HomePage />} />

                    {/* MANAGEMENT */}
                    <Route
                      path="/management/products"
                      element={<ProductsCRUD />}
                    />
                    <Route
                      path="/management/suppliers"
                      element={<SupperliersCRUD />}
                    />
                    <Route
                      path="/management/employees"
                      element={<EmployeesCRUD />}
                    />
                    <Route
                      path="/management/Categories"
                      element={<CategoryCRUD />}
                    />

                    <Route
                      path="/management/customers"
                      element={<CustomerCRUD />}
                    />

                    {/* SALES */}
                    {/* <Route path='/sales/products/discount' element={<DiscountPage />} />
                  <Route path='/sales/products/stock' element={<StockPage />} /> */}

                    {/* UPLOAD */}

                    {/* <Route path='/upload/form' element={<FormUpload />} />
                  <Route path='/upload/antd' element={<AntUpload />} /> */}
                    {/* NO MATCH ROUTE */}
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </Content>
              </Layout>
            </Layout>
          )}
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
