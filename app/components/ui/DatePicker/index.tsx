import { Platform } from 'react-native';
import { DateTimePickerProps } from './datetimepicker.interface';

let DateTimePicker: React.FC<DateTimePickerProps>;

if (Platform.OS === 'ios') {
  DateTimePicker = require('./ios/DateTimePicker').default;
} else {
  DateTimePicker = require('./android/DateTimePicker').default;
}

export default DateTimePicker;
