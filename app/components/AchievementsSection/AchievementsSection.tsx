import { color } from '@app/utils/color';
import Text from '@components/AppText/Text';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  ImageBackground,
  LayoutChangeEvent,
  StyleSheet,
  View,
} from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const CARD_W = Math.min(320, SCREEN_WIDTH * 0.9);

const bgImage = require('@assets/images/achievments/ag.webp');
const patternImage = require('@assets/images/achievments/ag.webp');

const useCountUp = (target: number, start: boolean, duration = 1500) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (!start) return;
    let startValue = 0;
    const frameMs = 16;
    const steps = Math.max(1, Math.floor(duration / frameMs));
    const increment = target / steps;
    const id = setInterval(() => {
      startValue += increment;
      if (startValue >= target) {
        setCount(target);
        clearInterval(id);
      } else {
        setCount(Math.floor(startValue));
      }
    }, frameMs);
    return () => clearInterval(id);
  }, [start, target, duration]);

  return count;
};

interface AchItem {
  title: string;
  description: string;
  value?: number | string;
  suffix?: string;
}

interface AchievementsSectionProps {
  scrollY?: Animated.Value;
}

const data: AchItem[] = [
  {
    title: 'Hypotheses Processed',
    description:
      'We calculate probability scores for scientific hypotheses using statistics to aggregate all evidence.',
    value: 'Coming soon',
  },
  {
    title: 'Experiences Imported',
    description: 'Thousands of personal experiences have been collected.',
    value: 5998,
  },
  {
    title: 'Scientific Studies',
    description:
      'Our knowledge graph includes research from biology, medicine, physics, psychology, religious studies, metaphysics, and many more fields.',
    value: 'Coming soon',
  },
  {
    title: 'AI Accuracy Score',
    description:
      'Our AI truth-estimation engine achieves highly transparent and evidence-weighted conclusions.',
    value: 'Coming soon',
  },
];

const CARD_SPACING = verticalScale(14);

