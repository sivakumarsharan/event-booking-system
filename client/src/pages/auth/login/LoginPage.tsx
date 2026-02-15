import { Button, Form, Input, message } from "antd";
import WelcomeContent from "../common/WelcomeContent";
import { Link } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../../apiservices/userService";

function LoginPage() {
  const [loading, setLoading] = useState(false);
  
  const onFinish = async (values: never) => {
    try {
      setLoading(true);
      const response = await loginUser(values);
      
      // Don't manually set cookie - backend already set it as httpOnly cookie
      // Just show success message and redirect
      message.success(response.message);
      
      // Use window.location for hard navigation
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
      
    } catch (error: any) {
      message.error(error.response?.data?.message || error.message);
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
            Login Your Account
          </h1>
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
            Login
          </Button>
          <p>
            Don't Have An Account? <Link to="/register"> Register</Link>
          </p>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;