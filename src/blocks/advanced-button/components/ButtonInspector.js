import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { 
	PanelBody, SelectControl, TabPanel, RangeControl, 
	ToggleControl, TextControl, TextareaControl, 
	ButtonGroup, Button, BaseControl 
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import ColorControl from '../../../controls/ColorControl';
import SpacingControl from '../../../controls/SpacingControl';
import ResponsiveTabControl from '../../../controls/ResponsiveTabControl';
import IconPickerControl from '../../../controls/IconPickerControl';
import TypographyControl from '../../../controls/TypographyControl';

export default function ButtonInspector( { attributes, setAttributes } ) {
	const getResponsiveAttr = ( attrName, currentDevice ) => {
		if ( currentDevice === 'tablet' ) {
			return attributes[ `${ attrName }Tablet` ];
		}
		if ( currentDevice === 'mobile' ) {
			return attributes[ `${ attrName }Mobile` ];
		}
		return attributes[ attrName ];
	};

	const setResponsiveAttr = ( attrName, val, currentDevice ) => {
		if ( currentDevice === 'tablet' ) {
			setAttributes( { [ `${ attrName }Tablet` ]: val } );
		} else if ( currentDevice === 'mobile' ) {
			setAttributes( { [ `${ attrName }Mobile` ]: val } );
		} else {
			setAttributes( { [ attrName ]: val } );
		}
	};
	const { 
		text, url, newTab, noFollow, ariaLabel,
		icon, iconPosition, iconSpacing,
		buttonStyle = 'fill', buttonSize = 'md', buttonWidth = 'auto', customWidth,
		backgroundColor, textColor, hoverBackgroundColor, hoverTextColor,
		borderRadius = 9999, padding, borderWidth = 0, borderStyle = 'none', borderColor, hoverBorderColor,
		typography = {}, textTransform,
		hoverEffect, shadow,
		anchor, customClassName, customCSS
	} = attributes;

	const [ colorTab, setColorTab ] = useState( 'initial' );

	const handleStyleChange = ( style ) => {
		setAttributes( { buttonStyle: style } );
		if ( style === 'fill' ) {
			setAttributes( {
				buttonStyle: 'fill',
				backgroundColor: 'var(--wp--preset--color--primary, #4f46e5)',
				textColor: '#ffffff',
				borderStyle: 'none',
				borderWidth: 0,
				borderColor: 'transparent',
				hoverBackgroundColor: 'var(--wp--preset--color--secondary, #4338ca)',
				hoverTextColor: '#ffffff',
				hoverBorderColor: 'transparent',
			} );
		} else if ( style === 'outline' ) {
			setAttributes( {
				buttonStyle: 'outline',
				backgroundColor: 'transparent',
				textColor: 'var(--wp--preset--color--primary, #4f46e5)',
				borderStyle: 'solid',
				borderWidth: 2,
				borderColor: 'var(--wp--preset--color--primary, #4f46e5)',
				hoverBackgroundColor: 'var(--wp--preset--color--primary, #4f46e5)',
				hoverTextColor: '#ffffff',
				hoverBorderColor: 'var(--wp--preset--color--primary, #4f46e5)',
			} );
		}
	};

	return (
		<InspectorControls>
			<TabPanel
				className="gravisain-inspector-tabs"
				activeClass="active-tab"
				tabs={ [
					{
						name: 'layout',
						title: __( 'Layout', 'gravisain' ),
						className: 'gravisain-tab-layout',
					},
					{
						name: 'style',
						title: __( 'Style', 'gravisain' ),
						className: 'gravisain-tab-style',
					},
					{
						name: 'advanced',
						title: __( 'Advanced', 'gravisain' ),
						className: 'gravisain-tab-advanced',
					}
				] }
			>
				{ ( tab ) => (
					<div className="gravisain-tab-content">
						{ tab.name === 'layout' && (
							<>
								<PanelBody title={ __( 'Action Button', 'gravisain' ) } initialOpen={ true }>
									<TextControl
										label={ __( 'Button Text', 'gravisain' ) }
										value={ text }
										onChange={ ( val ) => setAttributes( { text: val } ) }
									/>
									<TextControl
										label={ __( 'Button URL', 'gravisain' ) }
										value={ url }
										placeholder="https://..."
										onChange={ ( val ) => setAttributes( { url: val } ) }
									/>
									<ToggleControl
										label={ __( 'Open in new tab', 'gravisain' ) }
										checked={ newTab }
										onChange={ ( val ) => setAttributes( { newTab: val } ) }
									/>
									<ToggleControl
										label={ __( 'Add rel="nofollow"', 'gravisain' ) }
										checked={ noFollow }
										onChange={ ( val ) => setAttributes( { noFollow: val } ) }
									/>

									<BaseControl label={ __( 'Button Width', 'gravisain' ) } style={ { marginTop: '16px' } }>
										<ButtonGroup style={ { width: '100%', display: 'flex', marginTop: '6px' } }>
											<Button
												isPrimary={ buttonWidth === 'auto' }
												isSecondary={ buttonWidth !== 'auto' }
												onClick={ () => setAttributes( { buttonWidth: 'auto' } ) }
												style={ { flex: 1, justifyContent: 'center', fontWeight: 600 } }
											>
												{ __( 'AUTO', 'gravisain' ) }
											</Button>
											<Button
												isPrimary={ buttonWidth === 'fixed' }
												isSecondary={ buttonWidth !== 'fixed' }
												onClick={ () => setAttributes( { buttonWidth: 'fixed' } ) }
												style={ { flex: 1, justifyContent: 'center', fontWeight: 600 } }
											>
												{ __( 'FIXED', 'gravisain' ) }
											</Button>
											<Button
												isPrimary={ buttonWidth === 'full' }
												isSecondary={ buttonWidth !== 'full' }
												onClick={ () => setAttributes( { buttonWidth: 'full' } ) }
												style={ { flex: 1, justifyContent: 'center', fontWeight: 600 } }
											>
												{ __( 'FULL', 'gravisain' ) }
											</Button>
										</ButtonGroup>
										{ buttonWidth === 'fixed' && (
											<div style={ { marginTop: '10px' } }>
												<RangeControl
													label={ __( 'Custom Width (px)', 'gravisain' ) }
													value={ customWidth || 200 }
													onChange={ ( val ) => setAttributes( { customWidth: val } ) }
													min={ 50 }
													max={ 800 }
												/>
											</div>
										) }
									</BaseControl>
								</PanelBody>

								<PanelBody title={ __( 'Icon & Accessibility', 'gravisain' ) } initialOpen={ false }>
									<IconPickerControl
										label={ __( 'Select Icon', 'gravisain' ) }
										value={ icon }
										onChange={ ( val ) => setAttributes( { icon: val } ) }
									/>
									{ icon && (
										<>
											<SelectControl
												label={ __( 'Icon Position', 'gravisain' ) }
												value={ iconPosition }
												options={ [
													{ label: __( 'Left', 'gravisain' ), value: 'left' },
													{ label: __( 'Right', 'gravisain' ), value: 'right' },
												] }
												onChange={ ( val ) => setAttributes( { iconPosition: val } ) }
											/>
											<RangeControl
												label={ __( 'Icon Spacing (px)', 'gravisain' ) }
												value={ iconSpacing !== undefined ? iconSpacing : 8 }
												onChange={ ( val ) => setAttributes( { iconSpacing: val } ) }
												min={ 0 }
												max={ 40 }
											/>
										</>
									) }
									<TextControl
										label={ __( 'Title for screen readers (aria-label)', 'gravisain' ) }
										value={ ariaLabel }
										placeholder={ text }
										onChange={ ( val ) => setAttributes( { ariaLabel: val } ) }
										help={ __( 'If no title added, screen readers will read the button text.', 'gravisain' ) }
									/>
								</PanelBody>
							</>
						) }

						{ tab.name === 'style' && (
							<>
								<PanelBody title={ __( 'Button Style & Size', 'gravisain' ) } initialOpen={ true }>
									<SelectControl
										label={ __( 'Button Style', 'gravisain' ) }
										value={ buttonStyle }
										options={ [
											{ label: __( 'Filled', 'gravisain' ), value: 'fill' },
											{ label: __( 'Outline', 'gravisain' ), value: 'outline' },
										] }
										onChange={ handleStyleChange }
									/>

									<BaseControl label={ __( 'Button Size', 'gravisain' ) } style={ { marginTop: '16px' } }>
										<ButtonGroup style={ { width: '100%', display: 'flex', marginTop: '6px' } }>
											{ [
												{ label: 'SM', value: 'sm' },
												{ label: 'MD', value: 'md' },
												{ label: 'LG', value: 'lg' },
												{ label: __( 'Custom', 'gravisain' ), value: 'custom' },
											].map( ( sz ) => (
												<Button
													key={ sz.value }
													isPrimary={ buttonSize === sz.value }
													isSecondary={ buttonSize !== sz.value }
													onClick={ () => {
														const sizePaddings = {
															sm: { top: '6px', right: '12px', bottom: '6px', left: '12px' },
															md: { top: '10px', right: '20px', bottom: '10px', left: '20px' },
															lg: { top: '14px', right: '28px', bottom: '14px', left: '28px' },
														};
														if ( sizePaddings[ sz.value ] ) {
															setAttributes( { buttonSize: sz.value, padding: sizePaddings[ sz.value ] } );
														} else {
															setAttributes( { buttonSize: sz.value } );
														}
													} }
													style={ { flex: 1, justifyContent: 'center', fontWeight: 600 } }
												>
													{ sz.label }
												</Button>
											) ) }
										</ButtonGroup>
									</BaseControl>

									{ buttonSize === 'custom' && (
										<div style={ { marginTop: '16px' } }>
											<SpacingControl
												label={ __( 'Custom Padding', 'gravisain' ) }
												value={ padding }
												onChange={ ( val ) => setAttributes( { padding: val } ) }
											/>
										</div>
									) }
								</PanelBody>

								<PanelBody title={ __( 'Button Colors', 'gravisain' ) } initialOpen={ true }>
									<div style={ { display: 'flex', borderBottom: '1px solid #e2e8f0', marginBottom: '16px' } }>
										<Button
											variant={ colorTab === 'initial' ? 'primary' : 'tertiary' }
											onClick={ () => setColorTab( 'initial' ) }
											style={ { flex: 1, justifyContent: 'center', borderRadius: 0 } }
										>
											{ __( 'Initial', 'gravisain' ) }
										</Button>
										<Button
											variant={ colorTab === 'hover' ? 'primary' : 'tertiary' }
											onClick={ () => setColorTab( 'hover' ) }
											style={ { flex: 1, justifyContent: 'center', borderRadius: 0 } }
										>
											{ __( 'Hover', 'gravisain' ) }
										</Button>
									</div>

									{ colorTab === 'initial' ? (
										<>
											<ColorControl
												label={ __( 'Font Color', 'gravisain' ) }
												value={ textColor }
												onChange={ ( val ) => setAttributes( { textColor: val } ) }
												disableGradient={ true }
											/>
											<ColorControl
												label={ __( 'Background Color', 'gravisain' ) }
												value={ backgroundColor }
												onChange={ ( val ) => setAttributes( { backgroundColor: val } ) }
											/>
											<ColorControl
												label={ __( 'Border Color', 'gravisain' ) }
												value={ borderColor }
												onChange={ ( val ) => setAttributes( { borderColor: val } ) }
												disableGradient={ true }
											/>
										</>
									) : (
										<>
											<ColorControl
												label={ __( 'Font Color (Hover)', 'gravisain' ) }
												value={ hoverTextColor }
												onChange={ ( val ) => setAttributes( { hoverTextColor: val } ) }
												disableGradient={ true }
											/>
											<ColorControl
												label={ __( 'Background Color (Hover)', 'gravisain' ) }
												value={ hoverBackgroundColor }
												onChange={ ( val ) => setAttributes( { hoverBackgroundColor: val } ) }
											/>
											<ColorControl
												label={ __( 'Border Color (Hover)', 'gravisain' ) }
												value={ hoverBorderColor }
												onChange={ ( val ) => setAttributes( { hoverBorderColor: val } ) }
												disableGradient={ true }
											/>
										</>
									) }
								</PanelBody>

								<PanelBody title={ __( 'Border & Shape', 'gravisain' ) } initialOpen={ false }>
									<BaseControl label={ __( 'Border Style', 'gravisain' ) }>
										<ButtonGroup style={ { width: '100%', display: 'flex', marginTop: '6px' } }>
											{ [
												{ label: 'None', value: 'none' },
												{ label: 'Solid', value: 'solid' },
												{ label: 'Dashed', value: 'dashed' },
												{ label: 'Dotted', value: 'dotted' },
											].map( ( bs ) => (
												<Button
													key={ bs.value }
													isPrimary={ borderStyle === bs.value }
													isSecondary={ borderStyle !== bs.value }
													onClick={ () => setAttributes( { borderStyle: bs.value } ) }
													style={ { flex: 1, justifyContent: 'center', fontSize: '12px' } }
												>
													{ bs.label }
												</Button>
											) ) }
										</ButtonGroup>
									</BaseControl>

									{ borderStyle !== 'none' && (
										<RangeControl
											label={ __( 'Border Width (px)', 'gravisain' ) }
											value={ borderWidth || 0 }
											onChange={ ( val ) => setAttributes( { borderWidth: val } ) }
											min={ 0 }
											max={ 20 }
										/>
									) }

									<RangeControl
										label={ __( 'Border Radius (px)', 'gravisain' ) }
										value={ borderRadius ?? 9999 }
										onChange={ ( val ) => setAttributes( { borderRadius: val } ) }
										min={ 0 }
										max={ 100 }
										help={ __( '9999px = Pill / Oval bawaan Gravisain.', 'gravisain' ) }
									/>
								</PanelBody>

								<PanelBody title={ __( 'Button Typography', 'gravisain' ) } initialOpen={ false }>
									<BaseControl label={ __( 'Letter Case', 'gravisain' ) }>
										<ButtonGroup style={ { display: 'flex', gap: '4px', marginTop: '6px', marginBottom: '14px' } }>
											<Button
												isPrimary={ ! textTransform || textTransform === 'none' }
												isSecondary={ textTransform && textTransform !== 'none' }
												onClick={ () => setAttributes( { textTransform: 'none' } ) }
												style={ { flex: 1, justifyContent: 'center' } }
												title={ __( 'None', 'gravisain' ) }
											>
												—
											</Button>
											<Button
												isPrimary={ textTransform === 'uppercase' }
												isSecondary={ textTransform !== 'uppercase' }
												onClick={ () => setAttributes( { textTransform: 'uppercase' } ) }
												style={ { flex: 1, justifyContent: 'center', fontWeight: 700 } }
												title={ __( 'Uppercase', 'gravisain' ) }
											>
												AB
											</Button>
											<Button
												isPrimary={ textTransform === 'lowercase' }
												isSecondary={ textTransform !== 'lowercase' }
												onClick={ () => setAttributes( { textTransform: 'lowercase' } ) }
												style={ { flex: 1, justifyContent: 'center', fontStyle: 'italic' } }
												title={ __( 'Lowercase', 'gravisain' ) }
											>
												ab
											</Button>
											<Button
												isPrimary={ textTransform === 'capitalize' }
												isSecondary={ textTransform !== 'capitalize' }
												onClick={ () => setAttributes( { textTransform: 'capitalize' } ) }
												style={ { flex: 1, justifyContent: 'center' } }
												title={ __( 'Capitalize', 'gravisain' ) }
											>
												Ab
											</Button>
										</ButtonGroup>
									</BaseControl>

									<TypographyControl
										label={ __( 'Typography', 'gravisain' ) }
										value={ typography }
										onChange={ ( val ) => setAttributes( { typography: val } ) }
									/>
								</PanelBody>
							</>
						) }

						{ tab.name === 'advanced' && (
							<>
								<PanelBody title={ __( 'Spacing & Margin Controls', 'gravisain' ) } initialOpen={ true }>
									<ResponsiveTabControl>
										{ ( currentDevice ) => (
											<>
												<SpacingControl
													label={ __( 'Button Padding', 'gravisain' ) }
													value={ getResponsiveAttr( 'padding', currentDevice ) }
													onChange={ ( val ) => setResponsiveAttr( 'padding', val, currentDevice ) }
												/>
												<SpacingControl
													label={ __( 'Button Margin', 'gravisain' ) }
													value={ getResponsiveAttr( 'margin', currentDevice ) }
													onChange={ ( val ) => setResponsiveAttr( 'margin', val, currentDevice ) }
												/>
											</>
										) }
									</ResponsiveTabControl>
								</PanelBody>

								<PanelBody title={ __( 'Effects', 'gravisain' ) } initialOpen={ true }>
									<SelectControl
										label={ __( 'Hover Effect', 'gravisain' ) }
										value={ hoverEffect }
										options={ [
											{ label: __( 'None', 'gravisain' ), value: 'none' },
											{ label: __( 'Scale Up', 'gravisain' ), value: 'scale' },
											{ label: __( 'Lift Up', 'gravisain' ), value: 'lift' },
										] }
										onChange={ ( val ) => setAttributes( { hoverEffect: val } ) }
									/>
									<ToggleControl
										label={ __( 'Add Shadow', 'gravisain' ) }
										checked={ shadow }
										onChange={ ( val ) => setAttributes( { shadow: val } ) }
									/>
								</PanelBody>
								<PanelBody title={ __( 'Advanced Settings', 'gravisain' ) } initialOpen={ false }>
									<TextControl
										label={ __( 'HTML Anchor', 'gravisain' ) }
										help={ __( 'Enter a unique anchor identifier.', 'gravisain' ) }
										value={ anchor }
										onChange={ ( val ) => setAttributes( { anchor: val } ) }
									/>
									<TextControl
										label={ __( 'Additional CSS class(es)', 'gravisain' ) }
										value={ customClassName }
										onChange={ ( val ) => setAttributes( { customClassName: val } ) }
									/>
									<TextareaControl
										label={ __( 'Additional CSS', 'gravisain' ) }
										value={ customCSS }
										onChange={ ( val ) => setAttributes( { customCSS: val } ) }
										rows={ 4 }
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
