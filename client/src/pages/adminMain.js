import React, { useEffect, useState } from 'react'
import axios from '../commons/axios.js';

export default function AdminMain() {

    const [interestList, setInterestList] = useState('');

    useEffect(async () => {
        let response = await axios.get("/interest/");
        setInterestList(response.data.allInterest);
        
    }, []);

    console.log(interestList);

    return (
        <div>
            <h1>admin main page</h1>
        </div>
    )
}
