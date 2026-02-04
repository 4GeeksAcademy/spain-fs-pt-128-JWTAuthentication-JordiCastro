import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {


	// Hook useLocation para saber en que página en concreto nos encontramos y así poder modificar a nuestro gusto en funcion del link
	const location = useLocation();
	const isLogin = location.pathname === "/";

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/private">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				{isLogin &&
					<div className="ml-auto">
						<Link to="/register">
							<button className="btn btn-primary">You can register here</button>
						</Link>
					</div>
				}
			</div>
		</nav>
	);
};