function observe(obj) {
    if (!obj || typeof obj !== 'object') {
        return
    }

    Object.keys(obj).forEach(key => {
        bindReactive(obj, key, obj[key])
    });
}

function bindReactive(obj, key, val) {
    observe(val)
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get() {
            console.log('get value')
            return val
        },
        set() {
            console.log('value changed')
            val = newValue
        }
    })
}

const a = { name: 'heheh' }
observe(a)