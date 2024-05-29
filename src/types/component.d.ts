type HeaderProps = {
	onPress: () => void
}

type WrapperProps = {
	children: React.ReactNode
	isLoading?: boolean
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

type EmptyListProps = {
	text?: string;
}

type DeleteProductSheetProps = BottomSheetProps & {
	product: Product;
	isLoading?: boolean;
	onConfirm?: () => void;
}