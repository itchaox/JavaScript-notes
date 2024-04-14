/*
 * @Desc: 
 * @Version: v1.00
 * @Author: wc
 * @Date: 2022-05-29 09:22:17
 * @LastEditors: wc
 * @LastEditTime: 2022-05-29 09:39:20
 */
let arr = [1,2,3,4,5,6,7,8,9,10]


arr.forEach((i, index, arr) => arr[index] = i + i )
console.log(arr);
