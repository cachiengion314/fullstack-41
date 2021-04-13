import AuthLayout from '../../components/layout/AuthLayout'
import { Form, Button } from 'react-bootstrap'
import { useState, useContext } from 'react'
import axios from '../../api'
import { useHistory } from "react-router-dom"
import Vars from '../../utility/Vars'
import { AuthContext } from "../../App"

const Login = () => {
  const history = useHistory()
  const { setUser } = useContext(AuthContext)
  const [email, setEmail] = useState('cachiengion314@gmail.com') // email: cachiengion314@gmail.com
  const [password, setPassword] = useState('') // password: 1234

  const onHandleChange = e => {
    setEmail(e.target.value)
  }

  const onHandleChangePass = e => {
    setPassword(e.target.value)
  }

  const onHandleSubmit = async (e) => {
    e.preventDefault()
    console.log(email, password)

    // origin: http://localhost:3000
    // call server http://localhost:8080
    try {
      const res = await axios({
        url: '/api/auth/login',
        method: 'POST',
        data: {
          email,
          password
        },
      })

      if (res.data.success) {
        Vars.signIn(res.data.data.token, setUser, history)
      }
    } catch (err) {
      console.log(`login.onHandleSubmit.err`, err)
    }
  }

  return (
    <AuthLayout>
      <div className="form-wrapper">
        <h2 className="text-center">Login</h2>
        <Form onSubmit={onHandleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={onHandleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={onHandleChangePass}
            />
          </Form.Group>
          <Button className="mt-3" variant="primary" type="submit" block>
            Submit
          </Button>
        </Form>
      </div>
    </AuthLayout>
  );
}

export default Login