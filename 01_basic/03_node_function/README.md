# 🌼 3장 노드 기능 알아보기

## 1. REPL 사용하기

> 입력한 코드를 읽고(read) 해석하고(eval) 결과물을 반환하고(print) 종료할 때 까지 반복한다(loop)고 해서 REPL이라고 부릅니다.
> 콘솔에서 node [자바스크립트 파일 경로] 로 실행하면된다. 확장자 js는 생략해도된다.

```
$node hellowolrd
```

콘솔에서 REPL로 들어가는 명령어가 node고 노드를 통해 파일을 실행하는 명령어는 node [자바스크립트 파일경로] 가 된다.

<br>
<br>

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
> 그리고 es2015문법으로 module.exports = checkOddOrEven;를 export default checkOddOrEven; 이런식으로 바꿔주고 싶다면, 확장자를 mjs로 해야된다. 근데 확장자를 js로 해주고 싶다면 package.json에서 type: "module" 속성을 넣어주면 된다. 😈 더 자세한 설명은 func.mjs 파일 참고하기

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

<br>
<br>

## 3. 노드 내장 객체 알아보기

### global

> 이 객체는 브라우저의 윈도우와 같은 전역 객체이다. 전역 객체이므로 모든 파일에서 접근할 수 있다. 또한 window.open 메서드를 그냥 open으로 호출할 수 있는 것처럼 global도 생략할 수 있다. require 함수도 global.require에서 global이 생략된 것이다. 노드 콘솔에 로그를 기록하는 console 객체도 원래는 global.console이다. 이렇게 global 객체 내부에는 매우 많은 속성이 들어있다. global 내부를 보려면 REPL을 이용해야 한다.

- 노드의 윈도우, document 객체
  노드에 DOM이나 BOM이 없으므로 윈도우와 document 객체는 노드에서 사용할 수 없다. 노드에서 윈도우 또는 document를 사용하면 에러가 발생한다.

😈 global 객체 안에는 수십 가지 속성이 담겨있다. 그리고 전역 객체라는 점을 이용하여 파일 간에 간단한 데이터를 공유 할 때 사용하기도 한다.

- [globalA]

```
module.exports = () => global.message;
```

- [globalB]

```
const A = require('./globalA');

global.message = '안녕하세요';
console.log(A());
```

> 결과값 : 안녕하세요

이렇게 두 가지 버전의 global 파일을 만들어보았다. 먼저 a에 모듈의 함수는 global.message를 반환한다. B에서는 global 객체에 속성명이 message인 값을 대입하고 globalA 모듈의 함수를 호출한다. 콘솔 결과는 globalB에서 넣은 global.message 값을 globalA에서도 접근할 수 있음을 보여준다.

### console

> 지금까지 사용했던 console도 노드에서는 윈도우 대신 global 객체 안에 들어 있으며, 브라우저에서의 console과 거의 비슷하다.
> console 객체는 보통 디버깅을 위해 사용한다. 개발하면서 변수에 값이 제대로 들어 있는지 확인하기 위해 사용하고 에러 발생 시 에러 내용을 콘솔에 표시하기 위해 사용하며, 코드 실행 시간을 알아보려고 할 때도 사용한다. 대표적으로는 console.log 메서드가 있다. console.log 는 지금껏 계속 사용했으므로 익숙 할 것이다. 다른 로깅 함수들도 알아보자 !!!!

[console.js 참고]

```
console.time('전체시간');
console.log('평범한 로그입니다 쉼표로 구분해 여러 값을 찍을 수 있습니다');
console.log(string, number, boolean);
console.error('에러 메시지는 console.error에 담아주세요');

console.table([{ name: '제로', birth: 1994 }, { name: 'hero', birth: 1988}]);

console.dir(obj, { colors: false, depth: 2 });
console.dir(obj, { colors: true, depth: 1 });

console.time('시간측정');
for (let i = 0; i < 100000; i++) {}
console.timeEnd('시간측정');
```

- console.time(레이블) : console.timeEnd(레이블)과 대응되어 같은 레이블을 가진 time과 timeEnd 사이의 시간을 측정합니다.
- console.log(내용) : 평범한 로그를 콘솔에 표시합니다.
- console.error(에러내용) : 에러를 콘솔에 표시합니다.
- console.table(배열) : 배열의 요소로 객체 리터럴을 넣으면, 객체의 속성들이 테이블 형식으로 표현됩니다.
- console.dir(객체, 옵션) : 객체를 콘솔에 표시할 때 사용합니다. 첫 번째 인수로 표시할 객체를 넣고, 두 번째 인수로 옵션을 넣습니다. 옵션의 colors를 true로 하면 콘솔에 색이 추가되어 보기가 한결 편해집니다. depth는 객체 안의 객체를 몇 단계까지 보여줄지를 결정합니다. 기본값은 2입니다.
- console.trace(레이블) : 에러가 어디서 발생했는지 추적할 수 있게 합니다. 일반적으로 에러 발생 시 에러 위치를 알려주므로 자주 사용하지는 않지만, 위치가 나오지 않는다면 사용 할 만 합니다.

