// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {View, Image, StyleSheet, SafeAreaView} from "react-native";
import {H1, Button, Text, Input, Content} from "native-base";
import {Constants} from "expo";

import Mark from "./Mark";

import {Small, Styles, Images, Field, NavigationHelpers, WindowDimensions} from "../../components";
import {AnimatedView} from "../../components/Animations";

import variables from "../../assets/native-base-theme/variables/commonColor";

import * as AuthService from '../../api/AuthService';
import Storage from '../../api/Storage';

export default class Login extends React.Component {

    state = {
        token: "123",
    }

    render() {
        return (
            <View style={style.blur}>
                <Field
                    label="Verification Token"
                    autoCapitalize="none"
                    returnKeyType="next"
                    value={this.props.value}
                    onChange={(val) => this.props.setToken("token", val)}
                    onSubmitEditing={this.goToPassword}
                    inverse
                />
            
            </View>);
    }
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
