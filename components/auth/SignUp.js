import React, {Component} from 'react';
import {Link} from 'react-router';
import { fire } from '../../firebase';

class SignUp extends Component{
	constructor(props){
		super(props);
		this.state = {
			email:'',
			password:'',
			error:''
		}
	}

	signUp(){
		console.log(this.state);
		const {email,password} = this.state;
		console.log(email);
		fire.auth().createUserWithEmailAndPassword(email,password)
		.catch(error=>{
			console.log("error message",error.message);
			this.setState({error:error.message});
		})
	}

	render(){
		return(
			<div>
				<h2>SignUp</h2>
				<div>
					<input type="text" placeholder="username" onChange={event=>this.setState({email:event.target.value})}/>
					<input type="password" placeholder="password" onChange={event=>this.setState({password:event.target.value})}/>
					<button type="button" onClick={()=>this.signUp()}>SignUp</button>
				</div>
				<div>{this.state.error}</div>
				<div><Link to={'/signin'}>Sign In instead</Link></div>
			</div>
		);
	}
}
export default SignUp;