import { Button, Form, Input, message } from "antd";
import WelcomeContent from "../common/WelcomeContent";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../../apiservices/userService";
import { useState } from "react";

function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values: never) => {
    try {
      setLoading(true);
      const response = await registerUser(values);
      message.success(response.message);
      navigate("/login");
    } catch (error: any) {
      message.error(error.response?.data.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="col-span-1 lg:flex hidden">
        <WelcomeContent />
      </div>

      <div className="h-screen flex items-center justify-center">
        <Form
          className="flex flex-col gap-5 w-96"
          layout="vertical"
          onFinish={onFinish}
        >
          <h1 className="text-2xl font-bold text-gray-600">
            Register Your Account
          </h1>
          <Form.Item
            name="name"
            label="Full Name"
            required
            rules={[
              { required: true, message: "Please Provide Your Full Name!" },
            ]}
          >
            <Input placeholder="Full Name"></Input>
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            required
            rules={[{ required: true, message: "Please Provide Your Email!" }]}
          >
            <Input placeholder="Email"></Input>
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            required
            rules={[{ required: true, message: "Please Provide A Password!" }]}
          >
            <Input.Password placeholder="Password"></Input.Password>
          </Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Register
          </Button>
          <p>
            Already Have An Account? <Link to="/login"> Login</Link>
          </p>
        </Form>
      </div>
    </div>
  );
}

export default RegisterPage;
