import { __ } from '@wordpress/i18n';
import { InspectorControls, InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl, TabPanel } from '@wordpress/components';
import './editor.scss';

const ALLOWED_BLOCKS = [ 'gravisain/testimonial' ];

export default function Edit( { attributes, setAttributes } ) {
	const { columns, gap, layout, anchor } = attributes;

	const blockProps = useBlockProps( {
		id: anchor || undefined,
		className: `gravisain-testimonials-wrapper layout-${layout}`.trim(),
		style: {
			'--testi-cols-desktop': columns.desktop,
			'--testi-cols-tablet': columns.tablet,
			'--testi-cols-mobile': columns.mobile,
			'--testi-gap-desktop': `${gap.desktop}px`,
			'--testi-gap-tablet': `${gap.tablet}px`,
			'--testi-gap-mobile': `${gap.mobile}px`,
		}
	} );

	return (
		<>
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
										label={ __( 'Layout', 'gravisain-blocks' ) }
										value={ layout }
										options={ [
											{ label: __( 'Grid', 'gravisain-blocks' ), value: 'grid' },
											{ label: __( 'Carousel (Coming Soon)', 'gravisain-blocks' ), value: 'carousel' },
										] }
										onChange={ ( value ) => setAttributes( { layout: value } ) }
									/>
									
									{ layout === 'grid' && (
										<>
											<RangeControl
												label={ __( 'Columns (Desktop)', 'gravisain-blocks' ) }
												value={ columns.desktop }
												onChange={ ( value ) => setAttributes( { columns: { ...columns, desktop: value } } ) }
												min={ 1 }
												max={ 4 }
											/>
											<RangeControl
												label={ __( 'Columns (Tablet)', 'gravisain-blocks' ) }
												value={ columns.tablet }
												onChange={ ( value ) => setAttributes( { columns: { ...columns, tablet: value } } ) }
												min={ 1 }
												max={ 3 }
											/>
											<RangeControl
												label={ __( 'Columns (Mobile)', 'gravisain-blocks' ) }
												value={ columns.mobile }
												onChange={ ( value ) => setAttributes( { columns: { ...columns, mobile: value } } ) }
												min={ 1 }
												max={ 2 }
											/>
											<RangeControl
												label={ __( 'Gap (Desktop)', 'gravisain-blocks' ) }
												value={ gap.desktop }
												onChange={ ( value ) => setAttributes( { gap: { ...gap, desktop: value } } ) }
												min={ 0 }
												max={ 100 }
											/>
										</>
									) }
								</PanelBody>
							) }
						</div>
					) }
				</TabPanel>
			</InspectorControls>

			<div { ...blockProps }>
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					template={ [
						[ 'gravisain/testimonial' ],
						[ 'gravisain/testimonial' ],
						[ 'gravisain/testimonial' ]
					] }
					orientation="horizontal"
				/>
			</div>
		</>
	);
}
