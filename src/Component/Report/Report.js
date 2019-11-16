import React, { Component } from 'react'
import {Row,Col,Spinner, Button} from "react-bootstrap"
import {firebase} from "../../utils/Firebase"
import { CanvasOverlay } from 'react-map-gl'
import Collision from "../Dashboard/subcomponent/car-collision.svg"
// import Map from 'pigeon-maps'
// import Marker from 'pigeon-marker'
// import Overlay from 'pigeon-overlay'
import ReactMapGL,{Marker} from 'react-map-gl';


export default class Report extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             report:null,
             viewport: {
                width: "100%",
                height: 350,
                latitude: 50.874,
                longitude: 4.6947,
                zoom: 13
              }
        }
    }
    componentDidMount(){
        const id = this.props.match.params.id
        let viewp = this.state.viewport
     firebase.database().ref('reports/'+id).once('value').then(snapshot=>{
        const data = snapshot.val()
        // viewp.latitude = data.coordinates.latitude
        // viewp.longitude = data.coordinates.longitude
        this.setState({report:data,viewport:viewp})
     })
     .catch(error=>{
        console.log(error)
     })   
    }
    render() {
        const {report} = this.state
        console.log(report)
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
                    <Row>
                    <Col>
                    <ReactMapGL
        {...this.state.viewport}
        // mapStyle={styleSheet}
        onViewportChange={(viewport) => this.setState({viewport})}
        mapboxApiAccessToken={"pk.eyJ1IjoibmFtYmlhcnNpZGhhcnRoIiwiYSI6ImNrMzA2cTZwMDBhdmgzYnFzZmJuaTRkeTgifQ.MAnlhMbC3SBJfrNJ_DOPvw"}
        onClick={this.coordinateClick}

      >
    <Marker latitude={50.874} longitude={4.6947}>
    <Button variant="danger">
        AA
    </Button>
        </Marker>
        </ReactMapGL>
                   {/* { this.state.report?<Map center={[this.state.report.coordinates.latitude, this.state.report.coordinates.longitude]} zoom={12} width={600} height={400}>
    <Marker anchor={[this.state.report.coordinates.latitude, this.state.report.coordinates.longitude]} payload={1} onClick={({ event, anchor, payload }) => {}} />

    {/* <Overlay anchor={[this.state.report.coordinates.latitude, this.state.report.coordinates.longitude]} offset={[120, 79]}>
      <img src={Collision} width={240} height={158} alt='some' />
    </Overlay> */}
 {/*</Col> </Map>:null} 
 */}
 {/* <Map center={[this., 4.6997]} zoom={12} width={600} height={400}>
    <Marker anchor={[50.874, 4.6947]} payload={1} onClick={({ event, anchor, payload }) => {}} />
  </Map> */}
                    </Col>
                </Row>
                    </Col>
                </Row>
                
                </div>:<Spinner animation="grow" variant="primary" />}
            </div>
        )
    }
}
