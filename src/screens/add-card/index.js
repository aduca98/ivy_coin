import React, { Component } from 'react';
import {
    Text,
    TextInput,
    View,
    Image,
    Dimensions,
    StyleSheet,
    StatusBar,
    TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import RNCreditCard from '../../components/credit-card/CreditCard';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {Button} from 'native-base';
import {BaseContainer, Container, Header, Content, Right, Left, Styles, Images, WindowDimensions, Field} from "../../components";
import {Ionicons} from '@expo/vector-icons';
const {width, height} = WindowDimensions;
import variables from "../../assets/native-base-theme/variables/commonColor";
import Loading from '../../components/Loading';

// Api / services
import Stripe from '../../utils/Stripe';
import {updateCards, addCard} from '../../modules/cards';
import PaymentService from '../../api/PaymentService';

class AddCard extends Component {

    state = {
        number: "4242424242424242",
        name: "Andrew",
        expiry: "11/2022",
        cvc: "333",
        loading: false
    }
    componentWillMount() {
        this.setCardState = this.setCardState.bind(this);
        this.addCard = this.addCard.bind(this);
    }
    setCardState(type, item) {
        if(type === "expiry") {
            console.log(item);
        }
        var a = {}
        a[type] = item;
        this.setState(a)
    }
    async addCard() {
        this.setState({
            loading: true
        })
        var expiryArr = this.state.expiry.split("/")
        var month = expiryArr[0];
        var year = expiryArr[1];
        if(year.length != 4) {
            return alert("Year should be YYYY");
        }
        try {
            var res = await Stripe.createToken(this.state.number, month, year, this.state.cvc);
            var token = res.id;
            console.log("TOKEN " + token);
            const pay = await PaymentService.addCard(token);
            // // update global redux store...
            this.props.addCard(pay.default);
            this.props.navigation.goBack(null);
            this.setState({
                loading: false
            })
        } catch(e) {
            console.log(e);
            this.setState({
                loading: false
            })
        }
    }
    render() {
        var {navigation} = this.props;
        if(this.state.loading) {
            return <Loading />
        }
        return(
            <BaseContainer
                backgroundColor={'#ecf0f3'}
                noHeader={true} {...{ navigation }}>
                <StatusBar
                    barStyle="light-content"
                />

                {/*Header*/}
                <View style={{
                        flexDirection: 'row',
                        height: 100,
                        paddingTop: 10,
                        backgroundColor: '#0B1823'
                    }}>
         
                    <TouchableOpacity 
                        style={{flex: .25}}
                        onPress={() => { navigation.goBack(null) }}>
                        
                        <Ionicons style={{
                                color: 'white',
                                fontSize: 35,
                                left: 15,
                                top: 45
                            }} name='ios-arrow-round-back-outline' />
                            
                    </TouchableOpacity>

                    <Text
                        style={{
                            backgroundColor: 'transparent',
                            fontSize: 20,
                            color: '#fff',
                            flex: .6,
                            textAlign: 'center',
                            top: 50,
                            justifyContent: 'flex-start',
                            fontFamily: 'Avenir-Book'
                        }}>
                        Add Card
                    </Text>
                    <View style={{flex: .25}}></View>

                </View>
                
                <KeyboardAwareScrollView>
                    <View style={{
                        flex: 1
                    }}>
                        <RNCreditCard
                            setRef={this.ref}
                            setCardState={this.setCardState}
                            number={this.state.number}
                            name={this.state.name}
                            expiry={this.state.expiry}
                            cvc={this.state.cvc} />
                    </View>

                    <Button full onPress={this.addCard} style={{ 
                            marginTop: 30,
                            height: 60,
                            borderRadius: 30,
                            width: 300,
                            alignSelf: 'center',
                            backgroundColor: "#f47c2b"
                        }}>
                        <Text style={{color: 'white', fontSize: 25, fontFamily: "Avenir"}}>
                            Add Card
                        </Text>
                    </Button>
                </KeyboardAwareScrollView>
            </BaseContainer>);
        
    }
}

const style = StyleSheet.create({
    img: {
        height,
        width
    },
    content: {
        flex: 1
    },
    logo: {
        alignSelf: "center",
        marginBottom: variables.contentPadding,
        marginTop: variables.contentPadding
    },
    title: {
        marginTop: variables.contentPadding,
        color: "white",
        textAlign: "center"
    },
    blur: {
        backgroundColor: "rgba(255, 255, 255, .2)"
    }
});

function mapStateToProps(state) { 
    return {};
} 

function mapDispatchToProps(dispatch) {
    return {
        updateCards(cards) {
             dispatch(updateCards(cards))
        },
        addCard(card) {
            dispatch(addCard(card));
        }
    }
}

export default connect( 
    mapStateToProps, 
    mapDispatchToProps 
)(AddCard);