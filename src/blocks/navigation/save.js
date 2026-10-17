import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

const cleanFontFamily = ( fam ) => {
	if ( ! fam || fam === 'inherit' || fam === 'default' ) return undefined;
	if ( fam.includes( ',' ) ) return fam;
	return `'${ fam }', sans-serif`;
};

const formatPx = ( val, fallback ) => {
	if ( val === undefined || val === null || val === '' ) return fallback;
	const str = String( val ).trim();
	return str.endsWith( 'px' ) || str.endsWith( 'rem' ) || str.endsWith( 'em' ) ? str : `${str}px`;
};

export default function save( { attributes } ) {
	const { 
		layout, alignment, 
		linkColor, linkHoverColor, linkActiveColor,
		linkBackground, linkHoverBackground, linkActiveBackground,
		fontSize, fontWeight, fontFamily, typography = {}, itemSpacing 
	} = attributes;

	const effectiveFontFamily = typography?.fontFamily || fontFamily || '';
	const formattedFontFamily = cleanFontFamily( effectiveFontFamily );
	const effectiveFontStyle = typography?.fontStyle || typography?.style || 'normal';
	const effectiveFontSize = typography?.fontSize ?? fontSize ?? 16;
	const formattedFontSize = formatPx( effectiveFontSize, '16px' );
	const effectiveFontWeight = typography?.fontWeight || fontWeight || '500';
	const effectiveLineHeight = typography?.lineHeight;
	const effectiveLetterSpacing = typography?.letterSpacing;

	const blockProps = useBlockProps.save( {
		className: `gravisain-navigation-wrapper layout-${layout} align-${alignment}`,
		style: {
			'--gravisain-nav-gap': `${itemSpacing ?? 24}px`,
			'--gravisain-nav-color': linkColor || '#334155',
			'--gravisain-nav-hover-color': linkHoverColor || '#2563eb',
			'--gravisain-nav-active-color': linkActiveColor || '#2563eb',
			'--gravisain-nav-bg': linkBackground || 'transparent',
			'--gravisain-nav-hover-bg': linkHoverBackground || 'transparent',
			'--gravisain-nav-active-bg': linkActiveBackground || 'transparent',
			'--gravisain-nav-ff': formattedFontFamily,
			'--gravisain-nav-fst': effectiveFontStyle,
			'--gravisain-nav-fs': formattedFontSize,
			'--gravisain-nav-fw': effectiveFontWeight,
			'--gravisain-nav-lh': effectiveLineHeight ? String( effectiveLineHeight ) : undefined,
			'--gravisain-nav-ls': effectiveLetterSpacing !== undefined && effectiveLetterSpacing !== '' ? formatPx( effectiveLetterSpacing, '0px' ) : undefined,
		}
	} );

	return (
		<nav { ...blockProps }>
			<ul className="gravisain-navigation-list">
				<InnerBlocks.Content />
			</ul>
		</nav>
	);
}
