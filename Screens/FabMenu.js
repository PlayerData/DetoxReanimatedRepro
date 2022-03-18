import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View, Text} from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const styles = StyleSheet.create({
  root: {
    zIndex: 2,
  },

  firstRow: {
    height: 68,
    width: 68,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
  },

  iconContainer: {
    padding: 10,
    borderRadius: 68,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {height: 1, width: 1},
  },

  labelText: {
    position: 'absolute',
  },
});

const FabMenu = ({menuOpen, items}) => {
  const firstRowOffset = useSharedValue(0);
  const secondRowXOffset = useSharedValue(0);
  const secondRowYOffset = useSharedValue(0);
  const firstRowAnimation = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withSpring(firstRowOffset.value, {
          stiffness: 200,
          damping: 12,
        }),
      },
    ],
  }));

  const secondRowRightAnimation = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withSpring(secondRowYOffset.value, {
          stiffness: 200,
          damping: 12,
        }),
      },
    ],
  }));

  const rightAnimations = [firstRowAnimation, secondRowRightAnimation];

  const rightExtraLabelStyles = {top: 20, width: 110, left: -120};

  if (menuOpen) {
    // Opening Menu
    firstRowOffset.value = -80;
    secondRowYOffset.value = -160;
    secondRowXOffset.value = -160;
  } else {
    // Closing Menu
    firstRowOffset.value = 0;
    secondRowYOffset.value = 0;
    secondRowXOffset.value = 0;
  }

  const itemRenders = items.map((item, index) => {
    const extraStyles = rightExtraLabelStyles;

    return (
      <Animated.View key={item.id} style={rightAnimations[index]}>
        <TouchableWithoutFeedback
          accessibilityRole="button"
          onPress={item.onPress}>
          <View style={styles.firstRow}>
            <View style={styles.iconContainer}>
              <Text
                extraStyles={[styles.labelText, extraStyles]}
                variant="headline5">
                {item.itemText}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  });

  return (
    <View style={styles.root}>{menuOpen && <View>{itemRenders}</View>}</View>
  );
};

export default FabMenu;
