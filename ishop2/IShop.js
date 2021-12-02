const ShopComponent = React.createClass({

  displayName: 'ShopComponent',

  getInitialState: function () {
    return {
      products: this.props.goods,
      selectedKey: NaN,
      productToDelete: NaN
    }
  },

  selectProduct: function (key) {
    this.setState({selectedKey: key});
  },

  deleteProduct: function (key, EO) {
    EO.stopPropagation();
    let confirmDelete = confirm("Delete product from list?");
    if (confirmDelete) {
      let productsArray = [...this.state.products];
      productsArray = productsArray.filter(product => product.key!==key);
      this.setState({products: productsArray})
    }
  },

  render: function() {

    let headTable=React.DOM.thead({className: 'tableHead'}, 
      React.DOM.tr({className:'tableHeadRow'}, 
        React.DOM.th({className: 'ProductImgInTable'},"Photo"),
        React.DOM.th({className: 'ProductNameInTable'},"Product"),
        React.DOM.th({className: 'ProductPriceInTable'},"Price"),
        React.DOM.th({className: 'ProductLeftInTable'},"Left in stock"),
      )
    );

    const bodyTable=this.state.products.map( product =>
      React.createElement(Product, 
        {key: product.key, product: product, selected: this.state.selectedKey,
        changeSelected: this.selectProduct, deleteProduct: this.deleteProduct
      })
    );
    
    let offersTableBody = React.DOM.tbody({className: 'tableBody'}, bodyTable);

    return React.DOM.div( {className:'IShopComponent'}, 
      React.DOM.div( {className:'ShopName'}, this.props.shopName ),
      React.DOM.table( {className:'OffersTable'}, headTable, offersTableBody  ),
    );
  },

});