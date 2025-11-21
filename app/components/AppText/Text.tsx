import { fontFamily as fm, fontSize as fs } from '@utils/fonts';
import React, { ReactNode } from 'react';
import { Text as RNText, TextProps } from 'react-native';

interface Props extends TextProps {
  children: ReactNode;
  color?: string;
  light?: boolean;
  regular?: boolean;
  bold?: boolean;
  italic?: boolean;
  FONT_48?: boolean;
  FONT_44?: boolean;
  FONT_40?: boolean;
  FONT_38?: boolean;
  FONT_36?: boolean;
  FONT_34?: boolean;
  FONT_32?: boolean;
  FONT_30?: boolean;
  FONT_28?: boolean;
  FONT_26?: boolean;
  FONT_24?: boolean;
  FONT_22?: boolean;
  FONT_20?: boolean;
  FONT_18?: boolean;
  FONT_16?: boolean;
  FONT_14?: boolean;
  FONT_12?: boolean;
  FONT_10?: boolean;
  FONT_9?: boolean;
  FONT_8?: boolean;
  FONT_6?: boolean;
}

const Text = (props: Props) => {
  const { children, light, regular, bold, italic, color, ...sizeProps } = props;

  let fontFamily = fm.REGULAR;
  if (light) fontFamily = italic ? fm.LIGHT_ITALIC : fm.LIGHT;
  else if (regular) fontFamily = italic ? fm.REGULAR_ITALIC : fm.REGULAR;
  else if (bold) fontFamily = italic ? fm.BOLD_ITALIC : fm.BOLD;

  let fontSize = fs.FONT_14;
  for (const key in sizeProps) {
    if (sizeProps[key as keyof typeof sizeProps]) {
      fontSize = fs[key as keyof typeof fs];
      break;
    }
  }

  return (
    <RNText {...props} style={[{ fontFamily, fontSize, color: color ?? '#000' }, props.style]}>
      {children}
    </RNText>
  );
};

export default Text;
