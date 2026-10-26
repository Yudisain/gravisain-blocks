import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl, ToggleControl, TextControl, TextareaControl, TabPanel } from '@wordpress/components';
import ColorControl from '../../../controls/ColorControl';

export default function Inspector( { attributes, setAttributes } ) {
	const {
		allowedHeaders = [ false, true, true, true, false, false ],
		listStyle,
		collapsible,
		startCollapsed,
		smoothScroll,
		containerBackgroundColor,
		titleColor,
		linkColor,
		linkHoverColor,
		borderColor,
		borderRadius,
		contentPadding,
		anchor,
		customClassName,
		customCSS,
	} = attributes;

	const toggleHeader = ( idx ) => {
		const newHeaders = [ ...allowedHeaders ];
		newHeaders[ idx ] = ! newHeaders[ idx ];
		setAttributes( { allowedHeaders: newHeaders } );
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
								<PanelBody title={ __( 'Included Heading Levels', 'gravisain-blocks' ) } initialOpen={ true }>
									{ [ 1, 2, 3, 4, 5, 6 ].map( ( level, index ) => (
										<ToggleControl
											key={ level }
											label={ `Heading ${ level } (H${ level })` }
											checked={ allowedHeaders[ index ] }
											onChange={ () => toggleHeader( index ) }
										/>
									) ) }
								</PanelBody>

								<PanelBody title={ __( 'List & Behavior', 'gravisain-blocks' ) } initialOpen={ false }>
									<SelectControl
										label={ __( 'List Style', 'gravisain-blocks' ) }
										value={ listStyle }
										options={ [
											{ label: __( 'Bulleted List (UL)', 'gravisain-blocks' ), value: 'ul' },
											{ label: __( 'Numbered List (OL)', 'gravisain-blocks' ), value: 'ol' },
											{ label: __( 'No Bullet / Plain', 'gravisain-blocks' ), value: 'none' },
										] }
										onChange={ ( val ) => setAttributes( { listStyle: val } ) }
									/>
									<ToggleControl
										label={ __( 'Collapsible Box', 'gravisain-blocks' ) }
										checked={ collapsible }
										onChange={ ( val ) => setAttributes( { collapsible: val } ) }
									/>
									{ collapsible && (
										<ToggleControl
											label={ __( 'Start Collapsed by Default', 'gravisain-blocks' ) }
											checked={ startCollapsed }
											onChange={ ( val ) => setAttributes( { startCollapsed: val } ) }
										/>
									) }
									<ToggleControl
										label={ __( 'Smooth Scroll on Click', 'gravisain-blocks' ) }
										checked={ smoothScroll }
										onChange={ ( val ) => setAttributes( { smoothScroll: val } ) }
									/>
								</PanelBody>
							</>
						) }

						{ tab.name === 'style' && (
							<>
								<PanelBody title={ __( 'Colors', 'gravisain-blocks' ) } initialOpen={ true }>
									<ColorControl
										label={ __( 'Background Color', 'gravisain-blocks' ) }
										value={ containerBackgroundColor }
										onChange={ ( val ) => setAttributes( { containerBackgroundColor: val } ) }
									/>
									<ColorControl
										label={ __( 'Title Text Color', 'gravisain-blocks' ) }
										value={ titleColor }
										onChange={ ( val ) => setAttributes( { titleColor: val } ) }
										disableGradient={ true }
									/>
									<ColorControl
										label={ __( 'Link Color', 'gravisain-blocks' ) }
										value={ linkColor }
										onChange={ ( val ) => setAttributes( { linkColor: val } ) }
										disableGradient={ true }
									/>
									<ColorControl
										label={ __( 'Link Hover Color', 'gravisain-blocks' ) }
										value={ linkHoverColor }
										onChange={ ( val ) => setAttributes( { linkHoverColor: val } ) }
										disableGradient={ true }
									/>
									<ColorControl
										label={ __( 'Border Color', 'gravisain-blocks' ) }
										value={ borderColor }
										onChange={ ( val ) => setAttributes( { borderColor: val } ) }
										disableGradient={ true }
									/>
								</PanelBody>

								<PanelBody title={ __( 'Padding & Border', 'gravisain-blocks' ) } initialOpen={ false }>
									<RangeControl
										label={ __( 'Content Padding (px)', 'gravisain-blocks' ) }
										value={ contentPadding }
										onChange={ ( val ) => setAttributes( { contentPadding: val } ) }
										min={ 0 }
										max={ 60 }
									/>
									<RangeControl
										label={ __( 'Border Radius (px)', 'gravisain-blocks' ) }
										value={ borderRadius }
										onChange={ ( val ) => setAttributes( { borderRadius: val } ) }
										min={ 0 }
										max={ 50 }
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
