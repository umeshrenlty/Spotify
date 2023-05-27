import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

import {COLORS, FONTS} from '../constants';

const TextButton = ({onPress, label}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 50,
        paddingHorizontal: 40,
      }}>
      <Text style={{color: COLORS.white, ...FONTS.btn}}>
        {label.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
};

export default TextButton;
