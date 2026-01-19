import { useState } from "react";

export default function CategoryFormModal({ onClose, onSubmit, initialData }) {
    const [name, setName] = useState(initialData?.name || "");
    const [description, setDescription] = useState(initialData?.description || "");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, description });
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[400px] rounded shadow p-6">
                <h2 className="text-xl font-semibold mb-4">
                    {initialData ? "Cập nhật danh mục" : "Thêm danh mục"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Tên danh mục
                        </label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Mô tả
                        </label>
                        <textarea
                            className="w-full border rounded px-3 py-2"
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded hover:bg-gray-100"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Lưu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
