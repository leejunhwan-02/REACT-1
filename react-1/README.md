# 이준환 학번 : 202130425

## 4월 17일 (7주차)

## 4월 10일 (6주차)
## 📦 보드 만들기

- Square 컴포넌트를 통해 정적인 보드 구성
- 현재는 9개의 버튼을 직접 나열

```jsx
function Square() {
  return (
    <div>
      <div className="board-row">
        <button className="square">1</button>
        <button className="square">2</button>
        <button className="square">3</button>
      </div>
      ...
    </div>
  );
}
```

---

## 🔄 props를 통해 데이터 전달하기

- Square 컴포넌트에 직접 숫자 넣지 않고, **props**를 통해 값 전달
- 재사용 가능한 구조로 변경

```jsx
function Square({ value }) {
  return <button className="square">{value}</button>;
}
```

```jsx
function Board() {
  return (
    <div>
      <div className="board-row">
        <Square value="1" />
        <Square value="2" />
        <Square value="3" />
      </div>
      ...
    </div>
  );
}
```

- JSX에서 JS 변수 출력 시 중괄호 사용 필요 → `{value}`

---

## 🎯 사용자와 상호작용하는 컴포넌트 만들기

- 클릭 시 "clicked!" 출력 → `onClick` 이벤트 추가
- Square 내에 이벤트 핸들러 추가

```jsx
function Square({ value }) {
  function handleClick() {
    console.log("clicked!");
  }

  return (
    <button className="square" onClick={handleClick}>
      {value}
    </button>
  );
}
```

---

## 🧠 상태 기억 및 상태 관리

- 클릭했는지 기억 → `useState` 사용
- props 제거 후 내부 상태로 처리

```jsx
import { useState } from 'react';

function Square() {
  const [value, setValue] = useState(null);

  function handleClick() {
    setValue("X");
  }

  return (
    <button className="square" onClick={handleClick}>
      {value}
    </button>
  );
}
```

- Board에서는 더 이상 props 전달하지 않음

```jsx
function Board() {
  return (
    <>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
    </>
  );
}
```

---

📌 정리:
- props → 부모에서 자식으로 값 전달
- useState → 컴포넌트 내부에서 값 저장 및 UI 업데이트
- onClick → 이벤트 처리

## 4월 3일 (5주차)
##  이벤트에 응답하기 

- component 내부에서 **event handler 함수**를 선언하면 event에 응답 가능.
- `onClick={handleClick}`처럼 괄호 없이 전달해야 함.
- 함수 호출이 아닌 함수 **참조만 전달**해야 함.
- 사용자가 버튼 클릭 시 React는 해당 핸들러를 실행함.

```jsx
function MyButton() {
  function handleClick() {
    alert('You clicked me!');
  }

  return (
    <button onClick={handleClick}>
      I'm a button
    </button>
  );
}
```

---

##  화면 업데이트하기 (useState)

### 상태(state) 관리 기본

- component가 정보를 **기억하고 상태를 업데이트**하려면 `state` 사용.
- `useState`를 import해서 사용:
```js
import { useState } from 'react';
```

- useState로 상태 변수 선언:
```jsx
function MyButton() {
  const [count, setCount] = useState(0);
}
```

- 버튼 클릭 시 상태 증가:
```jsx
function Button() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}
```

- 컴포넌트를 App.js에 등록 후 버튼 여러 개 만들어 테스트:
```jsx
import { useState } from 'react';

export default function CountState() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <button onClick={handleClick}>
        Clicked {count} times
      </button>
    </div>
  );
}
```

### 상태 공유 문제

- 각 버튼은 **자기만의 count state**를 기억함.
- 버튼 간 상태를 공유하지 않음 → 독립된 상태.
- 상태를 공유하려면 **공통 부모 컴포넌트**에서 상태를 관리해야 함 (11절 참고).

---

##  Hook 사용하기

- `use`로 시작하는 함수 = Hook.
- `useState`는 React가 제공하는 **내장 Hook**.
- 커스텀 Hook도 작성 가능.
- Hook은 **함수보다 더 제한적**:
  - 반드시 component 상단에서만 호출 가능.
  - 조건문, 반복문 내부에서는 호출 불가.
  - 공통된 동작을 추출해 재사용 가능.

