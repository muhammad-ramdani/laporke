import { useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import Images from "../../../images"
import LogoLocation from "../../../assets/LogoLokasi.svg"

const aduan = [
    {
        id: 1,
        name: "Anthony Nunez",
        gambar: Images.FotoJalanBolong,
        status: "Belum diproses",
        lokasi: "Jl. Dr.Angka (depan rumah pak saber)",
        judul: "Jalannya bolong di dekat irigasi",
        isi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vitae porta dolor. Nunc feugiat volutpat nisl, vel tincidunt velit ultricies id. Praesent a velit a tellus pellentesque tempus. Duis tincidunt, libero a condimentum dignissim, nisi mauris fringilla quam, sit amet suscipit eros metus nec justo. Quisque dignissim nisl ut nibh venenatis commodo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; "
    },
    {
        id: 2,
        name: "Kur",
        gambar: Images.FotoJalanBolong,
        status: "Sedang diproses",
        lokasi: "Jl. Banteran banteran, Purwokerto Utara, Purwokerto pwt pwt",
        judul: "Sebagian lampu di RW 10 mati",
        isi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vitae porta dolor. Nunc feugiat volutpat nisl, vel tincidunt velit ultricies id. Praesent a velit a tellus pellentesque tempus. Duis tincidunt, libero a condimentum dignissim, nisi mauris fringilla quam, sit amet suscipit eros metus nec justo. Quisque dignissim nisl ut nibh venenatis commodo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; "
    },
    {
        id: 3,
        name: "Kur",
        gambar: Images.FotoJalanBolong,
        status: "Telah selesai",
        lokasi: "Desa Banteran",
        judul: "Brantas motor yang pakai knalpot brong",
        isi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vitae porta dolor. Nunc feugiat volutpat nisl, vel tincidunt velit ultricies id. Praesent a velit a tellus pellentesque tempus. Duis tincidunt, libero a condimentum dignissim, nisi mauris fringilla quam, sit amet suscipit eros metus nec justo. Quisque dignissim nisl ut nibh venenatis commodo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; "
    },
]

const ImageContainer = styled.div`
    max-width: 244px;
    height: 203px;

    @media (min-width: 768px) {
        max-width: none;
        width: 244px;
    }
`;

function DaftarAduan() {

    const [selectedAduan, setSelectedAduan] = useState(null)
    const [searchText, setSearchText] = useState("")

    // Filter daftar aduan berdasarkan input pencarian
    const filteredAduan = aduan.filter((item) => {
        const searchLower = searchText.toLowerCase()
        return (
            item.judul.toLowerCase().includes(searchLower) ||
            item.status.toLowerCase().includes(searchLower) ||
            item.lokasi.toLowerCase().includes(searchLower)
        );
    })

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

            ) : (

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
                        filteredAduan.map((item) => (
                            <div key={item.id} className="card border-0 rounded-4 shadow mx-auto p-4 mb-3" style={{ maxWidth: "980.33px" }}>
                                <div className="row mx-0 align-items-center">
                                    {/* column gambar */}
                                    <div className="col-12 mx-auto ms-md-0 me-md-3 px-0 rounded-4" style={{ maxWidth: "274.33px", height: "222px", background: `url(${item.gambar}) no-repeat center`, backgroundSize: "cover" }}></div>

                                    {/* column content */}
                                    <div className="col-12 col-md px-0 mt-3 mt-md-0">
                                        <div className="row mx-0">
                                            <div className="col-12 col-sm px-0">
                                                <h4 className="mb-3 lh-base">{item.judul}</h4>
                                            </div>
                                            <div className="col-auto px-3 py-1 rounded-pill mb-3 mb-sm-auto ms-sm-3" style={{ backgroundColor: item.status === "Belum diproses" ? "#FCDDCC" : item.status === "Sedang diproses" ? "#FFF7CC" : item.status === "Telah selesai" ? "rgba(0, 193, 122, 0.1)" : "transparent", color: item.status === "Belum diproses" ? "#C40C0C" : item.status === "Sedang diproses" ? "#DBA000" : item.status === "Telah selesai" ? "#00C17A" : "inherit" }}>{item.status}</div>
                                        </div>

                                        <div className="row mx-0 mb-3">
                                            <div className="col-auto px-0">
                                                <img src={LogoLocation} className="me-1" />
                                            </div>
                                            <div className="col px-0">
                                                <p className="mb-0">{item.lokasi}</p>
                                            </div>
                                        </div>

                                        <button type="button" className="btn fw-semibold border-0 py-2 px-4 rounded-4" style={{ backgroundColor: "#C40C0C", color: "white" }} data-bs-toggle="modal" data-bs-target="#ModalDetailAduan" onClick={() => handleDetailClick(item.id)}>Lihat Detail</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </>
            )}

            {/* Modal Detail Aduan */}
            <div className="modal fade" id="ModalDetailAduan" data-bs-backdrop="static" style={{ backdropFilter: "blur(5px)", backgroundColor: "rgba(0, 0, 0, 0.1)" }}>
                <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "1052px" }}>
                    <div className="modal-content border-0 rounded-4 p-4" style={{ maxWidth: "1052px", marginLeft: "20px", marginRight: "20px" }}>
                        <div className="modal-header border-0 p-0 mb-4">
                            <h4 className="mb-0" id="exampleModalLabel">Detail Aduan</h4>
                            <button type="button" className="btn ms-auto border-0" data-bs-dismiss="modal" style={{ padding: "2px" }}><img src={Images.LogoClose} /></button>
                        </div>

                        <div className="modal-body p-0">
                            {selectedAduan && (
                                <div className="row mx-0">
                                    <div className="col-12 col-md-auto px-0 me-md-4">
                                        <p className="mb-3" style={{ color: "#828282", fontSize: "18px" }}>Gambar Laporan</p>
                                        <ImageContainer className="mx-auto mb-3">
                                            <img src={selectedAduan.gambar} className="object-fit-cover w-100 h-100 rounded-4" />
                                        </ImageContainer>
                                        <div className="d-inline-flex px-3 py-1 rounded-pill mb-3" style={{ backgroundColor: selectedAduan.status === "Belum diproses" ? "#FCDDCC" : selectedAduan.status === "Sedang diproses" ? "#FFF7CC" : selectedAduan.status === "Telah selesai" ? "rgba(0, 193, 122, 0.1)" : "transparent", color: selectedAduan.status === "Belum diproses" ? "#C40C0C" : selectedAduan.status === "Sedang diproses" ? "#DBA000" : selectedAduan.status === "Telah selesai" ? "#00C17A" : "inherit" }}>{selectedAduan.status}</div>
                                    </div>

                                    <div className="col-12 col-md px-0">
                                        <div className="mb-4">
                                            <p className="mb-2" style={{ color: "#828282", fontSize: "18px" }}>Judul Laporan</p>
                                            <h3 className="mb-0 fw-semibold lh-base" style={{ color: "#C40C0C" }}>{selectedAduan.judul}</h3>
                                        </div>

                                        <div className="mb-4">
                                            <p className="mb-2" style={{ color: "#828282", fontSize: "18px" }}>Isi Laporan</p>
                                            <p className="mb-0" style={{ fontSize: "14px", lineHeight: "24px" }}>{selectedAduan.isi}</p>
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
                                                    {selectedAduan.lokasi}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="modal-footer border-0 p-0">
                            <button type="button" className="btn border-0 m-0 rounded-4 fw-semibold py-2 px-4 text-white" data-bs-dismiss="modal" style={{ backgroundColor: "#828282" }}>Kembali</button>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default DaftarAduan