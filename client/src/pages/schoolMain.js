import React, { useEffect, useState } from 'react'
import axios from '../commons/axios.js';


import { Form, Button, Row, Col } from 'react-bootstrap'
import { Divider, message, Typography } from 'antd'

const { Text, Link } = Typography;

export default function SchoolMain() {


    const [schoolName, setSchoolName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [shcoolType, setShcoolType] = useState('');
    const [secureParking, setSecureParking] = useState('false');
    const [parkingSpaces, setParkingSpaces] = useState(0);
    const [openAreas, setOpenAreas] = useState(0);
    const [visitingSchoolName, setVisitingSchoolName] = useState('');
    const [nearestHostSchoolName, setNearestHostSchoolName] = useState('');
    const [distance, setDistance] = useState('');
    const [interestMessage, setMessage] = useState('');

    const interestCreate = async (props) => {
        let response = await axios.post('/interest/create',
            {
                shcoolName: schoolName, 
                address: address,
                city: city,
                state: state, 
                postalCode: postalCode,
                shcoolType: shcoolType,
                secureParking: secureParking,
                parkingSpaces: parkingSpaces,
                openAreas: openAreas,
                visitingSchoolName: visitingSchoolName,
                nearestHostSchoolName: nearestHostSchoolName,
                distanceFromNearestHostSchool: distance,
                message: interestMessage,
                interestID: 0

            }).catch(
                err => {
                    if (err.response.status === 404) {
                        console.log('create interest failed')
                    }
                }
            )
        if (response) {
            console.log(response.data.user)
            message.success('Interest successfully created!')
        }
    }


    return (
        <div>
            <h1>school main page</h1>
            <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '50vw', marginTop: '20vh' }}>
            <h2>Create Interest</h2>
            <Divider />
            <h3>General Information</h3>
            <Divider />
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} className="mb-3" controlId="formGridschoolname">
                        <Form.Label>Shcool Name</Form.Label>
                        <Form.Control type="school name" placeholder="enter school name"
                            onChange={e => setSchoolName(e.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3" controlId="formBasiccity">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="city" placeholder="enter city"
                        onChange={e => setCity(e.target.value)} />
                    </Form.Group>

                </Row>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="address" placeholder="enter address"
                        onChange={e => setAddress(e.target.value)} />
                </Form.Group>

                <Row className="mb-3">
                    
                    <Form.Group as={Col} className="mb-3" controlId="formBasicState">
                        <Form.Label>State</Form.Label>
                        <Form.Control type="state" placeholder="enter state"
                            onChange={e => setState(e.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control type="postalCode" placeholder="enter Postal Code"
                            onChange={e => setPostalCode(e.target.value)} />
                    </Form.Group>
                </Row>

                <fieldset>
                    <Form.Group as={Row} className="mb-3">
                    <Form.Label as="legend" column sm={2}>
                        Shcool Type
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Check
                        type="radio"
                        label="Hosting School"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios1"
                        onChange={e => setShcoolType("Hosting School")}
                        />
                        <Form.Check
                        type="radio"
                        label="Visiting School"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios2"
                        onChange={e => setShcoolType("Visiting School")}
                        />
                    </Col>
                    </Form.Group>
                </fieldset>

                <h3>Hosting Shcool Only</h3>
                <Divider />
                <Row className="mb-3">

                    <fieldset>
                        <Form.Group as={Col} className="mb-3" controlId="formBasicPassword">
                        <Form.Label as="legend" column sm={1}>
                            Secure Parking
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Check
                            type="radio"
                            label="Yes"
                            name="Parking"
                            id="Parking"
                            onChange={e => setSecureParking("true")}
                            />
                            <Form.Check
                            type="radio"
                            label="No"
                            name="Parking"
                            id="Parking"
                            onChange={e => setSecureParking("false")}
                            />
                        </Col>
                        </Form.Group>
                    </fieldset>
                    
                    <Form.Group as={Col} className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Parking Spaces</Form.Label>
                        <Form.Control type="parkingSpaces" placeholder="enter number of parking Spaces"
                            onChange={e => setParkingSpaces(e.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Open Areas</Form.Label>
                        <Form.Control type="openAreas" placeholder="enter number of Open Areas"
                            onChange={e => setOpenAreas(e.target.value)} />
                    </Form.Group>
                </Row>

                <h3>Visiting Shcool Only</h3>
                <Divider />
                <Row className="mb-3">
                    <Form.Group as={Col} className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Visiting School Name</Form.Label>
                        <Form.Control type="visitingSchoolName" placeholder="enter visitingSchoolName"
                            onChange={e => setVisitingSchoolName(e.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Nearest Host School Name</Form.Label>
                        <Form.Control type="nearestHostSchoolName" placeholder="enter nearest Host SchoolName"
                            onChange={e => setNearestHostSchoolName(e.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Distance From Nearest HostSchool</Form.Label>
                        <Form.Control type="distanceFromNearestHostSchool" placeholder="enter Distance From Nearest HostSchool"
                            onChange={e => setDistance(e.target.value)} />
                    </Form.Group> 
                </Row>

                <Form.Group className="mb-3" controlId="formBasicPassword" >
                    <Form.Label>Message</Form.Label>
                    <Form.Control 
                        as="textarea"
                        type="message" 
                        placeholder="enter message"
                        style={{height: '100px'}}
                        onChange={e => setMessage(e.target.value)} />
                </Form.Group>


            </Form>
            <Button variant="primary" onClick={interestCreate}
                style={{ marginTop: '2vh' }}>
                Submit
            </Button>
            </div >
        </div>

        
    )
}
