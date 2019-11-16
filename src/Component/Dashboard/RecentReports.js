import React, { Component } from 'react'
import {Row,Col,Spinner, Card}from "react-bootstrap"
import {firebase} from "../../utils/Firebase"
import {Link} from "react-router-dom"
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
            return   <Link to={`/reports/${key}`}><li className="list-group-item mv2">{this.state.reports[key].type}</li></Link>
 
                // <Card style={{ maxWidth: "200px" }} className="dim mv3" >
                //     <Card.Body>
                //         {this.state.reports[key].type}
                //     </Card.Body>
                //     {/* <Card.Footer>
                //     <Link to={`/reports/${key}`} className="btn btn-primary">Analyze</Link>
                //     </Card.Footer> */}
                //     </Card>
            })
        }else{
            view = <Spinner animation="grow" variant="primary" />
        }
        return (
            <div className="mt4">
                       <div>
                           <h4>Recent Reports</h4>
                        </div>
                        <hr />
                       <div>
                       <ul class="list-group">
  {view}
</ul>
                        </div>
                
            </div>
        )
    }
}
