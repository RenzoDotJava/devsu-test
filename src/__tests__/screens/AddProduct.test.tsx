import { screen, fireEvent, waitFor } from '@testing-library/react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { renderWithProviders } from "../../mocks/render-with-providers";
import { product } from '../../mocks/product';
import Navigator from "../../index";
import { REQUIRED_ERROR_MESSAGE, createDateTimeSetEvtParams } from '../../utils';

const testProduct = {
  id: 'test_id',
  name: 'test_name',
  description: 'test_description',
  logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
  date_release: new Date('2025-12-02'),
}

const fillForm = async (id: string) => {
  const idInput = screen.getByTestId('form-product-id')
  const nameInput = screen.getByTestId('form-product-name')
  const descriptionInput = screen.getByTestId('form-product-description')
  const logoInput = screen.getByTestId('form-product-logo')
  const datePicker = screen.getByTestId('form-product-date-release')

  fireEvent(idInput, 'onChangeText', id)
  fireEvent(nameInput, 'onChangeText', testProduct.name)
  fireEvent(descriptionInput, 'onChangeText', testProduct.description)
  fireEvent(logoInput, 'onChangeText', testProduct.logo)

  fireEvent.press(datePicker)

  const datePickerModal = screen.UNSAFE_getByType(RNDateTimePicker)
  expect(datePickerModal).toBeTruthy();

  await waitFor(() => {
    fireEvent(
      datePickerModal,
      'onChange',
      ...createDateTimeSetEvtParams(testProduct.date_release),
    );
  })
}

beforeEach(() => {
  renderWithProviders(<Navigator />)

  const goAddButton = screen.getByTestId('add-product-navigator')
  fireEvent.press(goAddButton)
})

describe('AddProduct Screen', () => {
  test('should render the form title', () => {
    expect(screen.getByText('Formulario de Registro')).toBeTruthy();
  })

  test('should render the form fields', () => {
    expect(screen.getByTestId('form-product-id')).toBeTruthy();
    expect(screen.getByTestId('form-product-name')).toBeTruthy();
    expect(screen.getByTestId('form-product-description')).toBeTruthy();
    expect(screen.getByTestId('form-product-logo')).toBeTruthy();
    expect(screen.getByTestId('form-product-date-release')).toBeTruthy();
  })

  test('should show the error messages when user submit the form without values', async () => {
    const submitButton = screen.getByTestId('form-submit-button')

    expect(submitButton).toBeTruthy();

    await waitFor(() => {
      fireEvent.press(submitButton)
    })

    const errorMsgs = screen.queryAllByText(REQUIRED_ERROR_MESSAGE)
    expect(errorMsgs).toHaveLength(4)
  })

  test('should show the error messages when form fileds exceed the maximum length', async () => {
    const idInput = screen.getByTestId('form-product-id')

    const customId = 'a'.repeat(11)

    fireEvent(idInput, 'onChangeText', customId)

    const submitButton = screen.getByTestId('form-submit-button')

    fireEvent.press(submitButton)

    expect(await screen.findByText('El ID debe tener como máximo 10 caracteres!')).toBeTruthy()
  })

  test('should show the error message when user submit an invalid id', async () => {
    fillForm(product.id)

    const submitButton = screen.getByTestId('form-submit-button')

    fireEvent.press(submitButton)

    expect(await screen.findByText('ID no válido!')).toBeTruthy()
  })

  test('should show the product added on list', async () => {
    fillForm(testProduct.id)

    const submitButton = screen.getByTestId('form-submit-button')

    fireEvent.press(submitButton)

    const newProduct = await screen.findByTestId('product-row-' + testProduct.id)
    expect(newProduct).toBeTruthy()
  })

  test('should reset the form after pressing the reset button', async () => {
    const idInput = screen.getByTestId('form-product-id')

    await waitFor(() => {
      fireEvent(idInput, 'onChangeText', testProduct.id)
    })

    expect(idInput.props.value).toBe(testProduct.id);

    const resetButton = screen.getByTestId('form-reset-button')

    expect(resetButton).toBeTruthy();

    await waitFor(() => {
      fireEvent.press(resetButton)
    })

    expect(idInput.props.value).toBeUndefined();
  })
})