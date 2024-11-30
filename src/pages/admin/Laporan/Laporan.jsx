import { useState } from "react"
import Images from "../../../images"

const items = [
    {
        id: 1,
        gambar: Images.FotoJalanBolong,
        name: "Anthony Nunez",
        judul: "Jalanya bolong di dekat irigasi",
        lokasi: "Jl. Dr.Angka (depan rumah pak saber)",
        status: "Belum diproses"
    },
    {
        id: 2,
        gambar: Images.FotoJalanBolong,
        name: "Kur",
        judul: "Sebagian lampu di RW 10 mati",
        lokasi: "Jl. Banteran banteran, Purwokerto Utara, Purwokerto pwt pwt",
        status: "Sedang diproses"
    },
    {
        id: 3,
        gambar: Images.FotoJalanBolong,
        name: "Anonim",
        judul: "Brantas motor yang pakai knalpot brong",
        lokasi: "Desa Banteran",
        status: "Telah selesai"
    },
]

function Laporan() {
    const [searchText, setSearchText] = useState("")
    const [selectedLaporan, setSelectedLaporan] = useState(null);

    // Filter daftar aduan berdasarkan input pencarian
    const filteredAduan = items.filter((item) => {
        const searchLower = searchText.toLowerCase()
        return (
            item.judul.toLowerCase().includes(searchLower) ||
            item.lokasi.toLowerCase().includes(searchLower) ||
            item.status.toLowerCase().includes(searchLower)
        );
    })

    const handleOpenModal = (id) => {
        const laporan = items.find((item) => item.id === id);
        setSelectedLaporan(laporan);
    };

    const handleStatusChange = (newStatus) => {
        if (selectedLaporan) {
            const laporanIndex = items.findIndex((item) => item.id === selectedLaporan.id);
            items[laporanIndex].status = newStatus; // Update status di items
            setSelectedLaporan({ ...selectedLaporan, status: newStatus }); // Perbarui state modal
        }
    };

    return (
        <>
            <div className="row align-items-center mb-3">
                <div className="col">
                    <span className="fs-5">Laporan Pengaduan</span>
                </div>
                <div className="col-auto">
                    <div className="input-group" style={{ width: "400px", height: "48px" }}>
                        <img src={Images.LogoSearch} className="input-group-text bg-white rounded-start-4" style={{ paddingRight: "20px", paddingLeft: "16px" }} />
                        <input type="text" className="form-control border-start-0 rounded-end-4 ps-0" placeholder="Cari apa saja..." value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                    </div>
                </div>
            </div>

            <div className="card rounded-4 shadow mb-5 border-0">
                <div className="card-body" style={{ padding: "36px" }}>
                    <table className="table table-borderless align-middle mb-0">
                        <thead className="border-bottom">
                            <tr>
                                <td className="fs-5 text-secondary" style={{ paddingLeft: "32px" }}>Gambar</td>
                                <td className="fs-5 text-secondary">Judul</td>
                                <td className="fs-5 text-secondary">Lokasi</td>
                                <td className="fs-5 text-secondary">Status</td>
                                <td className="fs-5 text-secondary" style={{ paddingRight: "32px" }}>Aksi</td>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAduan.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center pt-5 pb-3 text-secondary">
                                        Tidak ada laporan
                                    </td>
                                </tr>
                            ) : (
                                filteredAduan.map((item) => (
                                    <tr key={item.id}>
                                        <td style={{ paddingLeft: "32px" }}><img className="rounded-3" src={item.gambar} style={{ width: "50px", height: "50px", objectFit: "cover" }} /></td>
                                        <td className="text-truncate" style={{ maxWidth: "180px" }}>{item.judul}</td>
                                        <td className="text-truncate" style={{ maxWidth: "180px" }}>{item.lokasi}</td>
                                        <td style={{ color: item.status === "Belum diproses" ? "#C40C0C" : item.status === "Sedang diproses" ? "#DBA000" : item.status === "Telah selesai" ? "#00C17A" : "inherit" }}>{item.status}</td>
                                        <td style={{ paddingRight: "32px", whiteSpace: "nowrap", width: "1%" }}>
                                            <button type="button" className="btn" style={{ color: "#00C17A", backgroundColor: "#E6FCF4", marginRight: "12px" }} data-bs-toggle="modal" data-bs-target="#modalDetail" onClick={() => handleOpenModal(item.id)}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "10px" }}>
                                                    <path d="M13 11L21.2 2.80005" stroke="#00C17A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M22 6.8V2H17.2" stroke="#00C17A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13" stroke="#00C17A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                Lihat
                                            </button>
                                            <button type="button" className="btn" style={{ color: "#FF0000", backgroundColor: "#FFE6E6" }} data-bs-toggle="modal" data-bs-target="#modalDelete">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "10px" }}>
                                                    <path d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998" stroke="#FF0000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97" stroke="#FF0000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M18.85 9.14001L18.2 19.21C18.09 20.78 18 22 15.21 22H8.79002C6.00002 22 5.91002 20.78 5.80002 19.21L5.15002 9.14001" stroke="#FF0000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M10.33 16.5H13.66" stroke="#FF0000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M9.5 12.5H14.5" stroke="#FF0000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Detail */}
            {selectedLaporan && (
                <div className="modal fade" id="modalDetail">
                    <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content" style={{ padding: "12px", borderRadius: "20px" }}>
                            <div className="modal-body" style={{ padding: "18px" }}>
                                <div className="mb-4 text-center">
                                    <img src={selectedLaporan.gambar} className="rounded-4" style={{ width: "120px", height: "120px", objectFit: "cover" }} />
                                </div>
                                <div className="mb-4">
                                    <p className="fw-medium" style={{ marginBottom: "12px" }}>Nama</p>
                                    <p className="mb-0">{selectedLaporan.name}</p>
                                </div>
                                <div className="mb-4">
                                    <p className="fw-medium" style={{ marginBottom: "12px" }}>Lokasi</p>
                                    <p className="mb-0">{selectedLaporan.lokasi}</p>
                                </div>
                                <div className="mb-4">
                                    <p className="fw-medium" style={{ marginBottom: "12px" }}>Judul Laporan</p>
                                    <p className="mb-0">{selectedLaporan.judul}</p>
                                </div>
                                <div className="mb-4">
                                    <p className="fw-medium" style={{ marginBottom: "12px" }}>Status Laporan</p>
                                    <select className="form-select" style={{ borderRadius: "12px", padding: "11px 16px" }} value={selectedLaporan.status} onChange={(e) => handleStatusChange(e.target.value)}>
                                        <option value="Belum diproses">Belum diproses</option>
                                        <option value="Sedang diproses">Sedang diproses</option>
                                        <option value="Telah selesai">Telah selesai</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer p-2">
                                <button type="button" className="btn border-0 mx-0 mb-0 rounded-4 text-white" style={{ backgroundColor: "#C40C0C", marginTop: "12px", padding: "8px 25.2px" }} onClick={() => { const laporanIndex = items.findIndex((item) => item.id === selectedLaporan.id); if (laporanIndex !== -1) { items[laporanIndex].status = selectedLaporan.status; } document.getElementById("modalDetail").click(); }}>Simpan</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Laporan