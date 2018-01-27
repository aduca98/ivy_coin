// @flow
import moment from "moment";
import autobind from 'autobind-decorator';
import * as React from "react";
import {
    Text, 
    Image, 
    TextInput, 
    StyleSheet, 
    View, 
    ScrollView, 
    KeyboardAvoidingView,
    Keyboard,
    StatusBar
} from "react-native";
import {connect} from 'react-redux';
import {H1, Button, Icon, Left} from "native-base";
import { NavigationActions } from 'react-navigation'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import {
    BaseContainer, 
    Circle, 
    Styles, 
    Images, 
    WindowDimensions, 
    Field
} from "../../components";
import variables from "../../assets/native-base-theme/variables/commonColor";
import {CryptoSelector} from '../../components/crypto-selector';

import {Algolia} from '../../components/algolia';
import TransactionService from '../../api/TransactionService';
import UserService from '../../api/UserService';
import Loading from '../../components/Loading';
import CryptoPrice from '../../api/CryptoPrice';
import forceAuth from '../../utils/ForceAuth';
import CryptoSlider from '../../components/crypto-selector/CryptoSlider';
import {updateBalances} from '../../modules/transactions';

class SendMoney extends React.Component {

    state = {
        selectedCurrency: "BTC",
        selectPrice: "",
        amount: "10.50",
        loading: true,
        balances: [],
        errorMessage: ""
    }

    constructor() {
        super();
        
        this.selectCurrency = this.selectCurrency.bind(this);
        this._onChangeAmount = this._onChangeAmount.bind(this);
        this._nextStep = this._nextStep.bind(this);
        this._calculateAmount = this._calculateAmount.bind(this);
    }

    async componentWillMount() {
        try {
            await forceAuth(this.props.navigation);

            // If in redux store use temporarily
            if(this.props.balances) {
                this.setState({
                    balances: this.props.balanaces,
                    selectCurrency: "BTC"
                })
            }
            var res = await UserService.balance(["BTC", "ETH"]);
            var balances = res.balances;
            this.props.updateBalances(balances);

            const navState = (this.props.navigation.state) ? this.props.navigation.state : null;
            var updateObj = {
                balances: balances,
                loading: false
            }
            if(navState && navState.params && navState.params.currency) {
                updateObj["selectedCurrency"] = navState.params.currency
            } 
            this.setState(updateObj);

        } catch(e) {
            console.log(e);
            // set state to stop loading but give an error
        }
    }

    async selectCurrency(currency) {
        this.setState({
            selectedCurrency: currency
        });
        const price = await CryptoPrice.getPrice(currency);
        const usd = price.price_usd;
        console.log(price, usd);
        this.setState({
            selectPric: usd
        })
    }

    _onChangeAmount(val) {
        return this.setState({
            amount: val,
        })
    }

    _calculateAmount() {
        return (parseFloat(this.state.amount) / parseFloat(this.state.selectPrice)).toFixed(6);
    }

    async _nextStep() {
        // Just verify user has enough money...
        // this.setState({
        //     loading: true
        // })
        if(!this.state.selectedCurrency) {
            return this.setState({
                errorMessage: "Please select currency"
            })
        }
        if(!this.state.amount) {
            return this.setState({
                errorMessage: "Enter amount."
            })
        }
        this.props.navigation.navigate("Choose_Contact", { amountOfCurrency: this._calculateAmount(), amount: this.state.amount });

        // this.setState({
        //     loading: true
        // })
        // var {selectedCurrency, amount, name, message, to} = this.state;
        // console.log(selectedCurrency, amount, name, message, to);
        // try {
        //     var res = await TransactionService.sendMoneyToFriend(selectedCurrency, amount, name, message, to);
            
        //     this.setState({
        //         loading: false
        //     })
        //     this.props.navigation.navigate("Transactions");

        // } catch(e) {
        //     console.log(e);
        //     alert(e.message);
        //     this.setState({
        //         errorMessage: e.message,
        //         loading: false
        //     })
        // }
    }

    render() {
        const {navigation} = this.props;
        
        if(this.state.loading) {
            return (<Loading/>);
        }
        return (
            //backgroundColor={'#022956'}
            <BaseContainer noHeader={true} {...{ navigation }}>
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
                            top: 40,
                            justifyContent: 'flex-start',
                            fontFamily: 'Avenir-Book'
                        }}>
                        Send Crypto
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

                <KeyboardAwareScrollView 
                    contentContainerStyle={{
                        alignItems: 'center',
                        justifyContent: 'flex-start' 
                    }}
                    style={[Styles.flexGrow, { 
                        padding: 15, 
                        flexDirection: 'column',
                        flex: 1,
                        backgroundColor: '#ecf0f3'
                    }]}>

                    {/*Input fields*/}
                    <View style={{
                            flex: .5,
                            top: 10
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
                                        paddingTop: 0,
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

                    <Button full onPress={this._nextStep} style={{ 
                        marginTop: 30,
                        height: 60,
                        borderRadius: 30,
                        width: 300,
                        alignSelf: 'center',
                        backgroundColor: "#f47c2b"
                    }}>
                        <Text style={{color: 'white', fontSize: 25, fontFamily: "Avenir"}}>
                            Next
                        </Text>
                    </Button>

                </KeyboardAwareScrollView>
                
            </BaseContainer>
        );
    }
}

function cacheImages(images) {
    return images.map(image => 
    Expo.Asset.fromModule(image).downloadAsync());
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
        color: "white"
    },
    slide: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 0,
    },
    card: {
        marginHorizontal: 10,
        marginBottom: 15,
        backgroundColor: 'transparent',
        borderRadius: 3,
        elevation: 3,
        padding: 10,
        flexDirection: 'column'
    },
    
});

function mapStateToProps(state) { 
    return {
        balances: state.transactions.balances
    }; 
} 

function mapDispatchToProps(dispatch) {
    return {
        updateBalances(balances) {
            dispatch(updateBalances(balances))
        }
    }
}

export default connect( 
    mapStateToProps, 
    mapDispatchToProps 
)(SendMoney);
