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

class Checkout extends React.Component {

    state = {
        items: []
    };

    constructor() {
        super();
    }

    async componentWillMount() {
      this.setState({
          items: [{
              name: "Cheeseburger",
              description: "burger",
              image: "http://healthsupple.org/images/burger.jpg"
          }, {
              name: "Cheeseburger",
              description: "burger",
              image: "http://healthsupple.org/images/burger.jpg"
          }, {
              name: "Cheeseburger",
              description: "burger",
              image: "http://healthsupple.org/images/burger.jpg"
          }, {
              name: "Cheeseburger",
              description: "burger",
              image: "http://healthsupple.org/images/burger.jpg"
          }, {
              name: "Cheeseburger",
              description: "burger",
              image: "http://healthsupple.org/images/burger.jpg"
          }, {
              name: "Cheeseburger",
              description: "burger",
              image: "http://healthsupple.org/images/burger.jpg"
          }]
      });
    }

    async fetchBalance() {

    }

    render() {

        const {navigation} = this.props;

        // if(this.state.loading) {
        //     return <Loading />
        // }
        return (
          /*
          <BaseContainer
              backgroundColor={'#efefef'}
              noHeader={true} {...{ navigation }}>
              <StatusBar
                  barStyle="light-content"
              />*/
            <View>
              // Header


              



            </View>

            /*</BaseContainer>*/);
    }
}
function cacheImages(images) {
    return images.map(image =>
    Expo.Asset.fromModule(image).downloadAsync());
}

const style = StyleSheet.create({

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
)(Checkout);
