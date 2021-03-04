function upperObjectKey(obj) {
    const a = {}
    Object.keys(obj).forEach(key => {
        const k = uppperKey(key)
        a[k] = obj[key]
    })
    return a
}

function uppperKey(key) {
    let r = ''
    for (let i = 0; i < key.length; i++) {
        if (key[i] === '_' && i !== key.length - 1) {
            r += key[i+1].toUpperCase()
        } else {
            r += key[i]
        }
    }
    return r
}

const a = { a_b_c: 1, d_e_f: 2 }

upperObjectKey(a)

Math.sqrt