function find_main_elem(matrix: number[][], row: number) {
    let max_elem = -1
    let max_j = -1
    for (let j = row; j < matrix[0].length; j++) {
        if (max_elem < Math.abs(matrix[row][j])) {
            max_elem = Math.abs(matrix[row][j])
            max_j = j
        }
    }
    return max_j
}

function swap(A: number[][], first: number, col: number) {
    for (let i in A) {
        let temp = A[i][col]
        A[i][col] = A[i][first]
        A[i][first] = temp
    }
}

function dividing(A: number[][], B: number[], row: number) {
    for (let i = row + 1; i < B.length; i++) {
        B[i] -= A[i][row] / A[row][row] * B[row]
    }
    for (let i = row + 1; i < A.length; i++) {
        let mm = A[i][row] / A[row][row]
        for (let j = row; j < A[0].length; j++) {
            A[i][j] -= mm * A[row][j]
        }
    }
}

function Gauss(A: number[][], B: number[]) {
    let swaps = []
    for (let row = 0; row < A[0].length; row++) {
        let main_elem = find_main_elem(A, row)
        swap(A, row, main_elem)
        swaps.push([row, main_elem])
        if (A[row][row] !== 0) {
            dividing(A, B, row)
        }
    }
    swaps.reverse()
    for (let i in swaps) {
        swap(A, swaps[i][0], swaps[i][1])
    }
    let answers: {[key: number]: number}
    answers = {}
    for (let i = A.length - 1; i >= 0; i--) {
        let s = 0
        let dont_know = -1
        for (let j = 0; j < A[0].length; j++) {
            if (Math.abs(A[i][j]) > Math.pow(10, -6)) {
                if (j in answers) {
                    s += answers[j] * A[i][j]
                }else {
                    dont_know = j
                }
            }

        }
        answers[dont_know] = Math.round((B[i] - s) / A[i][dont_know]*10000000)/10000000
    }
    return answers
}

export default Gauss