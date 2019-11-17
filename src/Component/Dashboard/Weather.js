import React, { Component } from 'react'
import {connect} from "react-redux"
import axios from "axios";
// import ReactWeather from 'react-open-weather';
import {Alert,Row,Col, Card,Spinner} from "react-bootstrap"
import ReactAnimatedWeather from "react-animated-weather"
import Thermometer from "react-thermometer-chart"

class Weather extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             latitude:null,
             longitude:null,
             data:null
        }
        // this.weatherdata = this.weatherdata.bind(this)
    }
    
    componentDidMount(){
        this.getMyLocation().then(obj=>{
            console.log('working part')
            this.weatherdata.bind(this)
            axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${this.state.latitude}&lon=${this.state.longitude}&appid=c7e278dc5be734579a5ec0820cd64d7c&units=metric`)
            .then(res=>{
                console.log(res)
                this.setState({data:res.data})
            })
            .catch(err=>{
                console.log(err)
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }
    weatherdata(){
        
    }
    getMyLocation() {
        return new Promise((resolve,reject)=>{
            const location = window.navigator && window.navigator.geolocation
        
        if (location) {
          location.getCurrentPosition((position) => {
              console.log('check 1')
            this.setState({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            })
            resolve(true)
          }, (error) => {
            this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' })
            reject(false)
          })
        }
        })
    }
    render() {
        const {data,latitude,longitude} = this.state;
        return (
            <div className="mt">
               {data?<div className="container">
                   <Card>
                       <div className="ma2">
               <Row >
                <Col>
                <div style={{borderColor:"#daa520",borderStyle:'solid',borderWidth:data.weather[0].main==='Clear'?3:0,borderRadius:5,paddingTop:6,paddingBottom:6}}>
                <ReactAnimatedWeather icon='CLEAR_DAY' color={data.weather[0].main==='Clear'?'goldenrod':'gray'} size={27} animate={true}  />
                 </div>
                 </Col>
                 <Col>
                 <div style={{borderColor:"#daa520",borderStyle:'solid',borderWidth:data.weather[0].main==='Clouds'?3:0,borderRadius:5,paddingTop:6,paddingBottom:6}}>
                 <ReactAnimatedWeather icon='CLOUDY' color={data.weather[0].main==='Clouds'?'goldenrod':'gray'} size={27} animate={true} />
                 </div>
                 </Col>
                 <Col>
                 <ReactAnimatedWeather icon='RAIN' color={data.weather[0].main==='Rainy'?'goldenrod':'gray'} size={27} animate={true} />
                 </Col>
                </Row>
                   <Row className="mt1">
                       <Col>
                      <h5 style={{color:"#007BFF"}}>weather : {data.weather[0].main}</h5>
                       </Col>
                    </Row>
                    <Row className="mt1"> 
            <Col>
            <h6>Current Temperature : {data.main.temp} &#8451;</h6>
            </Col>
            </Row> 
            </div>
            </Card>
               </div>:<Spinner animation="grow" variant="primary" />}
            </div>
        )
    }
}
const mapStateToProps = (state)=>({
    auth:state.auth
})
export default connect()(Weather)