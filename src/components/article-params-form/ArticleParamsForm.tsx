import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';

import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	OptionType,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import { Separator } from 'src/ui/separator';
import { useCloseForm } from '../hooks/useCloseForm';

type ArticleParamsFormProps = {
	applySettings: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	applySettings,
}: ArticleParamsFormProps) => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [currentSettings, setCurrentSettings] =
		useState<ArticleStateType>(defaultArticleState);
	const formRef = useRef<HTMLFormElement>(null);

	const {
		backgroundColor,
		contentWidth,
		fontColor,
		fontFamilyOption,
		fontSizeOption,
	} = currentSettings;

	const toggleFormVisibility = () => {
		setIsFormOpen((opened) => !opened);
	};

	const updateFormSettings = (newSettings: Partial<ArticleStateType>) => {
		setCurrentSettings((prev) => ({ ...prev, ...newSettings }));
	};

	const onFontFamilySelect = (newValue: OptionType) => {
		updateFormSettings({ fontFamilyOption: newValue });
	};
	const onFontSizeSelect = (newValue: OptionType) => {
		updateFormSettings({ fontSizeOption: newValue });
	};
	const onFontColorSelect = (newValue: OptionType) => {
		updateFormSettings({ fontColor: newValue });
	};
	const onBackgroundColorSelect = (newValue: OptionType) => {
		updateFormSettings({ backgroundColor: newValue });
	};
	const onContentWidthSelect = (newValue: OptionType) => {
		updateFormSettings({ contentWidth: newValue });
	};

	const defaultFontFamilyPlaceholder =
		fontFamilyOption?.title || fontFamilyOptions[0]?.title;
	const defaultFontColorPlaceholder = fontColor?.title || fontColors[0]?.title;
	const defaultBGColorPlaceholder =
		backgroundColor?.title || backgroundColors[0]?.title;
	const defaultContentWidthPlaceholder =
		contentWidth?.title || contentWidthArr[0]?.title;

	const resetFormSettings = () => {
		setCurrentSettings(defaultArticleState);
		applySettings(defaultArticleState);
		setIsFormOpen(false);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		applySettings(currentSettings);
	};

	useCloseForm({
		isOpen: isFormOpen,
		formRef: formRef,
		onClose: () => setIsFormOpen(false),
	});

	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={toggleFormVisibility} />

			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}>
				<form className={styles.form} onSubmit={handleSubmit} ref={formRef}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						title='шрифт'
						selected={fontFamilyOption}
						options={fontFamilyOptions}
						placeholder={defaultFontFamilyPlaceholder}
						onChange={onFontFamilySelect}
					/>

					<RadioGroup
						name={'radioGroupName'}
						options={fontSizeOptions}
						selected={fontSizeOption}
						onChange={onFontSizeSelect}
						title='размер шрифта'
					/>

					<Select
						title='цвет шрифта'
						onChange={onFontColorSelect}
						placeholder={defaultFontColorPlaceholder}
						selected={fontColor}
						options={fontColors}
					/>

					<Separator />

					<Select
						title='цвет фона'
						onChange={onBackgroundColorSelect}
						placeholder={defaultBGColorPlaceholder}
						selected={backgroundColor}
						options={backgroundColors}
					/>

					<Select
						title='ширина контента'
						onChange={onContentWidthSelect}
						placeholder={defaultContentWidthPlaceholder}
						selected={contentWidth}
						options={contentWidthArr}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={resetFormSettings}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
