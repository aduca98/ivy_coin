import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StatusBar, View, Text, Image, Vibration } from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import autobind  from 'autobind-decorator';

const styles = {
  root: {
    flex: 1,
    backgroundColor: '#19345B',
    top: -150,
  },
  container: {
    position: 'absolute',
    top: 85,
    bottom: 0,
    left: 0,
    right: 0,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  iconApp: {
    marginTop: 10,
    marginLeft: 20,
    resizeMode: 'contain',
    width: 24,
    height: 24,
    borderRadius: 5,
  },
  icon: {
    marginTop: 10,
    marginLeft: 10,
    resizeMode: 'contain',
    width: 48,
    height: 48,
  },
  textContainer: {
    alignSelf: 'center',
    marginLeft: 20,
  },
  title: {
    color: '#FFF',
    fontWeight: 'bold',
    fontFamily: 'Avenir'
  },
  message: {
    color: '#FFF',
    marginTop: 5,
    fontFamily: 'Avenir'
  },
  footer: {
    backgroundColor: '#696969',
    borderRadius: 5,
    alignSelf: 'center',
    height: 5,
    width: 35,
    margin: 5,
  },
};

class DefaultNotificationBody extends React.Component {

    @autobind
    onSwipe() {
        console.log("swipe");
        this.props.onClose();
    }

    render() {
        const {
        title,
        message,
        onPress,
        onClose,
        } = this.props;
        // console.log(onClose);

        return (
        <View style={styles.root}>
            <GestureRecognizer onSwipe={this.onSwipe} style={styles.container}>
            <TouchableOpacity
                style={styles.content}
                activeOpacity={0.3}
                underlayColor="transparent"
                onPress={() => {
                    console.log("pressed")
                    this.props.onClose();
                }}>
                <View style={styles.textContainer}>
                <Text numberOfLines={1} style={styles.title}>{title}</Text>
                <Text numberOfLines={1} style={styles.message}>{message}</Text>
                </View>
            </TouchableOpacity>

            <View style={styles.footer} />
            </GestureRecognizer>
        </View>
        );
    }
}

DefaultNotificationBody.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  vibrate: PropTypes.bool,
  isOpen: PropTypes.bool,
  onPress: PropTypes.func,
  onClose: PropTypes.func,
  iconApp: Image.propTypes.source,
  icon: Image.propTypes.source,
};

DefaultNotificationBody.defaultProps = {
  title: 'Notification',
  message: 'This is a test notification',
  vibrate: true,
  isOpen: false,
  iconApp: null,
  icon: null
};

export default DefaultNotificationBody;