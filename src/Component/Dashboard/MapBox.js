import React, { Component } from 'react'
import ReactMapGL from 'react-map-gl';
import {Card,CardBody, CardHeader,Nav,NavItem,NavLink} from "shards-react"
// import {Nav} from "react-bo"
// import { CardHeader } from 'react-bootstrap/Card';
export default class MapBox extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            viewport: {
                width: 345,
                height: 250,
                latitude: 37.7577,
                longitude: -122.4376,
                zoom: 13
              },
              mapView:1
        }
        this.coordinateClick = this.coordinateClick.bind(this)
        this.onSelect = this.onSelect.bind(this)
    }
    componentDidMount(){
        let data = this.state.viewport;
        data.latitude = this.props.latitude;
        data.longitude = this.props.longitude;
        this.setState({viewport:data})
    }
    onSelect(num){
        this.setState({mapView:num})
    }
    coordinateClick(e){
        console.log(e)
    }
    render() {
        let styleSheet=null
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
      />
      </CardBody>
        </Card>
            </div>
        )
    }
}
