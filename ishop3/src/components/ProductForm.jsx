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
		hasErrors: false,
		nameError: NO_DISPLAY,
		priceError: NO_DISPLAY,
		urlError: NO_DISPLAY,
		leftError: NO_DISPLAY,
		saveButtonDisabled: "true",
	};

	setNewName = (value) => {
		this.props.setEditInProcess(true);
		this.setState({ newName: value });
		if (validName(value)) {
			this.setState(
				{
					nameError: NO_DISPLAY,
					hasErrors: false,
				},
				() => {
					this.checkAbilityToSave();
				},
			);
		} else {
			this.setState(
				{
					nameError: DISPLAY_ERROR,
					hasErrors: true,
				},
				() => {
					this.checkAbilityToSave();
				},
			);
		}
	};
	setNewPrice = (value) => {
		this.props.setEditInProcess(true);
		this.setState({ newPrice: value });
		if (validPrice(value)) {
			this.setState(
				{
					priceError: NO_DISPLAY,
					hasErrors: false,
				},
				() => {
					this.checkAbilityToSave();
				},
			);
		} else {
			this.setState(
				{
					priceError: DISPLAY_ERROR,
					hasErrors: true,
				},
				() => {
					this.checkAbilityToSave();
				},
			);
		}
	};
	setNewUrl = (value) => {
		this.props.setEditInProcess(true);
		this.setState({ newUrl: value });
		if (validUrl(value)) {
			this.setState(
				{
					urlError: NO_DISPLAY,
					hasErrors: false,
				},
				() => {
					this.checkAbilityToSave();
				},
			);
		} else {
			this.setState(
				{
					urlError: DISPLAY_ERROR,
					hasErrors: true,
				},
				() => {
					this.checkAbilityToSave();
				},
			);
		}
	};
	setNewLeft = (value) => {
		this.props.setEditInProcess(true);
		this.setState({ newLeft: value });
		if (validLeft(value)) {
			this.setState(
				{
					leftError: NO_DISPLAY,
					hasErrors: false,
				},
				() => {
					this.checkAbilityToSave();
				},
			);
		} else {
			this.setState(
				{
					leftError: DISPLAY_ERROR,
					hasErrors: true,
				},
				() => {
					this.checkAbilityToSave();
				},
			);
		}
	};

	checkAbilityToSave = () => {
		if (!this.state.hasErrors && this.state.newName && this.state.newPrice && this.state.newUrl && this.state.newLeft) {
			this.setState({ saveButtonDisabled: "" });
		} else {
			this.setState({ saveButtonDisabled: "true" });
		}
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
