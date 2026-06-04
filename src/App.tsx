import { Routes, Route } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import Home from "./pages/Home";

export default function App() {
  return (
    <HelmetProvider>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </HelmetProvider>
  );
}
