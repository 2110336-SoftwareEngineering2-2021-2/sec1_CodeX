import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/app';
import './styles.css'
ReactDOM.render(
  <StrictMode>
      <BrowserRouter>
        <div className="App">
          <App />
        </div>
      </BrowserRouter>
    </StrictMode>,
    document.getElementById('root')
);
