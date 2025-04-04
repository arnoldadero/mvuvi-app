import React, { useState } from 'react';
import { SafeAreaView, StatusBar, ScrollView, Image, FlatList } from 'react-native';
import { YStack, H2, Text, Card, Paragraph, XStack, Input } from 'tamagui';
import { useTranslation } from 'react-i18next';
import { Feather } from '@expo/vector-icons';

interface FishSpeciesScreenProps {
  navigation: any;
}

// Type aliases for Tamagui components
const Y: any = YStack;
const H: any = H2;
const T: any = Text;
const P: any = Paragraph;
const X: any = XStack;
const C: any = Card;
const I: any = Input;

// Fish species data
const fishSpecies = [
  {
    id: '1',
    name: 'Nile Perch',
    scientificName: 'Lates niloticus',
    description: 'A large freshwater fish native to Lake Victoria. It\'s a popular commercial fish with white, firm flesh.',
    habitat: 'Deep waters of Lake Victoria',
    conservationStatus: 'Least Concern',
    // Using a placeholder color instead of requiring images that might not exist
    imageColor: '#3498db',
  },
  {
    id: '2',
    name: 'Tilapia',
    scientificName: 'Oreochromis niloticus',
    description: 'A common freshwater fish found in Lake Victoria and other Kenyan water bodies. Popular for its mild taste.',
    habitat: 'Shallow waters, rivers, and lakes',
    conservationStatus: 'Least Concern',
    imageColor: '#2ecc71',
  },
  {
    id: '3',
    name: 'Omena/Dagaa',
    scientificName: 'Rastrineobola argentea',
    description: 'Small sardine-like fish that are a crucial part of the Lake Victoria ecosystem and local diet.',
    habitat: 'Surface waters of Lake Victoria',
    conservationStatus: 'Not Evaluated',
    imageColor: '#f39c12',
  },
  {
    id: '4',
    name: 'Catfish',
    scientificName: 'Clarias gariepinus',
    description: 'Freshwater fish with distinctive whisker-like barbels. Adaptable to various water conditions.',
    habitat: 'Rivers, lakes, and dams across Kenya',
    conservationStatus: 'Least Concern',
    imageColor: '#34495e',
  },
  {
    id: '5',
    name: 'Tuna',
    scientificName: 'Thunnus spp.',
    description: 'Saltwater fish found in Kenya\'s coastal waters. Important for commercial fishing.',
    habitat: 'Coastal waters of Kenya',
    conservationStatus: 'Varies by species',
    imageColor: '#e74c3c',
  },
];

export function FishSpeciesScreen({ navigation }: FishSpeciesScreenProps) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter fish species based on search query
  const filteredSpecies = fishSpecies.filter(
    (species) =>
      species.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      species.scientificName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderFishSpeciesItem = ({ item }) => (
    <C borderRadius="$4" bordered marginBottom="$3">
      <Y>
        <Y
          height={150}
          backgroundColor={item.imageColor}
          borderTopLeftRadius={8}
          borderTopRightRadius={8}
          alignItems="center"
          justifyContent="center"
        >
          <T color="white" fontSize="$8" fontWeight="bold">{item.name.charAt(0)}</T>
        </Y>
        <Y padding="$4" space="$2">
          <X justifyContent="space-between" alignItems="center">
            <T fontWeight="bold" fontSize="$5">{item.name}</T>
            <T fontSize="$2" fontStyle="italic">{item.scientificName}</T>
          </X>
          <P>{item.description}</P>

          <Y space="$1" marginTop="$2">
            <X space="$2" alignItems="center">
              <Feather name="map-pin" size={16} color="#0891b2" />
              <T fontWeight="bold">{t('sustainableFishing.habitat')}</T>
            </X>
            <T paddingLeft="$6">{item.habitat}</T>
          </Y>

          <Y space="$1">
            <X space="$2" alignItems="center">
              <Feather name="alert-circle" size={16} color="#0891b2" />
              <T fontWeight="bold">{t('sustainableFishing.conservationStatus')}</T>
            </X>
            <T paddingLeft="$6">{item.conservationStatus}</T>
          </Y>
        </Y>
      </Y>
    </C>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Y padding="$4" space="$4">
        <H>{t('sustainableFishing.fishSpecies')}</H>
        <P>{t('sustainableFishing.fishSpeciesDescription', 'Common fish species found in Kenyan waters.')}</P>

        {/* Search Bar */}
        <I
          placeholder={t('sustainableFishing.searchSpecies', 'Search fish species...')}
          value={searchQuery}
          onChangeText={setSearchQuery}
          icon={<Feather name="search" size={16} color="#999" />}
        />

        {/* Fish Species List */}
        <FlatList
          data={filteredSpecies}
          renderItem={renderFishSpeciesItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            <Y alignItems="center" padding="$4">
              <Feather name="search" size={48} color="#ccc" />
              <T marginTop="$2" color="$gray10">
                {t('sustainableFishing.noSpeciesFound', 'No fish species found matching your search.')}
              </T>
            </Y>
          }
        />
      </Y>
    </SafeAreaView>
  );
}
