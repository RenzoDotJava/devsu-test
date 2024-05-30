import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { default as DatePickerRN, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { View } from 'react-native';
import { Controller, FieldError } from 'react-hook-form';
import useToggle from '../hooks/useToogle'
import { theme } from '../styles';
import { type FormControllerProps } from '../types/form';

const DatePicker: React.FC<DateTimePickerProps> = ({ value, onChange = () => { }, error = false, disabled = false, testId }) => {
  const { isOpen, toggler } = useToggle()

  const handleChangeDate = (event: DateTimePickerEvent, date?: Date) => {
    const { type } = event;
    toggler()
    if (type === 'set') onChange(format(date!, 'yyyy-MM-dd'));
  };

  const getInputStyle = () => {
    if (disabled) return [styles.disabled_container, styles.default_container];
    else if (error) return styles.error_container;
    return styles.default_container;
  }

  return (
    <>
      <TouchableOpacity disabled={disabled} testID={testId} style={StyleSheet.compose(styles.container, getInputStyle())} onPress={toggler}>
        <Text style={[styles.input, disabled && styles.disabled_input]}>{format(value!!, 'dd/MM/yyyy')}</Text>
      </TouchableOpacity>
      {isOpen &&
        <DatePickerRN
          testID='date-picker'
          mode="date"
          value={new Date(value!!)}
          display='spinner'
          onChange={handleChangeDate}
          negativeButton={{ label: 'Cancelar' }}
        />
      }
    </>
  )
}

export const FormDatePicker: React.FC<FormControllerProps & DateTimePickerProps> = ({
  control,
  name,
  label = '',
  disabled = false,
  testId = ''
}) => {

  const renderItem = (
    value: any,
    onChange: (...event: any[]) => void,
    error: FieldError | undefined
  ) => (
    <>
      <DatePicker
        value={value}
        onChange={onChange}
        error={!!error}
        disabled={disabled}
        testId={testId}
      />
      {error && <Text style={styles.text_error}>{error.message}</Text>}
    </>
  );

  return (
    <View style={styles.form_group}>
      <Text style={styles.form_label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange }, fieldState: { error } }) =>
          renderItem(value, onChange, error)
        }
      />
    </View>
  );
};

export default DatePicker

const styles = StyleSheet.create({
  container: {
    height: 40,
    backgroundColor: 'transparent',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8
  },
  default_container: {
    borderColor: theme.color.neutral.light
  },
  error_container: {
    borderColor: theme.color.error
  },
  disabled_container: {
    backgroundColor: theme.color.disabled,
  },
  input: {
    flex: 1,
    fontSize: theme.fontSize.sm,
    fontWeight: '500',
  },
  disabled_input: {
    color: theme.color.neutral.medium
  },
  text_error: {
    color: theme.color.error
  },
  form_group: {
    marginBottom: 18,
    gap: 8
  },
  form_label: {
    fontSize: theme.fontSize.sm,
    color: theme.color.neutral.dark,
    fontWeight: '500',
  }
});