---

##  Hooks의 사용 규칙 (Rules of Hooks)

1. **최상위**에서만 Hook을 호출해야 한다.
2. `if`, `for`, `while` 등의 블록 안에서는 **Hook 사용 금지**.
3. 실행 순서가 달라질 수 있는 조건문 내부 호출도 금지.

### 잘못된 예:
```jsx
function MyComponent() {
  if (someCondition) {
    useState(0); // ❌ 조건문 안에서 사용 불가
  }
}
```

### 올바른 예:
```jsx
function MyComponent() {
  const [count, setCount] = useState(0); // 항상 최상위에서 호출
}
```
## ✅ Hooks의 사용 규칙 (Rules of Hooks)

- React 함수형 component 또는 사용자 Hook 내부에서만 Hook 사용 가능.
- 일반적인 JavaScript 함수에서는 `useState`, `useEffect` 등의 Hook 사용 불가.

```js
// ❌ 일반 함수 - Hook 사용 불가
function notAComponent() {
  useState(0);
}

// ✅ 컴포넌트 내부 - 사용 가능
function MyComponent() {
  const [count, setCount] = useState(0);
}
```

---

### 🔒 왜 제한이 필요한가?

#### 1. Rendering 순서 보장
조건문이나 반복문 안에서 Hook을 사용하면 렌더링마다 실행 순서가 달라질 수 있어 React가 상태 추적 불가.

#### 2. 불필요한 사이드 이펙트 방지
컴포넌트가 여러 번 렌더링될 때 항상 동일한 순서로 Hook이 실행되어야 React가 의도한 동작을 보장할 수 있음.

---

## 🔁 Function Component vs Class Component

- 과거 class형 component가 많았던 이유는 function형 컴포넌트에 상태/생명주기 기능이 없었기 때문.

### React 역사 기반 차이 설명

**1. React 초창기 (2013~2014)**  
- function 컴포넌트는 props만 받아 UI 반환하는 역할만 가능  
- state, lifecycle 없음 → 주요 컴포넌트는 class로 작성

**2. React 16.8 (2019년)**  
- `useState`, `useEffect` 추가  
- 함수형 컴포넌트에서도 상태 관리와 생명주기 구현 가능  
- React 공식 문서도 Hooks 기반 권장

**3. React 17 (2020년)**  
- 내부적 개선 → Hooks + function 컴포넌트가 사실상 표준화됨

**4. React 18 (2022년)**  
- Automatic Batching 최적화  
- `.useTransition`, `.useDeferredValue` 등 최신 Hook 도입  
- class → function 컴포넌트 전환 가속화

---

## 📤 Component 간 데이터 공유

- 하나의 컴포넌트를 계속 수정하는 공식 문서는 이전 상태 확인이 어려움.
- 실습 시에는 별도 컴포넌트를 만들어 사용 권장.

```plaintext
✔️ 상태 공유가 필요한 경우를 제외하면 별도 컴포넌트로 분리
```

---

## 🧠 상태가 공유되지 않는 이유

- 같은 컴포넌트라도 각각 렌더링되면 각각의 상태(`count`)를 가짐
- 독립적인 동작 → 이상한 것이 아니라 객체 지향적으로 당연한 결과
- 하나의 컴포넌트를 여러 번 렌더링하면 **count state도 각각 따로 존재**

```plaintext
App
├── CountState (count: 0)
├── CountState (count: 1)
└── CountState (count: 0)
```

## 3월 27일 (4주차)
##  Component의 생성 및 Nesting (중첩)

- React 앱은 여러 개의 **component**로 구성된다.
- component는 **고유한 로직과 모양을 가진 UI의 일부분**이다.
- component는 버튼처럼 작을 수도 있고, 전체 페이지처럼 클 수도 있다.
- component는 **마크업을 반환(return)**하는 **JavaScript 함수**이다.
- Nesting은 CSS 선택자의 중첩 구조로 표현 가능하며, `2023년 이후 CSS 자체 지원`됨.

