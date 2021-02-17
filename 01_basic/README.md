# 🌼 노드 웹서버 실무에 기본적인 개념들

## 📚 목차

1. 알아두어야 할 자바스크립트
2. 노드 기능들 알아보기
3. http 모듈로 서버 만들기
4. 패키지 매니저
5. 익스프레스 웹 서버 만들기
6. 데이터베이스 관리하기

- MySQL
- 몽고디비

7. 실전 프로젝트 [03_project] 폴더로

<br>

---

<br>

## 🌸 2장 알아두어야 할 자바스크립트

> 노드를 이해하려면 자바스크립트의 기본기를 알아야 한다. <br> 기본적인 자바스크립트 함수를 알아보자 🦾

<br>

## 🔥 const, let

보통 자바스크립트에서는 var로 변수선언을 하는제 var는 이제 const와 let이 대체한다.

```
if (true) {
  var x = 3;
}
console.log(x); //결과값 3

if (true) {
  const y = 3;
}
console.log(y); //결과값 : y is not defined
```

여기서 x는 정상적으로 출력되는데 y는 에러가 발생한다. var을 const로 바꿨을 뿐인데 차이가 발생하는 것이다. var은 함수 스코프를 가지고 있으므로 if 문의 블록과 관계없이 접근할 수 있다. 하지만 const와 let은 블록 스코프를 가지므로 블록 밖에는 변수에 접근 할 수 없다. 블록의 범위는 ' if, while, for, function' 등에서 볼 수 있는 중괄호이다. 함수 스코프 대신 블록 스코프를 사용함으로써 호이스팅 같은 문제도 해결되고 코드 관리도 수월해졌다.

<br>

### 🟠 차이점

<br>

const, let, var은 스코프 종류가 다르다.

- const : 한 번 값을 할당하면 다른 값을 할당 할 수 없다.
  다른 값을 할당하려고 하면 에러가 발생한다. 또한 초기화할 때 값을 할당하지 않으면 에러가 발생한다. <b>따라서 const로 선언한 변수를 상수라고 부르기도 한다.</b>

```
const a = 0;
a = 1; // 결과값 : assignment to constant variable.

let b = 0;
b = 1; //결과값 : 1

const c; // 결과값 : missing initiailizer in const declaration
```

> 자바스크립트를 사용할 떄 한 번 초기화했던 변수에 다른 값을 할당하는 경우는 의외로 적다. 따라서 변수 선언시에는 기본적으로 const를 사용하고, 다른 값을 할당 할 상황이 생기면 let을 사용하면 된다.

<br>

## 🔥 템플릿 문자열

백틱과 작은따옴표로 감싸서 값을 출력할 수 있다.

```
const num3 = 1;
const num4 = 2;
const result2 = 3;
✨const string2 = `${num3} 더하기 ${num4}는 '${result2}'`;
console.log(string2); //1 더하기 2는 '3'
```

<br>

## 🔥 객체 리터럴

객체리터럴에 편리한 기능들이 추가되었다.
oldObject 객체에 동적으로 속성을 추가할 수 있다.

```
var sayNode = function() {
  console.log('Node');
}
var es = 'ES'
var oldObject = {
  sayJS : function() {
    console.log('JS');
  },
  sayNode: sayNode,
};
oldObject[es +6] = 'Fantastic';
oldObject.sayNode(); // node
oldObject.sayJS(); //js
console.log(oldObject.ES6); // Fantastic
```

이 코드를 다음과 같이 다시 쓸 수 있다.

```
const newObject = {
  sayJS() {
    console.log('JS');
  },
  sayNode,
  [es +6] = 'Fantastic',
};
newObject.sayNode(); // node
newObject.sayJS(); //JS
console.log(newObject.ES6); //Fantastic
```

✨ oldObject와 newObject를 비교해 볼 때 sayJS 같은 객체의 메서드에 함수를 연결할 때 더는 콜론 : 과 function을 붙이지 않아두 된다.

첫 번째 코드에 sayNode: sayNode처럼 속성명과 변수명이 동일한 경우에는 한 번만 써도 되게 바뀌었다.

```
기존 자바스크립트
{name: name, age: age}

새롭게 바뀐 자바스크립트
{name, age}
```

> 이렇게 코드의 중복을 피할 수 있어서 편하다. 그리고 객체의 속성명은 동적으로 생성할 수 있다는 장점도 있다. 객체 리터럴에 추가된 문법은 코딩할 때의 편의를 위해 만들어진 것이라는 느낌이 강하다. 익숙해지면 코드의 양을 많이 줄일 수 있다.

