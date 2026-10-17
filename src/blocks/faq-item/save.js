import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';
import FaqIcon from './components/FaqIcon';

export default function save( { attributes } ) {
	const {
		question,
		isOpen,
		iconType,
		parentIcon,
		headerPaddingTop,
		headerPaddingBottom,
		headerPaddingLeft,
		headerPaddingRight,
		contentPaddingTop,
		contentPaddingBottom,
		contentPaddingLeft,
		contentPaddingRight,
		questionFontSize,
		questionColorNormal,
		questionColorActive,
		headerBgNormal,
		headerBgActive,
		iconColorNormal,
		iconColorActive,
		iconSize,
		contentBg,
		borderColorNormal,
		borderColorActive,
		borderWidth,
		borderRadius,
		boxShadow,
	} = attributes;

	const effectiveIconType = ( iconType && iconType !== 'inherit' )
		? iconType
		: ( parentIcon || 'arrow-down-alt2' );

	// Only apply item-level overrides if user intentionally set a value different from default
	const hasItemCustomSize = iconSize !== undefined && iconSize !== '' && iconSize !== 24;
	const hasItemCustomColorNormal = iconColorNormal && iconColorNormal !== '#64748b';
	const hasItemCustomColorActive = iconColorActive && iconColorActive !== '#4f46e5';

	const blockProps = useBlockProps.save( {
		className: [
			'gravisain-faq-item',
			isOpen ? 'is-open' : '',
			effectiveIconType !== 'none' ? `icon-${ effectiveIconType }` : 'no-icon',
			boxShadow ? 'has-shadow' : '',
		]
			.filter( Boolean )
			.join( ' ' ),
		style: {
			'--q-size': `${ questionFontSize ?? 18 }px`,
			'--q-color-normal': questionColorNormal || '#1e293b',
			'--q-color-active': questionColorActive || '#4f46e5',
			'--hdr-bg-normal': headerBgNormal || '#ffffff',
			'--hdr-bg-active': headerBgActive || '#f8fafc',
			...( hasItemCustomColorNormal ? { '--icon-color-normal': iconColorNormal } : {} ),
			...( hasItemCustomColorActive ? { '--icon-color-active': iconColorActive } : {} ),
			...( hasItemCustomSize ? { '--icon-size': `${ iconSize }px` } : {} ),
			'--content-bg': contentBg || '#ffffff',
			'--border-normal': borderColorNormal || '#e2e8f0',
			'--border-active': borderColorActive || '#4f46e5',
			'--border-width': `${ borderWidth ?? 1 }px`,
			'--radius': `${ borderRadius ?? 8 }px`,
			'--hdr-pt': `${ headerPaddingTop ?? 24 }px`,
			'--hdr-pb': `${ headerPaddingBottom ?? 24 }px`,
			'--hdr-pl': `${ headerPaddingLeft ?? 24 }px`,
			'--hdr-pr': `${ headerPaddingRight ?? 24 }px`,
			'--cnt-pt': `${ contentPaddingTop ?? 0 }px`,
			'--cnt-pb': `${ contentPaddingBottom ?? 24 }px`,
			'--cnt-pl': `${ contentPaddingLeft ?? 24 }px`,
			'--cnt-pr': `${ contentPaddingRight ?? 24 }px`,
		},
	} );

	return (
		<div { ...blockProps }>
			<button
				className="gravisain-faq-item__header"
				aria-expanded={ isOpen ? 'true' : 'false' }
			>
				{ question && (
					<RichText.Content
						tagName="h3"
						className="gravisain-faq-item__question"
						value={ question }
					/>
				) }
				{ effectiveIconType !== 'none' && (
					<span className="gravisain-faq-item__icon">
						<FaqIcon iconType={ effectiveIconType } />
					</span>
				) }
			</button>
			<div
				className="gravisain-faq-item__content"
				aria-hidden={ isOpen ? 'false' : 'true' }
			>
				<div className="gravisain-faq-item__content-inner">
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	);
}
