import React from 'react';

class Details extends React.Component {
  render(){
    return(
      <div className="details">
        <h3 className="text-center">{this.props.title}</h3>
      </div>
    )
  }
}

export default Details
