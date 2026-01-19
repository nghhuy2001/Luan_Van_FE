// pages/admin/users/UserListPage.jsx
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const Badge = ({ children, tone = "slate" }) => {
  const map = {
    green: "bg-emerald-50 text-emerald-700 border-emerald-200",
    red: "bg-rose-50 text-rose-700 border-rose-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    blue: "bg-sky-50 text-sky-700 border-sky-200",
    slate: "bg-slate-50 text-slate-700 border-slate-200",
    purple: "bg-violet-50 text-violet-700 border-violet-200",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-xs border rounded-full ${map[tone]}`}>
      {children}
    </span>
  );
};

const IconBtn = ({ children, onClick, title, tone = "slate" }) => {
  const map = {
    slate: "hover:bg-slate-100 text-slate-700",
    red: "hover:bg-rose-50 text-rose-700",
    blue: "hover:bg-sky-50 text-sky-700",
    green: "hover:bg-emerald-50 text-emerald-700",
    amber: "hover:bg-amber-50 text-amber-700",
  };
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-sm border border-slate-200 ${map[tone]} transition`}
    >
      {children}
    </button>
  );
};

const Field = ({ label, value }) => (
  <div className="space-y-1">
    <p className="text-xs text-slate-500">{label}</p>
    <p className="text-sm font-medium text-slate-800 break-words">{value || "—"}</p>
  </div>
);

const Modal = ({ open, title, children, onClose, footer }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-100 transition"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <div className="p-5">{children}</div>
          {footer && <div className="px-5 py-4 border-t border-slate-200 bg-slate-50">{footer}</div>}
        </div>
      </div>
    </div>
  );
};

const mockUsers = [
  {
    id: "U001",
    fullName: "Nguyễn Văn A",
    email: "a.nguyen@gmail.com",
    phone: "0901234567",
    role: "CUSTOMER",
    status: "ACTIVE",
    createdAt: "2025-12-10 09:12",
    lastLoginAt: "2026-01-07 21:18",
    totalOrders: 12,
    totalSpent: 45800000,
    addressDefault: "Q.1, TP.HCM",
  },
  {
    id: "U002",
    fullName: "Trần Thị B",
    email: "b.tran@gmail.com",
    phone: "0912345678",
    role: "CUSTOMER",
    status: "BLOCKED",
    createdAt: "2025-11-02 10:05",
    lastLoginAt: "2025-12-29 18:44",
    totalOrders: 3,
    totalSpent: 8900000,
    addressDefault: "Thủ Đức, TP.HCM",
  },
  {
    id: "U100",
    fullName: "Admin Root",
    email: "root@shop.com",
    phone: "0900000000",
    role: "ADMIN",
    status: "ACTIVE",
    createdAt: "2025-09-01 08:00",
    lastLoginAt: "2026-01-08 00:30",
    totalOrders: 0,
    totalSpent: 0,
    addressDefault: "—",
  },
  {
    id: "U101",
    fullName: "Nguyễn Hoàng Huy",
    email: "huy@shop.com",
    phone: "0933333333",
    role: "ADMIN",
    status: "ACTIVE",
    createdAt: "2025-12-22 20:30",
    lastLoginAt: "2026-01-07 23:59",
    totalOrders: 0,
    totalSpent: 0,
    addressDefault: "—",
  },
];

const formatMoney = (v) =>
  (v ?? 0).toLocaleString("vi-VN", { maximumFractionDigits: 0 }) + "đ";

const statusTone = (s) => (s === "ACTIVE" ? "green" : s === "BLOCKED" ? "red" : "slate");
const roleTone = (r) => (r === "ADMIN" ? "purple" : "blue");

const PageHeader = ({ title, subtitle, right }) => (
  <div className="flex items-start justify-between gap-4">
    <div>
      <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
      {subtitle && <p className="text-sm text-slate-600 mt-1">{subtitle}</p>}
    </div>
    {right}
  </div>
);

