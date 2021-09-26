import React from 'react';
import theme from '../meta/theme';
import { Text as NativeText, StyleSheet } from 'react-native';

const themingStyle = { fontFamily: theme.text.fontFamily }

const CustomText = ({style, ...props}) => {
    const newStyle = StyleSheet.flatten([style, themingStyle])
    // console.log('style', style)
    // console.log('themingStyle', themingStyle)
    // console.log('newStyle', newStyle)
    return <NativeText style={newStyle} {...props} />;
}

export default CustomText