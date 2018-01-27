import React from 'react';
import { InstantSearch } from 'react-instantsearch/native';
import PropTypes from 'prop-types';

import {
  connectInfiniteHits,
  connectSearchBox,
} from 'react-instantsearch/connectors';
import {Text, Image, View} from "react-native";
import Hits from './Hits';
import Search from './Search';

export default class Algolia extends React.Component {
    
    render() {
        return(
            <InstantSearch
                appId="W1TCA9758H"
                apiKey="385c372224ae6cff8df61f135f7b0d1e"
                indexName={this.props.index}
                >
                <View
                    style={{
                    flexDirection: 'row',
                    }}
                >
                    <Search />
                </View>
                {/*<Hits selectedPerson={this.props.selectedPerson} />
                */}
            </InstantSearch>
        );
    }
}

Algolia.propTypes = {
    index: PropTypes.string.isRequired,
    selectedPerson: PropTypes.func.isRequired
}