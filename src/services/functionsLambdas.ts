const functions: { lambda: (x: number, y: number) => number; label: string; solution: (x: number, c: number) => number, findC: (x_0: number, y_0: number) => number }[] = [
    {
        lambda: (x: number, y: number) => 0,
        solution: (x: number, c: number) => 0,
        findC: (x_0: number, y_0: number) => (y_0 - Math.pow(x_0, 2) - 2 * x_0 - 2) / Math.exp(x_0),
        label: 'Ничего не выбрано',
    },
    {
        lambda: (x: number, y: number) => y - x * x,
        solution: (x: number, c: number) => c * Math.exp(x) + Math.pow(x, 2) + 2 * x + 2,
        findC: (x_0: number, y_0: number) => (y_0 - Math.pow(x_0, 2) - 2 * x_0 - 2) / Math.exp(x_0),
        label: "y' = y - x ^ 2",
    },
    {
        lambda: (x: number, y: number) => 3 * Math.pow(y, 2),
        solution: (x: number, c: number) => 1 / (c - 3 * x),
        findC: (x_0: number, y_0: number) => 1 / y_0 + 3 * x_0,
        label: "y' = 3 * y ^ 2",
    },
    {
        lambda: (x: number, y: number) => 2 * y / x,
        findC: (x_0: number, y_0: number) => y_0 / Math.pow(x_0, 2),
        solution: (x: number, c: number) => c * Math.pow(x, 2),
        label: "y' = 2 * y / x",
    }
]

export function getFunctionLambda(selectedFunction: number) {
    // @ts-ignore
    return functions[selectedFunction];
}

export function getSelectList() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // @ts-ignore
    const list: [{ value: number, label: string }] = []
    for (let i in functions) {
        // @ts-ignore
        list.push({value: i, label: functions[i].label})
    }
    return list
}