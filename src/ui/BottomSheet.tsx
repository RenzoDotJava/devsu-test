import React from 'react'
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native'
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons';
import { theme } from '../styles';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const BottomSheet: React.FC<BottomSheetProps> = ({ isOpen, onClose, children }) => {
  return (
    <>
      {
        isOpen ? <>
          <AnimatedPressable testID='close-bottom-sheet-backdrop' style={styles.backdrop} onPress={onClose} entering={FadeIn} exiting={FadeOut} />
          <Animated.View
            style={styles.container}
            entering={SlideInDown}
            exiting={SlideOutDown}
          >
            <View style={styles.header}>
              <TouchableOpacity testID='close-bottom-sheet-button' onPress={onClose}>
                <AntDesign name="close" size={theme.fontSize.xl} color={theme.color.neutral.light} />
              </TouchableOpacity>
            </View>
            {children}
          </Animated.View>
        </> : null
      }
    </>
  )
}

export default BottomSheet

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: 300,
    width: "100%",
    position: "absolute",
    bottom: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.color.neutral.light,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 1,
  },
});