### ✨ 타이머

타이머 기능을 제공하는 함수인 setTimeout, setInterval, setImmediate 는 노드에서 window 대신 global 객체 안에 들어 있습니다. setTimeout, setInterval은 웹 브라우저에서도 자주 사용되니 익숙 한 타이머 이벤트다.

- setTimeout(콜백함수, 밀리초) : 주어진 밀리초(1,000분의 1초) 이후에 콜백 함수를 실행합니다.
- setInterval(콜백함수, 밀리초) : 주어진 밀리초마다 콜백 함수를 반복 실행합니다.
- setImmediate(콜백함수) : 콜백 함수를 즉시 실행합니다.

이 타이머 함수들은 모두 아이디를 반환합니다. 아이디를 사용하여 타이머를 취소할 수 있습니다.

- clearTimeout : setTimeout을 취소합니다.
- clearInterval : setInterval을 취소합니다.
- clearImmediate : setImmediate을 취소합니다.

### ✨ **filename, **dirname

> 노드에서는 파일 사이에 모듈 관계가 있는 경우가 많으므로 때로는 현재 파일의 경로나 파일명을 알아야 한다. 노드는 **filename, **dirname이라는 키워드로 경로에 대한 정보를 제공한다. 파일에 **filename, **dirname를 넣어두면 실행 시 현재 파일명과 현재 파일 경로로 바뀐다.

### ✨ module, exports, require

> 지금까지는 모듈을 만들 때 module.exports만 사용했는데, module 객체 말고 exports 객체로도 모듈을 만들 수 있다.
> 이전 var.js파일을 index.js에서 동일하게 볼 수 있는 것을 확인해 보았다. module exports로 한 번에 대입하는 대신, 각각의 변수를 exports 객체에 하나씩 넣었다. 동일하게 동작하는 이유는 module.exports와 exports가 같은 객체를 참조하기 때문이다. 실제로 console.log(module.exports === exports)를 하면 true가 나온다. 따라서 exports 객체에 add 함수를 넣으면 module.exports에도 add 함수가 들어간다.

그리고 exports 객체를 사용할 때는 module.exports와의 참조 관계가 깨지지 않도록 주의해야 한다. module.exports는 어떤 값이든 대입해도 되지만, exports에는 반드시 객체처럼 속성명과 속성값을 대입해야한다. exports에 다른 값을 대입하면 객체의 참조 관계가 끊겨 더 이상 모듈로 기능하지 않는다.
exports를 사용할 때는 객체만 사용할 수 있으므로 func.js와 같이 module.exports에 함수를 대입한 경우에는 exports로 바꿀 수 없다.
🖐 exports와 module.exports를 동시에 사용하지 않는 것이 좋다. 🖐

### ✨ process

> process 객체는 현재 실행되고 있는 노드 프로세스에 대한 정보를 담고 있다. process 객체 안에는 다양한 속성이 있는데, 하나씩 REPL에 따라 입력해보자.

- process.version : 설치된 노드의 버전
- process.arch : 프로세서 아키텍처 정보
- process.platform : 운영체제 플랫폼
- process.pid : 현재 프로세스의 아이디
- process.uptime() : 프로세스가 시작된 후 흐른 시간
- process.execPath : 노드의 경로
- process.cwd() : 현재 프로세스가 실행되는 위치
- process.cpuUsage() : 현재 cpu 사용량

### ✨ process.env

> REPL에 process.env를 입력하면 매우 많은 정보가 출력된다. 자세히 보면 이 정보들이 시스템의 환경 변수임을 알 수 있다. 시스템 환경 변수는 노드에 직접 영향을 미치기도 한다. 시스템 환경 변수 외에도 우리가 임의로 환경 변수를 저장 할 수 있다. <b>process.env는 서비스의 중요한 키를 저장하는 공간</b>으로도 사용한다. <b>서버나 데이터베이스의 비밀번호와 각종 API키를 코드에 직접 입력하는 것은 위험</b>합니다. 혹여 서비스가 해킹을 당해 코드가 유출되었을 때는 비밀번호가 코드에 남아있어 추가 피해가 발생할 수도 있다. 따라서 <b>중요한 비밀번호는 process.env의 속성으로 대체</b>해야한다.

