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
        loginAdmin(username, password, (data) => {
            setIsLoading(false);

            if (data && data.access_token) {
                toast.success("Login successful!");

                localStorage.setItem("token", data.access_token);

                navigate("/admin");
            } else {
                toast.error("Login failed, please try again.");
            }
        });
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
                            />
                            <img
                                src={Images.LogoTextLaporke}
                                style={{ maxWidth: "289px", width: "100%" }}
                                className="mb-3"
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
                                        {showPassword ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="#000000"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="feather feather-eye-off"
                                            >
                                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                                <line x1="1" y1="1" x2="23" y2="23"></line>
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="#000000"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="feather feather-eye"
                                            >
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                <circle cx="12" cy="12" r="3"></circle>
                                            </svg>
                                        )}
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
                    />
                </div>
            </div>
        </div>
    );
}

export default Login;
