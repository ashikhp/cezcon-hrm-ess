import React from 'react';
import { View, Text } from 'react-native';
import { List, Divider, Card } from 'react-native-paper';

export const Sites = ({ route, navigation }) => {
  const { sites , callback} = route.params;
  return (
    <View>
    <Card style={{margin: 10}}>
      {sites.map((s) => {
        return (
          <>
            <List.Item
              title={s.site_name}
              onPress={() => {
                callback(s.site_id);
                navigation.goBack();
              }}
            ></List.Item>
            <Divider />
          </>
        );
      })}
      </Card>
    </View>
  );
};
