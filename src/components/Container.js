// @flow
import * as React from "react";
import {View, SafeAreaView} from "react-native";
import {Constants} from "expo";

import Styles from "./Styles";

import variables from "../assets/native-base-theme/variables/commonColor";

export default class Container extends React.Component {
    render() {
        const {children, style, bottomColor, safe} = this.props;
        const containerStyle = [{
            flex: 1
        }];
        const bottomStyle = {
            backgroundColor: bottomColor ? bottomColor : variables.brandPrimary
        };
        // if (!safe) {
        //     containerStyle.push({ paddingTop: Constants.statusBarHeight });
        // }
        return (
            <View style={Styles.flexGrow}>
                {
                    // $FlowFixMe
                    safe && <SafeAreaView/>
                }
                <View style={[containerStyle, style]}>{children}</View>
                {
                    // $FlowFixMe
                    safe && <SafeAreaView style={bottomStyle} />
                }
            </View>
        );
    }
}
