type InputProps = {
	placeholder?: string;
	keyboardType?: 'default' | 'numeric';
	value?: string;
	error?: boolean;
	disable?: boolean;
	onChangeText?: (text: string) => void;
};

type ButtonProps = {
	variant?: 'primary' | 'secondary' | 'error';
	text: string;
	onPress?: () => void;
	disabled?: boolean;
	loading?: boolean;
};

type BottomSheetProps = {
	isOpen: boolean;
	onClose: () => void;
	children?: React.ReactNode;
}

type DateTimePickerProps = {
	value?: string;
	error?: boolean;
	disable?: boolean;
	onChange?: (date: string) => void;
};