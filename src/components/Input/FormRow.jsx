const FormRow = ({ label, children }) => {
    return (
        <div className="flex mb-6">
            <div className="w-36 text-right pr-4 text-gray-500">
                {label}
            </div>
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
};

export default FormRow;
