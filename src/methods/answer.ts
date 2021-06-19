interface Answer {
    headers: string[],
    data: { [key: string]: number[] },
    plot: { x: number[], y: number[], mode: string, name: string }
}

export default Answer