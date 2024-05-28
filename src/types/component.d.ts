type HeaderProps = {
	onPress: () => void
}

type WrapperProps = {
	children: React.ReactNode
}

type InputProps = {
	placeholder?: string;
	keyboardType?: 'default' | 'numeric';
	value?: string;
	error?: boolean;
	onChangeText?: (text: string) => void;
};

type ProductRowProps = {
	product: ProductInterface;
	position: 'top' | 'middle' | 'bottom' | 'both';
	onPress: () => void;
}