import React, { useEffect, useState } from 'react'
import axios from '../commons/axios.js';

export default function AdminMain() {

    const [interestList, setInterestList] = useState('');


    const header = ["Interest ID", "Shcool Name", "Address", "City", "State", "Postal Code", "ShcoolType", 
                    "SecureParking", "Parking Spaces", "Ppen Areas", "Visiting School Name", "Nearest Host SchoolName",
                    "Distance", "Message"];

    useEffect(async () => {
        let response = await axios.get("/interest/");
        setInterestList(response.data.allInterest);
    }, []);

    console.log(interestList)

    
    

    return (
        <div>
            <h1>admin main page</h1>
            <table>
                <thead>
                <tr>{header.map((h, i) => <th key={i}>{h}</th>)}</tr>
                </thead>
                <tbody>
                {Object.keys(interestList).map((k, i) => {
                    let data = interestList[k];
                    return (
                    <tr key={i}>
                        <td width="80" height="50" >{data.interestID}</td>
                        <td width="100" height="50">{data.schoolName}</td>
                        <td width="200" height="50">{data.address}</td>
                        <td width="100" height="50">{data.city}</td>
                        <td width="80" height="50">{data.state}</td>
                        <td width="50" height="50">{data.postalCode}</td>
                        <td width="80" height="50">{data.shcoolType}</td>
                        <td width="80" height="50">{data.secureParking}</td>
                        <td width="80" height="50">{data.parkingSpaces}</td>
                        <td width="80" height="50">{data.openAreas}</td>
                        <td width="80" height="50">{data.visitingSchoolName}</td>
                        <td width="80" height="50">{data.nearestHostSchoolName}</td>
                        <td width="80" height="50">{data.distanceFromNearestHostSchool}</td>
                        <td width="80" height="50">{data.message}</td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    )
}
