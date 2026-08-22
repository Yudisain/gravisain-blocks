import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		question,
		isOpen,
		iconType,
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

	const blockProps = useBlockProps.save( {
		className: [
			'gravisain-faq-item',
			isOpen ? 'is-open' : '',
			`icon-${ iconType || 'arrow-down-alt2' }`,
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
			'--icon-color-normal': iconColorNormal || '#64748b',
			'--icon-color-active': iconColorActive || '#4f46e5',
			'--icon-size': `${ iconSize ?? 24 }px`,
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

	const getDashiconClass = () => {
		if ( iconType === 'plus' ) {
			return isOpen ? 'dashicons-minus' : 'dashicons-plus';
		}
		if ( iconType === 'arrow-down' ) {
			return 'dashicons-arrow-down';
		}
		return 'dashicons-arrow-down-alt2';
	};

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
				<span className={ `gravisain-faq-item__icon dashicons ${ getDashiconClass() }` } />
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
