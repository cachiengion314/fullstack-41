import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import Login from './pages/login/Login';
import SignUp from './pages/signup/Signup';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/home/Home'
import React from "react"
import PublicRoute from "./route/PublicRoute"
import ProtectedRoute from "./route/ProtectedRoute"
import GuestRoute from "./route/GuestRoute"
import Vars from './utility/Vars';
import DetailPost from './components/post-card/DetailPost';

export const AuthContext = React.createContext()

function App() {
  const [user, setUser] = React.useState(null)

  const controlUserSignStatus = async () => {
    if (Vars.isUserSignIn()) {
      const succsess = await Vars.getAndSetUserData(setUser)
      if (!succsess) {
        Vars.signOut(setUser)
      }
      return
    }
    Vars.signOut(setUser)
  }
  React.useEffect(() => {
    controlUserSignStatus()
    // eslint-disable-next-line
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Router>
        <MainLayout>
          <Switch>
            <PublicRoute exact path="/" >
              <Home />
            </PublicRoute>
            <GuestRoute path="/login" user={user}>
              <Login />
            </GuestRoute>
            <GuestRoute path="/signup" user={user}>
              <SignUp />
            </GuestRoute>
            <ProtectedRoute path="/create">
              <div>Create</div>
            </ProtectedRoute>
            <PublicRoute path="/posts/:id">
              <DetailPost />
            </PublicRoute>
            <PublicRoute path="*">
              <div>404 page</div>
            </PublicRoute>
          </Switch>
        </MainLayout>
      </Router>
    </AuthContext.Provider>
  )
}

export default App