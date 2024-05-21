import logo from './logo.svg';
import './App.css';
import { BrowserRouter} from 'react-router-dom';
import AppRouter from './hub/navigation/approuter';
import Home from './hub/pages/home';
import React from 'react';
import Navigation from './hub/navigation/navigation';
import Footer from './hub/pages/footer';
import { AuthProvider } from './hub/function/authentication';

function App() {
  return (
      <div className='App'>
      <div style={{width: '100vw', minHeight: '100vh'}}>
        <BrowserRouter>
          <div style={{width: '100vw', display: 'flex', justifyContent: 'center'}}>
            <div id = 'widthAdjustment'>
              <AuthProvider>
                <Navigation/>
                <AppRouter/>
              </AuthProvider>
            </div>
          </div>
          <Footer/>
        </BrowserRouter>
        </div>
      </div>

  );
}

export default App;