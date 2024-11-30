import { Outlet, Link, useLocation } from "react-router-dom"
import { useState } from "react"
import "./LayoutAdmin.css"
import Images from "../../../images"


function LayoutAdmin() {
    const [isMini, setIsMini] = useState(false)

    const toggleSidebar = () => {
        setIsMini(!isMini)
    }

    const location = useLocation()

    const getTextByPath = (pathname) => {
        switch (pathname) {
            case "/admin":
                return "Ringkasan"
            case "/admin/laporan":
                return "Laporan"
            case "/admin/profil":
                return "Profile"
        }
    }

    return (
        <div className="d-flex w-100">
            {/* Navbar Samping */}
            <div className={`sidebar-layout-admin ${isMini ? "mini" : ""}`}>
                <div className="d-flex" style={{ marginBottom: "84px" }}>
                    <img src={Images.LogoLaporke} width={40} />
                    {!isMini && <img src={Images.LogoTextLaporke} width={78.06} className="ms-3" />}
                </div>

                <ul className="list-unstyled">
                    <li style={{ marginBottom: "44px" }}>
                        <Link to="/admin" className={`nav-link d-flex ${location.pathname === "/admin" ? "active-link" : ""}`} >
                            <img src={Images.LogoRingkasan} width={24} className="icon" />
                            {!isMini && <span className="fw-medium ms-3 text" style={{ color: "#B4B4B4" }}>Ringkasan</span>}
                        </Link>
                    </li>
                    <li style={{ marginBottom: "44px" }}>
                        <Link to="/admin/laporan" className={`nav-link d-flex ${location.pathname === "/admin/laporan" ? "active-link" : ""}`} >
                            <img src={Images.LogoLaporan} width={24} className="icon" />
                            {!isMini && <span className="fw-medium ms-3 text" style={{ color: "#B4B4B4" }}>Laporan</span>}
                        </Link>
                    </li>
                    <li style={{ marginBottom: "44px" }}>
                        <Link to="/admin/profil" className={`nav-link d-flex ${location.pathname === "/admin/profil" ? "active-link" : ""}`} >
                            <img src={Images.LogoProfile} width={24} className="icon" />
                            {!isMini && <span className="fw-medium ms-3 text" style={{ color: "#B4B4B4" }}>Profile</span>}
                        </Link>
                    </li>
                </ul>

                <div className="mt-auto">
                    <Link to="/" className="nav-link d-flex">
                        <img src={Images.LogoLogout} width={24} />
                        {!isMini && <span className="fw-medium ms-3 fs-5" style={{ color: "#C40C0C" }}>Profile</span>}
                    </Link>
                </div>
            </div>

            {/* Wrapper untuk Navbar Atas dan Konten */}
            <div className="d-flex flex-column w-100">
                {/* Navbar Atas */}
                <div style={{ display: "flex", alignItems: "center", padding: "36px 52px 36px 40px" }}>
                    <button onClick={toggleSidebar} className="btn border-0 p-0">
                        <img src={Images.LogoHamburger} alt="Hamburger Menu" />
                    </button>
                    <span className="fw-medium fs-4" style={{ marginLeft: "40px" }}>
                        {getTextByPath(location.pathname)}
                    </span>
                    <div className="btn-group ms-auto">
                        <button type="button" className="btn rounded-4 border-0" data-bs-toggle="dropdown" data-bs-offset="0,24" style={{ backgroundColor: "#F1F0F0", padding: "14px" }}>
                            <img src={Images.LogoNotification} />
                            <span className="position-absolute rounded-circle" style={{ top: "16px", right: "17px", padding: "5px", backgroundColor: "#FF0000" }}>
                                <span className="visually-hidden">New alerts</span>
                            </span>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end rounded-4 shadow border-0" style={{ width: "270px" }}>
                            <li style={{ padding: "2px 16px 0px 16px" }}>
                                <img className="me-1" src={Images.LogoNotification} width={20} />
                                <span style={{ fontSize: "12px", fontWeight: "500" }}>Notifikasi</span>
                            </li>
                            <li><hr className="dropdown-divider" /></li>
                            <li className="position-relative" style={{ padding: "4px 16px 4px 16px", height: "310px", overflowY: "auto" }}>
                                <div className="position-absolute top-50 start-50 translate-middle">
                                    <span style={{ fontSize: "12px" }}>Tidak Ada Notifikasi</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Konten */}
                <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 132px)" }}>
                    <div className="container" style={{ padding: "0 52px" }}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LayoutAdmin
