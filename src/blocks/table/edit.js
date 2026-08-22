import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import Inspector from './components/Inspector';
import parseCustomCSS from '../../controls/parseCustomCSS';
import './editor.scss';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
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

	const updateCell = ( rowIndex, colIndex, value ) => {
		const newData = data.map( ( row, rIdx ) => {
			if ( rIdx === rowIndex ) {
				const newRow = [ ...row ];
				newRow[ colIndex ] = value;
				return newRow;
			}
			return row;
		} );
		setAttributes( { data: newData } );
	};

	const blockProps = useBlockProps( {
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

	// Safely ensure data array matches rows x columns
	const normalizedData = Array.from( { length: rows }, ( _, rIdx ) =>
		Array.from( { length: columns }, ( ___, cIdx ) => ( data[ rIdx ] && data[ rIdx ][ cIdx ] !== undefined ? data[ rIdx ][ cIdx ] : '' ) )
	);

	return (
		<>
			<Inspector { ...props } />
			<div { ...blockProps }>
				<table className="gravisain-table">
					{ hasHeader && normalizedData.length > 0 && (
						<thead>
							<tr>
								{ normalizedData[ 0 ].map( ( cell, cIdx ) => (
									<th key={ cIdx } className={ highlightColumn === cIdx + 1 ? 'is-highlighted-col' : '' }>
										<RichText
											tagName="span"
											value={ cell }
											onChange={ ( val ) => updateCell( 0, cIdx, val ) }
											placeholder={ `Header ${ cIdx + 1 }` }
										/>
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
											<RichText
												tagName="span"
												value={ cell }
												onChange={ ( val ) => updateCell( realRowIndex, cIdx, val ) }
												placeholder={ `Cell` }
											/>
										</td>
									) ) }
								</tr>
							);
						} ) }
					</tbody>
				</table>
			</div>
		</>
	);
}
