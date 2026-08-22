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
					{ name: 'general', title: __( 'General', 'gravisain' ), className: 'gravisain-tab-general' },
					{ name: 'style', title: __( 'Style', 'gravisain' ), className: 'gravisain-tab-style' },
					{ name: 'advanced', title: __( 'Advanced', 'gravisain' ), className: 'gravisain-tab-advanced' },
				] }
			>
				{ ( tab ) => (
					<div className="gravisain-tab-content">
						{ tab.name === 'general' && (
							<>
								<PanelBody title={ __( 'Included Heading Levels', 'gravisain' ) } initialOpen={ true }>
									{ [ 1, 2, 3, 4, 5, 6 ].map( ( level, index ) => (
										<ToggleControl
											key={ level }
											label={ `Heading ${ level } (H${ level })` }
											checked={ allowedHeaders[ index ] }
											onChange={ () => toggleHeader( index ) }
										/>
									) ) }
								</PanelBody>

								<PanelBody title={ __( 'List & Behavior', 'gravisain' ) } initialOpen={ false }>
									<SelectControl
										label={ __( 'List Style', 'gravisain' ) }
										value={ listStyle }
										options={ [
											{ label: __( 'Bulleted List (UL)', 'gravisain' ), value: 'ul' },
											{ label: __( 'Numbered List (OL)', 'gravisain' ), value: 'ol' },
											{ label: __( 'No Bullet / Plain', 'gravisain' ), value: 'none' },
										] }
										onChange={ ( val ) => setAttributes( { listStyle: val } ) }
									/>
									<ToggleControl
										label={ __( 'Collapsible Box', 'gravisain' ) }
										checked={ collapsible }
										onChange={ ( val ) => setAttributes( { collapsible: val } ) }
									/>
									{ collapsible && (
										<ToggleControl
											label={ __( 'Start Collapsed by Default', 'gravisain' ) }
											checked={ startCollapsed }
											onChange={ ( val ) => setAttributes( { startCollapsed: val } ) }
										/>
									) }
									<ToggleControl
										label={ __( 'Smooth Scroll on Click', 'gravisain' ) }
										checked={ smoothScroll }
										onChange={ ( val ) => setAttributes( { smoothScroll: val } ) }
									/>
								</PanelBody>
							</>
						) }

						{ tab.name === 'style' && (
							<>
								<PanelBody title={ __( 'Colors', 'gravisain' ) } initialOpen={ true }>
									<ColorControl
										label={ __( 'Background Color', 'gravisain' ) }
										value={ containerBackgroundColor }
										onChange={ ( val ) => setAttributes( { containerBackgroundColor: val } ) }
									/>
									<ColorControl
										label={ __( 'Title Text Color', 'gravisain' ) }
										value={ titleColor }
										onChange={ ( val ) => setAttributes( { titleColor: val } ) }
										disableGradient={ true }
									/>
									<ColorControl
										label={ __( 'Link Color', 'gravisain' ) }
										value={ linkColor }
										onChange={ ( val ) => setAttributes( { linkColor: val } ) }
										disableGradient={ true }
									/>
									<ColorControl
										label={ __( 'Link Hover Color', 'gravisain' ) }
										value={ linkHoverColor }
										onChange={ ( val ) => setAttributes( { linkHoverColor: val } ) }
										disableGradient={ true }
									/>
									<ColorControl
										label={ __( 'Border Color', 'gravisain' ) }
										value={ borderColor }
										onChange={ ( val ) => setAttributes( { borderColor: val } ) }
										disableGradient={ true }
									/>
								</PanelBody>

								<PanelBody title={ __( 'Padding & Border', 'gravisain' ) } initialOpen={ false }>
									<RangeControl
										label={ __( 'Content Padding (px)', 'gravisain' ) }
										value={ contentPadding }
										onChange={ ( val ) => setAttributes( { contentPadding: val } ) }
										min={ 0 }
										max={ 60 }
									/>
									<RangeControl
										label={ __( 'Border Radius (px)', 'gravisain' ) }
										value={ borderRadius }
										onChange={ ( val ) => setAttributes( { borderRadius: val } ) }
										min={ 0 }
										max={ 50 }
									/>
								</PanelBody>
							</>
						) }

						{ tab.name === 'advanced' && (
							<PanelBody title={ __( 'Advanced Settings', 'gravisain' ) } initialOpen={ true }>
								<TextControl
									label={ __( 'HTML Anchor', 'gravisain' ) }
									help={ __( 'Enter a word or two — without spaces — to make a unique web address just for this block, called an "anchor". Then, you\'ll be able to link directly to this section of your page.', 'gravisain' ) }
									value={ anchor }
									onChange={ ( val ) => setAttributes( { anchor: val } ) }
								/>
								<TextControl
									label={ __( 'Additional CSS class(es)', 'gravisain' ) }
									help={ __( 'Separate multiple classes with spaces.', 'gravisain' ) }
									value={ customClassName }
									onChange={ ( val ) => setAttributes( { customClassName: val } ) }
								/>
								<TextareaControl
									label={ __( 'Additional CSS', 'gravisain' ) }
									help={ __( 'Add your own CSS to customize the appearance of this block. You do not need to include a CSS selector, just add the property and value, e.g. color: red;.', 'gravisain' ) }
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
