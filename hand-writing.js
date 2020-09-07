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