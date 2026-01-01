import { Link } from "react-router-dom";
import "../../styles/mini-cart.css";

const MiniCart = () => {
    const cartItems = [{
        id: 1,
        name: "Laptop MSI Vector 16 HX AI A2XWHG-010VN",
        image: "/product/product1.jpg",
        screen: "16 inch",
        cpu: "Core Ultra 7",
        ram: "32GB",
        storage: "512GB",
        oldPrice: "55.000.000 đ",
        salePrice: "50.000.000 đ",
    }]; // sau này lấy từ context / redux


    return (
        <div className="cart-mini absolute right-0 top-12 w-80 bg-white shadow-xl rounded-lg p-4 z-50 border border-gray-100 ">
            <h3 className="font-semibold mb-3">Giỏ hàng</h3>

            {cartItems.length === 0 ? (
                <p className="text-gray-500 text-sm">
                    Chưa có sản phẩm nào
                </p>
            ) : (
                <>
                    <ul className="space-y-3 max-h-60 overflow-auto">
                        {cartItems.map((item) => (
                            <li key={item.id} className="flex gap-3">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-12 h-12 object-cover rounded"
                                />
                                <div className="flex-1">
                                    <p className="text-sm font-medium line-clamp-2">
                                        {item.name}
                                    </p>
                                    <p className="text-sm text-red-500">
                                        {item.salePrice} ₫
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <Link to ="/cart" className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 block text-center">
                        Xem giỏ hàng
                    </Link>
                </>
            )}
        </div>
    );
};

export default MiniCart;
