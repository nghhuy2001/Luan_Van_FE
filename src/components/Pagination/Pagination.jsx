const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const getPages = () => {
        const pages = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
            return pages;
        }

        const siblings = 1;
        const left = Math.max(2, currentPage - siblings);
        const right = Math.min(totalPages - 1, currentPage + siblings);

        pages.push(1);

        // Google-ish: nếu chỉ thiếu đúng trang 2 thì show luôn 2 thay vì "..."
        if (left === 3) pages.push(2);
        else if (left > 3) pages.push("dots-left");

        for (let i = left; i <= right; i++) pages.push(i);

        // Google-ish: nếu chỉ thiếu đúng trang totalPages-1 thì show luôn thay vì "..."
        if (right === totalPages - 2) pages.push(totalPages - 1);
        else if (right < totalPages - 2) pages.push("dots-right");

        pages.push(totalPages);
        return pages;
    };

    const pages = getPages();

    const base =
        "h-10 min-w-10 px-3 inline-flex items-center justify-center rounded-full text-sm font-medium transition-all duration-150";
    const pageIdle =
        "bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50 hover:ring-gray-300 active:scale-[0.98]";
    const pageActive =
        "bg-blue-600 text-white ring-1 ring-blue-600 shadow-sm hover:bg-blue-700 active:scale-[0.98]";
    const navIdle =
        "bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50 hover:ring-gray-300 active:scale-[0.98]";
    const navDisabled = "opacity-40 cursor-not-allowed hover:bg-white active:scale-100";
    const dots =
        "h-10 min-w-10 px-3 inline-flex items-center justify-center rounded-full text-gray-400 bg-white ring-1 ring-gray-200";

    return (
        <div className="mt-8 flex justify-center">
            <nav className="flex items-center gap-2 rounded-2xl bg-white/80 backdrop-blur px-3 py-2 ring-1 ring-gray-200 shadow-sm">
                {/* Prev */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`${base} ${navIdle} ${currentPage === 1 ? navDisabled : ""}`}
                    aria-label="Previous page"
                >
                    <span className="mr-1 text-base leading-none">‹</span>
                    <span className="hidden sm:inline">Prev</span>
                </button>

                {/* Pages */}
                <div className="flex items-center gap-2">
                    {pages.map((p) => {
                        if (typeof p === "string") {
                            return (
                                <span key={p} className={dots} aria-hidden="true">
                                    …
                                </span>
                            );
                        }

                        const page = p;
                        return (
                            <button
                                key={page}
                                onClick={() => onPageChange(page)}
                                className={`${base} ${currentPage === page ? pageActive : pageIdle
                                    }`}
                                aria-current={currentPage === page ? "page" : undefined}
                            >
                                {page}
                            </button>
                        );
                    })}
                </div>

                {/* Next */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`${base} ${navIdle} ${currentPage === totalPages ? navDisabled : ""
                        }`}
                    aria-label="Next page"
                >
                    <span className="hidden sm:inline">Next</span>
                    <span className="ml-1 text-base leading-none">›</span>
                </button>
            </nav>
        </div>
    );
};

export default Pagination;
