import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './App.css';
import { createStore } from 'redux'

const App = () => (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/time" component={time} />
    </div>
  </BrowserRouter>
)

const vote = (state = 0, action) => {
  switch (action.type) {
    case 'ADD':
      return state + 1
    default:
      return state
  }
}

let store = createStore(vote)


const Home = () => {
  // let vote = 3 //投票数
  // vote++
  // store.dispatch({ type: 'ADD' })
  let x = store.getState().toString()

  return (
    <div>
      <h1 className="container">臨時サイト</h1>
      <p className="container">遷移回数：{x}</p>
      <p><Link to="/time">遷移カウンター</Link></p>

      <buton className="container btn btn-default" ><a href="./time">時計表示サイトへ</a></buton>
      <buton className="container btn btn-default"><a href="https://webrage.jp/">WRホームページへ</a></buton>
      <NameForm />
      <br></br>
      <FlavorForm />
    </div>
  )
}

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert(`氏名が送信されました：${this.state.value}`);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          氏名:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input id="input1" type="submit" value="送信" />
      </form>
    );
  }
}


// 
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 'coconut' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert('好きな果物：' + this.state.value + 'を送信しました');
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="apple">りんご</option>
            <option value="banana">ばなな</option>
            <option value="orange">みかん</option>
            <option value="grape">ぶどう</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}



// 時計サイトのソース
function time() {
  let x = store.getState().toString();
  store.dispatch({ type: 'ADD' })

  return (
    <div className="container text-center">
      <h1>時計</h1>
      {/* クリックするたびに現在時刻を表示するコンポーネントを呼び出して表示する */}
      <Clock />
      <p>遷移回数：{x}</p>
      <p><Link to="/">遷移カウンター</Link></p>
      <buton className="container btn btn-default" ><a href="/">ホームへ</a></buton>
    </div>
  )
}

// クリックするたびに現在時刻を表示するコンポーネントを作成
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.now = new Date();
    this.state = {
      time: `${this.now.getHours()}:${this.now.getMinutes()}:${this.now.getSeconds()}`
    }

    this.refresh = this.refresh.bind(this);
  }

  // 現在時刻を表示するメソッドを作成
  refresh() {
    this.now = new Date();
    this.setState((state) => ({
      time: `${this.now.getHours()}:${this.now.getMinutes()}:${this.now.getSeconds()}`
    })
    )
  }

  // 時刻をクリックしたら現在時刻に切り替わる様に表示
  render() {
    return <p onClick={this.refresh}>{this.state.time}</p>
  }
}

export default App