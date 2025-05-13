# 이준환 학번 : 202130425

## 5월 08일 (9주차)
# 📘 React 학습 정리 - 9번째 수업 (2025-05-08)

## 🧠 핵심 개념 요약

- React는 UI를 **컴포넌트(Component)** 단위로 구성함
- 각 컴포넌트는 **다양한 시각적 상태(State)**를 가질 수 있음
- **데이터는 부모 → 자식 방향(props)**으로 흐름
- 상태(state)는 컴포넌트 내부에서 관리됨

---

## 🧩 Step 1: UI를 컴포넌트 계층으로 나누기

### ✔️ 방법
- 모의 시안(Mockup)에서 **시각적 요소마다 컴포넌트를 구분**
- **단일 책임 원칙(Single Responsibility Principle)** 적용  
  → 하나의 컴포넌트는 하나의 역할만 수행
- 컴포넌트가 커지면 더 작은 컴포넌트로 분리

### 💡 컴포넌트 분리 기준

| 관점        | 설명 |
|-------------|------|
| 프로그래밍  | 함수/객체처럼, 역할 단위로 컴포넌트 정의 |
| CSS         | 시각적 구조나 스타일 기준으로 나눔 |
| 디자인      | 디자인 툴에서 정의된 재사용 가능한 단위 활용 |

---

## 🧱 Step 2: 계층 구조 다듬기

### ✅ 구조화된 데이터 기반 설계
- JSON 구조와 UI 컴포넌트 구조는 보통 일치함
- 기능이 단순한 요소는 별도 컴포넌트로 분리하지 않아도 됨  
  (단, **기능이 추가되면 분리** 고려)

### 🧱 예시 구조

FilterableProductTable (전체)
├── SearchBar (검색창 + 체크박스)
└── ProductTable (상품 테이블)
├── ProductCategoryRow (카테고리 행)
└── ProductRow (상품 행)

---

## 🛠️ Step 2: 정적 버전 구현

### 📌 목표
- **정적인 데이터 기반**으로 UI 렌더링
- **state 사용 ❌, props만 사용 ✅**

### 🧭 구현 순서

| 방식       | 설명 |
|------------|------|
| Top-down   | 상위 컴포넌트부터 구현 |
| Bottom-up  | 작은 단위부터 쌓아올림 |

> 단순 예제: Bottom-up  
> 복잡한 앱: Top-down + 테스트 기반 개발

---

### 📂 프로젝트 초기 세팅

1. **불필요한 파일 삭제**
   - `logo.svg`, `setupTests.js` 등

2. **App.js 초기화**
export default function App() {
  return <h1>My React App</h1>;
};
정적 데이터 정의

js
const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  ...
];
🔄 Step 3: 최소한의 상태(State)로 동적 UI 구성
✅ 상태(state)의 역할
사용자의 입력, 클릭 등 변화되는 데이터 저장

props는 변하지 않는 데이터 전달용

📌 Don't Repeat Yourself (DRY) 원칙 적용
js
// ❌ 잘못된 방식
const [itemCount, setItemCount] = useState(5);

// ✅ 올바른 방식
const [items, setItems] = useState(["사과", "바나나"]);
const itemCount = items.length; // 계산으로 유도


## 4월 24일 (8주차 시험)
내용 없음

## 4월 18일 (보강주차)

# React 상태 끌어올리기 & 클로저 개념 정리

## 1. 상태 끌어올리기 (State Lifting)

### 핵심 요약
- `state`는 보통 상위 컴포넌트(Board)가 관리하며, 하위 컴포넌트(Square)로 `props`를 통해 전달한다.
- Square 컴포넌트는 클릭 시 상위 Board 컴포넌트의 `handleClick` 함수를 호출해 상태를 업데이트한다.
- 상태가 변경되면 Board와 하위 Square 컴포넌트가 **자동으로 다시 렌더링**된다.

