import { Link } from "react-router-dom";

export default function Cart() {
    return (
        <div className="max-w-7xl mx-auto p-4">
            <p className="text-sm text-gray-500 mb-3">
                Trang chủ / Giỏ hàng
            </p>

            <div className="grid grid-cols-12 gap-3">
                <div className="col-span-8 bg-white p-4 rounded shadow">
                    <h2 className="text-2xl font-semibold mb-4">Giỏ hàng</h2>

                    <div className="cart-list max-h-[550px] overflow-y-auto">
                        <div className="flex items-center border-b py-4">

                            <input className="w-4 h-4 accent-red-500 mr-4 cursor-pointer" type="checkbox" name="" id="" />


                            {/* Image */}
                            <img
                                src="/product/product1.jpg"
                                alt="product"
                                className="w-20 h-20 object-cover rounded"
                            />

                            {/* Info */}
                            <div className="flex-1 ml-4">
                                <p className="font-medium text-sm line-clamp-2">
                                    Laptop ASUS ExpertBook P1 P1503CVA-i308256-63W
                                    (i3-1315U | 8GB | 256GB | Intel UHD | 15.6 FHD | Win 11)
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    Còn lại: <span className="text-red-500 font-bold">5</span>
                                </p>
                            </div>

                            {/* Price */}
                            <div className="w-32 text-right text-red-500 font-semibold">
                                19,980,000đ
                            </div>

                            {/* Quantity */}
                            <div className="ml-6 flex items-center border rounded">
                                <button className="px-3 py-1 text-gray-600 hover:bg-gray-100">-</button>
                                <span className="px-4">2</span>
                                <button className="px-3 py-1 text-gray-600 hover:bg-gray-100">+</button>
                            </div>
                            {/* Remove */}
                            <button className="ms-4 text-gray-400 hover:text-red-500 mr-3">
                                <i className="text-red-500 fa-solid fa-trash"></i>
                            </button>
                        </div>

                        {/* Cart Item 2 */}
                        <div className="flex items-center border-b py-4">

                            <input className="w-4 h-4 accent-red-500 mr-4 cursor-pointer" type="checkbox" name="" id="" />


                            {/* Image */}
                            <img
                                src="/product/product1.jpg"
                                alt="product"
                                className="w-20 h-20 object-cover rounded"
                            />

                            {/* Info */}
                            <div className="flex-1 ml-4">
                                <p className="font-medium text-sm line-clamp-2">
                                    Laptop ASUS ExpertBook P1 P1503CVA-i308256-63W
                                    (i3-1315U | 8GB | 256GB | Intel UHD | 15.6 FHD | Win 11)
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    Còn lại: <span className="text-red-500 font-bold">5</span>
                                </p>
                            </div>

                            {/* Price */}
                            <div className="w-32 text-right text-red-500 font-semibold">
                                19,980,000đ
                            </div>

                            {/* Quantity */}
                            <div className="ml-6 flex items-center border rounded">
                                <button className="px-3 py-1 text-gray-600 hover:bg-gray-100">-</button>
                                <span className="px-4">2</span>
                                <button className="px-3 py-1 text-gray-600 hover:bg-gray-100">+</button>
                            </div>
                            {/* Remove */}
                            <button className="ms-4 text-gray-400 hover:text-red-500 mr-3">
                                <i className="text-red-500 fa-solid fa-trash"></i>
                            </button>
                        </div>
                        <div className="flex items-center border-b py-4">

                            <input className="w-4 h-4 accent-red-500 mr-4 cursor-pointer" type="checkbox" name="" id="" />


                            {/* Image */}
                            <img
                                src="/product/product1.jpg"
                                alt="product"
                                className="w-20 h-20 object-cover rounded"
                            />

                            {/* Info */}
                            <div className="flex-1 ml-4">
                                <p className="font-medium text-sm line-clamp-2">
                                    Laptop ASUS ExpertBook P1 P1503CVA-i308256-63W
                                    (i3-1315U | 8GB | 256GB | Intel UHD | 15.6 FHD | Win 11)
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    Còn lại: <span className="text-red-500 font-bold">5</span>
                                </p>
                            </div>

                            {/* Price */}
                            <div className="w-32 text-right text-red-500 font-semibold">
                                19,980,000đ
                            </div>

                            {/* Quantity */}
                            <div className="ml-6 flex items-center border rounded">
                                <button className="px-3 py-1 text-gray-600 hover:bg-gray-100">-</button>
                                <span className="px-4">2</span>
                                <button className="px-3 py-1 text-gray-600 hover:bg-gray-100">+</button>
                            </div>
                            {/* Remove */}
                            <button className="ms-4 text-gray-400 hover:text-red-500 mr-3">
                                <i className="text-red-500 fa-solid fa-trash"></i>
                            </button>
                        </div>
                        <div className="flex items-center border-b py-4">

                            <input className="w-4 h-4 accent-red-500 mr-4 cursor-pointer" type="checkbox" name="" id="" />


                            {/* Image */}
                            <img
                                src="/product/product1.jpg"
                                alt="product"
                                className="w-20 h-20 object-cover rounded"
                            />

                            {/* Info */}
                            <div className="flex-1 ml-4">
                                <p className="font-medium text-sm line-clamp-2">
                                    Laptop ASUS ExpertBook P1 P1503CVA-i308256-63W
                                    (i3-1315U | 8GB | 256GB | Intel UHD | 15.6 FHD | Win 11)
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    Còn lại: <span className="text-red-500 font-bold">5</span>
                                </p>
                            </div>

                            {/* Price */}
                            <div className="w-32 text-right text-red-500 font-semibold">
                                19,980,000đ
                            </div>

                            {/* Quantity */}
                            <div className="ml-6 flex items-center border rounded">
                                <button className="px-3 py-1 text-gray-600 hover:bg-gray-100">-</button>
                                <span className="px-4">2</span>
                                <button className="px-3 py-1 text-gray-600 hover:bg-gray-100">+</button>
                            </div>
                            {/* Remove */}
                            <button className="ms-4 text-gray-400 hover:text-red-500 mr-3">
                                <i className="text-red-500 fa-solid fa-trash"></i>
                            </button>
                        </div>
                        <div className="flex items-center border-b py-4">

                            <input className="w-4 h-4 accent-red-500 mr-4 cursor-pointer" type="checkbox" name="" id="" />


                            {/* Image */}
                            <img
                                src="/product/product1.jpg"
                                alt="product"
                                className="w-20 h-20 object-cover rounded"
                            />

                            {/* Info */}
                            <div className="flex-1 ml-4">
                                <p className="font-medium text-sm line-clamp-2">
                                    Laptop ASUS ExpertBook P1 P1503CVA-i308256-63W
                                    (i3-1315U | 8GB | 256GB | Intel UHD | 15.6 FHD | Win 11)
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    Còn lại: <span className="text-red-500 font-bold">5</span>
                                </p>
                            </div>

                            {/* Price */}
                            <div className="w-32 text-right text-red-500 font-semibold">
                                19,980,000đ
                            </div>

                            {/* Quantity */}
                            <div className="ml-6 flex items-center border rounded">
                                <button className="px-3 py-1 text-gray-600 hover:bg-gray-100">-</button>
                                <span className="px-4">2</span>
                                <button className="px-3 py-1 text-gray-600 hover:bg-gray-100">+</button>
                            </div>
                            {/* Remove */}
                            <button className="ms-4 text-gray-400 hover:text-red-500 mr-3">
                                <i className="text-red-500 fa-solid fa-trash"></i>
                            </button>
                        </div>
                        <div className="flex items-center border-b py-4">

                            <input className="w-4 h-4 accent-red-500 mr-4 cursor-pointer" type="checkbox" name="" id="" />


                            {/* Image */}
                            <img
                                src="/product/product1.jpg"
                                alt="product"
                                className="w-20 h-20 object-cover rounded"
                            />

                            {/* Info */}
                            <div className="flex-1 ml-4">
                                <p className="font-medium text-sm line-clamp-2">
                                    Laptop ASUS ExpertBook P1 P1503CVA-i308256-63W
                                    (i3-1315U | 8GB | 256GB | Intel UHD | 15.6 FHD | Win 11)
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    Còn lại: <span className="text-red-500 font-bold">5</span>
                                </p>
                            </div>

                            {/* Price */}
                            <div className="w-32 text-right text-red-500 font-semibold">
                                19,980,000đ
                            </div>

                            {/* Quantity */}
                            <div className="ml-6 flex items-center border rounded">
                                <button className="px-3 py-1 text-gray-600 hover:bg-gray-100">-</button>
                                <span className="px-4">2</span>
                                <button className="px-3 py-1 text-gray-600 hover:bg-gray-100">+</button>
                            </div>
                            {/* Remove */}
                            <button className="ms-4 text-gray-400 hover:text-red-500 mr-3">
                                <i className="text-red-500 fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-center">
                        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Tiếp tục mua hàng
                        </button>
                        <button className="mt-4 ml-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                            Cập nhật giỏ hàng
                        </button>
                    </div>
                </div>

                <div className="max-h-fit col-span-4 bg-white p-4 rounded shadow sticky top-24">
                    <h2 className="text-2xl font-semibold mb-4">Tóm tắt giỏ hàng</h2>

                    {/* Selected count */}
                    <div className="flex justify-between text-sm mb-2">
                        <span>Đã chọn</span>
                        <span>2 sản phẩm</span>
                    </div>

                    {/* Subtotal */}
                    <div className="flex justify-between text-sm mb-2">
                        <span>Tạm tính</span>
                        <span>20,079,000đ</span>
                    </div>

                    {/* Shipping */}
                    <div className="flex justify-between text-sm mb-2">
                        <span>Phí vận chuyển</span>
                        <span>0đ</span>
                    </div>

                    {/* Discount */}
                    <div className="flex justify-between text-sm mb-2">
                        <span>Giảm giá</span>
                        <span className="text-green-600">-0đ</span>
                    </div>

                    <hr className="my-3" />

                    {/* Total */}
                    <div className="flex justify-between text-lg font-semibold text-red-500 mb-4">
                        <span>Tổng thanh toán</span>
                        <span>20,079,000đ</span>
                    </div>

                    {/* Checkout button */}
                    <button
                        className="w-full bg-red-500 text-white py-3 rounded
               hover:bg-red-600 transition"
                    >
                        <Link to="/checkout">Tiến hành thanh toán</Link>
                    </button>

                    {/* Note */}
                    <p className="text-xs text-gray-500 mt-3">
                        * Chỉ thanh toán các sản phẩm đã chọn.
                    </p>
                </div>


            </div>
        </div>
    );
}