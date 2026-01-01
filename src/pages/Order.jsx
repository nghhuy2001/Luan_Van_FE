import { Link } from "react-router-dom";
import BackToTop from "../components/Scroll/BackToTop";

export default function Order() {
    return (
        <div className="max-w-7xl mx-auto p-4">
            <p className="text-sm text-gray-500 mb-3">
                Trang chủ / Đơn hàng của tôi
            </p>

            <div className="grid grid-cols-12 gap-3">
                <div className="col-span-7 bg-white p-6 rounded shadow">
                    <h1 className="text-3xl font-bold mb-6">Thông tin người nhận</h1>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Họ tên */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Họ và tên
                            </label>
                            <input
                                type="text"
                                value="Nguyễn Hoàng Huy"
                                disabled
                                className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 cursor-not-allowed"
                            />
                        </div>

                        {/* Số điện thoại */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Số điện thoại
                            </label>
                            <input
                                type="text"
                                value="0123 456 789"
                                disabled
                                className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 cursor-not-allowed"
                            />
                        </div>

                        {/* Email */}
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                value="huydev@gmail.com"
                                disabled
                                className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 cursor-not-allowed"
                            />
                        </div>

                        {/* Địa chỉ giao hàng */}
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Địa chỉ giao hàng
                            </label>
                            <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>-- Chọn địa chỉ giao hàng --</option>
                                <option>
                                    123 Lê Lợi, Phường Bến Nghé, Quận 1, TP.HCM
                                </option>
                                <option>
                                    456 Nguyễn Trãi, Quận 5, TP.HCM
                                </option>
                            </select>
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Ghi chú đơn hàng
                            </label>
                            <textarea
                                rows={3}
                                placeholder="Ví dụ: Giao giờ hành chính, gọi trước khi giao..."
                                className="w-full border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Ghi chú nhỏ */}
                    <p className="text-sm text-gray-500 mt-4">
                        Muốn thay đổi thông tin người nhận?
                        <Link to="/user/account" className="text-blue-600 cursor-pointer hover:underline ml-1">
                            Cập nhật trong trang tài khoản
                        </Link>
                    </p>
                </div>

                <div className="col-span-5 bg-white p-6 rounded shadow">
                    <h1 className="text-3xl font-bold mb-6">Đơn hàng của tôi</h1>

                    {/* ================= SẢN PHẨM ================= */}
                    <div className="space-y-4 mb-6">
                        <div className="flex items-center gap-4 border-b pb-4">
                            <img
                                src="/product/product1.jpg"
                                alt="product"
                                className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-1">
                                <p className="font-medium">Áo thun nam basic</p>
                                <p className="text-sm text-gray-500">Số lượng: 2</p>
                            </div>
                            <p className="font-semibold text-red-500">300.000₫</p>
                        </div>

                        <div className="flex items-center gap-4 border-b pb-4">
                            <img
                                src="/product/product1.jpg"
                                alt="product"
                                className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-1">
                                <p className="font-medium">Quần jean nam</p>
                                <p className="text-sm text-gray-500">Số lượng: 1</p>
                            </div>
                            <p className="font-semibold text-red-500">450.000₫</p>
                        </div>
                    </div>

                    {/* ================= THANH TOÁN ================= */}
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold mb-3">
                            Phương thức thanh toán
                        </h2>

                        <div className="space-y-3">
                            {/* MoMo */}
                            <label className="flex items-center gap-3 border rounded p-3 cursor-pointer hover:border-pink-500">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    defaultChecked
                                    className="accent-pink-500"
                                />
                                <img
                                    src="/pay/momo.png"
                                    alt="momo"
                                    className="w-8 h-8 object-contain"
                                />
                                <span className="font-medium">Ví MoMo</span>
                            </label>

                            {/* VNPay */}
                            <label className="flex items-center gap-3 border rounded p-3 cursor-pointer hover:border-blue-500">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    className="accent-blue-500"
                                />
                                <img
                                    src="/pay/vnpay.png"
                                    alt="vnpay"
                                    className="w-8 h-8 object-contain"
                                />
                                <span className="font-medium">VNPay</span>
                            </label>

                            {/* COD */}
                            <label className="flex items-center gap-3 border rounded p-3 cursor-pointer hover:border-green-500">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    className="accent-green-500 "
                                />
                                <span className="font-medium">
                                    Thanh toán khi nhận hàng (COD)
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* ================= TÓM TẮT TIỀN ================= */}
                    <div className="space-y-3 text-sm border-t pt-4">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Tạm tính</span>
                            <span>750.000₫</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-600">Phí giao hàng</span>
                            <span>30.000₫</span>
                        </div>

                        <div className="flex justify-between font-semibold text-lg border-t pt-3">
                            <span>Tổng cộng</span>
                            <span className="text-red-600">780.000₫</span>
                        </div>
                    </div>

                    {/* ================= ĐẶT HÀNG ================= */}
                    <button className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white py-3 rounded text-lg font-semibold transition">
                        Đặt hàng
                    </button>

                    <p className="text-xs text-gray-500 text-center mt-3">
                        Nhấn "Đặt hàng" đồng nghĩa bạn đồng ý với điều khoản của chúng tôi
                    </p>
                </div>
                <BackToTop />

            </div>
        </div>
    );
}