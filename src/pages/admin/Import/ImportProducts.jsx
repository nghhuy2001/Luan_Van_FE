import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// ✅ TODO: sửa đúng path/thunk của bạn
// Ví dụ: import { fetchSuppliers } from "@/store/suppliers/suppliersThunks";
import { fetchAllSuppliers } from "../../../app/features/supplier/supplierSlice";

export default function ImportProducts() {
  // =====================
  // Redux suppliers
  // =====================
  const dispatch = useDispatch();

  // ✅ TODO: sửa đúng slice name của bạn (state.suppliers...)
  const suppliers = useSelector((state) => state.suppliers?.items || []);
  const suppliersLoading = useSelector((state) => state.suppliers?.loading); // optional
  const suppliersError = useSelector((state) => state.suppliers?.error); // optional

  useEffect(() => {
    // nếu bạn đã load ở layout/page khác thì có thể bỏ condition này
    if (!suppliers || suppliers.length === 0) {
      dispatch(fetchAllSuppliers());
    }
  }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  // =====================
  // Form header fields
  // =====================
  // ✅ thay vì nhập supplierId, dùng select
  const [selectedSupplierId, setSelectedSupplierId] = useState("");

  // NOTE: BE của bạn đang dùng supplierId/employeeId (theo Postman)
  const [employeeId, setEmployeeId] = useState(1);

  // (giữ lại mấy field demo)
  const [importDate, setImportDate] = useState(() => {
    const d = new Date();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}-${mm}-${dd}`;
  });
  const [note, setNote] = useState("");

  const selectedSupplier = useMemo(() => {
    const idNum = Number(selectedSupplierId);
    if (!idNum) return null;
    return suppliers.find((s) => Number(s.id) === idNum) || null;
  }, [suppliers, selectedSupplierId]);

  const supplierEmail = selectedSupplier?.email ?? "";
  const supplierPhone = selectedSupplier?.phone ?? "";

  // =====================
  // Items
  // =====================
  const [items, setItems] = useState([
    {
      key: crypto.randomUUID(),

      // importReceiptItemDTOS
      quantity: 10, // -> quantityImport
      importPrice: 18000000, // -> unitPrice

      // productDTO
      productId: null, // -> productDTO.id
      productName: "Laptop Gaming ABC", // -> productDTO.name
      sku: "LAP-ABC-001",
      variant: "16GB/512GB",

      ram: 8,
      storage: 256,
      cpu: "i5",
      screenSize: "15.6inch",
      gpu: "intel-uhd",
      price: 26000000,
      active: true,
      description: "Laptop văn phòng",
      brandId: 1,

      images: [], // { id, type, url, publicId }
      expanded: true,
      uploadingImages: false,
    },
  ]);

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        key: crypto.randomUUID(),
        quantity: 1,
        importPrice: 0,

        productId: null,
        productName: "",
        sku: "",
        variant: "",

        ram: null,
        storage: null,
        cpu: "",
        screenSize: "",
        gpu: "",
        price: 0,
        active: true,
        description: "",
        brandId: null,

        images: [],
        expanded: true,
        uploadingImages: false,
      },
    ]);
  };

  const removeItem = (key) => {
    setItems((prev) => prev.filter((x) => x.key !== key));
  };

  const updateItem = (key, patch) => {
    setItems((prev) =>
      prev.map((x) => (x.key === key ? { ...x, ...patch } : x))
    );
  };

  // =====================
  // Cloudinary
  // =====================
  const CLOUD_NAME = "dp0tcvlag";
  const UPLOAD_PRESET = "react_unsigned";
  const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  async function uploadOneToCloudinary(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();

    return {
      url: data.secure_url,
      publicId: data.public_id,
    };
  }

  const addImageUrl = (key, url) => {
    if (!url?.trim()) return;
    setItems((prev) =>
      prev.map((x) => {
        if (x.key !== key) return x;
        return {
          ...x,
          images: [
            ...x.images,
            {
              id: crypto.randomUUID(),
              type: "url",
              url: url.trim(),
              publicId: null,
            },
          ],
        };
      })
    );
  };

  const addImageFiles = async (key, fileList) => {
    const files = Array.from(fileList || []);
    if (files.length === 0) return;

    updateItem(key, { uploadingImages: true });

    try {
      const uploaded = await Promise.all(files.map(uploadOneToCloudinary));

      setItems((prev) =>
        prev.map((x) => {
          if (x.key !== key) return x;

          const mapped = uploaded.map((u) => ({
            id: crypto.randomUUID(),
            type: "url",
            url: u.url,
            publicId: u.publicId,
          }));

          return {
            ...x,
            images: [...x.images, ...mapped],
            uploadingImages: false,
          };
        })
      );
    } catch (e) {
      console.error(e);
      updateItem(key, { uploadingImages: false });
      alert("Upload Cloudinary thất bại: " + e.message);
    }
  };

  const removeImage = (key, imageId) => {
    setItems((prev) =>
      prev.map((x) => {
        if (x.key !== key) return x;
        return { ...x, images: x.images.filter((i) => i.id !== imageId) };
      })
    );
  };

  // =====================
  // helpers
  // =====================
  const formatMoney = (v) => `${Number(v || 0).toLocaleString("vi-VN")}đ`;

  const itemTotal = (it) => Number(it.quantity || 0) * Number(it.importPrice || 0);

  const subtotal = useMemo(
    () => items.reduce((s, it) => s + itemTotal(it), 0),
    [items]
  );

  const totalQty = useMemo(
    () => items.reduce((s, it) => s + Number(it.quantity || 0), 0),
    [items]
  );

  // =====================
  // Submit đúng format BE
  // =====================
  const handleSubmit = async () => {
    if (!selectedSupplierId) {
      alert("Vui lòng chọn nhà cung cấp.");
      return;
    }

    const payload = {
      supplierId: Number(selectedSupplierId),
      employeeId: Number(employeeId),
      importReceiptItemDTOS: items.map((it) => ({
        quantityImport: Number(it.quantity || 0),
        unitPrice: Number(it.importPrice || 0),
        productDTO: {
          id: it.productId ?? null,
          name: it.productName,
          ram: it.ram ?? null,
          storage: it.storage ?? null,
          cpu: it.cpu ?? null,
          screenSize: it.screenSize ?? null,
          gpu: it.gpu ?? null,
          price: Number(it.price ?? 0),
          active: it.active ?? true,
          description: it.description ?? it.variant ?? "",
          brandId: it.brandId ?? null,
          imageDTOList: (it.images || []).map((img) => ({
            imageUrl: img.url,
            publicId: img.publicId ?? null,
          })),
        },
      })),
    };

    console.log("IMPORT_RECEIPT_PAYLOAD", payload);

    // TODO: call BE (đổi endpoint theo bạn)
    // const res = await fetch("http://localhost:8080/api/import-receipts", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(payload),
    // });
    // if (!res.ok) throw new Error(await res.text());

    alert("Đã tạo phiếu nhập (check console payload).");
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Nhập hàng</h1>
          <p className="text-sm text-gray-600 mt-1">
            Tạo phiếu nhập gồm nhiều sản phẩm. Mỗi sản phẩm có thể đính kèm nhiều ảnh.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={addItem}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium"
          >
            + Thêm sản phẩm
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 text-sm font-medium"
          >
            Tạo phiếu nhập
          </button>
        </div>
      </div>

      {/* Top form */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        <div className="xl:col-span-8 bg-white border rounded-xl p-4 shadow-sm">
          <h2 className="font-semibold">Thông tin phiếu nhập</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            {/* ✅ Supplier select */}
            <div>
              <label className="text-xs text-gray-500">Nhà cung cấp</label>
              <select
                value={selectedSupplierId}
                onChange={(e) => setSelectedSupplierId(e.target.value)}
                className="mt-1 w-full border rounded-lg px-3 py-2 bg-white overflow-y-auto"
              >
                <option value="" disabled>
                  -- Chọn nhà cung cấp --
                </option>
                {suppliers.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>

              {suppliersLoading ? (
                <p className="text-xs text-blue-600 mt-1">Đang tải danh sách nhà cung cấp...</p>
              ) : suppliersError ? (
                <p className="text-xs text-red-600 mt-1">
                  Lỗi tải supplier: {String(suppliersError)}
                </p>
              ) : null}
            </div>

            {/* ✅ Email */}
            <div>
              <label className="text-xs text-gray-500">Email nhà cung cấp</label>
              <input
                value={supplierEmail}
                readOnly
                className="mt-1 w-full border rounded-lg px-3 py-2 bg-gray-50"
                placeholder="—"
              />
            </div>

            {/* ✅ Phone */}
            <div>
              <label className="text-xs text-gray-500">SĐT nhà cung cấp</label>
              <input
                value={supplierPhone}
                readOnly
                className="mt-1 w-full border rounded-lg px-3 py-2 bg-gray-50"
                placeholder="—"
              />
            </div>

            {/* employeeId */}
            <div>
              <label className="text-xs text-gray-500">Employee ID (gửi BE)</label>
              <input
                type="number"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="mt-1 w-full border rounded-lg px-3 py-2 bg-white"
              />
            </div>

            {/* demo fields */}
            <div>
              <label className="text-xs text-gray-500">Ngày nhập (text demo)</label>
              <input
                type="date"
                value={importDate}
                onChange={(e) => setImportDate(e.target.value)}
                className="mt-1 w-full border rounded-lg px-3 py-2 bg-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs text-gray-500">Ghi chú (text demo)</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ghi chú cho phiếu nhập (tuỳ chọn)"
              />
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="xl:col-span-4 bg-white border rounded-xl p-4 shadow-sm">
          <h2 className="font-semibold">Tổng kết</h2>

          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Số dòng sản phẩm</span>
              <span className="font-semibold">{items.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Tổng số lượng</span>
              <span className="font-semibold">{totalQty}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Tạm tính</span>
              <span className="font-semibold">{formatMoney(subtotal)}</span>
            </div>

            <div className="pt-3 border-t flex items-center justify-between">
              <span className="text-gray-900 font-semibold">Tổng tiền nhập</span>
              <span className="text-lg font-bold">{formatMoney(subtotal)}</span>
            </div>

            <div className="text-xs text-gray-500">
              * Payload gửi BE: supplierId, employeeId, importReceiptItemDTOS[].
            </div>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b flex items-center justify-between">
          <h2 className="font-semibold">Danh sách sản phẩm nhập</h2>
          <div className="text-xs text-gray-500">Kéo xuống để chỉnh từng sản phẩm</div>
        </div>

        <div className="divide-y">
          {items.map((it, idx) => (
            <ImportItemRow
              key={it.key}
              index={idx}
              item={it}
              onUpdate={(patch) => updateItem(it.key, patch)}
              onRemove={() => removeItem(it.key)}
              onAddUrl={(url) => addImageUrl(it.key, url)}
              onAddFiles={(files) => addImageFiles(it.key, files)}
              onRemoveImage={(imgId) => removeImage(it.key, imgId)}
              formatMoney={formatMoney}
              itemTotal={itemTotal(it)}
            />
          ))}

          {items.length === 0 && (
            <div className="py-10 text-center text-gray-500">
              Chưa có sản phẩm nào. Nhấn <b>“Thêm sản phẩm”</b> để bắt đầu.
            </div>
          )}
        </div>
      </div>

      {/* Bottom actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <button
          onClick={addItem}
          className="px-4 py-2 rounded border bg-white hover:bg-gray-50 text-sm font-medium"
        >
          + Thêm dòng sản phẩm
        </button>

        <div className="flex gap-2 justify-end">
          <button
            onClick={() => {
              if (!window.confirm("Xóa toàn bộ dòng sản phẩm?")) return;
              setItems([]);
            }}
            className="px-4 py-2 rounded border bg-red-50 hover:bg-red-100 text-red-700 text-sm font-medium"
          >
            Xóa tất cả
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded bg-green-600 text-white hover:bg-green-700 text-sm font-semibold"
          >
            Tạo phiếu nhập
          </button>
        </div>
      </div>
    </div>
  );
}

function ImportItemRow({
  index,
  item,
  onUpdate,
  onRemove,
  onAddUrl,
  onAddFiles,
  onRemoveImage,
  formatMoney,
  itemTotal,
}) {
  const [urlInput, setUrlInput] = useState("");

  const safeNum = (v) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  };

  const safeNullableNum = (v) => {
    if (v === "" || v === null || v === undefined) return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  };

  return (
    <div className="p-4">
      {/* Row header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 border flex items-center justify-center font-bold text-blue-700">
            {index + 1}
          </div>
          <div>
            <p className="font-semibold text-gray-900">
              {item.productName?.trim() ? item.productName : "Sản phẩm chưa đặt tên"}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              SKU: {item.sku || "—"} • Variant: {item.variant || "—"}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onUpdate({ expanded: !item.expanded })}
            className="px-3 py-2 rounded-lg border bg-white hover:bg-gray-50 text-sm"
          >
            {item.expanded ? "Thu gọn" : "Mở rộng"}
          </button>
          <button
            onClick={onRemove}
            className="px-3 py-2 rounded-lg border bg-red-50 hover:bg-red-100 text-red-700 text-sm"
          >
            Xóa dòng
          </button>
        </div>
      </div>

      {/* Expanded */}
      {item.expanded && (
        <div className="mt-4 grid grid-cols-1 xl:grid-cols-12 gap-4">
          {/* Left: product fields */}
          <div className="xl:col-span-7 bg-gray-50 border rounded-xl p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="md:col-span-2">
                <label className="text-xs text-gray-600">Tên sản phẩm</label>
                <input
                  value={item.productName}
                  onChange={(e) => onUpdate({ productName: e.target.value })}
                  className="mt-1 w-full border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="VD: Laptop Office Pro"
                />
              </div>

              <div>
                <label className="text-xs text-gray-600">Product ID (nếu sản phẩm đã tồn tại)</label>
                <input
                  type="number"
                  value={item.productId ?? ""}
                  onChange={(e) => onUpdate({ productId: safeNullableNum(e.target.value) })}
                  className="mt-1 w-full border rounded-lg px-3 py-2 bg-white"
                  placeholder="Để trống nếu tạo mới"
                />
              </div>

              <div>
                <label className="text-xs text-gray-600">Brand ID</label>
                <input
                  type="number"
                  value={item.brandId ?? ""}
                  onChange={(e) => onUpdate({ brandId: safeNullableNum(e.target.value) })}
                  className="mt-1 w-full border rounded-lg px-3 py-2 bg-white"
                  placeholder="VD: 1"
                />
              </div>

              <div>
                <label className="text-xs text-gray-600">SKU</label>
                <input
                  value={item.sku}
                  onChange={(e) => onUpdate({ sku: e.target.value })}
                  className="mt-1 w-full border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="VD: LAP-ABC-001"
                />
              </div>

              <div>
                <label className="text-xs text-gray-600">Variant (tuỳ chọn)</label>
                <input
                  value={item.variant}
                  onChange={(e) => onUpdate({ variant: e.target.value })}
                  className="mt-1 w-full border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="VD: 16GB/512GB"
                />
              </div>

              <div>
                <label className="text-xs text-gray-600">RAM (GB)</label>
                <input
                  type="number"
                  min={0}
                  value={item.ram ?? ""}
                  onChange={(e) => onUpdate({ ram: safeNullableNum(e.target.value) })}
                  className="mt-1 w-full border rounded-lg px-3 py-2 bg-white"
                  placeholder="VD: 8"
                />
              </div>

              <div>
                <label className="text-xs text-gray-600">Storage (GB)</label>
                <input
                  type="number"
                  min={0}
                  value={item.storage ?? ""}
                  onChange={(e) => onUpdate({ storage: safeNullableNum(e.target.value) })}
                  className="mt-1 w-full border rounded-lg px-3 py-2 bg-white"
                  placeholder="VD: 256"
                />
              </div>

              <div>
                <label className="text-xs text-gray-600">CPU</label>
                <input
                  value={item.cpu ?? ""}
                  onChange={(e) => onUpdate({ cpu: e.target.value })}
                  className="mt-1 w-full border rounded-lg px-3 py-2 bg-white"
                  placeholder="VD: i5"
                />
              </div>

              <div>
                <label className="text-xs text-gray-600">GPU</label>
                <input
                  value={item.gpu ?? ""}
                  onChange={(e) => onUpdate({ gpu: e.target.value })}
                  className="mt-1 w-full border rounded-lg px-3 py-2 bg-white"
                  placeholder="VD: intel-uhd"
                />
              </div>

              <div>
                <label className="text-xs text-gray-600">Screen size</label>
                <input
                  value={item.screenSize ?? ""}
                  onChange={(e) => onUpdate({ screenSize: e.target.value })}
                  className="mt-1 w-full border rounded-lg px-3 py-2 bg-white"
                  placeholder="VD: 15.6inch"
                />
              </div>

              <div>
                <label className="text-xs text-gray-600">Giá bán (price)</label>
                <input
                  type="number"
                  min={0}
                  value={item.price ?? 0}
                  onChange={(e) => onUpdate({ price: Math.max(0, safeNum(e.target.value)) })}
                  className="mt-1 w-full border rounded-lg px-3 py-2 bg-white"
                  placeholder="VD: 26000000"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-xs text-gray-600">Mô tả (description)</label>
                <textarea
                  value={item.description ?? ""}
                  onChange={(e) => onUpdate({ description: e.target.value })}
                  rows={2}
                  className="mt-1 w-full border rounded-lg px-3 py-2 bg-white"
                  placeholder="VD: Laptop văn phòng"
                />
              </div>

              <div className="md:col-span-2 flex items-center gap-2">
                <input
                  id={`active-${item.key}`}
                  type="checkbox"
                  checked={!!item.active}
                  onChange={(e) => onUpdate({ active: e.target.checked })}
                  className="h-4 w-4"
                />
                <label htmlFor={`active-${item.key}`} className="text-sm text-gray-700">
                  Active
                </label>
              </div>

              <div>
                <label className="text-xs text-gray-600">Số lượng nhập (quantityImport)</label>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => onUpdate({ quantity: Math.max(1, safeNum(e.target.value)) })}
                  className="mt-1 w-full border rounded-lg px-3 py-2 bg-white"
                />
              </div>

              <div>
                <label className="text-xs text-gray-600">Giá nhập (unitPrice)</label>
                <input
                  type="number"
                  min={0}
                  value={item.importPrice}
                  onChange={(e) => onUpdate({ importPrice: Math.max(0, safeNum(e.target.value)) })}
                  className="mt-1 w-full border rounded-lg px-3 py-2 bg-white"
                />
              </div>

              <div className="md:col-span-2 flex items-center justify-between p-3 rounded-lg bg-white border">
                <div>
                  <p className="text-xs text-gray-500">Thành tiền dòng</p>
                  <p className="font-bold text-lg">{formatMoney(itemTotal)}</p>
                </div>
                <div className="text-right text-xs text-gray-500">
                  {item.quantity} × {formatMoney(item.importPrice)}
                </div>
              </div>
            </div>
          </div>

          {/* Right: images */}
          <div className="xl:col-span-5 bg-white border rounded-xl p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Ảnh sản phẩm</h3>
              <span className="text-xs text-gray-500">{item.images.length} ảnh</span>
            </div>

            <div className="mt-3 space-y-3">
              <div>
                <label className="text-xs text-gray-600">Thêm ảnh bằng URL</label>
                <div className="mt-1 flex gap-2">
                  <input
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Dán link ảnh..."
                  />
                  <button
                    onClick={() => {
                      onAddUrl(urlInput);
                      setUrlInput("");
                    }}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium"
                  >
                    Thêm
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-600">Hoặc chọn nhiều file</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => onAddFiles(e.target.files)}
                  className="mt-1 block w-full text-sm"
                  disabled={!!item.uploadingImages}
                />
                {item.uploadingImages ? (
                  <p className="text-xs text-blue-600 mt-1">Đang upload ảnh...</p>
                ) : (
                  <p className="text-xs text-gray-500 mt-1">
                    * Upload Cloudinary xong sẽ lưu url + publicId để gửi BE.
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {item.images.map((img) => (
                <div
                  key={img.id}
                  className="relative group border rounded-lg overflow-hidden bg-gray-50"
                >
                  <img src={img.url} alt="preview" className="w-full h-24 object-cover" />
                  <button
                    onClick={() => onRemoveImage(img.id)}
                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition
                               px-2 py-1 rounded bg-black/70 text-white text-xs"
                  >
                    Xóa
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-[10px] px-2 py-1">
                    {img.publicId ? "CLOUD" : "URL"}
                  </div>
                </div>
              ))}

              {item.images.length === 0 && (
                <div className="col-span-3 text-sm text-gray-500 border rounded-lg p-4 bg-gray-50">
                  Chưa có ảnh. Thêm URL hoặc chọn file để upload.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
