import React, { Component } from 'react'
import {Row,Col,Badge,Spinner} from "react-bootstrap"
import {CardSubtitle} from "shards-react"
import CanvasJSReact from '../Dashboard/canvasjs/canvasjs.react'
import Axios from 'axios'

export default class Stats extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             percent:null
        }
    }
    componentDidMount(){
        Axios.get("http://127.0.0.1:5000/basicAnalysis")
        .then(obj=>{
            this.setState({percent:obj.data})
        })
        .catch(err=>{
            console.log(err)
        })        
    }
    render() {
        var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
let options
if(this.state.percent){
    const dataSet = Object.keys(this.state.percent).map((obj)=>{
        return {name:obj,y:this.state.percent[obj]}
    })
    options = {
        animationEnabled: true,
        title: {
            text: "Stats"
        },
        subtitles: [{
            text: "Causes",
            verticalAlign: "center",
            fontSize: 24,
            dockInsidePlotArea: true
        }],
        data: [{
            type: "doughnut",
            showInLegend: true,
            indexLabel: "{name}: {y}",
            yValueFormatString: "#,###'%'",
            dataPoints: dataSet
        }]
    }
}else{
    
    console.log('worked')
}
        return (
            <div>
                <div>
{this.state.percent?<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>:null}
                </div>
            </div>
        )
    }
}
