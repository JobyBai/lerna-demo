/**
 * 深拷贝, 数组和对象
 */

/** 是否是对象 */
const isObject = (obj: any): boolean => obj && typeof obj === 'object' && !isArray(obj)

/** 是否是函数 */
const isFunction = (obj: any): boolean => obj && typeof obj === 'function'

/** 是否是数组 */
const isArray = (obj: any): boolean => obj && Array.isArray(obj)

/** 是否是正则 */
const isRegExp = (obj: any): boolean => obj && obj instanceof RegExp

/** 深拷贝 */
const deepClone = (obj: any) => {
  let res: any
  if (isArray(obj)) {
    // 数组处理
    res = []
    for (const item of obj) {
      if ((isObject(item) || isArray(item)) && !isRegExp(item)) {
        res.push(deepClone(item))
      } else {
        res.push(item)
      }
    }
  } else if (isObject(obj)) {
    res = {}
    const _keys = Object.keys(obj)
    for (const key of _keys) {
      const item = obj[key]
      if ((isObject(item) || isArray(item)) && !isRegExp(item)) {
        res[key] = deepClone(item)
      } else {
        res[key] = item
      }
    }
  }

  return res
}

export default deepClone
