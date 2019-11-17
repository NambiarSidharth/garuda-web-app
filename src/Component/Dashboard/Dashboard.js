import React, { Component } from 'react'
import Notifications from "../Common/Nofications"
import Weather from "./Weather"
import {Row,Col, Spinner, Badge,Card} from "react-bootstrap"
import Map from 'pigeon-maps'
import Marker from 'pigeon-marker'
import Overlay from 'pigeon-overlay'
import MapBox from "./MapBox"
import Graph from "./Graph"
import RecentReports from "./RecentReports"
import {firebase} from "../../utils/Firebase"
import { CardSubtitle } from 'shards-react'
import Axios from 'axios'
// import { CardBody } from 'react-bootstrap/Card'

// import Box from '@material-ui/core/Box';

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            latitude:null,
            longitude:null,
            chosenlatitude:null,
            chosenlongitutde:null,
            reports:null,
            percent:null,
            months:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
            selectedMonth:'Jan',
            selectedReason:"1"
            // data:null
       }
       this.mapChangeEvent = this.mapChangeEvent.bind(this)
       this.getReports = this.getReports.bind(this)
       this.getConfidence = this.getConfidence.bind(this)
       this.onChange = this.onChange.bind(this)
    }

    componentDidMount(){
        const location = window.navigator && window.navigator.geolocation
        
        if (location) {
          location.getCurrentPosition((position) => {
              console.log('check 1')
            this.setState({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            })
            // resolve(true)
          }, (error) => {
            this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' })
            // reject(false)
          })
        }
        this.getReports()
        // this.getConfidence()

        // this.getPercent()
    }
    getConfidence(e){
        e.preventDefault()
        Axios.post("http://127.0.0.1:5000/highest",{
            mon:this.state.selectedMonth,
            limit:this.state.selectedReason
        })
        .then(obj=>{
            console.log(obj)
            this.setState({highest:obj.data.result})
        })
        .catch(err=>{
            console.log(err)
            console.log(err)
        })
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }
    getPercent(){
        Axios.get("http://127.0.0.1:5000/basicAnalysis")
        .then(obj=>{
            this.setState({percent:obj.data})
        })
        .catch(err=>{
            console.log(err)
        })
    }
    getReports(){
        firebase.database().ref('reports').once('value').then(snapshot=>{
            const data = snapshot.val()
            console.log(data)
            this.setState({reports:data})
        })
        .catch(err=>{
            console.log(err)
        })
    }
    mapChangeEvent(e){
        this.setState({
            chosenlatitude:e.latLng[0],
            chosenlongitude:e.latLng[1]
        })
    }
    render() {
        return (
            <div>
                
                {this.state.latitude?<div>
                <Row>
                    <Col md={9}>
<Row className="mv3">
                                <Col>
                                <Weather />
                                </Col>
                            </Row>
                            <Row className="mv3">
                            <Col>
{    this.state.latitude && this.state.reports?<MapBox reports={this.state.reports} latitude={this.state.latitude} longitude={this.state.longitude} />
:<Spinner animation="grow" variant="primary" />}
                    </Col>
                            </Row>
                            <Row className="mv3">
                            <Graph />
                            </Row>

                    </Col>
                        <Col md={3}>
                            <div>
                                <Row>
                                    <Col>
                                    <Card>
                                        <Card.Header>
                                            Prediction
                                        </Card.Header>
                                        <Card.Body>
                                    <form onSubmit={this.getConfidence}> 
                                        <div className="form-group">
                                            <p>Select Month</p>
                                            <select name="selectedMonth" onChange={this.onChange} className="form-control">
                                                {   this.state.months.map(obj=>{
                                                    return   <option value={obj}>{obj}</option>

                                                })
                                                }
                                            </select>
                                        </div>
                                        <div className="form-group">
                                        <p>Number of factors</p>

                                        <select name="selectedReason" onChange={this.onChange} className="form-control">
                                        {/* <option value={0}>{0}</option> */}
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </div>
                                    </form>
                                    </Card.Body>
                                    </Card>
                                    </Col>
                                </Row>
                        <Row>
                    <Col>
                                            {this.state.highest?<div><Badge variant="danger" className="mv4">Probability : {this.state.highest[0]*100}%</Badge><Card className="mv2"> 
                        <Card.Header>Factors</Card.Header>
                        <Card.Body>
                            <ul className="list-group">
                                {
                                   this.state.highest[1].map((obj)=>{
                                   return <li className="mv1 list-group-item">{obj}</li>
                                   }) 
                                }
                            </ul>
                        </Card.Body>
                    
                    </Card></div>:<Spinner animation="grow" variant="primary" />}
                    </Col>
                </Row>

                            </div>
                        </Col>
                </Row>
                <Row>
                    <Col>
                    </Col>
                </Row>
                </div>:<div>  <Spinner animation="grow" variant="primary" /></div>
}
            </div>
        )
    }
}
