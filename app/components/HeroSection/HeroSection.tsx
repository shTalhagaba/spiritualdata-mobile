import { floatersData } from '@app/data/HomeData';
import { color } from '@app/utils/color';
import heroImage from '@assets/images/hero/astrounot16.webp';
import Text from '@components/AppText/Text';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Toast from 'react-native-toast-message';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const HeroSection = ({ navigation }: { navigation: any }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const showComingSoon = () => {
    Toast.show({
      type: 'info',
      text1: 'Coming Soon!',
      position: 'bottom',
      visibilityTime: 2000,
      bottomOffset: 50,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Text bold FONT_32 color={color.palette.text.primary} style={styles.heading}>
        Spiritual Data = Intellectual Autonomy
      </Text>

      <Text FONT_16 color={color.palette.text.secondary} style={styles.subheading}>
        Discover a new paradigm for scientific consensus, far beyond human capability. Spiritual
        Data exists to expand your understanding by showing you the data directly, and analyzing it
        from diverse perspectives. Humans provide the data, AI analyzes it from relevant
        perspectives to overcome bias. Then you can decide for yourself.
      </Text>

      <View style={styles.buttonColumn}>
        <TouchableOpacity
          style={[styles.buttonFull, { backgroundColor: color.palette.primary.focus }]}
          onPress={showComingSoon}
        >
          <Text bold FONT_14 color={color.palette.text.primary}>
            Discord
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonFull, { backgroundColor: color.palette.primary.focus }]}
          onPress={showComingSoon}
        >
          <Text bold FONT_14 color={color.palette.text.primary}>
            Newsletter
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonFull, styles.outlineButtonFull]}
          onPress={showComingSoon}
        >
          <Text bold FONT_14 color={color.palette.primary.hover}>
            Discover More
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {floatersData.map((item, index) => (
          <TouchableOpacity key={index} style={styles.card} onPress={showComingSoon}>
            <View style={styles.iconBox}>{item.icon}</View>
            <Text FONT_14 color={color.palette.text.primary}>
              {item.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Image source={heroImage} style={styles.heroImage} resizeMode="contain" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(16),
    paddingTop: verticalScale(24),
    alignItems: 'center',
    backgroundColor: color.white,
  },
  heading: {
    textAlign: 'center',
    lineHeight: verticalScale(42),
    marginBottom: verticalScale(12),
  },
  subheading: {
    textAlign: 'center',
    maxWidth: SCREEN_WIDTH * 0.9,
    marginBottom: verticalScale(24),
  },
  buttonColumn: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    marginBottom: verticalScale(24),
    gap: verticalScale(12),
  },
  buttonFull: {
    width: '100%',
    paddingVertical: verticalScale(12),
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  outlineButtonFull: {
    borderWidth: 1,
    borderColor: color.palette.primary.hover,
    backgroundColor: color.white,
  },
  cardsContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: verticalScale(24),
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.palette.primary.main,
    paddingVertical: verticalScale(10),
    paddingHorizontal: moderateScale(16),
    borderRadius: 8,
    width: '90%',
    marginBottom: verticalScale(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconBox: {
    width: moderateScale(28),
    height: moderateScale(28),
    borderRadius: 6,
    backgroundColor: color.palette.primary.focus,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(12),
  },
  heroImage: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_WIDTH * 0.5,
    marginBottom: verticalScale(40),
  },
});

export default HeroSection;
