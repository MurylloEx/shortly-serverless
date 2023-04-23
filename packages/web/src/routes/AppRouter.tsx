import { HomePage, ViewerPage } from 'src/pages';
import { HashRouter, Route, Routes } from 'react-router-dom';

export const AppRouter = () => (
  <HashRouter>
    <Routes>
      <Route 
        path="/"
        element={<HomePage />} 
      />
      <Route 
        path="/view/:code" 
        element={<ViewerPage />} 
      />
    </Routes>
  </HashRouter>
);
