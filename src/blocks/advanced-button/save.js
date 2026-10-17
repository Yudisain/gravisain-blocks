import { useBlockProps, RichText } from '@wordpress/block-editor';
import { ICONS, getIconMarkup } from '../../controls/icons';
import parseCustomCSS from '../../controls/parseCustomCSS';

export default function save( { attributes } ) {
	const { 
		text, url, newTab, icon, iconPosition, iconSpacing,
		buttonStyle = 'fill', buttonSize = 'md', buttonWidth = 'auto', customWidth,
		backgroundColor, textColor, hoverBackgroundColor, hoverTextColor,
		borderRadius, padding, paddingTablet, paddingMobile, margin, marginTablet, marginMobile,
		borderWidth, borderStyle, borderColor, hoverBorderColor,
		typography = {}, textTransform,
		hoverEffect, shadow,
		anchor, customClassName, customCSS
	} = attributes;

	const getSpacing = ( spacing, side ) => {
		if ( spacing === undefined || spacing === null || spacing === '' ) return undefined;
		if ( typeof spacing === 'string' || typeof spacing === 'number' ) {
			return typeof spacing === 'number' ? `${ spacing }px` : spacing;
		}
		const val = spacing[ side ];
		if ( typeof val === 'number' ) return `${ val }px`;
		return val || undefined;
	};

	const buttonClasses = [
		'gravisain-advanced-button',
		buttonWidth === 'full' ? 'is-width-full' : '',
		buttonWidth === 'fixed' ? 'is-width-fixed' : '',
		hoverEffect ? `hover-effect-${ hoverEffect }` : '',
		shadow ? 'has-shadow' : '',
		customClassName || '',
	].filter( Boolean ).join( ' ' );

	const blockProps = useBlockProps.save( {
		id: anchor || undefined,
		className: buttonClasses,
		style: {
			width: buttonWidth === 'fixed' && customWidth ? `${ customWidth }px` : ( buttonWidth === 'full' ? '100%' : undefined ),
			marginTop: getSpacing( margin, 'top' ),
			marginRight: getSpacing( margin, 'right' ),
			marginBottom: getSpacing( margin, 'bottom' ),
			marginLeft: getSpacing( margin, 'left' ),
			'--gravisain-btn-margin-top': getSpacing( margin, 'top' ),
			'--gravisain-btn-margin-right': getSpacing( margin, 'right' ),
			'--gravisain-btn-margin-bottom': getSpacing( margin, 'bottom' ),
			'--gravisain-btn-margin-left': getSpacing( margin, 'left' ),
			'--gravisain-btn-margin-top-tablet': getSpacing( marginTablet, 'top' ),
			'--gravisain-btn-margin-right-tablet': getSpacing( marginTablet, 'right' ),
			'--gravisain-btn-margin-bottom-tablet': getSpacing( marginTablet, 'bottom' ),
			'--gravisain-btn-margin-left-tablet': getSpacing( marginTablet, 'left' ),
			'--gravisain-btn-margin-top-mobile': getSpacing( marginMobile, 'top' ),
			'--gravisain-btn-margin-right-mobile': getSpacing( marginMobile, 'right' ),
			'--gravisain-btn-margin-bottom-mobile': getSpacing( marginMobile, 'bottom' ),
			'--gravisain-btn-margin-left-mobile': getSpacing( marginMobile, 'left' ),
			...parseCustomCSS( customCSS ),
		}
	} );

	const isFill = ! buttonStyle || buttonStyle === 'fill';
	const finalBgColor = backgroundColor || ( isFill ? 'var(--wp--preset--color--primary, #1e293b)' : 'transparent' );
	const finalTextColor = textColor || ( isFill ? '#ffffff' : 'var(--wp--preset--color--primary, #1e293b)' );
	const finalBorderColor = borderColor || ( isFill ? 'transparent' : 'var(--wp--preset--color--primary, #1e293b)' );

	const defaultPadding = {
		sm: { top: '8px', right: '16px', bottom: '8px', left: '16px' },
		md: { top: '12px', right: '24px', bottom: '12px', left: '24px' },
		lg: { top: '16px', right: '32px', bottom: '16px', left: '32px' },
	}[ buttonSize || 'md' ] || { top: '12px', right: '24px', bottom: '12px', left: '24px' };

	const finalPaddingTop = getSpacing( padding, 'top' ) || defaultPadding.top;
	const finalPaddingRight = getSpacing( padding, 'right' ) || defaultPadding.right;
	const finalPaddingBottom = getSpacing( padding, 'bottom' ) || defaultPadding.bottom;
	const finalPaddingLeft = getSpacing( padding, 'left' ) || defaultPadding.left;

	const btnClasses = [
		'gravisain-btn',
		'gravisain-advanced-button-inner',
		`gravisain-btn-${ buttonStyle || 'fill' }`,
		buttonSize !== 'custom' ? `gravisain-btn-${ buttonSize || 'md' }` : 'gravisain-btn-custom',
	];

	const btnStyles = {
		'--btn-bg': finalBgColor,
		'--btn-color': finalTextColor,
		'--btn-hover-bg': hoverBackgroundColor || finalBgColor,
		'--btn-hover-color': hoverTextColor || finalTextColor,
		'--btn-border-color': finalBorderColor,
		'--btn-hover-border-color': hoverBorderColor || finalBorderColor,
		'--btn-icon-gap': ( iconSpacing !== undefined ? iconSpacing : 8 ) + 'px',
		backgroundColor: finalBgColor,
		color: finalTextColor,
		borderColor: finalBorderColor,
		borderWidth: borderWidth !== undefined && borderWidth !== '' ? `${ borderWidth }px` : ( isFill ? '1px' : '2px' ),
		borderStyle: borderStyle && borderStyle !== 'none' ? borderStyle : 'solid',
		borderRadius: borderRadius !== undefined && borderRadius !== '' ? `${ borderRadius }px` : '9999px',
		paddingTop: finalPaddingTop,
		paddingRight: finalPaddingRight,
		paddingBottom: finalPaddingBottom,
		paddingLeft: finalPaddingLeft,
		fontFamily: typography?.fontFamily || undefined,
		fontSize: typography?.fontSize ? `${ typography.fontSize }px` : ( buttonSize === 'sm' ? '14px' : buttonSize === 'lg' ? '18px' : '16px' ),
		fontWeight: typography?.fontWeight || 600,
		lineHeight: typography?.lineHeight || 1.2,
		letterSpacing: typography?.letterSpacing ? `${ typography.letterSpacing }px` : undefined,
		textTransform: textTransform && textTransform !== 'none' ? textTransform : undefined,
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		textDecoration: 'none',
		boxSizing: 'border-box',
		width: '100%',
	};

	const leftIconData = icon && iconPosition === 'left' ? getIconMarkup( icon ) : null;
	const rightIconData = icon && iconPosition === 'right' ? getIconMarkup( icon ) : null;

	return (
		<div { ...blockProps }>
			<a 
				href={ url || '#' } 
				className={ btnClasses.join( ' ' ) }
				style={ btnStyles }
				target={ newTab ? '_blank' : undefined }
				rel={ newTab ? 'noopener noreferrer' : undefined }
			>
				{ leftIconData && (
					<span className="gravisain-btn-icon icon-left">
						{ leftIconData.type === 'image' ? (
							<img src={ leftIconData.src } alt="" style={ { width: '1em', height: '1em', objectFit: 'contain' } } />
						) : (
							<span dangerouslySetInnerHTML={ { __html: leftIconData.content } } style={ { width: '1em', height: '1em', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' } } />
						) }
					</span>
				) }
				
				<RichText.Content
					tagName="span"
					className="gravisain-btn-text"
					value={ text }
				/>

				{ rightIconData && (
					<span className="gravisain-btn-icon icon-right">
						{ rightIconData.type === 'image' ? (
							<img src={ rightIconData.src } alt="" style={ { width: '1em', height: '1em', objectFit: 'contain' } } />
						) : (
							<span dangerouslySetInnerHTML={ { __html: rightIconData.content } } style={ { width: '1em', height: '1em', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' } } />
						) }
					</span>
				) }
			</a>
		</div>
	);
}
