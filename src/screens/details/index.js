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

class FoodDisplay extends React.Component {

    state = {
        name: "",
        picture: "",
        food: []
    };

    constructor() {
        super();
    }

    async componentWillMount() {
                
        return this.setState({
            name: "Andrew Duca",
            phone: "",
            facebook: "",
            food: [
                {
                    name: "Cheese Pizza",
                    description: "fresh dough from our bakeshop, house-made sauce, and a blend of cheeses, hearth-baked for a perfect slice",
                    tags: ["Cheese Pizza", "lunch", "dinner", "vegetarian"],
                    photo: require('../../assets/dinning-halls/images/cheesePizza.jpg')
                },
                {
                    name: "Pepperoni & Meatball",
                    description: "classic peperoni with house made meatballs",
                    tags: ["Pepperoni & Meatball", "dinner"],
                    photo: require('../../assets/dinning-halls/images/pepPizza.jpg')
                },
            ]
        });
        

        // Will grab param passed to this route but for now...
        // this.setState({
        //     name: "Andrews",
        //     picture: "http://schwartzsilver.com/wp-content/uploads/2014/01/Andrews-1_bright-640x432.jpg",
        //     food: [{
        //         name: "Cheeseburger",
        //         description: "What Andrew always uses for displaying random shit, I don't personally get it but ah well",
        //         image: "http://healthsupple.org/images/burger.jpg"
        //     }, {
        //         name: "Cheeseburger",
        //         description: "burger",
        //         image: "http://healthsupple.org/images/burger.jpg"
        //     }, {
        //         name: "Cheeseburger",
        //         description: "burger",
        //         image: "http://healthsupple.org/images/burger.jpg"
        //     }, {
        //         name: "Cheeseburger",
        //         description: "burger",
        //         image: "http://healthsupple.org/images/burger.jpg"
        //     }, {
        //         name: "Cheeseburger",
        //         description: "burger",
        //         image: "http://healthsupple.org/images/burger.jpg"
        //     }, {
        //         name: "Cheeseburger",
        //         description: "burger",
        //         image: "http://healthsupple.org/images/burger.jpg"
        //     }]
        // });
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
                    height: 250,
                    left:0,
                    width: WindowDimensions.width + 10}}>

                    <View style={[StyleSheet.absoluteFill, {opacity: 0.6, backgroundColor: "#000"}]} />
                    <Image style = {[StyleSheet.absoluteFill, {
                            top:0,
                            justifyContent: 'center',
                            height: 250,
                            zIndex: -100,
                            position: 'absolute',
                            width: WindowDimensions.width,
                        }]} source = {require('../../assets/dinning-halls/images/Andrews.jpg')}>
                    </Image>

                    <View style={{
                            flex: .25,
                            flexDirection: 'row'
                        }}>
                        <Left style={{
                                left: 0,
                                flex: .3,
                                top: 35,
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
                            Details
                        </Text>

                        <View style={{
                            right: 25,
                            flex: .3,
                            backgroundColor: 'transparent',
                            top: -5,
                            alignItems: 'right',
                            justifyContent: 'flex-end'}}>
                        </View>

                    </View>
                    <View style={{
                            alignItems: 'center',
                            width: WindowDimensions.width - 100,
                            flexDirection: 'row',
                            alignSelf: 'center'
                        }}>
                        <Image style={{
                            width: 80,
                            height: 80,
                            borderColor: "#ccc",
                            borderWidth: 2,
                            borderRadius: 40,
                            top: 50,
                        }} source={{uri: "http://www.math.uni-frankfurt.de/~person/_4170854.jpg"}} />
                        <View style={{
                            top: 60,
                            marginLeft: 20,
                            flexDirection: 'column'
                        }}>
                            <Text style={{
                                backgroundColor: 'transparent',
                                fontSize: 20,
                                fontWeight: "bold",
                                color: 'white'
                            }}> Andrew Duca </Text>
                            <TouchableOpacity>
                                <Text style={{
                                    backgroundColor: 'transparent',
                                    top: 5,
                                    color: '#ccc'
                                }}> (858)-999-7892 </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{
                                width: 150,
                                height: 40,
                                marginTop: 15,
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingVertical: 5,
                                backgroundColor: '#3B5998',
                                borderRadius: 50,
                            }}>
                                <Text style={{
                                    backgroundColor: 'transparent',
                                    color: 'white',
                                    fontFamily: 'Avenir',
                                    fontWeight: "bold",
                                    fontSize: 20
                                }}> Facebook </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            
                <ScrollView>
                    <Text style={{
                        marginLeft: 15,
                        fontSize: 20,
                        top: 10,
                        paddingVertical: 20,
                        fontWeight: 'bold',
                    }}>
                        Dinning Hall: Andrew's Commons
                    </Text>
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
                                    <TouchableOpacity
                                        onPress={() => alert("Pressed.")}
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
                                            fontSize: 25,
                                            backgroundColor: 'transparent',
                                            fontWeight: 'bold'
                                        }}>1x</Text>
                                    </TouchableOpacity>
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
)(FoodDisplay);
