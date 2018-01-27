// @flow
import moment from "moment";
import autobind from 'autobind-decorator';
import * as React from "react";
import {StatusBar, ScrollView, Text, Image, StyleSheet, View, TouchableOpacity} from "react-native";
import {H1, Button, Left, Header} from "native-base";
import { LinearGradient } from 'expo';
import {BaseContainer, Circle, Styles, Images, WindowDimensions} from "../../components";
import variables from "../../assets/native-base-theme/variables/commonColor";
import Loading from '../../components/Loading';
import {connect} from 'react-redux';
import {FontAwesome, EvilIcons} from '@expo/vector-icons';

import forceAuth from '../../utils/ForceAuth';

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
        return (
            <BaseContainer 
                backgroundColor={'#0B1823'}
                noHeader={true} {...{ navigation }}>
                
                {/*<InAppNotification />*/}
                <StatusBar
                    barStyle="light-content"
                />
                <Text style={{
                    color: "#FFF",
                    fontSize: 57,
                    top:30,
                    alignSelf: 'center'
                }}> Home </Text>
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