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