```
const secretId = process.env.SECRET_ID;
const secretPw = process.env.SECRET_CODE;
```

이런 식으로 process.env뒤에 직접 넣어주면 된다. 실제로 노드버드 클론코딩 프로젝트를 통해 이 과정을 거쳤다. 매우 중요한 부분! 👊
넣는 방법은 운영체제마다 차이가 있는데, 한 번에 모든 운영체제에 동일하게 넣을 수 있는 방법은 'dotenv' 라이브러리를 설치해 사용하면 된다. 이 부분은 나중가면 배움

### ✨ process.nextTick(콜백)

> process.nextTick은 setImmediate나 setTimeout보다 먼저 실행된다.

### ✨ process.exit(코드)

> 실행중인 노드 프로세스를 종료한다. 서버 환경에서 이 함수가 사용하면 서버가 멈추므로 특수한 경우를 제외하고는 서버에서 잘 사용되지 않는다. 하지만 서버 외의 독립적인 프로그램에서는 수동으로 노드를 멈추기 위해 사용

<br>
<br>

## 4. 노드 내장 모듈 사용하기

> ✊ 노드는 웹 브라우저에서 사용되는 자바스크립트보다 더 많은 기능을 제공한다. 운영체제 정보에도 접근할 수 있고 클라이언트가 요청한 주소에 대한 정보도 가져올 수 있다. 노드에서 이러한 기능을 하는 모듈을 제공해준다!

### ✨ OS

> 노드는 os모듈에 정보가 담겨 있어 정보를 가져올 수 있다.

### ✨ path

> 폴더와 파일의 경로를 쉽게 조작하도록 도와주는 모듈. path 모듈이 필요한 이유 중 하나는 운영체제별로 경로 구분자가 다르기 때문입니다.

- path.dirname(경로): 파일이 위치한 폴더 경로를 보여준다.
- path.extname(경로): 파일의 확장자를 보여준다.
- path.basename(경로, 확장자): 파일의 이름(확장자 포함)을 표시한다. 파일의 이름만 표시하고 싶다면 basename의 두 번째 인수로 파일의 확장자를 넣으면된다.
- path.join(경로, …): 여러 인수를 넣으면 하나의 경로로 합친다. 상대경로인 ..(부모 디렉터리)과 .(현 위치)도 알아서 처리한다.
- path.resolve(경로, …): path.join()과 비슷하지만 차이가 있다.

### ✨ join과 resolve의 차이

path.join과 path.resolve 메서드는 비슷해 보이지만 동작 방식이 다르다. /를 만나면 path.resolve는 절대경로로 인식해서 앞의 경로를 무시하고, path.join은 상대경로로 처리한다.

### ✨ url

> 인터넷 주소를 쉽게 조작하도록 도와주는 모듈

- url.parse(주소) : 주소를 분해한다. username과 password 대신 auth 속성이 있고, searchParams 대신 query가 있다.
- url.format(객체) : 분해되었던 url 객체를 다시 원래 상태로 조립

search 부분은 보통 주소를 통해 데이터를 전달할 때 사용. search는 물음표(?)로 시작하고, 그 뒤에 키=값 형식으로 데이터를 전달한다. 여러 키가 있을 경우에는 &로 구분한다.

```
http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript
```

와 같은 주소에서는

```
?page=3&limit=10&category=nodejs&category=javascript
```

부분이 search다

### ✨ crypto

> 다양한 방식의 암호화를 도와주는 모듈이다. 회원가입 페이지 만들 때 필요하다!

### ✨ util

> util이라는 이름처럼 각종 편의 기능을 모아둔 모듈

<br>
<br>

## 5. 파일 시스템 접근하기

> fs모듈은 파일 시스템에 접근하는 모듈이다. 파일을 생성하거나 삭제하고 읽고 쓸 수 있다. 폴더도 만들거나 지울 수 있다.

[readme.txt]

```
저를 읽어주세요.
```

