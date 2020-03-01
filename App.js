import React from 'react'
import PropTypes from 'prop-types'
import Constants from 'expo-constants'
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import AppNavigator from './navigation/AppNavigator'
import reducer from './reducers/index'
import { purple } from './utils/colors'
import { setLocalNotification } from './utils/helpers'

const store = createStore(reducer, applyMiddleware(thunk, logger));

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}
UdaciStatusBar.propTypes = {
  backgroundColor: PropTypes.string.isRequired
};

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={store}>
        <UdaciStatusBar backgroundColor='black' barStyle='light-content' />
        <SafeAreaView style={styles.container}>
          <AppNavigator />
        </SafeAreaView>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    color: purple,
    flex: 1,
  },
});
