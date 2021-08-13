import React from 'react';
import { Provider } from 'react-redux'
import { store } from './store/store'
import TestComp from './components/test';

function App() {

  
  return (
    <Provider store={store}>
      <TestComp/>
      {/* <Router>
        <Container className="container App">
          <SideBar />
          <MainContentWraper />
        </Container>
      </Router> */}
    </Provider>
  );
}

export default App;
