const Radio = ({ label }) => {
    return (
        <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="gender" />
            <span>{label}</span>
        </label>
    );
};

export default Radio;
