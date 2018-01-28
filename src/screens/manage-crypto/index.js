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

class ManageCrypto extends React.Component {

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
                        Manage Crypto
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
