
import './App.css'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Components/Main/Main.jsx'
import Token from './Components/Token/Token';

function App() {


  return (
    <>
    <Router>
    <Routes>
      <Route path="/" element={<Main/>} />
       <Route path ="/transfer" element={<Token/>}/>
    </Routes>
  </Router>
  </>
  )
}

export default App

