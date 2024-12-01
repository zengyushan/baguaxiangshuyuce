/**
 * ?过滤器
 */

/**
 * !时间格式
 * @param {time} 时间
 */
export const normalizeDate = time => {
  let date = new Date(time)

  let y = date.getFullYear()
  let M = date.getMonth() + 1
  let d = date.getDate()

  let h = date.getHours()
  let m = date.getMinutes()
  let s = date.getSeconds()

  return [y, M, d].map(v => v < 10 ? '0' + v : v).join('-') + ' ' + [h, m, s].map(v => v < 10 ? '0' + v : v).join(':')
}

/**
 * 首字母大写
 *
 * @param {str} 字符串
 */
export const firstUpperCase = str => {
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}

/**
 * !千分位， 使用逗号分割
 *
 * @param {value} 数字
 */
export const toThousand = value => {
  value = value.toFixed(2)
  let temp = value.split('.')
  return temp[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,') + '.' + temp[1]
}

/**
 * !截取一串url最后的文件名
 * @param {url} 网址
 */
export const subImg = url => url.slice(url.lastIndexOf("/") + 1)

/**
 * !将阿拉伯数字转换为大写数字
 * @param {value} 数字
 */
export const replaceText = value => {
  let cnum = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
  let s = '';
  value = '' + value;
  for (let i = 0; i < value.length; i++) {
    s += cnum[parseInt(value.charAt(i))];
  }
  if (s.length == 2) {
    if (s.charAt(1) == cnum[0]) {
      s = s.charAt(0) + cnum[10];
      if (s == cnum[1] + cnum[10]) {
        s = cnum[10]
      }
    } else if (s.charAt(0) == cnum[1]) {
      s = cnum[10] + s.charAt(1);
    } else if (s.charAt(0) == cnum[2]) {
      s = cnum[2] + cnum[10] + s.charAt(1);
    } else if (s.charAt(0) == cnum[3]) {
      s = cnum[3] + cnum[10] + s.charAt(1);
    } else if (s.charAt(0) == cnum[4]) {
      s = cnum[4] + cnum[10] + s.charAt(1);
    } else if (s.charAt(0) == cnum[5]) {
      s = cnum[5] + cnum[10] + s.charAt(1);
    } else if (s.charAt(0) == cnum[6]) {
      s = cnum[6] + cnum[10] + s.charAt(1);
    } else if (s.charAt(0) == cnum[7]) {
      s = cnum[7] + cnum[10] + s.charAt(1);
    } else if (s.charAt(0) == cnum[8]) {
      s = cnum[8] + cnum[10] + s.charAt(1);
    } else if (s.charAt(0) == cnum[9]) {
      s = cnum[9] + cnum[10] + s.charAt(1);
    } else if (s.charAt(0) == cnum[10]) {
      s = cnum[10] + cnum[10] + s.charAt(1);
    }
  }

  return s;
}
