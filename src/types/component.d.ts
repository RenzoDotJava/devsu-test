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

type DeleteProductSheetProps = BottomSheetProps & {
	product: Product;
}