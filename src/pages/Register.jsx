import { Link, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  const [agree, setAgree] = useState(true);
  const [loading, setLoading] = useState(false);

  const pwScore = useMemo(() => {
    const p = password;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s; // 0..4
  }, [password]);

  const pwLabel = useMemo(() => {
    if (!password) return "Nhập mật khẩu";
    if (pwScore <= 1) return "Yếu";
    if (pwScore === 2) return "Trung bình";
    if (pwScore === 3) return "Tốt";
    return "Mạnh";
  }, [password, pwScore]);

  const pwHintClass = useMemo(() => {
    if (!password) return "text-slate-500";
    if (pwScore <= 1) return "text-rose-600";
    if (pwScore === 2) return "text-amber-600";
    if (pwScore === 3) return "text-emerald-600";
    return "text-emerald-700";
  }, [password, pwScore]);

  const isMatch = useMemo(() => {
    if (!confirmPassword) return true;
    return password === confirmPassword;
  }, [password, confirmPassword]);

  const canSubmit = useMemo(() => {
    return (
      fullName.trim() &&
      email.trim() &&
      password.trim() &&
      confirmPassword.trim() &&
      isMatch &&
      agree &&
      !loading
    );
  }, [fullName, email, password, confirmPassword, isMatch, agree, loading]);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!canSubmit) {
      if (!agree) toast.error("Bạn cần đồng ý điều khoản để tiếp tục!");
      else if (!isMatch) toast.error("Mật khẩu xác nhận không khớp!");
      else toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    setLoading(true);
    try {
      // demo delay (sau này gọi API)
      await new Promise((r) => setTimeout(r, 600));

      toast.success("Đăng ký thành công! Hãy đăng nhập nhé.");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-fuchsia-600 to-pink-600" />
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
      <div className="absolute inset-0 bg-black/10" />

      {/* Card */}
      <div className="relative w-full max-w-md">
        <div className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.45)] border border-white/40">
          <div className="px-7 pt-7 pb-6">
            {/* Header */}
            <div className="text-center">
              <div className="mx-auto mb-3 h-12 w-12 rounded-2xl bg-gradient-to-br from-fuchsia-600 to-indigo-600 text-white flex items-center justify-center shadow-lg">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Tạo tài khoản
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Tham gia cùng Laptop4You ngay hôm nay
              </p>
            </div>

            <form className="mt-6 space-y-4" onSubmit={handleRegister}>
              {/* Full name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Họ và tên
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white/70
                      focus:outline-none focus:ring-4 focus:ring-fuchsia-200 focus:border-fuchsia-400 transition"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white/70
                      focus:outline-none focus:ring-4 focus:ring-fuchsia-200 focus:border-fuchsia-400 transition"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-slate-700">
                    Mật khẩu
                  </label>
                  <span className={`text-xs font-semibold ${pwHintClass}`}>
                    {pwLabel}
                  </span>
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-2.5 rounded-xl border border-slate-200 bg-white/70
                      focus:outline-none focus:ring-4 focus:ring-fuchsia-200 focus:border-fuchsia-400 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg
                      hover:bg-slate-100 text-slate-500 transition"
                    aria-label={showPw ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    {showPw ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {/* simple strength bar */}
                <div className="mt-2 flex gap-2">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`h-1.5 flex-1 rounded-full transition ${
                        pwScore > i ? "bg-emerald-500" : "bg-slate-200"
                      }`}
                    />
                  ))}
                </div>

                <p className="mt-2 text-xs text-slate-500">
                  Gợi ý: 8+ ký tự, gồm chữ hoa, số và ký tự đặc biệt để mạnh hơn.
                </p>
              </div>

              {/* Confirm password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Xác nhận mật khẩu
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type={showConfirmPw ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-12 py-2.5 rounded-xl border bg-white/70 transition
                      focus:outline-none focus:ring-4 ${
                        isMatch
                          ? "border-slate-200 focus:ring-fuchsia-200 focus:border-fuchsia-400"
                          : "border-rose-300 focus:ring-rose-200 focus:border-rose-400"
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPw((v) => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg
                      hover:bg-slate-100 text-slate-500 transition"
                    aria-label={showConfirmPw ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    {showConfirmPw ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {!isMatch && (
                  <p className="mt-2 text-xs text-rose-600 font-medium">
                    Mật khẩu xác nhận không khớp.
                  </p>
                )}
              </div>

              {/* Agree */}
              <label className="flex items-start gap-2 text-sm text-slate-700 select-none">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-fuchsia-600 focus:ring-fuchsia-200"
                />
                <span>
                  Tôi đồng ý với{" "}
                  <button
                    type="button"
                    onClick={() => toast("Bạn làm trang điều khoản sau nha 😄")}
                    className="font-semibold text-fuchsia-700 hover:underline"
                  >
                    Điều khoản
                  </button>{" "}
                  và{" "}
                  <button
                    type="button"
                    onClick={() => toast("Bạn làm trang chính sách sau nha 😄")}
                    className="font-semibold text-fuchsia-700 hover:underline"
                  >
                    Chính sách bảo mật
                  </button>
                  .
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={!canSubmit}
                className={`w-full py-2.5 rounded-xl font-semibold text-white shadow-lg transition
                  flex items-center justify-center gap-2
                  ${
                    canSubmit
                      ? "bg-gradient-to-r from-fuchsia-600 to-indigo-600 hover:opacity-95"
                      : "bg-slate-300 cursor-not-allowed"
                  }`}
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 rounded-full border-2 border-white/70 border-t-transparent animate-spin" />
                    Đang tạo tài khoản...
                  </>
                ) : (
                  <>
                    Đăng ký <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="text-center mt-5 text-sm">
              <span className="text-slate-600">Đã có tài khoản?</span>{" "}
              <Link
                to="/login"
                className="text-fuchsia-700 font-semibold hover:underline"
              >
                Đăng nhập
              </Link>
            </div>
          </div>

          {/* bottom highlight */}
          <div className="h-2 w-full rounded-b-3xl bg-gradient-to-r from-fuchsia-600 to-indigo-600" />
        </div>
      </div>
    </div>
  );
};

export default Register;
