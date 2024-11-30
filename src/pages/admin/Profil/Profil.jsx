function Profil() {
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
                    <div className="tab-content">
                        <div className="tab-pane show active" id="edit-profil">111</div>
                        <div className="tab-pane" id="keamanan">222</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profil