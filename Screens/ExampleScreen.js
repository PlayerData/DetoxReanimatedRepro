import React, {useState} from 'react';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Dimensions,
  SafeAreaView,
} from 'react-native';

import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import FabMenu from './FabMenu';

const windowwidth = Dimensions.get('window').width;
const windowheight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  root: {
    marginTop: '80%',
    marginLeft: '40%',
  },

  addMenu: {
    height: 68,
    width: 68,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 40,
    zIndex: 2,
  },

  iconContainer: {
    padding: 14,
    borderRadius: 68,
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {height: 1, width: 1},
  },

  backgroundBlur: {
    height: windowheight * 2,
    width: windowwidth * 2,
    position: 'absolute',
    top: -windowheight,
    left: -windowwidth,
    backgroundColor: 'black',
    opacity: 0.6,
  },

  box: {
    width: 100,
    height: 100,
    backgroundColor: '#f00',
  },
});

const FABButtonView = () => {
  const [open, setOpen] = useState(false);
  const animation = useSharedValue(0);
  const rotation = useDerivedValue(() =>
    interpolate(animation.value, [0, 360], [0, 360]),
  );
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{rotate: `${rotation.value}deg`}],
  }));

  const toggleMenu = () => {
    setOpen(!open);
    if (open) {
      // Closing Menu
      animation.value = withTiming(0, {duration: 420});
    } else {
      // Opening Menu
      animation.value = withTiming(-135, {duration: 420});
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      {open && (
        <TouchableWithoutFeedback
          accessibilityRole="image"
          onPress={toggleMenu}>
          <View style={styles.backgroundBlur} />
        </TouchableWithoutFeedback>
      )}
      <TouchableWithoutFeedback
        accessibilityRole="switch"
        onPress={toggleMenu}
        testID="SpinButton">
        <View style={styles.addMenu}>
          <View style={styles.iconContainer}>
            <Animated.View style={animatedStyles}>
              <View style={styles.box} />
            </Animated.View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <FabMenu
        items={[
          {itemText: 'Item 1', id: 1},
          {itemText: 'Item 2', id: 2},
        ]}
        menuOpen={open}
      />
    </SafeAreaView>
  );
};

export default FABButtonView;
