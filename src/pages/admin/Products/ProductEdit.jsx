import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// UI-only: mock data (sau này thay bằng API)
const MOCK_PRODUCT = {
  id: 1,
  name: "Laptop Gaming ABC 15",
  sku: "LAP-ABC-15",
  slug: "laptop-gaming-abc-15",
  brand: "ABC",
  categoryId: "gaming",
  price: 25990000,
  salePrice: 23990000,
  stock: 12,
  status: "ACTIVE", // ACTIVE | DRAFT | ARCHIVED
  featured: true,
  shortDesc: "Laptop gaming mạnh mẽ, tản nhiệt tốt, màn hình 144Hz.",
  description:
    "Mô tả chi tiết sản phẩm...\n- CPU: ...\n- RAM: ...\n- SSD: ...\n- Màn hình: ...",
  specs: [
    { key: "CPU", value: "Intel Core i7-13620H" },
    { key: "RAM", value: "16GB DDR5" },
    { key: "SSD", value: "512GB NVMe" },
    { key: "Màn hình", value: "15.6” FHD 144Hz" },
  ],
  images: [
    {
      id: "img_1",
      url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&q=80&auto=format&fit=crop",
      alt: "Ảnh chính",
      isPrimary: true,
    },
    {
      id: "img_2",
      url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200&q=80&auto=format&fit=crop",
      alt: "Góc nghiêng",
      isPrimary: false,
    },
  ],
  seo: {
    title: "Laptop Gaming ABC 15 - Hiệu năng mạnh",
    description: "Mua Laptop Gaming ABC 15 chính hãng, giá tốt, bảo hành uy tín.",
    keywords: "laptop gaming, ABC, 144hz, i7",
  },
};

const CATEGORIES = [
  { id: "gaming", name: "Laptop Gaming" },
  { id: "office", name: "Laptop Văn Phòng" },
  { id: "design", name: "Laptop Đồ Họa" },
];

const STATUSES = [
  { id: "ACTIVE", name: "Đang bán" },
  { id: "DRAFT", name: "Nháp" },
  { id: "ARCHIVED", name: "Ngừng bán" },
];

const formatMoney = (n) => {
  const num = Number(n);
  if (Number.isNaN(num)) return "";
  return num.toLocaleString("vi-VN");
};

const parseMoney = (s) => {
  if (typeof s !== "string") return 0;
  const cleaned = s.replace(/[^\d]/g, "");
  return cleaned ? Number(cleaned) : 0;
};

const cls = (...arr) => arr.filter(Boolean).join(" ");

