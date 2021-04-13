import AuthLayout from '../../components/layout/AuthLayout'
import { Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import axios from '../../api'
import Vars from '../../utility/Vars'
import { AuthContext } from "../../App"
import { useHistory } from "react-router-dom"
import React from "react"

const SignUp = () => {
  const history = useHistory()
  const { setUser } = React.useContext(AuthContext)
  const [email, setEmail] = useState('example@gmail.com')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')  // note that: setState is a async funciton
  const [isMatch, setMatch] = useState(false)

  const onHandleChange = e => {
    setEmail(e.target.value)
  }

  const onHandleChangePass = e => {
    setPassword(e.target.value)
  }
  const comparePassword = (password, confirmPassword) => {
    if (password === confirmPassword) {
      setMatch(true)
    } else {
      setMatch(false)
    }
  }
  const onHandleChangeConfirmPass = e => {
    const confirmPassword = e.target.value
    setConfirmPassword(confirmPassword) // setConfirmPassword is async function so the confirmPassword will not have the newest info
    // cannot compare: password === confirmPassword in this callback
    comparePassword(password, confirmPassword)
  }

  const onHandleSubmit = async (e) => {
    e.preventDefault()
    console.log(email, password, confirmPassword)
    if (password !== confirmPassword) {
      alert(`your confirm password is not valid`)
      return
    }
    if (!Vars.authenticateUserInput(email, password,
      () => { alert(`You need to check your email again! Your providing are probably fake!`) },
      () => { alert(`Check your password again! Maybe your password is not strong enough!`) })) {
      return
    }
    // axios mặc định status server không trả về 200 thì => thorw err
    // fetch không có cơ chế trên, check response.ok
    try {
      const res = await axios({
        url: '/api/auth/signup',
        method: 'POST',
        data: {
          email,
          password
        },
      })
      if (res.data.success) {
        Vars.signIn(res.data.data.token, setUser, history)
        return
      }
      return alert("something went wrong")
    } catch (err) {
      return alert(`${err}`)
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
            {
              (confirmPassword && !isMatch) &&
              <span style={{ color: "red" }}>wrong confirm password</span >
            }
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