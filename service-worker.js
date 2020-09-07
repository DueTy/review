if (navigator.serviceWorker) {
    navigator.serviceWorker.register('a.js').then(() => {
        console.log('a.js 注册成功')
    }).catch(err => {
        console.log('a.js 注册失败');
    })
}

this.addEventListener('install', e => {
    e.waitUntil(caches.open('my-service-worker-cache').then(cache => {
        return cache.addAll(['./index.html', './index.js'])
    }))
})

this.addEventListener('fetch', e => {
    e.respondWith(e.request).then(res => {
        if (res) {
            return res
        }
        console.log('fetch source')
    })
})