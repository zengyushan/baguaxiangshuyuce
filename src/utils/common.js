export default {
  /**
   * !递归处理联级数据
   * @param {data} 数组对象
   */
  getTreeData(data) {
    for (let i = 0; i < data?.length; i++) {
      if (data[i].children?.length < 1) {
        // 最后一级没有数据将children变成undefined
        data[i].children = undefined;
      } else {
        // children不为空时继续调用该方法
        this.getTreeData(data[i].children);
      }
    }
    return data;
  },

  /**
   * !千分位格式
   */
  toThousand(value) {
    value = value.toFixed(2);
    let temp = value.split(".");
    return temp[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,") + "." + temp[1];
  },

  /**
   * !判断状态(返回true/false)
   *@param {state}  字段名
   *@param {reg}  是否包含(包含true,不包含false)
   */
  matchState(state = "", reg) {
    return !!String(state).match(reg);
  },

  /**
   * !路由返回(活动)
   * @param {本页面路由} route
   */
  back(route = "", router = "") {
    let arr = route.split("/");
    let l = arr.splice(1, arr.length - 2).join("/");
    return router.push(`/${l}`);
  },

  /**
   * !递归处理联级数据
   * @param {data} 数组对象
   */
  treeData(data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].children.length < 1) {
        // 最后一级没有数据将children变成undefined
        delete data[i].children;
      } else {
        // children不为空时继续调用该方法
        this.treeData(data[i].children);
      }
    }
    return data;
  },

  /**
   * !回显多级
   * @param {key} 后端拿到的id
   * @param {treeData}  options绑定数据
   */
  changeDetSelect(key, treeData) {
    let arr = [];
    let returnArr = [];
    let depth = 0;

    function childrenEach(childrenData, depthN) {
      for (let j = 0; j < childrenData.length; j++) {
        depth = depthN;
        arr[depthN] = childrenData[j].id;
        if (childrenData[j].id == key) {
          returnArr = arr.slice(0, depthN + 1);
          break;
        } else {
          if (childrenData[j].children) {
            depth++;
            childrenEach(childrenData[j].children, depth);
          }
        }
      }
      return returnArr;
    }

    return childrenEach(treeData, depth);
  },

  /**
   * !数组去重
   * @param {arr} 数组对象
   */
  arrUnique: function (arr) {
    return [...new Set(arr)];
  },

  /**
   * !金额格式化，保留两位小数
   * @param {String | Number} money 金额值
   **/
  moneyFormatter(money) {
    if (!money) {
      return 0.0;
    }
    return parseFloat(money)
      .toFixed(2)
      .toString()
      .split("")
      .reverse()
      .join("")
      .replace(/(\d{3})/g, "$1,")
      .replace(/\,$/, "")
      .split("")
      .reverse()
      .join("");
  },

  /**
   * !数组对象去重
   * @param {数组对象} arr
   * @param {唯一标识符} uniId
   */
  uniqueFunc: (arr, uniId) => {
    const res = new Map();
    return arr.filter(
      (item) => !res.has(item[uniId]) && res.set(item[uniId], 1)
    );
  },

  /**
   * !二进制转图片
   * @param {buffer} 二进制图片
   */
  arrayBufferToBase64: (buffer) => {
    let binary = "";
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  },

  /**
   * !数组排序
   *
   * @param {type} 1：从小到大 2：从大到小 3：随机
   * @param {arr} 数组对象
   */
  sort(arr, type = 1) {
    return arr.sort((a, b) => {
      switch (type) {
        case 1:
          return a - b;
        case 2:
          return b - a;
        case 3:
          return Math.random() - 0.5;
        default:
          return arr;
      }
    });
  },

  /**
   * !格式化时间
   *
   * @param  {time} 时间
   * @param  {cFormat} 格式
   * @return {String} 字符串
   *
   * @example formatTime('2018-1-29', '{y}/{m}/{d} {h}:{i}:{s}') // -> 2018/01/29 00:00:00
   */
  parseTime: (time, cFormat) => {
    if (arguments.length === 0 || !time) {
      return null;
    }
    const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
    let date;
    if (typeof time === "object") {
      date = time;
    } else {
      if (typeof time === "string") {
        if (/^[0-9]+$/.test(time)) {
          // support "1548221490638"
          time = parseInt(time);
        } else {
          // support safari
          // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
          time = time.replace(new RegExp(/-/gm), "/");
        }
      }

      if (typeof time === "number" && time.toString().length === 10) {
        time = time * 1000;
      }
      date = new Date(time);
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay(),
    };
    const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
      const value = formatObj[key];
      // Note: getDay() returns 0 on Sunday
      if (key === "a") {
        return ["日", "一", "二", "三", "四", "五", "六"][value];
      }
      return value.toString().padStart(2, "0");
    });
    return time_str;
  },

  /**
   * !去除空格
   * @param {str} 字符串
   * @param {type}  1-所有空格 2-前后空格 3-前空格 4-后空格
   */
  trim: (str, type) => {
    type = type || 1;
    switch (type) {
      case 1:
        return str.replace(/\s+/g, "");
      case 2:
        return str.replace(/(^\s*)|(\s*$)/g, "");
      case 3:
        return str.replace(/(^\s*)/g, "");
      case 4:
        return str.replace(/(\s*$)/g, "");
      default:
        return str;
    }
  },

  /**
   * !手机号隐藏中间四位
   * @param {phone} 手机号
   */
  phoneHideMidFour(phone) {
    var newPhone = phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
    return newPhone;
  },

  /**
   * !刷新页面
   */
  refreshPage() {
    window.location.reload();
  },

  /**
   * !显示尾号四位
   * @param {phone} 手机号
   */
  phoneShowTailFour: (phone) => {
    // var newPhone = phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    return phone.slice(-4).padStart(phone.length, "*");
  },

  /**
   * !获取url参数
   * @param name
   */
  getUrlParam: (name) => {
    let reg = new RegExp("(^|&?)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.href.substr(1).match(reg);
    if (r != null) {
      return decodeURI(r[2]);
    }
    return undefined;
  },

  /**
   * !生成随机数范围
   * @param min
   * @param max
   */
  random: (min, max) => {
    // 生成随机数范围
    if (arguments.length === 2) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    } else {
      return null;
    }
  },

  /**
   * !判断类型集合
   */
  checkStr: (str, type) => {
    switch (type) {
      case "phone": //手机号码
        return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
      case "tel": //座机
        return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
      case "card": //身份证
        return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
      case "pwd": //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
        return /^[a-zA-Z]\w{5,17}$/.test(str);
      case "postal": //邮政编码
        return /[1-9]\d{5}(?!\d)/.test(str);
      case "QQ": //QQ号
        return /^[1-9][0-9]{4,9}$/.test(str);
      case "email": //邮箱
        return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
      case "money": //金额(小数点2位)
        return /^\d*(?:\.\d{0,2})?$/.test(str);
      case "URL": //网址
        return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(
          str
        );
      case "IP": //IP
        return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(
          str
        );
      case "date": //日期时间
        return (
          /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(
            str
          ) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str)
        );
      case "number": //数字
        return /^[0-9]$/.test(str);
      case "english": //英文
        return /^[a-zA-Z]+$/.test(str);
      case "chinese": //中文
        return /^[\\u4E00-\\u9FA5]+$/.test(str);
      case "lower": //小写
        return /^[a-z]+$/.test(str);
      case "upper": //大写
        return /^[A-Z]+$/.test(str);
      case "HTML": //HTML标记
        return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
      default:
        return true;
    }
  },

  /**
   * !返回数据类型
   *
   * @param {para} 查看数据
   */
  type: (para) => {
    return Object.prototype.toString.call(para);
  },

  /**
   * !二维数组转对象数组(活动)
   * @param {*} arr
   */
  handleData(arr) {
    let obj = {};
    let shops = [
      {
        mallId: "",
        shopIds: [],
      },
    ];

    arr.forEach((item) => {
      if (!obj[item[0]]) {
        obj[item[0]] = [];
      }
      obj[item[0]].push(item[1]);
    });

    for (let key in obj) {
      let shop = {
        mallId: key,
        shopIds: [],
      };
      obj[key].forEach((item) => {
        shop.shopIds.push(item);
      });
      shops.push(shop);
    }
    shops.splice(0, 1);

    return shops;
  },

  /**
   * !替换数组对象的键名(活动)
   *
   *@param {obj}  需要替换的数组
   *@param {title}  替换title
   *@param {value}  替换value
   *@param {children}  替换children
   */
  treeReplace(obj = [], title = "", value = "", children = "") {
    const str = JSON.stringify(obj);
    const res = JSON.parse(
      str
        .replace(eval(`/${title}/g`), "title")
        .replace(eval(`/${value}/g`), "value")
        .replace(eval(`/${children}/g`), "children")
    );
    return res;
  },

  /**
   * !获取当前时间(商品)
   */
  getTime() {
    let arr = [];
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    arr.push(
      [h, m, s].map((v) => (v < 10 ? "0" + v : v)).join(":"),
      "23:59:59"
    );
    return arr;
  },

  /**
   *
   * @param {时间戳或者data格式} dateData
   * @param {1-返回年月日时分秒 2-返回年月日 3-返回年 } type
   * @returns
   */
  formatTime(dateData, type = 1) {
    var date = new Date(dateData);
    let Y = date.getFullYear() + "-";
    let M =
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) + "-";
    let D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let h =
      date.getHours() < 10
        ? "0" + date.getHours() + ":"
        : date.getHours() + ":";
    let m =
      date.getMinutes() < 10
        ? "0" + date.getMinutes() + ":"
        : date.getMinutes() + ":";
    let s =
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

    switch (type) {
      case 1:
        return Y + M + D + " " + h + m + s;
      case 2:
        return Y + M + D;
      case 3:
        return Y;
    }
  },

  /**
   * 动画持续时间处理
   * @param {number} to
   * @param {number} duration
   * @param {Function} callback
   */
  scrollTo(to, duration, callback) {
    const start = position();
    const change = to - start;
    const increment = 20;
    let currentTime = 0;
    duration = typeof duration === "undefined" ? 500 : duration;
    var animateScroll = function () {
      // increment the time
      currentTime += increment;
      // find the value with the quadratic in-out easing function
      var val = Math.easeInOutQuad(currentTime, start, change, duration);
      // move the document.body
      move(val);
      // do the animation unless its over
      if (currentTime < duration) {
        requestAnimFrame(animateScroll);
      } else {
        if (callback && typeof callback === "function") {
          // the animation is done so lets callback
          callback();
        }
      }
    };
    animateScroll();
  },
};
