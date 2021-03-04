function checkSpecial(o) {
    return Object.prototype.toString.call(o)
}

function deepClone(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj
    }

    const specialType = checkSpecial(obj)

    if (specialType === '[object RegExp]' || specialType === '[object Date]') {
        return obj
    }

    let result = {}

    if (Array.isArray(obj)) {
        result = []
    }

    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            result[key] = deepClone(obj[key])
        }
    }
    return result
}

const o1 = { a: new RegExp(), b: { test: 2, test1: new Date() }}
const o2 = deepClone(o1)

console.log(o2, o1 === o2);