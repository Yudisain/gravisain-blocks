import { useBlockProps, RichText } from '@wordpress/block-editor';
import parseCustomCSS from '../../controls/parseCustomCSS';

export default function save( { attributes } ) {
	const {
		rows,
		columns,
		data = [],
		hasHeader,
		stripedRows,
		hoverEffect,
		highlightColumn,
		headerBackgroundColor,
		headerTextColor,
		highlightBackgroundColor,
		borderColor,
		cellPadding,
		fontSize,
		anchor,
		customClassName,
		customCSS,
	} = attributes;

	const blockProps = useBlockProps.save( {
		id: anchor || undefined,
		className: [
			'gravisain-table-container',
			stripedRows ? 'is-striped' : '',
			hoverEffect ? 'has-hover' : '',
			customClassName || '',
		].filter( Boolean ).join( ' ' ),
		style: {
			'--gravisain-tbl-header-bg': headerBackgroundColor || '#007cba',
			'--gravisain-tbl-header-color': headerTextColor || '#ffffff',
			'--gravisain-tbl-highlight-bg': highlightBackgroundColor || '#f0f9ff',
			'--gravisain-tbl-border': borderColor || '#e2e8f0',
			'--gravisain-tbl-padding': `${ cellPadding }px`,
			'--gravisain-tbl-font-size': `${ fontSize }px`,
			...parseCustomCSS( customCSS ),
		},
	} );

	const normalizedData = Array.from( { length: rows }, ( _, rIdx ) =>
		Array.from( { length: columns }, ( ___, cIdx ) => ( data[ rIdx ] && data[ rIdx ][ cIdx ] !== undefined ? data[ rIdx ][ cIdx ] : '' ) )
	);

	return (
		<div { ...blockProps }>
			<table className="gravisain-table">
				{ hasHeader && normalizedData.length > 0 && (
					<thead>
						<tr>
							{ normalizedData[ 0 ].map( ( cell, cIdx ) => (
								<th key={ cIdx } className={ highlightColumn === cIdx + 1 ? 'is-highlighted-col' : '' }>
									<RichText.Content tagName="span" value={ cell } />
								</th>
							) ) }
						</tr>
					</thead>
				) }
				<tbody>
					{ normalizedData.slice( hasHeader ? 1 : 0 ).map( ( row, rOffset ) => {
						const realRowIndex = hasHeader ? rOffset + 1 : rOffset;
						return (
							<tr key={ realRowIndex }>
								{ row.map( ( cell, cIdx ) => (
									<td key={ cIdx } className={ highlightColumn === cIdx + 1 ? 'is-highlighted-col' : '' }>
										<RichText.Content tagName="span" value={ cell } />
									</td>
								) ) }
							</tr>
						);
					} ) }
				</tbody>
			</table>
		</div>
	);
}
