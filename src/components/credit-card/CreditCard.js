// @flow
import moment from "moment";
import Expo from 'expo';
import autobind from 'autobind-decorator';
import React, {Component} from "react";
import {
    Text, 
    Image, 
    TextInput, 
    StyleSheet, 
    View, 
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView
} from "react-native";
import {H1, Button, Icon} from "native-base";
import {BaseContainer, Circle, Styles, Images, WindowDimensions, Field} from "../../components";
import { TextInputMask } from 'react-native-masked-text'
import variables from "../../assets/native-base-theme/variables/commonColor";

const SWIPER_HEIGHT = 180;
import CreditCard, {CardImages} from 'react-native-credit-card';
import Swiper from 'react-native-swiper';
var valid = require('card-validator');

import * as Stripe from '../../utils/Stripe';

export default class RNCreditCard extends Component {
    state = {
        focused: 'name',
        type: 'visa'
    }
    constructor(props) {
        super(props);
        this.updateCardNumber = this.updateCardNumber.bind(this);
        this.goToName = this.goToName.bind(this);
        this.goToCvc = this.goToCvc.bind(this);
    }

    componentWillMount() {
        cacheImages([
            require('../../assets/card-front.png'),
            require('../../assets/card-back.png'),
        ]);
    }
    updateCardNumber(num) {
        console.log(num)
        var numberValidation = valid.number(num);
        console.log("validation");
        console.log(numberValidation);

        if (!numberValidation.isPotentiallyValid) {
            return console.log("invalid card");
        }
        
        if (numberValidation.isPotentiallyValid) {
            console.log(num);

            if(numberValidation && numberValidation.card && numberValidation.card.type){
                this.setState({
                    type: numberValidation.card.type,
                });
            }
            this.props.setCardState("number", num);
        }
    }
    goToName() {
        this.setState({focused: "name"});
        this.refs["name"].focus();
    }
    goToCvc() {
        this.setState({focused: "cvc"});
        this.refs["cvc"].focus();
    }
    render() {
        var cardTypes = []; 
        for (var key in CardImages) {
            cardTypes.push({type: key, image: CardImages[key]});
        }
        if (this.state.restoring) {
            return null;
        }
        return (
            <KeyboardAvoidingView
                style={cardStyles.container}>
                <CreditCard
                    style={{flex: 1,marginVertical: 10, marginHorizontal: 10, marginBottom: 30, elevation: 3, alignSelf: 'center'}}
                    // imageFront={require('../../assets/card-front.png')}
                    // imageBack={require('../../assets/card-back.png')}
                    bgColor={"gold"}
                    bar={false}
                    focused={this.state.focused}
                    number={this.props.number}
                    name={this.props.name}
                    expiry={this.props.expiry}
                    cvc={this.props.cvc}/>
                
                    <View style={cardStyles.slide}>
                        <View style={cardStyles.card}>
                            <TextInputMask 
                                returnKeyLabel='Done' 
                                returnKeyType='done'
                                style={[cardStyles.input]}
                                placeholder="Card Number"
                                type={'credit-card'}
                                ref={"number"} 
                                value={this.props.number} 
                                onChangeText={(number) => this.updateCardNumber(number)}/>
                        </View>
                    </View>
                    <View style={cardStyles.slide}>
                        <View style={cardStyles.card}>
                            <TextInput 
                                returnKeyLabel='Done' 
                                returnKeyType='done'
                                style={[cardStyles.input]}
                                placeholder="Card Holder Name"
                                ref="name"
                                value={this.props.name} 
                                onChangeText={(name) => this.props.setCardState("name", name)}/>
                        </View>
                    </View>
                    <View style={cardStyles.slide}>
                        <View style={cardStyles.card}>
                            <TextInputMask 
                                returnKeyLabel='Done' 
                                returnKeyType='done'
                                style={[cardStyles.input]}
                                ref={'expiry'} 
                                type={'datetime'}
                                placeholder="mm/yyyy"
                                options={{
                                    format: 'MM/YYYY'
                                }}
                                onSubmitEnter={() => this.refs["cvc"].focus()}
                                value = {this.props.expiry}
                                onChangeText={(expiry) => this.props.setCardState("expiry", expiry) }
                            />
                        </View>
                    </View>
                    <View style={cardStyles.slide}>
                        <View style={cardStyles.card}>
                            <TextInput 
                                returnKeyLabel='Done' 
                                returnKeyType='done'
                                placeholder="CVC"
                                ref={"cvc"} 
                                keyboardType={"numeric"}
                                value={this.props.cvc}
                                onChangeText={(cvc) => this.props.setCardState("cvc", cvc) }
                                style={[cardStyles.input]}/>
                        </View>
                    </View>
            </KeyboardAvoidingView>
        );
    }
}

function cacheImages(images) {
    return images.map(image => Expo.Asset.fromModule(image).downloadAsync());
}

const cardStyles = StyleSheet.create({
    background: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: WindowDimensions.width,
        height: WindowDimensions.height
    },
    container: {
        // backgroundColor: '#fff',
        flex: 1,
        paddingTop: 30,
        paddingBottom: 0
    },
    wrapper: {
        height: SWIPER_HEIGHT,
    },
    slide: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 0,
        top: 0
    },
    input: {
        width: 300,
        color: '#000',
        textAlign: 'left',
        fontSize: 18,
        paddingLeft: 40,
        paddingTop: 0,
        borderBottomColor: 'transparent',
        height: 60,
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 30,
        shadowColor: '#ccc',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 3,
        shadowOpacity: 0.7
    },
    card: {
        marginHorizontal: 10,
        // backgroundColor: '#fff',
        borderRadius: 3,
        elevation: 3,
        padding: 10,
    },
    button: {
        height: 40,
        backgroundColor: '#1ba549',
        justifyContent: 'center',
    },
    textButton: {
        textAlign: 'center',
        color: '#fff'
    }

});

