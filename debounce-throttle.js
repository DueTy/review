// 防抖
function debounce(fn, delay) {
    let timer = null
    
    return function() {
        clearTimeout(timer)
        const context = this
        const args = arguments

        timer = setTimeout(() => {
            fn.apply(context, args)
        }, delay);
    }
}

// 节流
function throttle(fn, delay) {
    let timer = null
    return function() {
        if (timer) {
            return
        }
        const args = arguments
        const context = this

        timer = setTimeout(() => {
            timer = null
            fn.apply(args, context)
        }, delay);
    }
}

// 节流时间戳版本
function throttleV2(fn, wait) {
    let start = 0
    return function() {
        let now = new Date().getTime()
        const context = this
        const args = arguments
        if (now - start > wait) {
            start = now
            fn.apply(context, args)
        }
    }
}