import {ReactElement} from "react";

const Header = (): ReactElement => {
    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Brand</a>
                    <button className="navbar-toggler" type="button" data-mdb-toggle="collapse"  aria-label="Toggle navigation"
                            aria-controls="navbarSupportedContent" aria-expanded="false" data-mdb-target="#navbarSupportedContent">
                        <i className="fa fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link text-white" href="#">Link</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button"
                                   data-mdb-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li>
                                        <a className="dropdown-item" href="#">Action</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">Another action</a>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">Something else here</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>

                        <ul className="navbar-nav d-flex flex-row me-1">
                            <li className="nav-item me-3 me-lg-0">
                                <a className="nav-link text-white" href="#"><i className="fa-solid fa-user"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;