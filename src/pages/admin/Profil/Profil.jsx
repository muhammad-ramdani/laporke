import { useState, useEffect } from "react";
import Images from "../../../images";
import { changePassword, getProfile } from "../../../services/services";

function Profil() {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileData = await getProfile();
                setEmail(profileData.email || "");
                setUsername(profileData.username || "");
            } catch (error) {
                console.error("Gagal memuat profil:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleSavePassword = async () => {
        try {
            if (!currentPassword || !newPassword) {
                alert("Kata sandi sekarang dan kata sandi baru harus diisi.");
                return;
            }

            const response = await changePassword(currentPassword, newPassword);
            alert(response.message || "Kata sandi berhasil diubah");
            setCurrentPassword("");
            setNewPassword("");
        } catch (error) {
            alert(error.message || "Gagal mengubah kata sandi");
        }
    };

    if (loading) {
        return <p>Memuat data...</p>;
    }

    return (
        <>
            <div className="card rounded-4 shadow mt-4 mb-5 border-0">
                <div className="card-body" style={{ padding: "36px 52px" }}>
                    <ul className="nav nav-tabs">
                        <li>
                            <button className="nav-link text-black active" data-bs-toggle="tab" data-bs-target="#edit-profil">
                                Profil
                            </button>
                        </li>
                        <li>
                            <button className="nav-link text-black" data-bs-toggle="tab" data-bs-target="#keamanan">
                                Keamanan
                            </button>
                        </li>
                    </ul>
                    <div className="tab-content mt-5">
                        <div className="tab-pane show active" id="edit-profil">
                            <div className="mb-4">
                                <label htmlFor="inputEmail" className="text-secondary" style={{ marginBottom: "8px" }}>
                                    Email
                                </label>
                                <p className="mb-0 fw-semibold">{email}</p>
                            </div>
                            <div>
                                <label htmlFor="inputUsername" className="text-secondary" style={{ marginBottom: "8px" }}>
                                    Username
                                </label>
                                <p className="mb-0 fw-semibold">{username}</p>
                            </div>
                        </div>
                        <div className="tab-pane" id="keamanan">
                            <div>
                                {/* Kata Sandi Sekarang */}
                                <div>
                                    <label style={{ marginBottom: "8px" }}>Kata Sandi Sekarang</label>
                                    <div className="input-group">
                                        <input
                                            type={showCurrentPassword ? "text" : "password"}
                                            className="form-control rounded-start-4 border-end-0"
                                            style={{ padding: "9.5px 12px", marginBottom: "16px" }}
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                        />
                                        <button onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="btn rounded-end-4 border border-start-0" type="button" style={{ maxHeight: "45px" }}>
                                            <img src={showCurrentPassword ? Images.EyeSlash : Images.Eye} alt="Toggle visibility" />
                                        </button>
                                    </div>
                                </div>

                                {/* Kata Sandi Baru */}
                                <div>
                                    <label style={{ marginBottom: "8px" }}>Kata Sandi Baru</label>
                                    <div className="input-group">
                                        <input
                                            type={showNewPassword ? "text" : "password"}
                                            className="form-control rounded-start-4 border-end-0"
                                            style={{ padding: "9.5px 12px", marginBottom: "16px" }}
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                        <button onClick={() => setShowNewPassword(!showNewPassword)} className="btn rounded-end-4 border border-start-0" type="button" style={{ maxHeight: "45px" }}>
                                            <img src={showNewPassword ? Images.EyeSlash : Images.Eye} alt="Toggle visibility" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex mt-5 justify-content-end">
                                <button
                                    type="button"
                                    className="btn text-white fw-semibold rounded-4"
                                    style={{ backgroundColor: "#C40C0C", padding: "9.5px 50px" }}
                                    onClick={handleSavePassword} // Panggil fungsi untuk menyimpan kata sandi
                                >
                                    Simpan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profil;
