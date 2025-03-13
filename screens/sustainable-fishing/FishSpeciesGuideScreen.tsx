import React, { useState } from 'react';
import { SafeAreaView, StatusBar, Image, FlatList } from 'react-native';
import { YStack, H2, Text, Card, Button, XStack, Paragraph, Input, ScrollView, View } from 'tamagui';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Search, Info } from '@tamagui/lucide-icons';

interface FishSpeciesGuideScreenProps {
  navigation: any;
}

// Fish species data
const fishSpeciesData = [
  {
    id: '1',
    name: 'Nile Perch',
    scientificName: 'Lates niloticus',
    localName: 'Mbuta',
    image: require('../../assets/images/nile-perch.png'),
    minSize: 50, // cm
    maturitySize: 60, // cm
    bestPractices: [
      'Use hooks of size 7-9 to avoid catching juveniles',
      'Release fish smaller than 50cm',
      'Avoid fishing in breeding areas during spawning season (April-June)',
    ],
    status: 'Vulnerable',
    description: 'The Nile perch is a large freshwater fish native to the Nile basin. It was introduced to Lake Victoria in the 1950s and has since become a dominant predator in the lake.',
  },
  {
    id: '2',
    name: 'Tilapia',
    scientificName: 'Oreochromis niloticus',
    localName: 'Ngege',
    image: require('../../assets/images/tilapia.png'),
    minSize: 25, // cm
    maturitySize: 30, // cm
    bestPractices: [
      'Use gill nets with mesh size of at least 5 inches',
      'Release fish smaller than 25cm',
      'Avoid fishing in shallow waters during breeding season (February-April)',
    ],
    status: 'Least Concern',
    description: 'Tilapia is a popular food fish and is the second most important catch in Lake Victoria after the Nile perch. It feeds mainly on phytoplankton and detritus.',
  },
  {
    id: '3',
    name: 'Dagaa',
    scientificName: 'Rastrineobola argentea',
    localName: 'Omena',
    image: require('../../assets/images/dagaa.png'),
    minSize: 4, // cm
    maturitySize: 5, // cm
    bestPractices: [
      'Use nets with mesh size of at least 10mm',
      'Avoid fishing during full moon periods',
      'Respect closed seasons (April-August)',
    ],
    status: 'Least Concern',
    description: 'Dagaa is a small pelagic cyprinid fish native to Lake Victoria. It is an important source of protein for local communities and is often dried and sold in markets.',
  },
  {
    id: '4',
    name: 'African Catfish',
    scientificName: 'Clarias gariepinus',
    localName: 'Kamongo',
    image: require('../../assets/images/catfish.png'),
    minSize: 35, // cm
    maturitySize: 40, // cm
    bestPractices: [
      'Use hook and line or traps rather than nets',
      'Release fish smaller than 35cm',
      'Avoid fishing in swampy areas during breeding season (rainy season)',
    ],
    status: 'Least Concern',
    description: 'The African catfish is a large, eel-like fish found throughout Africa. It is highly adaptable and can survive in a wide range of environmental conditions.',
  },
  {
    id: '5',
    name: 'Lungfish',
    scientificName: 'Protopterus aethiopicus',
    localName: 'Kamongo',
    image: require('../../assets/images/lungfish.png'),
    minSize: 60, // cm
    maturitySize: 80, // cm
    bestPractices: [
      'Use large hooks (size 4-6) for targeted fishing',
      'Release fish smaller than 60cm',
      'Avoid fishing in swampy areas during dry season',
    ],
    status: 'Near Threatened',
    description: 'The marbled lungfish is one of the few fish species that can breathe air. It is found in swampy areas of Lake Victoria and its tributaries.',
  },
];

