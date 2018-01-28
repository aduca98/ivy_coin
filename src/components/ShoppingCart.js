import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import {FontAwesome} from '@expo/vector-icons';

class ShoppingCart extends Component {
    render() {
        return(
            <TouchableOpacity 
                style={{
                    alignSelf: 'flex-end',
                }} onPress={() => this.props.navigation.navigate("Checkout")}>
                <FontAwesome 
                    style={{
                        color: '#fff',
                        fontSize: 35,
                        right: 30
                    }}
                    name="shopping-cart" />
                 {/*this.props.items.length > 0*/}
                {this.props.items && this.props.items.length > 0 && (
                    <View style={{
                        backgroundColor: 'red',
                        width: 25,
                        height: 25,
                        top: 15,
                        left: -6,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 25,
                        position: 'absolute'
                    }}>
                        <Text style={{
                            backgroundColor: 'transparent',
                            color: '#fff',
                            fontFamily: 'Avenir',
                            fontSize: 12,
                            fontWeight: 'bold'
                        }}>{this.props.items.length}</Text>
                    </View>)}
            </TouchableOpacity>
        )
    }
}

function mapStateToProps(state) {
    return {
        items: state.shoppingCart.items
    };
}

function mapDispatchToProps(dispatch) {
    return {
        // updateBalances(balances) {
        //     dispatch(updateBalances(balances))
        // }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShoppingCart);
