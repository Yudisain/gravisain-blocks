import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, TabPanel } from '@wordpress/components';

export default function Inspector( { attributes, setAttributes } ) {
	const {
		columns,
		columnsTablet,
		columnsMobile,
		columnGap,
		rowGap,
		marginTop,
		marginBottom,
		paddingTop,
		paddingBottom,
		paddingLeft,
		paddingRight,
	} = attributes;

	return (
		<InspectorControls>
			<TabPanel
				className="gravisain-inspector-tabs"
				activeClass="active-tab"
				tabs={ [
					{
						name: 'general',
						title: __( 'General', 'gravisain-blocks' ),
						className: 'gravisain-tab-general',
					},
					{
						name: 'style',
						title: __( 'Style', 'gravisain-blocks' ),
						className: 'gravisain-tab-style',
					},
					{
						name: 'advanced',
						title: __( 'Advanced', 'gravisain-blocks' ),
						className: 'gravisain-tab-advanced',
					},
				] }
			>
				{ ( tab ) => {
					if ( tab.name === 'general' ) {
						return (
							<PanelBody title={ __( 'Responsive Columns', 'gravisain-blocks' ) }>
								<RangeControl
									label={ __( 'Desktop Columns', 'gravisain-blocks' ) }
									value={ columns }
									onChange={ ( value ) => setAttributes( { columns: value } ) }
									min={ 1 }
									max={ 4 }
								/>
								<RangeControl
									label={ __( 'Tablet Columns', 'gravisain-blocks' ) }
									value={ columnsTablet }
									onChange={ ( value ) => setAttributes( { columnsTablet: value } ) }
									min={ 1 }
									max={ 3 }
								/>
								<RangeControl
									label={ __( 'Mobile Columns', 'gravisain-blocks' ) }
									value={ columnsMobile }
									onChange={ ( value ) => setAttributes( { columnsMobile: value } ) }
									min={ 1 }
									max={ 2 }
								/>
							</PanelBody>
						);
					}

					if ( tab.name === 'style' ) {
						return (
							<PanelBody title={ __( 'Grid Gaps / Spacing Between Cards', 'gravisain-blocks' ) }>
								<RangeControl
									label={ __( 'Column Gap (Horizontal distance in px)', 'gravisain-blocks' ) }
									value={ columnGap }
									onChange={ ( value ) => setAttributes( { columnGap: value } ) }
									min={ 0 }
									max={ 100 }
								/>
								<RangeControl
									label={ __( 'Row Gap (Vertical distance in px)', 'gravisain-blocks' ) }
									value={ rowGap }
									onChange={ ( value ) => setAttributes( { rowGap: value } ) }
									min={ 0 }
									max={ 100 }
								/>
							</PanelBody>
						);
					}

					if ( tab.name === 'advanced' ) {
						return (
							<PanelBody title={ __( 'Container Margin & Padding', 'gravisain-blocks' ) }>
								<RangeControl
									label={ __( 'Margin Top (px)', 'gravisain-blocks' ) }
									value={ marginTop }
									onChange={ ( value ) => setAttributes( { marginTop: value } ) }
									min={ 0 }
									max={ 120 }
								/>
								<RangeControl
									label={ __( 'Margin Bottom (px)', 'gravisain-blocks' ) }
									value={ marginBottom }
									onChange={ ( value ) => setAttributes( { marginBottom: value } ) }
									min={ 0 }
									max={ 120 }
								/>
								<RangeControl
									label={ __( 'Padding Top (px)', 'gravisain-blocks' ) }
									value={ paddingTop }
									onChange={ ( value ) => setAttributes( { paddingTop: value } ) }
									min={ 0 }
									max={ 120 }
								/>
								<RangeControl
									label={ __( 'Padding Bottom (px)', 'gravisain-blocks' ) }
									value={ paddingBottom }
									onChange={ ( value ) => setAttributes( { paddingBottom: value } ) }
									min={ 0 }
									max={ 120 }
								/>
								<RangeControl
									label={ __( 'Padding Left (px)', 'gravisain-blocks' ) }
									value={ paddingLeft }
									onChange={ ( value ) => setAttributes( { paddingLeft: value } ) }
									min={ 0 }
									max={ 120 }
								/>
								<RangeControl
									label={ __( 'Padding Right (px)', 'gravisain-blocks' ) }
									value={ paddingRight }
									onChange={ ( value ) => setAttributes( { paddingRight: value } ) }
									min={ 0 }
									max={ 120 }
								/>
							</PanelBody>
						);
					}

					return null;
				} }
			</TabPanel>
		</InspectorControls>
	);
}
