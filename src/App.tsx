import React, {useState} from 'react';
import './App.css';
import PlotItem from './components/PlotItem';
// @ts-ignore
import NumericInput from "react-numeric-input";
import Table from "./components/DynamicTable";
import RungeKutta from "./methods/RungeKutta";
import {getFunctionLambda, getSelectList} from "./services/functionsLambdas";
import SelectItem from "./components/Select";
import Adams from "./methods/Adams";
import round from "./services/Round";
import Answer from "./methods/answer";

function App() {
    const selectFunctionsList = getSelectList()
    // const [points, setPoints]: [{ x: number, y: number }[], any] = useState([]);
    const [selectedFunction, setSelectedFunction] = useState(selectFunctionsList[0]);
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);
    const [h_v, setHV] = useState(0.01);
    const [h, setH] = useState(h_v);
    const [epsilon, setEpsilon] = useState(0);
    const [yx_0, setYX_0] = useState(0);

    function onChangeH(h: number){
        setHV(h)
        setH(h)
    }


    let plots: { x: number[], y: number[], mode: string, name: string }[]
    plots = []
    let data_numbers: object[] = []
    const headers_numbers: string[] = ["Погрешность Рунге"];
    let data_accuracy: object[] = []
    const headers_accuracy: string[] = ["Method", "Accuracy"]
    let f = getFunctionLambda(selectedFunction.value)

    if (selectedFunction.value !== 0) {
        let x_vals: number[] = []
        let y_vals: number[] = []

        for (let i = a; i <= b; i += h) {
            i = round(i)
            x_vals.push(i)
            y_vals.push(round(f.solution(i, f.findC(a, yx_0))))
        }
        plots.push({x: x_vals, y: y_vals, mode: "lines", name: "Accurate result"})


        const pushToHeaders = (headers_from_method: string[]) => {
            for (let i in headers_from_method) {
                if (!headers_numbers.includes(headers_from_method[i])) {
                    headers_numbers.push(headers_from_method[i])
                }
            }
        }

        const results: Answer[] = [RungeKutta(f, h, a, b, yx_0)]

        const answer_2h_runge: Answer = RungeKutta(f, h / 2, a, b, yx_0)
        const R_pogr_runge = []
        let max_runge = 0
        for (let i = 0; i < results[0].plot.y.length; i++) {
            const pogr = (results[0].plot.y[i] - answer_2h_runge.plot.y[i * 2]) / (Math.pow(2, 4) - 1)
            R_pogr_runge.push(pogr)
            if (pogr > max_runge)
                max_runge = pogr
        }
        if (max_runge > epsilon) {
            setH(h / 2)
        }
        results[0].data["Погрешность Рунге"] = R_pogr_runge
        // const R_pogr = (answer_2h_runge.plot.y[answer_2h_runge.plot.y.length - 1] -
        //     results[0].plot.y[results[0].plot.y.length - 1]) / (Math.pow(2, 4) - 1)
        // data_accuracy.push({Method: "RungeKutta", Accuracy: R_pogr})

        const first_values = results[0].data[results[0].plot.name].slice(0, 4)
        results.push(Adams(f, h, a, b, yx_0, first_values))


        const answer_2h_adams: Answer = Adams(f, h * 2, a, b, yx_0, first_values)
        const R_pogr_adams = (answer_2h_adams.plot.y[answer_2h_adams.plot.y.length - 1] -
            results[1].plot.y[results[1].plot.y.length - 1]) / (Math.pow(2, 4) - 1)
        data_accuracy.push({Method: "Adams", Accuracy: R_pogr_adams})

        pushToHeaders(["X", "Accurate value"])
        let resultsValues = {X: x_vals, "Accurate value": y_vals}
        for (let i in results) {
            plots.push(results[i].plot)
            resultsValues = Object.assign(resultsValues, results[i].data)
            pushToHeaders(results[i].headers)
        }
        for (let i in resultsValues.X) {
            let obj = {}
            for (let j in resultsValues) {
                // @ts-ignore
                obj[j] = round(resultsValues[j][i])
            }
            data_numbers.push(obj)
        }
    }
    return (
        <div className="App">
            <h3>Лабораторная работа №6 по вычислительной математике. Крюков Андрей, P3214</h3>
            <table className="App">
                <tr>
                    <td>Выбор функции:</td>
                    <td>
                        <SelectItem onSelectHandler={setSelectedFunction} value={selectedFunction}
                                    options={selectFunctionsList}/></td>
                </tr>
                <tr>
                    <td>Выбор левой границы интервала дифференцирования:</td>
                    <td><NumericInput value={a} onChange={setA}/></td>
                </tr>
                <tr>
                    <td>Выбор правой границы интервала дифференцирования:</td>
                    <td><NumericInput value={b} onChange={setB}/></td>
                </tr>
                <tr>
                    <td>Выбор шага:</td>
                    <td><NumericInput value={h_v} onChange={onChangeH}/></td>
                </tr>
                <tr>
                    <td>Выбор точности:</td>
                    <td><NumericInput value={epsilon} onChange={setEpsilon}/></td>
                </tr>
                <tr>
                    <td>Выбор y(x_0):</td>
                    <td><NumericInput value={yx_0} onChange={setYX_0}/></td>
                </tr>
            </table>
            <PlotItem plots={plots}/>
            <Table data={data_accuracy} header={headers_accuracy}/>
            <Table data={data_numbers} header={headers_numbers}/>
        </div>
    );
}

export default App;