const FilterBar = ({
  q,
  setQ,
  status,
  setStatus,
  sort,
  setSort,
  from,
  setFrom,
  to,
  setTo,
  onReset,
}) => (
  <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
      <div className="md:col-span-4">
        <label className="text-xs text-slate-600">Tìm kiếm</label>
        <div className="mt-1 flex items-center gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Tên, email, SĐT, mã người dùng..."
            className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300"
          />
        </div>
      </div>

      <div className="md:col-span-2">
        <label className="text-xs text-slate-600">Trạng thái</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300"
        >
          <option value="ALL">Tất cả</option>
          <option value="ACTIVE">Đang hoạt động</option>
          <option value="BLOCKED">Bị khóa</option>
        </select>
      </div>

      <div className="md:col-span-2">
        <label className="text-xs text-slate-600">Sắp xếp</label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300"
        >
          <option value="NEWEST">Mới nhất</option>
          <option value="OLDEST">Cũ nhất</option>
          <option value="NAME_ASC">Tên A → Z</option>
          <option value="NAME_DESC">Tên Z → A</option>
          <option value="LAST_LOGIN">Đăng nhập gần nhất</option>
        </select>
      </div>

      <div className="md:col-span-2">
        <label className="text-xs text-slate-600">Từ ngày</label>
        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300"
        />
      </div>

      <div className="md:col-span-2">
        <label className="text-xs text-slate-600">Đến ngày</label>
        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300"
        />
      </div>
    </div>

    <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
      <div className="text-xs text-slate-500">
        Tip: click vào tên để xem chi tiết, hoặc dùng “Xem” trong cột thao tác.
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onReset}
          className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition text-sm"
        >
          Reset lọc
        </button>
      </div>
    </div>
  </div>
);

const Pagination = ({ page, setPage, totalPages }) => {
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className="flex items-center justify-between mt-4">
      <p className="text-xs text-slate-500">
        Trang <span className="font-semibold">{page}</span> / {totalPages}
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={!canPrev}
          onClick={() => canPrev && setPage(page - 1)}
          className={`px-3 py-2 rounded-xl border text-sm transition ${
            canPrev ? "border-slate-200 hover:bg-slate-50" : "border-slate-100 text-slate-300 cursor-not-allowed"
          }`}
        >
          ← Trước
        </button>
        <button
          type="button"
          disabled={!canNext}
          onClick={() => canNext && setPage(page + 1)}
          className={`px-3 py-2 rounded-xl border text-sm transition ${
            canNext ? "border-slate-200 hover:bg-slate-50" : "border-slate-100 text-slate-300 cursor-not-allowed"
          }`}
        >
          Sau →
        </button>
      </div>
    </div>
  );
};

