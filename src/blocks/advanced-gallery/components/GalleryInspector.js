import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl, ToggleControl, TabPanel } from '@wordpress/components';

export default function GalleryInspector( { attributes, setAttributes } ) {
	const { columns, gap, layout, imageRatio, enableLightbox, imageRadius } = attributes;

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
					}
				] }
			>
				{ ( tab ) => (
					<div className="gravisain-tab-content">
						{ tab.name === 'general' && (
							<PanelBody title={ __( 'Layout Settings', 'gravisain-blocks' ) } initialOpen={ true }>
								<SelectControl
									label={ __( 'Gallery Layout', 'gravisain-blocks' ) }
									value={ layout }
									options={ [
										{ label: __( 'Grid', 'gravisain-blocks' ), value: 'grid' },
										{ label: __( 'Masonry', 'gravisain-blocks' ), value: 'masonry' },
									] }
									onChange={ ( value ) => setAttributes( { layout: value } ) }
								/>

								{ layout === 'grid' && (
									<SelectControl
										label={ __( 'Image Ratio', 'gravisain-blocks' ) }
										value={ imageRatio }
										options={ [
											{ label: __( 'Square (1:1)', 'gravisain-blocks' ), value: 'square' },
											{ label: __( 'Landscape (4:3)', 'gravisain-blocks' ), value: 'landscape' },
											{ label: __( 'Portrait (3:4)', 'gravisain-blocks' ), value: 'portrait' },
											{ label: __( 'Original', 'gravisain-blocks' ), value: 'original' },
										] }
										onChange={ ( value ) => setAttributes( { imageRatio: value } ) }
									/>
								) }

								<RangeControl
									label={ __( 'Columns (Desktop)', 'gravisain-blocks' ) }
									value={ columns.desktop }
									onChange={ ( value ) => setAttributes( { columns: { ...columns, desktop: value } } ) }
									min={ 1 }
									max={ 8 }
								/>

								<RangeControl
									label={ __( 'Columns (Tablet)', 'gravisain-blocks' ) }
									value={ columns.tablet }
									onChange={ ( value ) => setAttributes( { columns: { ...columns, tablet: value } } ) }
									min={ 1 }
									max={ 6 }
								/>

								<RangeControl
									label={ __( 'Columns (Mobile)', 'gravisain-blocks' ) }
									value={ columns.mobile }
									onChange={ ( value ) => setAttributes( { columns: { ...columns, mobile: value } } ) }
									min={ 1 }
									max={ 4 }
								/>

								<RangeControl
									label={ __( 'Gap (Desktop)', 'gravisain-blocks' ) }
									value={ gap.desktop }
									onChange={ ( value ) => setAttributes( { gap: { ...gap, desktop: value } } ) }
									min={ 0 }
									max={ 100 }
								/>
								
								<RangeControl
									label={ __( 'Gap (Tablet)', 'gravisain-blocks' ) }
									value={ gap.tablet }
									onChange={ ( value ) => setAttributes( { gap: { ...gap, tablet: value } } ) }
									min={ 0 }
									max={ 100 }
								/>

								<RangeControl
									label={ __( 'Gap (Mobile)', 'gravisain-blocks' ) }
									value={ gap.mobile }
									onChange={ ( value ) => setAttributes( { gap: { ...gap, mobile: value } } ) }
									min={ 0 }
									max={ 100 }
								/>
							</PanelBody>
						) }

						{ tab.name === 'style' && (
							<PanelBody title={ __( 'Style Settings', 'gravisain-blocks' ) } initialOpen={ true }>
								<RangeControl
									label={ __( 'Image Border Radius', 'gravisain-blocks' ) }
									value={ imageRadius }
									onChange={ ( value ) => setAttributes( { imageRadius: value } ) }
									min={ 0 }
									max={ 100 }
								/>

								<ToggleControl
									label={ __( 'Enable Lightbox', 'gravisain-blocks' ) }
									checked={ enableLightbox }
									onChange={ ( value ) => setAttributes( { enableLightbox: value } ) }
									help={ __( 'Clicking an image opens it in a fullscreen lightbox.', 'gravisain-blocks' ) }
								/>
							</PanelBody>
						) }
					</div>
				) }
			</TabPanel>
		</InspectorControls>
	);
}
