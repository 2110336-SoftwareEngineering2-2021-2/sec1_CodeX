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
import TestPage from './pages/TestPage';

export function App() {
  return (
    <>
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
        <Route
          exact
          path="/search"
          element={<SearchPage />}
        />
        <Route exact path="/testPage" element={<TestPage />} />
      </Routes>
    </>
  );
}
export default App;
