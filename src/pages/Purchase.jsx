import OrderCard from "../components/Purchase/OrderCard";

const Purchase = () => {
    return (
        <div>
            {/* Tabs */}
            <div className="flex gap-8 border-b mb-6">
                {[
                    "Tất cả",
                    "Chờ xác nhận",
                    "Chờ giao hàng",
                    "Hoàn thành",
                ].map(tab => (
                    <button
                        key={tab}
                        className="pb-3 text-gray-600 hover:text-orange-500 
                                   border-b-2 border-transparent hover:border-orange-500"
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Order list */}
            <div className="space-y-4">
                <OrderCard />
                <OrderCard />
            </div>
        </div>
    );
};

export default Purchase;
