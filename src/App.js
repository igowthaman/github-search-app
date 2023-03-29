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
        <Route path='/github-search-app/' element={<HomePage/>} />
        <Route path='/github-search-app/:userid' element={<UserPage/>}/>
        <Route path='/github-search-app/:userid/:repoid' element={<RepoPage/>}/>
        <Route path='/github-search-app/*' element={<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
