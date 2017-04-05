import React, { Component } from 'react';
import TodoList from './List';
import logo from './logo.svg';
import './App.css';
class App extends Component {
  constructor(){
    super();
    this.state = {
      list: [],
      count: 0
    }
    this.onClick = this.onClick.bind(this);
    this.addList = this.addList.bind(this);
    this.deleteList = this.deleteList.bind(this);
    this.changeList = this.changeList.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.checkItem = this.checkItem.bind(this);
  }
  findTarget(array, key){
    for (let i = 0, l = array.length; i < l; i++) {
      if (array[i].key === key) {
          return i;
      }
    }
  }
  onClick(){
    this.addList();
    this.setState({
      count: this.state.count+1
    })
  }
  addList(){
    let listArr = this.state.list;
    listArr.push(
      {
        icount: 0,
        key: this.state.count,
        text: this._inputElement.value,
        item: [],
        edit: 0
      }
    )
    this.setState({
      list: listArr
    })
  }
  addItem(key, itemText){
    let listArr = this.state.list;
    let targetList = listArr[this.findTarget(listArr,key)];
    targetList.item.push(
      {
        key: targetList.icount,
        text: itemText,
        isCheck: 0
      }
    );
    targetList.icount+=1;
    listArr[this.findTarget(listArr,key)]=targetList;
    this.setState({
      list:listArr
    })
  }
  deleteList(lkey){
    let listArr = this.state.list;
    const remainder = listArr.filter((list) => {
      if(list.key !== lkey) return list;
    });
    this.setState({
      list:remainder
    })
  }
  changeList(lkey){
    let listArr = this.state.list;
    let targetList = listArr[this.findTarget(listArr,lkey)];
    if(targetList.edit===0)
      targetList.edit=1;
    else
      targetList.edit=0
    listArr[this.findTarget(listArr,lkey)]=targetList;
    this.setState({
      list:listArr
    })
  }
  checkItem(lkey, ikey){
    let listArr = this.state.list;
    let targetList = listArr[this.findTarget(listArr,lkey)];
    let targetItemList = targetList.item;
    for (var i = 0, l = targetItemList.length; i < l; i++) {
      if (targetItemList[i].key === ikey) {
          if(targetItemList[i].isCheck===1)
            targetItemList[i].isCheck=0;
          else
            targetItemList[i].isCheck=1;
          break;
      }
    }
    targetList.item=targetItemList;
    listArr[this.findTarget(listArr,lkey)]=targetList;
    this.setState({
      list:listArr
    })
  }
  deleteItem(lkey, ikey){
    let listArr = this.state.list;
    let targetList = listArr[this.findTarget(listArr,lkey)];
    let targetItemList = targetList.item;
    const remainder = targetItemList.filter((item) => {
      if(item.key !== ikey) return item;
    });
    targetList.item=remainder;
    listArr[this.findTarget(listArr,lkey)]=targetList;
    this.setState({
      list:listArr
    })
  }
  render() {
    return (
      <div className="App">
        <header>
          <img src={logo} alt="logo" className='App-logo'/>
          <h1>TodoList</h1>
        </header>
        <input ref={(a) => this._inputElement = a}></input>
        <button onClick={this.onClick}>Go</button>
        <div className='ListGroup'>
          <TodoList 
            listArr={this.state.list} 
            addItem={this.addItem}
            deleteList={this.deleteList}
            changeList={this.changeList}
            checkItem={this.checkItem}
            deleteItem={this.deleteItem}
          />
        </div>
      </div>
    );
  }
}

export default App;
