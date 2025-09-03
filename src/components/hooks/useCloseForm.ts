// src\components\hooks\useCloseForm.ts

import { useEffect } from 'react';

type Props = {
	isOpen: boolean;
	formRef: React.RefObject<HTMLElement>;
	onClose: () => void;
};

export const useCloseForm = ({ isOpen, formRef, onClose }: Props) => {
	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, onClose, formRef]);
};
