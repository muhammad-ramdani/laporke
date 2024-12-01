import Images from "../../../images"
import { useState } from "react"

function Profil() {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    return (
        <>
            <div className="card rounded-4 shadow mt-4 mb-5 border-0">
                <div className="card-body" style={{ padding: "36px 52px" }}>
                    <ul className="nav nav-tabs">
                        <li>
                            <button className="nav-link text-black active" data-bs-toggle="tab" data-bs-target="#edit-profil">Edit Profil</button>
                        </li>
                        <li>
                            <button className="nav-link text-black" data-bs-toggle="tab" data-bs-target="#keamanan">Keamanan</button>
                        </li>
                    </ul>
                    <div className="tab-content mt-5">
                        <div className="tab-pane show active" id="edit-profil">
                            <div>
                                <label htmlFor="imputJudulLaporan" style={{ marginBottom: "8px" }}>Email</label>
                                <input type="Email" className="form-control" id="imputJudulLaporan" placeholder="Email" style={{ padding: "9.5px 12px", marginBottom: "16px" }} />
                            </div>
                            <div>
                                <label htmlFor="imputJudulLaporan" style={{ marginBottom: "8px" }}>Username</label>
                                <input type="text" className="form-control" id="imputJudulLaporan" placeholder="Username" style={{ padding: "9.5px 12px", marginBottom: "16px" }} />
                            </div>
                            <div className="d-flex mt-5 justify-content-end">
                                <button type="button" className="btn text-white fw-semibold rounded-4" style={{ backgroundColor: "#C40C0C", padding: "9.5px 50px" }}>Simpan</button>
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
                                            required
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                        />
                                        <button
                                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                            className="btn rounded-end-4 border border-start-0"
                                            type="button"
                                            style={{ maxHeight: "45px" }}
                                        >
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
                                            required
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                        <button
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            className="btn rounded-end-4 border border-start-0"
                                            type="button"
                                            style={{ maxHeight: "45px" }}
                                        >
                                            <img src={showNewPassword ? Images.EyeSlash : Images.Eye} alt="Toggle visibility" />
                                        </button>
                                    </div>
                                </div>

                                {/* Konfirmasi Kata Sandi Baru */}
                                <div>
                                    <label style={{ marginBottom: "8px" }}>Konfirmasi Kata Sandi Baru</label>
                                    <div className="input-group">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            className="form-control rounded-start-4 border-end-0"
                                            style={{ padding: "9.5px 12px", marginBottom: "16px" }}
                                            required
                                            value={confirmNewPassword}
                                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                                        />
                                        <button
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="btn rounded-end-4 border border-start-0"
                                            type="button"
                                            style={{ maxHeight: "45px" }}
                                        >
                                            <img src={showConfirmPassword ? Images.EyeSlash : Images.Eye} alt="Toggle visibility" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex mt-5 justify-content-end">
                                <button type="button" className="btn text-white fw-semibold rounded-4" style={{ backgroundColor: "#C40C0C", padding: "9.5px 50px" }}>Simpan</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profil