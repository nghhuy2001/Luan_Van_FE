import FormRow from "../components/Input/FormRow";
import Radio from "../components/Input/Radio";

const Account = () => {
    return (
        <div>
            {/* Title */}
            <h2 className="text-xl font-semibold mb-1">Hồ Sơ Của Tôi</h2>
            <p className="text-gray-500 mb-6">
                Quản lý thông tin hồ sơ để bảo mật tài khoản
            </p>

            <div className="flex gap-10">
                {/* Left form */}
                <div className="flex-1">
                    

                    <FormRow label="Tên">
                        <input
                            type="text"
                            className="input"
                            placeholder=""
                        />
                    </FormRow>

                    <FormRow label="Email">
                        <span className="text-gray-800 mr-3">
                            ho**********@gmail.com
                        </span>
                        <button className="text-blue-500 hover:underline">
                            Thay Đổi
                        </button>
                    </FormRow>

                    <FormRow label="Số điện thoại">
                        <span className="text-gray-800 mr-3">
                            ********62
                        </span>
                        <button className="text-blue-500 hover:underline">
                            Thay Đổi
                        </button>
                    </FormRow>

                    <FormRow label="Giới tính">
                        <div className="flex items-center gap-6">
                            <Radio label="Nam" />
                            <Radio label="Nữ" />
                            <Radio label="Khác" />
                        </div>
                    </FormRow>

                    <FormRow label="Ngày sinh">
                        <div className="flex gap-3">
                            <select className="select">
                                <option>Ngày</option>
                            </select>
                            <select className="select">
                                <option>Tháng</option>
                            </select>
                            <select className="select">
                                <option>Năm</option>
                            </select>
                        </div>
                    </FormRow>

                    <div className="ml-36 mt-6">
                        <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-green-600">
                            Lưu
                        </button>
                    </div>
                </div>

                {/* Right avatar */}
                <div className="w-64 flex flex-col items-center border-l pl-10">
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                        <i className="fa-solid fa-user text-4xl text-gray-400"></i>
                    </div>

                    <button className="border px-4 py-2 rounded text-sm hover:bg-gray-100">
                        Chọn Ảnh
                    </button>

                    <p className="text-xs text-gray-500 mt-3 text-center">
                        Dung lượng file tối đa 1 MB <br />
                        Định dạng: .JPEG, .PNG
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Account;