### 동작 흐름 요약
```jsx
export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick() {
    const nextSquares = squares.slice();
    nextSquares[0] = "X";
    setSquares(nextSquares);
  }

  return (
    <div className="board-row">
      <Square value={squares[0]} onSquareClick={() => handleClick()} />
    </div>
  );
}
```

> ⚠️ `onClick={handleClick()}`처럼 직접 호출하면 **무한 루프에 빠질 수 있음**. 반드시 함수 형태로 전달해야 함: `() => handleClick()`.

---

## 2. 클로저(Closure)의 개념

### 정의
- 클로저는 **함수와 그 함수가 선언된 렉시컬 환경**의 조합이다.
- 내부 함수가 **외부 함수의 변수에 접근할 수 있는 현상**을 의미한다.

### 특징
- **외부 함수 → 내부 함수 접근 불가**
- **내부 함수 → 외부 함수의 변수 접근 가능**

### 장점
1. 전역 변수 사용 최소화
2. 데이터 은닉 및 보존 가능
3. 모듈화된 코드 구성
4. 정보 은닉 (캡슐화)

---

## 3. Game 컴포넌트로 상태 끌어올리기

### Game 컴포넌트 도입
```jsx
export default function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
  );
}
```

- `index.js`에서 Game을 최상위로 렌더링
- `<div>` 레이아웃 구성으로 게임 정보 영역 확보

### 상태 관리 확장
```jsx
const [xIsNext, setXIsNext] = useState(true);
const [history, setHistory] = useState([Array(9).fill(null)]);
```

- 현재 상태는 `history[history.length - 1]`로 계산 가능

---

## 4. Board 컴포넌트의 props 전환

### Board에서 state 제거하고 props로만 받기
```jsx
<Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
```

### handleClick 변경
```jsx
function handleClick(i) {
  const nextSquares = squares.slice();
  nextSquares[i] = xIsNext ? "X" : "O";
  onPlay(nextSquares);
}
```

---

## 5. 레이아웃 깨짐 해결

- `<button>`을 `<div>`로 감싸지 말 것
- `<React.Fragment>`로 감싸거나 `<button>` 단독 사용
- float 스타일은 `button`까지만 적용

---

## 6. 과거 움직임 표시하기

### history 배열 map으로 렌더링
```jsx
const moves = history.map((squares, move) => {
  return (
    <li key={move}>
      <button onClick={() => jumpTo(move)}>Go to move #{move}</button>
    </li>
  );
});
```

### 설명
- `map`은 배열 각 요소에 대해 버튼을 반환
- `jumpTo(move)`로 해당 턴으로 이동 가능
- `moves`는 `<ol>{moves}</ol>`로 렌더링됨

## 4월 17일 (7주차)

## 📌 State 끌어올리기

### 🧩 handleClick 함수 정의

```jsx
export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick() {
    const nextSquares = squares.slice();
    nextSquares[0] = "X";
    setSquares(nextSquares);
  }

  return (
    // ...
  );
}
```

---

### 🧠 handleClick 함수 설명

- `handleClick` 함수는 `slice()` 메서드로 `squares` 배열을 복사해 `nextSquares`를 만듭니다.
- `nextSquares[0]`에 "X"를 추가한 후 `setSquares`를 호출해 상태를 업데이트합니다.
- 이로 인해 `Board` 컴포넌트와 자식 컴포넌트인 `Square`가 다시 렌더링됩니다.

---

### 📎 Closure 개념

- 클로저는 **스코프를 기준으로 변수 접근 범위를 제한**하는 개념입니다.
- 외부 함수 스코프에서는 내부 함수 스코프의 변수에 접근 ❌
- 내부 함수는 외부 함수 스코프의 변수에 접근 ⭕

**장점**
1. 전역 변수 최소화
2. 데이터 은닉 가능
3. 코드 모듈화
4. 정보 접근 제한

---

## ❌ handleClick(0) 직접 호출 시 문제

