/*
 * @Version    : v1.00
 * @Author     : wangchao
 * @Date       : 2024-04-16 11:30
 * @LastAuthor : wangchao
 * @LastTime   : 2024-04-16 13:10
 * @desc       :
 */
let idCard = "789028992348024822";

// padStart(targetLength, padString)
// 从头部向尾部开始填充
// targetLength：填充后的长度
// padString：填充的字符串（该参数不传时默认填充为空格）

console.log(idCard.padStart(25)); //        789028992348024822
console.log(idCard.padStart(25, "*")); // *******789028992348024822

// padEnd
// 从尾部向头部开始填充
// targetLength：填充后的长度
// padString：填充的字符串（该参数不传时默认填充为空格）

console.log(idCard.padEnd(30, "*")); // 789028992348024822************

function foo(m, n) {}
