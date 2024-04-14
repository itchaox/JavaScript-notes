/*
 * @Version    : v1.00
 * @Author     : itchaox
 * @Date       : 2024-04-14 09:37
 * @LastAuthor : itchaox
 * @LastTime   : 2024-04-14 10:42
 * @desc       :
 */

// 工作中暂时没怎么用过，所以简单记录一下就行
// 我发现我进步了，以前遇到这种知识点我肯定又是记得详细的很
// 但是却没有自己的思考，以前不过就是把其他资料摘抄过来而已
// 现在我学会根据自己的工作使用情况，来判定这个知识点的重要性以及如何记录
// 以前那种把所有知识点全部摘抄过来，不过是自我感动罢了
// 现在要学会多独立思考，不要再做这样的自我感动行为了

const s1 = Symbol();

const s2 = Symbol();

console.log(s1, s2); // Symbol() Symbol()

let obj = {
  [s1]: 's1',
  [s2]: 's2',
};

console.log(obj[s1], obj[s2]); // s1 s2
