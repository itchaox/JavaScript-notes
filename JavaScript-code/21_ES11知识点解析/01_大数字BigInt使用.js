// ES11之前，表示最大数使用 max_safe_integer
const max = Number.MAX_SAFE_INTEGER
console.log(max); // 9007199254740991

// ES11，表示最大数用 BigInt
const bigInt = 9007199254740991000000n
console.log(bigInt);
console.log(bigInt + 999n);

// BigInt类型与Number类型数字直接相加需要用 BigInt() 进行转换
const num = 10002
console.log(bigInt + BigInt(num));