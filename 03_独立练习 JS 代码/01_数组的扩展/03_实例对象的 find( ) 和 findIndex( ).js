/*
 * @Desc: 
 * @Version: v1.00
 * @Author: wc
 * @Date: 2022-05-28 09:02:14
 * @LastEditors: wc
 * @LastEditTime: 2022-05-28 09:41:48
 */

// find(): 找出第一个符合条件的数组成员,匹配成功后返回该数组成员
let arr1 = [1, 7 ,9 ,10, 20]
let curItem = arr1.find(i => i>10)
// console.log(curItem);

// findIndex(): 找出第一个符合条件的数组成员,匹配成功后返回该数组成员下标值
let curItemIndex = arr1.findIndex(i => i>10)
// console.log(curItemIndex);

// fill(): 填充数组
let arr2 = [1,2,3,4,5,6,7,8]
let newArr2 = arr2.fill('a')
// console.log(newArr2);
