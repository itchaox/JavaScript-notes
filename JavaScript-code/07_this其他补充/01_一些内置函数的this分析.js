// 1.setTimeout函数，定时器


// 类比setTimeout函数举例：
// function hySetTimeout(fn, duration) {
//     fn
// }
// hySetTimeout(function() {
//
// }, 2000)

// 注意：
// setTimeout函数内输出的this是指向window，原因:setTimeout函数内部调用function(){}时采用独立调用的方式进行调用
// setTimeout(function() {  // 接收另个函数作为参数
//     console.log(this)  // 输出结果：window
// }, 2000)


// 2.监听事件

// 在监听事件的时候，浏览器内部调用onclick的时候采用了类似boxDiv.onclick()的隐式绑定，所以this指向了发起调用的对象boxDiv
// const boxDiv = document.querySelector('.box')
// boxDiv.onclick = function() {
//     console.log('--------------',this)  // 输出结果：boxDiv对象
// }
// boxDiv.onclick = function() {  // 后面的点击事件会覆盖前面的点击事件，只能显示一个
//     console.log('11111111111',this)  // 输出结果：boxDiv对象
// }
//
// boxDiv.addEventListener('click', function() {  // 后面的事件不会覆盖前面的事件，能显示多个事件
//     console.log(this)  // 输出结果：boxDiv对象
// })
// boxDiv.addEventListener('click', function() {
//     console.log(this)  // 输出结果：boxDiv对象
// })
// boxDiv.addEventListener('click', function() {
//     console.log(this)  // 输出结果：boxDiv对象
// })


// 3.数组：foeEach/map/filter/find

// let names = ['kobe', 'james', 'curry', 'coderwhy', 'itchao']
// for(let i of names) {
//     console.log(i)  // 输出结果：kobe james curry coderwhy itchao
//     console.log(this)  // 输出结果：window
// }
//
// for(let i in names) {
//     console.log(i)  // 输出结果：0 1 2 3 4
//     console.log(this)  // 输出结果：window
// }
// forEach：
// names.forEach(function(item) {
//     console.log(item, this)  // 输出结果：默认情况下不改变this的指向则输出结果是window
// }, 'aaa')  // forEach接受第二个参数来改变this的指向
// map:
// names.map(function(item) {
//     console.log(item, this)  // 输出结果：默认情况下不改变this的指向则输出结果是window
// }, 'bbb')  // map接受第二个参数来改变this的指向
// filter:
// names.filter(function(item) {
//     console.log(item, this)  // 输出结果：默认情况下不改变this的指向则输出结果是window
// }, 'ccc')  // filter接受第二个参数来改变this的指向
// find:
// names.find(function(item) {
//     console.log(item, this)  // 输出结果：默认情况下不改变this的指向则输出结果是window
// }, 'ddd') // find接受第二个参数来改变this的指向