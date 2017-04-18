import React, { Component } from 'react';
import deleteLogo from './delete.svg';
import editLogo from './edit.svg';
import TodoItem from './Item';
class TodoList extends Component {
  constructor(){
    super();
    this.addItem = this.addItem.bind(this);
    this.createList = this.createList.bind(this);
    this.deletList = this.deleteList.bind(this);
    this.checkItem = this.checkItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }
  deleteList(lkey){
    this.props.deleteList(lkey);
  }
  changeList(lkey){
    this.props.changeList(lkey);
  }
  addItem(key, input){
    this.props.addItem(key, input);
  }
  checkItem(lkey, ikey){
    this.props.checkItem(lkey, ikey);
  }
  deleteItem(lkey, ikey){
    this.props.deleteItem(lkey,ikey);
  }
  createList(list){
    let inputItem;
    let titleClass;
    if (list.edit===0)
      titleClass='title-text-readonly';
    else
      titleClass='title-text-editable';
    return (  
      <div key={list.key} className="ListBox">
          <div className='list-title'
            onKeyPress={
              (e)=>{
                let key= e.keyCode || e.which;
                if(key===13){
                  this.changeList(list.key);
                }
              }
            }
          >
            <img src={deleteLogo} alt='X' className='delete-logo' onClick={()=>this.deleteList(list.key)}/>
            <img src={editLogo} alt='Edit' className='delete-logo' onClick={()=>this.changeList(list.key)}/>
            <div className={titleClass}>{list.text}</div>
          </div>
          <input 
            ref={a=> {inputItem = a;} } 
            onKeyPress={
              (e)=>{
                let key= e.keyCode || e.which;
                if(key===13){
                  this.addItem(list.key, inputItem.value)
                }
              }
            }/>
          <button onClick={()=>this.addItem(list.key, inputItem.value)}>+</button>
          <TodoItem list={list} checkItem={this.checkItem} deleteItem={this.deleteItem}></TodoItem>
      </div>
    )
  }

  render() {
    let listArr = this.props.listArr;
    var listArrRender = listArr.map(this.createList);
    return (
        <div>
          {listArrRender}
        </div>
    );
  }
}

export default TodoList;