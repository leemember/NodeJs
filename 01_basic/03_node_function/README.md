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
console 객체는 보통 디버깅을 위해 사용한다. 개발하면서 변수에 값이 제대로 들어 있는지 확인하기 위해 사용하고 에러 발생 시 에러 내용을 콘솔에 표시하기 위해 사용하며, 코드 실행 시간을 알아보려고 할 때도 사용한다. 대표적으로는 console.log 메서드가 있다. console.log 는 지금껏 계속 사용했으므로 익숙 할 것이다. 다른 로깅 함수들도 알아보자 !!!!

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

### 타이머

타이머 기능을 제공하는 함수인 setTimeout, setInterval, setImmediate 는 노드에서 window 대신 global 객체 안에 들어 있습니다. setTimeout, setInterval은 웹 브라우저에서도 자주 사용되니 익숙 한 타이머 이벤트다.

- setTimeout(콜백함수, 밀리초) : 주어진 밀리초(1,000분의 1초) 이후에 콜백 함수를 실행합니다.
- setInterval(콜백함수, 밀리초) : 주어진 밀리초마다 콜백 함수를 반복 실행합니다.
- setImmediate(콜백함수) : 콜백 함수를 즉시 실행합니다.

이 타이머 함수들은 모두 아이디를 반환합니다. 아이디를 사용하여 타이머를 취소할 수 있습니다.

- clearTimeout : setTimeout을 취소합니다.
- clearInterval : setInterval을 취소합니다.
- clearImmediate : setImmediate을 취소합니다.

### __filename, __dirname
> 노드에서는 파일 사이에 모듈 관계가 있는 경우가 많으므로 때로는 현재 파일의 경로나 파일명을 알아야 한다. 노드는 __filename, __dirname이라는 키워드로 경로에 대한 정보를 제공한다. 파일에 __filename, __dirname를 넣어두면 실행 시 현재 파일명과 현재 파일 경로로 바뀐다.

### module, exports, require

> 지금까지는 모듈을 만들 때 module.exports만 사용했는데, module 객체 말고 exports 객체로도 모듈을 만들 수 있다.
이전 var.js파일을 index.js에서 동일하게 볼 수 있는 것을 확인해 보았다. module exports로 한 번에 대입하는 대신, 각각의 변수를 exports 객체에 하나씩 넣었다. 동일하게 동작하는 이유는 module.exports와 exports가 같은 객체를 참조하기 때문이다. 실제로 console.log(module.exports === exports)를 하면 true가 나온다. 따라서 exports 객체에 add 함수를 넣으면 module.exports에도 add 함수가 들어간다.

그리고 exports 객체를 사용할 때는 module.exports와의 참조 관계가 깨지지 않도록 주의해야 한다. module.exports는 어떤 값이든 대입해도 되지만, exports에는 반드시 객체처럼 속성명과 속성값을 대입해야한다. exports에 다른 값을 대입하면 객체의 참조 관계가 끊겨 더 이상 모듈로 기능하지 않는다.
exports를 사용할 때는 객체만 사용할 수 있으므로 func.js와 같이 module.exports에 함수를 대입한 경우에는 exports로 바꿀 수 없다.
🖐 exports와 module.exports를 동시에 사용하지 않는 것이 좋다. 🖐

### process

> process 객체는 현재 실행되고 있는 노드 프로세스에 대한 정보를 담고 있다. process 객체 안에는 다양한 속성이 있는데, 하나씩 REPL에 따라 입력해보자.

- process.version : 설치된 노드의 버전
- process.arch : 프로세서 아키텍처 정보
- process.platform : 운영체제 플랫폼
- process.pid : 현재 프로세스의 아이디
- process.uptime() : 프로세스가 시작된 후 흐른 시간
- process.execPath : 노드의 경로
- process.cwd() : 현재 프로세스가 실행되는 위치
- process.cpuUsage() : 현재 cpu 사용량

### process.env

> REPL에 process.env를 입력하면 매우 많은 정보가 출력된다. 자세히 보면 이 정보들이 시스템의 환경 변수임을 알 수 있다. 시스템 환경 변수는 노드에 직접 영향을 미치기도 한다. 시스템 환경 변수 외에도 우리가 임의로 환경 변수를 저장 할 수 있다. <b>process.env는 서비스의 중요한 키를 저장하는 공간</b>으로도 사용한다. <b>서버나 데이터베이스의 비밀번호와 각종 API키를 코드에 직접 입력하는 것은 위험</b>합니다. 혹여 서비스가 해킹을 당해 코드가 유출되었을 때는 비밀번호가 코드에 남아있어 추가 피해가 발생할 수도 있다. 따라서 <b>중요한 비밀번호는 process.env의 속성으로 대체</b>해야한다.

