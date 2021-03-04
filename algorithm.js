function checkArray(arr) {
    return Array.isArray(arr)
}

function swap(arr, l, r) {
    [arr[l], arr[r]] = [arr[r], arr[l]]
}

const testArr = [  7, 3, 5, 10, 22, 2, 1, 10, 9 ]

function bubble(arr) {
    if (!checkArray(arr)) return

    for (let i = arr.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) swap(arr, j, j + 1)
        }
    }
    return arr
}

console.log(bubble(testArr));

function insert(arr) {
    if (!checkArray(arr)) return
    for (let i = 1; i < arr.length; i++) {
        for (let j = i - 1; j >= 0; j--) {
            if (arr[j] > arr[j + 1]) swap(arr, j, j + 1)
        }
    }
    return arr
}

console.log(insert(testArr));

function select(arr) {
    if (!checkArray(arr)) return
    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i
        for (let j = i + 1; j < arr.length; j++){
            minIndex = arr[j] < arr[minIndex] ? j : minIndex
        }
        swap(arr, i, minIndex)
    }
    return arr
}
console.log(select(testArr));

function mergeFunc(arr) {
    if (!checkArray(arr)) return 
    merge(arr, 0, arr.length - 1)
    return arr
}

function merge(arr, left, right) {
    if (left === right) {
        return
    }

    let mid = parseInt(left + ((right - left) >> 1))
    merge(arr, left, mid)
    merge(arr, mid + 1, right)

    let temp = []
    let i = 0
    let p1 = left
    let p2 = mid + 1

    while(p1 <= mid && p2 <= right) {
        temp[i++] = arr[p1] < arr[p2] ? arr[p1++] : arr[p2++]
    }

    while(p1 <= mid) {
        temp[i++] = arr[p1++]
    }

    while(p2 <= right) {
        temp[i++] = arr[p2++]
    }

    for (let i = 0; i < temp.length; i++) {
        arr[left + i] = temp[i]
    }
}
console.log(mergeFunc(testArr))

function twoSum(arr, target) {
    if (!arr || !arr.length) {
        return []
    }

    let map = new Map()
    map.set(arr[0], 0)

    for (let i = 1; i < arr.length; i++) {
        const other = target - arr[i]

        if (map.get(other) !== undefined) {
            return [ map.get(other), i ]
        }
    }
    return []
}

console.log(twoSum([2,,10,1,2, 7,3], 9))