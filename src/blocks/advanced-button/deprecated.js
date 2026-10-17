import { useBlockProps, RichText } from '@wordpress/block-editor';
import { ICONS } from '../../controls/icons';
import parseCustomCSS from '../../controls/parseCustomCSS';

const v1 = {
	attributes: {
		anchor: { type: 'string', default: '' },
		customClassName: { type: 'string', default: '' },
		customCSS: { type: 'string', default: '' },
		text: { type: 'string', default: 'Click Here' },
		url: { type: 'string', default: '' },
		newTab: { type: 'boolean', default: false },
		icon: { type: 'string', default: '' },
		iconPosition: { type: 'string', default: 'left' },
		backgroundColor: { type: 'string', default: 'var(--wp--preset--color--primary)' },
		textColor: { type: 'string', default: '#ffffff' },
		hoverBackgroundColor: { type: 'string', default: 'var(--wp--preset--color--secondary)' },
		hoverTextColor: { type: 'string', default: '#ffffff' },
		borderRadius: { type: 'number', default: 4 },
		padding: { type: 'object', default: { top: '12px', right: '24px', bottom: '12px', left: '24px' } },
		borderWidth: { type: 'number', default: 0 },
		borderColor: { type: 'string', default: 'transparent' },
		hoverBorderColor: { type: 'string', default: 'transparent' },
		hoverEffect: { type: 'string', default: 'none' },
		shadow: { type: 'boolean', default: false }
	},
	save( { attributes } ) {
		const { 
			text, url, newTab, icon, iconPosition,
			backgroundColor, textColor, hoverBackgroundColor, hoverTextColor,
			borderRadius, padding, borderWidth, borderColor, hoverBorderColor,
			hoverEffect, shadow,
			anchor, customClassName, customCSS
		} = attributes;

		const blockProps = useBlockProps.save( {
			id: anchor || undefined,
			className: `gravisain-advanced-button hover-effect-${hoverEffect} ${shadow ? 'has-shadow' : ''} ${customClassName || ''}`.trim(),
			style: {
				'--btn-bg': backgroundColor || undefined,
				'--btn-color': textColor || undefined,
				'--btn-hover-bg': hoverBackgroundColor || backgroundColor || undefined,
				'--btn-hover-color': hoverTextColor || textColor || undefined,
				'--btn-border-color': borderColor || 'transparent',
				'--btn-hover-border-color': hoverBorderColor || borderColor || 'transparent',
				borderWidth: `${borderWidth}px`,
				borderRadius: `${borderRadius}px`,
				paddingTop: padding?.top || undefined,
				paddingRight: padding?.right || undefined,
				paddingBottom: padding?.bottom || undefined,
				paddingLeft: padding?.left || undefined,
				...parseCustomCSS( customCSS ),
			}
		} );

		return (
			<div { ...blockProps }>
				<a 
					href={ url || '#' } 
					className="gravisain-advanced-button-inner"
					target={ newTab ? '_blank' : undefined }
					rel={ newTab ? 'noopener noreferrer' : undefined }
				>
					{ icon && iconPosition === 'left' && ICONS[ icon ] && (
						<span className="gravisain-btn-icon icon-left" dangerouslySetInnerHTML={ { __html: ICONS[ icon ] } } />
					) }
					
					<RichText.Content
						tagName="span"
						className="gravisain-btn-text"
						value={ text }
					/>

					{ icon && iconPosition === 'right' && ICONS[ icon ] && (
						<span className="gravisain-btn-icon icon-right" dangerouslySetInnerHTML={ { __html: ICONS[ icon ] } } />
					) }
				</a>
			</div>
		);
	}
};

export default [ v1 ];
