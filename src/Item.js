import React, { Component } from 'react';
import deleteLogo from './delete.svg';
import green_circle from './green_circle.svg';
import white_circle from './white_circle.svg';

class TodoItem extends Component {
  constructor(){
    super();
    this.createItem=this.createItem.bind(this);
    this.checkItem=this.checkItem.bind(this);
    this.deleteItem=this.deleteItem.bind(this);
  }
  checkItem(lkey, ikey){
    this.props.checkItem(lkey, ikey);
  }
  deleteItem(lkey, ikey){
    this.props.deleteItem(lkey, ikey);
  }
  createItem(item){
    let lkey = this.props.list.key;
    let ikey = item.key;
    let t_style;
    let green_class;
    let white_class;
    const t_style_1=
    {
        'color': 'gray',
        'textDecoration':'line-through' 
    };
    const t_style_2=
    {
        'color': 'black'
    };
    if(item.isCheck===1){
      t_style=t_style_1;
    }
    else{
      t_style=t_style_2;
    }
    return (
      <div key={item.key} className='ItemBox'>
        <img 
          src={deleteLogo} 
          className='delete-logo' 
          alt='X' 
          onClick={()=>{this.deleteItem(lkey, ikey)}}/>
        <div onClick={()=>{this.checkItem(lkey, ikey)}} style={t_style}>
          <img src={green_circle} className='green-logo' alt='o'/>
          <img src={white_circle} className='white-logo' alt='o'/>
          {item.text}
        </div>
      </div>
    )
  }
  render() {
    let list = this.props.list;
    let itemArr = list.item;
    var itemArrRender = itemArr.map(this.createItem);
    return (
        <div className="items">
          {itemArrRender}
        </div>
    );
  }
}

export default TodoItem;