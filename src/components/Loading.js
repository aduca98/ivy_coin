import React from 'react';
import {
    StyleSheet,
    ActivityIndicator,
    View
} from 'react-native';

export default class Loading extends React.Component {
    render() {
        return (
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#fff" />
            </View>);
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#071B38',
    opacity: 1
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})
