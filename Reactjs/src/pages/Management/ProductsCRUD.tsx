import {
  ClearOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Pagination,
  Select,
  Space,
  Table,
  Typography,
} from "antd";
import Search from "antd/es/input/Search";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

interface Product {
  _id: string;
  id: string;
  name: string;
  price: number;
  description: string;
  category: {
    _id: string;
    name: string;
    description: string;
    id: number;
  };
  image: string;
  discount: number;
  stock: number;
  categoryId: string;
  supplierId: string;
  supplier: {
    _id: string;
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
  };
  total: number;
}
const ProductsCRUD = () => {
  const API_URL = "http://localhost:9000/products";
  const [categories, setCategories] = useState<Array<any>>([]);
  const [suppliers, setSuppliers] = useState([]);

  //For FILLTER
  // const [products, setProducts] = useState<Array<any>>([]);
  const [productsTEST, setProductsTEST] = useState<Array<any>>([]);
  const [productsFilter, setProductsFilter] = useState(API_URL);

  const [open, setOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [deleteItem, setDeleteItem] = useState<Product>();

  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [updateId, setUpdateId] = useState(0);
  const [refresh, setRefresh] = useState(0);
  const [updateForm] = Form.useForm();
  const [createForm] = Form.useForm();
  const [inforPrice] = Form.useForm();
  const [inforDiscount] = Form.useForm();
  const [inforStock] = Form.useForm();

  //Handle Create a Data
  const handleCreate = (record: any) => {
    // console.log(record);

    axios
      .post(API_URL, record)
      .then((res) => {
        console.log(res);
        setRefresh((f) => f + 1);
        setOpenCreate(false);
        createForm.resetFields();
        message.success("Create a product successFully!!", 1.5);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        // err.response.data.errors.map((item: any, index: any) => {
        //   message.error(`${item}`, 5);
        // });
      });
  };

  //handle Delete Data
  const handleDelete = (record: any) => {
    axios
      .delete(API_URL + "/" + record._id)
      .then((res) => {
        setRefresh((f) => f + 1);
        setOpenDeleteConfirm(false);
        setProductsFilter((f) => f + 1);
        message.success("Delete a product successFully!!", 3);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Update a data
  const handleUpdate = (record: any) => {
    axios
      .patch(API_URL + "/" + updateId, record)
      .then((res) => {
        setProductsFilter((f) => f + 1);
        message.success(`Update product ${record.name} successFully!!`, 3);
        setOpen(false);
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  };

  //Search DEPEN ON CATEGORY

  // const [categoryId, setCategoryId] = useState("");

  // const onChangeCategory = (value: string) => {
  // console.log(`selected ${value}`);
  //   setCategoryId(value);
  // };
  // const onChangeCategoryFillter = (value: string) => {
  //   console.log(`selected ${value}`);
  //   onSearchCategory(value);
  // };

  const [categoryId, setCategoryId] = useState("");

  const onSearchCategory = useCallback((value: any) => {
    if (value) {
      setCategoryId(value);
    } else {
      setCategoryId("");
    }
    // if (value) {
    //   setCategoryId(value);
    //   setProductsFilter((f) => f + 1);
    // } else {
    // setCategoryId("");
    //   setProductsFilter((f) => f + 1);
    // }
  }, []);

  // SEARCH DEPEND ON SUPPLIER
  const [supplierId, setSupplierId] = useState("");
  // const onChangeSupplier = (value: string) => {
  //   console.log(`selected ${value}`);
  //   setSupplierId(value);
  // };

  const onSearchSupplier = useCallback((value: any) => {
    if (value) {
      setSupplierId(value);
    } else {
      setSupplierId("");
    }
    // if (value) {
    //   setSupplierId(value);
    //   setProductsFilter((f) => f + 1);
    // } else {
    //   setSupplierId("");
    //   setProductsFilter((f) => f + 1);
    // }
  }, []);

  //SEARCH DEPEN ON NAME
  const [productName, setProductName] = useState("");

  const onSearchProductName = (record: any) => {
    setProductName(record);
  };

  //Search on Price
  const [fromPrice, setFromPrice] = useState("");
  const [toPrice, setToPrice] = useState("");

  const submitSearchPrice = (value: any) => {
    setFromPrice(value.fromPrice ? value.fromPrice : "");
    setToPrice(value.toPrice ? value.toPrice : "");
  };
  //Search on Discount
  const [fromDiscount, setFromDiscount] = useState("");
  const [toDiscount, setToDiscount] = useState("");

  const submitSearchDiscount = (value: any) => {
    setFromDiscount(value.fromDiscount ? value.fromDiscount : "");
    setToDiscount(value.toDiscount ? value.toDiscount : "");
  };

  //Search on Stock
  const [fromStock, setFromStock] = useState("");
  const [toStock, setToStock] = useState("");

  const submitSearchStock = (value: any) => {
    setFromStock(value.fromStock ? value.fromStock : "");
    setToStock(value.toStock ? value.toStock : "");
  };

  //Search on Skip and Limit

  // const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const slideCurrent = (value: any) => {
    setSkip(value * 10 - 10);
    setCurrentPage(value);
  };

  const [pages, setPages] = useState();
  console.log(pages);
  //CALL API PRODUCT FILLTER
  const URL_FILTER = `http://localhost:9000/products?${
    productName && `&productName=${productName}`
  }${supplierId && `&supplierId=${supplierId}`}${
    categoryId && `&categoryId=${categoryId}`
  }${fromPrice && `&fromPrice=${fromPrice}`}${
    toPrice && `&toPrice=${toPrice}`
  }${fromDiscount && `&fromDiscount=${fromDiscount}`}${
    toDiscount && `&toDiscount=${toDiscount}`
  }${fromStock && `&fromStock=${fromStock}`}${
    toStock && `&toStock=${toStock}`
  }${skip ? `&skip=${skip}` : ""}&limit=${10}`;
  console.log("««««« URL_FILTER »»»»»", URL_FILTER);
  useEffect(() => {
    axios
      .get(URL_FILTER)
      .then((res) => {
        setProductsTEST(res.data.results);
        setPages(res.data.amountResults);
      })
      .catch((err) => console.log(err));
  }, [URL_FILTER, productsFilter]);

  console.log(refresh);
  //CALL API PRODUCT DEFAULT
  // useEffect(() => {
  //   axios
  //     .get(API_URL)
  //     .then((res) => {
  //       setProducts(res.data.results);
  //     })
  //     .catch((err) => console.log(err));
  // }, [refresh]);

  //CALL API CATEGORY
  useEffect(() => {
    axios
      .get("http://localhost:9000/categories")
      .then((res) => {
        // setCategories(res.data.map((item: any) => item.name));
        // console.log(
        //   res.data.map((item: any) => ({
        //     name: item.category.name,
        //     id: item.category._id,
        //   }))
        // );

        // console.log(res.data);
        // const mergedArray = res.data
        //   .map((item: any) => ({
        //     name: item.category.name,
        //     id: item.category._id,
        //   }))
        //   .reduce((acc: any, current: any) => {
        //     const index = acc.findIndex((item: any) => item.id === current.id);
        //     if (index === -1) {
        //       acc.push(current);
        //     } else {
        //       acc[index].name = current.name;
        //     }
        //     return acc;
        //   }, []);
        // console.log(mergedArray);
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  }, [refresh]);

  //CALL API SUPPLIER
  useEffect(() => {
    axios
      .get("http://localhost:9000/suppliers")
      .then((res) => {
        setSuppliers(res.data);
      })
      .catch((err) => console.log(err));
  }, [refresh]);

  //Columns
  const columns = [
    //Id
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (text: string, record: any, index: number) => {
        return (
          <div>
            {currentPage === 1 ? index + 1 : index + currentPage * 10 - 9}
          </div>
        );
      },
    },
    //Category
    {
      title: () => {
        return (
          <div>
            {categoryId ? (
              <div className="text-danger">Category</div>
            ) : (
              <div className="secondary">Category</div>
            )}
          </div>
        );
      },
      dataIndex: ["category", "name"],
      key: "category",

      filterDropdown: (clearFilters: any) => {
        return (
          <div style={{ width: "150px" }}>
            <Select
              allowClear
              autoClearSearchValue={!categoryId ? true : false}
              showSearch
              style={{ width: "100%" }}
              placeholder="Select a product"
              optionFilterProp="children"
              onChange={onSearchCategory}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              options={categories.map((item: any, index: any) => ({
                label: item.name,
                value: item._id,
              }))}
            />

            {/* {categoryId && (
              <span style={{ width: "20%" }}>
                <Button
                  onClick={() => {
                    setCategoryId("");
                  }}
                  icon={<ClearOutlined />}
                />
              </span>
            )} */}
          </div>
        );
      },
    },
    //Supplier
    {
      title: () => {
        return (
          <div>
            {supplierId ? (
              <div className="text-danger">Supplier</div>
            ) : (
              <div className="secondary">Supplier</div>
            )}
          </div>
        );
      },
      dataIndex: ["supplier", "name"],
      key: "supplier",
      filterDropdown: () => {
        return (
          <>
            <div>
              <Select
                allowClear
                // autoClearSearchValue={!supplierId ? true : false}
                onClear={() => {
                  setSupplierId("");
                }}
                style={{ width: "125px" }}
                placeholder="Select a supplier"
                optionFilterProp="children"
                onChange={onSearchSupplier}
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={suppliers.map((item: any, index: any) => {
                  return {
                    label: `${item.name}`,
                    value: item._id,
                  };
                })}
              />
              {/* {supplierId && (
                <span style={{ width: "20%" }}>
                  <Button
                    onClick={() => {
                      setSupplierId("");
                    }}
                    icon={<ClearOutlined />}
                  />
                </span>
              )} */}
            </div>
          </>
        );
      },
      render: (text: string, record: any) => {
        return <span>{record.supplier?.name}</span>;
      },
      width: "20%",
      height: "auto",
    },
    //Name
    {
      width: "50%",
      title: () => {
        return (
          <div>
            {productName ? (
              <div className="text-danger">Product Name</div>
            ) : (
              <div className="secondary">Product Name</div>
            )}
          </div>
        );
      },
      dataIndex: "name",
      key: "name",
      filterDropdown: () => {
        return (
          <div style={{ padding: 8 }}>
            <Search
              allowClear
              placeholder="input search text"
              onSearch={onSearchProductName}
              style={{ width: 200 }}
            />
          </div>
        );
      },
    },
    //Price
    {
      title: () => {
        return (
          <div>
            {fromPrice || toPrice ? (
              <div className="text-danger">Price</div>
            ) : (
              <div className="secondary">Price</div>
            )}
          </div>
        );
      },
      dataIndex: "price",
      key: "price",
      filterDropdown: () => {
        return (
          <Form
            form={inforPrice}
            name="inforPrice"
            onFinish={submitSearchPrice}
            style={{
              padding: "5px",
              width: fromPrice || toPrice ? "350px" : "300px",
              height: "50px",
            }}
          >
            <Space>
              <Form.Item hasFeedback label="from" name="fromPrice">
                <InputNumber placeholder="Enter From" min={1} />
              </Form.Item>
              <Form.Item hasFeedback label="to" name="toPrice">
                <InputNumber placeholder="Enter to" min={1} />
              </Form.Item>
              <span>
                <Form.Item>
                  <Button
                    style={{ width: "30px", right: "-10px" }}
                    type="primary"
                    htmlType="submit"
                    icon={<SearchOutlined />}
                  />
                </Form.Item>
              </span>
              <span>
                {fromPrice || toPrice ? (
                  <Form.Item>
                    <Button
                      style={{ width: "30px", right: "-8px" }}
                      type="primary"
                      onClick={() => {
                        setFromPrice("");
                        setToPrice("");
                        inforPrice.resetFields();
                      }}
                      icon={<ClearOutlined />}
                    />
                  </Form.Item>
                ) : (
                  ""
                )}
              </span>
            </Space>
          </Form>
        );
      },
    },

    //Discount
    {
      title: () => {
        return (
          <div>
            {fromDiscount || toDiscount ? (
              <div className="text-danger">Discount</div>
            ) : (
              <div className="secondary">Discount</div>
            )}
          </div>
        );
      },
      dataIndex: "discount",
      key: "discount",
      filterDropdown: () => {
        return (
          <Form
            form={inforDiscount}
            name="inforDiscount"
            onFinish={submitSearchDiscount}
            style={{
              padding: "5px",
              width: fromDiscount || toDiscount ? "350px" : "300px",
              height: "50px",
            }}
          >
            <Space>
              <Form.Item hasFeedback label="from" name="fromDiscount">
                <InputNumber placeholder="Enter From" min={1} />
              </Form.Item>
              <Form.Item hasFeedback label="to" name="toDiscount">
                <InputNumber placeholder="Enter To" min={1} />
              </Form.Item>
              <span style={{ width: "20%" }}>
                <Form.Item>
                  <Button
                    style={{ width: "30px", right: "-10px" }}
                    type="primary"
                    htmlType="submit"
                    icon={<SearchOutlined />}
                  />
                </Form.Item>
              </span>
              <span>
                {fromDiscount || toDiscount ? (
                  <Form.Item>
                    <Button
                      style={{ width: "30px", right: "-8px" }}
                      type="primary"
                      onClick={() => {
                        setFromDiscount("");
                        setToDiscount("");
                        inforDiscount.resetFields();
                      }}
                      icon={<ClearOutlined />}
                    />
                  </Form.Item>
                ) : (
                  ""
                )}
              </span>
            </Space>
          </Form>
        );
      },
    },
    //Stock
    {
      title: () => {
        return (
          <div>
            {fromStock || toStock ? (
              <div className="text-danger">Stock</div>
            ) : (
              <div className="secondary">Stock</div>
            )}
          </div>
        );
      },
      dataIndex: "stock",
      key: "stock",
      filterDropdown: () => {
        return (
          <Form
            form={inforStock}
            name="inforStock"
            onFinish={submitSearchStock}
            style={{
              padding: "5px",
              width: fromStock || toStock ? "350px" : "300px",
              height: "50px",
            }}
          >
            <Space>
              <Form.Item hasFeedback label="from" name="fromStock">
                <InputNumber min={1} placeholder="Enter From" />
              </Form.Item>
              <Form.Item hasFeedback label="to" name="toStock">
                <InputNumber min={1} placeholder="Enter To" />
              </Form.Item>
              <span style={{ width: "20%" }}>
                <Form.Item>
                  <Button
                    style={{ width: "30px", right: "-4px" }}
                    type="primary"
                    htmlType="submit"
                    icon={<SearchOutlined />}
                  />
                </Form.Item>
              </span>
              <span>
                {fromStock || toStock ? (
                  <Form.Item>
                    <Button
                      style={{ width: "30px", right: "-8px" }}
                      type="primary"
                      onClick={() => {
                        setFromStock("");
                        setToStock("");
                        inforStock.resetFields();
                      }}
                      icon={<ClearOutlined />}
                    />
                  </Form.Item>
                ) : (
                  ""
                )}
              </span>
            </Space>
          </Form>
        );
      },
    },
    //Function
    {
      title: "Function",
      dataIndex: "function",
      key: "function",
      render: (text: string, record: any) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setOpen(true);
              setUpdateId(record._id);
              updateForm.setFieldsValue(record);
            }}
          >
            Edit
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              setDeleteItem(record);
              setOpenDeleteConfirm(true);
            }}
          >
            Delete
          </Button>
        </Space>
      ),
      filterDropdown: () => {
        return (
          <>
            <Space direction="vertical">
              <Button
                style={{ width: "150px" }}
                onClick={() => {
                  setSupplierId("");
                  setProductName("");
                  setCategoryId("");
                  //Price
                  // setFromPrice("");
                  // setToPrice("");
                  inforPrice.resetFields();
                  //Discount
                  // setFromDiscount("");
                  // setToDiscount("");
                  inforDiscount.resetFields();
                  //Stock
                  // setFromStock("");
                  // setToStock("");
                  inforStock.resetFields();
                }}
                icon={<ClearOutlined />}
              >
                Clear filter
              </Button>
              <Button
                style={{ width: "150px" }}
                onClick={() => {
                  setOpenCreate(true);
                }}
                icon={<PlusCircleOutlined />}
              >
                Add product
              </Button>
            </Space>
            {/* <div>
              <InputNumber
                min={1}
                max={10}
                defaultValue={3}
                onChange={(e: any) => setLimit(e)}
              />
              <Button style={{ paddingTop: "3px" }} icon={<SearchOutlined />} />
            </div> */}
          </>
        );
      },
    },
  ];
  const { Text } = Typography;
  return (
    <>
      {/* Modal Create A product */}
      <Modal
        title={`Create Product `}
        open={openCreate}
        onCancel={() => {
          setOpenCreate(false);
        }}
        onOk={() => {
          createForm.submit();
          setRefresh((f) => f + 1);
        }}
        okText="Submit"
      >
        <Form
          className="container px-5"
          form={createForm}
          name="createForm"
          onFinish={handleCreate}
        >
          <Form.Item
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            hasFeedback
            label="Category"
            name="categoryId"
            rules={[
              {
                required: true,
                message: "Please enter Category Name",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Select a person"
              optionFilterProp="children"
              onSearch={onSearchCategory}
              filterOption={(input: any, option: any) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={categories.map((item: any, index: any) => {
                return {
                  label: `${item.name}`,
                  value: item._id,
                };
              })}
            />
          </Form.Item>{" "}
          <Form.Item
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            hasFeedback
            label="Suppliers"
            name="supplierId"
            rules={[
              {
                required: true,
                message: "Please enter Category Name",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Select a person"
              optionFilterProp="children"
              onSearch={onSearchCategory}
              filterOption={(input: any, option: any) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={suppliers.map((item: any, index: any) => {
                return {
                  label: `${item.name}`,
                  value: item._id,
                };
              })}
            />
          </Form.Item>
          <Form.Item
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            hasFeedback
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter Product Name",
              },
            ]}
          >
            <Input />
          </Form.Item>{" "}
          <Form.Item
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            hasFeedback
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please enter Price" }]}
          >
            <InputNumber min={1} />
          </Form.Item>{" "}
          <Form.Item
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            hasFeedback
            name="discount"
            label="Discount"
            rules={[
              {
                required: true,
                message: "Please enter Discount",
              },
            ]}
          >
            <InputNumber min={1} max={75} />
          </Form.Item>{" "}
          <Form.Item
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            hasFeedback
            name="stock"
            label="Stock"
            rules={[{ required: true, message: "Please enter Stock" }]}
          >
            <InputNumber min={1} />
          </Form.Item>{" "}
        </Form>
      </Modal>
      {/* List and function Product */}
      <Table
        tableLayout="auto"
        className="container"
        rowKey="id"
        columns={columns}
        dataSource={
          productsTEST
          // ? productsTEST : products
        }
        pagination={false}
        // dataSource={filterOn ? suppliersFilter : products}
      >
        {" "}
      </Table>

      {/* Modal confirm Delte */}
      <Modal
        open={openDeleteConfirm}
        onOk={() => handleDelete(deleteItem)}
        okText="Delete"
        okType="danger"
        onCancel={() => setOpenDeleteConfirm(false)}
      >
        <h5>Are you sure to delete?</h5>
        <strong>Product : </strong>
        <Text type="danger">{deleteItem?.name}</Text>
      </Modal>

      {/* Modal Update */}
      <Modal
        title={`Update Product:  `}
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
        onOk={() => {
          updateForm.submit();
          setRefresh((f) => f + 1);
        }}
      >
        <Form
          className="container px-5"
          form={updateForm}
          name="updateForm"
          onFinish={handleUpdate}
        >
          <Form.Item
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            hasFeedback
            label="Category"
            name="categoryId"
            rules={[
              {
                required: true,
                message: "Please enter Category Name",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Select a person"
              optionFilterProp="children"
              filterOption={(input: any, option: any) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={categories.map((item: any, index: any) => {
                return {
                  label: `${item.name}`,
                  value: item._id,
                };
              })}
            />
          </Form.Item>{" "}
          <Form.Item
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            hasFeedback
            label="Suppliers"
            name="supplierId"
            rules={[
              {
                required: true,
                message: "Please enter Category Name",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Select a person"
              optionFilterProp="children"
              filterOption={(input: any, option: any) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={suppliers.map((item: any, index: any) => {
                return {
                  label: `${item.name}`,
                  value: item._id,
                };
              })}
            />
          </Form.Item>
          <Form.Item
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            hasFeedback
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter Product Name",
              },
            ]}
          >
            <Input />
          </Form.Item>{" "}
          <Form.Item
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            hasFeedback
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please enter Price" }]}
          >
            <InputNumber min={1} />
          </Form.Item>{" "}
          <Form.Item
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            hasFeedback
            name="discount"
            label="Discount"
            rules={[
              {
                required: true,
                message: "Please enter Discount",
              },
            ]}
          >
            <InputNumber min={1} max={75} />
          </Form.Item>{" "}
          <Form.Item
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            hasFeedback
            name="stock"
            label="Stock"
            rules={[{ required: true, message: "Please enter Stock" }]}
          >
            <InputNumber min={1} />
          </Form.Item>{" "}
        </Form>
      </Modal>

      {/* Pagination */}
      <Pagination
        className="container text-end"
        onChange={(e) => slideCurrent(e)}
        defaultCurrent={1}
        total={pages}
      />
    </>
  );
};

export default ProductsCRUD;
