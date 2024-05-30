import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from '@tanstack/react-query';
import { z } from "zod"
import { addYears, format } from 'date-fns';
import { Button } from '../ui';
import { theme } from '../styles';
import { FormInput } from '../ui/Input';
import { FormDatePicker } from '../ui/DatePicker';
import { compareDate, createMinMaxErrorMessage, REQUIRED_ERROR_MESSAGE } from '../utils';
import { productService } from '../services/product.service';

const formSchema = z.object({
  id: z.string({
    required_error: REQUIRED_ERROR_MESSAGE,
  }).min(3, {
    message: createMinMaxErrorMessage('min', 3, 'El ID'),
  }).max(10, {
    message: createMinMaxErrorMessage('max', 10, 'El ID'),
  }),
  name: z.string({
    required_error: REQUIRED_ERROR_MESSAGE,
  }).min(5, {
    message: createMinMaxErrorMessage('min', 5, 'El nombre'),
  }).max(100, {
    message: createMinMaxErrorMessage('max', 100, 'El nombre')
  }),
  description: z.string({
    required_error: REQUIRED_ERROR_MESSAGE,
  }).min(10, {
    message: createMinMaxErrorMessage('min', 10, 'La descripción'),
  }).max(100, {
    message: createMinMaxErrorMessage('max', 100, 'La descripción'),
  }),
  logo: z.string({
    required_error: REQUIRED_ERROR_MESSAGE,
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
    setError
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

  const { mutate, isPending: isValidating } = useMutation({
    mutationKey: ['validate_product'],
    mutationFn: async (data: Product) => {
      if (!product || product.id !== data.id) return productService.validateProduct(data.id)
      else return false
    },
    onSuccess: (exist, data) => {
      if (!exist) action && action(data)
      else setError('id', { message: 'ID no válido!' })
    }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => mutate(data)
  
  return (
    <View style={styles.flexible}>
      <Text style={styles.title}>Formulario de Registro</Text>
      <ScrollView style={StyleSheet.compose(styles.form_container, styles.flexible)}>
        <FormInput
          label='ID'
          control={control}
          name='id'
          disable={product !== undefined}
          testId='form-product-id'
        />
        <FormInput
          label='Nombre'
          control={control}
          name='name'
          testId='form-product-name'
        />
        <FormInput
          label='Descripción'
          control={control}
          name='description'
          testId='form-product-description'
        />
        <FormInput
          label='Logo'
          control={control}
          name='logo'
          testId='form-product-logo'
        />
        <FormDatePicker
          label='Fecha Liberación'
          control={control}
          name='date_release'
          testId='form-product-date-release'
        />
        <FormDatePicker
          label='Fecha Revisión'
          control={control}
          name='date_revision'
          testId='form-product-date-revision'
          disabled
        />
      </ScrollView>
      <View style={styles.actions}>
        <Button text='Enviar' variant='secondary' testId='form-submit-button' onPress={handleSubmit(onSubmit)} loading={isLoading && isValidating} />
        <Button text='Reiniciar' testId='form-reset-button' onPress={() => product ? reset(product) : reset()} />
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