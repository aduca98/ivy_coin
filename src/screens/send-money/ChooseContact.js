// @flow
import moment from "moment";
import autobind from 'autobind-decorator';
import * as React from "react";
import {
    Text, 
    Image, 
    TextInput, 
    StyleSheet, 
    View, 
    ScrollView, 
    KeyboardAvoidingView,
    Keyboard,
    StatusBar,
    TouchableOpacity
} from "react-native";
import {H1, Button, Icon, Left} from "native-base";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import {
    BaseContainer, 
    Circle, 
    Styles, 
    Images, 
    WindowDimensions, 
    Field
} from "../../components";
import Expo, {Permissions} from 'expo';
 import variables from "../../assets/native-base-theme/variables/commonColor";
import {CryptoSelector} from '../../components/crypto-selector';
import {Ionicons, FontAwesome} from '@expo/vector-icons';
var _ = require('lodash');

import {Algolia} from '../../components/algolia';
import TransactionService from '../../api/TransactionService';
import UserService from '../../api/UserService';
import Loading from '../../components/Loading';
import forceAuth from '../../utils/ForceAuth';
import ContactService from '../../api/ContactService';

export default class ChooseContact extends React.Component {

    state = {
        loading: false,
        contactInfo: "",
        contacts: [],
        matches: [],
        filtering: false,
        permissionForContacts: false
    }

    constructor() {
        super()
        cacheImages([
            require('../../assets/loader.gif')
        ])
        this._filterContacts = this._filterContacts.bind(this);
        this._filterMatches = this._filterMatches.bind(this);
        this._askForContacts = this._askForContacts.bind(this);
        this._nextStep = this._nextStep.bind(this);
    }

    async componentWillMount() {
        try {
            await forceAuth(this.props.navigation);
            const cs = await ContactService.getContacts(500);
            
            var {matches, realContacts} = await ContactService.fetchContactsWithAccounts(cs);
            var { status } = await Permissions.getAsync(Permissions.CONTACTS);
            var permissionForContacts;
            alert(status);
            if(status != "granted") {
                permissionForContacts = false
            } else {
                permissionForContacts = true
            }
            
            this.setState({
                matches: matches,
                contacts: realContacts,
                permissionForContacts
            });
        } catch(e) {
            console.log(e);
        }
    }

    _filterContacts() {

        if(!this.state.contactInfo) {
            return this.state.contacts;
        } 
        const val = this.state.contactInfo.toLowerCase();
        const newContacts = _.filter(this.state.contacts, function(c) {
            if(!c) return;
            var name = (c.name) ? c.name.toLowerCase() : "";
            var phone = c.phone;
            var email = c.email;
            // console.log(name, val, name.indexOf(val));
            if((name && _.includes(name, val)) ||
               (email && _.includes(email, val)) ||
               (phone && _.includes(phone, val)))
            {
                return c;
            }
        });
        console.log('done filtering');
        return newContacts;
    }

    _filterMatches() {
        if(!this.state.contactInfo) {
            return this.state.matches;
        } 
        const val = this.state.contactInfo.toLowerCase();
        const newMatches = _.filter(this.state.matches, function(c) {
            if(!c) return;
            var firstName = (c.firstName) ? c.firstName.toLowerCase() : "";
            var lastName = (c.lastName) ? c.lastName.toLowerCase() : "";
            var phone = (c.phoneNumber);
            var email = (c.email) ? c.email.toLowerCase() : "";
            if((firstName && _.includes(firstName, val)) ||
               (lastName && _.includes(lastName, val)) ||
               (phone && _.includes(phone, val)) ||
               (email && _.includes(email, val)))
            {
                return c;
            }
        });
        console.log('filtering 25');
        return newMatches;
    }

    async _nextStep() {
        
    }

    async _askForContacts() {
        await ContactService.askForPermission()
    }

