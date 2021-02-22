## 🌼 4장 http 모듈로 서버 만들기

> 실제 서버 동작에 필요한 쿠키와 세션 처리, 그리고 요청 주소별 라우팅 방법에 대해서 배워보자

```

클라이언트 <---(요청/응답)---> 서버

```

서버는 클라이언트가 있기에 동작한다. 클라이언트에서 서버로 요청을 보내고 서버에서는 요청의 내용을 읽고 처리한 뒤 클라이언트에 응답을 보낸다. 따라서 서버에는 요청을 받는 부분과 응답을 보내는 부분이 있어야 한다. 요청과 응답은 이벤트 방식이라 생각하면 된다.

클라이언트로부터 요청이 왔을 때, 어떤 작업을 수행할지 <b>이벤트 리스너</b>를 미리 등록해두어야 한다.

```
const http = require('http');

http.createServer((req, res) => {
  // 여기에 어떻게 응답할지 적습니다.
});
```

> 이벤트 리스너를 가진 노드 서버를 만들어보았다. http 서버가 있어야 웹 브라우저의 요청을 처리할 수 있으므로 http 모듈을 사용했다. http 모듈에는 createServer 메서드가 있다. 인수로 요청에 대한 콜백 함수를 넣을 수 있으며, <b>요청이 들어올 때마다 매번 콜백 함수가 실행</b>된다.

<b>createServer의 콜백 부분을 보면 req, res매개 변수</b>가 있다. 보통 request를 줄여 req라고 표현하고 response를 줄여 res라고 표현한다.

- req : 요청에 관한 정보
- res : 응답에 관한 정보

```
const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.write('<h1>Hello Node!</h1>');
  res.end('<p>Hello Server!</p>');
})
  .listen(8080, () => { // 서버 연결
    console.log('8080번 포트에서 서버 대기 중입니다!');
  });
```

이제 http://localhost:8080 또는 http://127.0.0.1:8080 에 접속하면

```
Hello Node!
Hello Server!
```

문구가 브라우저에 찍혀나온다.

<br><br>

### 🔥 localhost와 포트란 ?

> localhost는 현재 컴퓨터의 내부 주소를 가르킨다. 외부에서는 접근할 수 없고 자신의 컴퓨터에서만 접근할 수 있으므로, 서버 개발 시 테스트용으로 많이 사용된다. localhost 대신 127.0.0.1을 주소로 사용해도 같다. 이러한 숫자 주소를 IP(Internet Protocol)라고 부른다.

✨ 다른 서비스가 사용하고 있는 포트를 사용할 경우 Error: listen EADDRINUSE :::포트 번호 같은 에러가 발생합니다. 이런 경우에는 그 서비스를 종료하거나 노드의 포트를 다른 번호로 바꾸면 된다. createServer 메서드 뒤에 listen 메서드를 붙이고 클라이언트에 공개할 포트 번호와 포트 연결 완료 후 실행될 콜백 함수를 넣는다.

<br>

### 1. 헤더(Header)

<b>res 객체에는 res.riteHead와 res.rite, res.end 메서드</b>가 있습니다.
<b>res.riteHead</b>는 응답에 대한 정보를 기록하는 메서드입니다. 첫 번째 인수로 성공적인 요청임을 의미하는 200을, 두 번째 인수로 응답에 대한 정보를 보내는데 콘텐츠의 형식이 HTML임을 알리고 있습니다. 또한 한글 표시를 위해 charset을 utf-8로 지정했습니다. 이 정보가 기록되는 부분을 헤더(Header)라고 부릅니다.

### 2. 본문(body)

<b>res.rite 메서드의 첫 번째 인수는 클라이언트로 보낼 데이터</b>입니다. 지금은 HTML 모양의 문자열을 보냈지만 버퍼를 보낼 수도 있습니다. 또한, 여러 번 호출해서 데이터를 여러 개 보내도 됩니다. 데이터가 기록되는 부분을 본문(Body)이라고 부른다.

### 3. 종료

<b>res.end는 응답을 종료하는 메서드</b>입니다. 만약 인수가 있다면 그 데이터도 클라이언트로 보내고 응답을 종료한다.

> 노드에서 직접 일일이 html을 헤더 바디 나누어서 작업하기에는 비효율적이니 HTML 파일을 만들어두면 좋다. 그 HTML 파일을 fs 모듈로 읽어서 전송 시킬 수 있다.

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Node.js 웹 서버</title>
</head>
<body>
    <h1>Node.js 웹 서버</h1>
    <p>만들 준비되셨나요?</p>
