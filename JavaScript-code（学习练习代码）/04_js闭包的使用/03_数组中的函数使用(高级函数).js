// 函数和方法的区别：
// 函数function：独立的function，那么称之为是一个函数
// 例如：(该函数是定义在全局中的，不属于任何东西)
// function foo(){ }
// 方法method：当我们的一个函数属于某一个对象时，我们称这个函数是这个对象的方法
// const obj = {
//     foo: function(){ }
// }
// obj.foo()  // 调用obj对象内的foo方法

const nums = [1, 20, 50, 100, 300]  // 下面的案例都是用的这个数组
// 以下是几个关于数组的高级函数
// 高级函数一：filter()，过滤函数，拿到自己需要的数据，过滤掉不需要的多余数据
const newNums = nums.filter(item => item > 30)  // 生成一个新的数组newNums，把原数组nums中大于30的数据放到新数组newNums中
console.log(newNums)

// 高级函数二：map()，（映射）遍历数组中所有元素，每次执行匿名函数都支持三个参数，参数分别为item（当前每一项），index（索引值），arr（原数组）
// map方法返回一个新的数组，数组中的元素为原始数组调用函数处理后的值
const addNums = nums.map(item => item + 100)
console.log(addNums)

// 高级函数三：forEach()，调用数组的每个元素，将元素传给回调函数，每次执行匿名函数都支持三个参数，参数分别为item（当前每一项），index（索引值），arr（原数组）
nums.forEach(item => console.log(item + 20))

// 高级函数四：find/findIndex，匹配查找，拿到自己需要的值
// 案例一：find（拿到符合自己要求的那个数据）
const item = nums.find(item => item === 20)
console.log(item)
// 案例二：find（匹配查找对象，拿到符合自己需要的对象）
const friends = [{
    name:'kobe',
    age:18,
    height:1.98
},{
    name:'itchao',
    age:19,
    height:1.85
},{
    name:'codewhy',
    age:20,
    height:1.88
}]
const findFriends = friends.find(item => item.age  === 20)  // item在这里是形参，可以自己命名
console.log(findFriends)
// 案例三：findIndex,匹配查找，拿到自己需要的数据的索引值
const findIndexFriends = friends.findIndex(item => item.age === 20)
console.log(findIndexFriends)


// 高级函数五：reduce(),累加
// 原生代码累加写法：
let total = 0
for(let i = 0; i < nums.length; i++){
    total += nums[i]
}
console.log(total)
// reduce()函数写法：
const total = nums.reduce(function (preValue, item){
    return preValue + item
}, 0)
console.log(total);
// reduce()函数的过程分析：
// preValue的初始化为0
// 第一次： preValue:0, item:1
// 第二次： preValue:1, item:20
// 第三次： preValue:21, item:50
// 第四次： preValue:71, item:100
// 第五次： preValue:171, item:300
// 最后的结果：preValue:171, item:300，preValue + item = 471
