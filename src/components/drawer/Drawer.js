// @flow
import * as React from "react";
import {View, StyleSheet, Image, TouchableOpacity, SafeAreaView} from "react-native";
import {Button, H1, Icon, Text} from "native-base";
import autobind from 'autobind-decorator';
import {FontAwesome, MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons'

import {Avatar, Images, NavigationHelpers, WindowDimensions, Styles} from "../";

import variables from "../../assets/native-base-theme/variables/commonColor";
import Storage from '../../api/Storage';

var images = [
    <FontAwesome style={{color: 'white', fontSize: 35, top: 5, width: 40, marginRight: 15}} name="home" />,
    <MaterialCommunityIcons style={{color: 'white', fontSize: 35, top: 5, width: 40, marginRight: 15}} name="coin" />,
    <FontAwesome style={{color: 'white', fontSize: 35, top: 5, width: 40, marginRight: 15}} name="user" />,
]
export default class Drawer extends React.Component {

    @autobind
    go(key) {
        this.props.navigation.navigate(key);
    }

    @autobind
    async logout() {
        await Storage.removeJwt();
        NavigationHelpers.reset(this.props.navigation, "Auth");
    }

    @autobind
    close() {
        this.go("DrawerClose");
    }

    @autobind
    profile() {
        this.go("Profile");
    }

    render() {
        const navState = this.props.navigation.state;
        const currentIndex = navState.index;
        const items = navState.routes
            .filter(route => ["Settings", "Create"].indexOf(route.key) === -1)
            .map((route, i) => {
                var routeName = route.key; 
                switch(routeName) {
                    case "Manage_Crypto":
                        routeName = "BrownBytes";
                        break;
                    default:
                        break;
                }

                return(<DrawerItem style={{ 
                            flex: 1,
                            height: 10,
                            alignSelf: 'flex-start',
                            marginLeft: 30
                        }} key={i} imageKey={i} onPress={() => this.go(route.key)} icon={i} label={routeName} active={currentIndex === i} />)
            });
        //
        return (
            <View style={[Styles.flexGrow, {width: 300, backgroundColor: '#001944'}]}>
                <View style={[StyleSheet.absoluteFill, style.background]} />
                <Image style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    top: 100,
                    alignSelf: 'center'
                }} source={{uri: "https://api.adorable.io/avatars/285/andrew@gmail.com"}} />

                <SafeAreaView style={StyleSheet.absoluteFill}>
                    <View style={[style.container]}>
                        <View style={style.header} >
                            <Button transparent onPress={this.close}>
                            </Button>
                            <Button transparent onPress={this.close} style={{ height: 60 }}>
                                <MaterialIcons style={{
                                    color: "#FFF",
                                    fontSize: 50,
                                    left: 10
                                }} name="navigate-next"/>
                            </Button>
                        </View>
                        <View style={[style.drawerItemsContainer, {
                            top: 40, 
                            height: WindowDimensions.height - 200, 
                            paddingTop: 0,
                            }]}>
                            
                            <View style={[style.drawerItems, {
                                width: 300, 
                                marginTop: 20,
                                height: 20,
                                alignItems: 'flex-start'}]}>{items}</View>
                        </View>
                        {/*<View style={[style.row, {top: -75}]}>
                            <DrawerIcon label="settings" icon="ios-settings-outline" onPress={() => this.go("Settings")} />
                            <DrawerIcon label="log out" icon="ios-log-out-outline" onPress={this.logout} />
                        </View>*/}
                    </View>
                </SafeAreaView>
            </View>
        );
    }
}

class DrawerItem extends React.Component {
    render() {
        const {label, style, onPress, active, icon} = this.props;

        return <Button onPress={onPress} style={style} full transparent>
                    {images[this.props.imageKey]}
                    <H1 style={{ top: 5, color: active ? "white" : "rgba(255, 255, 255, .5)" }}>{label}</H1>
                </Button>;
    }
}

class DrawerIcon extends React.Component {
    render() {
        const {label, icon, onPress} = this.props;
        return <TouchableOpacity style={style.drawerIcon} onPress={onPress}>
            <Icon name={icon} style={{ color: "rgba(255, 255, 255, .5)", padding: variables.contentPadding }} />
            <Text style={{ color: "white", fontSize: 12 }}>{label.toUpperCase()}</Text>
        </TouchableOpacity>;
    }
}

const style = StyleSheet.create({
    img: {
        height: WindowDimensions.height,
        width: 300,
        // flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        // marginLeft: 0
    },
    container: {
        flexGrow: 1,
        justifyContent: "space-between"
    },
    header: {
        backgroundColor: "transparent",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    background: {
        backgroundColor: "rgba(36, 42, 56, .7)"
    },
    mask: {
        color: "rgba(255, 255, 255, .5)"
    },
    closeIcon: {
        fontSize: 50,
        color: "rgba(255, 255, 255, .5)"
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: variables.contentPadding * 2
    },
    drawerItemsContainer: {
        alignItems: "flex-start",
    },
    drawerItems: {
        flex: .4,
        marginTop: 20,
        // justifyContent: "space-between"
    },
    drawerIcon: {
        justifyContent: "center",
        alignItems: "center"
    }
});
