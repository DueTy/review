const nodes = $('.js-fundlist-table').find('.fund-row')
const values = [9.62, 81.18, 85.04]
let sum = 0

$.each(nodes, (index, el) => {
    if (!values[index]) {
        return
    }
    
    const row = $(el)
    const fundName = row.data('fundname')
    const rate = row.find('.js-gszzl').data('sortvalue')
    const profit = (values[index] || 0) * rate
    sum += profit
    console.log(fundName, rate + '%', profit.toFixed(2))
})

console.log('总收益', sum.toFixed(2))