import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../components/AppText/Text';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text bold FONT_18>
        Profile Screen
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
