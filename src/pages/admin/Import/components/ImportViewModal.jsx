import { useEffect, useMemo, useRef } from "react";

/**
 * Modal xem Phiếu Nhập + Xuất PDF
 * - open: boolean
 * - data: import receipt object
 * - onClose: fn
 */
export default function ImportViewModal({ open, data, onClose }) {
  const printableRef = useRef(null);

  const totals = useMemo(() => {
    const totalQty = data.items.reduce((s, x) => s + (x.quantity || 0), 0);
    const totalMoney = data.items.reduce(
      (s, x) => s + (x.quantity || 0) * (x.importPrice || 0),
      0
    );
    return { totalQty, totalMoney };
  }, [data]);

  // Close with ESC
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  // ====== HƯỚNG A: Backend trả PDF (khuyên dùng) ======
  const exportPdfByBackend = async () => {
    // Ví dụ endpoint: GET /api/admin/imports/{code}/pdf
    // Bạn thay URL/headers theo project của bạn.
    try {
      const res = await fetch(`/api/admin/imports/${data.code}/pdf`, {
        method: "GET",
        headers: {
          // Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Không thể tạo PDF từ server");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      // Mở tab mới để in / tải xuống
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (err) {
      alert(err?.message || "Xuất PDF thất bại");
    }
  };

  // ====== HƯỚNG B: Xuất PDF ngay trên FE (mẫu) ======
  // Cần cài: npm i jspdf html2canvas
  // const exportPdfOnFrontend = async () => {
  //   try {
  //     const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
  //       import("jspdf"),
  //       import("html2canvas"),
  //     ]);

  //     const node = printableRef.current;
  //     if (!node) return;

  //     const canvas = await html2canvas(node, { scale: 2 });
  //     const imgData = canvas.toDataURL("image/png");

  //     const pdf = new jsPDF("p", "mm", "a4");
  //     const pageWidth = pdf.internal.pageSize.getWidth();
  //     const pageHeight = pdf.internal.pageSize.getHeight();

  //     // Tính tỉ lệ để fit ngang
  //     const imgProps = pdf.getImageProperties(imgData);
  //     const imgWidth = pageWidth;
  //     const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

  //     let position = 0;
  //     pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

  //     // Nếu nội dung dài quá 1 trang => cắt trang (basic)
  //     let heightLeft = imgHeight - pageHeight;
  //     while (heightLeft > 0) {
  //       pdf.addPage();
  //       position = - (imgHeight - heightLeft);
  //       pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  //       heightLeft -= pageHeight;
  //     }

  //     pdf.save(`PhieuNhap_${data.code}.pdf`);
  //   } catch (e) {
  //     alert("Bạn cần cài: jspdf + html2canvas để xuất PDF trên FE");
  //   }
  // };

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Phiếu nhập: {data.code}
              </h2>
              <p className="text-sm text-slate-500">
                Xem nội dung phiếu nhập (chỉ đọc)
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Chọn 1 trong 2 nút xuất PDF */}
              <button
                onClick={exportPdfByBackend}
                className="px-3 py-2 rounded bg-slate-900 text-white hover:bg-slate-800"
              >
                Xuất PDF (Server)
              </button>

              <button
                onClick={exportPdfByBackend}
                className="px-3 py-2 rounded border border-slate-300 hover:bg-slate-50"
              >
                Xuất PDF (FE)
              </button>

              <button
                onClick={onClose}
                className="px-3 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Đóng
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-5 max-h-[75vh] overflow-auto">
            {/* Vùng in / xuất PDF */}
            <div ref={printableRef} className="space-y-4">
              {/* Top info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded p-4">
                  <h3 className="font-semibold text-slate-800 mb-2">Nhà cung cấp</h3>
                  <div className="text-sm text-slate-700 space-y-1">
                    <p><span className="text-slate-500">Tên:</span> {data.supplier.name}</p>
                    <p><span className="text-slate-500">SĐT:</span> {data.supplier.phone}</p>
                    <p><span className="text-slate-500">Địa chỉ:</span> {data.supplier.address}</p>
                  </div>
                </div>

                <div className="border rounded p-4">
                  <h3 className="font-semibold text-slate-800 mb-2">Thông tin phiếu</h3>
                  <div className="text-sm text-slate-700 space-y-1">
                    <p><span className="text-slate-500">Ngày tạo:</span> {data.createdAt}</p>
                    <p><span className="text-slate-500">Kho:</span> {data.warehouse}</p>
                    <p><span className="text-slate-500">Người tạo:</span> {data.createdBy}</p>
                    <p>
                      <span className="text-slate-500">Trạng thái:</span>{" "}
                      <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">
                        {data.status}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Note */}
              {data.note ? (
                <div className="border rounded p-4">
                  <h3 className="font-semibold text-slate-800 mb-2">Ghi chú</h3>
                  <p className="text-sm text-slate-700">{data.note}</p>
                </div>
              ) : null}

              {/* Items table */}
              <div className="border rounded overflow-hidden">
                <div className="px-4 py-3 bg-slate-50 border-b">
                  <h3 className="font-semibold text-slate-800">Danh sách sản phẩm</h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-white">
                      <tr className="border-b text-slate-600">
                        <th className="text-left px-4 py-3">SKU</th>
                        <th className="text-left px-4 py-3">Tên sản phẩm</th>
                        <th className="text-center px-4 py-3">ĐVT</th>
                        <th className="text-center px-4 py-3">SL</th>
                        <th className="text-right px-4 py-3">Giá nhập</th>
                        <th className="text-right px-4 py-3">Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.items.map((it, idx) => (
                        <tr key={idx} className="border-b last:border-b-0 hover:bg-slate-50">
                          <td className="px-4 py-3 font-medium">{it.sku}</td>
                          <td className="px-4 py-3">{it.name}</td>
                          <td className="px-4 py-3 text-center">{it.unit}</td>
                          <td className="px-4 py-3 text-center">{it.quantity}</td>
                          <td className="px-4 py-3 text-right">
                            {it.importPrice.toLocaleString()}đ
                          </td>
                          <td className="px-4 py-3 text-right font-semibold text-red-600">
                            {(it.quantity * it.importPrice).toLocaleString()}đ
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Totals */}
                <div className="px-4 py-3 bg-slate-50 border-t flex items-center justify-between">
                  <p className="text-sm text-slate-700">
                    Tổng số lượng: <span className="font-semibold">{totals.totalQty}</span>
                  </p>
                  <p className="text-sm text-slate-700">
                    Tổng tiền:{" "}
                    <span className="font-bold text-red-600">
                      {totals.totalMoney.toLocaleString()}đ
                    </span>
                  </p>
                </div>
              </div>

              {/* Footer signature */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center">
                  <p className="font-semibold">Nhà cung cấp</p>
                  <p className="text-xs text-slate-500 mt-12">(Ký, ghi rõ họ tên)</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold">Nhân viên kho</p>
                  <p className="text-xs text-slate-500 mt-12">(Ký, ghi rõ họ tên)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hint */}
          <div className="px-5 py-3 border-t text-xs text-slate-500">
            Mẹo: bấm <span className="font-semibold">ESC</span> để đóng.
          </div>
        </div>
      </div>
    </div>
  );
}
