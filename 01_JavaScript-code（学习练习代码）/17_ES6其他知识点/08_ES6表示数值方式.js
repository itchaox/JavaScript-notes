const num1 = 100 // 十进制
const num2 = 0b100 // 二进制
const num3 = 0o100 // 八进制
const num4 = 0x100 // 十六进制

console.log(num1, num2, num3, num4);

// 数值特别大(ES2021, ES12)
// 方便阅读
const num = 100_000_000_000_000_000_000
console.log(num);