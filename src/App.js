import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './components/homePage';
import UserPage from './components/userPage';
import ErrorPage from './components/errorPage';
import RepoPage from './components/repoPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/:userid' element={<UserPage/>}/>
        <Route path='/:userid/:repoid' element={<RepoPage/>}/>
        <Route path='/*' element={<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
