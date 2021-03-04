function jsonp(url, callback, success) {
    let script = document.createElement('script')
    script.src = url
    script.defer = true
    window[callback] = function(data) {
        success && success(data)
    }
    document.body.appendChild(script)
}