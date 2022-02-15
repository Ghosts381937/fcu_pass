import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class FcuPass extends React.Component {
  constructor(props) {
    super(props);
    this.date = new Date();
    console.log(this.date);
    this.generateDay();
  }

  generateDay = () => {
    let month = "";
    let tmp = this.date.getMonth() + 1;
    if (tmp < 10) {
      month = `0${tmp}`;
    }
    else if (tmp < 100) {
      month = `${tmp}`;
    }
    let date = "";
    tmp = this.date.getDate();
    if (tmp < 10) {
      date = `0${tmp}`;
    }
    else if (tmp < 100) {
      date = `${tmp}`;
    }
    this.today = `${month}/${date}`;
  }

  render() {
    const className = `backgcolor${this.date.getDay()}`;

    return (
      <div className="body_item">
        <div className={`circle ${className}`}>
          <div className="content">
            <div className="date">{this.today}</div>
            <div className="dvtitle">{this.props.name}</div>
            <div className="ng-scope">
              <div className="dvtitle">自主健康管理</div>
              <div className="pass">PASS</div>
            </div>
            <div className="footer">逢甲大學關心您</div>
          </div>
        </div>
      </div>
    )
  }
}

class ChangeNameButton extends React.Component {
  constructor() {
    super();
    this.state = {
      name: ""
    };
    this.getAllCacheData();
  }

  getAllCacheData = async () => {
    const url = "https://fcu-d0813127.github.io/fcu_pass/";
    // const url = "http://localhost:3000/";
    const names = await caches.keys();
    for (var i = 0; i < names.length; i++) {
      const cacheStorage = await caches.open(names[i]);
      const cacheResponse = await cacheStorage.match(url);
      const data = await cacheResponse.json();
      this.setState({name: data});
    }
  }

  addDataIntoCache = (cacheName, url, response) => {
    const data = new Response(JSON.stringify(response));
    if ("caches" in window) {
      caches.open(cacheName).then((cache) => {
        cache.put(url, data);
      });
    }
  }

  changeHandler = () => {
    const name = prompt("Please enter your name: ");
    this.setState({name: name});
    this.addDataIntoCache("name", "https://fcu-d0813127.github.io/fcu_pass/", name);
    // this.addDataIntoCache("name", "http://localhost:3000/", name);
  }

  render() {
    return (
      <div className="outside_button">
        <FcuPass name={this.state.name}/>
        <button className="button" onClick={this.changeHandler}>Change Name</button>
      </div>
    )
  }
}

ReactDOM.render (
  <ChangeNameButton />, 
  document.getElementById("root")
);