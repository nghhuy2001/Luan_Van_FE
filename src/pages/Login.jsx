import { Link, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Github,
  Chrome,
} from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  const canSubmit = useMemo(() => {
    return email.trim() && password.trim() && !loading;
  }, [email, password, loading]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    try {
      // demo delay cho cảm giác "xịn" hơn (sau này gọi API thì bỏ)
      await new Promise((r) => setTimeout(r, 450));

      if (email !== "root@gmail.com" || password !== "root") {
        toast.error("Email hoặc mật khẩu không đúng!");
        return;
      }

      toast.success("Đăng nhập thành công!");

      // gợi ý: lưu token/user tùy bạn (nếu muốn nhớ đăng nhập)
      // if (remember) localStorage.setItem("auth", "true");

      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500 via-indigo-600 to-fuchsia-600" />
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
      <div className="absolute inset-0 bg-black/10" />

      {/* Card */}
      <div className="relative w-full max-w-md">
        <div className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.45)] border border-white/40">
          <div className="px-7 pt-7 pb-6">
            {/* Header */}
            <div className="text-center">
              <div className="mx-auto mb-3 h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-sky-500 text-white flex items-center justify-center shadow-lg">
                <Lock className="h-6 w-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Chào mừng trở lại
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Đăng nhập để tiếp tục mua sắm
              </p>
            </div>

            {/* Form */}
            <form className="mt-6 space-y-4" onSubmit={handleLogin}>
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
                      focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400
                      transition"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Mật khẩu
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type={showPw ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-2.5 rounded-xl border border-slate-200 bg-white/70
                      focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400
                      transition"
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
              </div>

              {/* Row: remember + forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-slate-700 select-none">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-200"
                  />
                  Nhớ tôi
                </label>
                <button
                  type="button"
                  onClick={() => toast("Tính năng quên mật khẩu làm sau nhé 😄")}
                  className="text-sm font-medium text-indigo-700 hover:underline"
                >
                  Quên mật khẩu?
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!canSubmit}
                className={`w-full py-2.5 rounded-xl font-semibold text-white shadow-lg transition
                  flex items-center justify-center gap-2
                  ${
                    canSubmit
                      ? "bg-gradient-to-r from-indigo-600 to-sky-500 hover:opacity-95"
                      : "bg-slate-300 cursor-not-allowed"
                  }`}
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 rounded-full border-2 border-white/70 border-t-transparent animate-spin" />
                    Đang đăng nhập...
                  </>
                ) : (
                  <>
                    Đăng nhập <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 pt-2">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-xs text-slate-500">hoặc</span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              {/* Social (demo) */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => toast("Demo thôi nha 😄")}
                  className="py-2.5 rounded-xl border border-slate-200 bg-white/70
                    hover:bg-white transition flex items-center justify-center gap-2 text-slate-700 font-medium"
                >
                  <Chrome className="h-5 w-5" />
                  Google
                </button>
                <button
                  type="button"
                  onClick={() => toast("Demo thôi nha 😄")}
                  className="py-2.5 rounded-xl border border-slate-200 bg-white/70
                    hover:bg-white transition flex items-center justify-center gap-2 text-slate-700 font-medium"
                >
                  <Github className="h-5 w-5" />
                  Github
                </button>
              </div>
            </form>

            {/* Footer */}
            <div className="text-center mt-5 text-sm">
              <span className="text-slate-600">Chưa có tài khoản?</span>{" "}
              <Link
                to="/register"
                className="text-indigo-700 font-semibold hover:underline"
              >
                Đăng ký
              </Link>
            </div>
          </div>

          {/* bottom highlight */}
          <div className="h-2 w-full rounded-b-3xl bg-gradient-to-r from-indigo-600 to-sky-500" />
        </div>

        {/* small note */}
        <p className="text-center text-xs text-white/80 mt-4">
          Tip: Email <b>root@gmail.com</b> — Password <b>root</b>
        </p>
      </div>
    </div>
  );
};

export default Login;
