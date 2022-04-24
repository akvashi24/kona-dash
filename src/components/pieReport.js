import { PieChart } from 'react-minimal-pie-chart';
import React, { useState, useEffect } from 'react';

export default function TableReport(props) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})


    useEffect(() => {
        props.fetch().then(
            (results) => {
                const formatted = [
                    { title: 'Green', value: results.green, color: '#2FA23F' },
                    { title: 'Yellow', value: results.yellow, color: '#FACD4C' },
                    { title: 'Red', value: results.red, color: '#BF1A31' },
                ]
                setData(formatted)
                setLoading(false)
            }
        )
    }, [])
    if (loading) {
        return <span className="mx-auto font-bold text-2xl mt-4">Loading...</span>
    }
    return (
        <div>
            <PieChart
                data={data}
                lineWidth={20}
                paddingAngle={18}
                rounded
                label={({ dataEntry }) => dataEntry.value}
                labelStyle={(index) => ({
                    fill: data[index].color,
                    fontSize: '8px',
                    fontFamily: 'sans-serif',
                })}
                labelPosition={60}
            />
        </div>
    )
}