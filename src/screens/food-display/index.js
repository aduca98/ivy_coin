// @flow
import moment from "moment";
import autobind from 'autobind-decorator';
import * as React from "react";
import {StatusBar, ScrollView, TextInput, Text, Image, StyleSheet, View, TouchableOpacity} from "react-native";
import {H1, Button, Left, Header} from "native-base";
import { LinearGradient } from 'expo';
import {BaseContainer, Circle, Styles, Images, WindowDimensions} from "../../components";
import variables from "../../assets/native-base-theme/variables/commonColor";
import Loading from '../../components/Loading';
import {connect} from 'react-redux';
import {Ionicons, FontAwesome, EvilIcons} from '@expo/vector-icons';

import dinningHalls from '../../assets/dinning-halls/dinning-halls';
import ShoppingCart from '../../components/ShoppingCart';
import {addToCart, removeFromCart} from '../../modules/shopping-cart';
var _ = require('lodash');

class FoodDisplay extends React.Component {

    state = {
        name: "",
        picture: "",
        food: [],
        // Really shitty way to do this
        takenIndexs: []
    };

    constructor() {
        super();
        this.addToCart = this.addToCart.bind(this);
        this.isInCart = this.isInCart.bind(this);
    }

    async componentWillMount() {
        
        const index = this.props.navigation.state.params.dinningHall;
        return this.setState({
            name: dinningHalls.dinningHalls[index].name,
            picture: dinningHalls.dinningHalls[index].photo,
            food: dinningHalls.dinningHalls[index].food,
        });
    }

    addToCart(item) {
        this.props.addToCart(item);
    }
    removeFromCart(item) {
        this.props.removeFromCart(item);
    }
    isInCart(item) {
        for(var i = 0; i < this.props.items; i++) {
            if(_.isEqual(item.name, this.props.items[i].name)) {
                return true;
            }
        }
        return false;
    }

    render() {

        const {navigation} = this.props;

        // if(this.state.loading) {
        //     return <Loading />
        // }
        return (
            <BaseContainer
                backgroundColor={'#efefef'}
                noHeader={true} {...{ navigation }}>
                <StatusBar
                    barStyle="dark-content"
                />
            
                {/* Header */}
                <View style={{
                    padding:0,
                    height: 300,
                    left:0,
                    width: WindowDimensions.width + 10}}>

                    <View style={[StyleSheet.absoluteFill, {opacity: 0.6, backgroundColor: "#000"}]} />
                    <Image style = {[StyleSheet.absoluteFill, {
                            top:0,
                            justifyContent: 'center',
                            height: 300,
                            zIndex: -100,
                            position: 'absolute',
                            width: WindowDimensions.width,
                        }]} source = {this.state.picture}>
                    </Image>
                    
                    <View style={{
                            flex: .25,
                            flexDirection: 'row'
                        }}>
                        <Left style={{
                                left: 0,
                                flex: .3,
                                top: 15,
                                justifyContent: 'flex-start'
                            }}>
                            <Button onPress={() => navigation.goBack(null)} transparent>
                                <Ionicons style={{
                                    color: 'white',
                                    fontSize: 35,
                                    left: 15,
                                    top: 0
                                }} name='ios-arrow-round-back-outline' />
                                
                            </Button>
                        </Left>

                        <Text
                            style={{
                                backgroundColor: 'transparent',
                                fontSize: 25,
                                color: '#fff',
                                flex: .4,
                                height: 50,
                                textAlign: 'center',
                                top: 35,
                                justifyContent: 'flex-start',
                                fontFamily: 'Avenir-Book'
                            }}>
                            {this.state.name}
                        </Text>

                        <View style={{
                            right: 25,
                            flex: .3,
                            backgroundColor: 'transparent',
                            top: -5,
                            alignItems: 'right',
                            justifyContent: 'flex-end'}}>
                            <ShoppingCart navigation={this.props.navigation} />
                        </View>

                    </View>

                    <TextInput
                        style={[style.input, {
                            position: 'absolute',
                            alignSelf: 'center',
                            color: '#000',
                            textAlign: 'left',
                            fontSize: 18,
                            paddingLeft: 40,
                            top: 200,
                            paddingTop: 10,
                            paddingBottom: 10,
                            borderBottomColor: 'transparent',
                            height: 50,
                            width: 330,
                            justifyContent: 'center',
                            backgroundColor: '#fff',
                            borderRadius: 30,
                        }]}
                        returnKeyLabel='Done'
                        returnKeyType='done'
                        placeholderTextColor={"#888"}
                        tintColor={"#000"}
                        ref={'amount'}
                        placeholder="Search..."
                        keyboardType={"default"}
                        value = {this.state.amount}
                        onChangeText={(val) => this._onChangeAmount(val)}
                    />
                </View>
            
                <ScrollView>
                    {this.state.food && this.state.food.map((f, i) => {
                        return(f.photo && <View style= {{
                                    backgroundColor: '#fff',
                                    width: WindowDimensions.width - 35,
                                    alignSelf: 'center',
                                    marginTop: 20,
                                    padding: 15,
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

                                    }} source={f.photo} />
                                    <View style={{
                                        width: 200,
                                        paddingHorizontal: 25,
                                        flexDirection: 'column'
                                    }}>
                                        <Text style={{
                                            color: "#000",
                                            fontSize: 16,
                                            fontWeight: "bold",
                                            fontFamily: "Avenir",
                                            justifyContent: 'center',
                                            alignItems:'center'
                                        }}>{f.name} </Text>
                                        {
                                        <Text  ellipsizeMode='tail' numberOfLines={2}
                                        style={{
                                            fontSize: 10
                                        }}>{f.description} </Text>}
                                    </View>
                                    {!this.isInCart(f) && <TouchableOpacity
                                        onPress={() => this.addToCart(f)}
                                        style={{
                                            width: 50,
                                            height: 50,
                                            alignSelf: 'center',

                                            backgroundColor: '#ECBE00',
                                            padding: 0,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: 60
                                        }}>

                                        <Text style={{
                                            color: '#fff',
                                            fontFamily: 'Avenir-Book',
                                            fontSize: 35,
                                            backgroundColor: 'transparent',
                                            fontWeight: 'bold'
                                        }}>+</Text>
                                    </TouchableOpacity>}
                                    {this.isInCart(f) && <TouchableOpacity
                                        onPress={() => this.removeFromCart(f)}
                                        style={{
                                            width: 50,
                                            height: 50,
                                            alignSelf: 'center',
                                            backgroundColor: 'red',
                                            padding: 0,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: 60
                                        }}>

                                        <Text style={{
                                            color: '#fff',
                                            fontFamily: 'Avenir-Book',
                                            fontSize: 35,
                                            backgroundColor: 'transparent',
                                            fontWeight: 'bold'
                                        }}>-</Text>
                                    </TouchableOpacity>}

                                </View>)
                    })}
                </ScrollView>
            </BaseContainer>);
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
        addToCart(item) {
            dispatch(addToCart(item))
        },
        removeFromCart(item) {
            dispatch(removeFromCart(item))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FoodDisplay);
