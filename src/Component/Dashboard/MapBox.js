import React, { Component } from 'react'
import ReactMapGL,{Marker,Popup} from 'react-map-gl';
import Collision from "./subcomponent/car-collision.svg"
import {firebase} from "../../utils/Firebase"

import {Card,CardBody, CardHeader,Nav,NavItem,NavLink} from "shards-react"
import { Button } from 'react-bootstrap';
// import HeatMap from "./subcomponent/HeatMap"
// import {Nav} from "react-bo"
// import { CardHeader } from 'react-bootstrap/Card';
export default class MapBox extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            viewport: {
                width: "100%",
                height: 350,
                latitude: 12.9716,
                longitude: 77.5946,
                zoom: 13
              },
              mapView:1,
              reports:null,
              selectedPoint:null
        }
        this.coordinateClick = this.coordinateClick.bind(this)
        this.onSelect = this.onSelect.bind(this)
        this.selectPoint = this.selectPoint.bind(this)
    }
    componentDidMount(){
        let data = this.state.viewport;
        // data.latitude = this.props.longitude;
        // data.longitude = this.props.latitude;

        this.setState({viewport:data,reports:this.props.reports})
    }
    selectPoint(id){
        this.setState({selectedPoint:id})
    }
    onSelect(num){
        this.setState({mapView:num})
    }
    coordinateClick(e){
        console.log(e)
    }
    render() {
        let styleSheet=null,markers=null
        const {reports} = this.state
        if(reports){
            markers=Object.keys(reports).map(obj=>{
                console.log(reports[obj].coordinates)
              return reports[obj].coordinates?<Marker latitude={reports[obj].coordinates.latitude} longitude={reports[obj].coordinates.longitude}>
      <Button variant="danger" onClick={this.selectPoint.bind(this,obj)}>
          
      </Button>
          </Marker>:null
            })
            console.log(markers)
        }else{
            markers=null
        }
        switch(this.state.mapView){
            case 0:
                styleSheet='mapbox://mapbox.mapbox-streets-v7'
                break
            case 1:
                styleSheet='mapbox://styles/mapbox/satellite-v9'
                break;
            case 2:
                styleSheet='mapbox://styles/mapbox/dark-v9'
        }
        return (
            <div>
                <Card>
                <CardBody>
                <Nav tabs justified> 
      {/* <NavItem >
        <NavLink active={this.state.mapView===0?true:false} onClick={this.onSelect.bind(this,0)}>Normal</NavLink>
      </NavItem> */}
      <NavItem >
        <NavLink active={this.state.mapView===1?true:false} onClick={this.onSelect.bind(this,1)}>Satellite</NavLink>

      </NavItem>
      <NavItem >
        <NavLink active={this.state.mapView===2?true:false} onClick={this.onSelect.bind(this,2)}>Heat Map</NavLink>
      </NavItem>
    </Nav>

                
                 <ReactMapGL
        {...this.state.viewport}
        mapStyle={styleSheet}
        onViewportChange={(viewport) => this.setState({viewport})}
        mapboxApiAccessToken={"pk.eyJ1IjoibmFtYmlhcnNpZGhhcnRoIiwiYSI6ImNrMzA2cTZwMDBhdmgzYnFzZmJuaTRkeTgifQ.MAnlhMbC3SBJfrNJ_DOPvw"}
            onClick={this.coordinateClick}
      >
          {markers}
          {
              this.state.selectedPoint?<Popup latitude={reports[this.state.selectedPoint].coordinates.latitude} longitude={reports[this.state.selectedPoint].coordinates.longitude}>
    <p>{reports[this.state.selectedPoint].type}</p>
                  </Popup>:null
          }
        </ReactMapGL>
        {/* <HeatMap viewport={this.state.viewport} /> */}
      </CardBody>
        </Card>
            </div>
        )
    }
}
