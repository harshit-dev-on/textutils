import './App.css';
import Navbar from './Components/Navbar';
import About from './Components/About';
import TextInput from './Components/TextInput';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container my-4">
        <Routes>
          <Route exact path="/about" element={<About />} />
          <Route exact path="/" element={<TextInput />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
