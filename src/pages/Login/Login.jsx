import Images from "../../images";
import { useState } from "react";
import { loginAdmin } from "../../services/services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 
    setIsLoading(true);

    const result = await loginAdmin(username, password);
    setIsLoading(false);

    if (!result || typeof result !== "object") {
      toast.error("Terjadi kesalahan, silakan coba lagi.");
      return;
    }

    if (result.success) {
      toast.success("Login berhasil!");
      localStorage.setItem("token", result.data.access_token); 
      navigate("/admin"); 
    } else {
      toast.error(result.message); 
    }
  };

  return (
    <div className="container-fluid">
      <div className="row mx-0 vh-100 align-items-center py-4">
        <div className="col-12 col-lg px-0 text-center mb-5 mb-lg-0">
          <div style={{ marginBottom: "80px" }}>
            <div className="col-6 mx-auto col-sm-12">
              <img
                src={Images.LogoLaporke}
                style={{ maxWidth: "70px", width: "100%" }}
                className="mb-3 me-sm-3"
                alt="logo"
              />
              <img
                src={Images.LogoTextLaporke}
                style={{ maxWidth: "289px", width: "100%" }}
                className="mb-3"
                alt="logo-text"
              />
            </div>
            <p className="mb-0 fw-semibold">Memberdayakan Komunitas, Menyelesaikan Bersama.</p>
          </div>
          <div>
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: "44px" }}>
                <input
                  type="text"
                  className="form-control mx-auto rounded-4"
                  placeholder="Username"
                  style={{ padding: "13px 20px", maxWidth: "380px" }}
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div style={{ marginBottom: "44px" }}>
                <div className="input-group mx-auto" style={{ maxWidth: "380px" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control rounded-start-4 border-end-0"
                    placeholder="Kata Sandi"
                    style={{ padding: "13px 20px" }}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="btn rounded-end-4 border border-start-0"
                    type="button"
                  >
                    <img
                      src={showPassword ? Images.EyeSlash : Images.Eye}
                      alt="toggle-password-visibility"
                    />
                  </button>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="btn fw-medium text-white rounded-4 w-100"
                  style={{
                    backgroundColor: "#C40C0C",
                    padding: "15px",
                    maxWidth: "380px",
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Masuk"}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-12 col-lg px-0 text-center">
          <img
            src={Images.ImageLogin}
            style={{ maxWidth: "400px", width: "100%" }}
            alt="login-illustration"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
