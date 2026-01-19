import { Link } from "react-router-dom";

export default function Dashboard() {
  const stats = [
    { label: "Doanh thu hôm nay", value: "12,450,000đ", sub: "+8.2% so với hôm qua" },
    { label: "Đơn hàng", value: "38", sub: "7 đang xử lý" },
    { label: "Khách hàng mới", value: "14", sub: "Trong 24h" },
    { label: "Tồn kho thấp", value: "6", sub: "Cần nhập thêm" },
  ];

  const recentOrders = [
    { id: "OD-10241", customer: "Nguyễn Văn A", total: "2,450,000đ", status: "Đang xử lý", time: "10:24" },
    { id: "OD-10240", customer: "Trần Thị B", total: "890,000đ", status: "Hoàn thành", time: "09:50" },
    { id: "OD-10239", customer: "Lê Văn C", total: "6,120,000đ", status: "Chờ thanh toán", time: "09:12" },
    { id: "OD-10238", customer: "Phạm Thị D", total: "1,330,000đ", status: "Đã hủy", time: "08:40" },
  ];

  const topProducts = [
    { name: "Laptop Gaming ABC", sold: 24, revenue: "48,000,000đ" },
    { name: "Laptop Office XYZ", sold: 18, revenue: "21,600,000đ" },
    { name: "SSD NVMe 1TB", sold: 41, revenue: "16,400,000đ" },
    { name: "RAM DDR4 16GB", sold: 33, revenue: "9,900,000đ" },
  ];

  const statusBadge = (status) => {
    const base = "px-2 py-1 text-xs font-medium rounded-full";
    if (status === "Hoàn thành") return `${base} bg-green-100 text-green-700`;
    if (status === "Đang xử lý") return `${base} bg-blue-100 text-blue-700`;
    if (status === "Chờ thanh toán") return `${base} bg-yellow-100 text-yellow-700`;
    return `${base} bg-red-100 text-red-700`; // Đã hủy
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600 text-sm mt-1">
            Tổng quan nhanh hệ thống, theo dõi doanh thu và hoạt động gần đây.
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            to="/admin/products"
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium"
          >
            + Thêm sản phẩm
          </Link>
          <Link
            to="/admin/sales"
            className="px-4 py-2 rounded border bg-white hover:bg-gray-50 text-sm font-medium"
          >
            Xem đơn hàng
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border p-4 shadow-sm">
            <p className="text-sm text-gray-500">{s.label}</p>
            <p className="text-2xl font-bold mt-2">{s.value}</p>
            <p className="text-xs text-gray-500 mt-2">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        {/* Chart (fake) */}
        <div className="xl:col-span-8 bg-white rounded-xl border p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Doanh thu 7 ngày gần đây</h2>
            <div className="text-xs text-gray-500">Cập nhật: hôm nay</div>
          </div>

          {/* Simple bar chart (UI only) */}
          <div className="mt-4 h-52 flex items-end gap-2">
            {[55, 40, 70, 62, 80, 45, 90].map((h, idx) => (
              <div key={idx} className="flex-1 flex flex-col justify-end gap-2">
                <div
                  className="w-full rounded-t bg-blue-500/70"
                  style={{ height: `${h}%` }}
                  title={`Day ${idx + 1}`}
                />
                <div className="text-[11px] text-gray-500 text-center">{idx + 1}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            <div className="p-3 rounded-lg bg-gray-50 border">
              <p className="text-gray-500 text-xs">Tổng tuần</p>
              <p className="font-semibold mt-1">186,300,000đ</p>
            </div>
            <div className="p-3 rounded-lg bg-gray-50 border">
              <p className="text-gray-500 text-xs">TB/ngày</p>
              <p className="font-semibold mt-1">26,614,000đ</p>
            </div>
            <div className="p-3 rounded-lg bg-gray-50 border">
              <p className="text-gray-500 text-xs">Đơn/tuần</p>
              <p className="font-semibold mt-1">242</p>
            </div>
            <div className="p-3 rounded-lg bg-gray-50 border">
              <p className="text-gray-500 text-xs">Tỷ lệ hoàn</p>
              <p className="font-semibold mt-1">3.1%</p>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="xl:col-span-4 bg-white rounded-xl border p-4 shadow-sm">
          <h2 className="font-semibold">Quick actions</h2>
          <p className="text-sm text-gray-600 mt-1">Thao tác nhanh cho admin.</p>

          <div className="mt-4 space-y-2">
            <Link
              to="/admin/products"
              className="block w-full px-4 py-3 rounded-lg border hover:bg-gray-50"
            >
              <p className="font-medium">Quản lý sản phẩm</p>
              <p className="text-xs text-gray-500 mt-1">Thêm/sửa/xóa sản phẩm, danh mục</p>
            </Link>

            <Link
              to="/admin/sales"
              className="block w-full px-4 py-3 rounded-lg border hover:bg-gray-50"
            >
              <p className="font-medium">Khuyến mãi / Sales</p>
              <p className="text-xs text-gray-500 mt-1">Tạo campaign, mã giảm giá</p>
            </Link>

            <Link
              to="/admin/users"
              className="block w-full px-4 py-3 rounded-lg border hover:bg-gray-50"
            >
              <p className="font-medium">Quản lý người dùng</p>
              <p className="text-xs text-gray-500 mt-1">Customer / Admin accounts</p>
            </Link>

            <Link
              to="/admin/analytics"
              className="block w-full px-4 py-3 rounded-lg border hover:bg-gray-50"
            >
              <p className="font-medium">Analytics</p>
              <p className="text-xs text-gray-500 mt-1">Theo dõi tăng trưởng và hành vi</p>
            </Link>
          </div>
        </div>

        {/* Recent orders */}
        <div className="xl:col-span-8 bg-white rounded-xl border p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Đơn hàng gần đây</h2>
            <Link to="/admin/orders" className="text-sm text-blue-600 hover:underline">
              Xem tất cả
            </Link>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-gray-500 border-b">
                <tr>
                  <th className="py-2 pr-4">Mã đơn</th>
                  <th className="py-2 pr-4">Khách hàng</th>
                  <th className="py-2 pr-4">Tổng</th>
                  <th className="py-2 pr-4">Trạng thái</th>
                  <th className="py-2">Giờ</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id} className="border-b last:border-b-0">
                    <td className="py-3 pr-4 font-medium">{o.id}</td>
                    <td className="py-3 pr-4">{o.customer}</td>
                    <td className="py-3 pr-4">{o.total}</td>
                    <td className="py-3 pr-4">
                      <span className={statusBadge(o.status)}>{o.status}</span>
                    </td>
                    <td className="py-3">{o.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top products */}
        <div className="xl:col-span-4 bg-white rounded-xl border p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Top sản phẩm</h2>
            <Link to="/admin/products" className="text-sm text-blue-600 hover:underline">
              Chi tiết
            </Link>
          </div>

          <div className="mt-4 space-y-3">
            {topProducts.map((p) => (
              <div key={p.name} className="flex items-start justify-between gap-3 p-3 rounded-lg border">
                <div>
                  <p className="font-medium line-clamp-1">{p.name}</p>
                  <p className="text-xs text-gray-500 mt-1">Đã bán: {p.sold}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{p.revenue}</p>
                  <p className="text-xs text-gray-500 mt-1">Doanh thu</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div className="text-xs text-gray-500">
        *Dữ liệu hiện đang là mock UI. Khi bạn gắn API, thay các mảng stats/recentOrders/topProducts bằng dữ liệu từ server.
      </div>
    </div>
  );
}
