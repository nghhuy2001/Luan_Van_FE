import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Banner = () => {
    const banners = [
        "/banner/banner-laptop-1.jpg",
        "/banner/banner-laptop-2.jpg",
        "/banner/banner-laptop-3.jpg",
        "/banner/banner-laptop-4.jpg",
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 mt-4">
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation
                loop
                className="rounded-2xl overflow-hidden"
            >
                {banners.map((img, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={img}
                            alt={`banner-${index}`}
                            className="w-full h-[380px] object-cover"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;
