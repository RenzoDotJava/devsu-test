import { screen, fireEvent } from "@testing-library/react-native";
import { renderWithProviders } from "../../mocks/render-with-providers";
import Navigator from "../../index";
import { product } from "../../mocks/product";

beforeEach(async () => {
  renderWithProviders(<Navigator />)

  const productButton = await screen.findByTestId('product-row-' + product.id)
  expect(productButton).toBeTruthy()

  fireEvent.press(productButton)

  const editButton = await screen.findByTestId('edit-product-button')
  expect(editButton).toBeTruthy()

  fireEvent.press(editButton)

})

describe('EditProduct Screen', () => {
  test('should render the form title', () => {
    expect(screen.getByText('Formulario de Registro')).toBeTruthy();
  })

  test('date revision field should be disabled', () => {
    const datePicker = screen.getByTestId('form-product-date-revision')

    expect(datePicker.props.accessibilityState.disabled).toBe(true)
  })

  test('should show the product edited on list', async () => {
    const nameInput = screen.getByTestId('form-product-name')

    fireEvent(nameInput, 'onChangeText', 'Tarjetas de Débito')

    const submitButton = screen.getByTestId('form-submit-button')

    fireEvent.press(submitButton)

    const editedProduct = await screen.findByText('Tarjetas de Débito')
    expect(editedProduct).toBeTruthy()
  })

  test('should reset the form after pressing the reset button', () => {
    const nameInput = screen.getByTestId('form-product-name')

    const customName = 'a'.repeat(101)

    fireEvent(nameInput, 'onChangeText', customName)

    expect(nameInput.props.value).toBe(customName);

    const resetButton = screen.getByTestId('form-reset-button')

    expect(resetButton).toBeTruthy();

    fireEvent.press(resetButton)

    expect(nameInput.props.value).toBe(product.name);
  })
})