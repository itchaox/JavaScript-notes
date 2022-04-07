// 1. 存储数据
localStorage.setItem('name', 'itchao');
localStorage.setItem('age', 18);
localStorage.setItem('height', '1.88');

// 2. length 获取长度
console.log(localStorage.length, '获取长度');

// 3. key() 获取key值
console.log(localStorage.key(1), '获取key值');

// 4. 读取数据
console.log(localStorage.getItem('height'),'读取数据');

// 5. removeItem() 清除某个数据
localStorage.removeItem('height')

// 6. clear() 清空数据
localStorage.clear()

