// dung cho trang chua danh muc san pham theo thuong hieu
import { useNavigate } from "react-router-dom";
import { brands } from "../../data/brands";

const BrandSlider = ({ activeBrand }) => {
  const navigate = useNavigate();

  const handleClick = (brandName) => {
    navigate(`/brand/${brandName}`);
  };

  return (
    <div className="flex gap-6 overflow-x-auto py-4 mb-6">
      {brands.map((brand) => (
        <div
          key={brand.name}
          onClick={() => handleClick(brand.name)}
          className={`flex-shrink-0 cursor-pointer border rounded-lg p-3 
            hover:shadow-md transition shadow bg-white
            ${
              activeBrand === brand.name
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200"
            }
          `}
        >
          <img
            src={brand.logo}
            alt={brand.name}
            className="h-5 object-contain mx-auto"
          />
        </div>
      ))}
    </div>
  );
};

export default BrandSlider;