</body>
</html>
```

이렇게 html파일을 만들고,

```
const http = require('http');
const fs = require('fs').promises;

http.createServer(async (req, res) => {
  try {
    const data = await fs.readFile('./server2.html');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(data);
  } catch (err) {
    console.error(err);
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(err.message);
  }
})
  .listen(8081, () => {
    console.log('8081번 포트에서 서버 대기 중입니다!');
  });
```

이렇게 fs.readFile('./server2.html') 하여 html 파일을 불러온다.
만약 예기치 못한 에러가 발생할 경우 에러 메시지를 응답한다.

<br>

### 🔥 HTTP 상태코드

- 2XX: <B>성공을 알리는 상태 코드</B>입니다. 대표적으로 200(성공), 201(작성됨)이 많이 사용됩니다.

- 3XX: <B>리다이렉션(다른 페이지로 이동)을 알리는 상태 코드</B>입니다. 어떤 주소를 입력했는데 다른 주소의 페이지로 넘어갈 때 이 코드가 사용됩니다. 대표적으로 301(영구 이동), 302(임시 이동)가 있습니다. 304(수정되지 않음)는 요청의 응답으로 캐시를 사용했다는 뜻입니다.

- 4XX: <B>요청 오류를 나타냅니다.</B> 요청 자체에 오류가 있을 때 표시됩니다. 대표적으로 400(잘못된 요청), 401(권한 없음), 403(금지됨), 404(찾을 수 없음)가 있습니다.

- 5XX: <B>서버 오류를 나타냅니다.</B> 요청은 제대로 왔지만 서버에 오류가 생겼을 때 발생합니다. 이 오류가 뜨지 않게 주의해서 프로그래밍해야 합니다. 이 오류를 res.riteHead로 클라이언트에 직접 보내는 경우는 거의 없고, 예기치 못한 에러 발생 시 서버가 알아서 5XX대 코드를 보냅니다. 500(내부 서버 오류), 502(불량 게이트웨이), 503(서비스를 사용할 수 없음)이 자주 사용됩니다.

<br>

### 🔥 REST와 라우팅 사용하기

> 서버에 요청을 보낼 때는 주소를 통해 요청의 내용을 표현한다. 주소가 /index.html이면 서버의 index.html을 보내달라는 뜻이고, /about.html이면 about.html을 보내달라는 뜻이다.

html뿐만 아니라 css나 js 또는 이미지 같은 파일을 요청할 수도 있고 특정 동작을 행하는 것을 요청할 수도 있다. 요청의 내용이 주소를 통해 표현되므로 서버가 이해하기 쉬운 주소를 사용하는 것이 좋다. 여기서 REST가 등장한다.

<B>REST는 REpresentational State Transfer의 줄임말</B>이며, 서버의 자원을 정의하고 자원에 대한 주소를 지정하는 방법을 가리킨다.
<B>REST API에는 많은 규칙</B>들이 있다.

주소는 의미를 정확히 전달하기 위해 명사로 구성된다.

- /user : <b>사용자 정보에 관련된 자원을 요청하는 것</b>
- /post : <b>게시글에 관련된 자원을 요청하는 것</b>

단순히 명사만 있으면 무슨 동작을 행하라는 것인지 알기 어려우니 <b>REST에서는 주소 외에도 HTTP 요청 메서드라는 것을 사용</b>한다. 폼 데이터를 전송할 때 <b>GET 또는 POST 메서드를 지정</b>하는데 이때 쓰는 <b>GET, POST가 바로 요청 메서드</b>다.

또한 <b>PUT, PATCH, DELETE, OPTIONS 등의 메서드</b>도 자주 사용한다.

<BR>

### 🔥 요청메서드 기능 알아보기

- GET: 서버 자원을 <B>가져오고자 할 때</B> 사용한다.<br>
  요청의 본문에 데이터를 넣지 않습니다. 데이터를 서버로 보내야 한다면 쿼리스트링을 사용합니다.

- POST: 서버에 자원을 <b>새로 등록하고자 할 때</b> 사용.<br>
  요청의 본문에 새로 등록할 데이터를 넣어 보냅니다.

- PUT: 서버의 자원을 <b>요청에 들어 있는 자원으로 치환</b>하고자 할 때 사용.<br>
  요청의 본문에 치환할 데이터를 넣어 보냅니다.

- PATCH: 서버 자원의 <b>일부만 수정하고자 할 때</b> 사용.<br>
  요청의 본문에 일부 수정할 데이터를 넣어 보냅니다.

- DELETE: 서버의 자원을 <b>삭제하고자 할 때</b> 사용.<br>
  요청의 본문에 데이터를 넣지 않습니다.

- OPTIONS: 요청을 하기 전에 <b>통신 옵션을 설명하기 위해</b> 사용.

<b>주소 하나가 요청 메서드를 여러 개</b> 가질 수 있다. GET 메서드의 /USER 주소로 요청을 보내면 사용자 정보를 가져오는 요청이라는 것을 알 수 있고, POST메서드의 /USER주소로 요청을 보내면 새로운 사용자를 등록하려 한다는 것을 알 수 있다. 만약 위 메서드로 표현하기 애매한 로그인 같은 동작이 있다면 <b>그냥 POST 사용</b>하면 된다.

이렇게 주소와 메서드만 보고 요청의 내용을 알아 볼 수 있다는 것이 장점이다. 또한 GET 메서드 같은 경우에는 브라우저에서 캐싱(기억)할 수 있으므로 같은 주소로 GET 요청을 할 때 서버에서 가져오는 것이 아니라 캐시에서 가져올 수 있다. 이렇게 캐싱이 되면 <b>성능이 좋아진다.</b>

<br>

---

<br>

### 🔥 REST를 사용한 주소 체계로 RESTful 웹서버 만들기

> REST를 따르는 서버를 'RESTful하다'라고 표현한다.

```
const http = 🔥require('http');
const fs = require('fs').promises;

