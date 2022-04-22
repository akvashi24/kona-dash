import { PieChart } from 'react-minimal-pie-chart';

export default function TableReport(props) {
    const data = [
        { title: 'Green', value: 17, color: '#2FA23F' },
        { title: 'Yellow', value: 15, color: '#FACD4C' },
        { title: 'Red', value: 2, color: '#BF1A31' },
    ]
    return (
        <div>
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
        </div>
    )
}