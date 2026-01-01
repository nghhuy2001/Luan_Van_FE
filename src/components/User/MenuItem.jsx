const MenuItem = ({ icon, text, danger }) => {
    return (
        <li
            className={`
                flex items-center gap-3 px-4 py-2
                cursor-pointer
                transition
                ${danger
                    ? "text-red-500 hover:bg-red-50"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-900"}
            `}
        >
            <i className={`fa-solid ${icon}`}></i>
            <span>{text}</span>
        </li>
    );
};

export default MenuItem;