<br>

## 🔥 화살표 함수

화살표 함수라는 새로운 함수도 추가되었다.

```
function add1(x, y) {
  return x + y;
}

const add2 = (x, y) => {
  return x + y;
};

const add3 = (x, y) => x + y;

const add4 = (x, y) => (x + y);

function not1(x) {
  return !x;
}

const not2 = x => !x;
```

> add1, add2, add3, ad4는 같은 기능을 하는 함수이다. 마찬가지로 not1, not2도 같은 기능을 한다. 화살표 함수에는 function선언 대신 => 기호로 함수를 선언한다. 또한 변수에 대입하면 나중에 재사용할 수 있다.<br><br>
> 화살표 함수에서 내부에 return 문밖에 없는 경우에는 return문을 줄일 수 있다. 중괄호 대신 add3과 add4처럼 return할 식을 바로 적으면 된다. add4처럼 보기 좋게 소괄호로 감쌀 수도 있다. not2처럼 매개변수가 한 개면 매개변수를 소괄호로 묶어주지 않아두 된다. return문을 줄이는 문법은 자주 사용된다.

<Br>

기존 function과 다른 점은 this 바인드 방식이다.

```
var relationship1 = {
  name: 'zero',
  friends: ['nero', 'hero', 'xero'],
  logFriends: function () {
    var that = this; // relationship1을 가리키는 this를 that에 저장
    this.friends.forEach(function (friend) {
      console.log(that.name, friend);
    });
  },
};
relationship1.logFriends();

// ------------------------------------------

const relationship2 = {
  name: 'zero',
  friends: ['nero', 'hero', 'xero'],
  logFriends() {
   ✨ this.friends.forEach(friend => {
      console.log(this.name, friend);
    });
  },
};
relationship2.logFriends();

```

var relationship1 함수를 보면 function 선언문을 사용했다. 각자 다른 함수 스코프의 this를 가지므로 that이라는 변수를 사용해서 relationship1에 간접적으로 접근하고 있다.

✨ 하지만 relationship2 함수는 forEach 문에 화살표 함수를 사용했다. 따라서 바깥 스코프인 this를 그대로 사용할 수 있었다. 상위 스코프의 this를 그대로 물려받는 것이다.

즉, 기본적으로 화살표 함수를 쓰되, this를 사용해야 하는 경우에는 화살표 함수와 함수 선언문중에서 하나를 고르면 된다.

<br>

## 🔥 구조분해 할당

> 구조분해 할당 을 사용하면 객체와 배열로부터 속성이나 요소를 쉽게 꺼낼 수 있다.

```
var candyMachine = {
  status: {
    name: 'node',
    count: 5,
  },
  getCandy: function () {
    this.status.count--;
    return this.status.count;
  },
};
var getCandy = candyMachine.getCandy;
var count = candyMachine.status.count;
```

위 코드를 이와 같이 바꿀 수 있다.

```
const candyMachine = {
  status: {
    name: 'node',
    count: 5,
  },
  ✨getCandy() {
    this.status.count--;
    return this.status.count;
  },
};
✨const { getCandy, status: { count } } = candyMachine;
```

이렇게 코드 줄수가 줄어들었다.

<br>

## 🔥 클래스

> 클래스 문법도 추가됐다. 하지만 여전히 프로토타입 기반으로 동작된다. 프로토타입 기반 문법을 보기 좋게 클래스로 바꾼 것이라고 이해하면 된다. (마치 리액트에서 클래스 함수 같은 것임)

```
class Human {
  constructor(type = 'human') {
    this.type = type;
  }

  static isHuman(human) {
    return human instanceof Human;
  }

  breathe() {
    alert('h-a-a-a-m');
  }
}

class Zero extends Human {
  constructor(type, firstName, lastName) {
    super(type);
    this.firstName = firstName;
    this.lastName = lastName;
  }

  sayName() {
    super.breathe();
    alert(`${this.firstName} ${this.lastName}`);
  }
}

const newZero = new Zero('human', 'Zero', 'Cho');
Human.isHuman(newZero); // true
```

