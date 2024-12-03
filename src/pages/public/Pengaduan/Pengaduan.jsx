import { useState } from "react";
import axios from "axios";
import Images from "../../../images"
import { Link } from "react-router-dom";
import ilusBerhasil from "../../../assets/ImageBerhasilInput.png";

function Pengaduan() {
    const [isAnonim, setIsAnonim] = useState(false);
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleCheckboxChange = (e) => {
        setIsAnonim(e.target.checked);
        if (e.target.checked) {
            setName("Anonim");
        } else {
            setName("");
        }
    };

    const handleInputChange = (e) => {
        if (!isAnonim) {
            setName(e.target.value);
        }
    };

    const handleFileChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        // Reset form
        setName("");
        setTitle("");
        setLocation("");
        setDescription("");
        setPhoto(null);
        setIsAnonim(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Memastikan foto wajib diunggah
        if (!photo) {
            alert("Foto wajib diunggah!");
            return;
        }

        try {

            const laporanData = {
                name: name,
                title: title,
                description: description,
                location: location,
                photo: photo.name,
            };

            const laporanResponse = await axios.post("https://laporke-desa-banteran.web.id/laporan/create", laporanData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });


            const laporanId = laporanResponse.data.id;
            if (!laporanId) {
                alert("Gagal mendapatkan ID laporan");
                return;
            }
            console.log("Laporan berhasil dibuat dengan ID:", laporanId);


            const uploadFormData = new FormData();
            uploadFormData.append("file", photo);

            const uploadResponse = await axios.post(`https://laporke-desa-banteran.web.id/laporan/upload-photo?id=${laporanId}`, uploadFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("Foto berhasil diunggah:", uploadResponse.data);
            setShowModal(true);
        } catch (error) {
            console.error("Terjadi kesalahan:", error);
            alert("Gagal mengirim laporan atau foto. Silakan coba lagi.");
        }
    };

    return (
        <>
            {/* Hero Section */}
            <div className="card rounded-5 border-0" style={{ background: `url(${Images.BGHeroSection}) no-repeat center`, backgroundSize: "cover", height: "761px", position: "relative", margin: "0px 20px" }}>
                <div className="card-body" style={{ padding: "92px 16px 0 16px" }}>
                    <h1 className="mx-auto text-center text-white fw-semibold lh-base" style={{ maxWidth: "570px", marginBottom: "22px" }}>
                        Layanan Pengaduan Online Desa Banteran
                    </h1>

                    <h4 className="mx-auto text-center text-white fw-normal lh-base" style={{ maxWidth: "922px", marginBottom: "56px" }}>
                        Laporkan masalah atau sampaikan aspirasi Anda langsung ke desa dengan mudah dan transparan
                    </h4>

                    {/* Form Pengaduan atau pengisian laporan */}
                    <div className="card shadow border-0 rounded-5 mx-auto" style={{ maxWidth: "879px" }}>
                        <div className="card-body" style={{ padding: "40px" }}>
                            <h3 className="fw-semibold" style={{ marginBottom: "36px" }}>
                                Sampaikan Laporan Anda
                            </h3>

                            {/* <form action="" onSubmit={handleSubmit}> */}
                            <form action="" onSubmit={handleSubmit}>
                                <div style={{ marginBottom: "32px" }}>
                                    <label htmlFor="imputNamaLengkap" style={{ marginBottom: "8px" }}>
                                        Nama Lengkap
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="imputNamaLengkap"
                                        placeholder="Ketik nama lengkap Anda"
                                        value={name}
                                        onChange={handleInputChange}
                                        style={{ padding: "9.5px 12px", marginBottom: "10px", color: isAnonim ? "#9D9D9D" : "", backgroundColor: isAnonim ? "#FFFFFF" : "" }}
                                        disabled={isAnonim}
                                        required
                                    />
                                    <div className="form-check mb-0">
                                        <input className="form-check-input" type="checkbox" id="flexCheckAnonim" checked={isAnonim} onChange={handleCheckboxChange} />
                                        <label className="form-check-label" htmlFor="flexCheckAnonim">
                                            Anonim
                                        </label>
                                    </div>
                                </div>

                                <div style={{ marginBottom: "32px" }}>
                                    <div>
                                        <label htmlFor="imputJudulLaporan" style={{ marginBottom: "8px" }}>
                                            Judul Laporan
                                        </label>
                                        <input type="text" className="form-control" id="imputJudulLaporan" placeholder="Ketik judul laporan Anda" value={title} onChange={(e) => setTitle(e.target.value)} style={{ padding: "9.5px 12px", marginBottom: "16px" }} required />
                                    </div>

                                    <div>
                                        <label htmlFor="imputLokasiKejadian" style={{ marginBottom: "8px" }}>
                                            Lokasi kejadian
                                        </label>
                                        <input type="text" className="form-control" id="imputLokasiKejadian" placeholder="Ketik lokasi kejadian" value={location} onChange={(e) => setLocation(e.target.value)} style={{ padding: "9.5px 12px", marginBottom: "16px" }} required />
                                    </div>

                                    <div>
                                        <label htmlFor="imputIsiLaporan" style={{ marginBottom: "8px" }}>
                                            Isi Laporan
                                        </label>
                                        <textarea className="form-control" id="imputIsiLaporan" rows="4" placeholder="Ketik isi laporan Anda..." value={description} onChange={(e) => setDescription(e.target.value)} style={{ padding: "12px" }} required></textarea>
                                    </div>
                                </div>

                                <div style={{ marginBottom: "32px" }}>
                                    <div>
                                        <label htmlFor="formFile" style={{ marginBottom: "8px" }}>
                                            Tambahkan Gambar
                                        </label>
                                        <input className="form-control" type="file" id="formfile" accept="image/*" onChange={handleFileChange} style={{ padding: "9.5px 12px", marginBottom: "16px" }} required />
                                    </div>
                                </div>

                                <button type="submit" className="btn text-white col-12 fw-bold" style={{ backgroundColor: "#C40C0C", padding: "9.5px" }}>
                                    Lapor!
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* About Laporke */}
                    <div style={{ margin: "80px -16px 0 -16px" }}>
                        <div className="card rounded-1 border-0 rounded-5 mx-auto" style={{ backgroundColor: "#F8F8F8", maxWidth: "1400px" }}>
                            <div className="card-body mx-auto" style={{ padding: "32px 0px" }}>
                                <div className="row mx-0 align-items-center">
                                    <img className="col-12 col-lg-6 col-xl-12 mx-auto" src={Images.ImageAboutLaporke} style={{ padding: "0px 22px", maxWidth: "661px", marginTop: "32px", marginBottom: "32px" }} />
                                    <div className="col-12 col-lg-6 col-xl-12 mx-auto text-center text-lg-start" style={{ minWidth: "300px", maxWidth: "671px", padding: "0px 22px", marginTop: "32px", marginBottom: "32px" }}>
                                        <h1 className="fw-semibold mb-3">
                                            Apa itu &quot;<span style={{ color: "#C40C0C" }}>Laporke!</span>&quot;?
                                        </h1>
                                        <p className="fs-4 mb-0">Laporke adalah platform pengaduan dan aspirasi resmi Desa Banteran, Banyumas. Kami hadir untuk memudahkan warga dalam menyampaikan laporan langsung ke pemerintah desa.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cara Kerja Laporke */}
                    <div style={{ margin: "0px -36px", padding: "80px 0px" }}>
                        <div className="mx-auto" style={{ minHeight: "362px", maxWidth: "984px" }}>
                            <h1 className="text-center fw-semibold mb-3" style={{ padding: "6px 0px" }}>
                                Cara Kerja <span style={{ color: "#C40C0C" }}>Laporke!</span>
                            </h1>
                            <h4 className="fw-normal text-center mx-3" style={{ marginBottom: "26px" }}>
                                Empat Langkah Mudah untuk Menyampaikan Laporan atau Aspirasi Anda
                            </h4>

                            <div className="row mx-0">
                                <div className="col-12 col-sm-6 col-lg-3 px-0" style={{ marginTop: "26px" }}>
                                    <div className="card bg-white rounded-4 border-0 shadow p-3 mx-auto me-sm-3 me-lg-auto" style={{ height: "198px", maxWidth: "216px" }}>
                                        <img src={Images.IconTulisLaporan} className="mb-2" width={40} />
                                        <p className="mb-1 fw-semibold" style={{ fontSize: "20px" }}>
                                            Tulis Laporan
                                        </p>
                                        <p className="mb-0" style={{ fontSize: "14px" }}>
                                            Laporkan keluhan atau aspirasi anda dengan jelas dan lengkap
                                        </p>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-lg-3 px-0" style={{ marginTop: "26px" }}>
                                    <div className="card bg-white rounded-4 border-0 shadow p-3 mx-auto ms-sm-3 ms-lg-auto" style={{ height: "198px", maxWidth: "216px" }}>
                                        <img src={Images.IconVerifikasiLaporan} className="mb-2" width={40} />
                                        <p className="mb-1 fw-semibold" style={{ fontSize: "20px" }}>
                                            Verifikasi Laporan
                                        </p>
                                        <p className="mb-0" style={{ fontSize: "14px" }}>
                                            Laporan Anda akan diverifikasi dan diteruskan kepada instansi berwenang
                                        </p>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-lg-3 px-0" style={{ marginTop: "26px" }}>
                                    <div className="card bg-white rounded-4 border-0 shadow p-3 mx-auto me-sm-3 me-lg-auto" style={{ height: "198px", maxWidth: "216px" }}>
                                        <img src={Images.IconTindakLanjut} className="mb-2" width={40} />
                                        <p className="mb-1 fw-semibold" style={{ fontSize: "20px" }}>
                                            Tindak Lanjut
                                        </p>
                                        <p className="mb-0" style={{ fontSize: "14px" }}>
                                            Pemerintah desa akan mengambil tindakan sesuai dengan jenis laporan Anda
                                        </p>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-lg-3 px-0" style={{ marginTop: "26px" }}>
                                    <div className="card bg-white rounded-4 border-0 shadow p-3 mx-auto ms-sm-3 ms-lg-auto" style={{ height: "198px", maxWidth: "216px" }}>
                                        <img src={Images.IconSelesai} className="mb-2" width={40} />
                                        <p className="mb-1 fw-semibold" style={{ fontSize: "20px" }}>
                                            Selesai
                                        </p>
                                        <p className="mb-0" style={{ fontSize: "14px" }}>
                                            Laporan Anda akan terus ditindaklanjuti hingga terselesaikan
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Banner */}
                    <div style={{ margin: "0px -16px" }}>
                        <div className="card mx-auto rounded-5 border-0" style={{ maxWidth: "1200px", backgroundImage: `url(${Images.BGCTABanner})`, backgroundSize: "cover", paddingBottom: "86px" }}>
                            <div className="row mx-0 align-items-center" style={{ padding: "0px 30px" }}>
                                <div className="col-12 col-lg-6 col-xl-12 mx-auto px-0 text-center text-lg-start" style={{ marginTop: "86px", maxWidth: "479px" }}>
                                    <h1 className="fw-bold text-white mb-0 lh-base" style={{ letterSpacing: "2px" }}>
                                        Pantau Semua Aduan di Desa Anda
                                    </h1>
                                </div>
                                <div className="col-12 col-lg-6 col-xl-12 mx-auto px-0 text-center text-lg-start" style={{ marginTop: "86px", maxWidth: "461px" }}>
                                    <h4 className="fw-normal text-white mb-3 lh-base">Lihat daftar lengkap aduan yang telah dikirimkan warga, beserta status penyelesaiannya. Tetap transparan, mudah diakses, dan informatif!</h4>
                                    <Link to="daftar-aduan" type="button" className="btn rounded-4 text-white fw-semibold px-4 py-2 border-0" style={{ backgroundColor: "#FF8A07" }}>
                                        Lihat Daftar Aduan
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <footer className="border-top border-dark-subtle" style={{ margin: "80px -36px 0px -36px", padding: "37px 0px" }}>
                        <div className="row mx-auto align-items-center" style={{ maxWidth: "1170px" }}>
                            {/* Logo */}
                            <div className="col-12 px-0 mx-auto ms-sm-4 me-sm-0 ms-xl-0" style={{ maxWidth: "188px", margin: "37px 0px" }}>
                                <img src={Images.LogoLaporke} style={{ maxWidth: "188px" }} />
                            </div>

                            {/* Laporke */}
                            <div className="col-12 col-sm-6 col-md-7 col-lg-5 col-xl-12 px-4 px-sm-0 mx-auto me-sm-4 me-lg-auto" style={{ maxWidth: "545px", margin: "37px 0px" }}>
                                <h4 className="fw-bold lh-base mb-1">LAPORKE!</h4>
                                <p className="mb-0">
                                    <span className="fw-semibold">LAPORKE!</span> adalah platform aduan bagi warga desa Banteran, Banyumas. Sampaikan suara Anda untuk perbaikan layanan dan infrastruktur desa dengan proses yang transparan dan akuntabel.
                                    Bersama, kita bangun Banteran lebih baik!
                                </p>
                            </div>

                            {/* Kontak */}
                            <div className="col-12 px-0 ms-4 ms-lg-0 me-lg-4 me-xl-0" style={{ maxWidth: "229px", margin: "37px 0px" }}>
                                <h5 className="lh-base mb-3">Kontak</h5>
                                <p style={{ marginBottom: "12px" }}>Purwokerto - Indonesia</p>
                                <p style={{ marginBottom: "12px" }}>+0628-2267-9981</p>
                                <p className="mb-0">desabanyumas@gmail.com</p>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal fade show" style={{ display: "block", backdropFilter: "blur(5px)", backgroundColor: "rgba(0, 0, 0, 0.1)" }}>
                    <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "448px" }}>
                        <div className="modal-content border-0 rounded-4" style={{ maxWidth: "448px" }}>
                            <div className="modal-body p-4 text-center">
                                <img src={ilusBerhasil} className="mb-4 w-75" alt="Berhasil" />
                                <h4 className="mb-4" style={{ lineHeight: "31px" }}>Aduan Berhasil Dikirim!</h4>
                                <p className="mb-4 fw-medium" style={{ lineHeight: "27px" }}>
                                    Terima kasih telah melaporkan. Aduan Anda akan segera kami verifikasi dan tindak lanjuti.
                                </p>
                                <button
                                    type="button"
                                    className="btn fw-semibold border-0 rounded-4 text-white"
                                    onClick={handleCloseModal}
                                    style={{ backgroundColor: "#C40C0C", padding: "8px 24.2px" }}
                                >
                                    Oke
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>


    );
}

export default Pengaduan;
