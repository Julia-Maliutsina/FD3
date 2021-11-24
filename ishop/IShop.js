const IShopComponent = React.createClass({

  displayName: 'IShopComponent',

  render: function() {

    let headTable=  React.DOM.thead({className: 'tableHead'}, 
      React.DOM.tr({className:'tableHeadRow'}, 
        React.DOM.th({className: 'ProductImgInTable'},"Photo"),
        React.DOM.th({className: 'ProductNameInTable'},"Product"),
        React.DOM.th({className: 'ProductPriceInTable'},"Price"),
        React.DOM.th({className: 'ProductLeftInTable'},"Left in stock"),
      )
    );

    let bodyTable=[];
    this.props.goods.forEach(function(product, id) {
      let offer = React.DOM.tr(
      {key:id,className:'Product'},
      React.DOM.td({className: 'ProductImgInTable'}, 
        React.DOM.img ({className: 'ProductImg', src:product.photo, alt:product.name})
      ),
      React.DOM.td({className: 'ProductNameInTable'},product.name),
      React.DOM.td({className: 'ProductPriceInTable'},product.price + "$"),
      React.DOM.td({className: 'ProductLeftInTable'},product.left),
      );
      bodyTable.push(offer);
    });
    let offersTableBody = React.DOM.tbody({className: 'tableBody'}, bodyTable);

    return React.DOM.div( {className:'IShopComponent'}, 
      React.DOM.div( {className:'ShopName'}, this.props.shopName ),
      React.DOM.table( {className:'OffersTable'}, headTable, offersTableBody  ),
    );
  },

});