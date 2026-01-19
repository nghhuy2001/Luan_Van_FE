import { useEffect, useState } from "react";

export default function FullScreenLoader({
    label = "Đang tải dữ liệu...",
    done=false, // đảm bảo không nháy quá nhanh
}) {
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setPercent((p) => {
                if (done) return 100;
                if (p >= 95) return p;
                const inc = p < 60 ? 4 : p < 85 ? 2 : 1;
                return Math.min(95, p + inc);
            });
        }, 80);

        return () => clearInterval(timer);
    }, [done]);

    return (
        <div className="fixed inset-0 z-50 bg-white">
            <div className="h-full w-full flex flex-col items-center justify-center px-6">
                <div className="relative w-20 h-20">
                    
                    <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
                    <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />

                    
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-semibold text-gray-700">
                            {percent}%
                        </span>
                    </div>
                </div>

                <p className="mt-4 text-gray-600">{label}</p>
                <p className="mt-1 text-xs text-gray-400">Vui lòng chờ một chút…</p>
            </div>
        </div>
    );
}
