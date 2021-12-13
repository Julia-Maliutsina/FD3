import React from "react";
import PropTypes from "prop-types";
import "../IShop.css";
import Product from "./Product";
import ProductInfo from "./ProductInfo";
import ProductForm from "./ProductForm";

class IShop extends React.Component {
	static propTypes = {
		goods: PropTypes.arrayOf(PropTypes.object),
	};

	state = {
		products: this.props.goods,
		selected: {},
		productToDelete: NaN,
		displayAddButton: "Displayed",
		addForm: false,
		new: {
			key: NaN,
		},
		editForm: false,
		productToEdit: {},
		formMode: "",
	};

	selectProduct = (key) => {
		for (let prod of this.state.products) {
			if (key === prod.key) {
				this.setState({
					selected: prod,
					displayAddButton: "Displayed",
					addForm: false,
					editForm: false,
					formMode: "",
				});
			}
		}
	};

	deleteProduct = (key, EO) => {
		EO.stopPropagation();
		if (window.confirm("Delete product from list?")) {
			let productsArray = [...this.state.products];
			productsArray = productsArray.filter((product) => product.key !== key);
			this.setState({ products: productsArray });
		}
	};

	addProduct = () => {
		let allProducts = this.state.products;
		allProducts = allProducts.map((product) => product.key);
		const allProductsLength = Math.max(...allProducts);
		this.setState({
			selected: {},
			displayAddButton: "NotDisplayed",
			addForm: true,
			editForm: false,
			new: { key: allProductsLength },
			formMode: "add",
			productToEdit: {},
		});
	};

	editProduct = (product, EO) => {
		EO.stopPropagation();
		this.setState({
			selected: {},
			displayAddButton: "NotDisplayed",
			addForm: false,
			editForm: true,
			formMode: "edit",
			productToEdit: product,
		});
	};

	render() {
		const headProducts = (
			<tr>
				<th>Product</th>
				<th>Price</th>
				<th>URL</th>
				<th>Quantity</th>
			</tr>
		);

		const products = this.state.products.map((product) => (
			<Product
				key={product.key}
				product={product}
				selected={this.state.selected}
				changeSelected={this.selectProduct}
				deleteProduct={this.deleteProduct}
				editProduct={this.editProduct}
			/>
		));

		return (
			<div>
				<table>
					<thead>{headProducts}</thead>
					<tbody className="Products">{products}</tbody>
				</table>
				<button className={this.state.displayAddButton} onClick={this.addProduct}>
					New product
				</button>
				{this.state.selected.key && <ProductInfo product={this.state.selected} />}
				{(this.state.addForm || this.state.editForm) && (
					<ProductForm formMode={this.state.formMode} product={this.state.productToEdit} new={this.state.new} />
				)}
			</div>
		);
	}
}

export default IShop;
