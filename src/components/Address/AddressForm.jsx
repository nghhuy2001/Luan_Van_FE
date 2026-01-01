import { useEffect, useState } from "react";

const PROVINCE_API =
  "https://production.cas.so/address-kit/2025-07-01/provinces";

const AddressForm = () => {
  const [provinces, setProvinces] = useState([]);
  const [communes, setCommunes] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedCommune, setSelectedCommune] = useState(null);
  const [detailAddress, setDetailAddress] = useState("");
  const [isDefault, setIsDefault] = useState(false);

  /* Load danh sách tỉnh */
  useEffect(() => {
    fetch(PROVINCE_API)
      .then((res) => res.json())
      .then((res) => {
        setProvinces(res.provinces ); // FIX provinces.map is not a function
      })
      .catch(console.error);
  }, []);

  /* Khi chọn tỉnh → load phường/xã */
  useEffect(() => {
    if (!selectedProvince) {
      setCommunes([]);
      return;
    }

    fetch(
      `https://production.cas.so/address-kit/2025-07-01/provinces/${selectedProvince.code}/communes`
    )
      .then((res) => res.json())
      .then((res) => {
        setCommunes(res.communes || []);
      })
      .catch(console.error);
  }, [selectedProvince]);

  /* Submit */
  const handleSubmit = () => {
    const fullAddress = [
      detailAddress,
      selectedCommune?.name,
      selectedProvince?.name
    ]
      .filter(Boolean)
      .join(", ");

    // const payload = {
    //   provinceCode: selectedProvince?.code,
    //   provinceName: selectedProvince?.name,
    //   communeCode: selectedCommune?.code,
    //   communeName: selectedCommune?.name,
    //   detailAddress,
    //   fullAddress,
    //   isDefault
    // };

    console.log("SUBMIT ADDRESS:", fullAddress);
    // TODO: call API BE
  };

  return (
    <div className="bg-white border rounded p-5 shadow-sm max-w-md">
      <h3 className="font-semibold mb-4">Thêm địa chỉ mới</h3>

      <div className="space-y-4">
        {/* Tỉnh / Phường */}
        <div className="grid grid-cols-2 gap-3">
          {/* Tỉnh */}
          <select
            className="border p-2 rounded"
            onChange={(e) => {
              const province = provinces.find(
                (p) => p.code === e.target.value
              );
              setSelectedProvince(province || null);
              setSelectedCommune(null);
            }}
          >
            <option value="">Tỉnh/Thành</option>
            {provinces.map((p) => (
              <option key={p.code} value={p.code}>
                {p.name}
              </option>
            ))}
          </select>

          {/* Phường */}
          <select
            className="border p-2 rounded"
            disabled={!selectedProvince}
            onChange={(e) => {
              const commune = communes.find(
                (c) => c.code === e.target.value
              );
              setSelectedCommune(commune || null);
            }}
          >
            <option value="">Phường/Xã</option>
            {communes.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Địa chỉ chi tiết */}
        <textarea
          className="border p-2 rounded w-full h-20"
          placeholder="Địa chỉ cụ thể"
          value={detailAddress}
          onChange={(e) => setDetailAddress(e.target.value)}
        />

        {/* Default */}
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={isDefault}
            onChange={(e) => setIsDefault(e.target.checked)}
          />
          Đặt làm địa chỉ mặc định
        </label>

        {/* Preview */}
        {(selectedProvince || selectedCommune || detailAddress) && (
          <p className="text-sm text-gray-600">
            📍{" "}
            {[detailAddress, selectedCommune?.name, selectedProvince?.name]
              .filter(Boolean)
              .join(", ")}
          </p>
        )}

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Lưu
        </button>
      </div>
    </div>
  );
};

export default AddressForm;
