import { PieChart } from 'react-minimal-pie-chart';
import React, { useState, useEffect } from 'react';

export default function TableReport(props) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})
    useEffect(() => {
        props.fetch().then(
            (results) => {
                setData(results)
                setLoading(false)
            }
        )
    })
    return (
        <div>
            {
                loading ?
                    <span className="mx-auto font-bold text-2xl mt-4">Loading...</span> :
                    <PieChart
                        data={data}
                        lineWidth={20}
                        paddingAngle={18}
                        rounded
                        label={({ dataEntry }) => `${dataEntry.value}%`}
                        labelStyle={(index) => ({
                            fill: data[index].color,
                            fontSize: '8px',
                            fontFamily: 'sans-serif',
                        })}
                        labelPosition={60}
                    />
            }
        </div>
    )
}