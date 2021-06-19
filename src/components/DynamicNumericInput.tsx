import Table from "./DynamicTable";
import React from "react";

// @ts-ignore
import NumericInput from "react-numeric-input";

function DynamicNumericInput(props: { points: { x: number, y: number }[], rerender: () => void, setPoints: (value: { x: number, y: number }[]) => void }) {
    const changePoint = (i: number, if_change_x: boolean, value: number) => {
        if (props.points.length === i) {
            props.points.push({x: 0, y: 0})
        }
        if (if_change_x) {
            props.points[i].x = value
        } else {
            props.points[i].y = value
        }
        props.setPoints(props.points)
        props.rerender()
    }
    console.log("Redrawing")

    const data = []
    for (let i = 0; i <= props.points.length; i++) {

        let x_val = 0
        let y_val = 0
        if (props.points.length > i) {
            x_val = props.points[i].x
            y_val = props.points[i].y
        }
        const x = <NumericInput value={x_val}
                                onChange={(value: number) => changePoint(i, true, value)}/>
        const y = <NumericInput value={y_val}
                                onChange={(value: number) => changePoint(i, false, value)}/>

        data.push({
            "x": x,
            "y": y
        })
    }

    return <Table data={data} header={["x", "y"]}/>
}

export default DynamicNumericInput;