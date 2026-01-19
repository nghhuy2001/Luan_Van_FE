import { useMemo, useState } from "react";
import OrderDetailModal from "./OrderDetailModal";

const STATUS = [
  { value: "PENDING", label: "Chờ xác nhận" },
  { value: "CONFIRMED", label: "Đã xác nhận" },
  { value: "SHIPPING", label: "Đang giao" },
  { value: "COMPLETED", label: "Hoàn thành" },
  { value: "CANCELED", label: "Đã hủy" },
];

const mockOrders = [
  {
    id: "DH0001",
    createdAt: "2026-01-07 10:12",
    customer: { name: "Nguyễn Văn A", phone: "0901234567", address: "Quận 1, TP.HCM" },
    paymentMethod: "COD",
    status: "PENDING",
    note: "Giao giờ hành chính",
    items: [
      { sku: "LP001", name: "Laptop ABC 14\"", price: 18990000, qty: 1 },
      { sku: "MS001", name: "Chuột Logitech", price: 350000, qty: 1 },
    ],
    shippingFee: 30000,
    discount: 200000,
  },
  {
    id: "DH0002",
    createdAt: "2026-01-07 14:30",
    customer: { name: "Trần Thị B", phone: "0987654321", address: "Thủ Đức, TP.HCM" },
    paymentMethod: "VNPAY",
    status: "SHIPPING",
    note: "",
    items: [{ sku: "KB001", name: "Bàn phím cơ 68 phím", price: 1290000, qty: 1 }],
    shippingFee: 0,
    discount: 0,
  },
];

const formatVND = (n) => (n ?? 0).toLocaleString("vi-VN") + "đ";

const calcSubtotal = (order) =>
  order.items.reduce((sum, it) => sum + it.price * it.qty, 0);

const calcTotal = (order) =>
  calcSubtotal(order) + (order.shippingFee ?? 0) - (order.discount ?? 0);

export default function SalesOrderList() {
  const [orders, setOrders] = useState(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filtered = useMemo(() => {
    const kw = keyword.trim().toLowerCase();
    return orders.filter((o) => {
      const matchKw =
        !kw ||
        o.id.toLowerCase().includes(kw) ||
        o.customer.name.toLowerCase().includes(kw) ||
        o.customer.phone.toLowerCase().includes(kw);
      const matchStatus = statusFilter === "ALL" ? true : o.status === statusFilter;
      return matchKw && matchStatus;
    });
  }, [orders, keyword, statusFilter]);

  const handleChangeStatus = (orderId, nextStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o))
    );
  };

  const handleOpenDetail = (order) => setSelectedOrder(order);

  const handleCloseModal = () => setSelectedOrder(null);

  const handleUpdateFromModal = (orderId, patch) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, ...patch } : o)));
    // cập nhật luôn bản selectedOrder để UI modal sync
    setSelectedOrder((prev) => (prev?.id === orderId ? { ...prev, ...patch } : prev));
  };

  const statusLabel = (value) => STATUS.find((s) => s.value === value)?.label || value;

  return (
    <div className="bg-white p-6 rounded shadow">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Bán hàng - Đơn hàng</h1>
          <p className="text-sm text-gray-500 mt-1">Quản lý đơn hàng, cập nhật trạng thái, xem chi tiết & in PDF</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
        <div className="flex-1">
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Tìm theo mã đơn / tên khách / SĐT..."
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="w-full md:w-60">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full border rounded px-3 py-2 bg-white"
          >
            <option value="ALL">Tất cả trạng thái</option>
            {STATUS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr className="text-sm">
              <th className="p-3 border-r text-left">Mã đơn</th>
              <th className="p-3 border-r text-left">Khách hàng</th>
              <th className="p-3 border-r text-left">Ngày tạo</th>
              <th className="p-3 border-r text-left">Thanh toán</th>
              <th className="p-3 border-r text-left">Trạng thái</th>
              <th className="p-3 border-r text-right">Tổng tiền</th>
              <th className="p-3 text-center">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-500">
                  Không có đơn hàng phù hợp.
                </td>
              </tr>
            ) : (
              filtered.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50 text-sm">
                  <td className="p-3 border-t border-r font-semibold">{o.id}</td>
                  <td className="p-3 border-t border-r">
                    <div className="font-medium">{o.customer.name}</div>
                    <div className="text-xs text-gray-500">{o.customer.phone}</div>
                  </td>
                  <td className="p-3 border-t border-r">{o.createdAt}</td>
                  <td className="p-3 border-t border-r">{o.paymentMethod}</td>
                  <td className="p-3 border-t border-r">
                    <select
                      value={o.status}
                      onChange={(e) => handleChangeStatus(o.id, e.target.value)}
                      className="border rounded px-2 py-1 bg-white"
                    >
                      {STATUS.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                    <div className="text-xs text-gray-500 mt-1">
                      Hiện tại: {statusLabel(o.status)}
                    </div>
                  </td>
                  <td className="p-3 border-t border-r text-right font-semibold">
                    {formatVND(calcTotal(o))}
                  </td>
                  <td className="p-3 border-t text-center">
                    <button
                      onClick={() => handleOpenDetail(o)}
                      className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Xem
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          statusOptions={STATUS}
          onClose={handleCloseModal}
          onUpdate={(patch) => handleUpdateFromModal(selectedOrder.id, patch)}
        />
      )}
    </div>
  );
}
