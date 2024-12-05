import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import styled from "styled-components"
import Images from "../../../images"
import LogoLocation from "../../../assets/LogoLokasi.svg"
import { daftarAduan } from "../../../services/services"


const ImageContainer = styled.div`
    max-width: 244px;
    height: 203px;

    @media (min-width: 768px) {
        max-width: none;
        width: 244px;
    }
`;

function DaftarAduan() {
    const [aduan, setAduan] = useState([])
    const [selectedAduan, setSelectedAduan] = useState(null)
    const [searchText, setSearchText] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5


    useEffect(() => {
        const fetchAduan = async () => {
            try {
                const data = await daftarAduan()
                setAduan(data.data)
                // eslint-disable-next-line no-unused-vars
            } catch (error) {
                toast.error('Gagal memuat daftar aduan');
            }
        }
        fetchAduan()
    }, [])

    // Handler untuk mengganti halaman
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber); // Perbarui state currentPage
    };

    // Filter daftar aduan berdasarkan input pencarian
    const filteredAduan = aduan.filter((item) => {
        const searchLower = searchText.toLowerCase();
        return (
            item.title.toLowerCase().includes(searchLower) ||
            item.status.toLowerCase().includes(searchLower) ||
            item.location.toLowerCase().includes(searchLower)
        );
    });

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredAduan.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredAduan.length / itemsPerPage);


    // Handler untuk membuka modal dan mengatur aduan yang dipilih
    const handleDetailClick = (id) => {
        const aduanDetail = aduan.find((item) => item.id === id)
        setSelectedAduan(aduanDetail)
    }

    return (
        <div style={{ padding: "0px 20px" }}>
            {/* Card Banner */}
            <div className="card border-0 rounded-5 text-center text-white" style={{ background: `url(${Images.BGHeroSection}) no-repeat bottom`, backgroundSize: "cover", padding: "98px 16px 61px 16px", marginBottom: "64px" }}>
                <h1 className="fw-semibold mb-3 lh-base">Daftar Aduan<br />Warga Desa Banteran</h1>
                <h4 className="fw-normal mx-auto lh-base" style={{ maxWidth: "825px", marginBottom: "56px" }}>Pantau semua aduan yang telah dikirimkan warga, mulai dari status pengajuan hingga penyelesaian.</h4>
                <div className="d-flex align-items-center justify-content-center">
                    <input className="form-control form-control-sm rounded-3 border-0 w-100 me-4 focus-ring focus-ring-light" type="text" placeholder="Cari laporan disini..." style={{ maxWidth: "584px", padding: "12px" }} value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                    <button type="button" className="btn border-0 btn-sm rounded-3" style={{ backgroundColor: "#FF8A07", padding: "11.43px 12px" }}>
                        <img src={Images.LogoSearchButton} />
                    </button>
                </div>
            </div>

            {aduan.length === 0 ? (
                // Ketika tidak ada laporan
                <div className="row mx-auto mb-5 align-items-center" style={{ maxWidth: "1091px" }}>
                    <div className="col-10 col-sm-6 col-md-5 col-lg-auto px-0 mx-auto mx-md-0">
                        <img src={Images.ImageTidakAdaLaporan} className="w-100" />
                    </div>
                    <div className="col-12 col-md px-0 mt-4 mt-md-0 mx-auto ms-md-4 ms-xl-auto me-md-0 text-center text-md-start" style={{ maxWidth: "570px" }}>
                        <h2 className="mb-4 fw-semibold" style={{ lineHeight: "42px" }}>Belum Ada Aduan yang Masuk</h2>
                        <p className="mb-4" style={{ maxWidth: "524px", fontSize: "18px", lineHeight: "31px" }}>Yuk, jadi yang pertama menyampaikan aspirasi atau laporan Anda untuk desa yang lebih baik!</p>
                        <Link to="/" className="btn border-0 rounded-4 text-white fw-semibold" style={{ padding: "8px 26.35px", backgroundColor: "#C40C0C" }}>Laporkan Aduan Baru</Link>
                    </div>
                </div>

            )
                : (
                    <>
                        {/* Jika hasil pencarian tidak ditemukan */}
                        {filteredAduan.length === 0 ? (
                            <div className="row mx-auto mb-5 align-items-center" style={{ maxWidth: "1009px" }}>
                                <div className="col-10 col-sm-6 col-md-5 col-lg-auto px-0 mx-auto mx-md-0">
                                    <img src={Images.ImagesTidakAdaPencarian} className="w-100" />
                                </div>
                                <div className="col-12 col-md px-0 mt-4 mt-md-0 mx-auto ms-md-4 ms-xl-auto me-md-0 text-center text-md-start" style={{ maxWidth: "570px" }}>
                                    <h2 className="mb-4 fw-semibold" style={{ lineHeight: "42px" }}>Aduan Tidak Ditemukan</h2>
                                    <p className="mb-4" style={{ maxWidth: "524px", fontSize: "18px", lineHeight: "31px" }}>Maaf, kami tidak menemukan aduan yang sesuai dengan kata kunci yang Anda gunakan.</p>
                                    <button type="button" className="btn border-0 rounded-4 text-white fw-semibold" style={{ padding: "8px 25.54px", backgroundColor: "#C40C0C" }} onClick={() => setSearchText("")}>Reset Pencarian</button>
                                </div>
                            </div>

                        ) : (
                            // Jika ada laporan yang sesuai dengan pencarian
                            currentItems.map((item) => (
                                <div key={item.id} className="card border-0 rounded-4 shadow mx-auto p-4 mb-3" style={{ maxWidth: "980.33px" }}>
                                    <div className="row mx-0 align-items-center">
                                        {/* column gambar */}
                                        <div className="col-12 mx-auto ms-md-0 me-md-3 px-0" style={{ maxWidth: "274.33px", height: "222px" }}>
                                            <a href={`https://laporke-desa-banteran.web.id/static/uploads/${item.photo}`} target="_blank">
                                                <img src={`https://laporke-desa-banteran.web.id/static/uploads/${item.photo}`} className="object-fit-cover w-100 h-100 rounded-4" />
                                            </a>
                                        </div>

                                        {/* column content */}
                                        <div className="col-12 col-md px-0 mt-3 mt-md-0">
                                            <div className="row mx-0">
                                                <div className="col-12 col-sm px-0">
                                                    <h4 className="mb-3 lh-base">{item.title}</h4>
                                                </div>
                                                <div className="col-auto px-3 py-1 rounded-pill mb-3 mb-sm-auto ms-sm-3" style={{ backgroundColor: item.status === "pending" ? "#FCDDCC" : item.status === "open" ? "#FFF7CC" : item.status === "closed" ? "rgba(0, 193, 122, 0.1)" : "transparent", color: item.status === "pending" ? "#C40C0C" : item.status === "open" ? "#DBA000" : item.status === "closed" ? "#00C17A" : "inherit" }}>{item.status === "pending" ? "Belum diproses" : item.status === "open" ? "Sedang diproses" : item.status === "closed" ? "Telah selesai" : item.status}</div>
                                            </div>

                                            <div className="row mx-0 mb-3">
                                                <div className="col-auto px-0">
                                                    <img src={LogoLocation} className="me-1" />
                                                </div>
                                                <div className="col px-0">
                                                    <p className="mb-0">{item.location}</p>
                                                </div>
                                            </div>

                                            <button type="button" className="btn fw-semibold border-0 py-2 px-4 rounded-4" style={{ backgroundColor: "#C40C0C", color: "white" }} data-bs-toggle="modal" data-bs-target="#ModalDetailAduan" onClick={() => handleDetailClick(item.id)}>Lihat Detail</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}

                        {/* Pagination */}
                        <nav className="mt-5">
                            <ul className="pagination justify-content-center">
                                {[...Array(totalPages)].map((_, index) => (
                                    <li
                                        key={index}
                                        className={`page-item ${index + 1 === currentPage ? "active" : ""}`}
                                    >
                                        <button
                                            className="page-link focus-ring"
                                            style={{
                                                '--bs-focus-ring-width': '0px', 
                                                backgroundColor: index + 1 === currentPage ? '#C40C0C' : '',
                                                borderColor: '#C40C0C',
                                                color: index + 1 === currentPage ? '#ffffff' : '#C40C0C',
                                            }}
                                            onClick={() => handlePageChange(index + 1)}
                                        >
                                            {index + 1}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </>
                )
            }

            {/* Modal Detail Aduan */}
            <div className="modal fade" id="ModalDetailAduan" data-bs-backdrop="static" style={{ backdropFilter: "blur(5px)", backgroundColor: "rgba(0, 0, 0, 0.1)" }}>
                <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "1052px" }}>
                    <div className="modal-content border-0 rounded-4 p-4">
                        <div className="modal-header border-0 p-0 mb-4">
                            <h4 className="mb-0">Detail Aduan</h4>
                            <button type="button" className="btn ms-auto border-0" data-bs-dismiss="modal" style={{ padding: "2px" }}>
                                <img src={Images.LogoClose} />
                            </button>
                        </div>

                        <div className="modal-body p-0">
                            {selectedAduan ? (
                                <div className="row mx-0">
                                    <div className="col-12 col-md-auto px-0 me-md-4">
                                        <p className="mb-3" style={{ color: "#828282", fontSize: "18px" }}>Gambar Laporan</p>
                                        <ImageContainer className="mx-auto mb-3">
                                            <a href={`https://laporke-desa-banteran.web.id/static/uploads/${selectedAduan.photo}`} target="_blank">
                                                <img src={`https://laporke-desa-banteran.web.id/static/uploads/${selectedAduan.photo}`} className="object-fit-cover w-100 h-100 rounded-4" />
                                            </a>
                                        </ImageContainer>
                                        <div className="d-inline-flex px-3 py-1 rounded-pill mb-3" style={{ backgroundColor: selectedAduan.status === "pending" ? "#FCDDCC" : selectedAduan.status === "open" ? "#FFF7CC" : selectedAduan.status === "closed" ? "rgba(0, 193, 122, 0.1)" : "transparent", color: selectedAduan.status === "pending" ? "#C40C0C" : selectedAduan.status === "open" ? "#DBA000" : selectedAduan.status === "closed" ? "#00C17A" : "inherit" }}>{selectedAduan.status === "pending" ? "Belum diproses" : selectedAduan.status === "open" ? "Sedang diproses" : selectedAduan.status === "closed" ? "Telah selesai" : selectedAduan.status}</div>
                                    </div>

                                    <div className="col-12 col-md px-0">
                                        <div className="mb-4">
                                            <p className="mb-2" style={{ color: "#828282", fontSize: "18px" }}>Judul Laporan</p>
                                            <h3 className="mb-0 fw-semibold" style={{ color: "#C40C0C" }}>{selectedAduan.title}</h3>
                                        </div>

                                        <div className="mb-4">
                                            <p className="mb-2" style={{ color: "#828282", fontSize: "18px" }}>Isi Laporan</p>
                                            <p className="mb-0" style={{ fontSize: "14px", lineHeight: "24px" }}>{selectedAduan.description}</p>
                                        </div>

                                        <div className="row mx-0">
                                            <div className="col-12 col-md-4 px-0 mb-4">
                                                <p className="mb-2" style={{ color: "#828282", fontSize: "18px" }}>Pelapor</p>
                                                <p className="mb-0">{selectedAduan.name}</p>
                                            </div>
                                            <div className="col-12 col-md-8 px-0 ps-md-3 mb-4">
                                                <p className="mb-2" style={{ color: "#828282", fontSize: "18px" }}>Lokasi</p>
                                                <p className="mb-0">
                                                    <img src={LogoLocation} className="me-1" />
                                                    {selectedAduan.location}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>

                        <div className="modal-footer border-0 p-0">
                            <button type="button" className="btn border-0 m-0 rounded-4 fw-semibold py-2 px-4 text-white" data-bs-dismiss="modal" style={{ backgroundColor: "#828282" }}>Kembali</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-top border-dark-subtle" style={{ margin: "80px -20px 0px -20px", padding: "37px 0px" }}>
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
        </div >
    )
}

export default DaftarAduan
