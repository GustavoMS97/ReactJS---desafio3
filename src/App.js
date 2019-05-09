import React from 'react';
import './config/ReactotronConfig';
import { toast } from 'react-toastify';
import { Provider } from 'react-redux';
import Map from './pages/Map';
import SideBar from './components/SideBar';
import store from './store';
import GlobalStyle from './GlobalStyle';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  toast.configure();
  return (
    <Provider store={store}>
      <GlobalStyle />
      <SideBar />
      <Map />
    </Provider>
  );
}

export default App;
