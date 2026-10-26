import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import ItemInspector from './components/ItemInspector';
import FaqIcon from './components/FaqIcon';
import './editor.scss';

export default function Edit( props ) {
	const { attributes, setAttributes, context } = props;
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

	const globalIconType = context?.[ 'gravisain/faqIconType' ] || 'arrow-down-alt2';
	const globalIconSize = context?.[ 'gravisain/faqIconSize' ];
	const globalIconColorNormal = context?.[ 'gravisain/faqIconColorNormal' ];
	const globalIconColorActive = context?.[ 'gravisain/faqIconColorActive' ];

	useEffect( () => {
		if ( parentIcon !== globalIconType ) {
			setAttributes( { parentIcon: globalIconType } );
		}
	}, [ globalIconType, parentIcon ] );

	const effectiveIconType = ( iconType && iconType !== 'inherit' )
		? iconType
		: globalIconType;

	// Only apply item-level overrides if user intentionally set a value different from global/defaults
	const hasItemCustomSize = iconSize !== undefined && iconSize !== '' && iconSize !== 24 && iconSize !== globalIconSize;
	const hasItemCustomColorNormal = iconColorNormal && iconColorNormal !== '#64748b' && iconColorNormal !== globalIconColorNormal;
	const hasItemCustomColorActive = iconColorActive && iconColorActive !== '#4f46e5' && iconColorActive !== globalIconColorActive;

	const blockProps = useBlockProps( {
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
		<>
			<ItemInspector { ...props } />
			<div { ...blockProps }>
				<div
					className="gravisain-faq-item__header"
					onClick={ () => setAttributes( { isOpen: ! isOpen } ) }
				>
					<RichText
						tagName="h3"
						className="gravisain-faq-item__question"
						value={ question }
						onChange={ ( value ) => setAttributes( { question: value } ) }
						placeholder={ __( 'Enter question...', 'gravisain-blocks' ) }
					/>
					{ effectiveIconType !== 'none' && (
						<span className="gravisain-faq-item__icon">
							<FaqIcon iconType={ effectiveIconType } />
						</span>
					) }
				</div>
				<div className="gravisain-faq-item__content">
					<div className="gravisain-faq-item__content-inner">
						<InnerBlocks
							template={ [ [ 'core/paragraph', { placeholder: 'Enter answer here...' } ] ] }
						/>
					</div>
				</div>
			</div>
		</>
	);
}
