import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import Login from './pages/Login/Login';
import SignUp from './pages/Signup/Signup';
import MainLayout from './components/Layout/MainLayout';
import Home from './pages/home/Home';

function App() {

  return (
    <Router>
      <MainLayout>
        <Switch>
          <Route exact path="/" >
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/create">
            <div>Create</div>
          </Route>
          <Route path="/posts/:id">
            <div>Detail post</div>
          </Route>
          <Route path="*">
            <div>404 page</div>
          </Route>
        </Switch>
      </MainLayout>
    </Router>
  )
}

export default App