class NumberChange {
  //其他进制转十进制
  changeToDec(numbers, base) {
    var sum = 0;
    var length = numbers.length
    for (let i = 0; i < length; i++) {
      let number = parseInt(numbers[i]);
      sum += Math.pow(base, length - i - 1);
    }
    return sum.toString();
  }
  //十进制转换其他进制
  decChange(numbers, base) {
    var num = parseInt(numbers);
    var str = '';
    var k = parseInt(num);
    var m = num % base;
    while (k >= base) {
      str = m > 9 ? String.fromCharCode(0x40 + (m - 9)) + str : m.toString() + '.' + str;
      k = parseInt(k / base);
      m = k % base;
    }
    str = m > 9 ? String.fromCharCode(0x40 + (m - 9)) + str : m.toString() + '.' + str;
    return str;
  }
}



export default NumberChange; 