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
import {Ionicons, FontAwesome, EvilIcons} from '@expo/vector-icons';

class Checkout extends React.Component {

    state = {
        notes: "",
        items: []
    };

    constructor() {
        super();
        this.removeFromCart = this.removeFromCart.bind(this);
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

    async removeFromCart(index) {
      this.state.items.splice(index, 1);
      this.setState({
        items: this.state.items
      });
    }

    async fetchBalance() {

    }

    render() {
        const {navigation} = this.props;

        const image_width = 95;
        console.log(WindowDimensions.width-image_width);
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
            backgroundColor: "#efefef"
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
                backgroundColor: "#3B5998",
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
                          left: 15,
                          flex: .3,
                          justifyContent: 'flex-start'
                      }}>
                      <Button onPress={() => navigation.goBack(null)} transparent>
                          <Ionicons style={{
                              color: 'white',
                              fontSize: 35,
                              top: 0
                          }} name='ios-arrow-round-back-outline' />

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

            <View style={{
              flexDirection: "row",
              backgroundColor: "#fff",
              height: 60
            }}>
              <Text style={{
                flex: 1,
                alignSelf: "center",
                fontSize: 25,
                fontWeight: "bold",
                fontFamily: "Avenir-Book",
                textAlign: "center",
                textAlignVertical: "center"
              }}>
                Items: {this.state.items.length}
              </Text>
            </View>

            {/* Scroll! */}
            <ScrollView style={{
              marginBottom: 50
            }}>
              {this.state.items && this.state.items.map((item, i) => {
                return(
                  <View
                  animationIn={'fadeIn'}
                  animationOut={'fadeOut'}
                  style= {{
                    backgroundColor: '#fff',
                    width: .95 * WindowDimensions.width,
                    alignSelf: 'center',
                    marginTop: 20,
                    padding: 13,
                    borderRadius: 5,
                    borderColor: "#ccc",
                    justifyContent: 'center',
                    flexDirection: 'row'
                  }} key={i}>
                    <Image style={{
                        width: 60,
                        height: 60,
                        marginRight: 10,
                        justifyContent:'center',
                        alignItems:'center',
                      }}
                      source={{uri: item.image}}
                      />

                    <View style={{
                        width: 200,
                        paddingHorizontal: 20,
                        flexDirection: 'column'
                    }}>
                        <Text style={{
                            color: "#000",
                            fontSize: 16,
                            fontWeight: "bold",
                            fontFamily: "Avenir-Book",
                            justifyContent: 'center',
                            alignItems:'center'
                        }}>{item.name} </Text>
                        {
                        <Text  ellipsizeMode='tail' numberOfLines={2}
                        style={{
                            fontSize: 10
                        }}>{item.description} </Text>}
                    </View>

                    <TouchableOpacity
                        onPress={() => this.removeFromCart(i)}
                        style={{
                            width: 50,
                            height: 50,
                            alignSelf: 'center',

                            backgroundColor: '#3B5998',
                            padding: 0,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 60
                        }}>

                        <Text style={{
                            color: '#fff',
                            fontFamily: 'Avenir-Book',
                            fontSize: 25,
                            backgroundColor: 'transparent',
                            fontWeight: 'bold'
                        }}>-</Text>
                    </TouchableOpacity>
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
                    backgroundColor: "#fff",
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

                    backgroundColor: '#3B5998',
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
