import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import Inspector from './components/Inspector';
import useGoogleFont from '../../controls/useGoogleFont';
import './editor.scss';

const ALLOWED_BLOCKS = [ 'gravisain/navigation-link' ];

const TEMPLATE = [
	[ 'gravisain/navigation-link', { label: 'Home', url: '#' } ],
	[ 'gravisain/navigation-link', { label: 'About', url: '#' } ],
	[ 'gravisain/navigation-link', { label: 'Services', url: '#' } ],
	[ 'gravisain/navigation-link', { label: 'Contact', url: '#' } ],
];

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

export default function Edit( { attributes, setAttributes, clientId } ) {
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

	useGoogleFont( effectiveFontFamily );

	const blockProps = useBlockProps( {
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
		<>
			<Inspector attributes={ attributes } setAttributes={ setAttributes } />
			<style>{`
				#block-${clientId} .gravisain-nav-link-label,
				#block-${clientId} .gravisain-nav-link,
				.gravisain-navigation-wrapper[data-block="${clientId}"] .gravisain-nav-link-label,
				.gravisain-navigation-wrapper[data-block="${clientId}"] .gravisain-nav-link {
					${ formattedFontFamily ? `font-family: ${ formattedFontFamily } !important;` : '' }
					font-size: ${ formattedFontSize } !important;
					font-weight: ${ effectiveFontWeight } !important;
					font-style: ${ effectiveFontStyle } !important;
					${ effectiveLineHeight ? `line-height: ${ effectiveLineHeight } !important;` : '' }
					${ effectiveLetterSpacing !== undefined && effectiveLetterSpacing !== '' ? `letter-spacing: ${ formatPx( effectiveLetterSpacing, '0px' ) } !important;` : '' }
					color: ${ linkColor || '#334155' } !important;
					background-color: ${ linkBackground || 'transparent' } !important;
				}
				#block-${clientId} .gravisain-nav-link-item.is-active .gravisain-nav-link-label,
				#block-${clientId} .gravisain-nav-link-item.is-active .gravisain-nav-link {
					color: ${ linkActiveColor || '#2563eb' } !important;
					background-color: ${ linkActiveBackground || 'transparent' } !important;
				}
			`}</style>
			<div { ...blockProps }>
				<ul 
					className="gravisain-navigation-list"
					style={ {
						display: 'flex',
						flexDirection: layout === 'vertical' ? 'column' : 'row',
						justifyContent: alignment === 'right' ? 'flex-end' : ( alignment === 'center' ? 'center' : ( alignment === 'space-between' ? 'space-between' : 'flex-start' ) ),
						flexWrap: 'wrap',
						alignItems: 'center',
						gap: `${itemSpacing}px`,
						margin: 0,
						padding: 0,
						listStyle: 'none',
						width: '100%'
					} }
				>
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ TEMPLATE }
						orientation={ layout === 'horizontal' ? 'horizontal' : 'vertical' }
					/>
				</ul>
			</div>
		</>
	);
}
