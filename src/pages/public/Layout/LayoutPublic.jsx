import { Outlet, Link } from "react-router-dom"
import Images from "../../../images"

function LayoutPublic() {
    return (
        <>
            {/* <ul>
                <li><Link to="/">Pengaduan</Link></li>
                <li><Link to="daftar-aduan">Daftar Aduan</Link></li>
            </ul> */}

            <nav className="navbar navbar-expand-sm shadow" style={{ padding: "17px 0 0 0", marginBottom: "20px" }}>
                <div className="container">
                    <a href="/" style={{ marginBottom: "17px" }}>
                        <img src={Images.LogoLaporke} height="46" style={{ marginRight: "18px" }} />
                        <img src={Images.LogoTextLaporke} width="89.37" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation" style={{ marginBottom: "17px" }}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav ms-auto" style={{ marginBottom: "17px" }}>
                            <Link className="text-decoration-none text-black" to="/" style={{ margin: "11px 60px 11px 0px" }}>Pengaduan</Link>
                            <Link className="text-decoration-none text-black" to="daftar-aduan" style={{ margin: "11px 0px" }}>Daftar Aduan</Link>
                        </div>
                    </div>
                </div>
            </nav>

            <Outlet />
        </>
    )
}

export default LayoutPublic