export default function ProductEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("basic"); // basic | media | specs | seo

  // Form state
  const [form, setForm] = useState({
    name: "",
    sku: "",
    slug: "",
    brand: "",
    categoryId: "",
    status: "DRAFT",
    featured: false,
    price: 0,
    salePrice: 0,
    stock: 0,
    shortDesc: "",
    description: "",
    specs: [],
    images: [],
    seo: { title: "", description: "", keywords: "" },
  });

  // UI states
  const [selectedImageId, setSelectedImageId] = useState(null);
  const fileRef = useRef(null);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // giả lập fetch
    setLoading(true);
    setTimeout(() => {
      const p = MOCK_PRODUCT; // TODO: fetch by id
      setForm({
        name: p.name,
        sku: p.sku,
        slug: p.slug,
        brand: p.brand,
        categoryId: p.categoryId,
        status: p.status,
        featured: p.featured,
        price: p.price,
        salePrice: p.salePrice,
        stock: p.stock,
        shortDesc: p.shortDesc,
        description: p.description,
        specs: p.specs,
        images: p.images,
        seo: p.seo,
      });
      setSelectedImageId(p.images?.find((x) => x.isPrimary)?.id || p.images?.[0]?.id || null);
      setLoading(false);
      setDirty(false);
    }, 450);
  }, [id]);

  const selectedImage = useMemo(
    () => form.images.find((x) => x.id === selectedImageId) || form.images[0],
    [form.images, selectedImageId]
  );

  const primaryImage = useMemo(
    () => form.images.find((x) => x.isPrimary) || form.images[0],
    [form.images]
  );

  const validation = useMemo(() => {
    const errors = {};
    if (!form.name?.trim()) errors.name = "Tên sản phẩm không được để trống";
    if (!form.sku?.trim()) errors.sku = "SKU không được để trống";
    if (!form.categoryId) errors.categoryId = "Chọn danh mục";
    if (form.price <= 0) errors.price = "Giá phải > 0";
    if (form.salePrice < 0) errors.salePrice = "Giá khuyến mãi không hợp lệ";
    if (form.salePrice > 0 && form.salePrice >= form.price) {
      errors.salePrice = "Giá khuyến mãi phải nhỏ hơn giá gốc";
    }
    if (form.stock < 0) errors.stock = "Tồn kho không hợp lệ";
    return errors;
  }, [form]);

  const errorCount = Object.keys(validation).length;

  const onChange = (patch) => {
    setForm((prev) => ({ ...prev, ...patch }));
    setDirty(true);
  };

  const onChangeSeo = (patch) => {
    setForm((prev) => ({ ...prev, seo: { ...prev.seo, ...patch } }));
    setDirty(true);
  };

  const onChangeSpecs = (nextSpecs) => {
    setForm((prev) => ({ ...prev, specs: nextSpecs }));
    setDirty(true);
  };

  const onChangeImages = (nextImages) => {
    setForm((prev) => ({ ...prev, images: nextImages }));
    setDirty(true);
    if (nextImages.length && !nextImages.find((x) => x.id === selectedImageId)) {
      setSelectedImageId(nextImages[0].id);
    }
  };

  const makeSlugFromName = () => {
    const s = form.name
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    onChange({ slug: s });
  };

  const setPrimaryImage = (imgId) => {
    const next = form.images.map((img) => ({ ...img, isPrimary: img.id === imgId }));
    onChangeImages(next);
  };

  const removeImage = (imgId) => {
    const next = form.images.filter((img) => img.id !== imgId);
    onChangeImages(next);
    if (selectedImageId === imgId) setSelectedImageId(next[0]?.id || null);
  };

  const moveImage = (imgId, dir) => {
    const idx = form.images.findIndex((x) => x.id === imgId);
    if (idx < 0) return;
    const nextIdx = dir === "up" ? idx - 1 : idx + 1;
    if (nextIdx < 0 || nextIdx >= form.images.length) return;
    const next = [...form.images];
    const tmp = next[idx];
    next[idx] = next[nextIdx];
    next[nextIdx] = tmp;
    onChangeImages(next);
  };

  const handlePickImages = () => fileRef.current?.click();

  const handleFiles = (files) => {
    if (!files || !files.length) return;
    // UI demo: tạo preview bằng URL.createObjectURL (sau này upload Cloudinary)
    const added = Array.from(files).map((f, i) => ({
      id: `local_${Date.now()}_${i}`,
      url: URL.createObjectURL(f),
      alt: f.name,
      isPrimary: false,
      _file: f,
    }));

    const next = [...form.images, ...added];
    if (!next.some((x) => x.isPrimary) && next.length) next[0].isPrimary = true;
    onChangeImages(next);
    setSelectedImageId(added[0].id);
  };

  const handleSave = async (mode = "back") => {
    // validate
    if (errorCount) {
      setActiveTab("basic");
      return;
    }
    setSaving(true);
    try {
      // TODO: call API update product
      await new Promise((r) => setTimeout(r, 600));
      setDirty(false);

      if (mode === "stay") return;
      navigate("/admin/products");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (dirty) {
      const ok = window.confirm("Bạn có thay đổi chưa lưu. Thoát mà không lưu?");
      if (!ok) return;
    }
    navigate("/admin/products");
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-7 w-64 bg-slate-200 rounded" />
          <div className="h-10 w-full bg-slate-200 rounded" />
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-8 h-80 bg-slate-200 rounded" />
            <div className="col-span-4 h-80 bg-slate-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm text-slate-500">
            <Link className="hover:underline" to="/admin">
              Dashboard
            </Link>{" "}
            <span className="mx-2">/</span>
            <Link className="hover:underline" to="/admin/products">
              Sản phẩm
            </Link>{" "}
            <span className="mx-2">/</span>
            <span className="text-slate-700 font-medium">Chỉnh sửa #{id}</span>
          </div>

          <div className="mt-2 flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900">Chỉnh sửa sản phẩm</h1>
            <span
              className={cls(
                "text-xs px-2 py-1 rounded-full border",
                form.status === "ACTIVE" && "bg-emerald-50 border-emerald-200 text-emerald-700",
                form.status === "DRAFT" && "bg-amber-50 border-amber-200 text-amber-700",
                form.status === "ARCHIVED" && "bg-slate-100 border-slate-200 text-slate-700"
              )}
            >
              {STATUSES.find((s) => s.id === form.status)?.name}
            </span>

            {dirty && <span className="text-xs text-rose-600">• Chưa lưu</span>}
          </div>

          <div className="mt-1 text-sm text-slate-600 line-clamp-1">
            {primaryImage ? "Ảnh chính đã chọn • " : ""}
            SKU: <span className="font-medium text-slate-800">{form.sku || "—"}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCancel}
            className="px-4 py-2 rounded-lg border bg-white hover:bg-slate-50 text-slate-700"
          >
            Hủy
          </button>
          <button
            disabled={saving}
            onClick={() => handleSave("stay")}
            className={cls(
              "px-4 py-2 rounded-lg border",
              saving ? "bg-slate-100 text-slate-400" : "bg-white hover:bg-slate-50 text-slate-700"
            )}
          >
            Lưu & tiếp tục
          </button>
          <button
            disabled={saving || !!errorCount}
            onClick={() => handleSave("back")}
            className={cls(
              "px-4 py-2 rounded-lg text-white",
              saving || errorCount ? "bg-slate-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            )}
            title={errorCount ? `Còn ${errorCount} lỗi cần sửa` : "Lưu thay đổi"}
          >
            {saving ? "Đang lưu..." : "Lưu"}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b">
        <TabButton active={activeTab === "basic"} onClick={() => setActiveTab("basic")}>
          Thông tin
        </TabButton>
        <TabButton active={activeTab === "media"} onClick={() => setActiveTab("media")}>
          Ảnh
        </TabButton>
        <TabButton active={activeTab === "specs"} onClick={() => setActiveTab("specs")}>
          Thông số
        </TabButton>
        <TabButton active={activeTab === "seo"} onClick={() => setActiveTab("seo")}>
          SEO
        </TabButton>
      </div>

      {/* Content */}
      <div className="grid grid-cols-12 gap-5">
        {/* Main */}
        <div className="col-span-12 lg:col-span-8 space-y-5">
          {activeTab === "basic" && (
            <Card title="Thông tin cơ bản" subtitle="Chỉnh sửa các trường chính của sản phẩm">
              <div className="grid grid-cols-12 gap-4">
                <Field className="col-span-12" label="Tên sản phẩm" error={validation.name}>
                  <input
                    value={form.name}
                    onChange={(e) => onChange({ name: e.target.value })}
                    className={inputCls(!!validation.name)}
                    placeholder="VD: Laptop Gaming ABC 15"
                  />
                </Field>

                <Field className="col-span-12 md:col-span-4" label="SKU" error={validation.sku}>
                  <input
                    value={form.sku}
                    onChange={(e) => onChange({ sku: e.target.value })}
                    className={inputCls(!!validation.sku)}
                    placeholder="VD: LAP-ABC-15"
                  />
                </Field>

                <Field className="col-span-12 md:col-span-8" label="Slug" hint="Dùng cho URL SEO">
                  <div className="flex gap-2">
                    <input
                      value={form.slug}
                      onChange={(e) => onChange({ slug: e.target.value })}
                      className={inputCls(false)}
                      placeholder="vd: laptop-gaming-abc-15"
                    />
                    <button
                      type="button"
                      onClick={makeSlugFromName}
                      className="px-3 py-2 rounded-lg border bg-white hover:bg-slate-50 text-sm"
                      title="Tạo slug từ tên"
                    >
                      Auto
                    </button>
                  </div>
                </Field>

                <Field className="col-span-12 md:col-span-6" label="Danh mục" error={validation.categoryId}>
                  <select
                    value={form.categoryId}
                    onChange={(e) => onChange({ categoryId: e.target.value })}
                    className={inputCls(!!validation.categoryId)}
                  >
                    <option value="">-- Chọn danh mục --</option>
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field className="col-span-12 md:col-span-6" label="Trạng thái">
                  <select
                    value={form.status}
                    onChange={(e) => onChange({ status: e.target.value })}
                    className={inputCls(false)}
                  >
                    {STATUSES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field className="col-span-12 md:col-span-6" label="Thương hiệu">
                  <input
                    value={form.brand}
                    onChange={(e) => onChange({ brand: e.target.value })}
                    className={inputCls(false)}
                    placeholder="VD: ASUS / MSI / Dell..."
                  />
                </Field>

                <Field className="col-span-12 md:col-span-6" label="Nổi bật">
                  <div className="flex items-center gap-3 rounded-lg border p-3 bg-white">
                    <Toggle checked={form.featured} onChange={(v) => onChange({ featured: v })} />
                    <div>
                      <div className="font-medium text-slate-800">Hiển thị nổi bật</div>
                      <div className="text-xs text-slate-500">Sản phẩm sẽ được ưu tiên trên trang chủ</div>
                    </div>
                  </div>
                </Field>

                <Field className="col-span-12 md:col-span-4" label="Giá gốc" error={validation.price}>
                  <MoneyInput
                    value={form.price}
                    onChange={(v) => onChange({ price: v })}
                    invalid={!!validation.price}
                  />
                </Field>

                <Field className="col-span-12 md:col-span-4" label="Giá khuyến mãi" error={validation.salePrice}>
                  <MoneyInput
                    value={form.salePrice}
                    onChange={(v) => onChange({ salePrice: v })}
                    invalid={!!validation.salePrice}
                  />
                </Field>

                <Field className="col-span-12 md:col-span-4" label="Tồn kho" error={validation.stock}>
                  <input
                    type="number"
                    min={0}
                    value={form.stock}
                    onChange={(e) => onChange({ stock: Number(e.target.value) })}
                    className={inputCls(!!validation.stock)}
                    placeholder="0"
                  />
                </Field>

                <Field className="col-span-12" label="Mô tả ngắn">
                  <textarea
                    value={form.shortDesc}
                    onChange={(e) => onChange({ shortDesc: e.target.value })}
                    className={textareaCls(false)}
                    rows={3}
                    placeholder="Một đoạn ngắn hiển thị ở danh sách / trang chi tiết..."
                  />
                </Field>

                <Field className="col-span-12" label="Mô tả chi tiết">
                  <textarea
                    value={form.description}
                    onChange={(e) => onChange({ description: e.target.value })}
                    className={textareaCls(false)}
                    rows={10}
                    placeholder="Nội dung chi tiết, có thể dùng markdown nếu backend hỗ trợ..."
                  />
                </Field>
              </div>
            </Card>
          )}

          {activeTab === "media" && (
            <Card
              title="Ảnh sản phẩm"
              subtitle="Thêm nhiều ảnh • chọn ảnh chính • sắp xếp thứ tự hiển thị"
              right={
                <button
                  type="button"
                  onClick={handlePickImages}
                  className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm"
                >
                  + Thêm ảnh
                </button>
              }
            >
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={(e) => handleFiles(e.target.files)}
              />

              <div className="grid grid-cols-12 gap-4">
                {/* preview */}
                <div className="col-span-12 lg:col-span-7">
                  <div className="aspect-[4/3] rounded-xl border bg-slate-50 overflow-hidden flex items-center justify-center">
                    {selectedImage ? (
                      <img src={selectedImage.url} alt={selectedImage.alt} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-slate-500 text-sm">Chưa có ảnh</div>
                    )}
                  </div>

                  {selectedImage && (
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-slate-800 truncate">
                          {selectedImage.alt || "Ảnh sản phẩm"}
                        </div>
                        <div className="text-xs text-slate-500 truncate">
                          ID: {selectedImage.id}
                          {selectedImage.isPrimary ? " • Ảnh chính" : ""}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {!selectedImage.isPrimary && (
                          <button
                            className="px-3 py-2 rounded-lg border bg-white hover:bg-slate-50 text-sm"
                            onClick={() => setPrimaryImage(selectedImage.id)}
                          >
                            Đặt làm ảnh chính
                          </button>
                        )}
                        <button
                          className="px-3 py-2 rounded-lg border bg-white hover:bg-slate-50 text-sm text-rose-600"
                          onClick={() => removeImage(selectedImage.id)}
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  )}

                  {/* dropzone */}
                  <div
                    className="mt-4 border-2 border-dashed rounded-xl p-4 bg-white"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      handleFiles(e.dataTransfer.files);
                    }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="font-medium text-slate-800">Kéo thả ảnh vào đây</div>
                        <div className="text-xs text-slate-500">Hoặc bấm “Thêm ảnh” để chọn nhiều file</div>
                      </div>
                      <button
                        type="button"
                        onClick={handlePickImages}
                        className="px-3 py-2 rounded-lg border bg-white hover:bg-slate-50 text-sm"
                      >
                        Chọn file
                      </button>
                    </div>
                  </div>
                </div>

                {/* list */}
                <div className="col-span-12 lg:col-span-5">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-slate-800">Danh sách ảnh</div>
                    <div className="text-xs text-slate-500">{form.images.length} ảnh</div>
                  </div>

                  <div className="mt-3 space-y-2 max-h-[460px] overflow-auto pr-1">
                    {form.images.map((img, idx) => {
                      const active = img.id === selectedImageId;
                      return (
                        <button
                          type="button"
                          key={img.id}
                          onClick={() => setSelectedImageId(img.id)}
                          className={cls(
                            "w-full text-left p-2 rounded-xl border flex items-center gap-3 transition",
                            active ? "border-blue-400 bg-blue-50" : "bg-white hover:bg-slate-50 border-slate-200"
                          )}
                        >
                          <div className="w-14 h-14 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                            <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-medium text-slate-800 truncate">
                              {img.isPrimary ? "⭐ " : ""}
                              {img.alt || `Ảnh ${idx + 1}`}
                            </div>
                            <div className="text-xs text-slate-500 truncate">Thứ tự: {idx + 1}</div>
                          </div>

                          <div className="flex items-center gap-1">
                            <IconBtn
                              title="Lên"
                              onClick={(e) => {
                                e.stopPropagation();
                                moveImage(img.id, "up");
                              }}
                              disabled={idx === 0}
                            >
                              ↑
                            </IconBtn>
                            <IconBtn
                              title="Xuống"
                              onClick={(e) => {
                                e.stopPropagation();
                                moveImage(img.id, "down");
                              }}
                              disabled={idx === form.images.length - 1}
                            >
                              ↓
                            </IconBtn>
                          </div>
                        </button>
                      );
                    })}

                    {!form.images.length && (
                      <div className="text-sm text-slate-500 border rounded-xl p-4 bg-white">
                        Chưa có ảnh. Thêm ảnh để hiển thị preview.
                      </div>
                    )}
                  </div>

                  {/* helper */}
                  <div className="mt-3 text-xs text-slate-500">
                    Tip: đặt ảnh chính để hiển thị thumbnail ở danh sách sản phẩm.
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === "specs" && (
            <Card
              title="Thông số kỹ thuật"
              subtitle="Thêm nhiều dòng thông số (key/value) để hiển thị dạng bảng ở trang chi tiết"
              right={
                <button
                  type="button"
                  onClick={() => onChangeSpecs([...(form.specs || []), { key: "", value: "" }])}
                  className="px-3 py-2 rounded-lg border bg-white hover:bg-slate-50 text-sm"
                >
                  + Thêm dòng
                </button>
              }
            >
              <div className="space-y-3">
                {(form.specs || []).map((row, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-3 items-start">
                    <div className="col-span-12 md:col-span-4">
                      <input
                        value={row.key}
                        onChange={(e) => {
                          const next = [...form.specs];
                          next[idx] = { ...next[idx], key: e.target.value };
                          onChangeSpecs(next);
                        }}
                        className={inputCls(false)}
                        placeholder="VD: CPU"
                      />
                    </div>
                    <div className="col-span-12 md:col-span-7">
                      <input
                        value={row.value}
                        onChange={(e) => {
                          const next = [...form.specs];
                          next[idx] = { ...next[idx], value: e.target.value };
                          onChangeSpecs(next);
                        }}
                        className={inputCls(false)}
                        placeholder="VD: Intel Core i7-13620H"
                      />
                    </div>
                    <div className="col-span-12 md:col-span-1 flex md:justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          const next = form.specs.filter((_, i) => i !== idx);
                          onChangeSpecs(next);
                        }}
                        className="px-3 py-2 rounded-lg border bg-white hover:bg-rose-50 hover:text-rose-600 text-sm"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                ))}

                {!form.specs?.length && (
                  <div className="text-sm text-slate-500 border rounded-xl p-4 bg-white">
                    Chưa có thông số. Bấm “Thêm dòng” để bắt đầu.
                  </div>
                )}
              </div>
            </Card>
          )}

          {activeTab === "seo" && (
            <Card title="SEO" subtitle="Tối ưu hiển thị trên Google (title/description/keywords)">
              <div className="grid grid-cols-12 gap-4">
                <Field className="col-span-12" label="SEO Title">
                  <input
                    value={form.seo.title}
                    onChange={(e) => onChangeSeo({ title: e.target.value })}
                    className={inputCls(false)}
                    placeholder="VD: Laptop Gaming ABC 15 - Hiệu năng mạnh"
                  />
                </Field>

                <Field className="col-span-12" label="SEO Description">
                  <textarea
                    value={form.seo.description}
                    onChange={(e) => onChangeSeo({ description: e.target.value })}
                    className={textareaCls(false)}
                    rows={4}
                    placeholder="Mô tả ngắn 140–160 ký tự..."
                  />
                </Field>

                <Field className="col-span-12" label="Keywords" hint="Cách nhau bởi dấu phẩy">
                  <input
                    value={form.seo.keywords}
                    onChange={(e) => onChangeSeo({ keywords: e.target.value })}
                    className={inputCls(false)}
                    placeholder="laptop gaming, abc, i7, 144hz"
                  />
                </Field>

                <div className="col-span-12">
                  <div className="rounded-xl border bg-white p-4">
                    <div className="text-sm font-semibold text-slate-800">Preview (mô phỏng)</div>
                    <div className="mt-2">
                      <div className="text-blue-700 font-medium line-clamp-1">
                        {form.seo.title || form.name || "Tiêu đề SEO"}
                      </div>
                      <div className="text-xs text-emerald-700 line-clamp-1">
                        https://your-domain.com/products/{form.slug || "slug-san-pham"}
                      </div>
                      <div className="text-sm text-slate-700 mt-1 line-clamp-2">
                        {form.seo.description || form.shortDesc || "Mô tả SEO sẽ hiển thị ở đây."}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Right sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-5">
          <Card title="Tóm tắt" subtitle="Thông tin nhanh & kiểm tra trước khi lưu">
            <div className="flex gap-3">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border">
                {primaryImage ? (
                  <img src={primaryImage.url} alt="primary" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-slate-500">No image</div>
                )}
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-slate-900 truncate">{form.name || "—"}</div>
                <div className="text-xs text-slate-500 truncate">SKU: {form.sku || "—"}</div>
                <div className="mt-1 text-sm text-slate-700">
                  {form.salePrice > 0 ? (
                    <>
                      <span className="font-semibold">{formatMoney(form.salePrice)}₫</span>{" "}
                      <span className="text-xs text-slate-400 line-through">{formatMoney(form.price)}₫</span>
                    </>
                  ) : (
                    <span className="font-semibold">{formatMoney(form.price)}₫</span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <Row label="Danh mục" value={CATEGORIES.find((c) => c.id === form.categoryId)?.name || "—"} />
              <Row label="Trạng thái" value={STATUSES.find((s) => s.id === form.status)?.name || "—"} />
              <Row label="Tồn kho" value={String(form.stock ?? 0)} />
              <Row label="Ảnh" value={`${form.images.length}`} />
              <Row label="Thông số" value={`${form.specs?.length || 0}`} />
            </div>

            {!!errorCount && (
              <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
                Còn <b>{errorCount}</b> lỗi cần sửa trước khi lưu. (Xem tab “Thông tin”)
              </div>
            )}
          </Card>

          <Card title="Hành động nhanh">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setActiveTab("media")}
                className="px-3 py-2 rounded-lg border bg-white hover:bg-slate-50 text-sm"
              >
                Quản lý ảnh
              </button>
              <button
                onClick={() => setActiveTab("specs")}
                className="px-3 py-2 rounded-lg border bg-white hover:bg-slate-50 text-sm"
              >
                Sửa thông số
              </button>
              <button
                onClick={() => setActiveTab("seo")}
                className="px-3 py-2 rounded-lg border bg-white hover:bg-slate-50 text-sm"
              >
                SEO
              </button>
              <button
                onClick={() => window.alert("TODO: mở preview sản phẩm (route customer)")}
                className="px-3 py-2 rounded-lg border bg-white hover:bg-slate-50 text-sm"
              >
                Xem preview
              </button>
            </div>

            <div className="mt-4 text-xs text-slate-500">
              Gợi ý: Sau này bạn có thể “Lưu & tiếp tục” để chỉnh nhiều mục liên tục.
            </div>
          </Card>

          <Card title="Nguy hiểm" subtitle="Cẩn thận khi thao tác">
            <button
              onClick={() => window.alert("TODO: archive/delete")}
              className="w-full px-4 py-2 rounded-lg border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700"
            >
              Ngừng bán / Lưu trữ sản phẩm
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ------------------ Components ------------------ */

function TabButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cls(
        "px-4 py-2 -mb-[1px] border-b-2 text-sm font-medium",
        active ? "border-blue-600 text-blue-700" : "border-transparent text-slate-600 hover:text-slate-900"
      )}
    >
      {children}
    </button>
  );
}

function Card({ title, subtitle, right, children }) {
  return (
    <div className="bg-white border rounded-2xl shadow-sm">
      <div className="p-4 border-b flex items-start justify-between gap-3">
        <div>
          <div className="text-base font-semibold text-slate-900">{title}</div>
          {subtitle && <div className="text-sm text-slate-500 mt-0.5">{subtitle}</div>}
        </div>
        {right}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function Field({ label, hint, error, className, children }) {
  return (
    <div className={className}>
      <div className="flex items-end justify-between gap-3">
        <label className="text-sm font-medium text-slate-800">{label}</label>
        {hint && <span className="text-xs text-slate-500">{hint}</span>}
      </div>
      <div className="mt-1.5">{children}</div>
      {error && <div className="mt-1 text-xs text-rose-600">{error}</div>}
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cls(
        "w-11 h-6 rounded-full relative transition border",
        checked ? "bg-blue-600 border-blue-600" : "bg-slate-200 border-slate-200"
      )}
      aria-pressed={checked}
    >
      <span
        className={cls(
          "absolute top-0.5 w-5 h-5 rounded-full bg-white transition",
          checked ? "left-5" : "left-0.5"
        )}
      />
    </button>
  );
}

function MoneyInput({ value, onChange, invalid }) {
  const [display, setDisplay] = useState(formatMoney(value));
  useEffect(() => setDisplay(formatMoney(value)), [value]);

  return (
    <div className="relative">
      <input
        value={display}
        onChange={(e) => {
          const next = e.target.value;
          setDisplay(next);
          onChange(parseMoney(next));
        }}
        className={inputCls(invalid)}
        placeholder="0"
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">₫</span>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="text-slate-500">{label}</div>
      <div className="font-medium text-slate-800 text-right">{value}</div>
    </div>
  );
}

function IconBtn({ children, onClick, disabled, title }) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={cls(
        "w-8 h-8 rounded-lg border flex items-center justify-center text-sm",
        disabled ? "bg-slate-100 text-slate-300" : "bg-white hover:bg-slate-50 text-slate-700"
      )}
    >
      {children}
    </button>
  );
}

function inputCls(invalid) {
  return cls(
    "w-full px-3 py-2 rounded-lg border outline-none transition",
    invalid
      ? "border-rose-300 focus:ring-2 focus:ring-rose-200"
      : "border-slate-200 focus:ring-2 focus:ring-blue-200 focus:border-blue-300"
  );
}

function textareaCls(invalid) {
  return cls(
    "w-full px-3 py-2 rounded-lg border outline-none transition resize-y",
    invalid
      ? "border-rose-300 focus:ring-2 focus:ring-rose-200"
      : "border-slate-200 focus:ring-2 focus:ring-blue-200 focus:border-blue-300"
  );
}
