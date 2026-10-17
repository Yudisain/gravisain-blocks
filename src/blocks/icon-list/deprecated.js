import { useBlockProps, RichText } from '@wordpress/block-editor';
import { ICONS } from '../../controls/icons';
import parseCustomCSS from '../../controls/parseCustomCSS';

const v1 = {
	attributes: {
		items: {
			type: 'array',
			default: [
				{ id: 1, text: 'High performance clean architecture', icon: 'check', color: '#10b981' },
				{ id: 2, text: 'Fully responsive and mobile optimized', icon: 'check', color: '#10b981' },
				{ id: 3, text: 'Seamless Gutenberg block integration', icon: 'check', color: '#10b981' },
			],
		},
		layout: { type: 'string', default: 'vertical' },
		itemGap: { type: 'number', default: 12 },
		iconSize: { type: 'number', default: 20 },
		iconColor: { type: 'string', default: '#10b981' },
		textColor: { type: 'string', default: '' },
		fontSize: { type: 'number', default: 16 },
		anchor: { type: 'string', default: '' },
		customClassName: { type: 'string', default: '' },
		customCSS: { type: 'string', default: '' },
	},
	save( { attributes } ) {
		const {
			items = [],
			layout,
			itemGap,
			iconSize,
			iconColor,
			textColor,
			fontSize,
			anchor,
			customClassName,
			customCSS,
		} = attributes;

		const blockProps = useBlockProps.save( {
			id: anchor || undefined,
			className: [
				'gravisain-icon-list',
				`layout-${ layout || 'vertical' }`,
				customClassName || '',
			].filter( Boolean ).join( ' ' ),
			style: {
				'--gravisain-list-gap': `${ itemGap }px`,
				'--gravisain-list-icon-size': `${ iconSize }px`,
				'--gravisain-list-icon-color': iconColor || '#10b981',
				'--gravisain-list-font-size': `${ fontSize }px`,
				color: textColor || undefined,
				...parseCustomCSS( customCSS ),
			},
		} );

		return (
			<div { ...blockProps }>
				<ul className="gravisain-icon-list-items">
					{ items.map( ( item ) => {
						const itemSvg = item.icon && ICONS[ item.icon ] ? ICONS[ item.icon ] : ICONS.check;
						return (
							<li key={ item.id } className="gravisain-icon-list-item">
								<span
									className="gravisain-list-icon"
									style={ { color: item.color || iconColor || '#10b981' } }
									dangerouslySetInnerHTML={ { __html: itemSvg } }
								/>
								<RichText.Content tagName="span" className="gravisain-list-text" value={ item.text } />
							</li>
						);
					} ) }
				</ul>
			</div>
		);
	},
};

export default [ v1 ];
