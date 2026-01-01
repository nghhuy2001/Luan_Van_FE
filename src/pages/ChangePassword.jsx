import { useState } from "react";
import FormRow from "../components/Input/FormRow";
import { toast } from "react-hot-toast";

const ChangePassword = () => {
    const [form, setForm] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.oldPassword) {
            toast.error("Vui lòng nhập mật khẩu hiện tại");
            return;
        }

        if (form.newPassword !== form.confirmPassword) {
            toast.error("Mật khẩu mới không khớp");
            return;
        }

        toast.success("Đổi mật khẩu thành công");


        // TODO: call API đổi mật khẩu
        console.log(form);
    };

    return (
        <div className="max-w-xl">
            <h2 className="text-xl font-semibold mb-1">
                Đổi Mật Khẩu
            </h2>
            <p className="text-gray-500 mb-6">
                Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
            </p>

            <form onSubmit={handleSubmit}>
                <FormRow label="Mật khẩu hiện tại">
                    <input
                        type="password"
                        name="oldPassword"
                        value={form.oldPassword}
                        onChange={handleChange}
                        className="input w-full"
                    />
                </FormRow>

                <FormRow label="Mật khẩu mới">
                    <input
                        type="password"
                        name="newPassword"
                        value={form.newPassword}
                        onChange={handleChange}
                        className="input w-full"
                    />
                </FormRow>

                <FormRow label="Nhập lại mật khẩu">
                    <input
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        className="input w-full"
                    />
                </FormRow>

                <div className="ml-36 mt-6">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                    >
                        Xác nhận
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;
