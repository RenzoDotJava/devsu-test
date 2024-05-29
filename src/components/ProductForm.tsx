import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { addYears, format } from 'date-fns';
import { Button } from '@/ui';
import { theme } from '@/styles';
import { FormInput } from '@/ui/Input';
import { FormDatePicker } from '@/ui/DatePicker';
import { compareDate, createMinMaxErrorMessage, REQUIRED_ERROR_MESSASGE } from '@/utils';

const formSchema = z.object({
  id: z.string({
    required_error: REQUIRED_ERROR_MESSASGE,
  }).min(3, {
    message: createMinMaxErrorMessage('min', 3, 'El ID'),
  }).max(10, {
    message: createMinMaxErrorMessage('max', 10, 'El ID'),
  }),
  name: z.string({
    required_error: REQUIRED_ERROR_MESSASGE,
  }).min(5, {
    message: createMinMaxErrorMessage('min', 5, 'El nombre'),
  }).max(100, {
    message: createMinMaxErrorMessage('max', 100, 'El nombre')
  }),
  description: z.string({
    required_error: REQUIRED_ERROR_MESSASGE,
  }).min(10, {
    message: createMinMaxErrorMessage('min', 10, 'La descripción'),
  }).max(100, {
    message: createMinMaxErrorMessage('max', 100, 'La descripción'),
  }),
  logo: z.string({
    required_error: REQUIRED_ERROR_MESSASGE,
  }),
  date_release: z.string().refine((value) => compareDate(value), {
    message: 'La fecha de liberación debe ser posterior a la fecha actual!'
  }),
  date_revision: z.string()
})

const ProductForm: React.FC<ProductFormProps> = ({ product, action, isLoading }) => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: product && product.id,
      name: product && product.name,
      description: product && product.description,
      logo: product && product.logo,
      date_release: product ? product.date_release : format(new Date(), 'yyyy-MM-dd'),
      date_revision: product ? product.date_release : format(addYears(new Date(), 1), 'yyyy-MM-dd'),
    }
  });

  const watchDateRelease = watch('date_release')

  useEffect(() => {
    setValue('date_revision', format(addYears(new Date(watchDateRelease), 1), 'yyyy-MM-dd'))
  }, [watchDateRelease])

  const onSubmit = (data: z.infer<typeof formSchema>) => console.log(data)

  return (
    <View style={styles.flexible}>
      <Text style={styles.title}>Formulario de Registro</Text>
      <ScrollView style={StyleSheet.compose(styles.form_container, styles.flexible)}>
        <FormInput
          label='ID'
          control={control}
          name='id'
        />
        <FormInput
          label='Nombre'
          control={control}
          name='name'
        />
        <FormInput
          label='Descripción'
          control={control}
          name='description'
        />
        <FormInput
          label='Logo'
          control={control}
          name='logo'
        />
        <FormDatePicker
          label='Fecha Liberación'
          control={control}
          name='date_release'
        />
        <FormDatePicker
          label='Fecha Revisión'
          control={control}
          name='date_revision'
          disable
        />
      </ScrollView>
      <View style={styles.actions}>
        <Button text='Enviar' variant='secondary' onPress={handleSubmit(onSubmit)} />
        <Button text='Reiniciar' onPress={() => reset()} />
      </View>
    </View>
  )
}

export default ProductForm

const styles = StyleSheet.create({
  flexible: {
    flex: 1
  },
  title: {
    fontSize: theme.fontSize['3xl'],
    color: theme.color.neutral.dark,
    fontWeight: 'bold',
  },
  form_container: {
    marginVertical: 15
  },
  actions: {
    gap: 12
  }
})