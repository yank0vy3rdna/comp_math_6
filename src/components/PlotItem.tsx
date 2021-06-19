import React from 'react';
import './Plot.css';
// @ts-ignore
import Plot from 'react-plotly.js';

function PlotItem(props: { plots: { x: number[], y: number[], mode: string, name: string }[] }) {
    let data: { x: number[], y: number[], mode: string, type: string, name: string}[];
    data = [];
    for (let i in props.plots) {
        data.push({
            x: props.plots[i].x,
            y: props.plots[i].y,
            mode: props.plots[i].mode,
            type: 'scatter',
            name: props.plots[i].name
        })
    }
    return (
        <div className="Plot">
            <Plot
                data={data}
                layout={{width: '80vw', height: '60vh'}}
            />
        </div>
    );
}

export default PlotItem;
