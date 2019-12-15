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
  ActivityIndicator,
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

class Home extends React.Component{
  constructor(){
    super();
    this.state={
      url:'https://dmc-me.custhelp.com/app/subdelar/login',
      loading:false
    }
  }

  async componentWillMount(){
    url = await this._getURL();
    console.log("first LINK: " + url)
    this.props.dispatch(
      {
        type:"CHANGE_URL",
        payload: url
      }
    )
  }

  async _getURL(){
    return await AsyncStorage.getItem('url_CRM');
  }

  render(){
    const {url} = this.props.url;
    console.log("url now is : " +  url);

    return(
      <View style={{flex:1}}>
        <WebView
          originWhitelist={['*']}
          //source={{ uri: url!=null?url:"https://dmc-me.custhelp.com/app/subdelar/login"}}
          source={{ uri: url?url:"https://dmc-me.custhelp.com/app/subdelar/login"}}
          renderLoading={()=>(<View style={{flex:1, justifyContent:'center', alignItems:'center'}}><ActivityIndicator /></View>)}
          onLoadStart={()=>this.setState({loading:true})}
          onLoadEnd={()=>this.setState({loading:false})}
          renderError={()=>(<View style={{flex:1, justifyContent:'center', alignItems:'center'}}><Text style={{color:'red', fontSize:width*0.05, fontWeight:'bold'}}> URL isn't valid </Text></View>)}
        />{this.state.loading&&<View style={{height:height, width:width, position:'absolute', justifyContent:'center', alignItems:'center'}}><ActivityIndicator /></View>}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  url: state.url,
});

export default connect(mapStateToProps)(Home)
