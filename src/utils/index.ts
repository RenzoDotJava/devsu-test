import { DateTimePickerEvent } from "@react-native-community/datetimepicker"
import { format, isAfter, isEqual } from "date-fns"

export const compareDate = (date: string): boolean => {
  const currentDate = format(new Date(), 'yyyy-MM-dd')

  return isAfter(date, currentDate) || isEqual(date, currentDate)
}

export const createMinMaxErrorMessage = (type: 'min' | 'max', value: number, name: string): string => {
  return type === 'min' ? `${name} debe tener al menos ${value} caracteres!` : `${name} debe tener como máximo ${value} caracteres!`
}

export const REQUIRED_ERROR_MESSAGE = 'Este campo es requerido!';

export const createDateTimeSetEvtParams = (
  date: Date
): [DateTimePickerEvent, Date] => {
  return [
    {
      type: 'set',
      nativeEvent: { timestamp: date.getTime() },
    },
    date,
  ];
};