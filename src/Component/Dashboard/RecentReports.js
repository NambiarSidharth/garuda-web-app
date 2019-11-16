import React, { Component } from 'react'
import {Row,Col,Spinner, Card}from "react-bootstrap"
import {firebase} from "../../utils/Firebase"

export default class RecentReports extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             reports:null
        }
    }
    componentDidMount(){
        var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        firebase.database().ref('reports').orderByChild('date').equalTo(date).once('value').then(snapshot=>{
            const data = snapshot.val()
            console.log(data)
            this.setState({
                reports:data
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }
    render() {
        let view;
        if(this.state.reports){
            view = Object.keys(this.state.reports).map((key,i)=>{
                return  <Col><Card style={{ maxWidth: "200px" }} >
                    <Card.Body>
                        reports
                    </Card.Body>
                    </Card></Col>
            })
        }else{
            view = <Spinner animation="grow" variant="primary" />
        }
        return (
            <div className="mt4">
                <Row>
                        {view}
                </Row>
            </div>
        )
    }
}
