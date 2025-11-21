import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Svg, { Circle } from 'react-native-svg';

interface ScrollToTopButtonProps {
  progress: number;
  onPress: () => void;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  iconColor?: string;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({
  progress,
  onPress,
  size = moderateScale(60),
  strokeWidth = moderateScale(4),
  color = '#007AFF',
  backgroundColor = '#E5E5EA',
  iconColor = '#007AFF',
}) => {
  const normalizedProgress = Math.max(0, Math.min(1, progress));
  const containerSize = size;
  const viewBoxSize = containerSize + strokeWidth;
  const center = viewBoxSize / 2;
  const radius = (containerSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - normalizedProgress * circumference;

  if (normalizedProgress < 0.05) {
    return null;
  }

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          width: containerSize - 3,
          height: containerSize - 3,
          borderRadius: containerSize / 2,
          bottom: verticalScale(30),
          right: scale(21),
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Svg
        width={containerSize}
        height={containerSize}
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        style={styles.svg}
      >
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`}
        />
      </Svg>
      <Ionicons name="arrow-up" size={containerSize * 0.4} color={iconColor} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.3,
    shadowRadius: moderateScale(4),
    elevation: 5,
    overflow: 'hidden',
  },
  svg: {
    position: 'absolute',
  },
  icon: {
    position: 'absolute',
  },
});

export default ScrollToTopButton;
