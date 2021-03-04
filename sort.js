// 冒泡
function bubbleSort(arr) {
    if (!Array.isArray(arr)) {
        return
    }

    for (let i = arr.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j+1]) {
                [ arr[j], arr[j + 1] ] = [ arr[j + 1], arr[j] ]
            }
        }
    }
}

// 插入排序
function insertSort(arr) {
    if (!Array.isArray(arr)) {
        return
    }

    for (let i = 1; i < arr.length; i++) {
        for (let j = i - 1; j>= 0 && arr[j] > arr[j + 1]; j--) {
            [ arr[j], arr[j + 1] ] = [ arr[j + 1], arr[j] ]
        }
    }
    return arr
}

// 选择排序
function selectSort(arr) {
    if (!Array.isArray(arr)) {
        return
    }

    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < arr.length; j++) {
            minIndex = arr[j] < arr[minIndex] ? j : minIndex
        }
        [ arr[i], arr[minIndex] ] = [ arr[minIndex], arr[i] ]
    }
    return arr
}

// 快排
function quickSort(arr) {
    if (!arr || !arr.length) {
        return []
    }
    
    const left = []
    const right = []
    const pivotIndex = arr.length >> 1
    let pivot = arr.splice(pivotIndex, 1)
    
    for (let i = 0; i < arr.length; i++) {
        arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i])
    }

    return quickSort(left).concat(pivot, quickSort(right))
}


const a = [11, 4, 66, 215, 5334, 123, 23, 1, 6, 8]

// bubbleSort(a)
// console.log(a)

// function quickSort(arr) {
//     if (!Array.isArray(arr)) {
//         return []
//     }

//     let left = []
//     let right = []
//     const pivotIndex = arr.length >> 1
//     let pivot = arr.splice(pivotIndex, 1)
    
//     for (let i = 0; i < arr.length; i++) {
//         arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i])
//     }

//     return quickSort(left).concat([pivot], quickSort(right))
// }

console.log(quickSort([11, 4, 66, 215, 5334, 123, 23, 1, 6, 8]))