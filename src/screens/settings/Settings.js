// @flow
import * as React from "react";
import {View, Text} from "react-native";
import {Switch, List, ListItem, Body, Right} from "native-base";

import {BaseContainer, Styles, Avatar, Field} from "../../components";

import variables from "../../assets/native-base-theme/variables/commonColor";

export default class Settings extends React.Component<ScreenProps<>> {

    render() {
        return <BaseContainer title="Settings" navigation={this.props.navigation} scrollable>
            <View style={[Styles.header, Styles.center, Styles.whiteBg]}>
                <Avatar size={100} />
            </View>
                <List>
                    <ListItem itemDivider>
                        <Text>GENERAL</Text>
                    </ListItem>
                    <Field label="Name" defaultValue="Marie Simpson" />
                    <Field label="Birthday" defaultValue="January 12, 1976" last />
                    <ListItem itemDivider>
                        <Text>NOTIFICATIONS</Text>
                    </ListItem>
                    <ListItem>
                        <Body>
                            <Text>Email Notification</Text>
                        </Body>
                        <Right>
                            <SettingsSwitch />
                        </Right>
                    </ListItem>
                    <ListItem last>
                        <Body>
                            <Text>Phone Notification</Text>
                        </Body>
                        <Right>
                            <SettingsSwitch />
                        </Right>
                    </ListItem>
                </List>
        </BaseContainer>;
    }
}

class SettingsSwitch extends React.Component {

    toggle() {
        this.value = !this.value;
    }

    render() {
        return <Switch
            value={this.value}
            onValueChange={this.toggle}
            onTintColor="rgba(80, 210, 194, .5)"
            thumbTintColor={this.value ? variables.brandInfo : "#BEBEC1"}
        />;
    }

}
