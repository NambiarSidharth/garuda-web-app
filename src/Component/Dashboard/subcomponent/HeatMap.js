import React, { Component } from 'react'
import ReactMapGL,{Marker} from "react-map-gl"
import HeatmapOverlay from "react-map-gl-heatmap-overlay"
export default class HeatMap extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             viewport:this.props.viewport
        }
    }
    
    render() {
        return (
            <div>
                <ReactMapGL
        {...this.state.viewport}  
        mapStyle='mapbox://styles/mapbox/dark-v9'
        // onViewportChange={(viewport) => this.setState({viewport})}
        // mapboxApiAccessToken={"pk.eyJ1IjoibmFtYmlhcnNpZGhhcnRoIiwiYSI6ImNrMzA2cTZwMDBhdmgzYnFzZmJuaTRkeTgifQ.MAnlhMbC3SBJfrNJ_DOPvw"}
        //     onClick={this.coordinateClick}
      >
                  <HeatmapOverlay locations={[{latitude: 37.7577,
                longitude: -122.4376}]} {...this.state.viewport}/>

        </ReactMapGL>
            </div>
        )
    }
}
