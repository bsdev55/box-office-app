import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Starred from './Pages/Starred';
import MainLayout from "./component/MainLayout";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/starred" element={<Starred />} />
        </Route>
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
