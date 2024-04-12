import { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { fetchContacts } from "../../redux/contactsOps";

import css from "./App.module.css";
const WelcomePage = lazy(() => import("./pages/WelcomePage"));
import ContactForm from "../ContactForm/ContactForm";
import SearchBox from "../SearchBox/SearchBox";
import ContactList from "../ContactList/ContactList";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(refresh());
	}, [dispatch]);

	return (
		<div>
			{/* <Layout> */}
			<Suspense fallback={<Loader />}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route
						path="/register"
						element={
							<RestrictedRoute>
								<Registration />
							</RestrictedRoute>
						}
					/>
					<Route
						path="/login"
						element={
							<RestrictedRoute>
								<Login />
							</RestrictedRoute>
						}
					/>
					<Route
						path="/contacts"
						element={
							<PrivateRoute>
								<Contacts />
							</PrivateRoute>
						}
					/>
				</Routes>
			</Suspense>
			{/* </Layout> */}
			{/* <h1 className={css.title}>Phonebook</h1>
			<ContactForm />
			<SearchBox />
			{isLoading && <p>Loading contacts...</p>}
			{error && <p>{error}</p>}
			{items.length > 0 && <ContactList />} */}
		</div>
	);
}

export default App;
