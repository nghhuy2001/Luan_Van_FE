export default function ProductCard({ product }) {
    return (
        <div className="border-2 hover:-mt-1  rounded-xl p-3 hover:shadow-lg transition cursor-pointer bg-white">
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-36 object-contain mb-2"
            />

            <h3 className="text-sm font-semibold line-clamp-2 min-h-[36px]">
                {product.name}
            </h3>

            <table className="w-full text-xs text-gray-600 mt-2">
                <tbody>
                <tr>
                    <td className="pr-1 flex items-center gap-1 text-gray-500">
                        🖥️ Màn hình
                    </td>
                    <td className="text-left font-medium">
                        {product.screen}
                    </td>
                </tr>

                <tr>
                    <td className="pr-1 flex items-center gap-1 text-gray-500">
                        ⚙️ CPU
                    </td>
                    <td className="text-left font-medium">
                        {product.cpu}
                    </td>
                </tr>

                <tr>
                    <td className="pr-1 flex items-center gap-1 text-gray-500">
                        💾 RAM
                    </td>
                    <td className="text-left font-medium">
                        {product.ram}
                    </td>
                </tr>

                <tr>
                    <td className="pr-1 flex items-center gap-1 text-gray-500">
                        📦 SSD
                    </td>
                    <td className="text-left font-medium">
                        {product.storage}
                    </td>
                </tr>
                </tbody>
            </table>


            <div className="mt-2">
                <p className="text-xs text-gray-400">
                    <label className="no-underline me-1">Giá gốc:</label>
                    <span className="line-through">{product.oldPrice}</span>
                </p>
                <p className="text-red-600 font-bold">
                    {product.salePrice}
                </p>
            </div>

            <div className="text-yellow-400 text-xs mt-1">
                ★★★★★ <span className="text-gray-400">(0 đánh giá)</span>
            </div>

        </div>
    );
}