예시:
```css
.container {
  background: blanchedalmond;
}
.container > .foo {
  color: red;
}
.container > .foo > .bar {
  color: blueviolet;
}
```

---

##  JSX로 마크업 작성하기

- JSX는 코드의 마크업 문법.
- 필수는 아니지만 React에서는 편의성 때문에 주로 사용.
- HTML보다 **더 엄격한 문법**이 적용됨.
  - 모든 태그는 닫아야 함 (`<br />`).
- JSX에서 여러 개의 component는 하나의 부모 태그로 감싸야 함.
  - `<div>...</div>` 또는 빈 태그 `<>...</>`로 wrapping.

```jsx
export default function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <p>Hello there.<br />How do you do?</p>
    </>
  );
}
```

---

##  스타일 추가하기

- React에서는 `className`으로 CSS 클래스 지정.
- `className`은 HTML의 `class`와 동일하게 작동.
- CSS는 별도 파일에 작성.
- 가장 쉬운 방법은 HTML에 `<link>` 태그 추가하는 것.
  - 단, 정적 페이지 수정 필요하므로 **권장되지 않음**.
- React에서는 CSS 파일을 import하거나 CSS-in-JS 도구 사용 가능.

```jsx
<img className="avatar" />
```

```css
/* your CSS file */
.avatar {
  border-radius: 50%;
}
```

---

##  조건부 렌더링

- 일반적인 자바스크립트 조건문과 동일하게 사용.
- JSX 내부에서도 `if`, `삼항 연산자`, `&&`, `||` 사용 가능.

###  if-else 문
```jsx
let content;
if (isLoggedIn) {
  content = <AdminPanel />;
} else {
  content = <LoginForm />;
}
return <div>{content}</div>;
```

###  삼항 연산자
```jsx
<div>
  {isLoggedIn ? <AdminPanel /> : <LoginForm />}
</div>
```

###  논리 연산자
```jsx
// isLoggedIn이 참이면 실행
{isLoggedIn && <AdminPanel />}

// isLoggedIn이 거짓이면 실행
{!isLoggedIn && <LoginForm />}
```

---

##  리스트 렌더링하기

- 리스트 렌더링에는 `map()` 함수 사용.
- 각 항목에 고유한 `key` 속성 필수.
- 삽입/삭제/정렬 시 key를 통해 React가 변화를 감지.

```jsx
const products = [
  { title: 'Cabbage', id: 1 },
  { title: 'Garlic', id: 2 },
  { title: 'Apple', id: 3 }
];

const listItems = products.map(product =>
  <li key={product.id}>
    {product.title}
  </li>
);

return (
  <ul>{listItems}</ul>
);
```

---

🧠 위 내용을 기반으로 컴포넌트 작성 및 렌더링 방식, 조건문, 리스트, 스타일 적용까지 React의 핵심 개념을 정리하였습니다.

## 3월 20일 (3주차)
오늘 배운 내용

node_modules/
초기 node module 및 새로 설치하는 패키지가 저장됩니다.

초기 파일 37,352 / 폴더 4,597 / 용량은 200MB로 엄청난 양의 파일이 존재 합니다.

git으로 관리하지 않기 때문에 디렉토리 이름이 흐릿하게 나와 있는 것을 확인할 수 있습니다.

public/
정적(static) 파일을 저장하는 디렉토리 입니다.

build 후 배포할 html, CSS, JavaScript 등이 보관되는 곳입니다.

개발하면서 특별히 수정할 코드는 없습니다.

src/
React 프로젝트의 주요 코드가 위치하는 디렉토리 입니다.

개발 하면서 대부분의 작업이 이루어지는 곳입니다.

src/App.js
메인 component 로 필요한 sub component를 모아서 관리합니다.

출력을 위해서 index.js로 전달됩니다.

src/App.css
App.js에 적용되는 스타일을 정의하는 스타일 파일입니다.

src/index.js
React 앱의 진입 점(entry point)으로 최종 렌더링이 되는 곳입니다.

ReactDOM.createRoot를 사용하여 App.js를 렌더링합니다.

src/index.css
전역 스타일을 정의하는 스타일 파일입니다.




## 3월 13일 (2주차)
오늘 배운 내용