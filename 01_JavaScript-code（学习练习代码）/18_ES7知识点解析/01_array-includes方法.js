const names = ['itchao', 'coderwhy', 'kobe']

// 以前常用判断数组是否包含某个元素 indexOf
if (names.indexOf('itchao') !== -1) {
  console.log('包含itchao');
}

// ES7/ES2016, 新增 includes 方法(判断数组是否包含某个元素)
// 可传入第二个参数，用于定义判断数组的起始位置
if (names.includes('kobe')) {
  console.log('包含kobe');
}
console.log(names.includes('kobe'));

// indexOf 与 includes 区别：indexOf不能判断NaN是否存在，includes能判断NaN是否存在
const N = [NaN]
if (N.indexOf(NaN) !== -1) {
  console.log('indexOf NaN');
}

if (N.includes(NaN)) {
  console.log('includes NaN');
}