const users = {}; // 데이터 저장용

http.createServer(async (req, res) => {
  try {
    console.log(🔥req.method, req.url);
    if (req.method === 'GET') {🔥
      if (req.url === '/') {
        const data = await fs.readFile('./restFront.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(data);
      } else if (req.url === '/about') {
        const data = await fs.readFile('./about.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(data);
      } else if (req.url === '/users') {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end(JSON.stringify(users));
      }
      // /도 /about도 /users도 아니면
      try {
        const data = await fs.readFile(`.${req.url}`);
        return res.end(data);
      } catch (err) {
        // 주소에 해당하는 라우트를 못 찾았다는 404 Not Found error 발생
      }
    } else if (req.method === 'POST') {
      if (req.url === '/user') {
        let body = '';
        // 요청의 body를 stream 형식으로 받음
        req.on('data', (data) => {
          body += data;
        });
        // 요청의 body를 다 받은 후 실행됨
        return req.on('end', () => {
          console.log('POST 본문(Body):', body);
          const { name } = JSON.parse(body);
          const id = Date.now();
          users[id] = name;
          res.writeHead(201);
          res.end('등록 성공');
        });
      }
    } else if (req.method === 'PUT') {
      if (req.url.startsWith('/user/')) {
        const key = req.url.split('/')[2];
        let body = '';
        req.on('data', (data) => {
          body += data;
        });
        return req.on('end', () => {
          console.log('PUT 본문(Body):', body);
          users[key] = JSON.parse(body).name;
          return res.end(JSON.stringify(users));
        });
      }
    } else if (req.method === 'DELETE') {
      if (req.url.startsWith('/user/')) {
        const key = req.url.split('/')[2];
        delete users[key];
        return res.end(JSON.stringify(users));
      }
    }
    res.writeHead(404);
    return res.end('NOT FOUND');
  } catch (err) {
    console.error(err);
    res.writeHead(500);
    res.end(err);
  }
 })
  .listen(8082, () => {
    console.log('8082번 포트에서 서버 대기 중입니다');
  });
```

현재경로 - [restServer.js]가 핵심이다.<br>코드를 보면 req.method로 HTTP 요청 메서드를 구분하고 있다. 메서드가 GET이면 다시 req.url로 요청 주소를 구분한다. 주소가 /일 때는 restFront.html을 제공하고, 주소가 about이면 about.html 파일을 제공한다.

이외의 경우에는 주소에 적힌 파일을 제공한다. /restFront.js 라면 restFront.js 파일을 제공할 것이고, /restFront.css라면 restFront.css 파일을 제공할 것이다. 만약 존재하지 않는 파일을 요청했거나 GET 메서드 요청이 아닌 경우라면 🔥 404 에러가 응답으로 전송🔥된다. 응답 과정 중에 예기치 못한 에러가 발생할 경우에는 500 에러가 응답으로 전송된다.

다른 HTTP 요청 메서드들을 추가하고, 데이터베이스 대용으로 users라는 객체를 선언하여 사용자 정보를 저장했다. POST /user 요청에서는 사용자를 새로 저장하고 있으며, PUT /user/아이디 요청에서는 해당 아이디의 사용자 데이터를 수정하고 있다. DELETE /user/아이디 요청에서는 해당 아이디의 사용자를 제거한다.
