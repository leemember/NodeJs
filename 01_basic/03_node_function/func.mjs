import { odd, even } from './var';

function checkOddOrEven(num) {
  if (num % 2) { // 홀수면
    return odd;
  }
  return even;
}

export default checkOddOrEven; // 이렇게 바뀌기 전에는 module.exports = checkOddOrEven; 이랬음

// es2015가 도입되면서 자바스크립트도 자체 모듈 시스템 문법이 생겼다.
// 이 문법은 노드의 모듈 시스템과 조금 다르다.
// 본문의 func.js를 ES2015 모듈 스타일로 바꿔보면
// 위 코드처럼, require와 module.exports가 import, exprot default로 바뀌었다.

// 😈 하지만 확장자를 mjs로 지정해야 하는 제한이 있다. mjs 확장자 대신 js 확장자를 사용하면서 2015모듈을 사용하려면
// 😈 package.json에서 type: "module" 속성을 넣어주면 된다.
// 😈 리액트에서는 자동으로 export default checkOddOrEven; 이렇게 해줌