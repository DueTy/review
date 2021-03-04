Array.prototype.cusReduce = function (callback, initValue) { 
    if (typeof callback !== 'function') {
        new Error('第一个参数请为function')
        return []
    }

    let prev = initValue || this[0]
    let startIndex = prev ? 0 : 1
    for (let i = startIndex; i < this.length; i++) {
        prev = callback(prev, this[i], i, this)
    }
    return prev
}

let r1 = [1,2,3,4].cusReduce(function(prev, cur, curIndex, arr) {
    return prev + cur
}, 22)

console.log(r1);