const formatVND = (n) => (n ?? 0).toLocaleString("vi-VN") + "đ";

const calcSubtotal = (order) =>
  order.items.reduce((sum, it) => sum + it.price * it.qty, 0);

const calcTotal = (order) =>
  calcSubtotal(order) + (order.shippingFee ?? 0) - (order.discount ?? 0);

function openPrintWindow(order, statusLabel) {
  const subtotal = calcSubtotal(order);
  const total = calcTotal(order);

  const rows = order.items
    .map(
      (it, idx) => `
      <tr>
        <td style="padding:8px;border:1px solid #ddd;">${idx + 1}</td>
        <td style="padding:8px;border:1px solid #ddd;">
          <div style="font-weight:600">${it.name}</div>
          <div style="color:#666;font-size:12px">SKU: ${it.sku}</div>
        </td>
        <td style="padding:8px;border:1px solid #ddd;text-align:right;">${formatVND(it.price)}</td>
        <td style="padding:8px;border:1px solid #ddd;text-align:center;">${it.qty}</td>
        <td style="padding:8px;border:1px solid #ddd;text-align:right;">${formatVND(it.price * it.qty)}</td>
      </tr>
    `
    )
    .join("");

  const html = `
  <html>
    <head>
      <meta charset="utf-8" />
      <title>Don hang ${order.id}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 24px; }
        .top { display:flex; justify-content:space-between; align-items:flex-start; gap:16px; }
        .box { border:1px solid #ddd; padding:12px; border-radius:8px; }
        h1 { font-size:20px; margin:0 0 6px; }
        .muted { color:#666; font-size:12px; }
        table { width:100%; border-collapse:collapse; margin-top:12px; }
        .totals { margin-top:12px; width:320px; margin-left:auto; }
        .totals .row { display:flex; justify-content:space-between; padding:6px 0; }
        .hr { height:1px; background:#eee; margin:12px 0; }
        @media print {
          button { display:none; }
        }
      </style>
    </head>
    <body>
      <div class="top">
        <div>
          <h1>HÓA ĐƠN / ĐƠN HÀNG</h1>
          <div class="muted">Mã đơn: <b>${order.id}</b></div>
          <div class="muted">Ngày tạo: ${order.createdAt}</div>
          <div class="muted">Trạng thái: <b>${statusLabel}</b></div>
          <div class="muted">Thanh toán: ${order.paymentMethod}</div>
        </div>
        <div class="box" style="min-width: 320px;">
          <div style="font-weight:700;margin-bottom:6px;">Thông tin khách</div>
          <div><b>${order.customer.name}</b></div>
          <div class="muted">${order.customer.phone}</div>
          <div style="margin-top:6px;">${order.customer.address}</div>
        </div>
      </div>

      ${order.note ? `<div class="box" style="margin-top:12px;">
        <div style="font-weight:700;margin-bottom:6px;">Ghi chú</div>
        <div>${order.note}</div>
      </div>` : ""}

      <table>
        <thead>
          <tr>
            <th style="padding:8px;border:1px solid #ddd;text-align:left;">#</th>
            <th style="padding:8px;border:1px solid #ddd;text-align:left;">Sản phẩm</th>
            <th style="padding:8px;border:1px solid #ddd;text-align:right;">Đơn giá</th>
            <th style="padding:8px;border:1px solid #ddd;text-align:center;">SL</th>
            <th style="padding:8px;border:1px solid #ddd;text-align:right;">Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>

      <div class="totals">
        <div class="row"><span>Tạm tính</span><b>${formatVND(subtotal)}</b></div>
        <div class="row"><span>Phí ship</span><b>${formatVND(order.shippingFee)}</b></div>
        <div class="row"><span>Giảm giá</span><b>-${formatVND(order.discount)}</b></div>
        <div class="hr"></div>
        <div class="row" style="font-size:16px;"><span>Tổng cộng</span><b>${formatVND(total)}</b></div>
      </div>

      <div class="muted" style="margin-top:18px;">
        * Mẹo: Trong hộp thoại in, chọn <b>Save as PDF</b> để xuất file PDF.
      </div>

      <script>
        window.onload = () => window.print();
      </script>
    </body>
  </html>
  `;

  const w = window.open("", "_blank", "width=900,height=650");
  if (!w) return;
  w.document.open();
  w.document.write(html);
  w.document.close();
}

