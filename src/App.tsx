import React, {FC} from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import AppLayout from './components/AppLayout';

import routes from './routes';


const App: FC = () => {

  return (
    <Router>
      <Routes>
        {
          routes.map(item => {
            return item.layout === 'app' ? (
              <Route key={item.path} element={<ProtectedRoute/>}>
                <Route path={item.path} element={<AppLayout> {item.element} </AppLayout>}/>
              </Route>
            ) : (
              <Route key={item.path}  path={item.path} element={item.element}/>
            )
          })
        }
      </Routes>
    </Router>
  );
};

export default App;

