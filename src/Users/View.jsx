import React, { useReducer } from 'react'
import axios from 'axios'
import UserTable from './UserTable'
import {withRouter} from 'react-router-dom'

class View extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }

    componentDidMount(){
        
        axios.get('http://localhost:5000/users/').then(res=>{
            this.setState({
                data:res.data
            })
        }).catch((error)=>{
            console.log(error);
        })
    }

    fillTable=()=>{
        return this.state.data.map((userData,index)=>(
            <UserTable userData={userData} key={index} />
        ))
    }

    render() {

        if (this.state.data === null) {
            return <h1>No records found</h1>
        }

        return (
           <div className="container">
                <div className="table-responsive" style={{marginTop:'10px'}}>
                <table id="data-tables" className="table table-striped"  >
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Email</th>
                            <th scope="col">Mobile No</th>
                            <th scope="col">Category</th>
                            <th scope="col">Technology</th>
                            <th scope="col">Profile Pic</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.fillTable()}
                    </tbody>
                </table>
            </div>
           </div>
        )
    }
}

export default withRouter(View)