    render() {
        const {navigation} = this.props;
        if(this.state.loading) {
            return (<Loading/>);
        }
       
        return (
            //backgroundColor={'#022956'}
            <BaseContainer
                backgroundColor={'#ecf0f3'}
                noHeader={true} {...{ navigation }}>
                <StatusBar
                    barStyle="light-content"
                />


                {/*Header*/}
                <View style={{
                        flexDirection: 'row',
                        height: 100,
                        paddingTop: 10,
                        backgroundColor: '#0B1823'
                    }}>
                    <Left style={{
                        flex: .25
                        }}>
                        <Button onPress={() => { this.props.navigation.goBack(null) }} transparent>
                            <Ionicons style={{
                                color: 'white',
                                fontSize: 35,
                                left: 15,
                                top: 22
                            }} name='ios-arrow-round-back-outline' />
                            
                        </Button>
                    </Left>
                    
                    <Text
                        style={{
                            backgroundColor: 'transparent',
                            fontSize: 20,
                            color: '#fff',
                            flex: .6,
                            textAlign: 'center',
                            top: 50,
                            justifyContent: 'flex-start',
                            fontFamily: 'Avenir-Book'
                        }}>
                        Add Recipient
                    </Text>
                    <View style={{flex: .25}}></View>

                </View>
                
                {/*Input fields*/}
                <View style={{
                    }}>
                    
                    <View style={style.slide}>

                        <View style={style.card}>
                            <FontAwesome style={{
                                color: "#888",
                                top: 40, 
                                fontSize: 18,
                                width: 20,
                                height: 20,
                                zIndex: 10,
                                left: 20
                            }} name="phone" />
                            <TextInput 
                                style={[style.input, {
                                    color: '#000',
                                    textAlign: 'left',
                                    fontSize: 18,
                                    paddingLeft: 45,
                                    paddingTop: 0,
                                    height: 60,
                                    top: 0,
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
                                }]}
                                returnKeyLabel='Done' 
                                returnKeyType='done'
                                placeholderTextColor={"#888"}
                                tintColor={"#000"}
                                ref={'contactInfo'} 
                                placeholder="Phone number, email, or name"
                                value = {this.state.contactInfo}
                                onChangeText={(val) => { 
                                    var self = this;
                                    self.setState({
                                        contactInfo: val,
                                        filtering: true
                                    });
                                    setTimeout(function() {
                                        self.setState({
                                            filtering: false
                                        })
                                    }, 1000)
                                }}
                            />
                        </View>

                    </View>

                    
                </View>
                
                {this.state.filtering && 
                    <Image style={{
                        alignSelf: 'center',
                        top: 30,
                        height: 70,
                        width: 70
                    }} source={require('../../assets/loader.gif')} />}

                {!this.state.filtering && <KeyboardAwareScrollView 
                    contentContainerStyle={{
                        alignItems: 'center',
                        justifyContent: 'flex-start' 
                    }}
                    style={[Styles.flexGrow, { 
                        padding: 15,
                        paddingTop: 0,
                        flexDirection: 'column',
                        flex: 1,
                    }]}>

                    <View style={{
                        paddingTop: 0
                        }}>
                        {this.state.matches.length > 0 && this._filterMatches().map((c, i) => {
                            return (<TouchableOpacity
                                        key={i}
                                        onPress={() => {
                                            this.setState({
                                                contactInfo: "cryp_" + c._id || c.email
                                            })
                                        }}>
                                        <View 
                                            style={{
                                                backgroundColor: 'transparent',
                                                width: WindowDimensions.width - 50,
                                                borderBottomWidth: 1,
                                                borderColor: "#ddd",
                                                flexDirection: 'row',
                                                padding: 15,
                                                borderRadius: 5,
                                            }}>

                                            <Image style={{
                                                width: 50,
                                                height: 50,
                                                borderRadius: 25,
                                            }} source={{uri: c.pictureUrl}} />
                                            <View style={{
                                                flex: .8,
                                                marginLeft: 20
                                            }}>
                                                <Text style={{
                                                    color: '#000',
                                                    fontSize: 18
                                                }}> {c.firstName} {c.lastName}</Text>
                                                <View>
                                                    {c.phoneNumber && <Text style={{
                                                        color: "#888",
                                                        top: 5,
                                                    }}> {c.phoneNumber} </Text>}
                                                    {c.email && <Text style={{
                                                        color: "#888",
                                                        top: 5,
                                                    }}> {c.email} </Text>}
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>);
                        })}
                    </View>

                    <View>
                        {this.state.contacts.length > 0 && this._filterContacts().map((c, i) => {
                            return (<TouchableOpacity
                                        key={i}
                                        onPress={() => {
                                            this.setState({
                                                contactInfo: c.phone || c.email
                                            });
                                        }}>
                                        <View style={{
                                            backgroundColor: 'transparent',
                                            width: WindowDimensions.width - 50,
                                            borderBottomWidth: 1,
                                            borderColor: "#ddd",
                                            flexDirection: 'row',
                                            padding: 15,
                                            borderRadius: 5,
                                            }}>
                                            <View style={{
                                                width: 50,
                                                height: 50,
                                                borderRadius: 25,
                                                backgroundColor: (c.color),
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                                }}>
                                                <Text style={{
                                                    color: '#fff'
                                                }}>{c.name.charAt(0)}</Text>
                                            </View>
                                            <View style={{
                                                flex: .8,
                                                marginLeft: 20
                                            }}>
                                                <Text style={{
                                                    color: '#000',
                                                    fontSize: 18
                                                }}> {c.name}</Text>
                                                <View>
                                                    {c.phone && <Text style={{
                                                        color: "#888",
                                                        top: 5,
                                                    }}> {c.phone} </Text>}
                                                    {c.email && <Text style={{
                                                        color: "#888",
                                                        top: 5,
                                                    }}> {c.email} </Text>}
                                                </View>
                                                
                                            </View>
                                        </View>
                                    </TouchableOpacity>);
                        })}
                    </View>

                    {(!this.state.permissionForContacts) && <View>
                        <Button     
                            style={{
                                borderRadius: 25,
                                top: 30,
                                marginBottom: 40,
                                height: 50,
                                backgroundColor: 'orange'
                            }}
                            onPress={() => this._askForContacts.bind(this)}>
                            <Text style={{fontSize: 18, fontFamily: "Avenir", color: "#fff"}}> Import Contacts </Text>
                        </Button>
                    </View>}

                    <Button full onPress={this._nextStep} style={{ 
                        marginTop: 30,
                        height: 60,
                        borderRadius: 30,
                        width: 300,
                        alignSelf: 'center',
                        backgroundColor: "#0395FF"
                    }}>
                        <Text style={{color: 'white', fontSize: 25, fontFamily: "Avenir"}}>
                            Send
                        </Text>
                    </Button>

                    </KeyboardAwareScrollView>}
            
            </BaseContainer>
        );
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
    },
    slide: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 0,
    },
    input: {
        width: WindowDimensions.width - 40,
    },
    card: {
        marginHorizontal: 10,
        marginBottom: 15,
        backgroundColor: 'transparent',
        borderRadius: 3,
        elevation: 3,
        flexDirection: 'column'
    },
    
});


