// @flow
import moment from "moment";
import Expo from 'expo';
import autobind from 'autobind-decorator';
import React, {Component} from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
    Text, 
    Image, 
    TextInput, 
    StyleSheet, 
    View, 
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    StatusBar
} from "react-native";
import Swiper from 'react-native-swiper';
import {H1, Left, Button, Right, ListItem, Icon, Radio} from "native-base";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import {BaseContainer, Circle, Styles, Images, WindowDimensions, Field} from "../../components";
import variables from "../../assets/native-base-theme/variables/commonColor";
import CryptoSlider from '../../components/crypto-selector/CryptoSlider';
const SWIPER_HEIGHT = 180;
import RadioButton from 'react-native-radio-button'
import {Entypo} from '@expo/vector-icons';

// Api / modules
import Stripe from '../../utils/Stripe';
import {CreditCard} from '../../components/credit-card';
import Loading from '../../components/Loading';
import forceAuth from '../../utils/ForceAuth';
import {updateCards} from '../../modules/cards';
import {updateBalances} from '../../modules/transactions';

class BuyCrypto extends React.Component {

    state = {
        selectedCurrency: "BTC",
        amount: "",
        errorMessage: "",
        selectPrice: "",
        selectedCard: "",

        // Will remove below...
        loading: true,
        loadingCards: false
    }
    constructor() {
        super();
        this.updateCardDefault = this.updateCardDefault.bind(this);
        this.setCardState = this.setCardState.bind(this);
        this.setAmountRef = this.setAmountRef.bind(this);
        this.selectCurrency = this.selectCurrency.bind(this);
        this.buyCrypto = this.buyCrypto.bind(this);
        this._calculateAmount = this._calculateAmount.bind(this);
        this._onChangeAmount = this._onChangeAmount.bind(this);
        this._fetchBalances = this._fetchBalances.bind(this);
        this._fetchCards = this._fetchCards.bind(this);
    }
    setCardState(type, item) {
        if(type === "expiry") {
            console.log(item);
        }
        var a = {}
        a[type] = item;
        this.setState(a)
    }
    setAmountRef(amount) {
        this.amount = amount._root;
    }
    selectCurrency(val) {
        this.setState({
            selectedCurrency: val.currency
        })
    }
    async buyCrypto() {
        this.setState({
            loading: true
        })
        const amount = this.state.amount;
        const currency = this.state.selectedCurrency;
        if(!amount || !currency)
            return alert("Please select amount and currency.");

        var month = this.state.expiry.substring(0,2);
        var year = this.state.expiry.substring(2);

        this.props.navigation.navigate("Transactions");

    }
    async _fetchBalances() {
        
        this.props.updateBalances([
            {
                currency: "IVY_COIN",
                amount: "56.67"
            }
        ]);
        // Shouldn't have to do this...
        this.setState({
            balances: balances
        })
    }
    async _fetchCards() {
        this.props.updateCards([
            {

            }
        ]);
        console.log("CARDS " + this.props.cards);
    }
    async componentWillMount() {
        try {
            cacheImages([
                require('../../assets/cards/Visa.png'),
                require('../../assets/cards/MasterCard.png'),
                require('../../assets/cards/AmericanExpress.png'),
                require('../../assets/cards/Discover.png'),
            ])
            await forceAuth(this.props.navigation);
            await this._fetchBalances();
            await this._fetchCards();
            this.setState({
                loading: false,
                selectedCard: (this.props.cards && this.props.cards.length > 0) ? this.props.cards[0].id : ""
            })
        } catch(e) {
            console.log(e);
        }
    }
    _calculateAmount() {
        console.log(this.state.amount, this.state.selectPrice);

        return (parseFloat(this.state.amount) / parseFloat(this.state.selectPrice)).toFixed(6);
    }
    async selectCurrency(currency) {
        this.setState({
            selectedCurrency: currency
        });
        const price = await CryptoPrice.getPrice(currency);
        const usd = price.price_usd;
        console.log(price, usd);
        this.setState({
            selectPrice: usd
        })
    }
    _onChangeAmount(val) {
        return this.setState({
            amount: val,
        })
    }
    async updateCardDefault(card_id) {
        console.log(card_id);
        this.setState({
            loadingCards: true
        })
        try {
            const res = await PaymentService.updateDefault(card_id);
            this.setState({
                loadingCards: false,
                selectedCard: card_id
            })
        } catch(e) {
            this.setState({
                loadingCards: false
            })
        }
    }
    render() {
        const {navigation} = this.props;
        if(this.state.loading) {
            return (<Loading/>);
        }

        return (
            <BaseContainer 
                noHeader={true} 
                headerColor="#0B1823" 
                backgroundColor="#ecf0f3"
                style={{
                    flexDirection: 'column'
                }}
                {...{ navigation }}>
                
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
                    <Left style={{
                        left: -10,
                        flex: .2,
                        top: 10,
                        padding: 0,
                        justifyContent: 'flex-start'
                    }}>
                        <Button style={{
                            padding: 0
                        }} onPress={() => navigation.navigate("DrawerOpen")} transparent>
                            <Image style={{
                                width: 35,
                                height: 25,
                                left: 15
                            }} source={require('../../assets/menu.png')} />
                        </Button>
                    </Left>
                    
                    <Text
                        style={{
                            backgroundColor: 'transparent',
                            fontSize: 20,
                            color: '#fff',
                            flex: .6,
                            textAlign: 'center',
                            top: 45,
                            justifyContent: 'flex-start',
                            fontFamily: 'Avenir-Book'
                        }}>
                        Buy Crypto
                    </Text>
                    <View style={{flex: .2}}></View>

                </View>
                
                <View style={{
                    flex: .5
                    }}>

                    <CryptoSlider
                        style={{
                            backgroundColor: "#0B1823",
                            flex: 1,
                            alignItems: 'center',
                        }}
                        arrowColor={"#fff"}
                        textStyle={{
                            color: "#fff"
                        }}
                        buttons={false}
                        balances={this.props.balances} />
                
                </View>

                <KeyboardAwareScrollView style={[Styles.flexGrow, {
                    flex: 1, paddingTop: 0}]}>
                    
                    {/*Crypto selector*/}
                    {/*<View style={{
                            top: 10,
                            height: 200,
                            flex: .25,
                        }}>

                        
                    </View>*/}

                    <View style={{
                            marginBottom: 0,
                            paddingBottom: 0,
                            justifyContent: 'center',
                            paddingTop: 10,
                        }}>
                            
                        {/*Input fields*/}
                        <View style={{
                                flex: .5,
                            }}>
                            <H1 style={{
                                textAlign: 'center',
                                top: 0,
                                padding: 20,
                                paddingBottom: 0,
                                color: "#022956",
                                fontFamily: "Avenir"
                            }}> Transaction Info </H1>
                            
                            {(this.state.errorMessage != "") && 
                                    <View style={{
                                            alignItems: 'center',
                                            flex: 1,
                                            backgroundColor: 'red'
                                        }}>
                                        <View style={{
                                            width: 350,
                                            borderRadius: 10,
                                            padding: 20,
                                            height: 50,
                                            justifyContent: 'center'
                                        }}>
                                            <Text style={{
                                                color: '#FF6462',
                                                textAlign: 'center',
                                                fontSize: 25
                                            }}>{this.state.errorMessage}</Text>
                                        </View>
                                    </View>}
                                    
                            <View style={style.slide}>

                                <View style={style.card}>
                                    <Text style={{
                                        top: 38, 
                                        left: 20, 
                                        fontSize: 20,
                                        color: "#888",
                                        backgroundColor: 'transparent',
                                        zIndex: 10,
                                        width: 20,
                                        height: 20,
                                        }} name="ios-search" size={20} color="#000">
                                        $
                                    </Text>
                                    <TextInput 
                                        style={[style.input, {
                                            color: '#000',
                                            textAlign: 'left',
                                            fontSize: 18,
                                            paddingLeft: 40,
                                            paddingTop: 17,
                                            borderBottomColor: 'transparent',
                                            height: 60,
                                            width: 300,
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
                                        }]}
                                        returnKeyLabel='Done' 
                                        returnKeyType='done'
                                        placeholderTextColor={"#888"}
                                        tintColor={"#000"}
                                        ref={'amount'} 
                                        placeholder="0.00"
                                        keyboardType={"numeric"}
                                        value = {this.state.amount}
                                        onChangeText={(val) => this._onChangeAmount(val)}
                                    />
                                </View>

                            </View>

                            {(!(this.state.amount=="" || this.state.selectPrice=="")) && 
                                    <Text style={{
                                        fontSize: 25,
                                        textAlign: 'center',
                                        padding: 20
                                    }}>
                                        {(this.state.selectedCurrency!="") ? `${this._calculateAmount()} ${this.state.selectedCurrency}` : "Please select currency"}
                                    </Text>}
                            
                            
                        </View>
                        
                        {this.state.loadingCards && 
                            <Image style={{
                                alignSelf: 'center',
                                top: 30,
                                marginBottom: 50,
                                height: 70,
                                width: 70
                            }} source={require('../../assets/loader.gif')} />}
                            
                        {!this.state.loadingCards && this.props.cards && this.props.cards.length > 0 
                         && this.props.cards.map((c, i) => {
                            var img;
                            console.log(c);
                            switch(c.brand) {
                                case "Visa":
                                    img = <Image style={{marginLeft: 20, height:40, width:40}}
                                            source={require(`../../assets/cards/Visa.png`)} />
                                    break;
                                case "American Express":
                                    img = <Image style={{marginLeft: 20, height:40, width:40}}
                                            source={require(`../../assets/cards/AmericanExpress.png`)} />
                                    break;
                                case "Discover":
                                    img = <Image style={{marginLeft: 20, height:40, width:40}}
                                            source={require(`../../assets/cards/Discover.png`)} />
                                    break;
                                case "MasterCard":
                                    img = <Image style={{marginLeft: 20, height:40, width:40}}
                                            source={require(`../../assets/cards/MasterCard.png`)} />
                                    break;
                                default:
                                    break;
                            }

                            {/*if(this.props.defaultCard.id === c.id) {
                                this.setState({
                                    selectedCard: c.id
                                })
                            }*/}
                            return (
                                <TouchableOpacity
                                    key={i}
                                    onPress={() => this.updateCardDefault(c.id)}>
                                    <View 
                                        style={{
                                            flexDirection: 'row',
                                            padding: 5,
                                            paddingHorizontal: 50
                                        }}>
                                        <RadioButton
                                            animation={'bounceIn'}
                                            isSelected={this.state.selectedCard === c.id}
                                        />
                                        
                                        {img}

                                        <Text style={{
                                            fontSize: 15,
                                            marginLeft: 20,
                                            top: 12
                                        }}> ****{c.last4}, {c.exp_month}/{c.exp_year} </Text>
                                    </View>
                                </TouchableOpacity>
                            )})}
                        
                    </View>
                    
                    <Button full onPress={() => this.props.navigation.navigate("Add_Card")} style={{ 
                            marginTop: 30,
                            height: 45,
                            borderRadius: 30,
                            width: 150,
                            alignSelf: 'center',
                            backgroundColor: "#0B1823"
                        }}>
                        <Text style={{color: 'white', fontSize: 25, fontFamily: "Avenir"}}>
                            Add Card
                        </Text>
                    </Button>

                    <Button full onPress={() => {
                        this.buyCrypto();
                        this.props.navigation.navigate("Transactions");
                        }} style={{ 
                            marginTop: 30,
                            height: 60,
                            borderRadius: 30,
                            marginBottom: 100,
                            width: 300,
                            alignSelf: 'center',
                            backgroundColor: "#f47c2b"
                        }}>
                        <Text style={{color: 'white', fontSize: 25, fontFamily: "Avenir"}}>
                            Buy Crypto
                        </Text>
                    </Button>

                </KeyboardAwareScrollView>
            </BaseContainer>
        );
    }
}

