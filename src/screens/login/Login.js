// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {
    View, 
    Image, 
    StyleSheet, 
    SafeAreaView, 
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    StatusBar
} from "react-native";
import {H1, Button, Header, Left, Right, Body, Icon, Title, Input, Content} from "native-base";
import {Ionicons} from '@expo/vector-icons';
import {Styles, Images, Field, NavigationHelpers, Container,WindowDimensions} from "../../components";
import {Constants} from "expo";
import * as Animatable from 'react-native-animatable';
import {MaterialIcons} from '@expo/vector-icons';
import {AnimatedView} from "../../components/Animations";
import variables from "../../assets/native-base-theme/variables/commonColor";

import Storage from '../../api/Storage';
import {TextInputMask} from 'react-native-masked-text'
import Loading from '../../components/Loading';

export default class Login extends React.Component {

    state = {
        email: "",
        password: "",
        allowed: false,
        errorMessage: "",
        loading: false
    }
    
    constructor() {
        super();
        this.updateInput = this.updateInput.bind(this);
        this.goToPassword = this.goToPassword.bind(this);
        this.signUp = this.signUp.bind(this);
        this.next = this.next.bind(this);
        this.login = this.login.bind(this);
    }
    async componentWillMount() {
        
        cacheImages([
            require('../../assets/logo.png'),
        ]);
        if(jwt) {
            this.props.navigation.navigate("Home");
        }
    }
    updateInput(type, val) {
        var u = {}
        u[type] = val;
        this.setState(u)
    }
    goToPassword() {
        this.password.focus();
    }
    next() {
        this.setState({
            enteredPhone: true
        })
    }
    async login() {
        // this.setState({
        //     loading: true
        // })
        this.props.navigation.navigate("Home");
    }
    render() {
        // if(this.state.loading) {
        //     return <Loading />
        // }
        return (<Container style={{
                backgroundColor: '#071B38'
            }} safe={false}>

            <StatusBar 
                barStyle="light-content" />

            <Header style={{
                backgroundColor: 'transparent'
            }} noShadow>
                <Left>
                    <Button onPress={() => { this.props.navigation.goBack(null) }} transparent>
                        <Ionicons style={{
                            color: 'white',
                            fontSize: 35,
                            left: 15,
                            top: 20
                        }} name='ios-arrow-round-back-outline' />
                        <Text style={{
                            color: 'white',
                            fontSize: 20,
                            left: 25,
                            top: 20,
                        }}>Back</Text>
                    </Button>
                </Left>
               
                <Right />
            </Header>
            <Content style={[style.content]}>
                <View style={{
                    alignItems: 'center'
                }}>
                    <Image style={{
                        width: 200,
                        alignItems: 'center',
                        height: 200,
                        top: 0
                    }} source={require('../../assets/logo.png')} />
                </View>
                {(this.state.errorMessage != "") && 
                    <View style={{
                        alignItems: 'center',
                        flex: 1,
                    }}>
                        <View style={{
                            marginTop: 50,
                            backgroundColor: 'transparent',
                            width: 300,
                            borderRadius: 10,
                            padding: 30,
                            height: 50,
                            justifyContent: 'center'
                        }}>
                            <Text style={{
                                color: '#FF6462',
                                textAlign: 'center',
                                fontSize: 25
                            }}>{this.state.errorMessage}</Text>
                        </View>
                    </View>}
                
                <TextInput style={{
                        height: 50,
                        fontSize: 25,
                        flex: 1,
                        top: 0,
                        marginBottom: 0,
                        // marginLeft: (WindowDimensions.width / 2) - 35,
                        color: "#FFF",
                        textAlign: 'center',
                        backgroundColor: 'transparent',
                    }}
                    onSubmitEditing={() => this.refs["password"].focus() }
                    placeholderTextColor={"#888"}
                    tintColor={"#FFF"}
                    placeholder="Email"
                    ref="email" 
                    keyboardType={"email-address"} 
                    returnKeyLabel='Done' 
                    returnKeyType='done'
                    value={this.state.email} 
                    onChangeText={(e) => {this.setState({
                                                email: e
                                          })}} />
               <TextInput style={{
                        height: 50,
                        fontSize: 25,
                        flex: 1,
                        marginBottom: 20,
                        // marginLeft: (WindowDimensions.width / 2) - 35,
                        color: "#FFF",
                        textAlign: 'center',
                        backgroundColor: 'transparent',
                    }}
                    secureTextEntry={true}
                    placeholderTextColor={"#888"}
                    tintColor={"#FFF"}
                    placeholder="Password"
                    ref="password" 
                    onSubmitEditing={this.login}
                    returnKeyLabel='Done' 
                    returnKeyType='done'
                    value={this.state.password} 
                    onChangeText={(e) => {this.setState({
                                                password: e
                                          })}} />                    
                <View style={{
                    alignItems: 'center',
                    top: 30
                }}>
                    <TouchableOpacity 
                        onPress={this.login}
                        style={{
                            width: 300,
                            backgroundColor: (this.state.password && this.state.email) ? '#EAA73B' : "#ccc",
                            padding: 15,
                            alignItems: 'center',
                            borderRadius: 5
                        }}>

                        <Text style={{
                            color: '#fff', 
                            fontFamily: 'Avenir-Book',
                            fontSize: 20,
                        }}>Log In</Text>
                    </TouchableOpacity>
                    
                </View>
                
            </Content>
        </Container>);
    }
}

function cacheImages(images) {
    return images.map(image => Expo.Asset.fromModule(image).downloadAsync());
}

const {height, width} = WindowDimensions;
const style = StyleSheet.create({
    img: {
        height,
        width
    },
    content: {
        flex: 1
    },
    logo: {
        alignSelf: "center",
        marginBottom: variables.contentPadding,
        marginTop: variables.contentPadding
    },
    title: {
        marginTop: variables.contentPadding,
        color: "white",
        textAlign: "center"
    },
    blur: {
        backgroundColor: "rgba(255, 255, 255, .2)"
    }
});
