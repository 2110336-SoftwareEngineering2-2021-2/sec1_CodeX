import { useState, createContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import NavBar from './components/navbar/navbar';
import HomePage from './pages/HomePage';
import LogInPage from './pages/LogInPage';
import RegistrationPage from './pages/RegistrationPage';
import ChangeAccountApprovePage from './pages/ChangeAccountApprovePage';
import ChangeAccountRequestListPage from './pages/ChangeAccountRequestListPage';
import ProfilePage from './pages/ProfilePage';
import ChangeAccountTypePage from './pages/ChangeAccountTypePage';
import SearchPage from './pages/SearchPage';

export const SearchContext = createContext({
  searchText: '',
  setSearchText: () => null,
});

export function App() {
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    console.log(searchText);
  }, [searchText]);

  return (
    <SearchContext.Provider value={{ searchText, setSearchText }}>
      {/* <> */}
      <NavBar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/login" element={<LogInPage />} />
        <Route exact path="/register" element={<RegistrationPage />} />
        <Route exact path="/profile/:_id" element={<ProfilePage />} />
        <Route
          exact
          path="/changAaccType"
          element={<ChangeAccountTypePage />}
        />
        <Route
          exact
          path="/changeAccApprove"
          element={<ChangeAccountApprovePage />}
        />
        <Route
          exact
          path="/requestList"
          element={<ChangeAccountRequestListPage />}
        />
        <Route exact path="/search" element={<SearchPage />} />
      </Routes>
    </SearchContext.Provider>
    // </>
  );
}
export default App;
