import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

export default function ProductList() {
  // Mock data (sau này thay bằng API)
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Laptop Gaming ABC",
      sku: "LAP-ABC-001",
      category: "Laptop Gaming",
      price: 24990000,
      stock: 12,
      status: "ACTIVE",
      updatedAt: "2026-01-07",
      thumbnail:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&q=80",
    },
    {
      id: 2,
      name: "Laptop Office XYZ",
      sku: "LAP-XYZ-002",
      category: "Laptop Văn phòng",
      price: 15990000,
      stock: 4,
      status: "ACTIVE",
      updatedAt: "2026-01-06",
      thumbnail:
        "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=300&q=80",
    },
    {
      id: 3,
      name: "SSD NVMe 1TB",
      sku: "SSD-1TB-003",
      category: "Linh kiện",
      price: 1290000,
      stock: 0,
      status: "INACTIVE",
      updatedAt: "2026-01-05",
      thumbnail:
        "https://images.unsplash.com/photo-1612810436541-3360d38f14b2?w=300&q=80",
    },
    {
      id: 4,
      name: "RAM DDR4 16GB",
      sku: "RAM-16-004",
      category: "Linh kiện",
      price: 690000,
      stock: 38,
      status: "ACTIVE",
      updatedAt: "2026-01-03",
      thumbnail:
        "https://images.unsplash.com/photo-1563212034-a22b3c3f7a1c?w=300&q=80",
    },
    {
      id: 5,
      name: "Chuột Gaming Pro",
      sku: "MOU-PRO-005",
      category: "Phụ kiện",
      price: 490000,
      stock: 9,
      status: "ACTIVE",
      updatedAt: "2026-01-02",
      thumbnail:
        "https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&q=80",
    },
  ]);

  const [q, setQ] = useState("");
  const [category, setCategory] = useState("ALL");
  const [status, setStatus] = useState("ALL");
  const [sort, setSort] = useState("UPDATED_DESC");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.category)));
    return ["ALL", ...unique];
  }, [products]);

  const filtered = useMemo(() => {
    let data = [...products];

    if (q.trim()) {
      const kw = q.trim().toLowerCase();
      data = data.filter(
        (p) =>
          p.name.toLowerCase().includes(kw) ||
          p.sku.toLowerCase().includes(kw)
      );
    }

    if (category !== "ALL") {
      data = data.filter((p) => p.category === category);
    }

    if (status !== "ALL") {
      data = data.filter((p) => p.status === status);
    }

    // sort
    if (sort === "PRICE_ASC") data.sort((a, b) => a.price - b.price);
    if (sort === "PRICE_DESC") data.sort((a, b) => b.price - a.price);
    if (sort === "STOCK_ASC") data.sort((a, b) => a.stock - b.stock);
    if (sort === "STOCK_DESC") data.sort((a, b) => b.stock - a.stock);
    if (sort === "UPDATED_DESC")
      data.sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)));
    if (sort === "UPDATED_ASC")
      data.sort((a, b) => String(a.updatedAt).localeCompare(String(b.updatedAt)));

    return data;
  }, [products, q, category, status, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  const money = (v) => `${Number(v || 0).toLocaleString("vi-VN")}đ`;

  const badgeStatus = (s) => {
    const base = "px-2 py-1 rounded-full text-xs font-medium";
    if (s === "ACTIVE") return `${base} bg-green-100 text-green-700`;
    return `${base} bg-gray-100 text-gray-700`;
  };

  const badgeStock = (stock) => {
    const base = "px-2 py-1 rounded-full text-xs font-medium";
    if (stock <= 0) return `${base} bg-red-100 text-red-700`;
    if (stock <= 5) return `${base} bg-yellow-100 text-yellow-700`;
    return `${base} bg-blue-100 text-blue-700`;
  };

  const handleToggleStatus = (id) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" }
          : p
      )
    );
  };

  const handleDelete = (id) => {
    // UI demo: confirm đơn giản
    if (!window.confirm("Xóa sản phẩm này?")) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // giữ page hợp lệ khi filter thay đổi
  useMemo(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Product List</h1>
          <p className="text-sm text-gray-600 mt-1">
            Quản lý danh sách sản phẩm, tồn kho và trạng thái hiển thị.
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            to="/admin/products/create"
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium"
          >
            + Thêm sản phẩm
          </Link>
          <Link
            to="/admin/categories"
            className="px-4 py-2 rounded border bg-white hover:bg-gray-50 text-sm font-medium"
          >
            Danh mục
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border rounded-xl p-4 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          {/* Search */}
          <div className="lg:col-span-5">
            <label className="text-xs text-gray-500">Tìm kiếm</label>
            <div className="mt-1 flex">
              <input
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setPage(1);
                }}
                placeholder="Tìm theo tên hoặc SKU..."
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Category */}
          <div className="lg:col-span-3">
            <label className="text-xs text-gray-500">Danh mục</label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              className="mt-1 w-full border rounded-lg px-3 py-2 bg-white"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === "ALL" ? "Tất cả" : c}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div className="lg:col-span-2">
            <label className="text-xs text-gray-500">Trạng thái</label>
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="mt-1 w-full border rounded-lg px-3 py-2 bg-white"
            >
              <option value="ALL">Tất cả</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>

          {/* Sort */}
          <div className="lg:col-span-2">
            <label className="text-xs text-gray-500">Sắp xếp</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="mt-1 w-full border rounded-lg px-3 py-2 bg-white"
            >
              <option value="UPDATED_DESC">Mới cập nhật</option>
              <option value="UPDATED_ASC">Cũ cập nhật</option>
              <option value="PRICE_ASC">Giá tăng dần</option>
              <option value="PRICE_DESC">Giá giảm dần</option>
              <option value="STOCK_ASC">Tồn kho tăng dần</option>
              <option value="STOCK_DESC">Tồn kho giảm dần</option>
            </select>
          </div>
        </div>

        {/* Summary row */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="text-sm text-gray-600">
            Tổng: <span className="font-semibold text-gray-900">{filtered.length}</span>{" "}
            sản phẩm
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                setQ("");
                setCategory("ALL");
                setStatus("ALL");
                setSort("UPDATED_DESC");
                setPage(1);
              }}
              className="px-3 py-2 text-sm rounded-lg border bg-white hover:bg-gray-50"
            >
              Reset lọc
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b flex items-center justify-between">
          <h2 className="font-semibold">Danh sách</h2>
          <div className="text-xs text-gray-500">
            Page {page}/{totalPages}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-gray-500 border-b bg-gray-50">
              <tr>
                <th className="py-3 px-4">Sản phẩm</th>
                <th className="py-3 px-4">Danh mục</th>
                <th className="py-3 px-4">Giá</th>
                <th className="py-3 px-4">Tồn kho</th>
                <th className="py-3 px-4">Trạng thái</th>
                <th className="py-3 px-4">Cập nhật</th>
                <th className="py-3 px-4 text-right">Hành động</th>
              </tr>
            </thead>

            <tbody>
              {paged.map((p) => (
                <tr key={p.id} className="border-b last:border-b-0 hover:bg-gray-50/60">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.thumbnail}
                        alt={p.name}
                        className="w-12 h-12 rounded-lg object-cover border"
                      />
                      <div>
                        <p className="font-medium text-gray-900 line-clamp-1">{p.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">SKU: {p.sku}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">{p.category}</td>

                  <td className="py-3 px-4 font-medium">{money(p.price)}</td>

                  <td className="py-3 px-4">
                    <span className={badgeStock(p.stock)}>
                      {p.stock <= 0 ? "Hết hàng" : `${p.stock} sp`}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <span className={badgeStatus(p.status)}>
                      {p.status === "ACTIVE" ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-gray-600">{p.updatedAt}</td>

                  <td className="py-3 px-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/admin/products/${p.id}`}
                        className="px-3 py-2 rounded-lg border bg-white hover:bg-gray-50 text-sm"
                      >
                        Xem
                      </Link>
                      <Link
                        to={`/admin/products/${p.id}/edit`}
                        className="px-3 py-2 rounded-lg border bg-white hover:bg-gray-50 text-sm"
                      >
                        Sửa
                      </Link>
                      <button
                        onClick={() => handleToggleStatus(p.id)}
                        className="px-3 py-2 rounded-lg border bg-white hover:bg-gray-50 text-sm"
                      >
                        {p.status === "ACTIVE" ? "Ẩn" : "Hiện"}
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="px-3 py-2 rounded-lg border bg-red-50 hover:bg-red-100 text-red-700 text-sm"
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {paged.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-gray-500">
                    Không có sản phẩm phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="text-sm text-gray-600">
            Hiển thị <span className="font-medium">{paged.length}</span> /{" "}
            <span className="font-medium">{filtered.length}</span> sản phẩm
          </div>

          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => setPage(1)}
              disabled={page === 1}
              className="px-3 py-2 rounded-lg border bg-white hover:bg-gray-50 text-sm disabled:opacity-50"
            >
              « Đầu
            </button>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-2 rounded-lg border bg-white hover:bg-gray-50 text-sm disabled:opacity-50"
            >
              ‹ Trước
            </button>

            <span className="text-sm px-2">
              {page} / {totalPages}
            </span>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-2 rounded-lg border bg-white hover:bg-gray-50 text-sm disabled:opacity-50"
            >
              Sau ›
            </button>
            <button
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
              className="px-3 py-2 rounded-lg border bg-white hover:bg-gray-50 text-sm disabled:opacity-50"
            >
              Cuối »
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
