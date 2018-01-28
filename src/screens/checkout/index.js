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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

import {emptyCart} from '../../modules/shopping-cart';

class Checkout extends React.Component {

    state = {
        notes: "",
    };

    constructor() {
        super();
        this.order = this.order.bind(this);
        // this.removeFromCart = this.removeFromCart.bind(this);
    }

    order() {
        this.props.emptyCart();
        alert("Your order has been submitted!");
        this.props.navigation.navigate("Home");
    }
    
    async componentWillMount() {
      
    }

    // async removeFromCart(index) {
    //   this.state.items.splice(index, 1);
    //   this.setState({
    //     items: this.state.items
    //   });
    // }

    async fetchBalance() {

    }

    render() {
        const {navigation, items} = this.props;

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
                backgroundColor: "#56A0ED",
                height: 90,
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
                          top: 35,
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
                      top: 35,
                      textAlign: 'center',
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
                Items: {this.props.items && this.props.items.length}
              </Text>
            </View>

            {/* Scroll! */}
            <KeyboardAwareScrollView style={{
              marginBottom: 50,
              height: WindowDimensions.height
                }}>
              {this.props.items && this.props.items.map((item, i) => {
                return(item.name &&
                  <View
                  animationIn={'fadeIn'}
                  animationOut={'fadeOut'}
                  style= {{
                    backgroundColor: '#fff',
                    width: .9 * WindowDimensions.width,
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
                        marginLeft: 10,
                        justifyContent:'center',
                        alignItems:'center',
                      }}
                      source={item.photo}
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
                        onPress={() => console.log("Would remove...")}
                        style={{
                            width: 50,
                            height: 50,
                            alignSelf: 'center',

                            backgroundColor: '#ccc',
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
                    multiline={true}
                    style={{
                        color: '#000',
                        alignSelf: 'center',
                        marginVertical: 15,
                        textAlign: 'left',
                        fontSize: 18,
                        paddingLeft: 40,
                        paddingTop: 20,
                        borderBottomColor: 'transparent',
                        height: 150,
                        width: .9 * WindowDimensions.width,
                        justifyContent: 'center',
                        backgroundColor: '#fff',
                        borderRadius: 10,
                        shadowColor: '#ccc',
                        shadowOffset: {
                            width: 0,
                            height: 3
                        },
                        shadowRadius: 3,
                        shadowOpacity: 0.7
                    }}
                    placeholderTextColor={"#888"}
                    tintColor={"#000"}
                    ref={'firstName'} 
                    placeholder="Order notes"
                    keyboardType={"default"}
                    onChangeText={(notes) => this.setState({notes})}
                    value={this.state.notes}
                />
               
              </View>
              <View style={{
                marginBottom: 12
              }}>
                <TouchableOpacity
                  onPress={this.order}
                  style={{
                    height: 50,
                    alignSelf: 'center',
                    width: 300,
                    backgroundColor: '#ECBE00',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 60
                }}>
                  <Text style={{
                    padding: 10,
                    backgroundColor: 'transparent',
                    color: '#fff',
                    fontSize: 20,
                    fontFamily: "Avenir-Book"
                  }}>Order</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAwareScrollView>
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
        items: state.shoppingCart.items
    };
}

function mapDispatchToProps(dispatch) {
    return {
        emptyCart() {
            dispatch(emptyCart());
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Checkout);
