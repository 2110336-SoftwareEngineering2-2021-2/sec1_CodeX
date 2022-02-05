import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/app';
import { AuthProvider } from './app/auth';
import './styles.css';
ReactDOM.render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <App />
        </div>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
  document.getElementById('root')
);
