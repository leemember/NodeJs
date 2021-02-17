# 🌼 노드 웹서버 실무에 기본적인 개념들

## 📚 목차

1. [알아두어야 할 자바스크립트](#-2장-알아두어야-할-자바스크립트)
2. [노드 기능 알아보기](./03_node_function/README.md)
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

> 자바스크립트와 노드에서는 주로 비동기를 접한다. 특히 이벤트 리스너를 사용할 때 콜백 함수를 자주 사용한다. 그리고 자바스크립트와 노드 API들이 콜백 대신 프로미스 기반으로 재구성되며, 악명 높은 콜백 지옥 현상을 극복했다는 평가를 받고 있다.
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
      ✨resolve(message);
    });
  })
  .then((message2) => {
    console.log(message2);
    return new Promise((resolve, reject) => {
      ✨resolve(message2);
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
✨ Promise.all([promise1, promise2])
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

## 🔥 async/await (비동기)

> ES2017에서 추가되었으며, 알아두면 정말 편리한 기능이다.
> 특히 노드처럼 비동기 위주로 프로그래밍을 해야 할 때 도움이 많이 된다.
> 프로미스가 콜백 지옥을 해결했다지만, 여전히 코드가 장황하다. then과 catch 가 계속 반복되기 때문이다. asycn/await 문법은 프로미스를 사용한 코드를 한 번 더 깔끔하게 줄여준다.

```
----------------------------------------------
[asycn/await 사용 전의 코드량]
--------------------------------------------
function findAndSaveUser(Users) {
  Users.findOne({})
    .then((user) => {
      user.name = 'zero';
      return user.save();
    })
    .then((user) => {
      return Users.findOne({ gender: 'm' });
    })
    .then((user) => {
      // 생략
    })
    .catch(err => {
      console.error(err);
    });
}

----------------------------------------------
[asycn/await 사용]
----------------------------------------------
✨async function findAndSaveUser(Users) {
  let user = ✨await Users.findOne({});
  user.name = 'zero';
  user = await user.save();
  user = await Users.findOne({ gender: 'm' });
  // 생략
}
```

첫 번재 코드보면 콜백과 다르게 코드의 깊이가 깊어지진 않지만, 코드는 여전히 길다.
asycn/await 문법을 사용하면 정말 코드가 간결해지는 것을 확인 할 수 있다.
함수 선언부를 일반 함수 대신 async function으로 교체한 후, 프로미스 앞에 ✨await을 붙였다. 이제 함수는 해당 프로미스가 resolve될 때까지 기다린 뒤 다음 로직으로 넘어간다. 예를 들면 await Users.findOne({})이 resolve될 때까지 기다린 다음에 user 변수를 초기화 하는 것이다.

위 코드는 에러 처리하는 부분이 없으므로 이같은 추가 작업이 필요하다.

```
async function findAndSaveUser(Users) {
  try {
    let user = await Users.findOne({});
    user.name = 'zero';
    user = await user.save();
    user = await Users.findOne({ gender: 'm' });
    // 생략
  } catch (error) {
    console.error(error);
  }
}
```

try/catch문으로 로직을 감쌌다. (예외처리) 프로미스의 catch 메서드처럼 try/catch 문의 catch가 에러를 처리 한다. 화살표 함수도 async와 같이 사용할 수 있다.

```
const findAndSaveUser = async (Users) => {
  try {
    let user = await Users.findOne({});
    user.name = 'zero';
    user = await user.save();
    user = await Users.findOne({ gender: 'm' });
    // 생략
  } catch (error) {
    console.error(error);
  }
};
```

for문과 asycn/await을 같이 써서 프로미스를 순차적으로 실행 할 수 있다. for문 함께 쓰는 것은 노드 10버전부터 지원하는 ES2018 문법이다.

```
const promise1 = Promise.resolve('성공1');
const promise2 = Promise.resolve('성공2');
(async () => {
  for await (promise of [promise1, promise2]) {
    console.log(promise);
  }
})();
```

for await of 문을 사용해서 프로미스 배열을 순회하는 모습이다. async 함수의 반환값은 항상 Promise로 감싸진다. 따라서 실행 후 then을 붙이거나 또 다른 async 함수 안에서 await을 붙여서 처리할 수 있다.

✨ 앞으로 중첩되는 콜백 함수가 있다면 프로미스를 거쳐 asycn/await 문법으로 바꾸는 연습을 해본다면 코드가 훨씬 간결해질 것이다.

<br>

## 🔥 프론트엔드 자바스크립트

<br>

1. AJAX

- 비동기적 웹 서비스를 개발할 때 사용하는 기법이다. 이름에 XML이 들어있지만 꼭 XML을 사용해야 하는 것이 아니며, 요즘에는 JSON을 많이 사용한다. 쉽게 말해 <b>페이지 이동 없이 서버에 요청을 보내고 응답을 받는 기술</b>이다. 웹사이트 중에서 페이지 전환 없이 새로운 데이터를 불러오는 사이트는 대부분 AJAX 기술을 사용하고 있다고 보면 된다. <br><br>
  보통 AJAX 요청은 제이쿼리나 axios같은 라이브러리를 이용해서 보낸다.
  HTML에서 불러오려면 script 태그를 추가해야 한다.

```
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

데이터를 get/post 할 때 쓰는 라이브러리

```
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
✨GET방식
(async () => {
    try {
      const result = await axios.get('https://www.zerocho.com/api/get');
      console.log(result);
      console.log(result.data); // {}
    } catch (error) {
      console.error(error);
    }
  })();

  ---------------------------------------------------
  ✨POST방식
  (async () => {
    try {
      const result = await axios.post('https://www.leemember.com/api/post/json', {
        name: 'leemember',
        birth: 1997,
      });
      console.log(result);
      console.log(result.data);
    } catch (error) {
      console.error(error);
    }
  })();
</script>
</script>
```

> 전체적인 구조는 비슷한데 두 번재 인수로 데이터를 넣어 보내는 것이 다르다. GET 요청이면 axios.get을 POST 요청이면 axios.post를 사용한다.

<br>

2. FormData

HTML form 태그의 데이터를 동적으로 제어할 수 있는 기능이다. 주로 ajax와 함께 사용된다. 먼저formData 생성자로 formData 객체를 만든다.

```
✨ 메서드 기능 설명

<script>
  const formData = new FormData();
  formData.append('name', 'apple'); ✨ 키 - 값 형식의 데이터를 저장
  formData.append('item', 'orange');
  formData.append('item', 'melon');
  formData.has('item'); // true ✨ 주어진 키에 해당하는 값이 있는지 여부 알림
  formData.has('money'); // false;
  formData.get('item');// orange ✨ 해당하는 값을 하나 가져온다.
  formData.getAll('item'); // ['orange', 'melon']; ✨ 해당하는 모든 값 가져옴
  formData.append('test', ['hi', 'bye']);
  formData.get('test'); // hi, zero
  formData.delete('test'); ✨현재 키를 제거하는 메서드
  formData.get('test'); // null
  formData.set('item', 'apple');
  formData.getAll('item'); // ['apple'];
</script>
```

> 이제 axios로 폼 데이터를 서버에 보내면 된다.

<br>

```
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
  (async () => {
    try {
      const formData = new FormData();
      formData.append('name', 'leemember');
      formData.append('birth', 1997);
      const result = await axios.post('https://www.leemember.com/api/post/formdata', formData);
      console.log(result);
      console.log(result.data);
    } catch (error) {
      console.error(error);
    }
  })();
</script>
```

> 두 번재 인수에 데이터를 넣어 보내면 된다. <br>
> ✨ ajax 요청 보낼 때, (예: http://localhost:4000/search/노드) 처럼 주소에 한글이 들어가는 경우가 있는데, 서버 종류에 따라 서버가 한글 주소를 이해하지 못하는 경우가 있다. 그럴 때는 window 객체의 메서드인 encodeURIComponent 메서드를 사용하면 된다. 한글 부분만 encodeURIComponent로 감싼다.

```
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
  (async () => {
    try {
      const result = await axios.get(`https://www.leemember.com/api/search/${encodeURIComponent('노드')}`);
      console.log(result);
      console.log(result.data); // {}
    } catch (error) {
      console.error(error);
    }
  })();
</script>
```

이렇게 하면 노드라는 한글 주소가 어떠한 문자열로 변환되었다. 받는 쪽에서는 decodeURIComponent를 사용하면 된다. 이후 작업하는 것들중 encodeURIComponent / decodeURIComponent를 쓰는 경우, 한글을 처리하기 위한 것이라고 생각하면 된다.

<br>

3. 데이터 속성과 dataset

노드를 웹 서버로 사용하는 경우, 클라이언트(프론트엔드)와 빈번하게 데이터를 주고받게 된다. 이때 서버에서 보내준 데이터를 프론트엔드 어디에 넣어야 할지 고민하게 된다. 프론트엔드에 데이터를 내려보낼 때 ✨첫 번째로 고려해야 할 점은 <B>보안</B>✨ 이다.
보안과 무관한 데이터들은 자유롭게 프론트엔드로 보내도 된다. 자바스크립트 변수에 저장해도 되지만 HTML5에도 HTML과 관련된 데이터를 저장하는 공식적인 방법이 있다. 바로 ✨<B>데이터속성</B>✨이다.

```
<ul>
  <li data-id="1" data-user-job="programmer">Zero</li>
  <li data-id="2" data-user-job="designer">Nero</li>
  <li data-id="3" data-user-job="programmer">Hero</li>
  <li data-id="4" data-user-job="ceo">Kero</li>
</ul>
<script>
  console.log(document.querySelector('li').dataset);
  // { id: '1', userJob: 'programmer' }
</script>
```

위와 같이 html 태그의 속성으로 data- 로 시작하는 것들을 넣는다. 나중에 이 데이터들을 사용해 서버에 요청을 보내게 된다. 데이터 속성의 장점은 자바스크립트로 쉽게 접근할 수 있다는 점이다.