```
const secretId = process.env.SECRET_ID;
const secretPw = process.env.SECRET_CODE;
```

이런 식으로 process.env뒤에 직접 넣어주면 된다. 실제로 노드버드 클론코딩 프로젝트를 통해 이 과정을 거쳤다. 매우 중요한 부분! 👊
넣는 방법은 운영체제마다 차이가 있는데, 한 번에 모든 운영체제에 동일하게 넣을 수 있는 방법은 'dotenv' 라이브러리를 설치해 사용하면 된다. 이 부분은 나중가면 배움

### process.nextTick(콜백)
> process.nextTick은 setImmediate나 setTimeout보다 먼저 실행된다.

### process.exit(코드)
> 실행중인 노드 프로세스를 종료한다. 서버 환경에서 이 함수가 사용하면 서버가 멈추므로 특수한 경우를 제외하고는 서버에서 잘 사용되지 않는다. 하지만 서버 외의 독립적인 프로그램에서는 수동으로 노드를 멈추기 위해 사용

## 4. 노드 내장 모듈 사용하기
> ✊ 노드는 웹 브라우저에서 사용되는 자바스크립트보다 더 많은 기능을 제공한다. 운영체제 정보에도 접근할 수 있고 클라이언트가 요청한 주소에 대한 정보도 가져올 수 있다. 노드에서 이러한 기능을 하는 모듈을 제공해준다!

### OS
> 노드는 os모듈에 정보가 담겨 있어 정보를 가져올 수 있다.

- os.arch(): process.arch와 동일합니다.
- os.platform(): process.platform과 동일합니다.
- os.type(): 운영체제의 종류를 보여줍니다.
- os.uptime(): 운영체제 부팅 이후 흐른 시간(초)을 보여줍니다. process.uptime()은 노드의 실행 시간이었습니다.
- os.hostname(): 컴퓨터의 이름을 보여줍니다.
- os.release(): 운영체제의 버전을 보여줍니다.
- os.homedir(): 홈 디렉터리 경로를 보여줍니다.
- os.tmpdir(): 임시 파일 저장 경로를 보여줍니다.
- os.cpus(): 컴퓨터의 코어 정보를 보여줍니다.
- os.freemem(): 사용 가능한 메모리(RAM)를 보여줍니다.
- os.totalmem(): 전체 메모리 용량을 보여줍니다.

### path
> 폴더와 파일의 경로를 쉽게 조작하도록 도와주는 모듈. path 모듈이 필요한 이유 중 하나는 운영체제별로 경로 구분자가 다르기 때문입니다.

- path.sep: 경로의 구분자다. 윈도는 \, POSIX는 /다
- path.delimiter: 환경 변수의 구분자다. process.env.PATH를 입력하면 여러 개의 경로가 이 구분자로 구분되어있다. 윈도는 세미콜론(;)이고, POSIX는 콜론(:)
- path.dirname(경로): 파일이 위치한 폴더 경로를 보여준다.
- path.extname(경로): 파일의 확장자를 보여준다.
- path.basename(경로, 확장자): 파일의 이름(확장자 포함)을 표시한다. 파일의 이름만 표시하고 싶다면 basename의 두 번째 인수로 파일의 확장자를 넣으면된다.
- path.parse(경로): 파일 경로를 root, dir, base, ext, name으로 분리한다.
- path.format(객체): path.parse()한 객체를 파일 경로로 합친다.
- path.normalize(경로): /나 \를 실수로 여러 번 사용했거나 혼용했을 때 정상적인 경로로 변환한다.
- path.isAbsolute(경로): 파일의 경로가 절대경로인지 상대경로인지를 true나 false로 알린다.
- path.relative(기준경로, 비교경로): 경로를 두 개 넣으면 첫 번째 경로에서 두 번째 경로로 가는 방법을 알린다.
- path.join(경로, …): 여러 인수를 넣으면 하나의 경로로 합친다. 상대경로인 ..(부모 디렉터리)과 .(현 위치)도 알아서 처리한다.
- path.resolve(경로, …): path.join()과 비슷하지만 차이가 있다.

### 🤍 join과 resolve의 차이

path.join과 path.resolve 메서드는 비슷해 보이지만 동작 방식이 다르다. /를 만나면 path.resolve는 절대경로로 인식해서 앞의 경로를 무시하고, path.join은 상대경로로 처리한다.