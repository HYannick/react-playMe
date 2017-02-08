import React from 'react';
//Autocomplete
import Autocomplete from 'react-autocomplete';

class Search extends React.Component{
  handleRenderItem(item, isHighlighted){
    const listStyle = {
      item: {
        padding: '2px 6px',
        cursor: 'default'
      },
      highlightedItem: {
        color: 'white',
        background: '#F38B72',
        padding: '2px 6px',
        cursor: 'default'
      }
    };
    return(
      <div
        style={isHighlighted ? listStyle.highlightedItem : listStyle.item}
        key={item.id}
        id={item.id}
        >

        {item.title}
      </div>
    )
  }

  render(){
    return(
      <div className="search">
          <Autocomplete
            ref="autocomplete"
            inputProps={
              {
                title: "Title",
                className: "search__input",
                placeholder: "Search some chill ~"
              }
            }
            value={this.props.autoCompleteValue}
            items={this.props.tracks}
            getItemValue={
              (item => item.title)
            }
            onSelect={this.props.handleSelect}
            onChange={this.props.handleChange}
            renderItem={this.handleRenderItem.bind(this)}
          />
      </div>
    )
  }
}

export default Search