export default function OrderDetailModal({ order, statusOptions, onClose, onUpdate }) {
  const statusLabel =
    statusOptions.find((s) => s.value === order.status)?.label || order.status;

  const subtotal = calcSubtotal(order);
  const total = calcTotal(order);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-3">
      <div className="bg-white w-full max-w-4xl rounded shadow overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <div className="text-lg font-bold">Chi tiết đơn hàng: {order.id}</div>
            <div className="text-sm text-gray-500">
              {order.createdAt} • {order.paymentMethod} • Trạng thái: <b>{statusLabel}</b>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => openPrintWindow(order, statusLabel)}
              className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
            >
              Xuất PDF
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-50"
            >
              Đóng
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 grid grid-cols-12 gap-4">
          {/* Left: customer + items */}
          <div className="col-span-12 lg:col-span-8 space-y-4">
            <div className="border rounded p-4">
              <div className="font-semibold mb-2">Thông tin khách hàng</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div>
                  <div className="text-gray-500">Tên</div>
                  <div className="font-medium">{order.customer.name}</div>
                </div>
                <div>
                  <div className="text-gray-500">SĐT</div>
                  <div className="font-medium">{order.customer.phone}</div>
                </div>
                <div className="md:col-span-2">
                  <div className="text-gray-500">Địa chỉ</div>
                  <div className="font-medium">{order.customer.address}</div>
                </div>
              </div>

              {order.note ? (
                <div className="mt-3 text-sm">
                  <div className="text-gray-500">Ghi chú</div>
                  <div className="font-medium">{order.note}</div>
                </div>
              ) : null}
            </div>

            <div className="border rounded overflow-x-auto">
              <div className="p-4 border-b font-semibold">Sản phẩm</div>
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3 text-left border-b">Sản phẩm</th>
                    <th className="p-3 text-right border-b">Đơn giá</th>
                    <th className="p-3 text-center border-b">SL</th>
                    <th className="p-3 text-right border-b">Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((it) => (
                    <tr key={it.sku} className="hover:bg-gray-50">
                      <td className="p-3 border-b">
                        <div className="font-medium">{it.name}</div>
                        <div className="text-xs text-gray-500">SKU: {it.sku}</div>
                      </td>
                      <td className="p-3 border-b text-right">{formatVND(it.price)}</td>
                      <td className="p-3 border-b text-center">{it.qty}</td>
                      <td className="p-3 border-b text-right font-semibold">
                        {formatVND(it.price * it.qty)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: status + totals */}
          <div className="col-span-12 lg:col-span-4 space-y-4">
            <div className="border rounded p-4">
              <div className="font-semibold mb-2">Cập nhật trạng thái</div>
              <select
                value={order.status}
                onChange={(e) => onUpdate({ status: e.target.value })}
                className="w-full border rounded px-3 py-2 bg-white"
              >
                {statusOptions.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
              <div className="text-xs text-gray-500 mt-2">
                * Sau này gắn API thì gọi PUT /orders/{order.id}/status
              </div>
            </div>

            <div className="border rounded p-4">
              <div className="font-semibold mb-2">Tổng tiền</div>
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tạm tính</span>
                  <span className="font-medium">{formatVND(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phí ship</span>
                  <span className="font-medium">{formatVND(order.shippingFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Giảm giá</span>
                  <span className="font-medium">-{formatVND(order.discount)}</span>
                </div>
                <div className="h-px bg-gray-200 my-2" />
                <div className="flex justify-between text-base">
                  <span className="font-semibold">Tổng cộng</span>
                  <span className="font-bold">{formatVND(total)}</span>
                </div>
              </div>

              <button
                onClick={() => openPrintWindow(order, statusLabel)}
                className="w-full mt-4 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
              >
                Xuất PDF (In)
              </button>
              <div className="text-xs text-gray-500 mt-2">
                Khi cửa sổ in mở ra, chọn <b>Save as PDF</b>.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded hover:bg-gray-50">
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
