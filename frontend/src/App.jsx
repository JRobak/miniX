import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Error404 from './components/Error404';
import Profile from './components/Profile';
import Entry from './components/Entry';
import LinkToHome from './components/LinkToHome';
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LinkToHome />}>
          <Route index element={<Home />} />
          <Route path="/entry/:id" element={<Entry />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

