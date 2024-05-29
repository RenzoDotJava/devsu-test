import { screen, fireEvent, waitFor } from '@testing-library/react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { renderWithProviders } from "../../mocks/render-with-providers";
import Navigator from "../../index";
import { REQUIRED_ERROR_MESSAGE, createDateTimeSetEvtParams } from '../../utils';

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

  test('should show the date picker modal', async () => {
    const datePicker = screen.getByTestId('form-product-date-release')
    fireEvent.press(datePicker)

    const datePickerModal = screen.UNSAFE_getByType(RNDateTimePicker)
    expect(datePickerModal).toBeTruthy();

    const date = new Date('2025-12-02');

    await waitFor(() => {
      fireEvent(
        datePickerModal,
        'onChange',
        ...createDateTimeSetEvtParams(date),
      );
    })

    expect(screen.getByText('30/11/2025')).toBeTruthy();

    const tree = screen.toJSON();
    expect(tree).toMatchSnapshot();
  })
})