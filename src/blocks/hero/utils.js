export function formatSpacing(val) {
	if (val === undefined || val === null || val === '') return undefined;
	if (typeof val === 'number') return `${val}px`;
	if (typeof val === 'string') {
		const trimmed = val.trim();
		if (trimmed === '') return undefined;
		if (!isNaN(trimmed)) return `${trimmed}px`;
		return trimmed;
	}
	return val;
}

export function getSpacing(spacing, side) {
	if (spacing === undefined || spacing === null || spacing === '') return undefined;
	if (typeof spacing === 'string' || typeof spacing === 'number') {
		return formatSpacing(spacing);
	}
	if (typeof spacing === 'object') {
		return formatSpacing(spacing[side]);
	}
	return undefined;
}

export function getTypographyVar(val, isSpacing = false) {
	if ( val === undefined || val === null || val === '' ) return undefined;
	if ( typeof val === 'number' ) return isSpacing ? `${val}px` : String(val);
	if ( typeof val === 'string' ) {
		if ( isSpacing && !isNaN(val) ) return `${val}px`;
		return val;
	}
	return val;
}

export function getTypographyVars(prefix, typographyObj) {
	if (!typographyObj) return {};
	return {
		[`--gravisain-hero-${prefix}-ff`]: typographyObj.fontFamily ? `'${typographyObj.fontFamily}'` : undefined,
		[`--gravisain-hero-${prefix}-fs`]: getTypographyVar(typographyObj.fontSize, true),
		[`--gravisain-hero-${prefix}-fw`]: typographyObj.fontWeight,
		[`--gravisain-hero-${prefix}-lh`]: getTypographyVar(typographyObj.lineHeight, false),
		[`--gravisain-hero-${prefix}-ls`]: getTypographyVar(typographyObj.letterSpacing, true),
	};
}

