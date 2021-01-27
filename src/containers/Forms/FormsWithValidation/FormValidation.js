import React from "react";
import { Form, Input, Checkbox, Button } from "antd";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 8
    }
  },
  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 16
    }
  }
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};

const RegistrationForm = () => {
  const [form] = Form.useForm();

  const onFinish = values => {
    console.log("表單回傳: ", values.password, values.email, values.agreement);
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ["zhejiang", "hangzhou", "xihu"],
        prefix: "86"
      }}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "無效 E-mail!"
          },
          {
            required: true,
            message: "請輸入電子郵件!"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="密碼"
        rules={[
          {
            required: true,
            message: "請輸入密碼"
          }
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="確認密碼"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "請再次確認密碼!"
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject("密碼與確認密碼不一致!");
            }
          })
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject("未勾選「個人隱私條款」")
          }
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          我已經閱讀 <a href="/">個人隱私條款</a>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          註冊
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;
