import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {toast} from "react-hot-toast";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        // 👉 Fake user (sau này thay bằng API)
        // const user = {
        //     id: 1,
        //     name: "Nguyễn Hoàng Huy",
        //     email: email,
        // };

        // Lưu vào localStorage
        // localStorage.setItem("user", JSON.stringify(user));

        // Quay về trang chủ
        // navigate("/");

        // Hiện tại tạm dùng cách này để test giao diện
        if(email !== "root@gmail.com" || password !== "root") {
            toast.error("Email hoặc mật khẩu không đúng!");
            return;
        }else {
            toast.success("Đăng nhập thành công!");
        }
        navigate("/");
    };


    return (
        <div className="min-h-screen flex items-center justify-center 
            bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 relative">

            {/* overlay */}
            <div className="absolute inset-0 bg-black/10"></div>

            <div className="relative w-full max-w-md bg-white/90 
                backdrop-blur-md p-8 rounded-2xl shadow-2xl 
                animate-fade-up">

                <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
                    Chào mừng trở lại 👋
                </h2>
                <p className="text-center text-gray-500 mb-6">
                    Đăng nhập để tiếp tục mua sắm
                </p>

                <form className="space-y-4" onSubmit={handleLogin}>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@gmail.com"
                            className="w-full border rounded-lg px-4 py-2 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Mật khẩu
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border rounded-lg px-4 py-2 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 
                        text-white py-2 rounded-lg font-semibold 
                        hover:opacity-90 transition shadow-lg"
                    >
                        Đăng nhập
                    </button>
                </form>

                <div className="text-center mt-4 text-sm">
                    <span className="text-gray-600">Chưa có tài khoản?</span>{" "}
                    <Link to="/register" className="text-blue-600 font-medium hover:underline">
                        Đăng ký
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
