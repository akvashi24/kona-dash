import Pane from './pane'
import TableReport from './tableReport'
import PieReport from './pieReport'
import React from 'react'
import { getBurntoutReport, getUnderengagedReport, getRYGBreakdownReport } from '../services/api'


export default function Home() {
    const adminName = 'Adin'
    return (
        <div className="min-h-screen bg-kona-mint px-8">
            <div className=" flex flex-col bg-kona-mint mx-auto max-w-5xl pt-16 mx-auto">
                <section id="header" className='mb-12'>
                    <span className="font-bold text-zinc-900 text-4xl">
                        🐶 Welcome back, {adminName}
                    </span>
                </section>
                <main className="flex flex-col">
                    <div className="flex flex-col md:flex-row mb-16 justify-between">
                        <div className="max-w-2xl mb-8 md:mb-0">
                            <Pane title='Unengaged Teams' subtitle='Teams that are not checking in with Kona regularly.'>
                                <div className="mt-4 text-center">
                                    <TableReport fetch={getUnderengagedReport} labels={['Manager', 'Check-in Rate']} />
                                </div>
                            </Pane>
                        </div>
                        <div className="max-w-2xl">
                            <Pane title='Burnt Out Teams' subtitle='Teams that are consistently reporting in the red.'>
                                <div className="mt-4 text-center">
                                    <TableReport fetch={getBurntoutReport} labels={['Manager', 'Burnout Rate']} />
                                </div>
                            </Pane>
                        </div>
                    </div>
                    <div className="w-full mb-8">
                        <Pane title='Overall Health' subtitle="Breakdown of all employees' mental health.  ">
                            <div className="py-4 text-center w-48 mx-auto">
                                <PieReport fetch={getRYGBreakdownReport} />
                            </div>
                        </Pane>
                    </div>
                </main>
            </div >
        </div>
    )
}