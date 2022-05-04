import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ApartsListPage from './pages/ApartsListPage/ApartsListPage';
import ApartPage from './pages/ApartPage/ApartPage';

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ApartsListPage />} />
          <Route path='/:id' element={<ApartPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
