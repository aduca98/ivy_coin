// @flow
import moment from "moment";
import autobind from 'autobind-decorator';
import * as React from "react";
import {StatusBar, ScrollView, Text, Image, StyleSheet, View, TouchableOpacity} from "react-native";
import {H1, Button, Left, Header} from "native-base";
import {InAppNotification} from '../../components/in-app-notification';
import { LinearGradient } from 'expo';
import {BaseContainer, Circle, Styles, Images, WindowDimensions} from "../../components";
import variables from "../../assets/native-base-theme/variables/commonColor";
import registerForPushNotificationsAsync from '../../utils/PushNotification';
import NotificationService from '../../api/NotificationService';
import Loading from '../../components/Loading';
import {connect} from 'react-redux';
import {FontAwesome, EvilIcons} from '@expo/vector-icons';

import UserService from '../../api/UserService';
import CryptoSlider from '../../components/crypto-selector/CryptoSlider';
import forceAuth from '../../utils/ForceAuth';
import {updateBalances} from '../../modules/transactions';

class Home extends React.Component {

    state = {
        notification: {},
        loading: true,
        selectedCurrency: "BTC",
    };

    constructor() {
        super();
        this.selectCurrency = this.selectCurrency.bind(this);
        this.fetchBalance = this.fetchBalance.bind(this);
        this._handleNotification = this._handleNotification.bind(this);
    }
    selectCurrency(val) {
        this.setState({
            selectedCurrency: val.currency
        })
    }
    async componentWillMount() {
        try {
            await forceAuth(this.props.navigation);
            cacheImages([
                require('../../assets/menu.png'),
                require('../../assets/crypto/btc.png'),
                require('../../assets/crypto/eth.png'),
                require('../../assets/crypto/ltc.png'),
                require('../../assets/icons/send.png'),
                require('../../assets/icons/credit-card.png'),
                require('../../assets/icons/map.png'),
            ])
            await this.fetchBalance();
            registerForPushNotificationsAsync();
            
            await NotificationService.sendPushNotification();
            // Handle notifications that are received or selected while the app
            // is open. If the app was closed and then opened by tapping the
            // notification (rather than just tapping the app icon to open it),
            // this function will fire on the next tick after the app starts
            // with the notification data.
            this._notificationSubscription = Notifications.addListener(this._handleNotification);
        } catch(e) {
            console.log(e);
        }
    }
    async fetchBalance() {
        try {
            var res = await UserService.balance(["USD", "BTC", "ETH"]);
            var balances = res.balances;
            this.props.updateBalances(balances);
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
    _handleNotification = (notification) => {
        console.log(notification);
    };
    render() {
      
        const {navigation} = this.props;
        //
        if(this.state.loading) {
            return <Loading />
        }
        return (
            <BaseContainer 
                backgroundColor={'#0B1823'}
                noHeader={true} {...{ navigation }}>
                
                {/*<InAppNotification />*/}
                <StatusBar
                    barStyle="light-content"
                />
                <View 
                    // start={[0, .5]}
                    // end={[.5, 0]}
                    // colors={['#071B38', '#024097']} //#2eabf4', 
                    style={[Styles.flexGrow, { 
                        padding: 15, 
                        flexDirection: 'column',
                        flex: 1,
                        alignItems: 'center' }]}>
                        
                    <View style={{
                        height: 70,
                        top: 0,
                        left:0,
                        width: WindowDimensions.width }}>

                        <View style={{
                                flex: .25,
                                flexDirection: 'row'
                            }}>
                            <Left style={{
                                    left: 0,
                                    flex: .3,
                                    top: 35,
                                    justifyContent: 'flex-start'
                                }}>
                                <Button onPress={() => navigation.navigate("DrawerOpen")} transparent>
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
                                    fontSize: 25,
                                    color: '#fff',
                                    flex: .4,
                                    height: 50,
                                    textAlign: 'center',
                                    top: 30,
                                    justifyContent: 'flex-start',
                                    fontFamily: 'Avenir-Book'
                                }}>
                                Home
                            </Text>
                            <View style={{flex: .3}}></View>

                        </View>

                    </View>

                    <ScrollView style={{
                        height: WindowDimensions.height
                        }}>
                        <View style={{
                                flex: .75,
                                top: 30,
                                justifyContent: 'center',
                            }}>
                            <Text
                                style={{
                                    backgroundColor: 'transparent',
                                    fontSize: 40,
                                    color: '#fff',
                                    alignSelf: 'center',
                                    fontFamily: 'Avenir-Light'
                                }}>
                                $ 104.00
                            </Text>

                            <TouchableOpacity 
                                onPress={(e) => this.props.navigation.navigate("Quests")}
                                style={{
                                    width: WindowDimensions.width - 30,
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    padding: 20,
                                    top: 30,
                                }}> 
                                <LinearGradient 
                                    start={[0, 1]}
                                    end={[1, 0]}
                                    colors={['#FAD766', '#fec315']}
                                    style={{
                                        bottom: 0,
                                        height: 50,
                                        marginLeft: 15,
                                        marginRight: 15,
                                        width: WindowDimensions.width - 30,
                                        borderRadius: 25,
                                        backgroundColor: 'gold',
                                        justifyContent: 'center',
                                        alignSelf: 'center',
                                        flexDirection: 'row'
                                    }}>

                                    <Image style={{
                                        height: 35,
                                        top: 5,
                                        width: 35}} 
                                        source={require('../../assets/icons/map.png')}/>
                                        
                                    <Text style={{
                                        fontSize: 20,
                                        left: 15,
                                        top: 10,
                                        backgroundColor: 'transparent',
                                        color: '#fff',
                                        fontFamily: 'Avenir',
                                        textAlign: 'center'
                                    }}>Quests</Text>
                                    
                                    <View style={{flex: .25}} />

                                </LinearGradient>
                            </TouchableOpacity>
                        
                        </View>
                        
                        <View style={[Styles.flexGrow,{
                            flex: 1,
                            flexDirection: 'column',
                            top: 75,
                            width: WindowDimensions.width - 30,
                            }]}>
                            
                            <View    
                                style={{
                                    zIndex: 100000,
                                    top: 20, 
                                    borderRadius: 10,
                                    borderTopRightRadius: 10,
                                    backgroundColor: "#fff",
                                    height: 275,
                                    paddingVertical: 0,
                                    alignItems: 'center',
                                }}>
                                
                                <CryptoSlider
                                    style={{
                                        // backgroundColor: "#fff",
                                        flex: 1,
                                        alignItems: 'center',
                                    }}
                                    arrowColor={"#0B1823"}
                                    textStyle={{
                                        color: "#0B1823"
                                    }}
                                    buttons={true}
                                    balances={this.props.balances} />

                            </View>

                        </View>
                    </ScrollView>

                </View>
            </BaseContainer>);
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
    }
});

function mapStateToProps(state) { 
    return {
        balances: state.transactions.balances,
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
)(Home);