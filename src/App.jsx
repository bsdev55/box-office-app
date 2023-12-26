import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient,QueryClientProvider } from 'react-query'
import Home from './Pages/Home';
import Starred from './Pages/Starred';
import Show from './Pages/Show';
import MainLayout from "./component/MainLayout";
function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/starred" element={<Starred />} />
          </Route>
          <Route path="/show/:showId" element={<Show />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
