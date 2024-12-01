import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LayoutPublic from './pages/public/Layout/LayoutPublic'
import Pengaduan from './pages/public/Pengaduan/Pengaduan'
import DaftarAduan from './pages/public/DaftarAduan/DaftarAduan'
import LayoutAdmin from './pages/admin/Layout/LayoutAdmin'
import Dashboard from './pages/admin/Dashboard/Dashboard'
import Laporan from './pages/admin/Laporan/Laporan'
import Profil from './pages/admin/Profil/Profil'
import Login from './pages/Login/Login'
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoutes from './utils/PrivateRoutes.jsx'

function App() {

    return (
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Routes>
                <Route path="/" element={<LayoutPublic />} >
                    <Route index element={<Pengaduan />} />
                    <Route path="daftar-aduan" element={<DaftarAduan />} />
                </Route>
                <Route element={<PrivateRoutes />}>
                    <Route path="/admin/" element={<LayoutAdmin />} exact>
                        <Route index element={<Dashboard />} />
                        <Route path="laporan" element={<Laporan />} />
                        <Route path="profil" element={<Profil />} />
                    </Route>
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App