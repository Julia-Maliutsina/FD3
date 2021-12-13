import React from "react";
import PropTypes from "prop-types";

class ProductInfo extends React.Component {
	static propTypes = {
		product: PropTypes.object.isRequired,
	};

	render() {
		return (
			<div>
				<h4>{this.props.product.name}</h4>
				<p>Price: {this.props.product.price}</p>
				<p>Quantity: {this.props.product.left}</p>
				<p>Url: {this.props.product.url}</p>
			</div>
		);
	}
}

export default ProductInfo;
