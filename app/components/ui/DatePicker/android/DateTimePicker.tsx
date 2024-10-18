import React, { useState } from 'react';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { DateTimePickerProps } from '../datetimepicker.interface';
import { Button, ButtonText } from '@/gluestack/ui/button';
import { VStack } from '@/gluestack/ui/vstack';
import { HStack } from '@/gluestack/ui/hstack';

const DateTimePickerAndroidComponent: React.FC<DateTimePickerProps> = ({ reminderDate, setReminderDate }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<Date>(new Date());

  const combineDateAndTime = (date: Date, time: Date) => {
    const combinedDate = new Date(date);
    combinedDate.setHours(time.getHours());
    combinedDate.setMinutes(time.getMinutes());
    return combinedDate;
  };
  
  const openDatePicker = () => {
    DateTimePickerAndroid.open({
      value: selectedDate || new Date(),
      onChange: (event, date) => {
        if (date) {
          setSelectedDate(date);
          if (selectedTime) {
            setReminderDate(combineDateAndTime(date, selectedTime));
            console.log(combineDateAndTime(date, selectedTime))
          }
        }
      },
      mode: "date",
      is24Hour: true,
    });
  };

  const openHourPicker = () => {
    DateTimePickerAndroid.open({
      value: selectedTime || new Date(),
      onChange: (event, time) => {
        if (time) {
          setSelectedTime(time);
          if (selectedDate) {
            setReminderDate(combineDateAndTime(selectedDate, time));
            console.log(combineDateAndTime(selectedDate, time))
          }
        }
      },
      mode: "time",
      is24Hour: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB'); 
  };

  const formatTime = (time: Date) => {
    return time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }); 
  };

  return (
    <HStack space='sm'>
      <Button className='rounded-2xl bg-secondary-300' onPress={openDatePicker}>
        <ButtonText className='text-secondary-800'>{formatDate(selectedDate)}</ButtonText>
      </Button>
      <Button className='rounded-2xl bg-secondary-300' onPress={openHourPicker}>
        <ButtonText  className='text-secondary-800'>{formatTime(selectedTime)}</ButtonText>
      </Button>
     
    </HStack>
  );
};

export default DateTimePickerAndroidComponent;
