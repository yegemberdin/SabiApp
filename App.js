import React from 'react';
import {createBottomTabNavigator, createSwitchNavigator} from 'react-navigation';
import {AddScreen, Video,EventsScreen, Profile, Login} from './components/screens/index'


const Tabs = createBottomTabNavigator({
  profile: Profile,
  gallery:EventsScreen,  
  add:AddScreen,
  video:Video,
});


const MainStack = createSwitchNavigator({
  intro: Login,
  main: Tabs


})
export default class App extends React.Component {  
  render() {    
    return  <MainStack/>;
      
    
  }
}
