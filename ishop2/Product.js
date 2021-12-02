const Product = React.createClass({

  displayName: 'Product',

  propTypes: {
    product: React.PropTypes.object.isRequired,
    selected: React.PropTypes.number.isRequired,
    changeSelected: React.PropTypes.func.isRequired,
    deleteProduct: React.PropTypes.func.isRequired,
  },

  rowClicked: function(EO) {
    this.props.changeSelected(this.props.code);
  },

  render: function() {

    const product = this.props.product;
    let classProduct = 'Product';
    if (product.key===this.props.selected) {
      classProduct='ProductSelected'; 
    }

    return React.DOM.tr(
      {className: classProduct, onClick: ()=>this.props.changeSelected(product.key)},
      React.DOM.td({className: 'ProductImgInTable'}, 
        React.DOM.img ({className: 'ProductImg', src:product.photo, alt:product.name})
      ),
      React.DOM.td({className: 'ProductNameInTable'},product.name),
      React.DOM.td({className: 'ProductPriceInTable'},product.price + "$"),
      React.DOM.td({className: 'ProductLeftInTable'},product.left),
      React.DOM.td({className: 'ProductDeleteInTable', onClick: (EO)=>this.props.deleteProduct(product.key, EO)},'delete'),
    );
  }
})