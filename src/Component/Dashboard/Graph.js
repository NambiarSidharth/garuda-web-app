import React, { Component } from 'react'
import faults from "./graphs/faults.gif"
import CanvasJSReact from './canvasjs/canvasjs.react'
import {Row,Col,Card} from "react-bootstrap"
import A from "./graphs/A.png"
import B from "./graphs/B.png"
import C from "./graphs/C.png"

import Ct from "./graphs/Casualty_type_vs_Seatbelt.png"
import HP from "./graphs/Helmet_vs Passenger_pos.png"
import IS from "./graphs/Injury_vs_Seatbelt.png"
import PA from "./graphs/Padestrian_loc_vs_Padestrian_action.png"

export default class Graph extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
			graph:"0"
		}
		this.onChange = this.onChange.bind(this)
    }
    
    addSymbols(e){
		var suffixes = ["", "K", "M", "B"];
		var CanvasJS=CanvasJSReact.CanvasJS
		var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
		if(order > suffixes.length - 1)
			order = suffixes.length - 1;
		var suffix = suffixes[order];
		return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
	}
	onChange(e){
		console.log(e.target.name,e.target.value)
		this.setState({[e.target.name]:e.target.value})
	}
    render() {
		let graphView;
        var CanvasJSChart=CanvasJSReact.CanvasJSChart
        const options = {
			animationEnabled: true,
			width:400,
			height:400,
			title: {
				text: "Accident Causes"
			},
			subtitles: [{
				text: "71% Positive",
				verticalAlign: "center",
				fontSize: 24,
				dockInsidePlotArea: true
			}],
			data: [{
				type: "doughnut",
				showInLegend: true,
				indexLabel: "{name}: {y}",
				yValueFormatString: "#,###'%'",
				dataPoints: [
					{ name: "Driver's Fault", y: 84.43},
					{ name: "Cyclist's Fault", y: 0.91 },
					{ name: "Vehicle's Condition", y: 2.05 },
					{ name: "Road Condition", y: 1.86 },
					{ name: "Passenger's Fault", y: 1.50 },
					{ name: "Weather Condition", y: 1.33 },
					{ name: "Poor Light", y: 0.94 },
					{ name: "Stray Animals", y: 0.42 },
					{ name: "Others", y: 6.56 }

				]
			}]
		}
		console.log(typeof this.state.graph)
		return (
		<div>
			{/* <Row>
				<Col>
			<CanvasJSChart options = {options}
				onRef={ref => this.chart = ref} 
			/>
				</Col>
			</Row> */}
			 {/* You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods  */}
		{/* <Row>
			<Col>
			<select onChange={this.onChange} name="graph">
				<option value="0">Accidents Occured vs Time</option>
				<option value="1">Frequency of Accidents vs Types of Injury</option>
				<option value="2">Heat Map Accident- Driver Parameters</option>
			</select>
			</Col>
		</Row> */}
		<Row className="mv2">
		<Col>
		<Card>
			<Card.Body>
			<img src={A} alt="graph" />
			</Card.Body>
		</Card>
		</Col>
		<Col>
		<Card>
			<Card.Body>
			<img src={C} alt="graph" />
			</Card.Body>
		</Card>
		</Col>
		</Row>
		<Row className="mv2">
			<Col>
			<Card>
			<Card.Body>
			<img src={HP} alt="graph" />
			</Card.Body>
			</Card>
			</Col>
			<Col>
			<Card>
				<Card.Body>
			<img src={IS} alt="graph" />
			</Card.Body>
			</Card>
			</Col>
		</Row>
		<Row className="mv2">
		<Col>
		<Card>
			<Card.Body>
			<img src={Ct} alt="graph" />
			</Card.Body>
		</Card>
		</Col>
		<Col>
		<Card>
			<Card.Body>
			<img src={PA} alt="graph" />
			</Card.Body>
		</Card>
		</Col>
		</Row>
7		</div>
		);
	}
	
}