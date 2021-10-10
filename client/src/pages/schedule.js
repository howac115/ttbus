import React, { useEffect, useState } from 'react'
import axios from '../commons/axios.js';
import { Button, PageHeader, Form, Input, DatePicker, message, Descriptions, Empty, Radio, InputNumber, Typography } from 'antd'
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Title, Paragraph } = Typography;
const { TextArea } = Input;

export default function Schedule(props) {

    const [interest, setInterest] = useState({});
    const [dates, setDates] = useState([]);
    const [hackValue, setHackValue] = useState();
    const [value, setValue] = useState();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [specialAct, setSpecialAct] = useState('To be confirmed');
    const [totalStudents, setTotalStudents] = useState('To be confirmed')
    const [costPerStudent, setcostPerStudent] = useState('To be confirmed')
    const [totalCost, setTotalCost] = useState('To be confirmed')
    const [cancelMessage, setCancelMessage] = useState('');

    const [createForm, setCreateForm] = useState('none');
    const [repConfirm, setRepConfirm] = useState('none');
    const [visitInfo, setVisitInfo] = useState('none');
    const [cancel, setCancel] = useState('none');
    const [empty, setEmpty] = useState('none');

    const [cancelInput, setCancelInput] = useState('none')
    const [showCancelMessage, setShowCancelMessage] = useState('none')

    useEffect(async () => {
        console.log(props.history.location.state.record)
        console.log(window.location.pathname)
        let response = await axios.get("/visit?interestID=" + props.history.location.state.record.interestID);
        if (response.data.visits.length > 0) {
            if (window.location.pathname.includes('admin')) {
                setVisitInfo('block')
                if (response.data.visits[0].specializedActivities) {
                    setSpecialAct(response.data.visits[0].specializedActivities)
                    setTotalStudents(response.data.visits[0].studentsParticipating)
                    setcostPerStudent(response.data.visits[0].costPerStudent)
                    setTotalCost(response.data.visits[0].totalCost)
                }
                if (response.data.visits[0].reasonForCancellation) {
                    setCancelMessage(response.data.visits[0].reasonForCancellation)
                    setShowCancelMessage('block')
                }
                setStartDate(response.data.visits[0].startDate)
                setEndDate(response.data.visits[0].endDate)
                console.log(Date.parse(startDate))
            } else if (response.data.visits[0].specializedActivities) {
                setVisitInfo('block')
                setCancel('block')
                setSpecialAct(response.data.visits[0].specializedActivities)
                setTotalStudents(response.data.visits[0].studentsParticipating)
                setcostPerStudent(response.data.visits[0].costPerStudent)
                setTotalCost(response.data.visits[0].totalCost)
                if (response.data.visits[0].reasonForCancellation) {
                    setCancelMessage(response.data.visits[0].reasonForCancellation)
                    setShowCancelMessage('block')
                    setCancel('none')
                }
                setStartDate(response.data.visits[0].startDate.slice(0, 10))
                setEndDate(response.data.visits[0].endDate.slice(0, 10))
            } else {
                setRepConfirm('block')
                setStartDate(response.data.visits[0].startDate.slice(0, 10))
                setEndDate(response.data.visits[0].endDate.slice(0, 10))
                console.log(moment(startDate))
            }
        } else if (window.location.pathname.includes('admin')) {
            setCreateForm('block')
        } else {
            console.log('pending')
            setEmpty('block')
        }
        setInterest(props.history.location.state.record);
    }, []);

    const disabledDate = current => {
        if (window.location.pathname.includes('admin')) {
            if (!dates || dates.length === 0) {
                return false;
            }
            const tooLate = dates[0] && current.diff(dates[0], 'months') > 1;
            const tooEarly = dates[1] && dates[1].diff(current, 'months') > 1;
            return tooEarly || tooLate;
        } else {
            const tooShort = dates[0] && current.diff(dates[0], 'days') < 7;
            const tooLong = dates[0] && current.diff(dates[0], 'days') > 21;
            return current && current < moment(startDate) || current > moment(endDate) || tooShort || tooLong
        }
    };

    const onOpenChange = open => {
        if (open) {
            setHackValue([]);
            setDates([]);
        } else {
            setHackValue(undefined);
        }
    }

    const visitCreate = async () => {
        let response = await axios.post('/visit/create',
            {
                interestID: interest.interestID,
                schoolName: interest.schoolName,
                schoolType: interest.schoolType,
                startDate: value[0].toISOString(),
                endDate: value[1].toISOString()

            }).catch(
                err => {
                    if (err.response.status === 404) {
                        console.log('create visit failed')
                    }
                }
            )
        if (response) {
            console.log(response.data)
            message.success('visit successfully created!')


            await axios.post('/email/send?email='+props.history.location.state.record.schoolEmail, {
                subject: 'New Scheduled Interest!',
                text: 'Admin has scheduled a new visit!'
            })

            window.location.reload()
        }
    }

    const visitUpdate = async () => {
        let updateBody = {}
        if (cancelMessage != '') {
            updateBody = {
                reasonForCancellation: cancelMessage
            }
        } else {
            updateBody = {
                startDate: value[0].toISOString(),
                endDate: value[1].toISOString(),
                specializedActivities: specialAct,
                studentsParticipating: totalStudents,
                costPerStudent: costPerStudent,
                totalCost: parseInt(totalStudents) * parseInt(costPerStudent)
            }
        }
        let response = await axios.post('/visit/update?interestID=' + interest.interestID.toString(),
            updateBody).catch(
                err => {
                    if (err.response.status === 404) {
                        console.log('create visit failed')
                    }
                }
            )
        if (response) {
            console.log(response.data)
            message.success('visit successfully created!')

            if (cancelMessage != '') {
                await axios.post('/email/send?email='+props.history.location.state.record.schoolEmail, {
                    subject: 'Cancelled Visiting',
                    text: props.history.location.state.record.schoolName + ' has cacelled the visit.'
                })
            }
            

            window.location.reload()
        }
    }



    return (
        <div>
            <PageHeader title="Scheduling Visit" onBack={() => window.history.back()} />
            <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '40vw', display: createForm }}>
                <Form layout="horizontal" >
                    <Form.Item label="Interest ID">
                        <Input value={interest.interestID} />
                    </Form.Item>
                    <Form.Item label="School Name">
                        <Input value={interest.schoolName} />
                    </Form.Item>
                    <Form.Item label="School Type">
                        <Input value={interest.schoolType} />
                    </Form.Item>
                    <RangePicker
                        value={hackValue || value}
                        disabledDate={disabledDate}
                        onCalendarChange={val => setDates(val)}
                        onChange={val => setValue(val)}
                        onOpenChange={onOpenChange}
                    />

                </Form>
                <Button type="primary" style={{ marginTop: '4vh' }}
                    onClick={visitCreate}>
                    Submit
                </Button>
            </div>
            <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '40vw', display: visitInfo }}>
                <Descriptions title='Visit Info' bordered>
                    <Descriptions.Item label="Interest ID" span={4}>{interest.interestID}</Descriptions.Item>
                    <Descriptions.Item label="School Name" span={1}>{interest.schoolName}</Descriptions.Item>
                    <Descriptions.Item label="School Type" span={2}>{interest.schoolType}</Descriptions.Item>
                    <Descriptions.Item label="Start Date" span={1}>{startDate.slice(0, 10)}</Descriptions.Item>
                    <Descriptions.Item label="End Date" span={2}>{endDate.slice(0, 10)}</Descriptions.Item>
                    <Descriptions.Item label="Participate in Special Activities" span={4}>{specialAct}</Descriptions.Item>
                    <Descriptions.Item label="Total Students Participating" span={1}>{totalStudents}</Descriptions.Item>
                    <Descriptions.Item label="Cost Per Student" span={2}>{costPerStudent}</Descriptions.Item>
                    <Descriptions.Item label="Total Cost" span={2}>{totalCost}</Descriptions.Item>
                </Descriptions>
                <div style={{ marginTop: '2vh', display: cancel }}>
                    <Button variant='primary' onClick={() => setCancelInput('block')} >Cancel Visit</Button>
                    <div style={{ marginTop: '2vh', display: cancelInput }}>
                        <TextArea rows={4} onChange={e => setCancelMessage(e.target.value)} />
                        <Button type="primary" style={{ marginTop: '4vh' }}
                            onClick={visitUpdate}>
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
            <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '40vw', display: repConfirm }}>
                <Form layout="horizontal" >
                    <Form.Item label="Interest ID">
                        <Input value={interest.interestID} />
                    </Form.Item>
                    <Form.Item label="School Name">
                        <Input value={interest.schoolName} />
                    </Form.Item>
                    <Form.Item label="School Type">
                        <Input value={interest.schoolType} />
                    </Form.Item>
                    <RangePicker
                        value={hackValue || value}
                        disabledDate={disabledDate}
                        onCalendarChange={val => setDates(val)}
                        onChange={val => setValue(val)}
                        onOpenChange={onOpenChange}
                    />
                    <Form.Item label="Participate in Specialized Activities?"
                        style={{ marginTop: '4vh' }}>
                        <Radio.Group >
                            <Radio value={1} onChange={() => setSpecialAct('Yes')}>Yes</Radio>
                            <Radio value={2} onChange={() => setSpecialAct('No')}>No</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="Total Students Participating">
                        <InputNumber defaultValue={0} onChange={setTotalStudents} />
                    </Form.Item>
                    <Form.Item label="Cost Per Student">
                        <InputNumber defaultValue={0} onChange={setcostPerStudent} />
                    </Form.Item>
                </Form>
                <Title level={4}>Total Cost: {parseInt(totalStudents) * parseInt(costPerStudent)}</Title>
                <Button type="primary" style={{ marginTop: '4vh' }}
                    onClick={visitUpdate}>
                    Submit
                </Button>
            </div>
            <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '40vw', marginTop: '4vh', display: showCancelMessage }}>
                <Title level={4}>Cancelled:</Title>
                <Paragraph>{cancelMessage}</Paragraph>
            </div>
            <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '40vw', display: empty }}>
                <Empty description='Waiting for admin to schedule a visit' />
            </div>
        </div >
    )
}
