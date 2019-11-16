import React, { Component } from 'react'
import {Row,Col,Spinner} from "react-bootstrap"
import {firebase} from "../../utils/Firebase"
import { CanvasOverlay } from 'react-map-gl'

export default class Report extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             report:null
        }
    }
    componentDidMount(){
        const id = this.props.match.params.id
     firebase.database().ref('reports/'+id).once('value').then(snapshot=>{
        const data = snapshot.val()
        this.setState({report:data})
     })
     .catch(error=>{
        console.log(error)
     })   
    }
    render() {
        const {report} = this.state
        return (
            <div>
                {this.state.report?<div><Row>
                    <Col>
                    {report.type}
                    </Col>
                </Row>
                <Row>
                    <Col>
                    {report.date}
                    </Col>
                </Row></div>:<Spinner animation="grow" variant="primary" />}
            </div>
        )
    }
}
