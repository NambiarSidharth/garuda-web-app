import React, { Component } from 'react'
import {Row,Col,Spinner} from "react-bootstrap"
import {Card,CardBody} from 'shards-react'
import {firebase} from "../../utils/Firebase"

export default class Reports extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reports:null
        }
        this.getAllData = this.getAllData.bind(this)
    } 
    componentDidMount(){
        this.getAllData()
    }   

    getAllData(){
        firebase.database().ref('reports').once('value').then(snapshot=>{
            const data = snapshot.val()
            this.setState({reports:data})
        })
        .catch(err=>{
            console.log(err)
        })
    }
    render() {
        const {reports} = this.state
        let view;
        if(reports){
            view = Object.keys(reports).map((key,i)=>{
                return <Card className="ma3" style={{maxWidth:"200px"}}>
                    <CardBody>
                        {reports[key].type}
                    </CardBody>
                    </Card>
            })
        }else{
            view=<Spinner animation="grow" variant="primary" /> 
    }
        return (
            <div>
                <Row>
                    <Col md={2}>
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col>
                                    filter options
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={10}>
                {view}
                    </Col>
                </Row>
            </div>
        )
    }
}
