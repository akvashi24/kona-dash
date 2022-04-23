import React, { useState, useEffect } from 'react';

export default function TableReport(props) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})


    useEffect(() => {
        props.fetch().then(
            (results) => {
                setData(results.slice(0, 3))
                setLoading(false)
            }
        )
    }, [])

    if (loading) {
        return <span className="mx-auto font-bold text-2xl my-4">Loading...</span>
    }

    return (


        <div className="px-4 py-2">
            <table className="w-full text-left">
                <tr>
                    {
                        props.labels.map(
                            (label, index) => <th key={index}>{label}</th>
                        )
                    }
                </tr>
                {
                    data.map(
                        (manager, index) => {
                            return <tr key={index} className="py-4">
                                <td className="py-4">{manager.name}</td>
                                <td className="font-bold">{manager.rate}%</td>
                                <td className="text-center"><button className="shadow rounded py-2 px-3 mx-auto bg-kona-green text-white font-bold text-xs text-center cursor-not-allowed">check in</button></td>
                            </tr>
                        }
                    )
                }
            </table>
        </div>
    )
}