import React from "react";
import PropTypes from "prop-types";

class ProductForm extends React.Component {
	static propTypes = {
		product: PropTypes.object,
		formMode: PropTypes.string,
		new: PropTypes.object.isRequired,
	};

	state = {
		newName: this.props.product.name || "",
		newPrice: this.props.product.price || "",
		newUrl: this.props.product.url || "",
		newLeft: this.props.product.left || "",
		nameError: "NotDisplayed",
		priceError: "NotDisplayed",
		urlError: "NotDisplayed",
		leftError: "NotDisplayed",
	};

	setNewName = (value) => {
		if (value.length > 30 || value.length == 0) {
			this.setState({ nameError: "Displayed ErrorMessage" });
			return;
		}
		this.setState({ nameError: "NotDisplayed" });
		this.setState({ newName: value });
	};
	setNewPrice = (value) => {
		if (!/^[0-9]{0,5}$/.test(value)) {
			this.setState({ priceError: "Displayed ErrorMessage" });
			return;
		}
		this.setState({ priceError: "NotDisplayed" });
		this.setState({ newPrice: value });
	};
	setNewUrl = (value) => {
		if (!/^[\w\.\:\/\=\?]*$/.test(value) || value.length > 30) {
			this.setState({ urlError: "Displayed ErrorMessage" });
			return;
		}
		this.setState({ urlError: "NotDisplayed" });
		this.setState({ newUrl: value });
	};
	setNewLeft = (value) => {
		if (!/^[0-9]*$/.test(value) || value.length > 4) {
			this.setState({ leftError: "Displayed ErrorMessage" });
			return;
		}
		this.setState({ leftError: "NotDisplayed" });
		this.setState({ newLeft: value });
	};

	render() {
		return (
			<div>
				{this.props.formMode === "add" && (
					<div>
						<h4>Add new product</h4>
						<label>Id: {this.props.new.key}</label>
						<label>
							Name
							<input type="text" value={this.state.newName} onChange={(e) => this.setNewName(e.target.value)}></input>
							<span className={this.state.nameError}>Name is required and must be shorter than 30 caracters</span>
						</label>
						<label>
							Price
							<input type="text" value={this.state.newPrice} onChange={(e) => this.setNewPrice(e.target.value)}></input>
							<span className={this.state.priceError}>
								Price must be less than 5 caracters and contain only numbers.
							</span>
						</label>
						<label>
							URL<input type="text" value={this.state.newUrl} onChange={(e) => this.setNewUrl(e.target.value)}></input>
							<span className={this.state.urlError}>
								URL must be less than 30 caracters and contain letters, numbers or symbols ".:/?=" .
							</span>
						</label>
						<label>
							Quantity
							<input type="text" value={this.state.newLeft} onChange={(e) => this.setNewLeft(e.target.value)}></input>
							<span className={this.state.leftError}>
								Quantity must be less than 4 caracters and contain only numbers.
							</span>
						</label>
						<button>Save</button>
						<button>Cancel</button>
					</div>
				)}
				{this.props.formMode === "edit" && (
					<div>
						<h4>Edit product info</h4>
						<label>Id: {this.props.product.key}</label>
						<label>
							Name:
							<input type="text" value={this.state.newName} onChange={(e) => this.setNewName(e.target.value)}></input>
						</label>
						<label>
							Price
							<input type="text" value={this.state.newPrice} onChange={(e) => this.setNewPrice(e.target.value)}></input>
						</label>
						<label>
							URL<input type="text" value={this.state.newUrl} onChange={(e) => this.setNewUrl(e.target.value)}></input>
						</label>
						<label>
							Quantity
							<input type="text" value={this.state.newLeft} onChange={(e) => this.setNewLeft(e.target.value)}></input>
						</label>
						<button>Save</button>
						<button>Cancel</button>
					</div>
				)}
			</div>
		);
	}
}

export default ProductForm;
