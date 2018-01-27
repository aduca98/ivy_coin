import React from 'react';
import { connectInfiniteHits } from 'react-instantsearch/connectors';
// We also need to import the FlatList and other React Native component
import { TouchableWithoutFeedback, StyleSheet, View, FlatList, Image, Text } from 'react-native';

const Hits = connectInfiniteHits(({ hits, hasMore, refine }) => {

  console.log(hits);
  /* if there are still results, you can
  call the refine function to load more */
  const onEndReached = function() {
    if (hasMore) {
      refine();
    }
  };

  return (
    <FlatList
      data={hits}
      onEndReached={onEndReached}
      keyExtractor={(item, index) => item.objectID}
      renderItem={({ item }) => {
        return (
          <TouchableWithoutFeedback>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                style={{ height: 100, width: 100 }}
                source={{ uri: item.image }}
              />
              <View style={{ flex: 1 }}>
                <Text>
                  {item.firstName} {item.lastName}
                </Text>
                <Text>
                  {item.email}
                </Text>
              </View>
            </View>

          </TouchableWithoutFeedback>
        );
      }}
    />
  );
});

export default Hits;