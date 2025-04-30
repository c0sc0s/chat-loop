import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Switch } from "@heroui/switch";
import { Link } from "@heroui/link";

import { authApi } from "../api";
import { LoginInput, RegisterInput, ErrorResponse } from "../types";

interface AuthFormProps {
  onSubmit: (data: any) => Promise<void>;
  isRegister?: boolean;
}

const AuthForm = ({ onSubmit, isRegister = false }: AuthFormProps) => {
  const [formData, setFormData] = useState<LoginInput | RegisterInput>(
    isRegister
      ? {
          username: "",
          email: "",
          password: "",
          phone: "",
        }
      : {
          email: "",
          password: "",
        },
  );
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await onSubmit(formData);
    } catch (err) {
      setError("认证失败，请检查您的输入。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {isRegister && (
        <Input
          isRequired
          autoComplete="username"
          className="mb-2"
          label="用户名"
          labelPlacement="outside"
          name="username"
          placeholder="请输入用户名"
          type="text"
          value={(formData as RegisterInput).username}
          onChange={handleChange}
        />
      )}

      <Input
        isRequired
        autoComplete="email"
        className="mb-2"
        label="邮箱地址"
        labelPlacement="outside"
        name="email"
        placeholder="请输入邮箱地址"
        type="email"
        value={formData.email}
        onChange={handleChange}
      />

      <Input
        isRequired
        autoComplete={isRegister ? "new-password" : "current-password"}
        className="mb-2"
        label="密码"
        labelPlacement="outside"
        name="password"
        placeholder="请输入密码"
        type="password"
        value={formData.password}
        onChange={handleChange}
      />

      {isRegister && (
        <Input
          autoComplete="tel"
          className="mb-2"
          label="手机号码"
          labelPlacement="outside"
          name="phone"
          placeholder="请输入手机号码 (可选)"
          type="tel"
          value={(formData as RegisterInput).phone || ""}
          onChange={handleChange}
        />
      )}

      {!isRegister && (
        <div className="flex justify-between items-center mb-2">
          <Switch
            isSelected={rememberMe}
            size="sm"
            onValueChange={setRememberMe}
          >
            记住我
          </Switch>
          <Link className="text-sm" color="primary" href="#" size="sm">
            忘记密码?
          </Link>
        </div>
      )}

      {error && <p className="text-danger text-sm mt-2">{error}</p>}

      <Button
        className="mt-2 w-full"
        color="primary"
        isDisabled={loading}
        isLoading={loading}
        type="submit"
        variant="solid"
      >
        {isRegister ? "注册" : "登录"}
      </Button>
    </form>
  );
};

const AuthPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");

  const handleLogin = async (data: LoginInput) => {
    const response = await authApi.login(data);

    if (response.success && response.data) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      // navigate("/");
    } else {
      const errorMsg = (response as ErrorResponse).error || "登录失败";
      throw new Error(errorMsg);
    }
  };

  const handleRegister = async (data: RegisterInput) => {
    const response = await authApi.register(data);

    if (response.success && response.data) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
    } else {
      const errorMsg = (response as ErrorResponse).error || "注册失败";
      throw new Error(errorMsg);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md px-4">
        <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col gap-2 items-center p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-900">ChatLoop</h1>
            <p className="text-sm text-gray-500">欢迎来到聊天应用</p>
          </div>

          <div className="p-6">
            <div className="flex w-full mb-6 border-b">
              <button
                className={`flex-1 pb-2 text-center ${
                  activeTab === "login"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("login")}
              >
                登录
              </button>
              <button
                className={`flex-1 pb-2 text-center ${
                  activeTab === "register"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("register")}
              >
                注册
              </button>
            </div>

            {activeTab === "login" ? (
              <AuthForm isRegister={false} onSubmit={handleLogin} />
            ) : (
              <AuthForm isRegister={true} onSubmit={handleRegister} />
            )}
          </div>

          <div className="border-t p-6 flex justify-center">
            <p className="text-sm text-gray-500">
              {activeTab === "login" ? "还没有账号? " : "已经有账号? "}
              <Link
                href="#"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(activeTab === "login" ? "register" : "login");
                }}
              >
                {activeTab === "login" ? "注册" : "登录"}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
