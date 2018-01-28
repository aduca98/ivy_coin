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
        // Will grab param passed to this route but for now...
        this.setState({
            name: "Andrews",
            picture: "http://schwartzsilver.com/wp-content/uploads/2014/01/Andrews-1_bright-640x432.jpg",
            food: [{
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
            <BaseContainer 
                backgroundColor={'#efefef'}
                noHeader={true} {...{ navigation }}>
                <StatusBar
                    barStyle="light-content"
                />
                <LinearGradient 
                    start={[0, 0]}
                    end={[1, 1]}
                    colors={['#fc5959', '#b51818']}
                    style={{
                        bottom: 0,
                        height: 200,
                        width: WindowDimensions.width,
                        borderRadius: 0,
                        backgroundColor: 'gold',
                        justifyContent: 'center',
                        alignSelf: 'center',
                    }}>

                    {/* Header */}
                    <View style={{
                        height: 70,
                        top: -30,
                        padding:0,
                        left:0,
                        width: WindowDimensions.width }}>

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
                                    {/*<Text style={{
                                        color: 'white',
                                        fontSize: 20,
                                        left: 25,
                                        top: -3,
                                    }}>Back</Text>*/}
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
                                    top: 30,
                                    justifyContent: 'flex-start',
                                    fontFamily: 'Avenir-Book'
                                }}>
                                {this.state.name}
                            </Text>

                            <View style={{flex: .3}}></View>

                        </View>

                    </View>
                    
                    <View style={{
                        flex: .25
                    }}>
                        <TextInput 
                                style={[style.input, {
                                    alignSelf: 'center',
                                    color: '#000',
                                    textAlign: 'left',
                                    fontSize: 18,
                                    paddingLeft: 40,
                                    paddingTop: 5,
                                    borderBottomColor: 'transparent',
                                    height: 60,
                                    width: 300,
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

                    
                </LinearGradient>

                <ScrollView> 
                    {this.state.food && this.state.food.map((f, i) => {
                        return( <View style= {{
                                    backgroundColor: '#fff',
                                    width: WindowDimensions.width - 30,
                                    alignSelf: 'center',
                                    marginTop: 20,
                                    padding: 20,
                                    borderRadius: 15,
                                    borderColor: "#ccc",
                                    justifyContent: 'center',
                                    flexDirection: 'row'
                                }} key={i}>
                                    <Image style={{
                                        width: 50,
                                        height: 50,
                                        justifyContent: 'center'
                                    }} source={{uri: f.image}} />
                                    <View style={{
                                        width: 150,
                                        flexDirection: 'column'
                                    }}>
                                        <Text style={{
                                            color: "#000",
                                            fontSize: 17,
                                            fontWeight: "bold",
                                            fontFamily: "Avenir"
                                        }}> {f.name} </Text>
                                        {/*<Text style={{
                                        }}> {f.description} </Text>*/}
                                    </View>
                                    <TouchableOpacity 
                                        onPress={() => alert("Pressed.")}
                                        style={{
                                            width: 100,
                                            backgroundColor: 'brown',
                                            padding: 15,
                                            alignItems: 'center',
                                            borderRadius: 15
                                        }}>

                                        <Text style={{
                                            color: '#fff', 
                                            fontFamily: 'Avenir-Book',
                                            fontSize: 20,
                                        }}>Add</Text>
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