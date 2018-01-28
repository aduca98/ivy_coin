// @flow
import * as React from "react";
import {TextInput, StatusBar, ScrollView, Text, Image, StyleSheet, View, TouchableOpacity} from "react-native";
import {H1, Button, Left, Header} from "native-base";
import {WindowDimensions, BaseContainer, Avatar, TaskOverview, Small, Styles, Task} from "../../components";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import {connect} from 'react-redux';
import {MapView} from 'expo';

import variables from "../../assets/native-base-theme/variables/commonColor";
import {addFullUser} from '../../modules/user';

class Profile extends React.Component {
    
    state = {
        pictureUrl: "",
        // Just in case you edit 
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
    }

    async componentWillMount() {
        this.setState({
            firstName: "Andrew",
            lastName: "Duca",
            email: "andrew.j.duca@gmail.com",
            pictureUrl: "http://healthsupple.org/images/burger.jpg",
            phoneNumber: "8589997892"
        });
    }
    render() {
        const {navigation} = this.props;

        return (<BaseContainer 
                        backgroundColor={'red'}
                        noHeader={true} {...{ navigation }}>
                        
                        {/*<InAppNotification />*/}
                        <StatusBar
                            barStyle="light-content"
                        />
                        <View 
                            // start={[0, .5]}
                            // end={[.5, 0]}
                            // colors={['#071B38', '#024097']} //#2eabf4', 
                            style={[Styles.flexGrow, { 
                                padding: 15, 
                                flexDirection: 'column',
                                flex: 1,
                                alignItems: 'center' }]}>
                                
                            <View style={{
                                height: 20,
                                top: 0,
                                left:0,
                                width: WindowDimensions.width }}>

                                <View style={{
                                        flex: .25,
                                        flexDirection: 'row'
                                    }}>
                                    <Left style={{
                                            left: 0,
                                            flex: .3,
                                            top: 40,
                                            justifyContent: 'flex-start'
                                        }}>
                                        <Button onPress={() => navigation.navigate("DrawerOpen")} transparent>
                                            <Image style={{
                                                width: 35,
                                                height: 25,
                                                left: 15
                                            }} source={require('../../assets/menu.png')} />
                                        </Button>
                                    </Left>
                                    
                                    <Text
                                        style={{
                                            backgroundColor: 'transparent',
                                            fontSize: 30,
                                            color: '#fff',
                                            flex: .4,
                                            height: 40,
                                            textAlign: 'center',
                                            top: 21,
                                            justifyContent: 'flex-start',
                                            fontFamily: 'Avenir-Book'
                                        }}>
                                        Profile
                                    </Text>
                                    <View style={{flex: .3}}></View>

                                </View>
                            </View>

                            <View style={{
                                height: WindowDimensions.height,
                                
                                }}>
                                <Image 
                                    style={{
                                        borderRadius: 50, 
                                        height: 100, 
                                        width: 100,
                                        top: 50,
                                        alignSelf: 'center',
                                        zIndex: 100,
                                    }} 
                                    source={{uri: this.state.pictureUrl}} />

                                <KeyboardAwareScrollView style={{
                                    backgroundColor: '#ecf0f3',
                                    width: WindowDimensions.width - 30,
                                    alignSelf: 'center',
                                    borderRadius: 10,
                                    paddingTop: 45
                                    }}>

                                    <TextInput 
                                        style={{
                                            color: '#000',
                                            alignSelf: 'center',
                                            marginVertical: 15,
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
                                            shadowColor: '#ccc',
                                            shadowOffset: {
                                                width: 0,
                                                height: 3
                                            },
                                            shadowRadius: 3,
                                            shadowOpacity: 0.7
                                        }}
                                        returnKeyLabel='Done' 
                                        returnKeyType='done'
                                        placeholderTextColor={"#888"}
                                        tintColor={"#000"}
                                        ref={'firstName'} 
                                        placeholder="First name"
                                        keyboardType={"default"}
                                        value = {this.state.firstName}
                                        onChangeText={(val) => this.setState({firstName: val})}
                                    />

                                    <TextInput 
                                        style={{
                                            color: '#000',
                                            alignSelf: 'center',
                                            marginVertical: 15,
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
                                            shadowColor: '#ccc',
                                            shadowOffset: {
                                                width: 0,
                                                height: 3
                                            },
                                            shadowRadius: 3,
                                            shadowOpacity: 0.7
                                        }}
                                        returnKeyLabel='Done' 
                                        returnKeyType='done'
                                        placeholderTextColor={"#888"}
                                        tintColor={"#000"}
                                        ref={'lastName'} 
                                        placeholder="Last name"
                                        keyboardType={"default"}
                                        value = {this.state.lastName}
                                        onChangeText={(val) => this.setState({lastName: val})}
                                    />

                                    <TextInput 
                                        style={{
                                            color: '#000',
                                            alignSelf: 'center',
                                            marginVertical: 15,
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
                                            shadowColor: '#ccc',
                                            shadowOffset: {
                                                width: 0,
                                                height: 3
                                            },
                                            shadowRadius: 3,
                                            shadowOpacity: 0.7
                                        }}
                                        returnKeyLabel='Done' 
                                        returnKeyType='done'
                                        placeholderTextColor={"#888"}
                                        tintColor={"#000"}
                                        ref={'email'} 
                                        placeholder="Email"
                                        keyboardType={"email-address"}
                                        value = {this.state.email}
                                        onChangeText={(val) => this.setState({email: val})}
                                    />

                                    <TextInput 
                                        style={{
                                            color: '#000',
                                            alignSelf: 'center',
                                            marginVertical: 15,
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
                                            shadowColor: '#ccc',
                                            shadowOffset: {
                                                width: 0,
                                                height: 3
                                            },
                                            shadowRadius: 3,
                                            shadowOpacity: 0.7
                                        }}
                                        returnKeyLabel='Done' 
                                        returnKeyType='done'
                                        placeholderTextColor={"#888"}
                                        tintColor={"#000"}
                                        ref={'phone'} 
                                        placeholder="Phone"
                                        value = {this.state.phoneNumber}
                                        onChangeText={(val) => this.setState({phoneNumber: val})}
                                    />

                                    <TouchableOpacity style={{
                                        alignItems: 'center',
                                        marginBottom: 10,
                                        top: 10,
                                    }}>
                                        <Text style={{
                                            fontSize: 18,
                                            color: "#3E9FFF"
                                        }}>Change Password</Text>
                                    </TouchableOpacity>

                                    <Button full onPress={() => alert("save")} style={{ 
                                        marginTop: 30,
                                        height: 50,
                                        borderRadius: 30,
                                        width: 150,
                                        alignSelf: 'center',
                                        backgroundColor: "#f47c2b"
                                    }}>
                                        <Text style={{color: 'white', fontSize: 25, fontFamily: "Avenir"}}>
                                            Save
                                        </Text>
                                    </Button>
                                </KeyboardAwareScrollView>
                            </View>

                        </View>
                    </BaseContainer>);
    }
}

function mapStateToProps(state) { 
    return {
        user: state.user
    }; 
} 

function mapDispatchToProps(dispatch) {
    return {
        addFullUser(user) {
            dispatch(addFullUser(user))
        }
    }
}

export default connect( 
    mapStateToProps, 
    mapDispatchToProps 
)(Profile);