export function FishSpeciesGuideScreen({ navigation }: FishSpeciesGuideScreenProps) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState<typeof fishSpeciesData[0] | null>(null);

  const filteredSpecies = fishSpeciesData.filter(
    species => 
      species.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      species.localName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      species.scientificName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSpeciesPress = (species: typeof fishSpeciesData[0]) => {
    setSelectedSpecies(species);
  };

  const handleBackPress = () => {
    if (selectedSpecies) {
      setSelectedSpecies(null);
    } else {
      navigation.goBack();
    }
  };

  const renderSpeciesItem = ({ item }: { item: typeof fishSpeciesData[0] }) => (
    <Card 
      borderRadius="$4" 
      bordered
      marginBottom="$3"
      pressStyle={{ opacity: 0.8 }}
      onPress={() => handleSpeciesPress(item)}
    >
      <XStack padding="$4" alignItems="center" space="$3">
        <Image
          source={item.image}
          style={{ width: 80, height: 80, borderRadius: 8 }}
          resizeMode="cover"
        />
        <YStack flex={1}>
          <Text fontWeight="bold">{item.name}</Text>
          <Text fontSize="$2" fontStyle="italic">{item.scientificName}</Text>
          <Text fontSize="$2">{t('sustainableFishing.localName')}: {item.localName}</Text>
          <XStack alignItems="center" space="$1" marginTop="$1">
            <View 
              width={10} 
              height={10} 
              borderRadius={5} 
              backgroundColor={
                item.status === 'Vulnerable' ? '$orange9' : 
                item.status === 'Near Threatened' ? '$yellow9' : 
                '$green9'
              } 
            />
            <Text fontSize="$2">{item.status}</Text>
          </XStack>
        </YStack>
      </XStack>
    </Card>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {selectedSpecies ? (
        // Species details view
        <ScrollView>
          <YStack padding="$4" space="$4">
            <Button
              icon={<ArrowLeft />}
              variant="outlined"
              alignSelf="flex-start"
              onPress={handleBackPress}
            >
              {t('common.back')}
            </Button>
            
            <Image
              source={selectedSpecies.image}
              style={{ width: '100%', height: 200, borderRadius: 8 }}
              resizeMode="cover"
            />
            
            <YStack space="$2">
              <H2>{selectedSpecies.name}</H2>
              <Text fontStyle="italic">{selectedSpecies.scientificName}</Text>
              <Text>{t('sustainableFishing.localName')}: {selectedSpecies.localName}</Text>
              
              <XStack alignItems="center" space="$1" marginTop="$1">
                <View 
                  width={12} 
                  height={12} 
                  borderRadius={6} 
                  backgroundColor={
                    selectedSpecies.status === 'Vulnerable' ? '$orange9' : 
                    selectedSpecies.status === 'Near Threatened' ? '$yellow9' : 
                    '$green9'
                  } 
                />
                <Text>{t('sustainableFishing.conservationStatus')}: {selectedSpecies.status}</Text>
              </XStack>
            </YStack>
            
            <Paragraph>{selectedSpecies.description}</Paragraph>
            
            <Card borderRadius="$4" bordered>
              <YStack padding="$4" space="$3">
                <Text fontWeight="bold">{t('sustainableFishing.sizeLimits')}</Text>
                
                <XStack space="$4" justifyContent="space-around">
                  <YStack alignItems="center">
                    <Text fontSize="$6" fontWeight="bold">{selectedSpecies.minSize} cm</Text>
                    <Text fontSize="$2">{t('sustainableFishing.minimumSize')}</Text>
                  </YStack>
                  
                  <YStack alignItems="center">
                    <Text fontSize="$6" fontWeight="bold">{selectedSpecies.maturitySize} cm</Text>
                    <Text fontSize="$2">{t('sustainableFishing.maturitySize')}</Text>
                  </YStack>
                </XStack>
              </YStack>
            </Card>
            
            <Card borderRadius="$4" bordered backgroundColor="$blue2">
              <YStack padding="$4" space="$3">
                <Text fontWeight="bold">{t('sustainableFishing.bestPractices')}</Text>
                
                {selectedSpecies.bestPractices.map((practice, index) => (
                  <XStack key={index} space="$2" alignItems="flex-start">
                    <Info size="$1" color="$blue9" />
                    <Text flex={1}>{practice}</Text>
                  </XStack>
                ))}
              </YStack>
            </Card>
            
            <Button
              backgroundColor="$green9"
              color="white"
              onPress={() => navigation.navigate('FishingRegulations')}
            >
              {t('sustainableFishing.viewRegulations')}
            </Button>
          </YStack>
        </ScrollView>
      ) : (
        // Species list view
        <YStack flex={1} padding="$4">
          <XStack justifyContent="space-between" alignItems="center" marginBottom="$4">
            <Button
              icon={<ArrowLeft />}
              variant="outlined"
              onPress={handleBackPress}
            >
              {t('common.back')}
            </Button>
            
            <H2>{t('sustainableFishing.fishSpeciesGuide')}</H2>
          </XStack>
          
          <XStack 
            borderWidth={1}
            borderColor="$gray5"
            borderRadius="$4"
            paddingHorizontal="$3"
            paddingVertical="$2"
            marginBottom="$4"
            alignItems="center"
            space="$2"
          >
            <Search size="$1" color="$gray9" />
            <Input
              flex={1}
              placeholder={t('sustainableFishing.searchSpecies')}
              value={searchQuery}
              onChangeText={setSearchQuery}
              borderWidth={0}
            />
          </XStack>
          
          <FlatList
            data={filteredSpecies}
            renderItem={renderSpeciesItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Card padding="$4" marginTop="$2">
                <Text textAlign="center">{t('sustainableFishing.noSpeciesFound')}</Text>
              </Card>
            }
          />
        </YStack>
      )}
    </SafeAreaView>
  );
}
