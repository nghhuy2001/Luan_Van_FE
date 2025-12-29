const NavBar = () => {
    return (
        <div className="w-full bg-blue-900">
            <div className="max-w-7xl mx-auto px-4">
                <ul className="flex gap-8 text-white font-medium py-3">
                    <li className="hover:text-yellow-400 cursor-pointer">Trang chủ</li>
                    <li className="hover:text-yellow-400 cursor-pointer">Tin Tức</li>
                    <li className="hover:text-yellow-400 cursor-pointer">Linh Kiện</li>
                    <li className="hover:text-yellow-400 cursor-pointer">Bảo Hành</li>
                    <li className="hover:text-yellow-400 cursor-pointer">Giới Thiệu</li>
                    <li className="hover:text-yellow-400 cursor-pointer">Liên Hệ</li>
                </ul>
            </div>
        </div>
    );
};

export default NavBar;
