import React, { useEffect, useState } from 'react';
import './Table.css';

const Table = () => {
    const url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo";
    const [data, setData] = useState([])
    const fetchData = async () => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            const timeSeriesJson = json['Time Series (5min)'];
            setData(timeSeriesJson)
        } catch (error) {
            console.log("error", error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [])
    return (
        <table>
            <thead>
                <tr>
                    <th>DateTime</th>
                    <th>Open</th>
                    <th>High</th>
                    <th>low</th>
                    <th>Close</th>
                    <th>Volume</th>

                </tr>
            </thead>
            <tbody>
                {Object.entries(data) && Object.entries(data).length > 0 && Object.entries(data).map(item => {
                    return (
                        <tr>
                            <td>{item[0]}</td>
                            {Object.values(item[1]).map(values => {
                                return (
                                    <td>{values}</td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>

        </table>
    )
}
export default Table;