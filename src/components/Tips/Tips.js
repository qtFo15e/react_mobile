import React,{PureComponent} from 'react';

export default class Tips extends PureComponent {
  render(){
    return (
      <div style={{ padding: 10, textAlign: 'center', fontSize: 16, color: '#888', backgroundColor: "#FFF" }}>{this.props.text}</div>
    )
  }
}
