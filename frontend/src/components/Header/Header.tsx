import {ReactElement} from "react";
import {useAuth} from "../../context/AuthContext";
import {Link} from "react-router-dom";
import {LOGIN, REGISTRATION} from "../../constants/pathConstants";

const Header = (): ReactElement => {
    const {isAuthenticated, logout} = useAuth();
    return (
        <header>
            <nav className="navbar navbar-dark navbar-expand-md bg-dark">
                <div className="container-fluid"><a className="navbar-brand" href="#">Brand</a><button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navcol-1"><span className="visually-hidden">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
                    <div id="navcol-1" className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item"><a className="nav-link active" href="#">First Item</a></li>
                            <li className="nav-item"><a className="nav-link" href="#">Second Item</a></li>
                            <li className="nav-item"><a className="nav-link" href="#">Third Item</a></li>
                        </ul>
                    </div>
                    <div className="text-dark me-lg-5" data-reflow-type="search" data-reflow-placeholder="Search post">
                        <div className="reflow-search">
                            <div className="ref-input-wrapper"><input className="ref-search" type="text" placeholder="Search post" /><span className="ref-cancel-search" style={{display: "none"}}></span></div>
                            <button className="ref-button" type="submit" style={{display: "none"}}>Search</button>
                        </div>
                    </div>
                    {isAuthenticated() ?
                        <>
                            <img className="rounded-circle bg-primary border border-1 border-white" width="30" height="30" src="" />
                            <button className="btn btn-primary" type="button" onClick={() => logout()}>Logout</button>
                        </>
                    :
                        <>
                            <Link to={LOGIN} className="btn btn-primary me-lg-3" type="button">Login</Link>
                            <Link to={REGISTRATION} className="btn btn-primary" type="button">Register</Link>
                        </>
                    }
                </div>
            </nav>
        </header>
    )
}

export default Header;