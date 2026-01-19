import { useState } from "react";
import CategoryFormModal from "./CategoryFormModal";

const mockCategories = [
    { id: 1, name: "Laptop", description: "Danh mục laptop" },
    { id: 2, name: "Phụ kiện", description: "Chuột, bàn phím, tai nghe" },
];

export default function CategoryList() {
    const [categories, setCategories] = useState(mockCategories);
    const [openModal, setOpenModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    const handleAdd = () => {
        setEditingCategory(null);
        setOpenModal(true);
    };

    const handleEdit = (category) => {
        setEditingCategory(category);
        setOpenModal(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Bạn có chắc muốn xóa danh mục này?")) {
            setCategories(categories.filter((c) => c.id !== id));
        }
    };

    const handleSubmit = (data) => {
        if (editingCategory) {
            setCategories(
                categories.map((c) =>
                    c.id === editingCategory.id ? { ...c, ...data } : c
                )
            );
        } else {
            setCategories([
                ...categories,
                { id: Date.now(), ...data },
            ]);
        }
        setOpenModal(false);
    };

    return (
        <div className="bg-white p-6 rounded shadow">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Danh mục sản phẩm</h1>
                <button
                    onClick={handleAdd}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    + Thêm danh mục
                </button>
            </div>

            {/* Table */}
            <table className="w-full border border-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3 border">ID</th>
                        <th className="p-3 border text-left">Tên danh mục</th>
                        <th className="p-3 border text-left">Mô tả</th>
                        <th className="p-3 border text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((cat) => (
                        <tr key={cat.id} className="hover:bg-gray-50">
                            <td className="p-3 border text-center">{cat.id}</td>
                            <td className="p-3 border">{cat.name}</td>
                            <td className="p-3 border">{cat.description}</td>
                            <td className="p-3 border text-center space-x-2">
                                <button
                                    onClick={() => handleEdit(cat)}
                                    className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
                                >
                                    Sửa
                                </button>
                                <button
                                    onClick={() => handleDelete(cat.id)}
                                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}
            {openModal && (
                <CategoryFormModal
                    onClose={() => setOpenModal(false)}
                    onSubmit={handleSubmit}
                    initialData={editingCategory}
                />
            )}
        </div>
    );
}
