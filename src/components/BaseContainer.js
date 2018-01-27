// @flow
import * as React from "react";
import {StyleSheet, Text} from "react-native";
import {Button, Header as NBHeader, Left, Body, Title, Right, Icon, Content} from "native-base";
import { EvilIcons } from "@expo/vector-icons";

import Avatar from "./Avatar";

import Container from "./Container";

import variables from "../assets/native-base-theme/variables/commonColor";

export default class BaseContainer extends React.Component {
    render() {
        const {title, noHeader, navigation, headerColor, backgroundColor, bottomColor, scrollable, safe} = this.props;
        
        return <Container style={{top: 0, backgroundColor: backgroundColor || "transparent"}} {...{safe, bottomColor}}>
                {(!noHeader) && <NBHeader style={{paddingTop: 40, height: 100, backgroundColor: headerColor || "transparent"}} noShadow>
                    <Left>
                        <Button onPress={() => navigation.navigate("DrawerOpen")} transparent>
                            <EvilIcons name="navicon" size={32} color={variables.white} />
                        </Button>
                    </Left>
                    <Body>
                    {
                        typeof(title) === "string" ? <Title style={{color: '#FFF'}}>{title}</Title> : title
                    }
                    </Body>
                    <Right style={{ alignItems: "center" }}>
                       
                        {/*<Button transparent onPress={() => navigation.navigate("Profile")}>
                            <Avatar size={40} />
                        </Button>*/}
                    </Right>
                </NBHeader>}
                {
                    scrollable ? <Content style={styles.content}>
                            {this.props.children}
                        </Content>
                    :
                        this.props.children
                }
            </Container>;
    }
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: "white"
    }
})
