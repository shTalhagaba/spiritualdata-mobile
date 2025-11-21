import AboutSection from '@app/components/AboutSection/AboutSection';
import AchievementsSection from '@app/components/AchievementsSection/AchievementsSection';
import ContactSection from '@app/components/ContactSection/ContactSection';
import AppHeader from '@app/components/Header/Header';
import HeroInitiativeSection from '@app/components/HeroInitiativeSection/HeroInitiativeSection';
import HeroSection from '@app/components/HeroSection/HeroSection';
import ScreenWrapper from '@app/components/ScreenWrapper/ScreenWrapper';
import ScrollToTopButton from '@app/components/ScrollToTopButton/ScrollToTopButton';
import WhyChooseUs from '@app/components/WhyChoseUsSection/WhyChoseUsSection';
import { color } from '@app/utils/color';
import { useRef, useState } from 'react';
import { Animated, ScrollView, StyleSheet, View } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

export default function HomeScreen() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const handleScroll = (event: any) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const scrollableHeight = contentSize.height - layoutMeasurement.height;

    scrollY.setValue(contentOffset.y);

    if (scrollableHeight > 0) {
      const progress = Math.max(0, Math.min(1, contentOffset.y / scrollableHeight));
      setScrollProgress(progress);
    } else {
      setScrollProgress(0);
    }
  };

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  return (
    <ScreenWrapper
      header={<AppHeader />}
      fixedHeader={true}
      backgroundColor={color.white}
      scrollable={false}
    >
      <View style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={true}
        >
          <HeroSection navigation={undefined} />
          <AboutSection scrollY={scrollY} />
          <AchievementsSection scrollY={scrollY} />
          <WhyChooseUs />
          <HeroInitiativeSection />
          <ContactSection />
        </ScrollView>
        <ScrollToTopButton
          progress={scrollProgress}
          onPress={scrollToTop}
          size={moderateScale(60)}
          strokeWidth={moderateScale(4)}
          color={color.palette.primary.hero || '#007AFF'}
          backgroundColor="rgba(0,0,0,0.05)"
          iconColor={color.palette.primary.focus || '#007AFF'}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  scrollView: {
    flex: 1,
  },
  largeContent: {
    height: verticalScale(600),
    justifyContent: 'center',
    alignItems: 'center',
    margin: moderateScale(10),
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f5f5f5',
  },
});
