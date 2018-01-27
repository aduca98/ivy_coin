import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import { Animated, StyleSheet, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Notifications} from 'expo';

const styles = StyleSheet.create({
  notification: {
    position: 'absolute',
    width: '100%',
  },
});

class Notification extends Component {
  
    state = {
        animatedValue: new Animated.Value(1),
        isOpen: false,
    };

    componentWillMount() {
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
    }

    @autobind
    _handleNotification(notif) {
        console.log("NOTIF " + notification);
    }   

    constructor() {
        super();
    }

    @autobind
    show() {
        const { closeInterval } = this.props;
        const { isOpen } = this.state;

        // Clear any currently showing notification timeouts so the new one doesn't get prematurely
        // closed
        clearTimeout(this.currentNotificationInterval);

        const showNotificationWithStateChanges = () => {
        this.setState({
            isOpen: true,
            title,
            message,
            onPress,
            icon,
            vibrate,
        }, () => this.showNotification(() => {
            this.currentNotificationInterval = setTimeout(() => {
            this.setState({
                isOpen: false,
                title: '',
                message: '',
                onPress: null,
                icon: null,
                vibrate: true,
            }, this.closeNotification);
            }, closeInterval);
        }));
        };

        if (isOpen) {
        this.setState(
            { isOpen: false },
            () => this.closeNotification(showNotificationWithStateChanges),
        );
        } else {
        showNotificationWithStateChanges();
        }
    }

    @autobind
    showNotification(done = () => {}) {
        this.refs.notif.fadeInDown(300);
    }

    @autobind
    closeNotification() {
        console.log('up');
        this.refs.notif.fadeOutUp(300);
    }

    render() {
        const {
            height,
            backgroundColour,
            iconApp,
            notificationBodyComponent: NotificationBody,
        } = this.props;

        const {
            animatedValue,
            title,
            message,
            onPress,
            isOpen,
            icon,
            vibrate,
        } = this.state;

        return (
        <Animatable.View 
            ref="notif"
            style={[
            styles.notification,
            { height, backgroundColor: backgroundColour } ]} >
            
            <NotificationBody
                title={title}
                message={message}
                onPress={() => {
                    this.closeNotification(() => {
                        console.log("closed");
                    })}}
                iconApp={iconApp}
                icon={icon}
                vibrate={vibrate}
                onClose={() => {
                    console.log("TWO")
                    this.closeNotification()
                }} />
        </Animatable.View>
        );
    }
}

Notification.propTypes = {
  closeInterval: PropTypes.number,
  openCloseDuration: PropTypes.number,
  height: PropTypes.number,
  backgroundColour: PropTypes.string,
  iconApp: Image.propTypes.source,
};

Notification.defaultProps = {
  closeInterval: 100,
  openCloseDuration: 200,
  height: 80,
  backgroundColour: 'white',
  iconApp: null,
};

export default Notification;
