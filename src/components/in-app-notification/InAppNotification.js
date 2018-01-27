import React, { Component } from 'react';
import { Animated, SafeAreaView, View, Text, TouchableHighlight } from 'react-native';
import Notification from './Notification';
import DefaultBody from './DefaultBody.js';

export default class InAppNotification extends Component {

  render() {
    return (
      <SafeAreaView style={{
      }}>
        <Notification 
          height={150}
          notificationBodyComponent={DefaultBody}
          ref={(ref) => { this.notification = ref; }} />
      </SafeAreaView>
    )
  }
}