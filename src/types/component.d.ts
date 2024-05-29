type HeaderProps = {
	onPress: () => void
}

type WrapperProps = {
	children: React.ReactNode
}

type ProductRowProps = {
	product: Product;
	position: 'top' | 'middle' | 'bottom' | 'both';
	onPress: () => void;
}

type ProductFormProps = {
	product?: Product;
	action?: (req: Product) => void;
	isLoading?: boolean;
};

type DeleteProductSheetProps = BottomSheetProps & {
	product: Product;
}