import { color } from '@app/utils/color';
import Text from '@components/AppText/Text';
import React from 'react';
import { ActivityIndicator, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { moderateScale, verticalScale } from 'react-native-size-matters';

interface ScreenWrapperProps {
  children: React.ReactNode;
  style?: any;
  header?: React.ReactNode;
  fixedHeader?: boolean;
  statusBarColor?: string;
  statusBarStyle?: 'default' | 'light-content' | 'dark-content';
  loading?: boolean;
  loadingText?: string;
  safeArea?: boolean;
  scrollable?: boolean;
  backgroundColor?: string;
  centerContent?: boolean;
  centerHorizontal?: boolean;
  centerVertical?: boolean;
}

const HEADER_HEIGHT = verticalScale(60);

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  style,
  header,
  fixedHeader = false,
  statusBarColor = color.palette.primary.hero,
  statusBarStyle = 'light-content',
  loading = false,
  loadingText = 'Loading...',
  safeArea = true,
  scrollable = false,
  backgroundColor = color.white,
  centerContent = false,
  centerHorizontal = false,
  centerVertical = false,
}) => {
  const insets = useSafeAreaInsets();

  const getCenteringStyles = () => {
    if (centerContent) return styles.centeredContent;

    const centeringStyles: any = {};
    if (centerHorizontal) centeringStyles.justifyContent = 'center';
    if (centerVertical) centeringStyles.alignItems = 'center';
    return centeringStyles;
  };

  const centeringStyles = getCenteringStyles();

  const scrollContentContainerStyle = [
    styles.scrollContent,
    { backgroundColor },
    centeringStyles,
    fixedHeader && { paddingTop: HEADER_HEIGHT },
  ];

  const viewContainerStyle = [
    styles.container,
    { backgroundColor },
    centeringStyles,
    fixedHeader && { marginTop: HEADER_HEIGHT },
  ];

  return (
    <>
      <StatusBar backgroundColor={statusBarColor} barStyle={statusBarStyle} />
      <View
        style={[
          styles.wrapper,
          {
            backgroundColor,
            paddingTop: safeArea ? insets.top : 0,
            paddingBottom: safeArea ? insets.bottom : 0,
            paddingLeft: safeArea ? insets.left : 0,
            paddingRight: safeArea ? insets.right : 0,
          },
          style,
        ]}
      >
        {fixedHeader && header && (
          <View
            style={[
              styles.fixedHeaderContainer,
              {
                height: HEADER_HEIGHT,
                backgroundColor: '#f5f5f5',
                borderBottomColor: '#ddd',
              },
            ]}
          >
            {header}
          </View>
        )}

        {scrollable ? (
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={scrollContentContainerStyle}
            showsVerticalScrollIndicator={true}
            bounces={true}
          >
            {!fixedHeader && header}
            {children}
          </ScrollView>
        ) : (
          <View style={viewContainerStyle}>
            {!fixedHeader && header}
            {children}
          </View>
        )}

        {loading && (
          <View style={[styles.loadingOverlay, { backgroundColor: 'rgba(0,0,0,0.3)' }]}>
            <ActivityIndicator size="large" color="#000" />
            <Text style={styles.loadingText}>{loadingText}</Text>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    minHeight: '100%',
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fixedHeaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: verticalScale(10),
    fontSize: moderateScale(16),
  },
});

export default ScreenWrapper;
