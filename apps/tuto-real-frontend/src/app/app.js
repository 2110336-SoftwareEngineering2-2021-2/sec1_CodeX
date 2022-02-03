// import NxWelcome from './nx-welcome';

import { Route, Routes } from 'react-router-dom';

import NavBar from './components/navbar/navbar';
import ChangeAccountTypePage from './pages/ChangeAccountTypePage';
import HomePage from './pages/HomePage';
import LogInPage from './pages/LogInPage';
import ProfilePage from './pages/ProfilePage';
import RegistrationPage from './pages/RegistrationPage';
import ChangeAccountApprovePage from './pages/ChangeAccountApprovePage'


export function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/login" element={<LogInPage />} />
        <Route exact path="/register" element={<RegistrationPage />} />
        <Route exact path="/profile" element={<ProfilePage />} />
        <Route exact path="/changeacctype" element={<ChangeAccountTypePage />} />
        <Route exact path="/changeaccapprove" element={<ChangeAccountApprovePage />} />
      </Routes>

      {/* <NxWelcome title="tuto-real-frontend" /> */}
      {/* <div /> */}

      {/* START: routes */}
      {/* These routes and navigation have been generated for you */}
      {/* Feel free to move and update them to fit your needs */}
      {/* <br />
      <hr />
      <br /> */}
      {/* <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </div>
      <Routes>
      <Route
        path="/"
        exact
        element={(
          <div>
            This is the generated root route.{' '}
            <Link to="/page-2">Click here for page 2.</Link>
          </div>
        )}
      />
      <Route
        path="/page-2"
        exact
        element={(
          <div>
            <Link to="/">Click here to go back to root page.</Link>
          </div>
        )}
      />
      </Routes> */}
      {/* END: routes */}
    </>
  );
}
export default App;
