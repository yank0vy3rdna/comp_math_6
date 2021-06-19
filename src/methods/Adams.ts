import Answer from "./answer";
import round from "../services/Round";

function Adams(func: { lambda: (x: number, y: number) => number }, h: number, left: number, right: number, y_0: number, first_values: number[]) {
    let ys: number[] = []
    let xs: number[] = []
    const answer: Answer = {
        headers: ["Adams"],
        data: {Adams: []},
        plot: {x: [], y: [], mode: "lines", "name": "Adams"}
    }
    let x_i = left
    let i = 0;

    if (first_values.length !== 4)
        return answer
    for (; x_i <= right + 1e-11; x_i += h, i++) {
        let y;
        if (i < 4) {
            y = first_values[i];
        } else {
            let fi = func.lambda(xs[ys.length - 1], ys[ys.length - 1]),
                fi_1 = func.lambda(xs[ys.length - 2], ys[ys.length - 2]),
                f2 = func.lambda(xs[ys.length - 3], ys[ys.length - 3]),
                f3 = func.lambda(xs[ys.length - 4], ys[ys.length - 4])
            let dfi = fi - fi_1,
                dfi2 = fi - 2 * fi_1 + f2,
                dfi3 = fi - 3 * fi_1 + 3 * f2 - f3
            y = ys[ys.length - 1] + h * fi + Math.pow(h,1) / 2 * dfi + 5 / 12 * Math.pow(h,1) * dfi2 + 3 / 8 * Math.pow(h,1) * dfi3
            // y = ys[ys.length - 1] + h / 24 * (55 * fi - 59 * fi_1 + 37 * f2 - 9 * f3)
            // for (let iterator = 0; iterator < 5; iterator++)
            //     y = ys[ys.length - 1] + h * (9 * (func.lambda(x_i, y)) - 19 * fi - 5 * fi_1 + f2) / 24
        }
        ys.push(round(y))
        xs.push(round(x_i))
    }
    answer.data.Adams = ys
    answer.plot.x = xs
    answer.plot.y = ys
    return answer;
}

export default Adams;