import Header from "../components/Header/Header";
import Banner from "../components/Banner/Banner";
import CategoryQuickSelect from "../components/Category/CategoryQuickSelect";
import BrandSection from "../components/Brand/BrandSection";
import { msiProducts } from "../apis/product"
import BackToTop from "../components/BackToTop";

const Home = () => {
    return (
        <>
            <Banner />
            <div className="content-body max-w-7xl mx-auto px-4">
                <CategoryQuickSelect />
                <BrandSection
                    brand="LAPTOP DELL"
                    tabs={[
                        "DELL XPS",
                        "DELL PRO",
                        "DELL PRECISION",
                        "DELL LATITUDE",
                        "DELL INSPIRON",
                        "DELL ALIENWARE",
                    ]}
                    products={msiProducts}
                    banner="/banner/banner-laptop-1.jpg"
                />

                <BrandSection
                    brand="LAPTOP THINKPAD"
                    tabs={[
                        "THINKPAD X",
                        "THINKPAD T",
                        "THINKPAD GIÁ RẺ",
                        "MÁY TRẠM THINKPAD P",
                    ]}
                    products={msiProducts}
                    // banner="/banner/banner-laptop-2.jpg"
                />
            </div>
            <BackToTop />
        </>
    );
};

export default Home;
