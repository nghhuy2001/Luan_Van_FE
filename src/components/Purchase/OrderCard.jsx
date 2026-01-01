const OrderCard = () => {
    return (
        <div className="bg-white rounded shadow-sm border">
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3 border-b">
                <div className="flex items-center gap-3"></div>

                <div className="flex items-center gap-3 text-sm">
                    <span className="text-green-500 flex items-center gap-1">
                        🚚 Giao hàng thành công
                    </span>
                    <span className="text-orange-500 font-medium">
                        HOÀN THÀNH
                    </span>
                </div>
            </div>

            {/* Product */}
            <div className="flex px-4 py-4 gap-4 border-b">
                <img
                    src="https://via.placeholder.com/80"
                    alt=""
                    className="w-20 h-20 object-cover border"
                />

                <div className="flex-1">
                    <p className="font-medium line-clamp-2">
                        Bình Giữ Nhiệt REMIZI Bình Đựng Nước inox 304 600ml-1000ml BTC04
                    </p>
                    <p className="text-sm text-gray-500">
                        Phân loại hàng: BTC04-Bạc Led, 1000ML
                    </p>
                    <p className="text-sm text-gray-500">x1</p>
                </div>

                <div className="text-right">
                    <p className="text-gray-400 line-through text-sm">
                        265.000đ
                    </p>
                    <p className="text-orange-500 font-medium">
                        166.664đ
                    </p>
                </div>
            </div>

            {/* Total */}
            <div className="flex justify-end items-center px-4 py-3 border-b">
                <span className="mr-2">Thành tiền:</span>
                <span className="text-orange-500 text-xl font-semibold">
                    149.997đ
                </span>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 px-4 py-4">
                <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-white hover:text-blue-500 border border-blue-500">
                    Mua Lại
                </button>

                <button className="border px-4 py-2 rounded hover:bg-gray-100">
                    Liên Hệ Người Bán
                </button>

                <button className="border px-4 py-2 rounded hover:bg-gray-100">
                    Đánh Giá
                </button>
            </div>
        </div>
    );
};

export default OrderCard;
