import { BrowserRouter } from "react-router-dom";
import PageRoutes from "./pages/PageRoutes";
import "./App.css";
import Navbar from "./components/Navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

function App() {
	return (
		<div>
			{" "}
			<ThemeProvider theme={darkTheme}>
				<CssBaseline />
				<BrowserRouter>
					<Navbar></Navbar>
					<PageRoutes></PageRoutes>
				</BrowserRouter>
			</ThemeProvider>
		</div>
	);
}

export default App;
