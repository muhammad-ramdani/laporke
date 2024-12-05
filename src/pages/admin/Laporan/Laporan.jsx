import { useEffect, useState } from "react";
import Images from "../../../images";
import { deleteLaporan, getLaporan, updateLaporanStatus } from "../../../services/services";
import { toast } from "react-toastify";
import "./laporan.css";

function Laporan() {
    const [searchText, setSearchText] = useState("");
    const [data, setData] = useState([]);
    const [selectedLaporan, setSelectedLaporan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [newStatus, setNewStatus] = useState("");


    // Fungsi untuk refresh data
    const setRefresh = async () => {
        try {
            setLoading(true);
            const newData = await getLaporan();
            setData(newData);
        } catch (err) {
            setError("Gagal memuat laporan");
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setRefresh(); // Memuat data awal saat komponen pertama kali dirender
    }, []);

    const handleOpenDeleteModal = (id) => {
        setDeleteId(id); // Menyimpan id laporan yang akan dihapus ke dalam state
    };

    const handleDelete = async () => {
        if (!deleteId) {
            toast.error("ID laporan tidak ditemukan");
            return;
        }

        try {
            const result = await deleteLaporan(deleteId);

            // Memeriksa status dari respons API
            if (result && result.status === true) {
                toast.success("Laporan berhasil dihapus");

                // Memanggil setRefresh untuk memuat ulang data setelah penghapusan
                await setRefresh(); // Pastikan data di-refresh setelah penghapusan

                // Setelah penghapusan berhasil, refresh halaman
                // window.location.reload();
                setDeleteId(null);
            } else {
                // Menampilkan pesan kesalahan jika status bukan true
                toast.error("Laporan gagal dihapus");
            }
        } catch (error) {
            console.error("Error deleting laporan:", error);

            // Menangani error lain seperti kesalahan jaringan atau server
            toast.error("Gagal menghapus laporan");
        }
    };

    // Filter daftar aduan berdasarkan input pencarian
    const filteredLaporan = data.filter((item) => {
        const searchLower = searchText.toLowerCase();
        return item.title.toLowerCase().includes(searchLower) || item.location.toLowerCase().includes(searchLower);
    });

    const handleOpenModal = (id) => {
        const laporan = data.find((item) => item.id === id);
        setSelectedLaporan(laporan);
        setNewStatus(laporan.status);
    };

    const handleStatusChange = (value) => {
        setNewStatus(value);
    };

    const handleSaveStatus = async () => {
        if (selectedLaporan && newStatus) {
            // Kirim permintaan ke server untuk memperbarui status
            await updateLaporanStatus(selectedLaporan.id, newStatus);

            // Perbarui state lokal dengan status baru
            const updatedData = data.map((item) =>
                item.id === selectedLaporan.id ? { ...item, status: newStatus } : item
            );
            setData(updatedData);
            setSelectedLaporan({ ...selectedLaporan, status: newStatus });

            // Tutup modal secara manual
            const modalElement = document.getElementById("modalDetail");
            modalElement.classList.remove("show");
            modalElement.setAttribute("aria-hidden", "true");
            modalElement.style.display = "none";

            // Hapus backdrop modal (opsional jika ada)
            const modalBackdrop = document.querySelector(".modal-backdrop");
            if (modalBackdrop) {
                modalBackdrop.remove();
            }

            // Tambahkan jeda 5 detik sebelum refresh halaman
            // setTimeout(() => {
            //     window.location.reload(); // Refresh halaman
            // }, 5000);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

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
                                <td className="fs-5 text-secondary" style={{ paddingLeft: "32px" }}>
                                    Gambar
                                </td>
                                <td className="fs-5 text-secondary">Judul</td>
                                <td className="fs-5 text-secondary">Lokasi</td>
                                <td className="fs-5 text-secondary">Status</td>
                                <td className="fs-5 text-secondary" style={{ paddingRight: "32px" }}>
                                    Aksi
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLaporan.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center pt-5 pb-3 text-secondary">
                                        Tidak ada laporan
                                    </td>
                                </tr>
                            ) : (
                                filteredLaporan.map((item) => (
                                    <tr key={item.id}>
                                        <td style={{ paddingLeft: "32px" }}>
                                            <img className="rounded-3" src={`https://laporke-desa-banteran.web.id/static/uploads/${item.photo}`} style={{ width: "50px", height: "50px", objectFit: "cover" }} />
                                        </td>
                                        <td className="text-truncate" style={{ maxWidth: "180px" }}>
                                            {item.title}
                                        </td>
                                        <td className="text-truncate" style={{ maxWidth: "180px" }}>
                                            {item.location}
                                        </td>
                                        <td
                                            style={{
                                                color:
                                                    item.status === "pending"
                                                        ? "#C40C0C"
                                                        : item.status === "open"
                                                            ? "#DBA000"
                                                            : item.status === "closed"
                                                                ? "#00C17A"
                                                                : "inherit",
                                            }}
                                        >
                                            {item.status === "pending" ? "Belum diproses" : item.status === "open" ? "Sedang diproses" : item.status === "closed" ? "Telah selesai" : item.status}
                                        </td>

                                        <td style={{ paddingRight: "32px", whiteSpace: "nowrap", width: "1%" }}>
                                            {/* Tombol Lihat */}
                                            <button type="button" className="btn" style={{ color: "#00C17A", backgroundColor: "#E6FCF4", marginRight: "12px" }} data-bs-toggle="modal" data-bs-target="#modalDetail" onClick={() => handleOpenModal(item.id)}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "10px" }}>
                                                    <path d="M13 11L21.2 2.80005" stroke="#00C17A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M22 6.8V2H17.2" stroke="#00C17A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13" stroke="#00C17A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                Lihat
                                            </button>

                                            {/* Tombol Hapus */}
                                            <button type="button" className="btn" style={{ color: "#FF0000", backgroundColor: "#FFE6E6" }} data-bs-toggle="modal" data-bs-target="#modalDelete" onClick={() => handleOpenDeleteModal(item.id)}>
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
            <div className="modal fade" id="modalDetail" tabIndex="-1" aria-labelledby="modalDetailLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content" style={{ padding: "12px", borderRadius: "20px" }}>
                        {selectedLaporan && (
                            <div>
                                <div className="modal-body" style={{ padding: "18px" }}>
                                    <div className="mb-4 text-center">
                                        <a href={`https://laporke-desa-banteran.web.id/static/uploads/${selectedLaporan.photo}`} target="_blank">
                                            <img src={`https://laporke-desa-banteran.web.id/static/uploads/${selectedLaporan.photo}`} className="rounded-4" style={{ width: "250px", height: "250px", objectFit: "cover" }} />
                                        </a>
                                    </div>
                                    <div className="mb-4">
                                        <p className="fw-medium" style={{ marginBottom: "12px" }}>
                                            Nama
                                        </p>
                                        <p className="mb-0">{selectedLaporan.name}</p>
                                    </div>
                                    <div className="mb-4">
                                        <p className="fw-medium" style={{ marginBottom: "12px" }}>
                                            Lokasi
                                        </p>
                                        <p className="mb-0">{selectedLaporan.location}</p>
                                    </div>
                                    <div className="mb-4">
                                        <p className="fw-medium" style={{ marginBottom: "12px" }}>
                                            Judul Laporan
                                        </p>
                                        <p className="mb-0">{selectedLaporan.title}</p>
                                    </div>
                                    <div className="mb-4">
                                        <p className="fw-medium" style={{ marginBottom: "12px" }}>
                                            Isi Laporan
                                        </p>
                                        <p className="mb-0">{selectedLaporan.description}</p>
                                    </div>
                                    <div className="mb-4">
                                        <p className="fw-medium" style={{ marginBottom: "12px" }}>
                                            Status Laporan
                                        </p>
                                        <select
                                            className="form-select"
                                            style={{ borderRadius: "12px", padding: "11px 16px", color: newStatus === "pending" ? "#C40C0C" : newStatus === "open" ? "#DBA000" : newStatus === "closed" ? "#00C17A" : "blue" }}
                                            value={newStatus || selectedLaporan.status}
                                            onChange={(e) => handleStatusChange(e.target.value)}
                                        >
                                            <option style={{ color: "#C40C0C" }} value="pending">Belum diproses</option>
                                            <option style={{ color: "#DBA000" }} value="open">Sedang diproses</option>
                                            <option style={{ color: "#00C17A" }} value="closed">Telah selesai</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="modal-footer p-2">
                                    <button
                                        type="button"
                                        className="btn border-0 mx-0 mb-0 rounded-4 text-white"
                                        style={{ backgroundColor: "#C40C0C", marginTop: "12px", padding: "8px 25.2px" }}
                                        onClick={handleSaveStatus}
                                    >
                                        Simpan
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal Hapus */}
            <div className="modal fade" id="modalDelete" tabIndex="-1" aria-labelledby="modalDeleteLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalDeleteLabel">
                                Konfirmasi Hapus
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Apakah Anda yakin ingin menghapus laporan ini?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Batal
                            </button>
                            <button type="button" className="btn btn-danger" onClick={handleDelete}>
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Laporan;