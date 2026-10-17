import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import metadata from './block.json';

const v1 = {
	attributes: metadata.attributes,
	save( { attributes } ) {
		const { 
			layout, alignment, 
			linkColor, linkHoverColor, linkHoverBackground, 
			fontSize, fontWeight, itemSpacing 
		} = attributes;

		const blockProps = useBlockProps.save( {
			className: `gravisain-navigation-wrapper layout-${layout} align-${alignment}`,
			style: {
				'--gravisain-nav-gap': `${itemSpacing}px`,
				'--gravisain-nav-color': linkColor,
				'--gravisain-nav-hover-color': linkHoverColor,
				'--gravisain-nav-hover-bg': linkHoverBackground,
				'--gravisain-nav-fs': `${fontSize}px`,
				'--gravisain-nav-fw': fontWeight,
			}
		} );

		return (
			<nav { ...blockProps }>
				<ul className="gravisain-navigation-list">
					<InnerBlocks.Content />
				</ul>
			</nav>
		);
	},
};

const v2 = {
	attributes: metadata.attributes,
	save( { attributes } ) {
		const { 
			layout, alignment, 
			linkColor, linkHoverColor, linkHoverBackground, 
			fontSize, fontWeight, typography = {}, itemSpacing 
		} = attributes;

		const effectiveFontFamily = typography?.fontFamily || '';
		const effectiveFontSize = typography?.fontSize ?? fontSize ?? 16;
		const effectiveFontWeight = typography?.fontWeight || fontWeight || '500';
		const effectiveLineHeight = typography?.lineHeight;
		const effectiveLetterSpacing = typography?.letterSpacing;

		const blockProps = useBlockProps.save( {
			className: `gravisain-navigation-wrapper layout-${layout} align-${alignment}`,
			style: {
				'--gravisain-nav-gap': `${itemSpacing ?? 24}px`,
				'--gravisain-nav-color': linkColor || '#334155',
				'--gravisain-nav-hover-color': linkHoverColor || '#2563eb',
				'--gravisain-nav-hover-bg': linkHoverBackground || 'transparent',
				'--gravisain-nav-ff': effectiveFontFamily ? effectiveFontFamily : undefined,
				'--gravisain-nav-fs': `${effectiveFontSize}px`,
				'--gravisain-nav-fw': effectiveFontWeight,
				'--gravisain-nav-lh': effectiveLineHeight ? `${effectiveLineHeight}` : undefined,
				'--gravisain-nav-ls': effectiveLetterSpacing !== undefined && effectiveLetterSpacing !== '' ? `${effectiveLetterSpacing}px` : undefined,
			}
		} );

		return (
			<nav { ...blockProps }>
				<ul className="gravisain-navigation-list">
					<InnerBlocks.Content />
				</ul>
			</nav>
		);
	},
};

const v3 = {
	attributes: metadata.attributes,
	save( { attributes } ) {
		const { 
			layout, alignment, 
			linkColor, linkHoverColor, linkActiveColor,
			linkBackground, linkHoverBackground, linkActiveBackground,
			fontSize, fontWeight, typography = {}, itemSpacing 
		} = attributes;

		const effectiveFontFamily = typography?.fontFamily || '';
		const effectiveFontStyle = typography?.fontStyle || typography?.style || 'normal';
		const effectiveFontSize = typography?.fontSize ?? fontSize ?? 16;
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
				'--gravisain-nav-ff': effectiveFontFamily ? effectiveFontFamily : undefined,
				'--gravisain-nav-fst': effectiveFontStyle,
				'--gravisain-nav-fs': `${effectiveFontSize}px`,
				'--gravisain-nav-fw': effectiveFontWeight,
				'--gravisain-nav-lh': effectiveLineHeight ? `${effectiveLineHeight}` : undefined,
				'--gravisain-nav-ls': effectiveLetterSpacing !== undefined && effectiveLetterSpacing !== '' ? `${effectiveLetterSpacing}px` : undefined,
			}
		} );

		return (
			<nav { ...blockProps }>
				<ul className="gravisain-navigation-list">
					<InnerBlocks.Content />
				</ul>
			</nav>
		);
	},
};

export default [ v3, v2, v1 ];
