
import { Link, useParams } from "react-router-dom";
import Banner from "../components/Banner/Banner";
import BackToTop from "../components/Scroll/BackToTop";
import BrandSlider from "../components/Brand/BrandSlider";
import ProductGrid from "../components/Product/ProductGrid";
import { msiProducts } from "../apis/product"
import { useState } from "react";
import Pagination from "../components/Pagination/Pagination";

export default function Category() {
    const {brand} = useParams();
    const [currentPage, setCurrentPage] = useState(1);

    // const pageSize = 8;
    // const totalPages = Math.ceil(msiProducts.length / pageSize);
    const totalPages = 10;

    // const startIndex = (currentPage - 1) * pageSize;
    // const currentProducts = msiProducts.slice(
    //     startIndex,
    //     startIndex + pageSize
    // );

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <p className="text-sm text-gray-500 mb-3">
                Trang chủ / Laptop / Thuong hiệu / {brand}
            </p>

            <Banner />

            <BrandSlider brand={brand} />

            <div className="flex flex-wrap gap-4 mb-8 items-center">
                <h2 className="font-bold">Chọn khoảng giá:</h2>
                <button className="px-4 py-2 border font-bold bg-white shadow rounded-md text-sm hover:bg-blue-600 hover:text-white transition">5 - 10 triệu</button>
                <button className="px-4 py-2 border font-bold bg-white shadow rounded-md text-sm hover:bg-blue-600 hover:text-white transition">10 - 15 triệu</button>
                <button className="px-4 py-2 border font-bold bg-white shadow rounded-md text-sm hover:bg-blue-600 hover:text-white transition">15 - 20 triệu</button>
                <button className="px-4 py-2 border font-bold bg-white shadow rounded-md text-sm hover:bg-blue-600 hover:text-white transition">20 - 25 triệu</button>
                <button className="px-4 py-2 border font-bold bg-white shadow rounded-md text-sm hover:bg-blue-600 hover:text-white transition">Trên 25 triệu</button>
            </div>

            <div className="flex flex-wrap gap-4 mb-8 items-center">
                <h2 className="font-bold mr-4">Sắp xếp theo:</h2>
                <Link to="/" className="text-blue-700 font-medium text-sm transition hover:opacity-80">Mới nhất</Link>
                <Link to="/" className="text-blue-700 font-medium text-sm transition hover:opacity-80">Giá thấp đến cao</Link>
                <Link to="/" className="text-blue-700 font-medium text-sm transition hover:opacity-80">Giá cao đến thấp</Link>
                <Link to="/" className="text-blue-700 font-medium text-sm transition hover:opacity-80">Bán chạy</Link>
                <Link to="/" className="text-blue-700 font-medium text-sm transition hover:opacity-80">Tên A - Z</Link>
            </div>

            <div className="mt-8">
                <ProductGrid products={msiProducts}/>
                <ProductGrid products={msiProducts}/>
            </div>
            
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />

            <BackToTop/>
        </div>
    );
}