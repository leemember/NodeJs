const timeout = setTimeout(() => {
  console.log('1.5초 후 실행');
}, 1500);

const interval = setInterval(() => {
  console.log('1초마다 실행');
}, 1000);

const timeout2 = setTimeout(() => {
  console.log('실행되지 않습니다');
}, 3000);

setTimeout(() => {
  clearTimeout(timeout2);
  clearInterval(interval);
}, 2500);

const immediate = setImmediate(() => {
  console.log('즉시 실행');
});

const immediate2 = setImmediate(() => {
  console.log('실행되지 않습니다');
});

clearImmediate(immediate2);

/*

제일 먼저 실행되는 것은 immediate이다. immediate2는 바로 clearImmediate를 사용해서 취소 했으므로 실행되지 않는다.
코드 실행 1초 후에는 interval의 콜백이 실행된다. 코드 실행 1.5초 후에는 timeout의 콜백이 실행될 것이다.
interval의 콜백은 1초마다 실행되므로 코드 실행 후 2초가 지났을 때도 콜백이 실행된다.
2.5초가 지났을 때 clearTimeout과 clearInterval이 각각 timeout2와 interval을 취소한다.
따라서 코드 실행 3초 후에는 로그가 아무것도 남지 않는다.
*/