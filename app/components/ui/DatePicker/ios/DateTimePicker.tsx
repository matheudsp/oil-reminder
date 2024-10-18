
import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Box } from '@/gluestack/ui/box';
import { DateTimePickerProps } from '../datetimepicker.interface';

const DateTimePickerIOS: React.FC<DateTimePickerProps> = ({ reminderDate, setReminderDate }) => {
  return (
    <Box>
      <DateTimePicker
        value={reminderDate}
        mode="datetime"
        display="default"
        themeVariant={"light"}
        onChange={(event, date) => setReminderDate(date || reminderDate)}
      />
    </Box>
  );
}

export default DateTimePickerIOS;