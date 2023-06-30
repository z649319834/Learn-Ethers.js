// 单位转换 https://github.com/WTFAcademy/WTF-Ethers/blob/main/10_Units/readme.md

import {
  ethers,
  formatUnits,
  getBigInt,
  formatEther,
  parseUnits,
  parseEther,
} from "ethers"

console.log(`js中最大安全整数： ${Number.MAX_SAFE_INTEGER}`)

const oneGwei = getBigInt("1000000000") // 从十进制字符串生成
console.log(oneGwei)
console.log(ethers.getBigInt("0x3b9aca00")) // 从hex字符串生成
console.log(ethers.getBigInt(1000000000)) // 从数字生成
try {
  console.log(getBigInt(Number.MAX_SAFE_INTEGER))
} catch (error) {
  console.log("不能从js最大的安全整数之外的数字生成BigNumber")
}

// 运算
console.log("减法：", oneGwei - 1n)
console.log("加法：", oneGwei + 1n)
console.log("乘法：", oneGwei * 2n)
console.log("除法：", oneGwei / 2n)
console.log("比较是否相等：", oneGwei == 1000000000n)

// 小单位转大单位，formatUnits
console.group("格式化：小单位转大单位，formatUnits")
console.log(formatUnits(oneGwei, 0)) // 0==='wei'
console.log(formatUnits(oneGwei, "gwei")) // 9==='gwei'
console.log(formatUnits(oneGwei, 9)) // 9==='gwei'
console.log(formatUnits(oneGwei, "ether")) // 18==='ether'
console.log(formatUnits(1000000000, "gwei"))
console.log(formatEther(oneGwei)) // formatUnits(oneGwei, "ether")
console.log(formatEther(oneGwei) === formatUnits(oneGwei, "ether"))

console.groupEnd()

// 大单位转小单位，parseUnits, 例如ether转换为wei：parseUnits(变量, 单位),parseUnits默认单位是 ether
console.group("格式化：大单位转小单位，parseUnits")
console.log(parseUnits(`1`))
console.log(parseUnits("1", "ether"))
console.log(parseUnits("1", 18))
console.log(parseUnits("1", "gwei"))
console.log(parseUnits("1", 9))
console.log(parseEther("1") === parseUnits("1", "ether"))
console.groupEnd()
