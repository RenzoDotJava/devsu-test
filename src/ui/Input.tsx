import { StyleSheet, Text, TextInput, View } from "react-native";
import { theme } from "@/styles";
import { Controller, FieldError } from "react-hook-form";
import { type FormControllerProps } from "@/types/form";

const Input: React.FC<InputProps> = ({
	placeholder,
	keyboardType = 'default',
	onChangeText,
	value,
	disable = false,
	error = false,
}) => {

	const getInputStyle = () => {
		if (disable) return [styles.disabled_container, styles.default_container];
		else if (error) return styles.error_container;
		return styles.default_container;
	}

	return (
		<View style={StyleSheet.compose(styles.container, getInputStyle())}>
			<TextInput
				style={[styles.input, disable && styles.disabled_input]}
				keyboardType={keyboardType}
				placeholder={placeholder}
				onChangeText={onChangeText}
				value={value}
				editable={!disable}
			/>
		</View>
	);
};

export const FormInput: React.FC<FormControllerProps & InputProps> = ({
	control,
	name,
	label = '',
	placeholder,
	disable = false,
	keyboardType = 'default'
}) => {

	const renderItem = (
		value: any,
		onChange: (...event: any[]) => void,
		error: FieldError | undefined
	) => (
		<>
			<Input
				placeholder={placeholder}
				keyboardType={keyboardType}
				value={value?.toString()}
				onChangeText={onChange}
				error={!!error}
				disable={disable}
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

export default Input;

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