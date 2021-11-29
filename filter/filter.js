const FilterComponent = React.createClass({

  displayName: 'FilterComponent',

  getInitialState: function () {
    return {
      listToRender: this.props.array,
      filterText: '',
      sortList: false,
    }
  },

  setStringList: function(){
    let filteredList = [...this.props.array];
    if (this.state.filterText.length) {
      filteredList = filteredList.filter(item => item.text.startsWith(this.state.filterText));
    }
    if (this.state.sortList) {
      filteredList = filteredList.sort((a,b) => {  
        let x = a.text;
        let y = b.text;
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      });
    }
      this.setState({listToRender: filteredList});
  },

  filterTextChanged: function(EO) { 
    this.setState({filterText: EO.target.value}, ()=>{this.setStringList()});
  },

  sortListChanged: function() {
    this.setState({sortList: !this.state.sortList}, ()=>{this.setStringList()});
  },  

  discardFilter: function() {
    this.setState(this.getInitialState());
  },

  render: function() {
    
    let stringListItems=[];
    this.state.listToRender.forEach(function(item) {
      let listItem = React.DOM.li(
      {className: "stringListItem", key: item.id}, item.text);
      stringListItems.push(listItem);
    });
    let stringList = React.DOM.ul({className: 'stringList'}, stringListItems);

    return React.DOM.div( {className:'filterComponent'}, 
      React.DOM.input({type: 'checkbox', onClick: this.sortListChanged, checked: this.state.sortList, className:'sortStringCheckbox'}),
      React.DOM.input({type: 'text', onChange: this.filterTextChanged, value: this.state.filterText, className:'filterStringInput'}),
      React.DOM.button({className:'discardFilterStringButton', onClick: this.discardFilter}, 'Сброс'),
      React.DOM.div( {className:'stringListContainer'}, stringList )
    );
  },

});