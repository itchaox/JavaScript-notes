function foo(el) {
	console.log(el, this)
}

let obj = {
	name:'itchao',
	age:18,
	bar() {
		console.log(this)
	}
}

;[1, 2, 3].forEach(foo, obj)  // 注意：前面需要加;开头，否则会报错
// 输出结果：
// 1 { name: 'itchao', age: 18, bar: [Function: bar] }
// 2 { name: 'itchao', age: 18, bar: [Function: bar] }
// 3 { name: 'itchao', age: 18, bar: [Function: bar] }
