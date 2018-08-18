import React, {Component} from 'react';
import { fire } from '../../firebase';

class Home extends Component{
	signOut(){
		fire.auth().signOut().then(function() {
		  	console.log('Sign-out successful');
		}).catch(function(error) {
		  	console.log('An error happened');
		});
	}
	render(){
		return(
			<div>
				<h2>App</h2>
				<button type="button" onClick={()=>this.signOut()}>Sign Out</button>
			</div>
		);
	}
}

export default Home;