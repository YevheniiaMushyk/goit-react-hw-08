import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectIsRefreshing } from "../redux/auth/selectors";

/**
 * - If the route is private and the user is logged in, render the component
 * - Otherwise render <Navigate> to redirectTo
 */

const PrivateRoute = ({ children, redirectTo = "/login" }) => {
	const isLoggedIn = useSelector(selectIsLoggedIn);
	const isRefreshing = useSelector(selectIsRefreshing);

	return isLoggedIn && isRefreshing ? children : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
