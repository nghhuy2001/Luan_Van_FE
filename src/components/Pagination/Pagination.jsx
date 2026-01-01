const Pagination = ({currentPage, totalPages, onPageChange}) => {
    if (totalPages <= 1) return null;

    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className="flex items-center justify-center gap-2 mt-8">
            {/* Prev */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded border 
                    ${currentPage === 1
                        ? "text-gray-400 border-gray-300 cursor-not-allowed"
                        : "hover:bg-blue-600 hover:text-white border-gray-400"}
                `}
            >
                Prev
            </button>

            {/* Page numbers */}
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-1 rounded border 
                        ${currentPage === page
                            ? "bg-blue-600 text-white border-blue-600"
                            : "hover:bg-blue-100 border-gray-400"}
                    `}
                >
                    {page}
                </button>
            ))}

            {/* Next */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded border 
                    ${currentPage === totalPages
                        ? "text-gray-400 border-gray-300 cursor-not-allowed"
                        : "hover:bg-blue-600 hover:text-white border-gray-400"}
                `}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
