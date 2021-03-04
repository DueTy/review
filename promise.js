const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'
const PENDING = 'PENDING'

function cusPromise(fn) {
    const that = this
    that.state = PENDING
    that.value = null
    
    that.resolvedCallbacks = []
    that.rejectedCallbacks = []

    function resolve(value) {
        if (that.state === PENDING) {
            that.state = RESOLVED
            that.value = value
            that.resolvedCallbacks.map(cb => cb(that.value))
        }
    }

    function reject(error) {
        if (that.state = PENDING) {
            that.state = REJECTED
            that.value = error
            that.rejectedCallbacks.map(cb => cb(that.value))
        } 
    }

    try {
        fn(resolve, reject)
    } catch (e) {
        reject(e)
    }
}

cusPromise.prototype.then = function(onFulfilled, onRejected) {
    const that = this

    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }

    if (that.state === PENDING) {
        that.resolvedCallbacks.push(onFulfilled)
        that.rejectedCallbacks.push(onRejected)
    }

    if (that.state === RESOLVED) {
        onFulfilled(that.value)
    }

    if (that.state === REJECTED) {
        onRejected(that.value)
    }
}

new cusPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(1)
    }, 3000);
}).then(res => {
    console.log('res is', res)
})
