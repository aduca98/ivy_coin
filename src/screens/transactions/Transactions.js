// @flow
import moment from "moment";
import * as React from "react";
import autobind from 'autobind-decorator';
import {StyleSheet, Image, View, Text, StatusBar, ScrollView} from "react-native";
import {H1, Left, Button} from "native-base";
import {BaseContainer, Styles, Images, Avatar, Transaction} from "../../components";
import variables from "../../assets/native-base-theme/variables/commonColor";
import {connect} from 'react-redux';

import TransactionService from '../../api/TransactionService';
import UserService from '../../api/UserService';

class Transactions extends React.Component {

    state = {
        transactions: [],
        user: ""
    }

    constructor() {
        super();
        this.renderTransactions = this.renderTransactions.bind(this);
    }
    async componentWillMount() {
        console.log("will mount");
        // force auth...

        await this.renderTransactions();
        cacheImages([
            require('../../assets/crypto/btc.png'),
            require('../../assets/crypto/eth.png'),
            require('../../assets/crypto/ltc.png'),
        ])
    }
    async renderTransactions() {
        const data = await TransactionService.fetchUserTransactions();
        const transactions = data.transactions;

        const res = await UserService.profile();
        const user = res.user;
        const balances = res.balances; // maybe update redux with this

        this.setState({
            transactions: transactions,
            user: user
        });
    }    
    render() {
        const {navigation} = this.props;
        return (
            <BaseContainer 
                noHeader={true}
                headerColor="#0B1823" 
                backgroundColor="#ecf0f3"
               {...{navigation}}>
                {/*<View style={[Styles.imgMask, Styles.center, Styles.flexGrow]}>
                    <Image source={Images.timeline} style={Styles.header} />
                    <View style={[StyleSheet.absoluteFill]} />
                    
                </View>*/}
                <StatusBar
                    barStyle="light-content"
                />

                {/*Header*/}
                <View style={{
                        flexDirection: 'row',
                        height: 100,
                        paddingTop: 10,
                        backgroundColor: '#0B1823'
                    }}>
                    <Left style={{
                        left: -10,
                        flex: .2,
                        top: 10,
                        padding: 0,
                        justifyContent: 'flex-start'
                    }}>
                        <Button style={{
                            padding: 0
                        }} onPress={() => navigation.navigate("DrawerOpen")} transparent>
                            <Image style={{
                                width: 35,
                                height: 25,
                                left: 15
                            }} source={require('../../assets/menu.png')} />
                        </Button>
                    </Left>
                    
                    <Text
                        style={{
                            backgroundColor: 'transparent',
                            fontSize: 20,
                            color: '#fff',
                            flex: .6,
                            textAlign: 'center',
                            top: 45,
                            justifyContent: 'flex-start',
                            fontFamily: 'Avenir-Book'
                        }}>
                        Transactions
                    </Text>
                    <View style={{flex: .2}}></View>

                </View>
                
                <ScrollView>
                    {this.state.transactions.map((t, i) => {
                        console.log(t);
                        const amountCurrency = t.amountCurrency;
                        const amountPaid = t.amountPaid;
                        const id = t._id;
                        return (
                             <Transaction 
                                type={t.type}
                                currency={t.currency}
                                key={i}
                                isWithdrawal={this.state.user._id == t.from}
                                to={t.to || null}
                                toName={t.toName || null}
                                from={t.from}
                                fromName={t.fromName}
                                id={t._id}
                                date={t.createdAt}
                                type={t.type}
                                title={t.message}
                                amount={t.amountCurrency}
                                completed 
                                timeline />
                        )
                    })}
                </ScrollView>
            </BaseContainer>
        );
    }
}

function cacheImages(images) {
    return images.map(image => 
    Expo.Asset.fromModule(image).downloadAsync());
}

const style = StyleSheet.create({
    heading: {
        marginTop: variables.contentPadding * 2,
        color: "white"
    }
});

function mapStateToProps(state) { 
    return {
        user: state.user
    }; 
} 

function mapDispatchToProps(dispatch) {
    return {
        addFullUser(user) {
            dispatch(addFullUser({user}))
        }
    }
}

export default connect( 
    mapStateToProps, 
    mapDispatchToProps 
)(Transactions);