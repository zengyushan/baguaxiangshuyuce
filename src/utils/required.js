export default {
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
   * !表单校验身份证号(合伙人)
   */
  vltCard(rule, value, callback) {
    if (!value) {
      callback(new Error("请输入身份证号"));
    } else if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
      callback(new Error("请输入正确格式的身份证号"));
    } else {
      callback();
    }
  },
  /**
   * !表单校验手机号(合伙人)
   */
  vltPhone(rule, value, callback) {
    if (!value) {
      callback(new Error("请输入手机号码"));
    } else if (!/^1[3|4|5|6|7|8|9][0-9]{9}$/.test(value)) {
      callback(new Error("请输入正确格式的手机号码"));
    } else {
      callback();
    }
  },
  /**
   * !表单校验发放金额(合伙人)
   */
  checkPrice(rule, value, callback) {
    if (!value) {
      callback(new Error("请输入发放金额"));
    } else if (value == Infinity || value > Math.pow(2, 31) - 1) {
      callback(new Error("您填写的数字过长"));
    } else if (!/^\d+(\.\d{1,2})?$/.test(value)) {
      callback(new Error("请输入小数不超过两位的自然数"));
    } else {
      callback();
    }
  },
};
