import React, {Component} from 'react';
import {Link} from 'react-router';
import { fire } from '../../firebase';

class SignIn extends Component{
	constructor(props){
		super(props);
		this.state = {
			email:'',
			password:'',
			error:''
		}
	}

	signIn(){
		console.log(this.state);
		const {email,password} = this.state;
		console.log(email);
		fire.auth().signInWithEmailAndPassword(email,password)
		.catch(error=>{
			console.log("error message",error.message);
			this.setState({error:error.message});
		})
	}

	render(){
		return(
			<div>
				<h2>SignIn</h2>
				<div>
					<input type="text" placeholder="username" onChange={event=>this.setState({email:event.target.value})}/>
					<input type="password" placeholder="password" onChange={event=>this.setState({password:event.target.value})}/>
					<button type="button" onClick={()=>this.signIn()}>SignIn</button>
				</div>
				<div>{this.state.error}</div>
				<div><Link to={'/signup'}>Sign Up instead</Link></div>
			</div>
		);
	}
}
export default SignIn;