[[readme.txt]

```
const fs = require('fs');

fs.readFile('./readme.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log(data);
  console.log(data.toString());
});
```

> 사람이 읽을 수 있는 형식으로 만들어준다. => toString을 사용해 문자열로 변환한다

### ✨ 동기 메서드와 비동기 메서드

> setTimeout 같은 타이머와 process.nextTick 외에도, 노드는 대부분의 메서드를 <b>비동기 방식으로 처리</b>합니다. 하지만 <b>몇몇 메서드는 동기 방식으로도 사용할 수 있습니다.</b> 특히 fs 모듈이 그러한 메서드를 많이 가지고 있습니다. 어떤 메서드가 동기 또는 비동기 방식으로 동작하는지와 언제 어떤 메서드를 사용해야 하는지를 알아보겠습니다.

- 동기와 비동기 : 백그라운드 작업 완료 확인 여부
- 블로킹과 논 블로킹 : 함수가 바로 return 되는지 여부

> 노드에서는 동기-블로킹 방식 / 비동기-논 블로킹 방식이 대부분이다.

- 동기-블로킹 방식 : 백그라운드 작업 완료 여부를 계속 확인하며, 호출한 함수가 바로 return 되지 않고 백그라운드 작업이 끝나야 return 된다.

- 비동기-논블로킹 방식 : 호출한 함수가 바로 return되어 다음 작업으로 넘어가며, 백그라운드 작업 완료 여부는 신경 쓰지 않고 나중에 백그라운드가 알림을 줄 때 비로소 처리한다.

```
const fs = require('fs');

console.log('시작');
let data = fs.readFileSync('./readme2.txt');
console.log('1번', data.toString());
data = fs.readFileSync('./readme2.txt');
console.log('2번', data.toString());
data = fs.readFileSync('./readme2.txt');
console.log('3번', data.toString());
console.log('끝');
```

순서대로 출력하고 싶다면 이런 메서드를 사용할 수 있다. 하지만 readFileSync 메서드를 사용하면 요청이 수백 개 이상 들어올 떄 성능에 문제가 생길 수 있다. 그래서 Sync 메서드를 사용할 때는 이전 작업이 완료되어야 다음 작업을 진행할 수 있다.

즉, 백그라운드가 작업하는 동안 메인 스레드는 아무것도 하지 못하고 대기하고 있어야 된다는 것이다. 메인 스레드가 일을 하지않고 노는 시간이 생기므로 <b>비효율적이다</b>

백그라운드는 fs작업을 동시에 처리할 수도 있는데, Sync 메서드를 사용하면 백그라운드조차 동시에 처리할 수 없게 된다. <b>비동기 fs 메서드</b>를 사용하면 백그라운드가 동시에 작업할 수도 있고, 메인 스레드는 다음 작업을 처리할 수 있다.

✨ 동기 메서드들은 이름 뒤에 Sync가 붙어 있어 구분하기가 쉽다.
writeFileSync 이렇게 Sync가가 붙는 것들이 동기메서드들이다. 하지만 동기 메서드를 사용해야 하는 경우는 극히 드물다. 프로그램을 처음 실행할 때 초기화 용도로만 사용하는 것을 권장한다.

✨ 대부분 경우에는 비동기 메서드가 훨씬 더 효율적이다. 비동기 방식으로 하되 순서를 유지하고 싶다면

```
const fs = require('fs');

console.log('시작');
fs.readFile('./readme2.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('1번', data.toString());
  fs.readFile('./readme2.txt', (err, data) => {
    if (err) {
      throw err;
    }
    console.log('2번', data.toString());
    fs.readFile('./readme2.txt', (err, data) => {
      if (err) {
        throw err;
      }
      console.log('3번', data.toString());
      console.log('끝');
    });
  });
});
```

이렇게 작업하면 된다. 이전 readFile의 콜백 다음에 readFile을 넣으면 됨. 콜백 지옥이 펼쳐지지만 적어도 순서가 어긋나는 일은 없다. ✨콜백 지옥은 Promise나 async/await으로 어느 정도 해결할 수 있다.

```
const fs = require('fs').promises;

console.log('시작');
fs.readFile('./readme2.txt')
  .then((data) => {
    console.log('1번', data.toString());
    return fs.readFile('./readme2.txt');
  })
  .then((data) => {
    console.log('2번', data.toString());
    return fs.readFile('./readme2.txt');
  })
  .then((data) => {
    console.log('3번', data.toString());
    console.log('끝');
  })
  .catch((err) => {
    console.error(err);
  });
```

이런식으로 Promise와 then으로 콜백지옥을 방지하여 가독성을 높혀보았다.

### ✨ 버퍼와 스트림 이해하기

파일을 읽거나 쓰는 방식에는 크게 두 가지 방식이 있다.

- 버퍼를 이용하는 방식
- 스트림을 이용하는 방식

영상을 로딩 할 때는 버퍼링 한다고 하고, 영상을 실시간으로 송출할 때는 스트리밍 한다고 한다. 이처럼 버퍼링은 영상을 재생할 수 있을때까지 데이터를 모으는 동작이고, 스트리밍은 방송인의 컴퓨터에서 시청자의 컴퓨터로 영상 데이터를 조금씩 전송하는 동작이다. 스트리밍하는 과정에서 버퍼링을 할 수도 있다.

전송이 너무 느리면 화면을 내보내기까지 최소한의 데이터를 모아야하고, 영상 데이터가 재생 속도보다 빠르게 전송되어도 미리 전송받은 데이터를 저장할 공간이 필요하기 때문이다.

✨노드의 버퍼와 스트림도 비슷한 개념이다.

앞에서 readFile 메서드를 사용할 때 읽었던 파일이 버퍼 형식으로 출력되었다. 노드는 파일을 읽을 때 메모리에 파일 크기만큼 공간을 마련해두며 파일 데이터를 메모리에 저장한 뒤 사용자가 조작할 수 있도록 한다. 이때 메모리에 저장된 데이터가 바로 <b>버퍼</b>이다.

```
const buffer = Buffer.from('저를 버퍼로 바꿔보세요');
console.log('from():', buffer);
console.log('length:', buffer.length);
console.log('toString():', buffer.toString());

const array = [Buffer.from('띄엄 '), Buffer.from('띄엄 '), Buffer.from('띄어쓰기')];
const buffer2 = Buffer.concat(array);
console.log('concat():', buffer2.toString());

const buffer3 = Buffer.alloc(5);
console.log('alloc():', buffer3);
```

> 버퍼를 직접 다룰 수 있는 클래스가 바로 'Buffer' 이다.
> Buffer객체는 여러 가지 메서드를 제공해준다.

- from(문자열) : 문자열을 <b>버퍼</b>로 바꿀 수 있다. length 속성은 버퍼의 크기를 알린다.(바이트 단위임)
- toString(버퍼) : 버퍼를 다시 <b>문자열</b>로 바꿀 수 있다.
- concat(배열) : 배열 안에 든 버퍼를 하나로 합친다.
- alloc(바이트) : 빈 버퍼를 생성한다. 바이트를 인수로 넣으면 해당 크기의 버퍼가 생성된다.

readFile 방식의 버퍼가 편리하기는 하지만 문제점도 있다.

✨문제점

- 만약 용량이 100MB인 파일이 있으면 읽을 때 메모리에 100MB의 버퍼를 만들어야한다.
  이 작업을 동시에 열 개만 해도 1GB에 달하는 메모리가 사용된다. 특히 서버처럼 몇 명이 이용할지 모르는 환경에서는 메모리 문제가 발생할 수 있다.

또한, 모든 내용을 버퍼에 다 쓴 후에야 다음 동작으로 넘어가므로 파일 읽기, 압축, 파일 쓰기 등의 조작을 연달아 할 때 매번 전체 용량을 버퍼로 처리해야 다음 단계로 넘어갈 수 있다.

그래서 버퍼의 크기를 작게 만든 후 여러 번으로 나눠 보내는 방식이 등장했다. 이것이 바로 <b>스트림</b>이라고 한다. 그렇게 조각조각 나뉘어진 것들을 chunk라고 부른다.

```
const fs = require('fs');

const readStream = fs.createReadStream('./readme3.txt', { highWaterMark: 16 });
const data = [];

readStream.on('data', (chunk) => {
  data.push(chunk);
  console.log('data :', chunk, chunk.length);
});

readStream.on('end', () => {
  console.log('end :', Buffer.concat(data).toString());
});

readStream.on('error', (err) => {
  console.log('error :', err);
});
```

먼저 createReadStream로 읽기 스트림을 만드는데, 첫 번째 인수로 읽을 파일 경로를 넣는다. 두 번째 인수로는 옵션 객체인데 { highWaterMark: 16 } 이렇게 넣는다. highWaterMark라는 옵션이 버퍼의 크기(바이트 단위)를 정할 수 있는 옵션이다.

기본 값은 64KB이지만, 여러 번 나눠서 보내는 모습을 보여주기 위해 16B로 낮췄다.<BR>
readStream는 이벤트 리스너를 붙여서 사용한다. 보통 data, end, error 이벤트를 사용한다. 예제에 보다시피 readStream.on('data')와 이렇게 이벤트 리스너를 붙이면 된다.

파일을 <b>읽는 도중 에러가 발생하면 error 이벤트가 호출</b>되고, <b>파일 읽기가 시작되면 data 이벤트가 발생</b>한다. 16B씩 읽도록 설정했으므로 파일의 크기가 16B보다 크다면 여러 번 발생할 수도 있다. <b>파일을 다 읽으면 end 이벤트가 발생</b>한다.

### 이번에는 파일을 써보자.

```
const fs = require('fs');

const writeStream = fs.createWriteStream('./writeme2.txt');
writeStream.on('finish', () => {
  console.log('파일 쓰기 완료');
});

writeStream.write('이 글을 씁니다.\n');
writeStream.write('한 번 더 씁니다.');
writeStream.end();
```

이렇게 writeme2.txt를 열어 보면 조금 전에 넣었던 문자열이 그대로 들어 있다.

```
[콘솔창]
$ node createWriteStream
파일 쓰기 완료
```

먼저 createWriteStream으로 쓰기 스트림을 만든다. 첫 번재 인수로는 출력 파일명을 입력하고, 두번째 인수로는 옵션인데 여기서는 사용하지 않았다.

그리고 finish라는 이벤트 리스너도 붙였고, 파일 쓰기가 종료되면 콜백 함수가 호출된다.
writeStream에서 제공하는 write 메서드로 넣을 데이터를 쓴다. 이는 여러번 호출 할 수 있게 해준다. 데이터를 다 썼다면 end 메서드로 종료를 알린다.

이때, finish 이벤트가 발생한다.

### ✨ Pipe

이 함수는 스트림끼리 연결하는 것을 '파이핑한다'라고 표현합니다. 액체가 흐르는 관(파이프(pipe))처럼 데이터가 흐른다고 해서 지어진 이름이다.

[readme4.txt]

```
저를 writeme3.txt로 보내주세요.
```

[pipe.js]

```
const fs = require('fs');

const readStream = fs.createReadStream('readme4.txt');
const writeStream = fs.createWriteStream('writeme3.txt');
readStream.pipe(writeStream);
```

> readme4.txt와 똑같은 내용의 writeme3.txt가 생성되었을 것이다. 미리 읽기 스트림과 쓰기 스트림을 만들어둔 후 두 개의 스트림 사이를 pipe메서드로 연결하면 저절로 데이터가 writeStream으로 넘어간다.

pipe는 스트림 사이에 여러 번 연결할 수 있다. 그리고 gzip 방식으로 압축도 가능하다.

<br>

[gzip.js]

```
const zlib = require('zlib');
const fs = require('fs');

const readStream = fs.createReadStream('./readme4.txt');
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream('./readme4.txt.gz');
readStream.pipe(zlibStream).pipe(writeStream);
```

> 노드에서는 파일을 압축하는 zlib이라는 모듈도 제공한다. 이것은 createGzip이라는 메서드가 스트림을 지원하므로 readStream과 writeStream 중간에서 파이핑을 할 수 있다. 버퍼 데이터가 전달되다가 gzip 압축을 거친 후 파일로 써진다.

```
$ node gizp
```

입력하면 readme4.txt.gz 파일이 생성된다.

### ✨ 기타 fs 메서드 알아보기

fs는 파일 시스템을 조작하는 다양한 메서드를 제공해준다. 단순히 파일 읽기/쓰기를 했지만, 파일을 생성하고 삭제할 수 있으며 폴더를 생성하고 삭제할 수도 있다.

```
const fs = require('fs').promises;
const constants = require('fs').constants;

fs.access('./folder', constants.F_OK | constants.W_OK | constants.R_OK)
  .then(() => {
    return Promise.reject('이미 폴더 있음');
  })
  .catch((err) => {
    if (err.code === 'ENOENT') {
      console.log('폴더 없음');
      return fs.mkdir('./folder');
    }
    return Promise.reject(err);
  })
  .then(() => {
    console.log('폴더 만들기 성공');
    return fs.open('./folder/file.js', 'w');
  })
  .then((fd) => {
    console.log('빈 파일 만들기 성공', fd);
    fs.rename('./folder/file.js', './folder/newfile.js');
  })
  .then(() => {
    console.log('이름 바꾸기 성공');
  })
  .catch((err) => {
    console.error(err);
  });
```

- fs.access(경로, 옵션, 콜백): <b>폴더나 파일에 접근할 수 있는지를 체크</b>합니다. 두 번째 인수로 상수들(constants를 통해 가져옵니다)을 넣었습니다. F_OK는 파일 존재 여부, R_OK는 읽기 권한 여부, W_OK는 쓰기 권한 여부를 체크합니다. 파일/폴더나 권한이 없다면 에러가 발생하는데 파일/폴더가 없을 때의 에러 코드는 ENOENT입니다.

- fs.mkdir(경로, 콜백): <b>폴더를 만드는 메서드</b>입니다. 이미 폴더가 있다면 에러가 발생하므로 먼저 access 메서드를 호출해서 확인하는 것이 중요합니다.

- fs.open(경로, 옵션, 콜백): <b>파일의 아이디(fd 변수)를 가져오는 메서드</b>입니다. 파일이 없다면 파일을 생성한 뒤 그 아이디를 가져옵니다. 가져온 아이디를 사용해 fs.read나 fs.write로 읽거나 쓸 수 있습니다. 두 번째 인수로 어떤 동작을 할 것인지를 설정할 수 있습니다. <b>쓰려면 w, 읽으려면 r, 기존 파일에 추가하려면 a</b>입니다. 앞의 예제에서는 w를 했으므로 파일이 없을 때 새로 만들 수 있었습니다. r이었다면 에러가 발생했을 것니다.

- fs.rename(기존 경로, 새 경로, 콜백): <b>파일의 이름을 바꾸는 메서드</b>입니다. 기존 파일 위치와 새로운 파일 위치를 적으면 됩니다.

- fs.readdir(경로, 콜백): <b>폴더 안의 내용물을 확인</b>할 수 있습니다. 배열 안에 내부 파일과 폴더명이 나옵니다.

- fs.unlink(경로, 콜백): <b>파일을 지울 수 있습니다.</b> 파일이 없다면 에러가 발생하므로 먼저 파일이 있는지를 꼭 확인해야 합니다.

- fs.rmdir(경로, 콜백): <b>폴더를 지울 수 있습니다.</b> 폴더 안에 파일들이 있다면 에러가 발생하므로 먼저 내부 파일을 모두 지우고 호출해야 합니다.

### ✨ 스레드풀 알아보기

> 비동기 메서드들은 백그라운드에서 실행되고, 실행된 후에는 다시 메인 스레드의 콜백 함수나 프로미스의 then 부분이 실행된다. 이때 fs 메서드를 여러 번 실행해도 백그라운드에서 동시에 처리 되는데, 이게 바로 <b>스레드풀</b>이 있기 때문이다.

<br>
<br>

### ✨ 이벤트 이해하기

> 스트림을 배울 때 on('data', 콜백) 또는 on('end', 콜백)을 사용했습니다. 바로 data라는 이벤트와 end라는 이벤트가 발생할 때 콜백 함수를 호출하도록 이벤트를 등록한 것입니다. createReadStream 같은 경우는 내부적으로 알아서 data와 end 이벤트를 호출하지만, 우리가 직접 이벤트를 만들 수도 있습니다.

```
const EventEmitter = require('events');

const myEvent = new EventEmitter();
myEvent.addListener('event1', () => {
  console.log('이벤트 1');
});
✨myEvent.on('event2', () => {
  console.log('이벤트 2');
});
✨myEvent.on('event2', () => {
  console.log('이벤트 2 추가');
});
myEvent.once('event3', () => {
  console.log('이벤트 3');
}); // 한 번만 실행됨

myEvent.emit('event1'); // 이벤트 호출
myEvent.emit('event2'); // 이벤트 호출

myEvent.emit('event3'); // 이벤트 호출
myEvent.emit('event3'); // 실행 안 됨

✨myEvent.on('event4', () => {
  console.log('이벤트 4');
});
myEvent.removeAllListeners('event4');
myEvent.emit('event4'); // 실행 안 됨

const listener = () => {
  console.log('이벤트 5');
};
✨myEvent.on('event5', listener);
myEvent.removeListener('event5', listener);
myEvent.emit('event5'); // 실행 안 됨

console.log(myEvent.listenerCount('event2'));
```

- on(이벤트명, 콜백): <b>이벤트 이름과 이벤트 발생 시의 콜백을 연결</b>합니다. 이렇게 <b>연결하는 동작을 이벤트 리스닝</b>이라고 부릅니다. event2처럼 이벤트 하나에 이벤트 여러 개를 달아줄 수도 있습니다.

- addListener(이벤트명, 콜백): <b>on과 기능이 같습니다.</b>

- emit(이벤트명): <b>이벤트를 호출하는 메서드</b>입니다. 이벤트 이름을 인수로 넣으면 미리 등록해뒀던 이벤트 콜백이 실행됩니다.

- once(이벤트명, 콜백): <b>한 번만 실행되는 이벤트</b>입니다. myEvent.emit('event3')을 두 번 연속 호출했지만 콜백이 한 번만 실행됩니다.

- removeAllListeners(이벤트명): <b>이벤트에 연결된 모든 이벤트 리스너를 제거</b>합니다. event4가 호출되기 전에 리스너를 제거했으므로 event4의 콜백은 호출되지 않습니다.

- removeListener(이벤트명, 리스너): <b><이벤트에 연결된 리스너를 하나씩 제거/b>합니다. 리스너를 넣어야 한다는 것을 잊지 마세요. 역시 event5의 콜백도 호출되지 않습니다.

- off(이벤트명, 콜백): 노드 10 버전에서 추가된 메서드로, <b>removeListener와 기능이 같습니다.</b>

- listenerCount(이벤트명): 현재 리스너가 <b>몇 개 연결되어 있는지 확인</b>합니다.

### ✨ 예외 처리하기

노드에서는 예외 처리가 정말 중요하다. 예외란 보통 처리하지 못한 에러를 가르킨다. 이러한 예외들은 실행 중인 노드 프로세스를 멈추게 만든다.

멀티 스레드 프로그램에서는 스레드 하나가 멈추면 그 일을 다른 스레드가 대신한다. 하지만 노드의 메인 스레드는 <b>하나</b>뿐이고 그 하나를 소중히 보호해야 한다.

메인 스레드가 에러로 인해 멈춘다는 것은 스레드를 갖고 있는 프로세스가 멈춘다는 뜻이고, 전체 서버도 멈춘다는 뜻과 같다.

따라서 에러를 처리하는 방법을 익혀두어야 한다. 에러 로그가 기록되더라도 작업은 계속 진행될 수 있도록 말이다. <b>프로세스가 멈추지 않도록 에러를 잡아야한다. 에러가 발생할 것 같은 부분을 try/catch문으로 감싸면 된다.</b>

```
setInterval(() => {
  console.log('시작');
  try {
    throw new Error('서버를 고장내주마!');
  } catch (err) {
    console.error(err);
  }
}, 1000);
```

> setInterval을 사용한 것은 프로세스가 멈추는지 여부를 체크하기 위해서다. 프로세스가 에러로 인해 멈추면 setInterval도 멈출 것이다. setInterval내부에 throw new Error()를 써서 에러를 강제로 발생시켰다.

에러는 발생하지만 try/catch로 잡을 수 있고 setInterval도 직접 멈추기 전까지 계속 실행된다. 이렇게 에러가 발생할 것 같은 부분을 미리 try/catch 문으로 감싸면 된다.

<br>
<br>

---

<br>
<br>

## 🔥 자주 발생하는 에러들

- node: command not found: 노드를 설치했지만 이 에러가 발생하는 경우는 환경 변수가 제대로 설정되지 않은 것입니다. 환경 변수에는 노드가 설치된 경로가 포함되어야 합니다. node 외의 다른 명령어도 마찬가지입니다. 그 명령어를 수행할 수 있는 파일이 환경 변수에 들어 있어야 명령어를 콘솔에서 사용할 수 있습니다.

- ReferenceError: 모듈 is not defined: 모듈을 require했는지 확인합니다.

- Error: Cannot find module 모듈명: 해당 모듈을 require했지만 설치하지 않았습니다. npm i 명령어로 설치하세요.

- Error: Can't set headers after they are sent: 요청에 대한 응답을 보낼 때 응답을 두 번 이상 보냈습니다. 요청에 대한 응답은 한 번만 보내야 합니다. 응답을 보내는 메서드를 두 번 이상 사용하지 않았는지 체크해보세요.

- FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory: 코드를 실행할 때 메모리가 부족하여 스크립트가 정상 작동하지 않는 경우입니다. 코드가 잘못되었을 확률이 높으므로 코드를 점검해보세요. 만약 코드는 정상이지만 노드가 활용할 수 있는 메모리가 부족한 경우라면 노드의 메모리를 늘릴 수 있습니다. 노드를 실행할 때 node --max-old-space-size=4096 파일명과 같은 명령어를 사용하면 됩니다. 4096은 4GB를 의미합니다. 원하는 용량을 적으면 됩니다.

- UnhandledPromiseRejectionWarning: Unhandled promise rejection: 프로미스 사용 시 catch 메서드를 붙이지 않으면 발생합니다. 항상 catch를 붙여 에러가 나는 상황에 대비하세요.

- EADDRINUSE 포트 번호: 해당 포트 번호에 이미 다른 프로세스가 연결되어 있습니다. 그 프로세스는 노드 프로세스일 수도 있고 다른 프로그램일 수도 있습니다. 그 프로세스를 종료하거나 다른 포트 번호를 사용해야 합니다.

- 에러 코드: https://nodejs.org/dist/latest-v14.x/docs/api/errors.html#errors_node_js_error_codes

-uncaughtException: https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_event_uncaughtexception
