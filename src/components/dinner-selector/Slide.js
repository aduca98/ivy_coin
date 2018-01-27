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

export default class Slide extends Component {

    async componentWillMount() {
       
    }
  
    render() {
        const b = this.props.dinninghall;
        const {style, textStyle, arrowColor, buttons} = this.props;

        switch(b.dinninghall) {
            default:
                img = <Image style={{width: 100, height: 100}} source={require("../../assets/crypto/btc.png")} />
                break;
        }
        return (<View style={[styles.cryptoSlide, style]}>
                    {img}
                    <Text style={[styles.text, textStyle]}> {b.name}</Text>
                    <Text style={[styles.text, textStyle]}> {b.description}</Text>
                    
                    {buttons && <View style={{
                        flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: 10,
                            height:50,
                            top:20,
                        }}>
                        <View style={{
                                alignItems: 'center',
                                flex: .5,
                            }}>
                            <TouchableOpacity 
                                onPress={() => this.props.navigation.navigate("Send_Crypto")}
                                style={{ 
                                    width: 155,
                                    paddingTop: 10,
                                    paddingBottom: 10,
                                    flexDirection: 'row',
                                    borderRadius: 35,
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                }}>
                                <Image style={{
                                    height: 40,
                                    left: -10,
                                    width: 40}} 
                                    source={require('../../assets/icons/send.png')}/>
                                <Text
                                    style={{
                                    backgroundColor: 'transparent',
                                    fontSize: 17,
                                    color: '#fec315',
                                    fontWeight: 'bold',
                                    fontFamily: 'Avenir-Book'
                                    }}>
                                    Send
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                                alignItems: 'center',
                                flex: .5
                            }}>
                            <TouchableOpacity 
                                onPress={() => this.props.navigation.navigate("Buy_Crypto")}
                                style={{ 
                                    width: 155,
                                    paddingTop: 10,
                                    paddingBottom: 10,
                                    borderRadius: 35,
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                }}>
                                <Image style={{
                                    left: -10,
                                    height: 40,
                                    width: 40}} 
                                    source={require('../../assets/icons/credit-card.png')}/>
                                <Text
                                    style={{
                                        backgroundColor: 'transparent',
                                        fontSize: 17,
                                        fontWeight: 'bold',
                                        color: '#fec315',
                                        fontFamily: 'Avenir-Book'
                                    }}>
                                    Buy
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>}
                    
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