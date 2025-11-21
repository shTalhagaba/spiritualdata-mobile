import React from 'react';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { JSX } from 'react';

export interface FloaterItem {
  text: string;
  icon: JSX.Element;
  link: string;
}

export const floatersData: FloaterItem[] = [
  {
    text: 'Crisis We Are Dealing With',
    icon: <MaterialIcons name="insights" size={20} color="#000" />,
    link: 'Crisis',
  },
  {
    text: 'Truth Estimation AI',
    icon: <MaterialIcons name="public" size={20} color="#000" />,
    link: 'InitiativesEstimatingTruth',
  },
  {
    text: 'Change We Are Bringing',
    icon: <MaterialCommunityIcons name="human-handsup" size={20} color="#000" />,
    link: 'Change',
  },
  {
    text: 'Quest Product',
    icon: <MaterialCommunityIcons name="database" size={20} color="#000" />,
    link: 'ProductsQuest',
  },
];
