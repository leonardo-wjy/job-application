module.exports = {
    convertDateFormat(inputDate) {
      // Split the input date into day, month, and year
      const parts = inputDate.split('/');
      
      // Rearrange the parts to form the new date format
      const newDateFormat = `${parts[2]}-${parts[1]}-${parts[0]}`;
      
      return newDateFormat;
    },
    removeString(string) {
        return string.replace(/[`~!@#$%^&*()|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "");
      },    
    totalPage(totalData, dataperPage = 10) {
        if (totalData == 0) {
          return 0;
        }
        return Math.ceil(totalData / dataperPage);
    },
    replaceAll(str, mapObj) {
      const re = new RegExp(Object.keys(mapObj).join("|"), "gim");
  
      return str.replace(re, function (matched) {
        return mapObj[matched];
      });
    },  
    randomName(length = 10) {
      const crypto = require("crypto");
      const randomStr = crypto.randomBytes(length).toString("hex");
      const time = new Date().getTime();
      const name = `${randomStr}_${time}`;
  
      return name;
    },
    get_random(arr) {
      
      // arr = arr.slice(); // shallow copy
      for (var i = 0; i < arr.length; i++) {
          var j = Math.floor(Math.random() * (arr.length - i)) + i;
          [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
      }
      return arr;
    }
  
    
}