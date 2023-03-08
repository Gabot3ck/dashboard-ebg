import {Route, Routes, BrowserRouter} from 'react-router-dom';
import { Login } from "./components/pages/auth/Login";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { Home } from "./components/pages/home/Home";
import {AuthProvider} from './context/authContext';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './store/store';


function App() {
  


  return (<>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/login" element={<Login />}/>
            <Provider store={ store }>
              <Route path="/home/*" element={
                <ProtectedRoute>
                  <Home/>
                </ProtectedRoute>
              }/>
            </Provider>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
        
            
  </>)
}

export default App;
