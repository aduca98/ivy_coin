// @flow
import * as _ from "lodash";
import * as React from "react";
import TextInput from "native-base";
import {ListItem, Item, Label, Input, Body, Right} from "native-base";

export default class Field extends React.Component {

    componentWillMount() {
        this.setValue(this.props.defaultValue || "");
    }

    setValue(value) {
        this.value = value;
    }

    render() {
        const {label, last, inverse, defaultValue, right, textInputRef} = this.props;
        const style = inverse ? { color: "white" } : { color: "#000" };
        const itemStyle = inverse ? { borderColor: "white" } : { borderColor: "#000" };
        const keysToFilter = ["right", "defaultValue", "inverse", "label", "last"];
        const props = _.pickBy(this.props, (value, key) => keysToFilter.indexOf(key) === -1);
        const {value} = this;
        return <ListItem {...{ last }} style={itemStyle}>
            <Body>
                <Item
                    style={{ borderBottomWidth: 0 }}
                    floatingLabel={!defaultValue}
                    stackedLabel={!!defaultValue}>
                    <Label {...{ style }}>{label}</Label>
                    <Input 
                        onChangeText={this.props.onChange} 
                        value={this.props.value}/>
                </Item>
            </Body>
            {
                right && <Right>{right()}</Right>
            }
        </ListItem>;
    }
}
