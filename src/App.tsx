import { Routes, Route } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import Home from "./pages/Home";
import Chat from "./pages/Chat";

export default function App() {
  return (
    <HelmetProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </HelmetProvider>
  );
}
