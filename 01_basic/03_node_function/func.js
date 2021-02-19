const { odd, even } = require('./var');

function checkOddOrEven(num) {
  if (num % 2) { // 홀수면
    return odd;
  }
  return even;
}

module.exports = checkOddOrEven;

/*

require 함수 안에 불러올 모듈의 경로를 적는다.
위 예제는 같은 폴더 안에 파일을 만들었지만, 다른 폴더에 있는 파일도 모듈로 사용할 수 있다.
require함수의 인수로 제공하는 경로만 잘 저장하면 된다.

👻 파일경로에서 js나 json같은 확장자는 생략할 수 있다.
예제 코드에서 require함수로 var.js에 있던 값들을 불러오고 있다.
const { odd, even } 은 es2015+ 문법이다.
var.js에서 변수를 불러온 뒤, 숫자의 홀짝을 판별하는 함수를 선언했고 다시 module.exports에 함수를 대입했다.
👻 이렇게 다른 모듈을 사용하는 파일을 다시 모듈로 만들 수 있다.
👻 또한 module.exports 에는 객체만 대입해야 하는 것이 아니라 함수나 변수를 대입해도 된다.

*/