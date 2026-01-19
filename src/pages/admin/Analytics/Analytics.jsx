import {
    FaShoppingCart,
    FaMoneyBillWave,
    FaBoxOpen,
    FaUsers,
    FaChartLine
} from "react-icons/fa";

export default function Analytics() {
    return (
        <div className="space-y-6">
            {/* Title */}
            <div className="flex items-center gap-3">
                <FaChartLine className="text-blue-600 text-2xl" />
                <div>
                    <h1 className="text-2xl font-bold">Thống kê</h1>
                    <p className="text-gray-500">
                        Tổng quan hoạt động kinh doanh
                    </p>
                </div>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Tổng đơn hàng"
                    value="1,248"
                    icon={<FaShoppingCart />}
                    color="bg-blue-500"
                />
                <StatCard
                    title="Doanh thu"
                    value="245,000,000đ"
                    icon={<FaMoneyBillWave />}
                    color="bg-green-500"
                />
                <StatCard
                    title="Sản phẩm"
                    value="356"
                    icon={<FaBoxOpen />}
                    color="bg-purple-500"
                />
                <StatCard
                    title="Khách hàng"
                    value="812"
                    icon={<FaUsers />}
                    color="bg-orange-500"
                />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartCard title="Doanh thu theo tháng" />
                <ChartCard title="Đơn hàng theo tháng" />
            </div>

            {/* Top products */}
            <div className="bg-white rounded shadow p-5">
                <h2 className="font-semibold mb-4 flex items-center gap-2">
                    <FaBoxOpen className="text-purple-600" />
                    Sản phẩm bán chạy
                </h2>

                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b text-left">
                            <th className="py-2">Sản phẩm</th>
                            <th className="py-2">Đã bán</th>
                            <th className="py-2">Doanh thu</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TopProduct
                            name="Laptop Gaming Asus"
                            sold={120}
                            revenue="36,000,000đ"
                        />
                        <TopProduct
                            name="Chuột Logitech G Pro"
                            sold={210}
                            revenue="12,600,000đ"
                        />
                        <TopProduct
                            name="Bàn phím cơ Keychron"
                            sold={150}
                            revenue="18,000,000đ"
                        />
                    </tbody>
                </table>
            </div>
        </div>
    );
}

/* ================= Components ================= */

const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white rounded shadow p-5 flex items-center gap-4 hover:shadow-md transition">
        <div
            className={`w-12 h-12 rounded ${color} text-white flex items-center justify-center text-xl`}
        >
            {icon}
        </div>
        <div>
            <p className="text-gray-500 text-sm">{title}</p>
            <p className="text-xl font-bold">{value}</p>
        </div>
    </div>
);

const ChartCard = ({ title }) => (
    <div className="bg-white rounded shadow p-5">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
            <FaChartLine className="text-blue-600" />
            {title}
        </h2>
        <FakeChart />
    </div>
);

const FakeChart = () => (
    <div className="h-48 flex items-end gap-3">
        {[40, 70, 50, 90, 60, 80, 100].map((h, i) => (
            <div
                key={i}
                className="flex-1 bg-blue-500 rounded-t hover:bg-blue-600 transition"
                style={{ height: `${h}%` }}
            />
        ))}
    </div>
);

const TopProduct = ({ name, sold, revenue }) => (
    <tr className="border-b last:border-0 hover:bg-gray-50 transition">
        <td className="py-3">{name}</td>
        <td className="py-3">{sold}</td>
        <td className="py-3 text-green-600 font-semibold">
            {revenue}
        </td>
    </tr>
);
