import { useEffect, useState } from "react";
import Images from "../../../images";
import { toast } from "react-toastify";
import { getChartData } from "../../../services/services";

function Dashboard() {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const data = await getChartData();
                setChartData(data);
            } catch (err) {
                setError("Gagal memuat data chart");
                toast.error(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchChartData();
    }, []);

    if (loading) {
        return <p className="text-center">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-danger">{error}</p>;
    }

    return (
        <div className="row mx-0 justify-content-center text-center">
            <div className="col ps-0 pe-3" style={{ maxWidth: "260px" }}>
                <div className="card rounded-4 border-0 text-white" style={{ backgroundColor: "#C40C0C" }}>
                    <div className="card-body" style={{ padding: "32px" }}>
                        <img src={Images.LogoJumlahLaporan} style={{ marginBottom: "34px" }} />
                        <h2>{chartData.closed + chartData.open + chartData.pending}</h2>
                        <span>Jumlah Laporan</span>
                    </div>
                </div>
            </div>
            <div className="col px-3" style={{ maxWidth: "276px" }}>
                <div className="card rounded-4 border-0 text-white" style={{ backgroundColor: "#FE6400" }}>
                    <div className="card-body" style={{ padding: "32px" }}>
                        <img src={Images.LogoLaporanBelumDiproses} style={{ marginBottom: "34px" }} />
                        <h2>{chartData.open}</h2>
                        <span>Belum Diproses</span>
                    </div>
                </div>
            </div>
            <div className="col px-3" style={{ maxWidth: "276px" }}>
                <div className="card rounded-4 border-0 text-white" style={{ backgroundColor: "#FF8A07" }}>
                    <div className="card-body" style={{ padding: "32px" }}>
                        <img src={Images.LogoLaporanSedangDiproses} style={{ marginBottom: "34px" }} />
                        <h2>{chartData.pending}</h2>
                        <span>Sedang Diproses</span>
                    </div>
                </div>
            </div>
            <div className="col ps-3 pe-0" style={{ maxWidth: "260px" }}>
                <div className="card rounded-4 border-0 text-white" style={{ backgroundColor: "#FFC100" }}>
                    <div className="card-body" style={{ padding: "32px" }}>
                        <img src={Images.LogoLaporanSelesai} style={{ marginBottom: "34px" }} />
                        <h2>{chartData.closed}</h2>
                        <span>Laporan Selesai</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
