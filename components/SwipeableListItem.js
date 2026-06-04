import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const SCREEN_WIDTH = Dimensions.get('window').width;
const ACTION_WIDTH = 104;
const AUTO_DELETE_DISTANCE = SCREEN_WIDTH * 0.7;

export default function SwipeableListItem({ item, onDelete }) {
  const translateX = useSharedValue(0);

  const finishDelete = () => {
    onDelete?.(item.id);
  };

  const panGesture = Gesture.Pan()
    .activeOffsetX([-12, 12])
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd(() => {
      const distance = translateX.value;

      if (distance < -AUTO_DELETE_DISTANCE) {
        translateX.value = withTiming(-SCREEN_WIDTH, { duration: 250 }, (finished) => {
          if (finished) {
            runOnJS(finishDelete)();
          }
        });
        return;
      }

      if (distance <= -ACTION_WIDTH) {
        translateX.value = withSpring(-ACTION_WIDTH);
        return;
      }

      if (distance >= ACTION_WIDTH) {
        translateX.value = withSpring(ACTION_WIDTH);
        return;
      }

      translateX.value = withSpring(0);
    });

  const foregroundStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.rowShell}>
      <View style={[styles.action, styles.archiveAction]}>
        <Text style={styles.actionText}>Archive</Text>
      </View>
      <View style={[styles.action, styles.deleteAction]}>
        <Text style={styles.actionText}>Delete</Text>
      </View>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.item, foregroundStyle]}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemMeta}>Swipe kanan untuk Archive, swipe kiri untuk Delete.</Text>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  rowShell: {
    overflow: 'hidden',
    justifyContent: 'center',
  },
  action: {
    position: 'absolute',
    top: 8,
    bottom: 8,
    width: ACTION_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  archiveAction: {
    left: 0,
    backgroundColor: '#15803d',
  },
  deleteAction: {
    right: 0,
    backgroundColor: '#dc2626',
  },
  actionText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '800',
  },
  item: {
    marginVertical: 8,
    padding: 16,
    minHeight: 60,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d7dee8',
  },
  itemTitle: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '800',
  },
  itemMeta: {
    marginTop: 3,
    color: '#64748b',
    fontSize: 13,
  },
});
