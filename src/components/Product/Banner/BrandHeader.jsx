export default function BrandHeader({ brand, tabs }) {
    return (
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-6">
                <div className="bg-blue-800 text-white px-5 py-2 font-semibold">
                    {brand}
                </div>

                <div className="flex gap-4 text-sm text-gray-600">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            className="hover:text-blue-600"
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <a href="/" className="text-blue-600 text-sm hover:underline">
                Xem tất cả
                <i className="fa-solid fa-caret-down"></i>
            </a>
        </div>
    );
}
