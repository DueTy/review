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
    let dp = new Dep()
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get() {
            console.log('get value')
            if (Dep.target) {
                dp.addSub(Dep.target)
            }
            return val
        },
        set(newValue) {
            console.log('value changed')
            val = newValue
            dp.notify()
        }
    })
}

class Dep {
    constructor() {
        this.subs = []
    }

    addSub(sub) {
        this.subs.push(sub)
    }

    notify() {
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}
// 通过该全局属性配置watcher
Dep.target = null

class Watcher{
    constructor(obj, key, cb) {
        Dep.target = this
        this.obj = obj
        this.cb = cb
        this.key = key
        this.value = obj[key]
        Dep.target = null
    }

    update() {
        this.value = this.obj[this.key]
        this.cb(this.value)
    }
}

const a = { name: 'heheh' }
observe(a)

function update(value) {
    document.querySelector('.name-item').innerHTML = value
}

new Watcher(a, 'name', update)