import { color } from '@app/utils/color';
import Text from '@components/AppText/Text';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const reasons = [
  {
    title: 'Unbiased Truth Estimation',
    description:
      'Our AI evaluates claims based on weighted evidence—not belief, authority, or popularity—giving you clarity without dogma. We tackle bias by automating diverse expert perspectives on every data point.',
  },
  {
    title: 'Data from All Perspectives',
    description:
      'We aggregate human experiences, scientific studies, and overlooked data sources to ensure no valuable insight is left behind, while critically evaluating reliability.',
  },
  {
    title: 'Transparency at Every Step',
    description:
      'The algorithms and data used to reach conclusions are shared openly so you can review—and decide for yourself.',
  },
  {
    title: 'Mission-Driven, Not Institution-Funded',
    description:
      "We're a nonprofit powered by people—not corporations—committed to truth and spiritual autonomy.",
  },
];

const WhyChooseUs = () => {
  return (
    <View style={styles.container}>

      <Text style={styles.overline} FONT_12 color={color.palette.primary.hover}>
        WHY CHOOSE US
      </Text>

      <Text bold FONT_28 color={color.palette.primary.hover} style={styles.heading}>
        Powered by Evidence{'\n'}Built for Spiritual Clarity
      </Text>

      <View style={styles.reasonsContainer}>
        {reasons.map((item, index) => (
          <View key={index} style={styles.reasonItem}>

            <View style={styles.titleRow}>

              <View style={styles.iconBox}>
                <Text bold FONT_16 color={color.palette.primary.main}>
                  ✓
                </Text>
              </View>

              <Text bold FONT_20 color={color.palette.text.primary} style={styles.reasonTitle}>
                {item.title}
              </Text>
            </View>


            <View style={styles.descriptionContainer}>
              <Text FONT_14 color={color.palette.text.secondary} style={styles.description}>
                {item.description}
              </Text>
            </View>


            {index < reasons.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(16),
    paddingTop: verticalScale(24),
    paddingBottom: verticalScale(40),
    backgroundColor: color.palette.cosmic.secondary,
  },
  overline: {
    letterSpacing: 4,
    textTransform: 'uppercase',
    marginBottom: verticalScale(8),
    textAlign: 'center',
    fontWeight: '600',
  },
  heading: {
    textAlign: 'center',
    lineHeight: verticalScale(34),
    marginBottom: verticalScale(32),
    fontWeight: '600',
  },
  reasonsContainer: {
    width: '100%',
  },
  reasonItem: {
    marginBottom: verticalScale(24),
    paddingBottom: verticalScale(16),
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(8),
    gap: moderateScale(16),
  },
  iconBox: {
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: 6,
    backgroundColor: color.palette.text.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(4),
  },
  reasonTitle: {
    flex: 1,
    lineHeight: verticalScale(24),
    fontWeight: '500',
    color: '#1F2540',
  },
  descriptionContainer: {
    marginLeft: moderateScale(46),
  },
  description: {
    lineHeight: verticalScale(22),
    textAlign: 'left',
  },
  divider: {
    height: 1,
    backgroundColor: color.palette.divider,
    marginTop: verticalScale(24),
  },
});

export default WhyChooseUs;
