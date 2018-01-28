// @flow
import moment from "moment";
import autobind from 'autobind-decorator';
import * as React from "react";
import {TextInput, StatusBar, ScrollView, FlatList, Text, Image, StyleSheet, View, TouchableOpacity} from "react-native";
import {H1, Button, Left, Header} from "native-base";
import { LinearGradient } from 'expo';
import {BaseContainer, Circle, Styles, Images, WindowDimensions} from "../../components";
import variables from "../../assets/native-base-theme/variables/commonColor";
import Loading from '../../components/Loading';
import {connect} from 'react-redux';
import {FontAwesome, EvilIcons} from '@expo/vector-icons';

class Checkout extends React.Component {

    state = {
        notes: "",
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
              name: "Big Burger Deluxe Number 7",
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
          <View style={{
            backgroundColor: "#FFFFFF"
          }}>
            {/* Header */}
            <LinearGradient
              start={[0, 0]}
              end={[0, 0]}
              colors={['#fc5959', '#b51818']}
              style={{
                  width: WindowDimensions.width,
                  borderRadius: 0,
                  backgroundColor: 'gold',
                  justifyContent: 'center',
                  alignSelf: 'center',
            }}>
              <View style={{
                backgroundColor: "red",
                height: 45,
                padding:0,
                left:0,
                width: WindowDimensions.width
              }}>

                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                  {/* Nav button */}
                  <Left style={{
                    flex: .3,
                  }}>
                    <Button onPress={() => navigation.navigate("DrawerOpen")} transparent>
                      <Image style={{
                        width: 35,
                        height: 25,
                        left: 15
                      }} source={require('../../assets/menu.png')} />
                    </Button>
                  </Left>

                  {/*  Title */}
                  <Text
                    style={{
                      backgroundColor: 'transparent',
                      fontSize: 25,
                      color: '#fff',
                      flex: .4,

                      textAlign: 'center',
                      top: 0,
                      justifyContent: 'flex-start',
                      fontFamily: 'Avenir-Book'
                  }}>
                    Cart
                  </Text>

                  <View style={{flex: .3}}></View>
                </View>
              </View>
            </LinearGradient>

            {/* Scroll! */}
            <ScrollView style={{
              marginBottom: 50
            }}>
              {this.state.items && this.state.items.map((item, i) => {
                return(
                  <View style= {{
                    padding: 5,
                    flexDirection: "row",
                    borderBottomWidth: .5,
                    borderColor: "#B1B1B1"
                  }} key={i}>
                    <View style={{
                      padding: 8
                    }}>
                      <Image style={{
                          width: 95,
                          height: 85,
                          justifyContent:'center',
                          alignItems:'center',
                        }}
                        source={{uri: item.image}}
                        />
                    </View>

                    <View style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: 2,
                      flexGrow: 1
                    }}>
                      <Text
                        adjustsFontSizeToFit={true}
                        numberOfLines={1}
                        style={{
                          padding: 3,
                          fontFamily: "Avenir-Book",
                          fontSize: 20,
                          width: 145
                        }}
                      >
                        {item.name}
                      </Text>

                      {/* Button */}
                      <TouchableOpacity
                        onPress={() => alert("Pressed.")}
                        style={{
                          height: 40,
                          alignSelf: 'flex-end',

                          backgroundColor: 'brown',
                          padding: 0,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 60
                      }}>
                        <Text style={{
                          padding: 10,
                          color: '#fff',
                          fontSize: 20,
                          fontFamily: "Avenir-Book"
                        }}>Remove</Text>
                      </TouchableOpacity>
                    </View>
                  </View>)
              })}
              <View style={{
                height: 236,
              }}>
                <TextInput
                  onChangeText={(notes) => this.setState({notes})}
                  value={this.state.notes}
                  multiline={true}
                  placeholder="Notes for your order"
                  underlineColorAndroid="#FFFFFF"
                  style={{
                    textAlignVertical: "top",
                    height: 200,
                    margin: 18,
                    borderColor: "#B1B1B1",
                    borderWidth: .5,
                    padding: 4
                }}/>
              </View>
              <View style={{
                marginBottom: 12
              }}>
                <TouchableOpacity
                  onPress={() => alert("Pressed.")}
                  style={{
                    height: 40,
                    alignSelf: 'center',

                    backgroundColor: 'brown',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 60
                }}>
                  <Text style={{
                    padding: 10,
                    color: '#fff',
                    fontSize: 20,
                    fontFamily: "Avenir-Book"
                  }}>Order</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
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
