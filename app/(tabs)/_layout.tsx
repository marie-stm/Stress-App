import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors'; // Ton fichier de thème fixe
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];

  return (
    <Tabs
      screenOptions={{
        // Couleur d'activation de l'onglet, en utilisant la teinte du thème
        tabBarActiveTintColor: themeColors.tint,
        // Bouton de tabulation personnalisé
        tabBarButton: HapticTab,
        // Fond personnalisé de la barre de tabulation
        tabBarBackground: TabBarBackground,
        // Active l'affichage du header
        headerShown: true,
        // Style du header personnalisé (avec ton thème)
        headerStyle: {
          backgroundColor: themeColors.background,
        },
        headerTintColor: themeColors.text,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute', // pour faire le flou sous iOS par exemple
          },
          default: {},
        }),
      }}
    >
      {/* Page principale : cache le header car c'est l'accueil */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
