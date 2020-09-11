/**
 * 时间格式化
 * @param {*} date Date对象 或 时间戳
 * @param {*} fmt "yyyy-MM-dd hh:mm:ss"
 */
 export function formatTime(date:any, fmt = "yyyy-MM-dd hh:mm:ss"):string{
    if (!date) return date;
    if (!(date instanceof Date)) {
      date = new Date(parseInt(date));
    }
    interface obj{
      [p:string]:any
    }
    var o:obj = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3) //季度
    };
    // 格式化年
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    }
    // 格式化毫秒
    if (/(S+)/.test(fmt)) {
      const tmp = date.getMilliseconds();
      fmt = fmt.replace(
        RegExp.$1,
        ("000" + tmp).substr(("" + tmp).length)
      );
    }
    // 格式化其它
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
        );
      }
    }
    return fmt;
  }