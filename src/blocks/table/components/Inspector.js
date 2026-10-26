import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl, ToggleControl, TextControl, TextareaControl, TabPanel, Button } from '@wordpress/components';
import ColorControl from '../../../controls/ColorControl';

export default function Inspector( { attributes, setAttributes } ) {
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

	const addRow = () => {
		const newRow = Array( columns ).fill( 'New Cell' );
		setAttributes( { rows: rows + 1, data: [ ...data, newRow ] } );
	};

	const removeRow = () => {
		if ( rows <= 1 ) return;
		const newData = data.slice( 0, rows - 1 );
		setAttributes( { rows: rows - 1, data: newData } );
	};

	const addColumn = () => {
		const newData = data.map( ( row ) => [ ...row, 'New Col' ] );
		setAttributes( { columns: columns + 1, data: newData } );
	};

	const removeColumn = () => {
		if ( columns <= 1 ) return;
		const newData = data.map( ( row ) => row.slice( 0, columns - 1 ) );
		setAttributes( { columns: columns - 1, data: newData } );
	};

	return (
		<InspectorControls>
			<TabPanel
				className="gravisain-inspector-tabs"
				activeClass="active-tab"
				tabs={ [
					{ name: 'general', title: __( 'General', 'gravisain-blocks' ), className: 'gravisain-tab-general' },
					{ name: 'style', title: __( 'Style', 'gravisain-blocks' ), className: 'gravisain-tab-style' },
					{ name: 'advanced', title: __( 'Advanced', 'gravisain-blocks' ), className: 'gravisain-tab-advanced' },
				] }
			>
				{ ( tab ) => (
					<div className="gravisain-tab-content">
						{ tab.name === 'general' && (
							<>
								<PanelBody title={ __( 'Table Structure', 'gravisain-blocks' ) } initialOpen={ true }>
									<div style={ { display: 'flex', gap: '8px', marginBottom: '12px' } }>
										<Button variant="secondary" onClick={ addRow } style={ { flex: 1, justifyContent: 'center' } }>+ { __( 'Row', 'gravisain-blocks' ) }</Button>
										<Button variant="secondary" onClick={ removeRow } style={ { flex: 1, justifyContent: 'center' } } disabled={ rows <= 1 }>- { __( 'Row', 'gravisain-blocks' ) }</Button>
									</div>
									<div style={ { display: 'flex', gap: '8px', marginBottom: '16px' } }>
										<Button variant="secondary" onClick={ addColumn } style={ { flex: 1, justifyContent: 'center' } }>+ { __( 'Column', 'gravisain-blocks' ) }</Button>
										<Button variant="secondary" onClick={ removeColumn } style={ { flex: 1, justifyContent: 'center' } } disabled={ columns <= 1 }>- { __( 'Column', 'gravisain-blocks' ) }</Button>
									</div>

									<ToggleControl
										label={ __( 'Use First Row as Header', 'gravisain-blocks' ) }
										checked={ hasHeader }
										onChange={ ( val ) => setAttributes( { hasHeader: val } ) }
									/>
									<ToggleControl
										label={ __( 'Striped Rows', 'gravisain-blocks' ) }
										checked={ stripedRows }
										onChange={ ( val ) => setAttributes( { stripedRows: val } ) }
									/>
									<ToggleControl
										label={ __( 'Row Hover Highlight', 'gravisain-blocks' ) }
										checked={ hoverEffect }
										onChange={ ( val ) => setAttributes( { hoverEffect: val } ) }
									/>
								</PanelBody>

								<PanelBody title={ __( 'Pricing / Highlight Column', 'gravisain-blocks' ) } initialOpen={ false }>
									<SelectControl
										label={ __( 'Highlighted Column (e.g. Popular Plan)', 'gravisain-blocks' ) }
										value={ highlightColumn }
										options={ [
											{ label: __( 'None', 'gravisain-blocks' ), value: 0 },
											...Array.from( { length: columns }, ( _, i ) => ( {
												label: `Column ${ i + 1 }`,
												value: i + 1,
											} ) ),
										] }
										onChange={ ( val ) => setAttributes( { highlightColumn: Number( val ) } ) }
									/>
								</PanelBody>
							</>
						) }

						{ tab.name === 'style' && (
							<>
								<PanelBody title={ __( 'Colors', 'gravisain-blocks' ) } initialOpen={ true }>
									<ColorControl
										label={ __( 'Header Background Color', 'gravisain-blocks' ) }
										value={ headerBackgroundColor }
										onChange={ ( val ) => setAttributes( { headerBackgroundColor: val } ) }
									/>
									<ColorControl
										label={ __( 'Header Text Color', 'gravisain-blocks' ) }
										value={ headerTextColor }
										onChange={ ( val ) => setAttributes( { headerTextColor: val } ) }
										disableGradient={ true }
									/>
									<ColorControl
										label={ __( 'Highlighted Column Background', 'gravisain-blocks' ) }
										value={ highlightBackgroundColor }
										onChange={ ( val ) => setAttributes( { highlightBackgroundColor: val } ) }
									/>
									<ColorControl
										label={ __( 'Border Color', 'gravisain-blocks' ) }
										value={ borderColor }
										onChange={ ( val ) => setAttributes( { borderColor: val } ) }
										disableGradient={ true }
									/>
								</PanelBody>

								<PanelBody title={ __( 'Padding & Typography', 'gravisain-blocks' ) } initialOpen={ false }>
									<RangeControl
										label={ __( 'Cell Padding (px)', 'gravisain-blocks' ) }
										value={ cellPadding }
										onChange={ ( val ) => setAttributes( { cellPadding: val } ) }
										min={ 6 }
										max={ 36 }
									/>
									<RangeControl
										label={ __( 'Font Size (px)', 'gravisain-blocks' ) }
										value={ fontSize }
										onChange={ ( val ) => setAttributes( { fontSize: val } ) }
										min={ 12 }
										max={ 24 }
									/>
								</PanelBody>
							</>
						) }

						{ tab.name === 'advanced' && (
							<PanelBody title={ __( 'Advanced Settings', 'gravisain-blocks' ) } initialOpen={ true }>
								<TextControl
									label={ __( 'HTML Anchor', 'gravisain-blocks' ) }
									help={ __( 'Enter a word or two — without spaces — to make a unique web address just for this block, called an "anchor". Then, you\'ll be able to link directly to this section of your page.', 'gravisain-blocks' ) }
									value={ anchor }
									onChange={ ( val ) => setAttributes( { anchor: val } ) }
								/>
								<TextControl
									label={ __( 'Additional CSS class(es)', 'gravisain-blocks' ) }
									help={ __( 'Separate multiple classes with spaces.', 'gravisain-blocks' ) }
									value={ customClassName }
									onChange={ ( val ) => setAttributes( { customClassName: val } ) }
								/>
								<TextareaControl
									label={ __( 'Additional CSS', 'gravisain-blocks' ) }
									help={ __( 'Add your own CSS to customize the appearance of this block. You do not need to include a CSS selector, just add the property and value, e.g. color: red;.', 'gravisain-blocks' ) }
									value={ customCSS }
									onChange={ ( val ) => setAttributes( { customCSS: val } ) }
									rows={ 4 }
								/>
							</PanelBody>
						) }
					</div>
				) }
			</TabPanel>
		</InspectorControls>
	);
}
