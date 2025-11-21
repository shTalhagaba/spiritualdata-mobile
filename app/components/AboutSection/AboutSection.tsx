import { color } from '@app/utils/color';
import Text from '@components/AppText/Text';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  LayoutChangeEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Toast from 'react-native-toast-message';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const CARD_WIDTH = Math.min(360, SCREEN_WIDTH * 0.92);

interface AboutSectionProps {
  scrollY?: Animated.Value;
}

const AboutSection: React.FC<AboutSectionProps> = ({ scrollY }) => {
  const navigation = useNavigation<any>();

  const fade = useRef(new Animated.Value(0)).current;
  const translate = useRef(new Animated.Value(12)).current;
  const cardAnims = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  const [layoutY, setLayoutY] = useState<number | null>(null);
  const listenerIdRef = useRef<string | number | null>(null);
  const triggeredRef = useRef(false);

  const startAnimations = () => {
    if (triggeredRef.current) return;
    triggeredRef.current = true;
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(translate, { toValue: 0, duration: 600, useNativeDriver: true }),
      Animated.stagger(
        120,
        cardAnims.map((a) =>
          Animated.timing(a, { toValue: 1, duration: 700, useNativeDriver: true }),
        ),
      ),
    ]).start();
  };

  useEffect(() => {
    if (!scrollY) {
      const t = setTimeout(startAnimations, 120);
      return () => clearTimeout(t);
    }

    if (layoutY == null) return;

    listenerIdRef.current = scrollY.addListener(({ value }: { value: number }) => {
      const threshold = 120;
      if (value + SCREEN_HEIGHT > layoutY + threshold) {
        startAnimations();
        if (listenerIdRef.current != null) {
          scrollY.removeListener(listenerIdRef.current as string);
          listenerIdRef.current = null;
        }
      }
    });

    return () => {
      if (listenerIdRef.current != null) {
        try {
          scrollY.removeListener(listenerIdRef.current as string);
        } catch {}
        listenerIdRef.current = null;
      }
    };
  }, [layoutY, scrollY]);

  const onLayout = (e: LayoutChangeEvent) => {
    setLayoutY(e.nativeEvent.layout.y);
  };

  const showComingSoon = () => {
    Toast.show({
      type: 'info',
      text1: 'Coming Soon!',
      visibilityTime: 1500,
      position: 'bottom',
    });
  };

  return (
    <Animated.View
      onLayout={onLayout}
      style={[styles.container, { opacity: fade, transform: [{ translateY: translate }] }]}
    >
      <Text FONT_12 style={styles.overline} color={color.palette.text.primary}>
        ABOUT US
      </Text>

      <View style={styles.headerColumn}>
        <Text FONT_28 bold style={styles.heading} color={color.palette.text.primary}>
          We Exist to Restore What's Been Hidden From You
        </Text>

        <TouchableOpacity style={styles.cta} onPress={showComingSoon} activeOpacity={0.8}>
          <Text bold FONT_14 color={color.palette.text.primary} style={{ textAlign: 'center' }}>
            View Origin Story
          </Text>
        </TouchableOpacity>
      </View>

      <Text FONT_16 color={color.palette.text.secondary} style={styles.body}>
        The most important truths have been hidden by taboo and authority, just as they had been for
        Spiritual Data's founder, despite higher education. Most people don't realize that
        parapsychology researchers have already uncovered evidence that could radically reshape the
        world's spiritual beliefs, if understood.
        {'\n\n'}
        In 2014, scientists openly called for moving past the limits of the materialist paradigm,
        because of scientific authorities ignoring spiritual and paranormal experiences and
        punishing dissent. At Spiritual Data, we don't choose the answers, but we let the evidence
        speak. Our AI algorithm is built to be unbiased, data-driven, and open. So you can explore
        what's most likely true according to the algorithm, and argue if you disagree.
      </Text>

      {cardAnims.map((anim, index) => {
        const cardInfo = [
          { title: 'Explore the data with our AI chat', buttonText: 'Sign Up' },
          { title: 'Apply our data to your personal goals', buttonText: 'Learn about Quest' },
          { title: 'See our initiatives', buttonText: 'Learn More' },
        ][index];

        return (
          <Animated.View
            key={index}
            style={[
              styles.card,
              {
                opacity: anim,
                transform: [
                  {
                    translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [10, 0] }),
                  },
                ],
              },
            ]}
          >
            <Text FONT_16 bold color={color.palette.darkcard.contrastText} style={styles.cardTitle}>
              {cardInfo.title}
            </Text>
            <TouchableOpacity
              style={styles.cardButton}
              onPress={showComingSoon}
              activeOpacity={0.85}
            >
              <Text bold FONT_14 color={color.palette.text.primary}>
                {cardInfo.buttonText}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        );
      })}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: verticalScale(28),
    paddingHorizontal: moderateScale(16),
    backgroundColor: color.palette.cosmic?.secondary || color.white,
    alignItems: 'center',
  },
  overline: {
    alignSelf: 'flex-start',
    marginBottom: verticalScale(12),
    fontWeight: '600',
    letterSpacing: 2,
    fontSize: moderateScale(12),
    color: '#1F2540',
  },
  headerColumn: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: moderateScale(12),
    marginBottom: verticalScale(16),
  },
  heading: {
    fontSize: moderateScale(22),
    lineHeight: verticalScale(34),
    color: '#1F2540',
    textAlign: 'center',
  },
  cta: {
    backgroundColor: color.palette.primary?.focus || '#FFD54F',
    paddingVertical: verticalScale(12),
    paddingHorizontal: moderateScale(14),
    width: '100%',
    borderRadius: moderateScale(10),
    marginTop: verticalScale(8),
  },
  body: {
    maxWidth: SCREEN_WIDTH * 0.95,
    textAlign: 'left',
    marginBottom: verticalScale(18),
    color: color.palette.text.secondary,
    lineHeight: verticalScale(22),
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: color.palette.darkcard?.main || '#111827',
    color: color.palette.darkcard?.contrastText || '#fff',
    borderRadius: moderateScale(14),
    paddingVertical: verticalScale(24),
    paddingHorizontal: moderateScale(16),
    marginBottom: verticalScale(14),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
    alignItems: 'flex-start',
  },
  cardTitle: {
    marginBottom: verticalScale(10),
    fontSize: moderateScale(16),
  },
  cardButton: {
    backgroundColor: color.palette.primary?.focus || '#FFD54F',
    paddingVertical: verticalScale(8),
    paddingHorizontal: moderateScale(12),
    borderRadius: moderateScale(999),
    alignSelf: 'flex-start',
  },
});

export default AboutSection;
