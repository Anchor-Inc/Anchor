import React from 'react';
import { View } from 'react-native';

const Card = ({ children }) => {
  return (
    <View style={styles.containerStyle}>
      {children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderWidth: 0,
    borderRadius: 4,
    elevation: 1,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 10,
  },
};

export { Card };
