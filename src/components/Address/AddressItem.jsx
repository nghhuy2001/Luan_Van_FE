const AddressItem = ({ isDefault }) => {
    return (
        <div className="border rounded p-4 bg-white shadow-sm">
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-medium">
                        {isDefault && (
                            <span className=" text-xs text-blue-500 border border-blue-500 px-2 rounded">
                                Mặc định
                            </span>
                        )}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                        123 Đường ABC, Phường 1, Quận 1, TP. Hồ Chí Minh
                    </p>
                </div>

                <div className="text-sm text-right space-y-1">
                    <button className="text-green-500 hover:underline">
                        Sửa
                    </button>
                    {!isDefault && (
                        <button className="text-red-500 hover:underline block">
                            Xóa
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
export default AddressItem;