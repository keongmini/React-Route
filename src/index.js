import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Route,
  Switch,
  // Link,
  NavLink, // : 사용자가 위치하고 있는 HTML 태그에 active 속성이 자동생성 -> 사용자가 현재 어디 위치해있는지 알 수 있음
  // index.css 참고
  // HashRouter : 어떤 경로로 들어오든지 웹서버 HTML 파일 서비스하는 게 가능하지 않을 경우 BrowserRouter 대신 사용
  useParams
} from 'react-router-dom';
// BrowserRouter : react-router-dom을 적용하고 싶은 컴포넌트 최상위 컴포넌트로 감싸주는 랩퍼 컴포넌트
// 라우팅(라우터) : 사용자가 어떤 주소로 들어갈 때 그 주소에 해당하는 적당한 페이지를 사용자에게 보여주는 것
function Home() {
  return(
    <div>
      <h2>Home</h2>
      This is Home page
    </div>
  )
}

var contents = [
  {id : 1, title : "topics1", description : "This is topics1"},
  {id : 2, title : "topics2", description : "This is topics2"},
  {id : 3, title : "topics3", description : "This is topics3"}
]
// 실제로는 Ajax 등을 통해 데이터를 받음

function Topic(){
  var params = useParams();
  var topic_id = params.topic_id;
  var selected_topic = {
    title : "Sorry",
    description : "Not Found"
  }
  for (var i=0; i<contents.length; i++){
    if(contents[i].id === Number(topic_id)){
      selected_topic = contents[i];
      break;
    }
  }
  console.log("params", params);
  return(
    <div>
      <h3>{selected_topic.title}</h3>
      {selected_topic.description}
    </div>
  )
}

function Topics() {
  var lis = [];
  for (var i=0;i<contents.length;i++){
    lis.push(
      <li key = {contents[i].id}><NavLink to = {"/topics/"+contents[i].id}>{contents[i].title}</NavLink></li>
    )
  }
  return(
    <div>
      <h2>Topics</h2>
      {/* 라우터 안에 라우터 중첩 : Nested Routing */}
      <ul>
        {/* <li><NavLink to = "/topics/1">topic1</NavLink></li>
        <li><NavLink to = "/topics/2">topic2</NavLink></li>
        <li><NavLink to = "/topics/3">topic3</NavLink></li> */}
        {lis}
      </ul>
      <Route path = "/topics/:topic_id">
        <Topic />
      </Route> 
      {/* <Switch>
        <Route path="/topics/1">
          This is topics1
        </Route>
        <Route path="/topics/2">
          This is topics2
        </Route>
        <Route path="/topics/3">
          This is topics3
        </Route>
      </Switch> */}
    </div>
  )
}
function Contact() {
  return(
    <div>
      <h2>Contact</h2>
      This is Contact page
    </div>
  )
}

function App(){
    return (
      <div>
        <h1>React Router DOM example</h1>
        <ul>
          {/* <li><a href = "/">Home</a></li>
          <li><a href = "/topics">Topics</a></li>
          <li><a href = "/contact">Contact</a></li> */}
          <li><NavLink exact to = "/">Home</NavLink></li>
          <li><NavLink to = "/topics">Topics</NavLink></li>
          <li><NavLink to = "/contact">Contact</NavLink></li>
          {/* 페이지 바뀌지 않고 내용만 변경 */}
        </ul>
        <Switch>
          {/* Switch : path와 일치하는 첫번째 컴포넌트 발생시 그 이후로 진행X, 모든 path는 "/"를 포함하기 때문에 전부 Home출력
          --> switch 사용시 exact 사용해야함 또는 "/" path를 가진 컴포넌트를 맨 아래에 위치 */}
          <Route path="/topics"><Topics></Topics></Route>
          <Route path="/contact"><Contact></Contact></Route>
          <Route exact path="/"><Home></Home></Route>
          {/* 사용자가 아무런 지정없이 해당 사이트에 접속했을 경우 Home 컴포넌트를 라우팅 */}
          {/* 정확히 해당하는 주소에만 라우팅하고 싶으면 path 앞에 exact 추가 */}
          <Route path="/">NOT FOUND</Route>
        </Switch>
      </div>
    )
}

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
// App 컴포넌트 안에서는 BrowserRouter 사용할 수 있는 상태


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
