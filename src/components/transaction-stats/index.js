// @flow
import * as React from "react";
import PropTypes from 'prop-types';

import {StyleSheet, View, Text} from "react-native";
import {H1} from "native-base";

import Styles from "../Styles";

import variables from "../../assets/native-base-theme/variables/commonColor";

export default class TransactionStats extends React.Component {
    render() {
        const {deposits, withdrawal} = this.props;
        return <View style={{ flexDirection: "row" }}>
            <View style={[style.count, Styles.center, { backgroundColor: variables.brandInfo }]}>
                <Text style={Styles.whiteText}>DEPOSITS</Text>
                <H1 style={style.heading}>{`${deposits}`}</H1>
            </View>
            <View style={[style.count, Styles.center, { backgroundColor: variables.brandSecondary }]}>
                <Text style={Styles.whiteText}>WITHDRAWAL</Text>
                <H1 style={style.heading}>{`${withdrawal}`}</H1>
            </View>
        </View>;
    }
}

TransactionStats.propTypes = {
    deposit: PropTypes.string.isRequired,
    withdrawal: PropTypes.string.isRequired
}

const padding = variables.contentPadding * 2;
const style = StyleSheet.create({
    count: {
        flex: .5,
        padding
    },
    heading: {
        color: "white",
        paddingTop: padding
    }
});
