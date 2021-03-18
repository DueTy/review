// 原型链继承
function Father () {}
Father.prototype.sayHi = function() { console.log('hi, I"m father') }

function Child () {}

Child.prototype = new Father()
Child.prototype.constructor = Child
Child.prototype.sayHi = function() { console.log("hi, I'm child") }

const c = new Child()

// 组合继承
function Father() {}

Father.prototype.sayHi = function() { console.log('hi, I"m father') }

function Child() { Father.call(this) }
Child.prototype.sayHi = function() { console.log("hi, I'm child") }

Child.prototype = new Father() // 获取父类的属性

// 寄生组合继承
function Father() {}

Father.prototype.sayHi = function() { console.log('hi, I"m father') }

function Child() { Father.call(this) }

Child.prototype = Object.create(Father.prototype, {
    constructor: {
        value: Child,
        configurable: true,
        enumerable: false,
        writable: true
    }
})

const c = new Child()


