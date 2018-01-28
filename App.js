// @flow
import * as React from "react";
import {Dimensions, Linking, Animated} from "react-native";
import {StyleProvider} from "native-base";
import {StackNavigator, DrawerNavigator} from "react-navigation";
import {Font, AppLoading} from "expo";
import { Provider } from 'react-redux';
import axios from 'axios';
import autobind from 'autobind-decorator';
import { Constants } from 'expo';

import {Images} from "./src/components";
import {Login} from "./src/screens/login";

import {Drawer} from "./src/components/drawer";
import {Home} from "./src/screens/home";
import {Profile} from "./src/screens/profile";
import {Settings} from "./src/screens/settings";
// import {BuyCrypto} from "./src/screens/buy-crypto";
import AddCard from './src/screens/add-card';
import FoodDisplay from './src/screens/food-display';
import DeliveriesDisplay from './src/screens/deliveries-display';
import Checkout from './src/screens/checkout';

import getTheme from "./src/assets/native-base-theme/components";
import variables from "./src/assets/native-base-theme/variables/commonColor";

import reducers from './src/modules';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger'

const store = createStore(
    reducers,
    applyMiddleware(logger));

// Configure root api url
import config from './src/config';
axios.defaults.baseURL = config.apiUrl;

export default class App extends React.Component {

    constructor() {
        super();
    }

    componentDidMount() {

    }
    componentWillMount() {
        this.setState({ ready: false });
        const promises = [];
        promises.push(
            Font.loadAsync({
                "Avenir-Book": require("./src/assets/fonts/Avenir-Book.ttf"),
                "Avenir-Light": require("./src/assets/fonts/Avenir-Light.ttf")
            })
        );
        Promise.all(promises.concat(Images.downloadAsync()))
            .then(() => this.setState({ ready: true }))
            // eslint-disable-next-line
            .catch(error => console.error(error))
        ;
    }

    render() {
        const {ready} = this.state;
        return <StyleProvider style={getTheme(variables)}>
            {
                ready ?
                    <Provider store={store}>
                        <AppNavigator onNavigationStateChange={() => undefined}>
                        </AppNavigator>
                    </Provider>
                :
                    <AppLoading startAsync={null} onError={null} onFinish={null} />
            }
        </StyleProvider>;
    }
}

const AuthNavigation = StackNavigator({
    Login: { screen: Login }
}, {
    initialRouteName: "AuthChoose",
    headerMode: 'none'
});

const DrawerNavigation = DrawerNavigator({
    Home: { screen: Home },
    Profile: { screen: Profile },
    FoodDisplay: { screen: FoodDisplay },
    DeliveriesDisplay: { screen: DeliveriesDisplay },
    Checkout: { screen: Checkout }
}, {
    drawerWidth: 300,
    contentComponent: Drawer,
    initialRouteName: "Home",
    headerMode: "none",
});

const FullNavigator = StackNavigator({
    Auth: { screen: AuthNavigation },
    Main: { screen: DrawerNavigation },

    // Stack views
}, {
    headerMode: "none",
    cardStyle: {
        backgroundColor: "white"
    },
    initialRouteName: "Main",
});

const AppNavigator = StackNavigator({
    FullNavigator: { screen: FullNavigator },

    // Modals
    Food_Display: { screen: FoodDisplay },
    Deliveries_Display: { screen: DeliveriesDisplay },
    Checkout: { screen: Checkout }
}, {
    mode: "modal",
    headerMode: "none",
    initialRouteName: "FullNavigator"
});

export {AppNavigator}
