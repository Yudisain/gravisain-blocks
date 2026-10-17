import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TabPanel, RangeControl } from '@wordpress/components';
import ColorControl from '../../../controls/ColorControl';
import TypographyControl from '../../../controls/TypographyControl';

export default function Inspector( { attributes, setAttributes } ) {
	const { 
		layout, alignment, 
		linkColor, linkHoverColor, linkActiveColor,
		linkBackground, linkHoverBackground, linkActiveBackground,
		fontSize, fontWeight, fontFamily, typography = {}, itemSpacing 
	} = attributes;

	const currentTypography = {
		fontSize: typography?.fontSize ?? fontSize ?? 16,
		fontWeight: typography?.fontWeight || fontWeight || '500',
		fontFamily: typography?.fontFamily || fontFamily || '',
		fontStyle: typography?.fontStyle || typography?.style || 'normal',
		lineHeight: typography?.lineHeight,
		letterSpacing: typography?.letterSpacing,
	};

	return (
		<InspectorControls>
			<TabPanel
				className="gravisain-inspector-tabs"
				activeClass="active-tab"
				tabs={ [
					{ name: 'general', title: __( 'General', 'gravisain-blocks' ), className: 'gravisain-tab-general' },
					{ name: 'style', title: __( 'Style', 'gravisain-blocks' ), className: 'gravisain-tab-style' }
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
										{ label: __( 'Horizontal', 'gravisain-blocks' ), value: 'horizontal' },
										{ label: __( 'Vertical', 'gravisain-blocks' ), value: 'vertical' },
									] }
									onChange={ ( value ) => setAttributes( { layout: value } ) }
								/>
								<SelectControl
									label={ __( 'Alignment', 'gravisain-blocks' ) }
									value={ alignment }
									options={ [
										{ label: __( 'Left', 'gravisain-blocks' ), value: 'left' },
										{ label: __( 'Center', 'gravisain-blocks' ), value: 'center' },
										{ label: __( 'Right', 'gravisain-blocks' ), value: 'right' },
										{ label: __( 'Space Between', 'gravisain-blocks' ), value: 'space-between' },
									] }
									onChange={ ( value ) => setAttributes( { alignment: value } ) }
								/>
								<RangeControl
									label={ __( 'Item Spacing', 'gravisain-blocks' ) }
									value={ itemSpacing }
									onChange={ ( value ) => setAttributes( { itemSpacing: value } ) }
									min={ 0 }
									max={ 100 }
								/>
							</PanelBody>
						) }

						{ tab.name === 'style' && (
							<>
								<PanelBody title={ __( 'Navigation Font', 'gravisain-blocks' ) } initialOpen={ true }>
									<TypographyControl
										label={ __( 'Font Settings', 'gravisain-blocks' ) }
										value={ currentTypography }
										onChange={ ( val ) => setAttributes( { 
											typography: val,
											fontFamily: val?.fontFamily || '',
											fontSize: val?.fontSize,
											fontWeight: val?.fontWeight,
										} ) }
									/>
								</PanelBody>

								<PanelBody title={ __( 'Navigation Colors', 'gravisain-blocks' ) } initialOpen={ true }>
									<ColorControl
										label={ __( 'Initial Color', 'gravisain-blocks' ) }
										value={ linkColor }
										onChange={ ( value ) => setAttributes( { linkColor: value || '' } ) }
									/>
									<ColorControl
										label={ __( 'Hover Color', 'gravisain-blocks' ) }
										value={ linkHoverColor }
										onChange={ ( value ) => setAttributes( { linkHoverColor: value || '' } ) }
									/>
									<ColorControl
										label={ __( 'Active Color', 'gravisain-blocks' ) }
										value={ linkActiveColor }
										onChange={ ( value ) => setAttributes( { linkActiveColor: value || '' } ) }
									/>
								</PanelBody>

								<PanelBody title={ __( 'Navigation Background', 'gravisain-blocks' ) } initialOpen={ true }>
									<ColorControl
										label={ __( 'Initial Background', 'gravisain-blocks' ) }
										value={ linkBackground }
										onChange={ ( value ) => setAttributes( { linkBackground: value || '' } ) }
									/>
									<ColorControl
										label={ __( 'Hover Background', 'gravisain-blocks' ) }
										value={ linkHoverBackground }
										onChange={ ( value ) => setAttributes( { linkHoverBackground: value || '' } ) }
									/>
									<ColorControl
										label={ __( 'Active Background', 'gravisain-blocks' ) }
										value={ linkActiveBackground }
										onChange={ ( value ) => setAttributes( { linkActiveBackground: value || '' } ) }
									/>
								</PanelBody>
							</>
						) }
					</div>
				) }
			</TabPanel>
		</InspectorControls>
	);
}