같은 클래스 함수는 static 키워드로 전환되었다. 프로토타입 함수들도 모두 class 블록 안에 포함되어 어떤 함수가 어떤 클래스 소속인지 보기 쉽다. 상속도 간단해져서 extends 키워드로 쉽게 상속 가능하다. 다만, 이렇게 클래스 문법으로 바뀌었더라도 자바스크립트는 프로토타입 기반으로 동작하는 것을 명심하자.

<br>

## 🔥 프로미스 Promise

> 자바스크립트와 노드에서는 주로 비동기를 접한다. 특히 이벤트 리스너를 사용할 때 콜백 함수를 자주 사용한다. 그리고 자바스크립트와 노드 API들이 콜백 대신 프로미스 기반으로 재구성되며, 악명 높은 콜백 지옥 현상을 극복햇다는 평가를 받고 있다.
> ✨프로미스는 반드시 알아두어야 하는 객체이니 중요하게 보기!!

```
const condition = true; // true면 resolve, false면 reject
const promise = ✨new Promise((resolve, reject) => {
  if (condition) {
    ✨ resolve('성공');
  } else {
    ✨ reject('실패');
  }
});
// 다른 코드가 들어갈 수 있음
promise
 ✨.then((message) => {
    console.log(message); // 성공(resolve)한 경우 실행
  })
 ✨ .catch((error) => {
    console.error(error); // 실패(reject)한 경우 실행
  })
  .finally(() => { // 끝나고 무조건 실행
    console.log('무조건');
  });
```

프로미스는 위와 같은 규칙이 있다. 먼저 프로미스 객체를 생성해야한다.
new Promise로 프로미스를 생성할 수 있으며, 그 내부에 resolve와 reject를 매개변수로 갖는 콜백함수를 넣는다. 이렇게 만든 promise 변수와 then과 catch 메서드를 붙일 수 있다.

프로미스 내부에서 resolve가 호출되면 then이 실행되고, reject가 호출되면 catch가 실행된다. finally 부분은 성공 / 실패 여부와 상관 없이 실행된다.
resolve와 reject에 넣어준 인수는 각각 then과 catch의 매개변수에서 받을 수 있다.

✨ 프로미스를 쉽게 설명하자면, 실행은 바로 하되 결과값은 나중에 받는 객체이다. 결과값은 실행이완료 된 후 then이나 catch 메서드를 통해 받고, 위 예제에서는 new promise와 promise.then 사이에 다른 코드가 들어갈 수도 있다. new Promise는 바로 실행되지만, 결과값은 then을 붙였을 때 받게 된다.

```
promise
  .then((message) => {
    return new Promise((resolve, reject) => {
      resolve(message);
    });
  })
  .then((message2) => {
    console.log(message2);
    return new Promise((resolve, reject) => {
      resolve(message2);
    });
  })
  .then((message3) => {
    console.log(message3);
  })

  .catch((error) => {
    console.error(error);
  });
```

위같은 경우는 then이나 catch에서 다시 다른 then이나 catch를 붙일 수 있다. 이전 then의 return 값을 다음 then의 매개변수로 넘긴다. 프로미스를 return한 경우에는 프로미스가 수행된 후 다음 then 이나 catch가 호출된다.

처음 then에서 message를 resolve하면 다음 then에서 메시지2로 받을 수 있다. 여기서 다시 메시지2를 resolve한 것을 다음 then에서 메시지 3으로 전달받는다. 단, then에서 new Promise를 리턴해야 다음 then에서 받을 수 있다는 점을 기억해야한다.

```
const promise1 = Promise.resolve('성공1');
const promise2 = Promise.resolve('성공2');
Promise.all([promise1, promise2])
  .then((result) => {
    console.log(result); // ['성공1', '성공2'];
  })
  .catch((error) => {
    console.error(error);
  });
```

위 같은 경우는 프로미스 여러 개를 한 번에 실행할 수 있는 방법이다. 기존의 콜백 패턴이었다면 콜백을 여러 번 중첩해서 사용해야 했을 것이다. 하지만 Promise.all을 활용하면 간단히 할 수 있다.

Promise.resolve는 즉시 resolve하는 프로미스를 만드는 방법이다. 비슷한 것으로 즉시 reject하는 Promise.reject도 있다. 프로미스가 여러 개 있을 때 Promise.all에 넣으면 모두 resolve될 때 까지 기다렸다가 then으로 넘어간다. result 매개변수에 각각의 프로미스 결과값이 배열로 들어있다. Promise중 하나라도 reject가 되면 catch로 넘어간다.

<br>

## 🔥 asycn/await
