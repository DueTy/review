const extend = require("extend")

// 手写call
Function.prototype.cusCall = function(context) {
    if (typeof this !== 'function') {
        throw new Error('抱歉，目标不是function类型')
    }

    context = context || window
    context.fn = this
    const args = [...arguments].slice(1)
    const result = context.fn(...args)
    delete context.fn
    return result
}

// 手写apply
Function.prototype.cusApply = function(context) {
    if (typeof this !== 'function') {
        throw new Error('抱歉，目标不是function类型')
    }

    context = context || window
    context.fn = this
    let result = arguments[1] ? context.fn(arguments[1]) : context.fn() // apply的第二个参数为数组
    
    delete context.fn
    return result
}

// 手写bind
Function.prototype.cusBind = function(context) {
    if (typeof this !== 'function') {
        throw new Error('抱歉，目标不是function类型')
    }
    
    const that = this
    const args = arguments.slice(1)

    return function F() { // new的情况
        if (this instanceof F) {
            return new that(...args, ...arguments)
        }
        return that.apply(context, args.concat(...arguments))
    }
}

// 手写new
// 1. 创建空对象 2.获取第一个参数作为构造函数 3.空对象原型链指向构造函数原型 4.绑定this并执行构造函数 5.确保返回的是对象
function cusNew() {
    const obj = {}
    const Con = [].shift.call(arguments) // 第一个参数作为构造函数
    obj.__proto__ = Con.prototype // 绑定原型链
    const result = Con.apply(obj, arguments) // 剩余参数传入
    return result instanceof Object ? result : obj
}

const a = cusNew(function A(){})

// 手写instanceof
function cusInstanceOf(a, b) {
    let prototype = b.prototype
    _proto = a.__proto__
    while(true) {
        if (_proto === null || _proto === undefined) {
            return false
        }
        if (_proto === prototype) {
            return true
        }
        _proto = _proto.__proto__
    }
}

// 内部扁平化
Array.prototype.cusFlat = function() {    
    return this.reduce((prev, item) => {
        return prev.concat(Array.isArray(item) ? Array.prototype.cusFlat.call(item) : item)
    }, [])
}

class EventEmitter {
    constructor() {
        this.handlers = {}
    }

    on(eventName, cb) {
        if (!this.handlers[eventName]) {
            this.handlers[eventName] = []
        }
        this.handlers[eventName].push(cb)
    }

    emit(eventName, ...agrs) {
        if (this.handlers[eventName]) {
            this.handlers.eventName.forEach(cb => {
                cb(...agrs)
            })
        }
    }

    off(eventName, cb) {
        if (this.handlers[eventName]) {
            const cbs = this.handlers[eventName]
            const index = cbs.indexOf(cb)
            if (index !== -1) {
                cbs.splice(index, 1)
            }
        }
    }

    once(eventName, cb) {
        const wrapper = (...agrs) => {
            cb.apply(...agrs)
            this.off(eventName, wrapper)
        }

        this.on(eventName, wrapper)
    }
}


// 理解原型链和类，继承
function A() {}
A.prototype.sayHi = function () { console.log('hello') }


const a = new A()

function B() { A.call(this) }
B.prototype = new A()
B.prototype.__proto__ =  A.prototype

const b = new B()

b instanceof Object

class C {
    static sayHi() { console.log('hi, I‘m Csss') }
    sayHi() { console.log('hi, I‘m C') }
}

class D extends C{
    sayHi() { console.log('hi, I‘m D') }
}

const d = new D()

function throttle(fn, delay) {
    let last = 0

    return function() {
        const context = this
        const agrs = arguments
        
        let now = +new Date()
        if (now - last > delay) {
            last = now
            fn.apply(context, agrs)
        }
    }
}

function debounce(fn, delay) {
    let timer = null

    return function() {
        const context = this
        const agrs = arguments

        if (timer) {
            clearTimeout(timer)
            timer = null
        }

        timer = setTimeout(() => {
            fn.apply(context, args)
        }, delay);
    }
}

function debounceV2(fn, delay) {
    let last = 0
    let timer = null

    return function() {
        const context = this
        const agrs = arguments
        let now = +new Date()

        if (now - last < delay) {
            // 如果执行时间小于间隔时间
            clearTimeout(timer)
            timer = setTimeout(() => {
                fn.apply(context, agrs)
            }, delay);
        } else { // 如果大于就不等了
            last = now
            fn.apply(context, agrs)
        }
    }
}

Array.prototype.cusReduce = function (callback, initValue) {
    let arr = this

    let prev = initValue || this[0]
    let startIndex = prev ? 0 : 1
    for (let i = startIndex; i < arr.length; i++) {
        prev = callback(prev || arr[1], this[i], i, arr)
    }
    return prev
}

Array.prototype.cusFlat = function() {
    return this.reduce((prev, cur) => {
        return prev.concat(Array.isArray(cur) ? Array.prototype.cusFlat.call(cur) : cur)
    }, [])
}
