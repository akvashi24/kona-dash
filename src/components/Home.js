import Pane from './pane'
import TableReport from './tableReport'
import testManagers from '../data/managers.json'


export default function Home() {
    const adminName = 'Adin'
    return (
        <div className="min-h-screen bg-kona-mint">
            <div className=" flex flex-col bg-kona-mint mx-auto max-w-5xl pt-16 mx-auto">
                <section id="header" className='mb-12'>
                    <span className="font-bold text-zinc-900 text-4xl">
                        🐶 Welcome back, {adminName}
                    </span>
                </section>
                <main className="flex flex-col">
                    <div className="flex flex-row mb-16 justify-between">
                        <div className="max-w-2xl">
                            <Pane title='Unengaged Teams' subtitle='Teams that are not checking in with Kona regularly.'>
                                <div className="mt-4 text-center">
                                    <TableReport managers={testManagers} />
                                </div>
                            </Pane>
                        </div>
                        <div className="max-w-2xl">
                            <Pane title='Burnt Out Teams' subtitle='Teams that are consistently reporting in the red.'>
                                <div className="mt-4 text-center">
                                    <TableReport managers={testManagers} />
                                </div>
                            </Pane>
                        </div>
                    </div>
                    <div className="w-full">
                        <Pane title='Overall Health' subtitle="Breakdown of all employees' mental health">
                            <div className="mt-4 text-center">
                                Unengaged managers here...
                                </div>
                        </Pane>
                    </div>
                </main>
            </div >
        </div>
    )
}