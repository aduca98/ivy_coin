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

import forceAuth from '../../utils/ForceAuth';
import DinnerSlider from '../../components/dinner-selector/DinnerSlider';
import ShoppingCart from '../../components/ShoppingCart';
import dinningHalls from '../../assets/dinning-halls/dinning-halls';

const { width, height } =  WindowDimensions.height;

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)",
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)",
  },
});

class Home extends React.Component {

    state = {
        notification: {},
        loading: true,
        selectedIndex: 0
    };

    constructor() {
        super();
        this.selectCurrency = this.selectCurrency.bind(this);
        this.activeIndex = this.activeIndex.bind(this);
        this.onRegionChange = this.onRegionChange.bind(this);
        this.navDeliver = this.navDeliver.bind(this);
        this.navOrder = this.navOrder.bind(this);
    }
    selectCurrency(val) {
        this.setState({
            selectedCurrency: val.currency
        })
    }
    activeIndex(index) {
        var dh = dinningHalls.dinningHalls[index];
        var lat = dh.location.lat;
        var long = dh.location.long;
        this.map.animateToRegion(
            {
              latitude: lat,
              longitude: long,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            },
            300
        );
        this.setState({
            selectedIndex: index
        })
    }

    async navOrder() {
        return this.props.navigation.navigate("Food_Display", { dinningHall: this.state.selectedIndex });
    }
    async navDeliver() {
        return this.props.navigation.navigate("Deliveries_Display", { dinningHall: this.state.selectedIndex });
    }
    async componentWillMount() {
        return this.setState({
            region: new MapView.AnimatedRegion({
                latitude: 41.826544,
                longitude: -71.402698,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            })
        });
        this.animation = new Animated.Value(0);
    }
    onRegionChange(region) {
        return this.setState({
            region: region
        })
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
                        Home
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

            <MapView
                ref={map => this.map = map}
                onRegionChange={this.onRegionChange}
                initialRegion={region}
                style={{
                    flex: 1
                }}>
                { dinningHalls.dinningHalls.map(dh => {
                    return (<MapView.Marker
                                key = {dh.name}
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
                                        borderColor: "#dc2430",
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

                <DinnerSlider
                    activeIndex={this.activeIndex}
                    dinninghalls={dinningHalls.dinningHalls}
                    style={{
                        backgroundColor: "transparent",
                        flex: 1,
                        alignItems: 'center',
                    }}
                    arrowColor={"black"}
                    textStyle={{
                        justifyContent:'center',
                        marginLeft: -10,
                        color: 'white',
                        marginBottom: 40
                    }}
                    index={this.state.selectedIndex}
                    buttons={true}
                />

                <View style={{
                        flexDirection: 'row',
                        backgroundColor: 'transparent',//'#56A0ED',
                        alignItems: 'center',
                        paddingVertical: 10,
                        height:20,
                        top:0,
                        paddingBottom: 40,
                    }}>
                    <View style={{
                            alignItems: 'center',
                            flex: .5,
                        }}>
                        <TouchableOpacity
                            onPress={() => this.navOrder()}
                            style={{
                                width: 155,
                                paddingTop: 10,
                                paddingBottom: 10,
                                flexDirection: 'row',
                                borderRadius: 35,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <MaterialCommunityIcons
                                style={{
                                    fontSize: 25,
                                    marginRight: 10,
                                    color: 'white',
                                }}
                                name="food" />
                            <Text
                                style={{
                                backgroundColor: 'transparent',
                                fontSize: 17,
                                fontWeight: 'bold',
                                color: 'white',
                                fontFamily: 'Avenir-Book'
                                }}>
                                Order
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                            alignItems: 'center',
                            flex: .5
                        }}>
                        <TouchableOpacity
                            onPress={() => this.navDeliver()}
                            style={{
                                width: 155,
                                paddingTop: 10,
                                paddingBottom: 10,
                                borderRadius: 35,
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'row',
                            }}>
                            <MaterialCommunityIcons
                                style={{
                                    fontSize: 25,
                                    color: 'white',
                                    marginRight: 10
                                }}
                                name="truck" />

                            <Text
                                style={{
                                    backgroundColor: 'transparent',
                                    fontSize: 17,
                                    fontWeight: 'bold',
                                    color: 'white',
                                    fontFamily: 'Avenir-Book'
                                }}>
                                Deliver
                            </Text>
                        </TouchableOpacity>
                    </View>
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
