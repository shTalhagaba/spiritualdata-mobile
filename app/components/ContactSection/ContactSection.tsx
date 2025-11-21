import { color } from '@app/utils/color';
import Text from '@components/AppText/Text';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Svg, { Path } from 'react-native-svg';
import Toast from 'react-native-toast-message';

const { width: SCREEN_WIDTH } = Dimensions.get('window');


const contactImages = {
  bg: require('@assets/images/contact/contactbg.gif'),
  left: require('@assets/images/contact/contact1-al.webp'),
  right: require('@assets/images/contact/contact2-al.webp'),
};


const DiscordIcon = ({
  size = 24,
  iconColor = color.palette.primary.focus,
}: {
  size?: number;
  iconColor?: string;
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={iconColor}>
    <Path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
  </Svg>
);

const TikTokIcon = ({
  size = 24,
  iconColor = color.palette.primary.focus,
}: {
  size?: number;
  iconColor?: string;
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={iconColor}>
    <Path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </Svg>
);

const EmailIcon = ({
  size = 24,
  iconColor = color.palette.primary.focus,
}: {
  size?: number;
  iconColor?: string;
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={iconColor}>
    <Path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </Svg>
);

const YouTubeIcon = ({
  size = 24,
  iconColor = color.palette.primary.focus,
}: {
  size?: number;
  iconColor?: string;
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={iconColor}>
    <Path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
  </Svg>
);

const InstagramIcon = ({
  size = 24,
  iconColor = color.palette.primary.focus,
}: {
  size?: number;
  iconColor?: string;
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={iconColor}>
    <Path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </Svg>
);

const TwitterIcon = ({
  size = 24,
  iconColor = color.palette.primary.focus,
}: {
  size?: number;
  iconColor?: string;
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={iconColor}>
    <Path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
  </Svg>
);

const FacebookIcon = ({
  size = 24,
  iconColor = color.palette.primary.focus,
}: {
  size?: number;
  iconColor?: string;
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={iconColor}>
    <Path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </Svg>
);

const LinkedInIcon = ({
  size = 24,
  iconColor = color.palette.primary.focus,
}: {
  size?: number;
  iconColor?: string;
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={iconColor}>
    <Path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </Svg>
);

const socialIcons = [
  {
    icon: <DiscordIcon />,
    link: 'https://discord.com/invite/thQNvPGcJF',
    label: 'Discord',
  },
  {
    icon: <EmailIcon />,
    link: 'https://spiritualdata.beehiiv.com/',
    label: 'Newsletter',
  },
  {
    icon: <TikTokIcon />,
    link: 'https://www.tiktok.com/@spiritual_data',
    label: 'TikTok',
  },
  {
    icon: <YouTubeIcon />,
    link: 'https://www.youtube.com/@spiritualdata',
    label: 'YouTube',
  },
  {
    icon: <InstagramIcon />,
    link: 'https://www.instagram.com/spiritualdata/',
    label: 'Instagram',
  },
  {
    icon: <TwitterIcon />,
    link: 'https://twitter.com/spiritual_data',
    label: 'Twitter',
  },
  {
    icon: <FacebookIcon />,
    link: 'https://www.facebook.com/profile.php?id=100088266313464',
    label: 'Facebook',
  },
  {
    icon: <LinkedInIcon />,
    link: 'https://www.linkedin.com/company/spiritual-data',
    label: 'LinkedIn',
  },
];

interface ContactSectionProps {
  isContactPage?: boolean;
  onClickFunc?: () => void;
}

const ContactSection = ({ isContactPage, onClickFunc }: ContactSectionProps) => {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleContactPress = () => {
    if (isContactPage && onClickFunc) {
      onClickFunc();
    } else {
      Toast.show({
        type: 'info',
        text1: 'Coming Soon',
        position: 'bottom',
      });
    }
  };

  const handleDonatePress = () => {
    Toast.show({
      type: 'info',
      text1: 'Coming Soon',
      position: 'bottom',
    });
  };

  const handleSocialPress = (link: string) => {
    Linking.openURL(link).catch((err) => console.error('Failed to open URL:', err));
  };

  return (
    <ImageBackground source={contactImages.bg} style={styles.container} resizeMode="cover">
     
      <View style={styles.overlay} />

    
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.textContainer, isVisible && styles.fadeIn]}>
      
          <Text style={styles.subtitle} FONT_12 color={color.palette.primary.main}>
            DISCOVER SPIRITUAL DATA
          </Text>

          <Text bold FONT_32 color={color.palette.primary.main} style={styles.heading}>
            POWER A NEW ERA OF{'\n'}SPIRITUAL TRUTH
          </Text>

   
          <Text FONT_16 color={color.palette.primary.main} style={styles.description}>
            We're rethinking spiritual truth using open data, deep research, and unbiased AI — no
            dogma, just clear, evidence-backed insights.
          </Text>

    
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleContactPress}>
              <Text bold FONT_14 color={color.palette.text.primary}>
                CONTACT US
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleDonatePress}>
              <Text bold FONT_14 color={color.palette.text.primary}>
                DONATE
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.socialContainer}>
            <Text bold FONT_12 color={color.palette.primary.main} style={styles.socialTitle}>
              FOLLOW US:
            </Text>

            <View style={styles.socialIconsContainer}>
              {socialIcons.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.socialIcon}
                  onPress={() => handleSocialPress(item.link)}
                  accessibilityLabel={item.label}
                >
                  <View style={styles.iconContainer}>{item.icon}</View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {SCREEN_WIDTH > 768 && (
          <View style={styles.imagesContainer}>
            <ImageBackground
              source={contactImages.left}
              style={styles.sideImage}
              resizeMode="cover"
            />
            <ImageBackground
              source={contactImages.right}
              style={styles.sideImage}
              resizeMode="cover"
            />
          </View>
        )}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: verticalScale(600),
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(40),
    zIndex: 2,
  },
  textContainer: {
    alignItems: 'center',
    width: '100%',
    opacity: 0,
    transform: [{ translateY: 20 }],
  },
  fadeIn: {
    opacity: 1,
    transform: [{ translateY: 0 }],
  },
  subtitle: {
    letterSpacing: 4,
    textTransform: 'uppercase',
    marginBottom: verticalScale(8),
    fontWeight: '600',
    textAlign: 'center',
  },
  heading: {
    textAlign: 'center',
    lineHeight: verticalScale(38),
    marginBottom: verticalScale(16),
    letterSpacing: 1,
  },
  description: {
    textAlign: 'center',
    lineHeight: verticalScale(22),
    marginBottom: verticalScale(32),
    maxWidth: SCREEN_WIDTH * 0.9,
    letterSpacing: 0.5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: moderateScale(16),
    marginBottom: verticalScale(40),
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: color.palette.primary.focus,
    paddingVertical: verticalScale(12),
    paddingHorizontal: moderateScale(24),
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
    minWidth: moderateScale(120),
  },
  socialContainer: {
    alignItems: 'center',
    width: '100%',
  },
  socialTitle: {
    letterSpacing: 3,
    marginBottom: verticalScale(16),
    textTransform: 'uppercase',
  },
  socialIconsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: moderateScale(8),
  },
  socialIcon: {
    marginHorizontal: moderateScale(4),
  },
  iconContainer: {
    width: moderateScale(44),
    height: moderateScale(44),
    backgroundColor: color.palette.primary.hover,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  imagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: verticalScale(40),
    display: 'none',
  },
  sideImage: {
    width: '30%',
    height: verticalScale(200),
    borderRadius: 12,
  },
});

export default ContactSection;
