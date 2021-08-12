import React from 'react';
import { Provider } from 'react-redux'
import { store } from './store/store'

function App() {
  return (
    <Provider store={store}>
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
