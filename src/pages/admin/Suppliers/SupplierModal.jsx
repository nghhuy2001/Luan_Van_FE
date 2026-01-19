import { useEffect, useState } from "react";

const emptyForm = { id: null, name: "", phone: "", email: "", active: true };

export default function SupplierModal({ open, mode, value, onClose, onSave }) {
    const [form, setForm] = useState(value ?? emptyForm);

    useEffect(() => {
        const v = value ?? {};
        setForm({
            ...emptyForm,
            ...v,
            active: v.active
        });
    }, [value, open]);



    if (!open) return null;

    const isEdit = mode === "edit";
    const title = mode === "create" ? "Thêm nhà cung cấp" : "Cập nhật nhà cung cấp";


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />
            <div className="relative w-[95%] max-w-xl rounded-2xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b p-4">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <button onClick={onClose} className="rounded-lg px-3 py-1 text-sm hover:bg-gray-100">
                        ✕
                    </button>
                </div>

                <div className="p-4 space-y-4">
                    {/*chỉ hiện khi edit */}
                    {isEdit && (
                        <div className="flex items-center justify-between rounded-xl border p-3">
                            <div>
                                <div className="text-sm font-medium">Trạng thái</div>
                                <div className="text-sm text-gray-500">
                                    {form?.active ? "Hoạt động" : "Ngừng (đã xóa mềm)"}
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setForm((s) => ({ ...s, active: !s.active }))}
                                className={`relative inline-flex h-7 w-12 items-center rounded-full transition
                  ${form?.active ? "bg-green-500" : "bg-gray-300"}
                `}
                                aria-label="Toggle active"
                            >
                                <span
                                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition
                    ${form?.active ? "translate-x-6" : "translate-x-1"}
                  `}
                                />
                            </button>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium mb-1">Tên nhà cung cấp</label>
                        <input
                            value={form?.name ?? ""}
                            onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                            className="w-full rounded-xl border px-3 py-2 outline-none focus:ring"
                            placeholder="VD: Công ty TNHH ABC"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Số điện thoại</label>
                        <input
                            value={form?.phone ?? ""}
                            onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
                            className="w-full rounded-xl border px-3 py-2 outline-none focus:ring"
                            placeholder="VD: 0909xxxxxx"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            value={form?.email ?? ""}
                            onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                            className="w-full rounded-xl border px-3 py-2 outline-none focus:ring"
                            placeholder="VD: supplier@email.com"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-end gap-2 border-t p-4">
                    <button onClick={onClose} className="rounded-xl border px-4 py-2 hover:bg-gray-50">
                        Hủy
                    </button>
                    <button
                        onClick={() => onSave(form)}
                        className="rounded-xl bg-black px-4 py-2 text-white hover:opacity-90"
                    >
                        Lưu
                    </button>
                </div>
            </div>
        </div>
    );
}
