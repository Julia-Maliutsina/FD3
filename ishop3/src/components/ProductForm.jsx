import React from "react";
import PropTypes from "prop-types";

import { ERRORS } from "../constants";
import { validName, validPrice, validUrl, validLeft } from "../utils/validation";

const DISPLAY_ERROR = "Displayed ErrorMessage";
const NO_DISPLAY = "NotDisplayed";

class ProductForm extends React.Component {
	static propTypes = {
		product: PropTypes.object,
		formMode: PropTypes.string,
		setEditInProcess: PropTypes.func.isRequired,
		saveNew: PropTypes.func.isRequired,
		saveEdited: PropTypes.func.isRequired,
		cancel: PropTypes.func.isRequired,
	};

	state = {
		newName: this.props.product.name || "",
		newPrice: this.props.product.price || "",
		newUrl: this.props.product.url || "",
		newLeft: this.props.product.left || "",
		nameError: this.props.formMode === "edit" ? NO_DISPLAY : DISPLAY_ERROR,
		priceError: this.props.formMode === "edit" ? NO_DISPLAY : DISPLAY_ERROR,
		urlError: this.props.formMode === "edit" ? NO_DISPLAY : DISPLAY_ERROR,
		leftError: this.props.formMode === "edit" ? NO_DISPLAY : DISPLAY_ERROR,
		saveButtonDisabled: "true",
	};

	checkAbilityToSave = () => {
		if (
			this.state.nameError === NO_DISPLAY &&
			this.state.priceError === NO_DISPLAY &&
			this.state.urlError === NO_DISPLAY &&
			this.state.leftError === NO_DISPLAY &&
			this.state.newName &&
			this.state.newPrice &&
			this.state.newUrl &&
			this.state.newLeft
		) {
			this.setState({ saveButtonDisabled: "" });
		} else {
			this.setState({ saveButtonDisabled: "true" });
		}
	};
	setNewName = (value) => {
		this.props.setEditInProcess(true);
		this.setState({ newName: value }, () => {
			if (validName(this.state.newName) && this.state.newName) {
				this.setState({ nameError: NO_DISPLAY }, () => this.checkAbilityToSave());
			} else {
				this.setState({ nameError: DISPLAY_ERROR });
				this.setState({ saveButtonDisabled: "true" });
			}
		});
	};
	setNewPrice = (value) => {
		this.props.setEditInProcess(true);
		this.setState({ newPrice: value }, () => {
			if (validPrice(this.state.newPrice) && this.state.newPrice) {
				this.setState({ priceError: NO_DISPLAY }, () => this.checkAbilityToSave());
			} else {
				this.setState({ priceError: DISPLAY_ERROR });
				this.setState({ saveButtonDisabled: "true" });
			}
		});
	};
	setNewUrl = (value) => {
		this.props.setEditInProcess(true);
		this.setState({ newUrl: value }, () => {
			if (validUrl(this.state.newUrl) && this.state.newUrl) {
				this.setState({ urlError: NO_DISPLAY }, () => this.checkAbilityToSave());
			} else {
				this.setState({ urlError: DISPLAY_ERROR });
				this.setState({ saveButtonDisabled: "true" });
			}
		});
	};
	setNewLeft = (value) => {
		this.props.setEditInProcess(true);
		this.setState({ newLeft: value }, () => {
			if (validLeft(this.state.newLeft) && this.state.newLeft) {
				this.setState({ leftError: NO_DISPLAY }, () => this.checkAbilityToSave());
			} else {
				this.setState({ leftError: DISPLAY_ERROR });
				this.setState({ saveButtonDisabled: "true" });
			}
		});
	};

	render() {
		return (
			<div>
				{this.props.formMode === "add" && (
					<div>
						<h4>Add new product</h4>
						<label>Id: {this.props.product.key}</label>
						<label>
							Name:
							<input type="text" value={this.state.newName} onChange={(e) => this.setNewName(e.target.value)}></input>
							<span className={this.state.nameError}>{ERRORS.name}</span>
						</label>
						<label>
							Price:
							<input type="text" value={this.state.newPrice} onChange={(e) => this.setNewPrice(e.target.value)}></input>
							<span className={this.state.priceError}>{ERRORS.price}</span>
						</label>
						<label>
							URL:
							<input type="text" value={this.state.newUrl} onChange={(e) => this.setNewUrl(e.target.value)}></input>
							<span className={this.state.urlError}>{ERRORS.url}</span>
						</label>
						<label>
							Quantity:
							<input type="text" value={this.state.newLeft} onChange={(e) => this.setNewLeft(e.target.value)}></input>
							<span className={this.state.leftError}>{ERRORS.left}</span>
						</label>
						<button
							disabled={this.state.saveButtonDisabled}
							onClick={() =>
								this.props.saveNew(
									this.props.product.key,
									this.state.newName,
									this.state.newPrice,
									this.state.newUrl,
									this.state.newLeft,
								)
							}
						>
							Save
						</button>
						<button onClick={() => this.props.cancel()}>Cancel</button>
					</div>
				)}
				{this.props.formMode === "edit" && (
					<div>
						<h4>Edit product info</h4>
						<label>Id: {this.props.product.key}</label>
						<label>
							Name:
							<input type="text" value={this.state.newName} onChange={(e) => this.setNewName(e.target.value)}></input>
							<span className={this.state.nameError}>{ERRORS.name}</span>
						</label>
						<label>
							Price:
							<input type="text" value={this.state.newPrice} onChange={(e) => this.setNewPrice(e.target.value)}></input>
							<span className={this.state.priceError}>{ERRORS.price}</span>
						</label>
						<label>
							URL:
							<input type="text" value={this.state.newUrl} onChange={(e) => this.setNewUrl(e.target.value)}></input>
							<span className={this.state.urlError}>{ERRORS.url}</span>
						</label>
						<label>
							Quantity:
							<input type="text" value={this.state.newLeft} onChange={(e) => this.setNewLeft(e.target.value)}></input>
							<span className={this.state.leftError}>{ERRORS.left}</span>
						</label>
						<button
							disabled={this.state.saveButtonDisabled}
							onClick={() =>
								this.props.saveEdited(
									this.props.product.key,
									this.state.newName,
									this.state.newPrice,
									this.state.newUrl,
									this.state.newLeft,
								)
							}
						>
							Save
						</button>
						<button onClick={() => this.props.cancel()}>Cancel</button>
					</div>
				)}
			</div>
		);
	}
}

export default ProductForm;
