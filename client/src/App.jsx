import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TenderList from "./components/TenderList";
import TenderDetails from "./components/TenderDetails";
import { CssBaseline, Container } from "@mui/material";

function App() {
  return (
    <Router>
      <CssBaseline />
      <Container maxWidth="md">
        <Routes>
          <Route path="/" element={<TenderList />} />
          <Route path="/tender/:id" element={<TenderDetails />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
