// @flow
import moment from "moment";
import * as React from "react";
import {View, Text, StyleSheet} from "react-native";
import {H3} from "native-base";

import Avatar from "./Avatar";
import Styles from "./Styles";
import Circle from "./Circle";

import variables from "../assets/native-base-theme/variables/commonColor";

export default class Task extends React.Component {

    static defaultProps = {
        collaborators: []
    }

    render() {
        const {title, subtitle, collaborators, completed, timeline} = this.props;
        const date = moment(this.props.date);
        const height = collaborators.length > 1 ? 150 : 100;
        return <View style={[Styles.listItem, { height }]}>
            {
                timeline && <TaskStatus {...{ timeline, completed, height }} />
            }
            <View style={style.time}>
                <H3>{date.format("h:mm")}</H3>
                <Text style={style.gray}>{"\xa0" + date.format("A")}</Text>
            </View>
            <View style={style.title}>
                <H3>{title}</H3>
                <Text style={style.gray}>{subtitle}</Text>
                <View style={style.row}>
                {
                    collaborators.map((id, key) => <Avatar {...{ id, key }} style={style.avatar} />)
                }
                </View>
            </View>
            {
                !timeline && <TaskStatus {...{ completed, height }} />
            }
        </View>;
    }
}

class TaskStatus extends React.Component {
    render() {
        const {timeline, completed, height} = this.props;
        return <View style={[style.doublePadding, Styles.center]}>
            {
                timeline && <View style={[{ height }, style.verticalLine]}></View>
            }
            <Circle size={10} color={completed ? variables.brandInfo : variables.brandSecondary}/>
        </View>;
    }
}

const style = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center"
    },
    doublePadding: {
        padding: variables.contentPadding * 2
    },
    gray: {
        color: variables.gray
    },
    avatar: {
        marginTop: variables.contentPadding,
        marginRight: variables.contentPadding
    },
    verticalLine: {
        borderLeftWidth: variables.borderWidth,
        borderColor: variables.listBorderColor,
        position: "absolute"
    },
    time: {
        alignItems: "center",
        flexDirection: "row",
        padding: variables.contentPadding
    },
    title: {
        justifyContent: "center",
        flex: 1,
        padding: variables.contentPadding
    }
});
