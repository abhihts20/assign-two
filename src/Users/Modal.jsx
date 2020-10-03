import React from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

class Modal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            gender: this.props.gender,
            email: this.props.email,
            mobile: this.props.mobile,
            category: this.props.category,
            profilePic: this.props.profilePic,
            languages: this.props.languages,
            openModal:this.props.openModal
        }
    }

    saveData = () => {
        // let users = localStorage.getItem("usersData");
        // if (users) {
        //     users = JSON.parse(users);
        //     localStorage.setItem("usersData", JSON.stringify([...users, this.state]));
        // } else {
        //     localStorage.setItem("usersData", JSON.stringify([this.state]));
        // }
    
        const userObject={
            name: this.props.name,
            gender: this.props.gender,
            email: this.props.email,
            mobile: this.props.mobile,
            category: this.props.category,
            technology: this.props.languages,
            profilePic: this.props.profilePic
        }

        axios.post('http://localhost:5000/users/create-user',userObject).then(res=>console.log(res));
        if(this.state.profilePic){
            console.log("IMAGE HAI",this.props.imageData);
            const data=new FormData()
            data.append("image",this.props.imageData,this.props.imageData.name)
            axios.post('http://localhost:5000/upload',data)
        }
        this.setState({openModal:!this.state.openModal})

        // this.props.history.push('/users/view')
        window.location.reload(true)

    };
    render() {
        return (
            <div>
            {this.state.openModal&&(<div className="modal-wrapper"  id="exampleModal" tabIndex="-1" role="dialog"
                     aria-labelledby="modalLabel">
                    <div className="modal-dialog modal-container" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="modalLabel">User Data</h5>
                            </div>
                            <div className="modal-body">
                                    <p>Name: {this.state.name}</p>
                                    <p>Gender: {this.state.gender}</p>
                                    <p>Email: {this.state.email}</p>
                                    <p>Mobile: {this.state.mobile}</p>
                                    <p>Category: {this.state.category}</p>
                                <p>Technology:</p>
                                <ol>
                                    {this.state.languages.map((element, index) => (
                                        <li key={index}>{element}</li>
                                    ))}
                                </ol>
                                <img style={{height: "100px", width: "100px"}} src={this.state.profilePic}
                                     alt="profile pic"/>

                            </div>
                            <div className="modal-footer">
                                <button type="button" id="close-btn" className="btn btn-secondary" data-dismiss="modal-container" onClick={()=>{this.setState({openModal:!this.state.openModal})}}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={() => {
                                    this.saveData();
                                }}>Save changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
)}   
               
            </div>
        )
    }
}

export default withRouter(Modal)