export const UserListPage = ({ mode = "customers" }) => {
  const isAdmins = mode === "admins";

  const [q, setQ] = useState("");
  const [status, setStatus] = useState("ALL");
  const [sort, setSort] = useState("NEWEST");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [page, setPage] = useState(1);
  const pageSize = 8;

  const [selected, setSelected] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);

  const [selectedIds, setSelectedIds] = useState([]);
 

  const data = useMemo(() => {
    const role = isAdmins ? "ADMIN" : "CUSTOMER";
    return mockUsers.filter((u) => u.role === role);
  }, [isAdmins]);

  const filteredUsers = useMemo(() => {
    let arr = [...data];

    // search
    const kw = q.trim().toLowerCase();
    if (kw) {
      arr = arr.filter((u) =>
        [u.id, u.fullName, u.email, u.phone].some((x) => String(x || "").toLowerCase().includes(kw))
      );
    }

    // status
    if (status !== "ALL") arr = arr.filter((u) => u.status === status);

    // date range (createdAt)
    const toDate = (s) => {
      // supports "YYYY-MM-DD" or "YYYY-MM-DD HH:mm"
      if (!s) return null;
      const t = s.includes(" ") ? s.replace(" ", "T") : s + "T00:00:00";
      const d = new Date(t);
      return Number.isNaN(d.getTime()) ? null : d;
    };

    const f = toDate(from);
    const t = toDate(to);
    if (f || t) {
      arr = arr.filter((u) => {
        const d = toDate(u.createdAt);
        if (!d) return true;
        if (f && d < f) return false;
        if (t) {
          const end = new Date(t);
          end.setHours(23, 59, 59, 999);
          if (d > end) return false;
        }
        return true;
      });
    }

    // sort
    const keyName = (u) => (u.fullName || "").toLowerCase();
    const keyCreated = (u) => new Date((u.createdAt || "").replace(" ", "T")).getTime() || 0;
    const keyLogin = (u) => new Date((u.lastLoginAt || "").replace(" ", "T")).getTime() || 0;

    if (sort === "NEWEST") arr.sort((a, b) => keyCreated(b) - keyCreated(a));
    if (sort === "OLDEST") arr.sort((a, b) => keyCreated(a) - keyCreated(b));
    if (sort === "NAME_ASC") arr.sort((a, b) => keyName(a).localeCompare(keyName(b)));
    if (sort === "NAME_DESC") arr.sort((a, b) => keyName(b).localeCompare(keyName(a)));
    if (sort === "LAST_LOGIN") arr.sort((a, b) => keyLogin(b) - keyLogin(a));

    return arr;
  }, [data, q, status, sort, from, to]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredUsers.slice(start, start + pageSize);
  }, [filteredUsers, page]);

  // keep page in range when filters change
  useMemo(() => {
    if (page > totalPages) setPage(totalPages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPages]);

  const pageIds = useMemo(() => paged.map((u) => u.id), [paged]);
  const isAllPageChecked = pageIds.length > 0 && pageIds.every((id) => selectedIds.includes(id));
  const isSomePageChecked = pageIds.some((id) => selectedIds.includes(id));

  const toggleCheckAllPage = () => {
    if (isAllPageChecked) {
      setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...pageIds])));
    }
  };

  const toggleOne = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const openUser = (u) => {
    setSelected(u);
    setOpenDetail(true);
  };

  const resetFilters = () => {
    setQ("");
    setStatus("ALL");
    setSort("NEWEST");
    setFrom("");
    setTo("");
    setPage(1);
  };

  const bulkDisabled = selectedIds.length === 0;

  const title = isAdmins ? "Quản trị viên" : "Khách hàng";
  const subtitle = isAdmins
    ? "Quản lý tài khoản admin: phân quyền, khóa/mở, lịch sử đăng nhập."
    : "Quản lý khách hàng: trạng thái, thống kê đơn hàng, chi tiết tài khoản.";

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-4">
      <PageHeader
        title={title}
        subtitle={subtitle}
        right={
          <div className="flex items-center gap-2">
            <Link
              to="/admin/users"
              className="hidden md:inline-flex px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition text-sm"
              title="(Tuỳ bạn tạo route tổng hợp sau)"
            >
              Tổng quan người dùng
            </Link>
            <button
              type="button"
              className="px-3 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition text-sm"
              onClick={() => alert("UI thôi: mở form tạo người dùng / mời admin / import...")}
            >
              + Thêm
            </button>
          </div>
        }
      />

      {/* KPI quick cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-slate-500">Tổng {isAdmins ? "admin" : "khách hàng"}</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{filteredUsers.length}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-slate-500">Đang hoạt động</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">
            {filteredUsers.filter((u) => u.status === "ACTIVE").length}
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-slate-500">Bị khóa</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">
            {filteredUsers.filter((u) => u.status === "BLOCKED").length}
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-slate-500">Đã chọn</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{selectedIds.length}</p>
        </div>
      </div>

      <FilterBar
        q={q}
        setQ={setQ}
        status={status}
        setStatus={setStatus}
        sort={sort}
        setSort={setSort}
        from={from}
        setFrom={setFrom}
        to={to}
        setTo={setTo}
        onReset={resetFilters}
      />

      {/* Bulk actions */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Badge tone={bulkDisabled ? "slate" : "blue"}>{selectedIds.length} đã chọn</Badge>
          <span className="text-xs text-slate-500">
            {isSomePageChecked && !isAllPageChecked ? "Đang chọn một phần trang" : " "}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={bulkDisabled}
            className={`px-3 py-2 rounded-xl border text-sm transition ${
              bulkDisabled
                ? "border-slate-100 text-slate-300 cursor-not-allowed"
                : "border-slate-200 hover:bg-slate-50"
            }`}
            onClick={() => alert("UI thôi: mở khóa hàng loạt")}
          >
            Mở khóa
          </button>
          <button
            type="button"
            disabled={bulkDisabled}
            className={`px-3 py-2 rounded-xl border text-sm transition ${
              bulkDisabled
                ? "border-slate-100 text-slate-300 cursor-not-allowed"
                : "border-slate-200 hover:bg-slate-50"
            }`}
            onClick={() => alert("UI thôi: khóa hàng loạt")}
          >
            Khóa
          </button>

          {isAdmins && (
            <button
              type="button"
              disabled={bulkDisabled}
              className={`px-3 py-2 rounded-xl border text-sm transition ${
                bulkDisabled
                  ? "border-slate-100 text-slate-300 cursor-not-allowed"
                  : "border-slate-200 hover:bg-slate-50"
              }`}
              onClick={() => alert("UI thôi: đổi role / cấp quyền hàng loạt")}
            >
              Phân quyền
            </button>
          )}

          <button
            type="button"
            disabled={bulkDisabled}
            className={`px-3 py-2 rounded-xl border text-sm transition ${
              bulkDisabled
                ? "border-slate-100 text-slate-300 cursor-not-allowed"
                : "border-slate-200 hover:bg-slate-50"
            }`}
            onClick={() => setSelectedIds([])}
          >
            Bỏ chọn
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-900">Danh sách</p>
          <p className="text-xs text-slate-500">
            Hiển thị {paged.length} / {filteredUsers.length}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr className="text-left">
                <th className="px-4 py-3 w-12">
                  <input
                    type="checkbox"
                    checked={isAllPageChecked}
                    ref={(el) => {
                      if (!el) return;
                      el.indeterminate = !isAllPageChecked && isSomePageChecked;
                    }}
                    onChange={toggleCheckAllPage}
                  />
                </th>
                <th className="px-4 py-3">Người dùng</th>
                <th className="px-4 py-3">Liên hệ</th>
                {!isAdmins && <th className="px-4 py-3">Đơn hàng</th>}
                <th className="px-4 py-3">Trạng thái</th>
                <th className="px-4 py-3">Ngày tạo</th>
                <th className="px-4 py-3">Đăng nhập gần nhất</th>
                <th className="px-4 py-3 text-right">Thao tác</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {paged.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/70 transition">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(u.id)}
                      onChange={() => toggleOne(u.id)}
                    />
                  </td>

                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => openUser(u)}
                      className="text-left"
                    >
                      <p className="font-semibold text-slate-900 hover:underline">{u.fullName}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <Badge tone={roleTone(u.role)}>{u.role}</Badge>
                        <Badge tone="slate">#{u.id}</Badge>
                      </div>
                    </button>
                  </td>

                  <td className="px-4 py-3">
                    <p className="text-slate-800">{u.email}</p>
                    <p className="text-xs text-slate-500 mt-1">{u.phone || "—"}</p>
                  </td>

                  {!isAdmins && (
                    <td className="px-4 py-3">
                      <p className="text-slate-900 font-semibold">{u.totalOrders ?? 0}</p>
                      <p className="text-xs text-slate-500 mt-1">{formatMoney(u.totalSpent)}</p>
                    </td>
                  )}

                  <td className="px-4 py-3">
                    <Badge tone={statusTone(u.status)}>{u.status}</Badge>
                  </td>

                  <td className="px-4 py-3 text-slate-700">{u.createdAt}</td>
                  <td className="px-4 py-3 text-slate-700">{u.lastLoginAt || "—"}</td>

                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <IconBtn title="Xem chi tiết" onClick={() => openUser(u)} tone="blue">
                        Xem
                      </IconBtn>
                      <IconBtn
                        title={u.status === "ACTIVE" ? "Khóa tài khoản" : "Mở khóa tài khoản"}
                        onClick={() => alert("UI thôi: call API khóa/mở")}
                        tone={u.status === "ACTIVE" ? "amber" : "green"}
                      >
                        {u.status === "ACTIVE" ? "Khóa" : "Mở"}
                      </IconBtn>

                      {isAdmins ? (
                        <IconBtn title="Phân quyền" onClick={() => alert("UI thôi: phân quyền")} tone="slate">
                          Quyền
                        </IconBtn>
                      ) : (
                        <IconBtn title="Xem đơn hàng" onClick={() => alert("UI thôi: route orders by user")} tone="slate">
                          Đơn
                        </IconBtn>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {paged.length === 0 && (
                <tr>
                  <td colSpan={isAdmins ? 7 : 8} className="px-4 py-10 text-center text-slate-500">
                    Không có dữ liệu phù hợp bộ lọc.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-4 pb-4">
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
      </div>

      {/* Detail Modal */}
      <Modal
        open={openDetail}
        title={selected ? `Chi tiết người dùng • ${selected.fullName}` : "Chi tiết người dùng"}
        onClose={() => setOpenDetail(false)}
        footer={
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {selected && (
                <>
                  <Badge tone={roleTone(selected.role)}>{selected.role}</Badge>
                  <Badge tone={statusTone(selected.status)}>{selected.status}</Badge>
                  <Badge tone="slate">#{selected.id}</Badge>
                </>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition text-sm"
                onClick={() => alert("UI thôi: reset password")}
              >
                Reset mật khẩu
              </button>

              {selected && (
                <button
                  type="button"
                  className={`px-3 py-2 rounded-xl text-sm transition ${
                    selected.status === "ACTIVE"
                      ? "bg-amber-600 text-white hover:bg-amber-700"
                      : "bg-emerald-600 text-white hover:bg-emerald-700"
                  }`}
                  onClick={() => alert("UI thôi: call API khóa/mở")}
                >
                  {selected.status === "ACTIVE" ? "Khóa tài khoản" : "Mở khóa"}
                </button>
              )}

              <button
                type="button"
                className="px-3 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition text-sm"
                onClick={() => setOpenDetail(false)}
              >
                Đóng
              </button>
            </div>
          </div>
        }
      >
        {!selected ? null : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <Field label="Họ tên" value={selected.fullName} />
                <div className="mt-3">
                  <Field label="Email" value={selected.email} />
                </div>
                <div className="mt-3">
                  <Field label="Số điện thoại" value={selected.phone} />
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <Field label="Trạng thái" value={selected.status} />
                <div className="mt-3">
                  <Field label="Role" value={selected.role} />
                </div>
                <div className="mt-3">
                  <Field label="Ngày tạo" value={selected.createdAt} />
                </div>
                <div className="mt-3">
                  <Field label="Đăng nhập gần nhất" value={selected.lastLoginAt} />
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                {!isAdmins ? (
                  <>
                    <Field label="Tổng đơn" value={String(selected.totalOrders ?? 0)} />
                    <div className="mt-3">
                      <Field label="Tổng chi" value={formatMoney(selected.totalSpent)} />
                    </div>
                    <div className="mt-3">
                      <Field label="Địa chỉ mặc định" value={selected.addressDefault} />
                    </div>
                    <div className="mt-4">
                      <button
                        type="button"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 hover:bg-white transition text-sm"
                        onClick={() => alert("UI thôi: xem đơn của user")}
                      >
                        Xem đơn hàng của người dùng
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <Field label="Ghi chú" value="Admin có quyền truy cập hệ thống." />
                    <div className="mt-4 space-y-2">
                      <button
                        type="button"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 hover:bg-white transition text-sm"
                        onClick={() => alert("UI thôi: mở modal phân quyền")}
                      >
                        Phân quyền / Role
                      </button>
                      <button
                        type="button"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 hover:bg-white transition text-sm"
                        onClick={() => alert("UI thôi: xem lịch sử hoạt động")}
                      >
                        Lịch sử hoạt động
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <p className="text-sm font-semibold text-slate-900">Tác vụ nhanh</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <IconBtn tone="blue" onClick={() => alert("UI thôi: gửi email")} title="Gửi email">
                  Gửi email
                </IconBtn>
                <IconBtn tone="slate" onClick={() => alert("UI thôi: copy user id")} title="Copy ID">
                  Copy ID
                </IconBtn>
                <IconBtn tone="red" onClick={() => alert("UI thôi: xóa (nếu có)")} title="Xóa">
                  Xóa
                </IconBtn>
              </div>
              <p className="text-xs text-slate-500 mt-3">
                (Bạn có thể disable “Xóa” và chỉ cho “Khóa” để an toàn dữ liệu.)
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

// 2 pages wrappers
export const CustomerListPage = () => <UserListPage mode="customers" />;
export const AdminListPage = () => <UserListPage mode="admins" />;
