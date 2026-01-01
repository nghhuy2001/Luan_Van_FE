import { Link } from "react-router-dom";

const Register = () => {
    return (
        <div className="min-h-screen flex items-center justify-center 
            bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative">

            <div className="absolute inset-0 bg-black/10"></div>

            <div className="relative w-full max-w-md bg-white/90 
                backdrop-blur-md p-8 rounded-2xl shadow-2xl 
                animate-fade-down">

                <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
                    Tạo tài khoản ✨
                </h2>
                <p className="text-center text-gray-500 mb-6">
                    Tham gia cùng Laptop4You ngay hôm nay
                </p>

                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Họ và tên
                        </label>
                        <input
                            type="text"
                            placeholder="Nguyễn Văn A"
                            className="w-full border rounded-lg px-4 py-2 
                            focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="example@gmail.com"
                            className="w-full border rounded-lg px-4 py-2 
                            focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Mật khẩu
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full border rounded-lg px-4 py-2 
                            focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Xác nhận mật khẩu
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full border rounded-lg px-4 py-2 
                            focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 
                        text-white py-2 rounded-lg font-semibold 
                        hover:opacity-90 transition shadow-lg"
                    >
                        Đăng ký
                    </button>
                </form>

                <div className="text-center mt-4 text-sm">
                    <span className="text-gray-600">Đã có tài khoản?</span>{" "}
                    <Link to="/login" className="text-purple-600 font-medium hover:underline">
                        Đăng nhập
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
