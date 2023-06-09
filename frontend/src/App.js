import './App.css';
import RoutesApp from './routes';
import { AuthProvider } from './context/authContext';

function App() {
  return (
    <AuthProvider>
    <RoutesApp/>
    </AuthProvider>
  );
}

export default App;
