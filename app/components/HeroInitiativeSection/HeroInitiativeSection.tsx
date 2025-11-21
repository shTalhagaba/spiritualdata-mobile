import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import Text from '@components/AppText/Text';
import { color } from '@app/utils/color';
import Toast from 'react-native-toast-message';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const initiativeImages = {
  1: require('@assets/images/initiatives/initiatives1.webp'),
  2: require('@assets/images/initiatives/initiatives2.webp'),
  3: require('@assets/images/initiatives/initiatives3.webp'),
  4: require('@assets/images/initiatives/initiatives4.webp'),
  5: require('@assets/images/initiatives/initiatives5.webp'),
  6: require('@assets/images/initiatives/initiatives6.webp'),
};

const Initiatives = [
  {
    title: 'Evidence Engine',
    icon: initiativeImages[1],
    description:
      'Ranks claims based on evidence using a transparent scoring system—not opinion or popularity.',
  },
  {
    title: 'Experience Archive',
    icon: initiativeImages[2],
    description:
      'A structured database of firsthand spiritual, mystical, mental health, and transformative experiences from across traditions.',
  },
  {
    title: 'Hypothesis Tracker',
    icon: initiativeImages[3],
    description:
      'Explores evolving truth hypotheses and calculates how likely each is, based on new inputs.',
  },
  {
    title: 'Transparency Portal',
    icon: initiativeImages[4],
    description:
      'See exactly how each claim was analyzed—every step, source, and weight is open and verifiable.',
  },
  {
    title: 'Community Insight Lab',
    icon: initiativeImages[5],
    description:
      'Gather and compare the lived insights of seekers, skeptics, researchers, and wisdom traditions.',
  },
  {
    title: 'Open Source Spirituality',
    icon: initiativeImages[6],
    description:
      'A global collaboration to develop transparent, unbiased spiritual knowledge—freely accessible to all.',
  },
];

const InitiativeCard = ({ data, index }: { data: any; index: number }) => {
  const cardColor = index % 2 === 0 ? color.palette.cosmic.primary : color.palette.cosmic.secondary;

  return (
    <View style={[styles.card, { backgroundColor: cardColor }]}>
      <Image source={data.icon} style={styles.cardImage} resizeMode="cover" />
      <Text bold FONT_18 color={color.palette.primary.hero} style={styles.cardTitle}>
        {data.title}
      </Text>
      <Text FONT_14 color={color.palette.primary.hero} style={styles.cardDescription}>
        {data.description}
      </Text>
    </View>
  );
};

const HeroInitiativeSection = () => {
  const navigation = useNavigation();

  const handleSeeInitiatives = () => {
    Toast.show({
      type: 'info',
      text1: 'Coming Soon!',
      visibilityTime: 1500,
      position: 'bottom',
    });
    console.log('Navigate to initiatives');
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

      <View style={styles.header}>
        <Text style={styles.overline} FONT_12 color={color.palette.primary.hero}>
          WHAT WE'RE DOING
        </Text>

        <Text bold FONT_28 color={color.palette.primary.hero} style={styles.heading}>
          Powering Truth Through{'\n'}AI and Collective Insight
        </Text>
      </View>

 
      <View style={styles.cardsContainer}>
        {Initiatives.map((initiative, index) => (
          <InitiativeCard key={index} data={initiative} index={index} />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSeeInitiatives}>
        <Text bold FONT_14 color={color.palette.text.primary}>
          See Our Initiatives
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(16),
    paddingTop: verticalScale(24),
    paddingBottom: verticalScale(40),
    backgroundColor: color.palette.cosmic.primary,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: verticalScale(32),
    width: '100%',
  },
  overline: {
    letterSpacing: 4,
    textTransform: 'uppercase',
    marginBottom: verticalScale(8),
    fontWeight: '600',
    textAlign: 'center',
  },
  heading: {
    textAlign: 'center',
    lineHeight: verticalScale(34),
    marginTop: verticalScale(8),
  },
  cardsContainer: {
    width: '100%',
    marginBottom: verticalScale(24),
  },
  card: {
    width: '100%',
    borderRadius: 12,
    paddingHorizontal: moderateScale(20),
    paddingVertical: verticalScale(40),
    marginBottom: verticalScale(16),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: 8,
    marginBottom: verticalScale(16),
    backgroundColor: color.palette.primary.hover,
  },
  cardTitle: {
    textAlign: 'center',
    marginBottom: verticalScale(12),
    lineHeight: verticalScale(24),
  },
  cardDescription: {
    textAlign: 'center',
    lineHeight: verticalScale(20),
  },
  button: {
    backgroundColor: color.palette.primary.focus,
    paddingVertical: verticalScale(14),
    paddingHorizontal: moderateScale(32),
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
    minWidth: moderateScale(200),
  },
});

export default HeroInitiativeSection;
