import React, { useState, ChangeEvent } from 'react';
import { Platform } from 'react-native';
import { Button, Popover, Text, XStack, YStack } from 'tamagui';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

const CustomText = Text as unknown as React.ComponentType<any>;
const CustomPopoverContent = Popover.Content as unknown as React.ComponentType<any>;
const CustomXStack = XStack as unknown as React.ComponentType<any>;
const CustomYStack = YStack as unknown as React.ComponentType<any>;

interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  mode?: 'date' | 'time' | 'datetime';
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
}

export function DatePicker({
  value,
  onChange,
  mode = 'date',
  placeholder = 'Select date',
  label,
  error,
  required = false
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [tempDate, setTempDate] = useState(value || new Date());

  const handleChange = (selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setOpen(false);
    }
    
    if (selectedDate) {
      setTempDate(selectedDate);
      if (Platform.OS === 'ios') {
        // For iOS, we'll update the actual value when the popover is closed
        return;
      }
      onChange(selectedDate);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    // For iOS, apply the date when the popover is closed
    if (!isOpen && Platform.OS === 'ios') {
      onChange(tempDate);
    }
  };

  const formatDate = (date: Date): string => {
    if (mode === 'date') {
      return format(date, 'PPP'); // e.g., "April 29, 2023"
    } else if (mode === 'time') {
      return format(date, 'p'); // e.g., "12:00 PM"
    }
    return format(date, 'PPp'); // e.g., "April 29, 2023, 12:00 PM"
  };

  return (
    <CustomYStack style={{ marginBottom: 16 }}>
      {label && (
        <XStack style={{ marginBottom: 4 } as any}>
          <CustomText unstyled>{label}</CustomText>
          {required && <CustomText unstyled color="$red9"> *</CustomText>}
        </XStack>
      )}
      
      <Popover open={open} onOpenChange={handleOpenChange}>
        <Popover.Trigger>
          <Button
            chromeless
            bordered
            paddingHorizontal="$3"
            paddingVertical="$2"
            borderRadius="$2"
            borderColor={error ? "$red9" : "$borderColor"}
            backgroundColor="$background"
            justifyContent="flex-start"
            height="$4"
            width="100%"
          >
            <CustomText color={value ? '$color' : '$placeholderColor'}>
              {value ? formatDate(value) : placeholder}
            </CustomText>
          </Button>
        </Popover.Trigger>

        <CustomPopoverContent
          borderWidth={1}
          borderColor="$borderColor"
          padding="$3"
          enterStyle={{ y: -10, opacity: 0 } as any}
          exitStyle={{ y: -10, opacity: 0 } as any}
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          elevate
        >
          <YStack>
            {Platform.OS === 'ios' || Platform.OS === 'android' ? (
              <DateTimePicker
                value={tempDate}
                mode={mode}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, date) => handleChange(date)}
              />
            ) : (
              // Web fallback
              <input
                type={mode === 'time' ? 'time' : mode === 'datetime' ? 'datetime-local' : 'date'}
                value={format(tempDate, mode === 'time' ? 'HH:mm' : mode === 'datetime' ? "yyyy-MM-dd'T'HH:mm" : 'yyyy-MM-dd')}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const date = new Date(e.target.value);
                  if (!isNaN(date.getTime())) {
                    handleChange(date);
                  }
                }}
                style={{ padding: 8, fontSize: 16 } as any}
              />
            )}
            
            {Platform.OS === 'ios' && (
              <CustomXStack justifyContent="flex-end" style={{ marginTop: 8 } as any}>
                <Button
                  size="$2"
                  onPress={() => {
                    setOpen(false);
                  }}
                >
                  Done
                </Button>
              </CustomXStack>
            )}
          </YStack>
        </CustomPopoverContent>
      </Popover>
      
      {error && (
        <CustomText unstyled color="$red9" fontSize="$2" style={{ marginTop: 4 } as any}>
          {error}
        </CustomText>
      )}
    </CustomYStack>
  );
}
