// @flow
import moment from "moment";
import autobind from 'autobind-decorator';
import * as React from "react";
import {StatusBar, ScrollView, Text, Image, StyleSheet, View, TouchableOpacity} from "react-native";
import {H1, Button, Left, Header} from "native-base";
import { LinearGradient, MapView } from 'expo';
import {BaseContainer, Circle, Styles, Images, WindowDimensions} from "../../components";
import variables from "../../assets/native-base-theme/variables/commonColor";
import Loading from '../../components/Loading';
import {connect} from 'react-redux';
import {MaterialCommunityIcons, Ionicons, FontAwesome, EvilIcons} from '@expo/vector-icons';
import QRCode from 'react-native-qrcode';

import forceAuth from '../../utils/ForceAuth';
import DinnerSlider from '../../components/dinner-selector/DinnerSlider';
import ShoppingCart from '../../components/ShoppingCart';
import dinningHalls from '../../assets/dinning-halls/dinning-halls';

class ManageCrypto extends React.Component {

    state = {
    };

    constructor() {
        super();
        
    }
   
    async componentWillMount() {
        this.setState({
            privateKey: "SBK7J4EIRDUIKM4SIKT2H6NZCRLM3RAWQS2QXQCIKPI5QAWU7SDAROSB",
            publicKey: "GB55HI7EAYP26HHO6WLNGBQES77DOWXN5O7CJNB3WEQ3M3GDDW2KREUZ"
        });
    }

    render() {
        const { region } = this.state;
        const {navigation} = this.props;
        
        return (
          <View style={{
            flex: 1,
            flexDirection: 'column'
          }}>
            <StatusBar
                barStyle="light-content" />

            <View style={{
                height: 90,
                top: 0,
                backgroundColor: '#56A0ED',
                left:0,
                paddingTop: 10,
                width: WindowDimensions.width }}>

                <View style={{
                        flex: .25,
                        flexDirection: 'row'
                    }}>
                    <Left style={{
                            left: 0,
                            flex: .3,
                            top: 45,
                            justifyContent: 'flex-start'
                        }}>
                        <Button onPress={() => navigation.navigate("DrawerOpen")} transparent>
                            <MaterialCommunityIcons style={{
                                width: 35,
                                height: 35,
                                left: 15,
                                fontSize: 35,
                                color: "#fff"
                            }} name="menu" />
                        </Button>
                    </Left>

                    <Text
                        style={{
                            backgroundColor: 'transparent',
                            fontSize: 25,
                            color: '#fff',
                            fontWeight: 'bold',
                            flex: .4,
                            height: 50,
                            textAlign: 'center',
                            top: 35,
                            justifyContent: 'flex-start',
                            fontFamily: 'Avenir-Book'
                        }}>
                        BrownBytes
                    </Text>
                    <View style={{
                        right: 0,
                        flex: .3,
                        top: 50,
                        alignItems: 'right',
                        justifyContent: 'flex-end'}}>
                        <ShoppingCart navigation={this.props.navigation} />
                    </View>

                </View>
            </View>

            <ScrollView 
                contentContainerStyle={{
                    alignItems: 'center',
                }}
                style={{
                    top: 30,
                    width: WindowDimensions.width
                }}> 
                <View style={{
                    alignItems: 'center',
                    padding: 10,
                }}> 
                    <Image style={{
                        width: 160,
                        height:155,
                    }} source={require('../../assets/brownbytes.png')} />
                    <Text style={{
                        fontSize: 25,
                    }}> 45.50</Text>
                    <Text> BrownBytes </Text>
                </View>

                <View style={{
                    flexDirection: 'row',
                    width: WindowDimensions.width,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <QRCode
                        value={this.state.privateKey}
                        size={75}
                        style={{
                            flex: .2,
                        }}
                        bgColor='#54301a'
                        fgColor='white'/>
                    <Text style={{
                        flex: .75,
                        marginLeft: 30
                    }}>Receive Money: {this.state.publicKey}</Text>
                </View>

                <View style={{
                    flexDirection: 'row',
                    width: WindowDimensions.width,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 30
                }}>
                    <Text style={{
                        flex: 1,
                        marginLeft: 30
                    }}>Private Key: {this.state.privateKey}</Text>
                </View>

                <Button full onPress={() => alert("save")} style={{ 
                    marginTop: 30,
                    height: 50,
                    borderRadius: 30,
                    width: 250,
                    alignSelf: 'center',
                    backgroundColor: "#3E9FFF"
                }}>
                    <Text style={{color: 'white', fontSize: 25, fontFamily: "Avenir"}}>
                        Send Coins
                    </Text>
                </Button>
                <Button full onPress={() => alert("save")} style={{ 
                    marginTop: 30,
                    height: 50,
                    borderRadius: 30,
                    width: 250,
                    alignSelf: 'center',
                    backgroundColor: "#3E9FFF"
                }}>
                    <Text style={{color: 'white', fontSize: 25, fontFamily: "Avenir"}}>
                        Sell Coins
                    </Text>
                </Button>
                <Button full onPress={() => alert("save")} style={{ 
                    marginTop: 30,
                    height: 50,
                    borderRadius: 30,
                    width: 250,
                    alignSelf: 'center',
                    backgroundColor: "#3E9FFF"
                }}>
                    <Text style={{color: 'white', fontSize: 25, fontFamily: "Avenir"}}>
                        Buy More
                    </Text>
                </Button>
            </ScrollView>

          </View>);
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

    };
}

function mapDispatchToProps(dispatch) {
    return {
        // updateBalances(balances) {
        //     dispatch(updateBalances(balances))
        // }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageCrypto);
