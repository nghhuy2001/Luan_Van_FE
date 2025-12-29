const categories = [
    { id: 1, name: "Laptop Doanh nhân", icon: "/banner/category1.webp" },
    { id: 2, name: "Laptop chơi game", icon: "/banner/category2.png" },
    { id: 3, name: "Laptop văn phòng", icon: "/banner/category3.png" },
    { id: 4, name: "Laptop sinh viên", icon: "/banner/category4.png" },
    { id: 5, name: "Laptop mỏng nhẹ", icon: "/banner/category5.png" },
    { id: 6, name: "Workstation", icon: "/banner/category6.png" },
    { id: 7, name: "Laptop đồ họa", icon: "/banner/category7.png" },
];

export default function CategoryQuickSelect() {
    return (
        <div className="bg-gray-100 rounded-xl py-6 px-8 my-8">
            <div className="flex justify-between gap-6">
                {categories.map(item => (
                    <div
                        key={item.id}
                        className="flex flex-col items-center cursor-pointer hover:text-blue-600"
                    >
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow">
                            <img src={item.icon} alt={item.name} className="w-8 h-8" />
                        </div>
                        <p className="text-sm mt-2 text-center">{item.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
