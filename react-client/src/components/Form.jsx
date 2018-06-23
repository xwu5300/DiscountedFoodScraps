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
import ReactFilestack from "filestack-react";

const basicOptions = {
	fromSources: ["local_file_system"],
	maxFiles: 1
};

export default class Form extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.handleChange = this.handleChange.bind(this);
		this.sendFormData = this.sendFormData.bind(this);
		this.autocompleteHandler = this.autocompleteHandler.bind(this);
		this.handlePhoto = this.handlePhoto.bind(this);
		this.success = this.success.bind(this);

		this.state = {
			name: "",
			address: "",
			email: "",
			phone: "",
			menu: "",
			price: "",
			quantity: "",
			photoUrl: null,
			fileName: ""
		};
	}

	success(result) {

		this.setState({
			photoUrl: result.filesUploaded[0].url
		});

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
		console.log(photos);
		this.state.photoUrl = photos[0].preview;
		console.log(this.state);
	}

	render() {
		console.log(this.state)
		let photos;
		if (this.state.photoUrl !== null) {
			photos = this.state.photoUrl.map(file => <p>{file.name}</p>);
		}
		return (
			<div
				className="form formDonate"
				style={{
					backgroundColor: "#ECECEC",
					borderRadius: "15px",
					width: "40%",
				}}
			>
				<form style={{ marginLeft: "50px", marginRight: "50px" }}>
					<FormGroup validationState={this.getValidationState()}>
						<ControlLabel style={{ marginTop: "20px" }}>
							{" "}
							Restaurant
						</ControlLabel>{" "}
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
					<FormGroup validationState={this.getValidationState()}>
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
					<FormGroup validationState={this.getValidationState()}>
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
					<FormGroup validationState={this.getValidationState()}>
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
					<FormGroup validationState={this.getValidationState()}>
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
					<FormGroup validationState={this.getValidationState()}>
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
					<ReactFilestack
						apikey={"A0lqArjXlRiOwVn8p9lRHz"}
						onSuccess={this.success}
						onError={() => {}}
						render={({ onPick }) =>
							!this.props.photo ? (
								<div
									className="user_resume_container"
									style={{}}
								>
									<h2>
										{" "}
										<b>Photos</b>{" "}
									</h2>
									<div className="resume_div">
										<a
											href={this.props.resume_url}
											target="_blank"
										>
											{this.props.resume_name}
										</a>
									</div>
									<div className="resume_btns">
										<button
											onClick={onPick}
											className="ui orange button"
										>
											Choose File
										</button>
										<button
											className="ui red button"
											onClick={() => {}}
										>
											Remove
										</button>
									</div>
								</div>
							) : (
								<div>
									<button
										onClick={onPick}
										className="ui orange inverted button"
										style={{
											display: "block",
											margin: "auto"
										}}
									>
										Upload Photo
									</button>
									<div className="photo_div">
										{this.state.fileName}
									</div>
								</div>
							)
						}
					/>
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


				</form>
								{this.state.photoUrl? <img src={`${this.state.photoUrl}`}r/> : <div></div>}
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
