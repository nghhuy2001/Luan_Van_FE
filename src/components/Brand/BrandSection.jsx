//import { msiProducts } from "../../apis/product"
import BrandHeader from "../Product/Banner/BrandHeader";
import ProductGrid from "../Product/ProductGrid";


export default function BrandSection({ brand, tabs, products, banner }) {
    return (
        <section className="mt-10">
            <BrandHeader brand={brand} tabs={tabs} />
            <ProductGrid products={products} />

            {/* Banner xen giữa (nếu có) */}
            {banner && (
                <img
                    src={banner}
                    alt="brand banner"
                    className="w-full my-6 rounded-lg"
                />
            )}
        </section>
    );
}
