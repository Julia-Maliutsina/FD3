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
		editForm: false,
		productToEdit: {},
		formMode: "",
		editInProcess: false,
	};

	selectProduct = (key) => {
		if (!this.state.editInProcess) {
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
		}
	};

	deleteProduct = (key, EO) => {
		EO.stopPropagation();
		if (!this.state.editInProcess && window.confirm("Delete product from list?")) {
			let productsArray = [...this.state.products];
			productsArray = productsArray.filter((product) => product.key !== key);
			this.setState({ products: productsArray });
		}
	};

	addProduct = () => {
		let allProducts = this.state.products;
		allProducts = allProducts.map((product) => product.key);
		let allProductsLength = Math.max(...allProducts);
		allProductsLength++;
		this.setState({
			selected: {},
			displayAddButton: "NotDisplayed",
			addForm: true,
			editForm: false,
			formMode: "add",
			productToEdit: { key: allProductsLength },
		});
	};

	editProduct = (product, EO) => {
		EO.stopPropagation();
		if (!this.state.editInProcess) {
			this.setState({
				selected: { key: product.key },
				displayAddButton: "NotDisplayed",
				addForm: false,
				editForm: true,
				formMode: "edit",
				productToEdit: product,
			});
		}
	};

	setEditInProcess = (edit) => {
		this.setState({ editInProcess: edit });
	};

	saveNew = (newKey, newName, newPrice, newUrl, newLeft) => {
		const newProduct = {
			name: newName,
			price: newPrice,
			left: newLeft,
			url: newUrl,
			key: newKey,
		};
		let newProducts = [newProduct, ...this.state.products];
		this.setState(
			{ products: newProducts },
			this.setState({
				displayAddButton: "Displayed",
				addForm: false,
				editForm: false,
				productToEdit: {},
				formMode: "",
				editInProcess: false,
			}),
		);
	};

	saveEdited = (key, newName, newPrice, newUrl, newLeft) => {
		let newProducts = [...this.state.products];
		for (let prod = 0; prod < newProducts.length; prod++) {
			if (newProducts[prod].key === key) {
				newProducts[prod] = {
					name: newName,
					price: newPrice,
					left: newLeft,
					url: newUrl,
					key: key,
				};
				this.setState(
					{ products: newProducts },
					this.setState({
						displayAddButton: "Displayed",
						addForm: false,
						editForm: false,
						productToEdit: {},
						formMode: "",
						editInProcess: false,
					}),
				);
			}
		}
	};

	cancel = () => {
		this.setState({
			displayAddButton: "Displayed",
			addForm: false,
			editForm: false,
			productToEdit: {},
			formMode: "",
			editInProcess: false,
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
				isSelected={this.state.selected.key === product.key}
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
				{this.state.selected.name && <ProductInfo product={this.state.selected} />}
				{(this.state.addForm || this.state.editForm) && (
					<ProductForm
						key={this.state.productToEdit.key}
						formMode={this.state.formMode}
						product={this.state.productToEdit}
						setEditInProcess={this.setEditInProcess}
						saveNew={this.saveNew}
						saveEdited={this.saveEdited}
						cancel={this.cancel}
					/>
				)}
			</div>
		);
	}
}

export default IShop;
