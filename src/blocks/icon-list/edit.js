import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Button, Tooltip } from '@wordpress/components';
import Inspector from './components/Inspector';
import { ICONS } from '../../controls/icons';
import parseCustomCSS from '../../controls/parseCustomCSS';
import './editor.scss';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
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

	const updateItem = ( index, field, val ) => {
		const newItems = [ ...items ];
		newItems[ index ] = { ...newItems[ index ], [ field ]: val };
		setAttributes( { items: newItems } );
	};

	const addItem = () => {
		const newId = items.length > 0 ? Math.max( ...items.map( ( i ) => i.id ) ) + 1 : 1;
		setAttributes( {
			items: [ ...items, { id: newId, text: __( 'New list item', 'gravisain' ), icon: 'check', color: '' } ],
		} );
	};

	const removeItem = ( index ) => {
		const newItems = items.filter( ( _, idx ) => idx !== index );
		setAttributes( { items: newItems } );
	};

	const blockProps = useBlockProps( {
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
		<>
			<Inspector { ...props } />
			<div { ...blockProps }>
				<ul className="gravisain-icon-list-items">
					{ items.map( ( item, index ) => {
						const itemSvg = item.icon && ICONS[ item.icon ] ? ICONS[ item.icon ] : ICONS.check;
						return (
							<li key={ item.id } className="gravisain-icon-list-item">
								<span
									className="gravisain-list-icon"
									style={ { color: item.color || iconColor || '#10b981' } }
									dangerouslySetInnerHTML={ { __html: itemSvg } }
								/>
								
								<RichText
									tagName="span"
									className="gravisain-list-text"
									value={ item.text }
									onChange={ ( val ) => updateItem( index, 'text', val ) }
									placeholder={ __( 'List item text...', 'gravisain' ) }
								/>

								<div className="gravisain-item-actions">
									<Tooltip text={ __( 'Remove item', 'gravisain' ) }>
										<Button
											isSmall
											isDestructive
											icon="trash"
											onClick={ () => removeItem( index ) }
										/>
									</Tooltip>
								</div>
							</li>
						);
					} ) }
				</ul>

				<div className="gravisain-icon-list-add">
					<Button variant="secondary" onClick={ addItem } icon="plus">
						{ __( 'Add List Item', 'gravisain' ) }
					</Button>
				</div>
			</div>
		</>
	);
}
