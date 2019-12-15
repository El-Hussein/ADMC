import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Dimensions,
} from 'react-native';
import { createStore, combineReducers } from 'redux';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { WebView } from 'react-native-webview';
import { createDrawerNavigator,  } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation'
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {changeURL} from './App';
const {width, height} = Dimensions.get("window");

class Content extends React.Component{
    constructor(){
      super();
      this.state={
        url:'',
      }
    }
  
    async _saveURL(){
      console.log("save url " + this.state.url)
      if(this.state.url == '' ) {
        alert("url shoudln't be empty.");
        return;
      }
      this.props.dispatch(
        {
          type:"CHANGE_URL",
          payload: this.state.url
        }
      )
      await AsyncStorage.setItem('url_CRM', this.state.url);
    }
  
    render(){
      return(
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <TextInput
          placeholder="Type your website url..."
          onChangeText={(url)=>this.setState({url})}
          value={this.state.url}
          style={{width:width*0.8, height:height*0.06, borderRadius:20,}}
        />
        <TouchableOpacity style={{justifyContent:'center', alignItems:'center', width:width*0.30, backgroundColor:'green', height:width*0.08,  margin:width*0.05, borderRadius:width*0.03, elevation:4}} onPress={()=>this._saveURL()}>
          <Text style={{color:'white', textAlign:'center', textAlignVertical:'center', fontSize:width*0.045}}> 
            SAVE URL
          </Text>
        </TouchableOpacity>
      </View>
      )
    }
}

const mapStateToProps = state => ({
url: state.url,
});

  
export default  connect(mapStateToProps)(Content)