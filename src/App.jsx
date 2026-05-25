// src/App.jsx
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router/AppRouter';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        
        {/* Este main asegura que el footer siempre esté al final aunque haya poco contenido */}
        <main className="flex-grow-1">
          <AppRouter />
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;