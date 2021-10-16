import React, { useEffect, useState } from 'react'
import axios from '../commons/axios.js';
import { Typography, PageHeader, message, Table } from 'antd'

const { Link } = Typography;

export default function AdminMain(props) {

    const [interestList, setInterestList] = useState([]);

    useEffect(async () => {
        if (!localStorage.getItem('user')) {
            message.error('please login to view this page')
            props.history.push('/')
        }
        let response = await axios.get("/interest");
        setInterestList(response.data.allInterest);
        console.log(response.data.allInterest)
    }, []);

    const handleInterestRedirect = () => {
        console.log(interestList)
    }

    const handleGoBack = () => {
        localStorage.clear()
        props.history.push('/')
    }

    const columns = [
        {
            title: 'School Name',
            dataIndex: 'schoolName',
            key: 'schoolName',
            render: (text, record, index) => <Link onClick={() => props.history.push(window.location.pathname + '/schedule', { record })}> {text} </Link>
        },
        {
            title: 'School Type',
            dataIndex: 'schoolType',
            key: 'schoolType',
        }
    ];

    return (
        <div>
            <PageHeader title="Expression of Interest Listing" onBack={handleGoBack} />
            <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '40vw', marginTop: '5vh' }}>
                <Table columns={columns} dataSource={interestList} />
            </div>
        </div>
    )
}
