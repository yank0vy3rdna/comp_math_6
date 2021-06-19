function round(x: number){
    const count_after_comma = 8
    return Math.round(x * Math.pow(10, count_after_comma)) / Math.pow(10, count_after_comma)
}
export default round;