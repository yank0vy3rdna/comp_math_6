import round from "../services/Round";
import Answer from "./answer";

function RungeKutta(func: { lambda: (x: number, y: number) => number }, h: number, left: number, right: number, y_0: number) {
    let ys: number[] = []
    let xs: number[] = []
    let y_i = y_0
    let x_i = left
    for (; x_i < right; x_i += h) {
        const y_i_c = y_i
        ys.push(round(y_i_c))
        xs.push(round(x_i))
        let k_1 = h * func.lambda(x_i, y_i)
        let k_2 = h * func.lambda(x_i + h / 2, y_i + k_1 / 2)
        let k_3 = h * func.lambda(x_i + h / 2, y_i + k_2 / 2)
        let k_4 = h * func.lambda(x_i + h, y_i + k_3)
        y_i += (k_1 + 2 * k_2 + 2 * k_3 + k_4) / 6
    }
    ys.push(y_i)
    xs.push(x_i)
    const answer: Answer = {
        headers: ['RungeKutta'],
        data: {RungeKutta: ys},
        plot: {x: xs, y: ys, mode: "lines", "name": "RungeKutta"}
    }
    return answer
}

export default RungeKutta;