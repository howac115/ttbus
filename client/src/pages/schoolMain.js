import React, { useEffect, useState } from 'react'
import axios from '../commons/axios.js';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Divider, message, Typography, PageHeader, Table } from 'antd'

const { Text, Link } = Typography;

export default function SchoolMain(props) {


    const [schoolName, setSchoolName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [schoolType, setSchoolType] = useState('');
    const [secureParking, setSecureParking] = useState('false');
    const [parkingSpaces, setParkingSpaces] = useState(0);
    const [openAreas, setOpenAreas] = useState(0);
    const [visitingSchoolName, setVisitingSchoolName] = useState('');
    const [nearestHostSchoolName, setNearestHostSchoolName] = useState('');
    const [distance, setDistance] = useState('');
    const [interestMessage, setMessage] = useState('');

    const [hostPart, setHostPart] = useState('none');
    const [visitPart, setVisitPart] = useState('none');

    const [interestList, setInterestList] = useState([]);

    const columns = [
        {
            title: 'School Name',
            dataIndex: 'schoolName',
            key: 'schoolName',
            render: (text, record, index) => <Link onClick={() => props.history.push(window.location.pathname + '/schedule', { record, startDate: record.startDate ? record.startDate : '', endDate: record.endDate ? record.endDate : '' })}> {text} </Link>
        },
        {
            title: 'School Type',
            dataIndex: 'schoolType',
            key: 'schoolType',
        }
    ];

    useEffect(async () => {
        if (!localStorage.getItem('user')) {
            message.error('please login to view this page')
            props.history.push('/')
        }
        setSchoolName(localStorage.getItem('school'))
        let response = await axios.get("/interest?schoolName=" + localStorage.getItem('school'));
        setInterestList(response.data.allInterest);
    }, []);

    const handleGoBack = () => {
        localStorage.clear()
        props.history.push('/')
    }

    const interestCreate = async (props) => {
        let response = await axios.post('/interest/create',
            {
                schoolName: schoolName,
                schoolEmail: localStorage.getItem('user'),
                address: address,
                city: city,
                state: state,
                postalCode: postalCode,
                schoolType: schoolType,
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
            message.success('Interest successfully created!')

            let email = await axios.post('/email/send?email=travellingtechybus@gmail.com', {
                type: 'create',
                subject: 'New Submitted Interest!',
                text: schoolName + ' has submitted a new expression of interest!',
                address: address,
                schoolType: schoolType,
                message: interestMessage
            })
            console.log(email)
            window.location.reload()
        }
    }


    return (
        <div>
            <PageHeader title="School Main Page"
                onBack={handleGoBack}
            />
            <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '50vw' }}>
                <h2>Submitted Expression of Interest</h2>
                <Divider />
                <Table columns={columns} dataSource={interestList} />
                <h2>Submit Expression of Interest</h2>
                <Divider />
                <h3>General Information</h3>
                <Form style={{ marginTop: '2vh' }}>
                    <Row className="mb-3">
                        <Form.Group as={Col} className="mb-3" controlId="formGridschoolname">
                            <Form.Label>Shcool Name</Form.Label>
                            <Form.Control type="school name" placeholder="enter school name"
                                value={localStorage.getItem('school')} />
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
                    <Form.Label>School Type</Form.Label>
                    <fieldset>
                        <Form className="mb-3" style={{ marginTop: '2vh' }}>
                            <Form.Check
                                type="radio"
                                inline
                                label="Hosting School"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                                onChange={(e) => { setSchoolType("Hosting School"); setHostPart("block"); setVisitPart('none') }}
                            />
                            <Form.Check
                                style={{ marginLeft: '2vw' }}
                                type="radio"
                                inline
                                label="Visiting School"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios2"
                                onChange={(e) => { setSchoolType("Visiting School"); setHostPart("none"); setVisitPart('block') }}
                            />
                        </Form>
                    </fieldset>
                    <div style={{ display: hostPart, marginTop: '2vh' }}>
                        <h3>Hosting Shcool Only</h3>
                        <Form.Label style={{ marginTop: '1vh' }}>Secure Parking</Form.Label>
                        <fieldset>
                            <Form className="mb-3" style={{ marginTop: '1vh' }}>
                                <Form.Check
                                    type="radio"
                                    inline
                                    label="Yes"
                                    name="Parking"
                                    id="Parking"
                                    onChange={e => setSecureParking("true")}
                                />
                                <Form.Check
                                    type="radio"
                                    inline
                                    label="No"
                                    name="Parking"
                                    id="Parking"
                                    onChange={e => setSecureParking("false")}
                                />
                            </Form>
                        </fieldset>
                        <Row className="mb-3">
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

                        <Form.Group className="mb-3" controlId="formBasicPassword" >
                            <Form.Label>Message</Form.Label>
                            <Form.Control
                                as="textarea"
                                type="message"
                                placeholder="enter message"
                                style={{ height: '100px' }}
                                onChange={e => setMessage(e.target.value)} />
                        </Form.Group>

                    </div>
                    <div style={{ display: visitPart, marginTop: '2vh' }}>
                        <h3>Visiting Shcool Only</h3>
                        <Row className="mb-3" style={{ marginTop: '2vh' }}>
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
                                style={{ height: '100px' }}
                                onChange={e => setMessage(e.target.value)} />
                        </Form.Group>
                    </div>
                </Form>
                <Button variant="primary" onClick={interestCreate}>
                    Submit
                </Button>
            </div >
        </div>


    )
}
