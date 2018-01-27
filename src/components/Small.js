// @flow
import * as React from "react";
import {Text} from "react-native";
import variables from "../assets/native-base-theme/variables/commonColor";

export default class Small extends React.Component {
    render() {
        const style = [{ fontSize: 12, color: variables.gray, backgroundColor: "transparent" }, this.props.style];
        return <Text {...{style}}>{this.props.children}</Text>;
    }
}
