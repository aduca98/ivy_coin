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
import dinningHalls from '../../assets/dinning-halls/dinning-halls';

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
        this.activeIndex = this.activeIndex.bind(this);
        this.onRegionChange = this.onRegionChange.bind(this);
    }
    selectCurrency(val) {
        this.setState({
            selectedCurrency: val.currency
        })
    }
    activeIndex(index) {
        alert(index);
    }
    async componentWillMount() {
        return this.setState({
            region: new AnimatedRegion({
                latitude: 41.826544,
                longitude: -71.402698,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            })
        });
    }
    onRegionChange(region) {
        return this.setState({
            region: region
        })
    }
    async fetchBalance() {

    }

    render() {
        const { region } = this.state;
        const {navigation} = this.props;
        //
        // if(this.state.loading) {
        //     return <Loading />
        // }
        return (
          <View style={{
            flex: 1,
            flexDirection: 'column'
          }}>

            <View style={{
                height: 90,
                top: 0,
                backgroundColor: 'red',
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
                            top: 40,
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
                            top: 35,
                            justifyContent: 'flex-start',
                            fontFamily: 'Avenir-Book'
                        }}>
                        Home
                    </Text>
                    <View style={{flex: .3}}></View>

                </View>
            </View>

            <MapView   
                onRegionChange={this.onRegionChange}             
                initialRegion={region}
                style={{
                    flex: 1
                }}>
                { dinningHalls.dinningHalls.map(dh => {
                    return (<MapView.Marker 
                                title={dh.name}
                                coordinate={{
                                    latitude: dh.location.lat,
                                    longitude: dh.location.long
                                }}>
                                <View style={{
                                    alignItems: 'center',
                                }}>
                                    <Image style={{
                                        width: 50,
                                        borderColor: "red",
                                        borderWidth: 2,
                                        height: 50,
                                        borderRadius: 25,
                                    }} source={dh.photo} />
                                    <View style={{
                                        opacity: .6,
                                        top: 5,
                                        width:65,
                                        borderRadius: 5,
                                        paddingHorizontal: 10,
                                        backgroundColor: 'black'
                                    }}>
                                        <Text style={{
                                            fontFamily: 'Avenir',
                                            color: "#FFF",
                                            textAlign: 'center',
                                            fontSize: 11,
                                        }}>{dh.name}</Text>
                                    </View>
                                </View>
                            </MapView.Marker>);
                })}
            </MapView>
            <View style={{
                    height: 300
                }}>
                <DinnerSlider
                    activeIndex={this.activeIndex}
                    dinninghalls={dinningHalls.dinningHalls}
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
                />
            </View>
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
)(Home);
