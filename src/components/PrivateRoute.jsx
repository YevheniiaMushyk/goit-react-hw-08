import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectIsRefreshing } from "../redux/auth/selectors";

const PrivateRoute = ({ children, redirectTo = "/login" }) => {
	const isLoggedIn = useSelector(selectIsLoggedIn);
	const isRefreshing = useSelector(selectIsRefreshing);

	return isLoggedIn && isRefreshing ? children : <Navigate to={redirectTo} replace />;
};

export default PrivateRoute;
