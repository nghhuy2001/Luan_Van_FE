import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImportViewModal from "./components/ImportViewModal";

export default function ImportViewModalPage() {
  const navigate = useNavigate();
  const { importCode } = useParams();

  // Fake data – sau này thay bằng API fetch theo importCode
  const importReceipt = useMemo(() => {
    return {
      code: importCode || "PN001",
      createdAt: "10/01/2026 09:40",
      supplier: {
        name: "Công ty ABC",
        phone: "0909 000 111",
        address: "123 Lê Lợi, Q1, TP.HCM",
      },
      warehouse: "Kho chính",
      note: "Nhập đợt 1 cho chương trình sale.",
      items: [
        {
          sku: "LAP-001",
          name: "Laptop Dell Inspiron 15",
          unit: "Chiếc",
          quantity: 10,
          importPrice: 8500000,
        },
        {
          sku: "RAM-016",
          name: "RAM DDR4 16GB",
          unit: "Thanh",
          quantity: 30,
          importPrice: 750000,
        },
      ],
      createdBy: "Admin",
      status: "Hoàn thành",
    };
  }, [importCode]);

  const onClose = () => navigate("/admin/import/list");

  return (
    <ImportViewModal
      open
      data={importReceipt}
      onClose={onClose}
    />
  );
}
