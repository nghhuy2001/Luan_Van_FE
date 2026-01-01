import AddressItem from "./AddressItem";

const AddressList = () => {
    return (
        <div className="space-y-4">
            <AddressItem isDefault />
            <AddressItem />
        </div>
    );
};

export default AddressList