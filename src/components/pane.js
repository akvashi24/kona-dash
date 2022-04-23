import React from 'react'

export default function Pane(props) {
    return (
        <div className="w-full">
            <div className="mb-4">
                <span className="font-bold text-xl text-zinc-900">{props.title || 'Untitled Report'}</span>
                <p className="text-zinc-500 md:w-2/3">
                    {props.subtitle + '  '}<span className="cursor-not-allowed underline whitespace-nowrap">Learn more.</span>
                </p>
            </div>
            <section className="rounded-md border-4 border-kona-green shadow-lg" style={{ boxShadow: '-3px 3px 0 1px #dadada' }}>
                {props.children}
            </section>
        </div>
    )
}