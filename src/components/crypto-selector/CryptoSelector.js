// @flow
import * as React from "react";
import autobind from 'autobind-decorator';
import {View, Text, SafeAreaView, Image} from "react-native";
import {Header, Body, Left, Right, Title, Button} from "native-base";
import CarouselCard from "react-native-card-carousel";
import { Asset, AppLoading } from 'expo';

import IntroCard from "./IntroCard";

import {Styles, NavigationHelpers} from "../../components";

import variables from "../../assets/native-base-theme/variables/commonColor";
import UserService from '../../api/UserService';

export default class CryptoSelector extends React.Component {

    state = {
        loading: true,
    }

    @autobind
    home() {
        NavigationHelpers.reset(this.props.navigation, "Main");
    }

    render() {
        return (<View style={{height: 300}}>
                <CarouselCard
                    height={300}
                    data={this.props.balances}
                    onPress={this.props.selectCurrency}
                    contentRender = {(b) => <IntroCard color={(this.props.selected == b.currency) ? "#e6ebf1" : "#FFF"} 
                                                       balance={b} />}
                />
            </View>);
        
    }
}
