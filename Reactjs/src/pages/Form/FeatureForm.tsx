import React from "react";
import { Form, Input, InputNumber, Switch } from "antd";

const formFields = [
  {
    label: "Id",
    name: "_id",
    component: <Input />,
    className: "hidden",
  },

  {
    label: "Title",
    name: "title",
    rules: [{ required: true, message: "Please input Title!" }],
    component: <Input />,
  },
  {
    label: "Summary",
    name: "summary",
    rules: [{ required: true, message: "Please input Summary!" }],
    component: <Input />,
  },
  {
    label: "URL",
    name: "url",
    rules: [{ required: true, message: "Please input URL!" }],
    component: <Input />,
  },
  {
    label: "Sort Order",
    name: "sortOrder",
    rules: [{ required: true, message: "Please input Sort Order!" }],
    component: <InputNumber />,
  },
  {
    label: "Active",
    name: "active",
    component: <Switch />,
  },
  {
    label: "Note",
    name: "note",
    component: <Input />,
  },
];

function FeatureForm() {
  return (
    <>
      {formFields.map((field) => (
        <Form.Item
          key={field.name}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 16,
          }}
          hasFeedback
          label={field.label}
          name={field.name}
          rules={field.rules}
          className={field.className && field.className}
        >
          {field.component}
        </Form.Item>
      ))}
    </>
  );
}

export default FeatureForm;