const style = StyleSheet.create({
    img: {
        ...WindowDimensions
    },
    circle: {
        marginVertical: variables.contentPadding * 4
    },
    badge: {
        position: "absolute",
        right: 10,
        top: 10
    },
    text: {
        fontFamily: variables.titleFontfamily,
        color: "white",
        fontSize: 20,
        top: 15,
        fontWeight: 'bold'
    },
    input: {
        width: 300,
        borderBottomWidth: 1,
        borderColor: "#ccc",
        paddingBottom: 15
    },
    slide: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 0,
    },
    card: {
        marginHorizontal: 10,
        marginBottom: 15,
        // backgroundColor: '#fff',
        borderRadius: 3,
        elevation: 3,
        padding: 10,
    },
    wrapper: {
        height: 200,
        top: 0,
        flex: 1,
    },
    cryptoSlide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0B1823',
    },
});

function cacheImages(images) {
    return images.map(image => 
    Expo.Asset.fromModule(image).downloadAsync());
}

BuyCrypto.propTypes = {
    updateBalances: PropTypes.func,
    updateCards: PropTypes.func
}

function mapStateToProps(state) { 
    return {
       
    }; 
} 

function mapDispatchToProps(dispatch) {
    return {
        // updateBalances(balances) {
        //     dispatch(updateBalances(balances))
        // },
        // updateCards(cards) {
        //      dispatch(updateCards(cards))
        // }
    }
}

export default connect( 
    mapStateToProps, 
    mapDispatchToProps 
)(BuyCrypto);