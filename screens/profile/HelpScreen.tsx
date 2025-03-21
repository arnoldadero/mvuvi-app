import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { 
  YStack, XStack, Text, Button, Card, H4, H5, Paragraph, 
  Accordion, Separator, Input
} from 'tamagui';
import { Feather } from '@expo/vector-icons';

// Define type aliases for Tamagui components to fix TypeScript errors
const Y = YStack as any;
const X = XStack as any;
const T = Text as any;
const C = Card as any;
const H = H4 as any;
const H5A = H5 as any;
const P = Paragraph as any;
const AI = Accordion.Item as any;
const AT = Accordion.Trigger as any;
const AC = Accordion.Content as any;
const A = Accordion as any;

export function HelpScreen() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  
  // FAQ categories and items
  const faqCategories = [
    {
      id: 'general',
      title: t('help.generalQuestions'),
      faqs: [
        {
          question: t('help.faq.whatIsMvuvi'),
          answer: t('help.faq.whatIsMvuviAnswer'),
        },
        {
          question: t('help.faq.whoCanUse'),
          answer: t('help.faq.whoCanUseAnswer'),
        },
        {
          question: t('help.faq.howToCreateAccount'),
          answer: t('help.faq.howToCreateAccountAnswer'),
        },
      ],
    },
    {
      id: 'weather',
      title: t('help.weatherQuestions'),
      faqs: [
        {
          question: t('help.faq.weatherDataSource'),
          answer: t('help.faq.weatherDataSourceAnswer'),
        },
        {
          question: t('help.faq.moonPhaseAccuracy'),
          answer: t('help.faq.moonPhaseAccuracyAnswer'),
        },
      ],
    },
    {
      id: 'catch',
      title: t('help.catchDataQuestions'),
      faqs: [
        {
          question: t('help.faq.whyRecordCatches'),
          answer: t('help.faq.whyRecordCatchesAnswer'),
        },
        {
          question: t('help.faq.whoSeesMyData'),
          answer: t('help.faq.whoSeesMyDataAnswer'),
        },
      ],
    },
    {
      id: 'safety',
      title: t('help.safetyQuestions'),
      faqs: [
        {
          question: t('help.faq.howSOSWorks'),
          answer: t('help.faq.howSOSWorksAnswer'),
        },
      ],
    },
    {
      id: 'technical',
      title: t('help.technicalQuestions'),
      faqs: [
        {
          question: t('help.faq.internetRequired'),
          answer: t('help.faq.internetRequiredAnswer'),
        },
        {
          question: t('help.faq.batteryUsage'),
          answer: t('help.faq.batteryUsageAnswer'),
        },
      ],
    },
  ];
  
  // Filter FAQs based on search query
  const filteredFaqs = searchQuery
    ? faqCategories.map(category => ({
        ...category,
        faqs: category.faqs.filter(faq =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })).filter(category => category.faqs.length > 0)
    : faqCategories;
  
  // Feature guides/tutorials
  const tutorials = [
    {
      id: 'weather',
      title: t('help.tutorials.weatherForecast'),
      icon: 'cloud',
    },
    {
      id: 'catch',
      title: t('help.tutorials.recordingCatch'),
      icon: 'clipboard',
    },
    {
      id: 'safety',
      title: t('help.tutorials.usingSafety'),
      icon: 'shield',
    },
    {
      id: 'market',
      title: t('help.tutorials.checkingPrices'),
      icon: 'dollar-sign',
    },
  ];
  
  return (
    <ScrollView>
      <Y padding="$4" space="$4">
        {/* Help header */}
        <C padding="$4" bordered>
          <Y space="$3">
            <H>{t('help.helpAndSupport')}</H>
            <P>{t('help.helpDescription')}</P>
            
            <Input
              placeholder={t('help.searchHelp')}
              value={searchQuery}
              onChangeText={(text: string) => setSearchQuery(text)}
              leftIconAfter={<Feather name="search" size={18} color="#999" />}
              marginTop="$2"
            />
          </Y>
        </C>
        
        {/* Quick help buttons */}
        {!searchQuery && (
          <C padding="$4" bordered>
            <Y space="$3">
              <H5A>{t('help.quickHelp')}</H5A>
              
              <X flexWrap="wrap" justifyContent="space-between">
                {tutorials.map(tutorial => (
                  <Button
                    key={tutorial.id}
                    size="$3"
                    margin="$1"
                    flexBasis="47%"
                    flexGrow={1}
                    icon={<Feather name={tutorial.icon as any} size={16} />}
                    onPress={() => {}}
                  >
                    {tutorial.title}
                  </Button>
                ))}
              </X>
            </Y>
          </C>
        )}
        
        {/* FAQ Accordions */}
        <Y space="$3">
          <H>{t('help.frequentlyAskedQuestions')}</H>
          
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map(category => (
              <Y key={category.id} space="$2">
                {category.faqs.length > 0 && (
                  <>
                    <T fontWeight="bold" paddingTop="$2">
                      {category.title}
                    </T>
                    
                    <A type="multiple" defaultValue={[]}>
                      {category.faqs.map((faq, index) => (
                        <AI key={`${category.id}-${index}`} value={`${category.id}-${index}`}>
                          <AT flexDirection="row" justifyContent="space-between">
                            <T>{faq.question}</T>
                            <Feather name="chevron-down" size={16} />
                          </AT>
                          
                          <AC>
                            <P padding="$2">
                              {faq.answer}
                            </P>
                          </AC>
                        </AI>
                      ))}
                    </A>
                  </>
                )}
              </Y>
            ))
          ) : (
            <C padding="$4" bordered>
              <Y alignItems="center" justifyContent="center" height={100}>
                <Feather name="search" size={24} color="#999" />
                <T marginTop="$2">{t('help.noResultsFound')}</T>
                <Button 
                  marginTop="$4" 
                  size="$2"
                  onPress={() => setSearchQuery('')}
                >
                  {t('help.clearSearch')}
                </Button>
              </Y>
            </C>
          )}
        </Y>
        
        {/* Contact support */}
        <C padding="$4" bordered marginTop="$4">
          <Y space="$3" alignItems="center">
            <H5A>{t('help.needMoreHelp')}</H5A>
            <P textAlign="center">
              {t('help.contactSupportDescription')}
            </P>
            
            <X space="$3" marginTop="$2">
              <Button
                size="$3"
                icon={<Feather name="mail" size={16} />}
                onPress={() => {}}
              >
                {t('help.sendEmail')}
              </Button>
              
              <Button
                size="$3"
                icon={<Feather name="message-circle" size={16} />}
                onPress={() => {}}
              >
                {t('help.liveChat')}
              </Button>
            </X>
          </Y>
        </C>
      </Y>
    </ScrollView>
  );
}
