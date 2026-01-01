import {  useSearchParams } from "react-router-dom";
import ProductGrid from "../components/Product/ProductGrid";
import { msiProducts } from "../apis/product"
import BackToTop from "../components/Scroll/BackToTop";

export default function Search() {

    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("q");

    return (
        <div className="max-w-7xl mx-auto py-3 px-4">
            <div className="flex flex-wrap items-center justify-between w-full pt-4">
                <h1 className="text-2xl font-semibold">Search Results for: <span className="text-red-500">{keyword}</span></h1>
                <p className="text-gray-600">Showing 10 results</p>
            </div>

            <div className="mt-8">
                {/* Placeholder for search results */}
                <ProductGrid products={msiProducts}/>
                <ProductGrid products={msiProducts}/>

            </div>
            <BackToTop/>
        </div>
    );
}