```jsx
<Square value={squares[0]} onSquareClick={handleClick(0)} />
```

- 위 코드는 JSX 렌더링 시 `handleClick(0)`이 즉시 실행됨
- `setSquares` 호출로 인해 `Board`가 다시 렌더링되고, 또 다시 `handleClick(0)`이 실행되어 **무한 루프 발생**

🔥 오류 메시지:
```bash
Too many re-renders. React limits the number of renders to prevent an infinite loop.
```

---

## ✅ 해결 방법: 화살표 함수 사용

```jsx
<Square value={squares[0]} onSquareClick={() => handleClick(0)} />
```

- `() => handleClick(0)`은 함수형 함수로, 클릭될 때만 실행됨
- 클릭 시 `handleClick(0)`이 실행되어 상태 변경이 발생함

---

## 🔄 상태 끌어올리기 전체 흐름

1. `Board`가 모든 `state`를 관리함
2. 자식 `Square`에 `onSquareClick` props 전달
3. `Square` 클릭 시 props로 받은 `handleClick` 실행 요청
4. `handleClick`은 상태를 업데이트 → `Board` 다시 렌더링
5. 다시 렌더링되며 `Square`들도 새로운 props로 렌더링됨

---

## 🧪 시나리오 예시

사용자가 `Board`의 **왼쪽 위 사각형**을 클릭하면 어떤 일이 일어나는지 순서대로 정리:

1. `Square` 컴포넌트에서 `onClick`으로 받은 함수 실행
2. `Board`에서 전달된 `handleClick(0)` 실행
3. `handleClick`은 `squares[0] = "X"`로 업데이트
4. `setSquares` 호출 → `Board` 전체 다시 렌더링
5. 변경된 `squares`에 따라 `Square`도 `"X"`로 값이 바뀜

결과적으로 사용자는 클릭한 부분에 `"X"`가 나타나는 것을 확인할 수 있음 ✅

### 🔸 DOM 이벤트 vs 사용자 정의 컴포넌트
- DOM `<button>`의 `onClick`은 HTML 빌트인 이벤트로 특별한 의미를 가짐
- 사용자 정의 컴포넌트(`Square`)의 경우 `onSomething`, `handleSomething` 네이밍은 사용자 자유
- `Square`의 `onSquareClick` props와 `Board`의 `handleClick`은 이름이 달라도 동작 동일

---

## 🔐 불변성이 왜 중요한가요

### ✅ 불변성 장점 1
- 원본 데이터를 직접 변경하지 않음으로써 여러 이점을 얻음
1. 복잡한 기능 쉽게 구현 가능
2. 시간 여행 기능 구현 가능 (ex: 이전 상태로 되돌리기)
3. 특정 작업 실행 취소 및 다시 실행 가능
4. 상태 초기화도 쉽게 가능

---

### ✅ 불변성 장점 2
- `state`가 변경되면 모든 자식 컴포넌트가 다시 렌더링됨
- 이때 변경 사항이 없는 컴포넌트도 포함됨 → 성능 저하 가능
- `memo API`로 최적화 가능

---

## 🔁 교대로 두기 - 1단계

```jsx
export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  return (
    // ...
  );
}
```

🛠 개발자 도구에서 state 변화를 확인해보자

---

## 🚫 교대로 두기 - 2단계 문제

- 같은 사각형을 여러 번 클릭하면 `X`와 `O`가 덮여씌워짐 → 잘못된 동작

**해결 방법**
1. 이미 채워진 칸이면 return 처리

```jsx
function handleClick(i) {
  if (squares[i]) return;
  const nextSquares = squares.slice();
  // ...
}
```

이제 빈 칸에만 `X` 또는 `O`가 추가됨

---

## 🔁 return의 의미

- `return`은 함수를 즉시 종료시킴
- 값을 명시하지 않으면 `undefined` 반환됨
- 예: `if (squares[i]) return;` → 이미 값이 있으면 더 이상 진행하지 않고 종료

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