
import Banner from "../components/Banner/Banner";
import CategoryQuickSelect from "../components/Category/CategoryQuickSelect";
import BrandSection from "../components/Brand/BrandSection";
// import { msiProducts } from "../apis/product"
import BackToTop from "../components/Scroll/BackToTop";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../app/features/products/productsSlice";
import FullScreenLoader from "../components/Loading/FullScreenLoader";

const Home = () => {
    const dispatch = useDispatch();
    const { items, itemsStatus } = useSelector((s) => s.products);

    useEffect(() => {
        if (itemsStatus === 'idle') {
            dispatch(fetchProducts(true));
        }
    }, [itemsStatus, dispatch]);

    if (itemsStatus === "idle" || itemsStatus === "loading") return <FullScreenLoader />;
    if (itemsStatus === "failed") return <p>Lỗi tải sản phẩm</p>;

    return (
        <>
            <Banner />
            <div className="content-body max-w-7xl mx-auto px-4">
                <CategoryQuickSelect />
                <BrandSection
                    brand="dell"
                    tabs={[
                        // "DELL XPS",
                        // "DELL PRO",
                        // "DELL PRECISION",
                        // "DELL LATITUDE",
                        // "DELL INSPIRON",
                        // "DELL ALIENWARE",
                    ]}
                    products={items}
                    banner="/banner/banner-laptop-1.jpg"
                />

                {/* <BrandSection
                    brand="thinkpad"
                    tabs={[
                        "THINKPAD X",
                        "THINKPAD T",
                        "THINKPAD GIÁ RẺ",
                        "MÁY TRẠM THINKPAD P",
                    ]}
                    products={msiProducts}
                // banner="/banner/banner-laptop-2.jpg"
                /> */}
            </div>
            <BackToTop />
        </>
    );
};

export default Home;