const AchievementsSection: React.FC<AchievementsSectionProps> = ({ scrollY }) => {
  const fade = useRef(new Animated.Value(0)).current;
  const translate = useRef(new Animated.Value(12)).current;
  const cardAnims = data.map(() => useRef(new Animated.Value(0)).current);

  const [layoutY, setLayoutY] = useState<number | null>(null);
  const triggeredRef = useRef(false);
  const listenerRef = useRef<number | string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!scrollY) {
      const t = setTimeout(() => {
        triggerAnimations();
      }, 120);
      return () => clearTimeout(t);
    }
    if (layoutY == null) return;

    listenerRef.current = scrollY.addListener(({ value }: { value: number }) => {
      const threshold = 120;
      if (value + SCREEN_HEIGHT > layoutY + threshold) {
        triggerAnimations();
        if (listenerRef.current != null) {
          try {
            scrollY.removeListener(listenerRef.current as string);
          } catch {}
          listenerRef.current = null;
        }
      }
    });

    return () => {
      if (listenerRef.current != null && scrollY) {
        try {
          scrollY.removeListener(listenerRef.current as string);
        } catch {}
        listenerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layoutY, scrollY]);

  const triggerAnimations = () => {
    if (triggeredRef.current) return;
    triggeredRef.current = true;
    setVisible(true);
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(translate, { toValue: 0, duration: 600, useNativeDriver: true }),
      Animated.stagger(
        150,
        cardAnims.map((a) =>
          Animated.timing(a, { toValue: 1, duration: 700, useNativeDriver: true }),
        ),
      ),
    ]).start();
  };

  const onLayout = (e: LayoutChangeEvent) => {
    setLayoutY(e.nativeEvent.layout.y);
  };

  return (
    <Animated.View
      onLayout={onLayout}
      style={[styles.container, { opacity: fade, transform: [{ translateY: translate }] }]}
    >
      <Animated.View style={[StyleSheet.absoluteFill, { zIndex: 0 }]}>
        <ImageBackground
          source={bgImage}
          style={{ width: '100%', height: '100%' }}
          resizeMode="repeat"
          imageStyle={{ opacity: 0.12 }}
        />
      </Animated.View>

      <View style={styles.topColumn}>
        <Text FONT_12 style={styles.smallLabel} color={color.palette.primary?.hover}>
          OUR ACHIEVEMENTS
        </Text>

        <View style={styles.headingWrap}>
          <Text FONT_24 bold style={styles.title} color={color.palette.primary?.hover}>
            Smart AI Solutions That{'\n'}Deliver Real Results
          </Text>
        </View>
      </View>

      <View style={styles.cardsRow}>
        {data.map((item, index) => {
          const isNumber = typeof item.value === 'number';
          const count = useCountUp(isNumber ? (item.value as number) : 0, visible && isNumber);
          const displayValue = isNumber ? `${count}${item.suffix ?? '+'}` : (item.value ?? '');
          const anim = cardAnims[index];

          return (
            <Animated.View
              key={index}
              style={[
                styles.card,
                {
                  opacity: anim,
                  transform: [
                    {
                      translateY: anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [12, 0],
                      }),
                    },
                  ],
                },
              ]}
            >

              <ImageBackground
                source={patternImage}
                style={StyleSheet.absoluteFill}
                imageStyle={{ opacity: 0.12, borderRadius: moderateScale(12) }}
                resizeMode="repeat"
              />

              <View style={styles.cardContent}>
                <Text FONT_16 style={styles.cardTitle} color={color.palette.primary?.focus}>
                  {item.title}
                </Text>
                <Text FONT_12 style={styles.cardDesc} color={color?.white}>
                  {item.description}
                </Text>
              </View>
              <View style={styles.divider} />
              <Text FONT_22 bold style={styles.cardValue} color={color?.white}>
                {displayValue}
              </Text>
            </Animated.View>
          );
        })}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: verticalScale(28),
    paddingHorizontal: moderateScale(16),
    backgroundColor: color.palette.cosmic?.primary || color.white,
    overflow: 'hidden',
    position: 'relative',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    opacity: 0.12,
  },
  topColumn: {
    zIndex: 1,
    marginBottom: verticalScale(18),
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  smallLabel: {
    letterSpacing: 2,
    marginLeft: moderateScale(8),
    alignSelf: 'flex-start',
    marginBottom: verticalScale(8),
  },
  headingWrap: {
    flex: 1,
    paddingLeft: moderateScale(12),
  },
  title: {
    fontSize: moderateScale(22),
    lineHeight: verticalScale(32),
    textAlign: 'left',
  },
  cardsRow: {
    zIndex: 1,
    marginTop: verticalScale(6),
    flexDirection: 'column',
    alignItems: 'center',
    gap: CARD_SPACING as any,
  },
  card: {
    width: CARD_W,
    backgroundColor: color.palette.primary?.hero || '#ffd54f',
    borderRadius: moderateScale(12),
    paddingHorizontal: moderateScale(14),
    paddingVertical: verticalScale(28),
    marginBottom: CARD_SPACING,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
    zIndex: 2,
    overflow: 'hidden',
  },

  cardContent: {
    marginBottom: verticalScale(8),
    zIndex: 1,
  },

  cardBackground: {
    flex: 1,
    padding: moderateScale(14),
    justifyContent: 'space-between',
  },

  cardTitle: {
    fontSize: moderateScale(16),
    marginBottom: verticalScale(6),
  },
  cardDesc: {
    fontSize: moderateScale(12),
    lineHeight: verticalScale(18),
  },
  divider: {
    height: 1,
    backgroundColor: color.palette.primary?.focus || '#fff',
    opacity: 0.5,
    marginVertical: verticalScale(10),
  },
  cardValue: {
    fontSize: moderateScale(20),
    alignSelf: 'flex-start',
  },
});

export default AchievementsSection;
