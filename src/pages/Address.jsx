import AddressList from "../components/Address/AddressList";
import AddressForm from "../components/Address/AddressForm";

const Address = () => {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-6">
                Địa Chỉ Của Tôi
            </h2>

            <div className="grid grid-cols-2 gap-6">
                <AddressList />
                <AddressForm />
            </div>
        </div>
    );
};

export default Address;
