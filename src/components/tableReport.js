import React from 'react'

export default function TableReport(props) {
    return (
        <div className="px-4 py-2">
            <table className="w-full text-left">
                <tr>
                    <th>Manager</th>
                    <th>Rate</th>
                </tr>
                {
                    props.managers.map(
                        (manager) => {
                            return <tr className="py-4">
                                <td className="py-4">{manager.name}</td>
                                <td className="font-bold">{manager.rate}%</td>
                                <td className="text-center"><button className="shadow rounded py-2 px-3 mx-auto bg-kona-green text-white font-bold text-xs text-center">check in</button></td>
                            </tr>
                        }
                    )
                }
            </table>
        </div>
    )
}