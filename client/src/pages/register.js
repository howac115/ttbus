import React, { useEffect, useState } from 'react'
import axios from '../commons/axios.js';

import { Form, Button } from 'react-bootstrap'
import { Divider, message, Typography } from 'antd'

const { Text, Link } = Typography;

export default function Register(props) {

    const [school, setSchool] = useState('');
    const [contact, setContact] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onRegister = async () => {
        let response = await axios.post('/user/register',
            {
                schoolName: school, 
                schoolContactName: contact,
                schoolContactNumber: number,
                email: email, 
                password: password
            }).catch(
                err => {
                    if (err.response.status === 404) {
                        console.log('authentication failed')
                    }
                }
            )
        if (response) {
            console.log(response.data.user)
            message.success('Account successfully registered!')
            props.history.push('/')
        }
    }

    return (
        <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '30vw', marginTop: '20vh' }}>
            <h2>Sign Up</h2>
            <Divider />
            <Form>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>School Name</Form.Label>
                    <Form.Control type="school name" placeholder="enter school name"
                        onChange={e => setSchool(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Contact Name</Form.Label>
                    <Form.Control type="contact name" placeholder="enter contact name"
                        onChange={e => setContact(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control type="contact number" placeholder="enter contact number"
                        onChange={e => setNumber(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="new email" placeholder="Enter email"
                        onChange={e => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"
                        onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Text>Already have an account? <Link href="/">
                    Login
                </Link></Text>
            </Form>
            <Button variant="primary" onClick={onRegister}
                style={{ marginTop: '2vh' }}>
                Submit
            </Button>
        </div >
    )
}
