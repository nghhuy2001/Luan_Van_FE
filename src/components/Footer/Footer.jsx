const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 ">
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* CỘT 1 */}
                <div>
                    <h3 className="text-white font-bold mb-3">
                        Về chúng tôi
                    </h3>
                    <p className="text-sm leading-relaxed">
                        Hệ thống bán laptop & phụ kiện chính hãng.
                        Cam kết chất lượng, giá tốt và hỗ trợ tận tâm.
                    </p>
                </div>

                {/* CỘT 2 */}
                <div>
                    <h3 className="text-white font-bold mb-3">
                        Hỗ trợ khách hàng
                    </h3>
                    <ul className="space-y-2 text-sm">
                        <li className="hover:text-white cursor-pointer">Chính sách bảo hành</li>
                        <li className="hover:text-white cursor-pointer">Hướng dẫn mua hàng</li>
                        <li className="hover:text-white cursor-pointer">Chính sách đổi trả</li>
                        <li className="hover:text-white cursor-pointer">Thanh toán & vận chuyển</li>
                    </ul>
                </div>

                {/* CỘT 3 */}
                <div>
                    <h3 className="text-white font-bold mb-3">
                        Thông tin liên hệ
                    </h3>
                    <ul className="space-y-2 text-sm">
                        <li>📍 TP. Hồ Chí Minh</li>
                        <li>📞 035 2863 062</li>
                        <li>✉️ nghhuy2001@gmail.com</li>
                    </ul>
                </div>

                {/* CỘT 4 */}
                <div>
                    <h3 className="text-white font-bold mb-3">
                        Kết nối với chúng tôi
                    </h3>
                    <div className="flex gap-3">
                        <div
                            className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 cursor-pointer">
                            <i className="fa-brands fa-facebook"></i>
                        </div>
                        <div className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center hover:bg-red-600 cursor-pointer">
                            ▶
                        </div>
                        <div
                            className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center hover:bg-pink-600 cursor-pointer">
                            <i className="fa-brands fa-square-instagram"></i>
                        </div>
                    </div>
                </div>
            </div>

            {/* COPYRIGHT */}
            <div className="border-t border-gray-700 py-4 text-center text-sm">
                © {new Date().getFullYear()} LaptopStore. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
