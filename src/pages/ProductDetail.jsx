import { useParams } from "react-router-dom";
import { useState } from "react";
import { products } from "../apis/productID";
import BackToTop from "../components/Scroll/BackToTop";

export default function ProductDetail() {
    const { id } = useParams();
    const product = products.find(p => p.id === Number(id));
    const [activeImage, setActiveImage] = useState(product.images[0]);

    if (!product) {
        return <div>Không tìm thấy sản phẩm</div>;
    }

    return (
        <div className="max-w-7xl mx-auto p-4">
            {/* breadcrumb */}
            <p className="text-sm text-gray-500 mb-3">
                Trang chủ / Laptop / {product.name}
            </p>

            <div className="grid grid-cols-12 gap-3">
                {/* Images */}
                {/* IMAGE GALLERY */}
                <div className="col-span-4 bg-white p-2 rounded-md">
                    {/* Ảnh chính */}
                    <div className="rounded mb-3 flex items-center justify-center">
                        <img
                            src={activeImage}
                            alt={product.name}
                            className="max-h-[380px] object-contain"
                        />
                    </div>

                    {/* Thumbnail list */}
                    <div className="flex gap-2 justify-center">
                        {product.images.map((img, index) => (
                            <div
                                key={index}
                                onClick={() => setActiveImage(img)}
                                className={`border rounded p-1 cursor-pointer
          ${activeImage === img ? "border-orange-500" : "border-gray-300"}
        `}
                            >
                                <img
                                    src={img}
                                    className="h-16 w-20 object-contain"
                                    alt=""
                                />
                            </div>
                        ))}
                    </div>
                </div>


                {/* Info */}
                <div className="col-span-5 bg-white p-4 rounded-xl shadow-sm">
                    <h1 className="text-2xl font-bold">{product.name}</h1>

                    {/* Giá */}
                    <div className="mt-2">
                        <div className="flex items-center gap-3">
                            <span
                                className="text-gray-400 line-through text-lg">{product.price.toLocaleString()}đ</span>
                            <span className="text-red-600 text-3xl font-bold">
                                {product.price.toLocaleString()}đ
                            </span>
                            <span className="bg-red-100 text-red-600 text-sm font-semibold px-2 py-1 rounded">
                                -{Math.round(
                                    ((product.price - product.price) / product.price) * 100
                                )}%
                            </span>
                        </div>
                    </div>

                    {/* Thông số */}
                    <ul className="mt-4 space-y-2 text-sm text-gray-700">
                        <li><span className="font-medium">CPU:</span> {product.cpu}</li>
                        <li><span className="font-medium">RAM:</span> {product.ram}</li>
                        <li><span className="font-medium">Ổ cứng:</span> {product.storage}</li>
                        <li><span className="font-medium">GPU:</span> {product.gpu}</li>
                        <li><span className="font-medium">Màn hình:</span> {product.screen}</li>
                    </ul>

                    {/* CTA chính */}
                    <div className="mt-6 flex justify-center">
                        <button
                            className="w-full max-w-md bg-red-600 text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-red-700 transition">
                            Mua ngay
                            <div className="text-sm font-normal">
                                Giao hàng tận nơi hoặc nhận tại cửa hàng
                            </div>
                        </button>
                    </div>

                    {/* CTA phụ */}
                    <div className="mt-4 flex gap-3">
                        <button
                            className="flex-1 border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition">
                            Chat tư vấn
                        </button>
                        <button
                            className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
                            Thêm vào giỏ
                        </button>
                    </div>

                    {/* ƯU ĐÃI THÊM */}
                    <div className="mt-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div
                            className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-semibold">
                            🎁 ƯU ĐÃI THÊM
                        </div>

                        <ul className="mt-3 space-y-2 text-sm text-gray-700">
                            <li className="flex items-start gap-2">
                                <span className="text-green-500">✔</span>
                                <span>Giảm <strong>100.000đ</strong> khi mua Microsoft Office kèm Laptop</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500">✔</span>
                                <span>Ưu đãi khi mua hàng trên <strong>Zalo Mini App</strong></span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500">✔</span>
                                <span>Miễn phí vệ sinh trọn đời Laptop ASUS</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500">✔</span>
                                <span>Ưu đãi cho khách hàng doanh nghiệp khi mua số lượng</span>
                            </li>
                        </ul>
                    </div>


                </div>


                {/* Right */}
                <div className="col-span-3">
                    <div className="info-top  rounded-md p-4 bg-white">
                        <h3 className="font-semibold mb-3 pb-2 border-b-2">Thông tin bảo hành</h3>
                        <p className="text-sm pb-1">
                            <i className="text-green-500 me-2 fa-solid fa-square-check"></i>
                            Bảo hành 24 tháng Onsite chính hãng (Máy, Sạc: 24 tháng, Pin: 12 tháng)
                        </p>
                        <p className="text-sm pb-1">
                            <i className="text-green-500 me-2 fa-solid fa-square-check"></i>
                            Đổi mới sản phẩm trong 15 ngày
                        </p>
                        <p className="text-sm pb-1">
                            <i className="text-green-500 me-2 fa-solid fa-square-check"></i>
                            Tình trạng: Mới 100%
                        </p>
                        <p className="text-sm pb-1">
                            <i className="text-green-500 me-2 fa-solid fa-square-check"></i>
                            Nguyên hộp, đầy đủ phụ kiện từ nhà sản xuất: Dây nguồn; Sách hướng dẫn; Sạc Laptop
                        </p>
                    </div>

                    <div className="info-bottom mt-5 rounded-md p-4 bg-white">
                        <h3 className="font-semibold mb-3 pb-2 border-b-2">Chính sách bán hàng</h3>
                        <div className="text-sm pb-2 flex items-center">
                            <img className="w-1/6 me-1.5"
                                src={`${process.env.PUBLIC_URL}/baohanh/policy1.png`}
                                alt="product"
                            />
                            <p>Miễn phí giao hàng cho hóa đơn từ 3 triệu (Bán kính ≤ 10km)</p>
                        </div>
                        <div className="text-sm pb-2 flex items-center">
                            <img className="w-1/6 me-1.5"
                                src={`${process.env.PUBLIC_URL}/baohanh/policy2.png`}
                                alt="product"
                            />
                            <p>Giao hàng nhanh tại Hồ Chí Minh</p>
                        </div>
                        <div className="text-sm pb-2 flex items-center">
                            <img className="w-1/6 me-1.5"
                                src={`${process.env.PUBLIC_URL}/baohanh/policy3.png`}
                                alt="product"
                            />
                            <p>Trả góp 0% bằng thẻ tín dụng Visa, Master, JCB</p>
                        </div>
                        <div className="text-sm pb-2 flex items-center">
                            <img className="w-1/6 me-1.5"
                                src={`${process.env.PUBLIC_URL}/baohanh/policy4.png`}
                                alt="product"
                            />
                            <p>Miễn phí thanh toán quẹt thẻ</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== CHI TIẾT SẢN PHẨM ===== */}
            <div className="grid grid-cols-12 gap-4 mt-10">
                {/* ================= LEFT ================= */}
                <div className="col-span-12 lg:col-span-7">
                    <div className="bg-white rounded-lg p-6">
                        {/* Title */}
                        <h2 className="text-lg font-bold mb-4 uppercase">
                            Đặc điểm nổi bật
                        </h2>

                        <h1 className="text-2xl font-bold mt-2 leading-snug">
                            ASUS ExpertBook P1 P1503CVA-I308256-63W
                            Laptop văn phòng quốc dân 2025
                        </h1>

                        {/* Description */}
                        <p className="mt-4 text-gray-700 text-sm leading-relaxed text-justify">
                            Máy tính xách tay <strong>ASUS ExpertBook P1</strong> gọn nhẹ và
                            thanh lịch nặng 1,4kg với thiết kế mới đột phá cùng khả năng
                            hoạt động hiệu quả vượt trội, giúp nâng cao hiệu suất công việc.
                            Máy được trang bị công cụ <strong>AI ExpertMeet2</strong> hoàn
                            toàn mới của ASUS. Máy được thiết kế để đáp ứng mọi nhu cầu của
                            doanh nghiệp nhờ độ bền tiêu chuẩn quân đội Mỹ và bảo mật cao
                            cấp, mang lại sự ổn định và tin cậy trong quá trình sử dụng.
                        </p>

                        {/* Highlight list */}
                        <ul className="mt-4 space-y-2 text-sm text-gray-700 list-disc list-inside">
                            <li>Intel® Core™ i3-1315U 1.2GHz up to 4.5GHz, 10MB Cache</li>
                            <li>Đồ họa Intel® UHD Graphics</li>
                            <li>RAM 8GB DDR5 SO-DIMM (Nâng cấp tối đa 64GB)</li>
                            <li>SSD 256GB M.2 2280 NVMe™ PCIe® 4.0</li>
                            <li>Màn hình 15.6 inch FHD (1920×1080), chống chói</li>
                            <li>Pin 50WHrs, 3-cell Li-ion</li>
                            <li>Bảo mật doanh nghiệp: Vân tay, TPM 2.0, khóa Kensington</li>
                            <li>Tiêu chuẩn quân đội Mỹ MIL-STD 810H</li>
                            <li>Bảo hành 2 năm, hỗ trợ tận nơi</li>
                        </ul>

                        {/* Video */}
                        <div className="mt-6 aspect-video rounded-lg overflow-hidden border">
                            <iframe
                                className="w-full h-full"
                                src="https://www.youtube.com/embed/VIDEO_ID"
                                title="ASUS ExpertBook P1"
                                frameBorder="0"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>

                {/* ================= RIGHT ================= */}
                <div className="col-span-12 lg:col-span-5">
                    <div className="bg-white rounded-lg p-6 sticky top-24">
                        <h2 className="text-lg font-bold mb-4">
                            Thông số kỹ thuật
                        </h2>

                        <table className="w-full text-sm border border-gray-200 rounded overflow-hidden">
                            <tbody>
                                <tr className="border-t">
                                    <td className="w-1/3 bg-gray-50 px-3 py-2 font-medium">
                                        CPU
                                    </td>
                                    <td className="px-3 py-2">
                                        Intel® Core™ i3-1315U 1.2GHz up to 4.5GHz 10MB
                                    </td>
                                </tr>

                                <tr className="border-t">
                                    <td className="bg-gray-50 px-3 py-2 font-medium">
                                        RAM
                                    </td>
                                    <td className="px-3 py-2">
                                        8GB DDR5 (2x SO-DIMM, up to 64GB)
                                    </td>
                                </tr>

                                <tr className="border-t">
                                    <td className="bg-gray-50 px-3 py-2 font-medium">
                                        Ổ cứng
                                    </td>
                                    <td className="px-3 py-2">
                                        256GB M.2 2280 NVMe™ PCIe® 4.0 SSD
                                    </td>
                                </tr>

                                <tr className="border-t">
                                    <td className="bg-gray-50 px-3 py-2 font-medium">
                                        Card đồ họa
                                    </td>
                                    <td className="px-3 py-2">
                                        Intel UHD Graphics
                                    </td>
                                </tr>

                                <tr className="border-t">
                                    <td className="bg-gray-50 px-3 py-2 font-medium">
                                        Màn hình
                                    </td>
                                    <td className="px-3 py-2">
                                        15.6" FHD (1920×1080), 16:9, chống chói
                                    </td>
                                </tr>

                                <tr className="border-t">
                                    <td className="bg-gray-50 px-3 py-2 font-medium">
                                        Cổng giao tiếp
                                    </td>
                                    <td className="px-3 py-2">
                                        2x USB 3.2 Gen 1 Type-A <br />
                                        2x USB 3.2 Gen 2 Type-C <br />
                                        1x HDMI 1.4 <br />
                                        1x RJ45 Gigabit Ethernet
                                    </td>
                                </tr>

                                <tr className="border-t">
                                    <td className="bg-gray-50 px-3 py-2 font-medium">
                                        Audio
                                    </td>
                                    <td className="px-3 py-2">
                                        Audio by Dirac, Built-in speaker & microphone
                                    </td>
                                </tr>

                                <tr className="border-t">
                                    <td className="bg-gray-50 px-3 py-2 font-medium">
                                        Bàn phím
                                    </td>
                                    <td className="px-3 py-2">
                                        Bàn phím Chiclet, hành trình 1.35mm
                                    </td>
                                </tr>

                                <tr className="border-t">
                                    <td className="bg-gray-50 px-3 py-2 font-medium">
                                        Tiêu chuẩn
                                    </td>
                                    <td className="px-3 py-2">
                                        MIL-STD 810H
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <BackToTop />
        </div>

    );
}
