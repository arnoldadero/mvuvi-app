import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import { useAuthStore } from '../../store/auth/auth-store';

type ProfileButtonProps = {
  mini?: boolean;
};

export function ProfileButton({ mini = false }: ProfileButtonProps) {
  const navigation = useNavigation();
  const { user } = useAuthStore();
  
  const handlePress = () => {
    // Use CommonActions to navigate to the UserProfile screen in the root navigator
    navigation.dispatch(
      CommonActions.navigate({
        name: 'UserProfile',
      })
    );
  };
  
  if (mini) {
    return (
      <Pressable onPress={handlePress}>
        <View style={styles.miniAvatar}>
          <Feather name="user" size={14} color="#0891b2" />
        </View>
      </Pressable>
    );
  }
  
  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Feather name="user" size={18} color="#0891b2" />
        </View>
        
        <View style={styles.badge}>
          <Feather name="settings" size={10} color="#fff" />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    backgroundColor: '#e0f2fe',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  avatarContainer: {
    position: 'relative',
  },
  badge: {
    alignItems: 'center',
    backgroundColor: '#0891b2',
    borderColor: 'white',
    borderRadius: 10,
    borderWidth: 1.5,
    bottom: -2,
    height: 18,
    justifyContent: 'center',
    position: 'absolute',
    right: -2,
    width: 18,
  },
  container: {
    marginRight: 8,
  },
  miniAvatar: {
    alignItems: 'center',
    backgroundColor: '#e0f2fe',
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
});
