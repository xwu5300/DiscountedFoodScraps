import React from "react";
import axios from "axios";
import {
	FieldGroup,
	Radio,
	Checkbox,
	FormControl,
	FormGroup,
	InputGroup,
	ControlLabel,
	Button,
	Label,
	HelpBlock
} from "react-bootstrap";
import Dropzone from "react-dropzone";
import GoogleSearchBox from "./autocomplete.jsx";

export default class Form extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.handleChange = this.handleChange.bind(this);
		this.sendFormData = this.sendFormData.bind(this);
		this.autocompleteHandler = this.autocompleteHandler.bind(this);
		this.handlePhoto = this.handlePhoto.bind(this)

		this.state = {
			name: "",
			address: "",
			email: "",
			phone: "",
			menu: "",
			price: "",
			quantity: "",
			photoUrl: ""
		};
	}

	getValidationState() {
		const length = this.state.name.length;
		if (length > 10) return "success";
		else if (length > 5) return "warning";
		else if (length > 0) return "error";
		return null;
	}
	handleChange(e) {
		this.setState({
			[e.target.id]: e.target.value
		});
	}

	sendFormData() {
		axios.post("/sendFormData", this.state);
	}

	autocompleteHandler(locationObj) {
		this.setState({
			address: locationObj[0].formatted_address
		});
	}
	handlePhoto(photos) {
	   	this.setState({
			photoUrl:photos[0].preview
		});
	  }

	render() {
		return (
			<div
				className="form formDonate"
				style={{
					backgroundColor: "#ECECEC",
					borderRadius: "15px",
					width: "40%"
				}}
			>
				<form style={{ marginLeft: "50px" }}>
					<FormGroup
						
						validationState={this.getValidationState()}
					>
						<ControlLabel> Restaurant</ControlLabel>{" "}
						<FormControl
							id="name"
							type="text"
							value={this.state.name}
							placeholder="Enter Name"
							onChange={e => {
								this.handleChange(e);
							}}
							style={{ marginTop: "20px" }}
						/>
						<FormControl.Feedback />
					</FormGroup>{" "}
					<GoogleSearchBox
						style={{ width: "500px" }}
						id="address"
						autocompleteHandler={this.autocompleteHandler}
					/>
					<FormGroup
						
						validationState={this.getValidationState()}
					>
						<ControlLabel> Email </ControlLabel>{" "}
						<FormControl
							id="email"
							type="text"
							value={this.state.email}
							placeholder="Enter Email"
							onChange={e => {
								this.handleChange(e);
							}}
						/>
						<FormControl.Feedback />
					</FormGroup>{" "}
					<FormGroup
						
						validationState={this.getValidationState()}
					>
						<ControlLabel> Phone Number </ControlLabel>{" "}
						<FormControl
							id="phone"
							type="text"
							value={this.state.phone}
							placeholder="Enter Phone Number"
							onChange={e => {
								this.handleChange(e);
							}}
						/>
						<FormControl.Feedback />
					</FormGroup>{" "}
					<FormGroup
						
						validationState={this.getValidationState()}
					>
						<ControlLabel> Menu Item </ControlLabel>{" "}
						<FormControl
							id="menu"
							type="text"
							value={this.state.menu}
							placeholder="Enter Meal Name"
							onChange={e => {
								this.handleChange(e);
							}}
						/>
						<FormControl.Feedback />
					</FormGroup>{" "}
					<FormGroup
						
						validationState={this.getValidationState()}
					>
						<ControlLabel> Price </ControlLabel>{" "}
						<FormControl
							id="price"
							type="text"
							value={this.state.price}
							placeholder="Enter Price"
							onChange={e => {
								this.handleChange(e);
							}}
						/>
						<FormControl.Feedback />
					</FormGroup>{" "}
					<FormGroup
						
						validationState={this.getValidationState()}
					>
						<ControlLabel> Quantity </ControlLabel>{" "}
						<FormControl
							id="quantity"
							type="text"
							value={this.state.quantity}
							placeholder="Quantity"
							onChange={e => {
								this.handleChange(e);
							}}
						/>
						<FormControl.Feedback />
					</FormGroup>
					<Dropzone
						onDrop={this.handlePhoto}
						accept="image/*"
						style={{
							width: "30%",
							height: "85px",
							borderRadius: "5px",
							border: "1px solid rgb(210, 210, 210)",
							overflow: "auto"
						}}
					>
						<p>
							<Label>Drop Your Photos or Click to Upload!</Label>
						</p>
					</Dropzone>
					<Button
						onClick={() => {
							this.sendFormData();
						}}
						style={{
							backgroundColor: "red",
							borderRadius: "7px",
							marginBottom: "20px",
							marginTop: "5px"
						}}
					>
						Submit
					</Button>
				</form>{" "}
			</div>
		);
	}
}

// {					<FormGroup
// 						
// 						validationState={this.getValidationState()}
// 					>
// 						<ControlLabel> Address </ControlLabel>{" "}
// 						<FormControl
// 							id="address"
// 							type="text"
// 							value={this.state.address}
// 							placeholder="Enter Address"
// 							onChange={e => {
// 								this.handleChange(e);
// 							}}
// 						/>
// 						<FormControl.Feedback />
// 					</FormGroup>{" "}}
