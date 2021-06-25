import { useRoutes } from 'react-router-dom';
import './App.css';

import routes from './routes';

function App() {
  const routing = useRoutes(routes);

  return (
    <div className="App">
      <h1>MERN JWT Auth Demo</h1>
      {routing}
    </div>
  );
}

export default App;
