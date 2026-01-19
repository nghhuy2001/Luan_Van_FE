import { Link } from "react-router-dom";

export default function ImportList() {
    // Fake data – sau này thay bằng API
    const imports = [
        {
            id: "PN001",
            supplier: "Công ty ABC",
            totalProducts: 5,
            totalQuantity: 120,
            totalPrice: 45000000,
            createdAt: "10/01/2026",
            status: "Hoàn thành",
        },
        {
            id: "PN002",
            supplier: "Nhà cung cấp XYZ",
            totalProducts: 3,
            totalQuantity: 60,
            totalPrice: 23000000,
            createdAt: "12/01/2026",
            status: "Đang xử lý",
        },
    ];

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-800">
                    Danh sách phiếu nhập
                </h1>

                <Link
                    to="/admin/import/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    + Tạo phiếu nhập
                </Link>
            </div>

            {/* Filter */}
            <div className="bg-white p-4 rounded shadow grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                    type="text"
                    placeholder="Tìm theo mã phiếu..."
                    className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="date"
                    className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <select className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>-- Nhà cung cấp --</option>
                    <option>Công ty ABC</option>
                    <option>Nhà cung cấp XYZ</option>
                </select>

                <button className="bg-slate-800 text-white rounded px-4 py-2 hover:bg-slate-900">
                    Lọc
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded shadow overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-slate-100 text-slate-700">
                        <tr>
                            <th className="text-left px-4 py-3">Mã phiếu</th>
                            <th className="text-left px-4 py-3">Nhà cung cấp</th>
                            <th className="text-center px-4 py-3">Số SP</th>
                            <th className="text-center px-4 py-3">Tổng SL</th>
                            <th className="text-right px-4 py-3">Tổng tiền</th>
                            <th className="text-center px-4 py-3">Ngày nhập</th>
                            <th className="text-center px-4 py-3">Trạng thái</th>
                            <th className="text-center px-4 py-3">Hành động</th>
                        </tr>
                    </thead>

                    <tbody>
                        {imports.map((item) => (
                            <tr
                                key={item.id}
                                className="border-t hover:bg-slate-50"
                            >
                                <td className="px-4 py-3 font-medium">
                                    {item.id}
                                </td>
                                <td className="px-4 py-3">
                                    {item.supplier}
                                </td>
                                <td className="px-4 py-3 text-center">
                                    {item.totalProducts}
                                </td>
                                <td className="px-4 py-3 text-center">
                                    {item.totalQuantity}
                                </td>
                                <td className="px-4 py-3 text-right text-red-600 font-semibold">
                                    {item.totalPrice.toLocaleString()}đ
                                </td>
                                <td className="px-4 py-3 text-center">
                                    {item.createdAt}
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-medium
                                            ${
                                                item.status === "Hoàn thành"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                            }`}
                                    >
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <Link
                                        to={`/admin/import/${item.id}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Xem chi tiết
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
