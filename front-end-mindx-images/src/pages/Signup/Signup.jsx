import AuthLayout from '../../components/Layout/AuthLayout'
import { Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import axios from 'axios'
import Vars from '../../components/utility/Vars'

const SignUp = () => {
  const [email, setEmail] = useState('example@gmail.com')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const onHandleChange = e => {
    setEmail(e.target.value)
  }

  const onHandleChangePass = e => {
    setPassword(e.target.value)
  }
  const onHandleChangeConfirmPass = e => {
    setConfirmPassword(e.target.value)
  }

  const onHandleSubmit = async (e) => {
    e.preventDefault()
    console.log(email, password, confirmPassword)
    if (password !== confirmPassword) {
      alert(`your confirm password is not valid`)
      return
    }
    if (!Vars.authenticateUserInput(email, password)) {
      return
    }

    const res = await axios({
      url: 'http://localhost:8080/api/auth/signup',
      method: 'POST',
      data: {
        email,
        password
      },
    })

    if (res.data.success) {
      alert('Sign up success!')
      setEmail("")
      setPassword("")
      setConfirmPassword("")
    }
  }
  return (
    <AuthLayout>
      <div className="form-wrapper">
        <h2 className="text-center">Sign Up</h2>
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
          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={onHandleChangeConfirmPass}
            />
          </Form.Group>
          <Button className="mt-3" variant="primary" type="submit" block>
            Submit
        </Button>
        </Form>
      </div>
    </AuthLayout>
  )
}

export default SignUp