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
import {SignUp} from "./src/screens/sign-up";

import {Walkthrough} from "./src/screens/walkthrough";
import {Drawer} from "./src/components/drawer";
import {Home} from "./src/screens/home";
import {Calendar} from "./src/screens/calendar";
import {Overview} from "./src/screens/overview";
import {Groups} from "./src/screens/groups";
import {Lists} from "./src/screens/lists";
import {Profile} from "./src/screens/profile";
import {Transactions} from "./src/screens/transactions";
import {Settings} from "./src/screens/settings";
import {Create} from "./src/screens/create";
import {BuyCrypto} from "./src/screens/buy-crypto";
import {SendCrypto} from "./src/screens/send-money";
import ChooseContact from './src/screens/send-money/ChooseContact';
import Quests from './src/screens/quests';
import AddCard from './src/screens/add-card';

import AuthChoose from './src/screens/auth';

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
        super()
        this._handleUrl = this._handleUrl.bind(this);
        this._addLinkingListener = this._addLinkingListener.bind(this);
    }
    _handleUrl = (url) => {
        alert(url);

        this.setState({ url });
        let queryString = url.replace(Constants.linkingUri, '');
        if (queryString) {
            let data = qs.parse(queryString);
            alert(`Linked to app with data: ${JSON.stringify(data)}`);
        }
    }
    _addLinkingListener = () => {
        console.log('adding listener.');
        Linking.addEventListener('url', this._handleUrl);
    };
    componentDidMount() {
        Linking.getInitialURL().then((url) => {
            if (url) {
            console.log('Initial url is: ' + url);
            }
        }).catch(err => console.error('An error occurred', err));
    }
    componentWillMount() {
        this._addLinkingListener();
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
    AuthChoose: { screen: AuthChoose },
    SignUp: { screen: SignUp },
    Login: { screen: Login }
}, {
    initialRouteName: "AuthChoose",
    headerMode: 'none'
});

const DrawerNavigation = DrawerNavigator({
    Home: { screen: Home },
    // Overview: { screen: Overview },
    Transactions: { screen: Transactions },
    Buy_Crypto: { screen: BuyCrypto },
    Create: { screen: Create },
    Send_Crypto: { screen: SendCrypto },
    Profile: { screen: Profile },
}, {
    drawerWidth: 300,
    contentComponent: Drawer,
    initialRouteName: "Home",
    headerMode: "none",
});

const FullNavigator = StackNavigator({
    Auth: { screen: AuthNavigation },
    Walkthrough: { screen: Walkthrough },
    Main: { screen: DrawerNavigation },

    // Stack views
    Choose_Contact: { screen: ChooseContact },
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
    Quests: { screen: Quests },
    Add_Card: { screen: AddCard },
}, {
    mode: "modal",
    headerMode: "none",
    initialRouteName: "FullNavigator"
});

export {AppNavigator}


