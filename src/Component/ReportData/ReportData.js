import React, { Component } from 'react'
import axios from "axios"
import {Row,Col} from "react-bootstrap"
import LinkPreview from 'link-preview-js';
// import ScrollAnimation from 'react-animate-on-scroll';

export default class ReportData extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             data:null
        }
    }
    componentDidMount(){
        axios.post("http://127.0.0.1:5000/reportData")
        .then(obj=>{
            console.log(obj)
            this.setState({data:obj.data})
        })
        .catch(err=>{
            console.log(err)
            console.log(err)
        })
    }    
    render() {
        const {data} = this.state;
        let view;
        if(data){
            LinkPreview.getPreview(data['Traffic conditions'])
  .then(data => console.debug(data))
  .catch(err=>{
      console.log(err)
  })
            view=<div>
                <Row>
                    <Col>
                        {data.location}                    
                    </Col>
                </Row>
                <Row>
                    <Col>

                    </Col>
                    <Col>

                    </Col>
                </Row>
                </div>
        }else{
            view=null
        }
        return (
            <div>
                
            </div>
        )
    }
}
