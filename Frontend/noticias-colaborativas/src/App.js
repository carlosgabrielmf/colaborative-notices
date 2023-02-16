import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import NoticeCreate from './components/NoticeCreate/NoticeCreate';
import NoticeSearch from './components/NoticeSearch/NoticeSearch';
import EditNotice from './components/EditNotice/EditNotice';
import Footer from './components/Footer/Footer';
import NotFound from './components/NotFound/NotFound';

import './App.css';

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<NoticeSearch />} />
        <Route path='/login' element={<Login />} />
        <Route path='/users' element={<Register />} />
        <Route path='/notice' element={<NoticeCreate />} />
        <Route path='/notice/:idNotice/edit' element={<EditNotice />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
