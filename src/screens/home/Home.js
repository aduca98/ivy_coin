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
import {Ionicons, FontAwesome, EvilIcons} from '@expo/vector-icons';

import forceAuth from '../../utils/ForceAuth';
import DinnerSlider from '../../components/dinner-selector/DinnerSlider';

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
    }
    selectCurrency(val) {
        this.setState({
            selectedCurrency: val.currency
        })
    }
    async componentWillMount() {
        
    }
    async fetchBalance() {
        
    }
   
    render() {
      
        const {navigation} = this.props;
        //
        // if(this.state.loading) {
        //     return <Loading />
        // }
        return (<MapView 
                    style={{ 
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                    }}
                    >
                   
                    {/*<StatusBar
                        barStyle="light-content"
                    />*/}
                    {/*<View style={{
                        height: 100,
                        padding:0,
                        top: -10,
                        paddingTop: 20,
                        left:0,
                        backgroundColor: 'red',
                        width: WindowDimensions.width }}>

                        <View style={{
                                flex: .25,
                                flexDirection: 'row',
                            }}>
                            <Left style={{
                                    left: 0,
                                    flex: .25,
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
                                    flex: .5,
                                    height: 50,
                                    textAlign: 'center',
                                    top: 30,
                                    justifyContent: 'flex-start',
                                    fontFamily: 'Avenir-Book'
                                }}>
                                Home 
                            </Text>

                            <View style={{flex: .25}}></View>

                        </View>

                    </View>*/}
                    <View style={{
                        width: WindowDimensions.width,
                        height: 400,
                        bottom: 0,
                        alignSelf: 'flex-end',
                        backgroundColor: '#efefef'
                    }}>
                        <ScrollView
                            horizontal={true}>

                            <View style={{
                                backgroundColor: 'red',
                                width: 150,
                                height: 150,
                                marginRight: 30,
                            }}>
                            </View>

                            <View style={{
                                backgroundColor: 'red',
                                width: 150,
                                height: 150,
                                marginRight: 30,
                            }}>
                            </View>
                            <View style={{
                                backgroundColor: 'red',
                                width: 150,
                                height: 150,
                                marginRight: 30,
                            }}>
                            </View>
                            <View style={{
                                backgroundColor: 'red',
                                width: 150,
                                height: 150,
                            }}>
                            </View>

                        </ScrollView>

                        <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate("Food_Display")}>
                            <Text>See Food</Text>
                            
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate("Deliveries_Display")}>
                            <Text>Deliver Food</Text>
                        </TouchableOpacity>
                        
                    </View>
                        
                </MapView>);
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
)(Home);