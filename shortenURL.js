//設計短網址產生 function 列出優,缺點參照

//1.一個物件含英數:0-9, a-z 共36個 2.設計網址+亂數字母組合
//3.從物件中隨機抽出n個英數

function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charsLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charsLength));
  }
  return result;
}

module.exports = makeid