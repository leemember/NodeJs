# 🌼 3장 노드 기능 알아보기

## 1. REPL 사용하기
> 입력한 코드를 읽고(read) 해석하고(eval) 결과물을 반환하고(print) 종료할 때 까지 반복한다(loop)고 해서 REPL이라고 부릅니다.
콘솔에서 node [자바스크립트 파일 경로] 로 실행하면된다. 확장자 js는 생략해도된다. 

```
$node hellowolrd
```
콘솔에서 REPL로 들어가는 명령어가 node고 노드를 통해 파일을 실행하는 명령어는 node [자바스크립트 파일경로] 가 된다.

## 2. 모듈로 만들기
> 모듈이란 특정한 기능을 하는 함수나 변수들의 집합이다. 모듈은 자체로도 하나의 프로그램이면서 다른 프로그램의 부품으로도 사용할 수 있다. 그리고 모듈로 만들어두면 여러 프로그램에 해당 모듈을 '재사용'할 수 있다. 자바스크립트에서 코드를 재사용하기 위해 함수로 만드는 것과 비슷하다. 보통 파일 하나가 모듈 하나가 된다. 파일별로 코드를 모듈화할 수 있어서 관리하기가 편하다.

```
const odd = '홀수입니다';
const even = '짝수입니다';

module.exports = {
  odd,
  even,
};

```

var.js 파일을 만들어서 변수 두 개를 선언하고, module.exports에 변수들을 담은 객체를 대입했다. 이제 이 파일은 모듈로서 가능하다. 변수들을 모아둔 모듈이 되는것이다. 다른 파일에서 이 파일을 불러오면 module.exports에 대입된 값을 사용할 수 있다. 위 처럼 func.js 파일도 만들어준다.
그리고 index.js파일에 두 파일을 모두 참조시킨다. 이렇게 모듈 하나가 여러 개의 모듈을 사용할 수 있는 것이다. var.js가 func.js와 index.js에 두 번 쓰이는 것처럼, 모듈 하나가 여러 개의 모듈에 사용될 수도 있다.

```
const { odd, even } = require('./var');
const checkNumber = require('./func');

function checkStringOddOrEven(str) {
  if (str.length % 2) { // 홀수면
    return odd;
  }
  return even;
}

console.log(checkNumber(10));
console.log(checkStringOddOrEven('hello'));
```

> 이렇게 여러 파일에 걸쳐 재사용되는 함수나 변수를 모듈로 만들어두면 편하다. 그러나 모듈이 많아지고 모듈간의 관계가 얽히게 되면 구조를 파악하기 어렵다는 단점도 있다. 노드는 대부분의 파일이 다른 파일을 모듈로 사용하고 있으므로 모듈을 만들고 사용하는 방법을 꼭 알아두어야 한다.
그리고 es2015문법으로 module.exports = checkOddOrEven;를 export default checkOddOrEven; 이런식으로 바꿔주고 싶다면, 확장자를 mjs로 해야된다. 근데 확장자를 js로 해주고 싶다면 package.json에서 type: "module" 속성을 넣어주면 된다. 😈 더 자세한 설명은 func.mjs 파일 참고하기

```
import { odd, even } from './var';

function checkOddOrEven(num) {
  if (num % 2) { // 홀수면
    return odd;
  }
  return even;
}

export default checkOddOrEven;
```

그리고 여기서는 require 함수나 module 객체르 ㄹ따로 선언하지 않았음에도 사용할 수 있었다. 이건 어떻게 가능했냐면, 바로 노드에서 기본적으로 제공하는 내장 객체이기 때문이다. 

## 3. 노드 내장 객체 알아보기

### global
> 이 객체는 브라우저의 윈도우와 같은 전역 객체이다. 전역 객체이므로 모든 파일에서 접근할 수 있다. 또한 window.open 메서드를 그냥 open으로 호출할 수 있는 것처럼 global도 생략할 수 있다. require 함수도 global.require에서 global이 생략된 것이다. 노드 콘솔에 로그를 기록하는 console 객체도 원래는 global.console이다. 이렇게 global 객체 내부에는 매우 많은 속성이 들어있다. global 내부를 보려면 REPL을 이용해야 한다.

- 노드에 DOM이나 BOM이 없으므로 윈도우와 document 객체는 노드에서 사용할 수 없다. 노드에서 윈도우 또는 document를 사용하면 에러가 발생한다.

