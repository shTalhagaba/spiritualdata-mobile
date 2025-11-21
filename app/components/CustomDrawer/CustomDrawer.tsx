import { color } from '@app/utils/color';
import Text from '@components/AppText/Text';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Toast from 'react-native-toast-message';

type MenuItem = { name: string; path?: string; icon?: any; children?: MenuItem[] };

const MENU: MenuItem[] = [
  {
    name: 'Products',
    icon: require('@assets/images/navbar/icons-product.gif'),
    children: [
      {
        name: 'Quest',
        path: 'ProductsQuest',
        icon: require('@assets/images/navbar/icons-quest.gif'),
      },
      {
        name: 'Concept AI',
        path: 'ProductsConceptAI',
        icon: require('@assets/images/navbar/icons-concept-ai.gif'),
      },
    ],
  },
  {
    name: 'Initiatives',
    icon: require('@assets/images/navbar/icons-initiatives.gif'),
    children: [
      {
        name: 'Estimating Truth',
        path: 'InitiativesEstimatingTruth',
        icon: require('@assets/images/navbar/icons-estimating.gif'),
      },
      {
        name: 'Wikipedia Advocacy',
        path: 'InitiativesWikipedia',
        icon: require('@assets/images/navbar/icons-wikipedia.gif'),
      },
      {
        name: 'Psychic Ability Certification',
        path: 'InitiativesPsychic',
        icon: require('@assets/images/navbar/icons-psychic.gif'),
      },
    ],
  },
  { name: 'Research', path: 'Research', icon: require('@assets/images/navbar/icons-research.gif') },
  { name: 'Donate', path: 'Donate', icon: require('@assets/images/navbar/icons-donate.gif') },
  { name: 'About Us', path: 'About', icon: require('@assets/images/navbar/icons-about.gif') },
  { name: 'Contact', path: 'Contact', icon: require('@assets/images/navbar/icons-contact.gif') },
];

export default function CustomDrawer(props: DrawerContentComponentProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const userExists = false;

  const onNav = (path?: string) => {
    if (path === 'Home') {
      props.navigation.navigate('Home' as never);
      props.navigation.closeDrawer();
      return;
    }

    Toast.show({
      type: 'info',
      text1: 'Coming Soon',
      position: 'bottom',
    });

    props.navigation.closeDrawer();
  };

  return (
    <LinearGradient
      colors={[
        color.palette.primary.focus,
        color.palette.primary.main,
        color.palette.primary.main,
        color.palette.primary.main,
        color.palette.primary.main,
        color.palette.primary.main,
        color.palette.primary.focus,
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.closeBtn} onPress={() => props.navigation.closeDrawer()}>
          <Image
            source={require('@assets/images/navbar/icons-close.gif')}
            style={styles.closeIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onNav('Home')}>
          <Image source={require('@assets/images/navbar/SD-Logo.png')} style={styles.logo} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.menuWrap} contentContainerStyle={{ paddingBottom: 40 }}>
        {MENU.map((m) => {
          const hasChildren = !!m.children?.length;
          return (
            <View key={m.name} style={styles.menuBlock}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() =>
                  hasChildren ? setExpanded(expanded === m.name ? null : m.name) : onNav(m.path)
                }
              >
                <Image
                  source={m.icon ?? require('@assets/images/navbar/icons-product.gif')}
                  style={styles.menuIcon}
                />
                <Text bold FONT_16 color={color.palette.text.primary}>
                  {m.name}
                </Text>
                {hasChildren && (
                  <Text bold FONT_20 color={color.palette.text.primary}>
                    {expanded === m.name ? '−' : '+'}
                  </Text>
                )}
              </TouchableOpacity>

              {hasChildren && expanded === m.name && (
                <View style={styles.subList}>
                  {m.children!.map((c) => (
                    <TouchableOpacity
                      key={c.name}
                      style={styles.subItem}
                      onPress={() => onNav(c.path)}
                    >
                      <Image source={c.icon} style={styles.subIcon} />
                      <Text FONT_14 color={color.palette.text.secondary}>
                        {c.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.signBtn}
          onPress={() => onNav(userExists ? 'Chat' : 'SignIn')}
        >
          <Image
            source={require('@assets/images/navbar/icons-loginout.gif')}
            style={styles.signIcon}
          />
          <Text bold FONT_16 color={color.palette.text.primary}>
            {userExists ? 'Sign Out' : 'Sign In'}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  topRow: {
    width: '100%',
    paddingTop: moderateScale(18),
    paddingHorizontal: moderateScale(18),
    paddingBottom: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtn: {
    position: 'absolute',
    right: moderateScale(12),
    top: moderateScale(18),
    zIndex: 2,
  },
  closeIcon: { width: 22, height: 22, resizeMode: 'contain' },
  logo: { width: 160, height: 44, resizeMode: 'contain' },
  menuWrap: { flex: 1, paddingHorizontal: moderateScale(14), marginTop: moderateScale(8) },
  menuBlock: {
    marginBottom: moderateScale(6),
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.06)',
  },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: moderateScale(12) },
  menuIcon: { width: 26, height: 26, marginRight: moderateScale(12), resizeMode: 'contain' },
  subList: { paddingLeft: moderateScale(36), paddingBottom: moderateScale(8) },
  subItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: moderateScale(10) },
  subIcon: { width: 20, height: 20, marginRight: moderateScale(10), resizeMode: 'contain' },
  footer: { padding: moderateScale(18) },
  signBtn: {
    width: '100%',
    height: 52,
    backgroundColor: color.palette.primary.focus,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  signIcon: {
    width: 22,
    height: 22,
    marginRight: 10,
    resizeMode: 'contain',
    tintColor: color.palette.text.primary,
  },
});
