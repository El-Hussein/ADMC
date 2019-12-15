/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Provider } from 'react-redux'
import { combineReducers } from 'redux'
import { createStore } from 'redux'
import Home from './Home'
import Content from './Content'
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
const MyDrawerNavigator = createDrawerNavigator({
  Home: Home
},{
  contentComponent : (props)=> <Content {...props}/>,
  drawerWidth:"85%"
});

const AppDrawer = createAppContainer(MyDrawerNavigator);


const initialState = {
  url: ''
};

function saveURL(state = initialState, action = {}) {
  switch (action.type) {
    case "CHANGE_URL":
      return {
        ...state,
        url: action.payload
      };
    default:
      return state;
  }
}
rootReducer = combineReducers({
  url: saveURL,
})
const store = createStore(rootReducer)
const App = () => {
  return (
    <Provider store={store}>
      <AppDrawer />
    </Provider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
