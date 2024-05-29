import { Control } from 'react-hook-form/dist/types';

type FormControllerProps = {
	control: Control<any>;
	name: string;
  label?: string;
};

export type { FormControllerProps };