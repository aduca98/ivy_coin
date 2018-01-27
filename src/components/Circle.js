// @flow
import * as React from "react";
import {View} from "react-native";

export default class Circle extends React.Component {
    render() {
        const {size, color, style} = this.props;
        const circleStyle = {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: color,
            alignItems: "center",
            justifyContent: "center"
        };
        return <View style={[circleStyle, style]}>{this.props.children}</View>;
    }
}
