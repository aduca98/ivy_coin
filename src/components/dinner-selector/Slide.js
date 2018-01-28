import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import {Entypo} from '@expo/vector-icons';
import {
    View,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {H1, Button, Left, Header} from "native-base";
import {MaterialCommunityIcons} from '@expo/vector-icons';

export default class Slide extends Component {

    async componentWillMount() {
       
    }
  
    render() {
        const b = this.props.dinninghall;
        const {style, textStyle, arrowColor, buttons} = this.props;

        return (<View style={[styles.cryptoSlide, style]}>
                    <Image style={{borderRadius: 75, height: 150, width: 150}} source={b.photo} />
                    <Text style={[styles.text, textStyle]}> {b.name}</Text>
                    {/*<Text style={[styles.text, textStyle]}> {b.description}</Text>*/}
                    
                </View>)
    
    }

}

Slide.propTypes = {
    dinninghall: PropTypes.object,
    style: PropTypes.object,
    textStyle: PropTypes.object,
    arrowColor: PropTypes.string,
    buttons: PropTypes.bool
}

const styles = StyleSheet.create({
    wrapper: {
        height: 200,
        top: 0,
        flex: 1,
    },
    cryptoSlide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontFamily: "Avenir",
        color: "white",
        fontSize: 20,
        top: 15,
        fontWeight: 'bold'
    },
});