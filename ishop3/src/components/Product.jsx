import React from "react";
import PropTypes from "prop-types";

class Product extends React.Component {
	static propTypes = {
		product: PropTypes.object.isRequired,
		isSelected: PropTypes.bool,
		changeSelected: PropTypes.func.isRequired,
		deleteProduct: PropTypes.func.isRequired,
		editProduct: PropTypes.func.isRequired,
	};

	render() {
		const product = this.props.product;
		let classProduct = "Product";
		if (this.props.isSelected) {
			classProduct = "ProductSelected";
		}
		return (
			<tr className={classProduct} onClick={() => this.props.changeSelected(product.key)}>
				<td className="ProductNameInTable">{product.name}</td>
				<td className="ProductPriceInTable">{product.price}</td>
				<td className="ProductUrlInTable">{product.url}</td>
				<td className="ProductLeftInTable">{product.left}</td>
				<td className="ProductDeleteInTable" onClick={(EO) => this.props.deleteProduct(product.key, EO)}>
					Delete
				</td>
				<td className="ProductEditInTable" onClick={(EO) => this.props.editProduct(product, EO)}>
					Edit
				</td>
			</tr>
		);
	}
}

export default Product;
