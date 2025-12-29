import  {useState} from "react";
import MiniCart from "../Cart/MiniCart";

const TopBar = () => {
    const [showCart, setShowCart] = useState(false);

    return (
        <div className="w-full bg-white border-b">
            <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4">

                {/* Logo */}
                <div className="text-2xl font-bold text-blue-700">
                    LAPTOP
                    <span className="text-red-500">4</span>
                    <span className="text-black">YOU</span>
                </div>

                {/* Search */}
                <div className="flex-1 mx-6">
                    <input
                        type="text"
                        placeholder="Tìm sản phẩm..."
                        className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Hotline */}
                <div className="flex items-center gap-4 relative">
                    <div className="bg-blue-900 text-white px-4 py-2 rounded-full">
                        📞 08.33.88.77.33
                    </div>

                    {/* Cart */}
                    <div
                        className="relative"
                        onMouseEnter={() => setShowCart(true)}
                        onMouseLeave={() => setShowCart(false)}
                    >
                        <button className="text-2xl">🛒</button>
                        {showCart && <MiniCart />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
