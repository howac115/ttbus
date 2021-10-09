import React, { useEffect, useState } from 'react'
import axios from '../commons/axios.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import { Form, Button } from 'react-bootstrap'
import { Divider, Typography } from 'antd'

const { Text, Link } = Typography;

export default function App(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async () => {
    let response = await axios.post('/user/login', { email: email, password: password }).catch(
      err => {
        if (err.response.status === 404) {
          console.log('authentication failed')
        }
      }
    )
    if (response) {
      console.log(response.data.user)
      if (response.data.user.admin) {
        props.history.push('/admin')
      } else {
        props.history.push('/school')
      }

    }
  }

  return (
    <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '30vw', marginTop: '20vh' }}>
      <h2>Sign In</h2>
      <Divider />
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email"
            onChange={e => setEmail(e.target.value)} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password"
            onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Text>Don't have an account? <Link href="/register">
          Register
        </Link></Text>
      </Form>
      <Button variant="primary" onClick={onLogin}
        style={{ marginTop: '2vh' }}>
        Submit
      </Button>
    </div >
  )
}
