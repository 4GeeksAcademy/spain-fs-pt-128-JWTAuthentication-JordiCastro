import { Link, useLocation, useNavigate } from "react-router-dom";

export const Navbar = () => {


	// Hook useLocation para saber en que página en concreto nos encontramos y así poder modificar a nuestro gusto en funcion del link
	const location = useLocation();
	const isLogin = location.pathname === "/";
	const isPrivate = location.pathname === "/private";
	const navigate = useNavigate()

	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/");
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				{isLogin &&
					<div className="ml-auto">
						<Link to="/register">
							<button className="btn btn-primary">You can register here</button>
						</Link>
					</div>
				}
				{isPrivate &&
					<div className="ml-auto">
						<div className="btn-group">
							<button type="button" className="btn dropdown-toggle btn-outline-secondary" data-bs-toggle="dropdown" aria-expanded="false">
								<i className="fa-solid fa-gear"></i>
							</button>
							<ul className="dropdown-menu">
								<li><a className="dropdown-item" href="#">Profile</a></li>
								<li><a className="dropdown-item" href="#">Accesibility</a></li>
								<li><a className="dropdown-item" href="#">Privacy and Data</a></li>
								<li><hr className="dropdown-divider" /></li>
								<li>
									<button className="dropdown-item text-danger" onClick={handleLogout}>
										Log out
									</button>

								</li>
							</ul>
						</div>


					</div>


				}
			</div>
		</nav >
	);
};