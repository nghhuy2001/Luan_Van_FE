import { useEffect, useState } from "react";
import SupplierModal from "./SupplierModal";
import Pagination from "../../../components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchSuppliers, createSupplier, deleteSupplier, updateSupplier } from "../../../app/features/supplier/supplierSlice";
import Swal from "sweetalert2"; // cho window.alert đẹp hơn

const emptyForm = { id: null, name: "", phone: "", email: "" };

export default function SupplierListPage() {
    const dispatch = useDispatch();
    const {
        items,
        status,
        error,
        currentPage,
        totalPages,
        totalElements,
    } = useSelector((s) => s.suppliers);

    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [selected, setSelected] = useState(null);

    //  khi mount: load trang 0
    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchSuppliers(0));
        }
    }, [status, dispatch]);

    function onPageChange(uiPage) {
        // uiPage: 1..totalPages
        const bePage = uiPage - 1; // đổi về 0-based
        dispatch(fetchSuppliers(bePage));
    }

    function openCreate() {
        setModalMode("create");
        setSelected({ ...emptyForm });
        setModalOpen(true);
    }

    function openEdit(s) {
        setModalMode("edit");
        setSelected({
            id: s.id ?? null,
            name: s.name ?? "",
            phone: s.phone ?? "",
            email: s.email ?? "",
            active: s.active ?? true,
        });
        setModalOpen(true);
    }

    async function handleDelete(id) {
        if (!id) return;

        const result = await Swal.fire({
            title: "Xóa nhà cung cấp?",
            text: "Hành động này không thể hoàn tác.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy",
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            reverseButtons: true,
        });

        if (!result.isConfirmed) return;

        try {
            await dispatch(deleteSupplier(id)).unwrap();
            dispatch(fetchSuppliers(currentPage));

            Swal.fire({
                icon: "success",
                title: "Đã xóa",
                text: "Nhà cung cấp đã được xóa.",
                timer: 1500,
                showConfirmButton: false,
            });
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Lỗi",
                text: "Không thể xóa nhà cung cấp.",
            });
        }
    }

    async function handleSave(form) {
        const payload = { name: form.name, phone: form.phone, email: form.email };

        if (modalMode === "create") {
            await dispatch(createSupplier(payload)).unwrap();
        } else {
            await dispatch(updateSupplier({ id: form.id, dataRequest: form })).unwrap();
        }

        setModalOpen(false);
        setSelected(null);
        dispatch(fetchSuppliers(currentPage));
    }

    const loading = status === "loading";
    const suppliers = items || [];
    const uiCurrentPage = (currentPage ?? 0) + 1;
    return (
        <div className="p-4 space-y-4">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-bold">Danh sách nhà cung cấp</h1>
                    <p className="text-sm text-gray-500">
                        Tổng: {totalElements}
                    </p>
                </div>

                <button
                    onClick={openCreate}
                    className="rounded-xl bg-black px-4 py-2 text-white hover:opacity-90"
                >
                    + Thêm nhà cung cấp
                </button>
            </div>

            <div className="rounded-2xl border bg-white overflow-hidden">
                <div className="overflow-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50">
                            <tr className="text-sm">
                                <th className="px-4 py-3 w-[90px]">ID</th>
                                <th className="px-4 py-3 min-w-[220px]">Tên</th>
                                <th className="px-4 py-3 min-w-[160px]">SĐT</th>
                                <th className="px-4 py-3 min-w-[240px]">Email</th>
                                <th className="px-4 py-3 min-w-[240px]">Active</th>
                                <th className="px-4 py-3 w-[180px] text-right">Hành động</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td className="px-4 py-4 text-sm text-gray-500" colSpan={5}>
                                        Đang tải...
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td className="px-4 py-4 text-sm text-red-600" colSpan={5}>
                                        Lỗi: {String(error)}
                                    </td>
                                </tr>
                            ) : suppliers.length === 0 ? (
                                <tr>
                                    <td className="px-4 py-4 text-sm text-gray-500" colSpan={5}>
                                        Chưa có nhà cung cấp nào.
                                    </td>
                                </tr>
                            ) : (
                                suppliers.map((s) => (
                                    <tr key={s.id} className="border-t">
                                        <td className="px-4 py-3 text-sm">{s.id}</td>
                                        <td className="px-4 py-3">{s.name}</td>
                                        <td className="px-4 py-3">{s.phone}</td>
                                        <td className="px-4 py-3">{s.email}</td>
                                        <td className="px-4 py-3">
                                            {s.active ? (
                                                <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                                                    <span className="me-1 animate-pulse">● </span>Có
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                                                    <span className="me-1 animate-pulse">● </span>Không
                                                </span>
                                            )}
                                        </td>

                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => openEdit(s)}
                                                    className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
                                                >
                                                    Sửa
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(s.id)}
                                                    className="rounded-xl border px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                                                >
                                                    Xóa
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <Pagination
                currentPage={uiCurrentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
            />

            <SupplierModal
                open={modalOpen}
                mode={modalMode}
                value={selected}
                onClose={() => {
                    setModalOpen(false);
                    setSelected(null);
                }}
                onSave={handleSave}
            />
        </div>
    );
}
