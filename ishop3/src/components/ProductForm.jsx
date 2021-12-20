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
		hasErrors: this.props.formMode === "edit" ? false : true,
		nameError: this.props.formMode === "edit" ? NO_DISPLAY : DISPLAY_ERROR,
		priceError: this.props.formMode === "edit" ? NO_DISPLAY : DISPLAY_ERROR,
		urlError: this.props.formMode === "edit" ? NO_DISPLAY : DISPLAY_ERROR,
		leftError: this.props.formMode === "edit" ? NO_DISPLAY : DISPLAY_ERROR,
		saveButtonDisabled: "true",
	};

	errorsCheck = () => {
		validName(this.state.newName) && this.state.newName
			? this.setState({ hasErrors: false, nameError: NO_DISPLAY })
			: this.setState({ hasErrors: true, nameError: DISPLAY_ERROR });
		validPrice(this.state.newPrice) && this.state.newPrice
			? this.setState({ hasErrors: false, priceError: NO_DISPLAY })
			: this.setState({ hasErrors: true, priceError: DISPLAY_ERROR });
		validUrl(this.state.newUrl) && this.state.newUrl
			? this.setState({ hasErrors: false, urlError: NO_DISPLAY })
			: this.setState({ hasErrors: true, urlError: DISPLAY_ERROR });
		validLeft(this.state.newLeft) && this.state.newLeft
			? this.setState({ hasErrors: false, leftError: NO_DISPLAY })
			: this.setState({ hasErrors: true, leftError: DISPLAY_ERROR });
	};
	checkAbilityToSave = () => {
		if (!this.state.hasErrors && this.state.newName && this.state.newPrice && this.state.newUrl && this.state.newLeft) {
			this.setState({ saveButtonDisabled: "" });
		} else {
			this.setState({ saveButtonDisabled: "true" });
		}
	};
	setNewName = (value) => {
		this.props.setEditInProcess(true);
		this.setState({ newName: value }, () => {
			this.errorsCheck();
			this.checkAbilityToSave();
		});
	};
	setNewPrice = (value) => {
		this.props.setEditInProcess(true);
		this.setState({ newPrice: value }, () => {
			this.errorsCheck();
			this.checkAbilityToSave();
		});
	};
	setNewUrl = (value) => {
		this.props.setEditInProcess(true);
		this.setState({ newUrl: value }, () => {
			this.errorsCheck();
			this.checkAbilityToSave();
		});
	};
	setNewLeft = (value) => {
		this.props.setEditInProcess(true);
		this.setState({ newLeft: value }, () => {
			this.errorsCheck();
			this.checkAbilityToSave();
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
								!this.state.hasErrors &&
								this.state.newName &&
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
								!this.state.hasErrors &&
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