export function getHeroCSSVariables(attributes) {
	const {
		padding,
		paddingTablet,
		paddingMobile,
		margin,
		marginTablet,
		marginMobile,
		titleColor,
		eyebrowColor,
		descriptionColor,
		titleTypography,
		titleTypographyTablet,
		titleTypographyMobile,
		eyebrowTypography,
		eyebrowTypographyTablet,
		eyebrowTypographyMobile,
		descriptionTypography,
		descriptionTypographyTablet,
		descriptionTypographyMobile,
		primaryButtonTypography,
		primaryButtonTypographyTablet,
		primaryButtonTypographyMobile,
		secondaryButtonTypography,
		secondaryButtonTypographyTablet,
		secondaryButtonTypographyMobile,
		primaryButton,
		secondaryButton,
	} = attributes;

	const getSolidColor = (c) => (c && c.includes('gradient')) ? undefined : c;

	return {
		'--gravisain-hero-padding-top': getSpacing(padding, 'top'),
		'--gravisain-hero-padding-right': getSpacing(padding, 'right'),
		'--gravisain-hero-padding-bottom': getSpacing(padding, 'bottom'),
		'--gravisain-hero-padding-left': getSpacing(padding, 'left'),
		'--gravisain-hero-margin-top': getSpacing(margin, 'top'),
		'--gravisain-hero-margin-right': getSpacing(margin, 'right'),
		'--gravisain-hero-margin-bottom': getSpacing(margin, 'bottom'),
		'--gravisain-hero-margin-left': getSpacing(margin, 'left'),

		'--gravisain-hero-padding-top-tablet': getSpacing(paddingTablet, 'top'),
		'--gravisain-hero-padding-right-tablet': getSpacing(paddingTablet, 'right'),
		'--gravisain-hero-padding-bottom-tablet': getSpacing(paddingTablet, 'bottom'),
		'--gravisain-hero-padding-left-tablet': getSpacing(paddingTablet, 'left'),
		'--gravisain-hero-margin-top-tablet': getSpacing(marginTablet, 'top'),
		'--gravisain-hero-margin-right-tablet': getSpacing(marginTablet, 'right'),
		'--gravisain-hero-margin-bottom-tablet': getSpacing(marginTablet, 'bottom'),
		'--gravisain-hero-margin-left-tablet': getSpacing(marginTablet, 'left'),

		'--gravisain-hero-padding-top-mobile': getSpacing(paddingMobile, 'top'),
		'--gravisain-hero-padding-right-mobile': getSpacing(paddingMobile, 'right'),
		'--gravisain-hero-padding-bottom-mobile': getSpacing(paddingMobile, 'bottom'),
		'--gravisain-hero-padding-left-mobile': getSpacing(paddingMobile, 'left'),
		'--gravisain-hero-margin-top-mobile': getSpacing(marginMobile, 'top'),
		'--gravisain-hero-margin-right-mobile': getSpacing(marginMobile, 'right'),
		'--gravisain-hero-margin-bottom-mobile': getSpacing(marginMobile, 'bottom'),
		'--gravisain-hero-margin-left-mobile': getSpacing(marginMobile, 'left'),

		'--gravisain-hero-title-color': getSolidColor(titleColor),
		...getTypographyVars('title', titleTypography),
		...getTypographyVars('title-tablet', titleTypographyTablet),
		...getTypographyVars('title-mobile', titleTypographyMobile),

		'--gravisain-hero-eyebrow-color': getSolidColor(eyebrowColor),
		...getTypographyVars('eyebrow', eyebrowTypography),
		...getTypographyVars('eyebrow-tablet', eyebrowTypographyTablet),
		...getTypographyVars('eyebrow-mobile', eyebrowTypographyMobile),

		'--gravisain-hero-desc-color': getSolidColor(descriptionColor),
		...getTypographyVars('desc', descriptionTypography),
		...getTypographyVars('desc-tablet', descriptionTypographyTablet),
		...getTypographyVars('desc-mobile', descriptionTypographyMobile),

		'--gravisain-hero-btn1-color': primaryButton?.color,
		'--gravisain-hero-btn1-bg': primaryButton?.backgroundColor,
		'--gravisain-hero-btn1-radius': (primaryButton?.borderRadius !== undefined && primaryButton?.borderRadius !== null && primaryButton?.borderRadius !== '') ? `${primaryButton.borderRadius}px` : undefined,
		'--gravisain-hero-btn1-pt': getSpacing(primaryButton?.padding, 'top'),
		'--gravisain-hero-btn1-pr': getSpacing(primaryButton?.padding, 'right'),
		'--gravisain-hero-btn1-pb': getSpacing(primaryButton?.padding, 'bottom'),
		'--gravisain-hero-btn1-pl': getSpacing(primaryButton?.padding, 'left'),
		...getTypographyVars('btn1', primaryButtonTypography),
		...getTypographyVars('btn1-tablet', primaryButtonTypographyTablet),
		...getTypographyVars('btn1-mobile', primaryButtonTypographyMobile),

		'--gravisain-hero-btn2-color': secondaryButton?.color,
		'--gravisain-hero-btn2-bg': secondaryButton?.backgroundColor,
		'--gravisain-hero-btn2-radius': (secondaryButton?.borderRadius !== undefined && secondaryButton?.borderRadius !== null && secondaryButton?.borderRadius !== '') ? `${secondaryButton.borderRadius}px` : undefined,
		'--gravisain-hero-btn2-pt': getSpacing(secondaryButton?.padding, 'top'),
		'--gravisain-hero-btn2-pr': getSpacing(secondaryButton?.padding, 'right'),
		'--gravisain-hero-btn2-pb': getSpacing(secondaryButton?.padding, 'bottom'),
		'--gravisain-hero-btn2-pl': getSpacing(secondaryButton?.padding, 'left'),
		...getTypographyVars('btn2', secondaryButtonTypography),
		...getTypographyVars('btn2-tablet', secondaryButtonTypographyTablet),
		...getTypographyVars('btn2-mobile', secondaryButtonTypographyMobile),
	};
}
