import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl, ToggleControl, TextControl, TextareaControl, TabPanel, DateTimePicker, DatePicker } from '@wordpress/components';
import ColorControl from '../../../controls/ColorControl';
import ResponsiveTabControl from '../../../controls/ResponsiveTabControl';

export default function Inspector( { attributes, setAttributes } ) {
	const {
		targetDate,
		timezoneBasis,
		siteOffset,
		labelDays,
		labelHours,
		labelMinutes,
		labelSeconds,
		showDays,
		showHours,
		showMinutes,
		showSeconds,
		layout,
		boxBackgroundColor,
		numberColor,
		labelColor,
		borderColor,
		borderWidth,
		borderRadius,
		numberFontSize,
		labelFontSize,
		gap,
		expiryAction,
		expiryMessage,
		alignment,
		alignmentTablet,
		alignmentMobile,
		anchor,
		customClassName,
		customCSS,
	} = attributes;

	const dateObj = targetDate ? new Date( targetDate ) : new Date();
	const isValidDate = ! isNaN( dateObj.getTime() );
	const currentDay = isValidDate ? dateObj.getDate() : 31;
	const currentMonth = isValidDate ? dateObj.getMonth().toString() : '11';
	const currentYear = isValidDate ? dateObj.getFullYear() : 2026;
	const currentHours = isValidDate ? dateObj.getHours() : 23;
	const currentMinutes = isValidDate ? dateObj.getMinutes() : 59;

	const updateDatePart = ( part, value ) => {
		const d = isValidDate ? new Date( dateObj.getTime() ) : new Date( 2026, 11, 31, 23, 59, 59 );
		if ( part === 'day' ) {
			const num = parseInt( value, 10 );
			if ( ! isNaN( num ) ) d.setDate( num );
		} else if ( part === 'month' ) {
			const num = parseInt( value, 10 );
			if ( ! isNaN( num ) ) d.setMonth( num );
		} else if ( part === 'year' ) {
			const num = parseInt( value, 10 );
			if ( ! isNaN( num ) ) d.setFullYear( num );
		} else if ( part === 'hours' ) {
			const num = parseInt( value, 10 );
			if ( ! isNaN( num ) ) d.setHours( num );
		} else if ( part === 'minutes' ) {
			const num = parseInt( value, 10 );
			if ( ! isNaN( num ) ) d.setMinutes( num );
		}
		const pad = ( n ) => ( n < 10 ? '0' + n : n );
		const formatted = `${ d.getFullYear() }-${ pad( d.getMonth() + 1 ) }-${ pad( d.getDate() ) }T${ pad( d.getHours() ) }:${ pad( d.getMinutes() ) }:00`;
		setAttributes( { targetDate: formatted } );
	};

	const onCalendarChange = ( newDateStr ) => {
		if ( ! newDateStr ) return;
		const newD = new Date( newDateStr );
		if ( ! isNaN( newD.getTime() ) ) {
			newD.setHours( currentHours );
			newD.setMinutes( currentMinutes );
			const pad = ( n ) => ( n < 10 ? '0' + n : n );
			const formatted = `${ newD.getFullYear() }-${ pad( newD.getMonth() + 1 ) }-${ pad( newD.getDate() ) }T${ pad( newD.getHours() ) }:${ pad( newD.getMinutes() ) }:00`;
			setAttributes( { targetDate: formatted } );
		}
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
								<PanelBody title={ __( 'Target Date & Time', 'gravisain' ) } initialOpen={ true }>
									<div className="gravisain-custom-datetime-picker">
										<div style={ { marginBottom: '16px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' } }>
											<SelectControl
												label={ __( 'Timezone Basis', 'gravisain' ) }
												value={ timezoneBasis || 'site' }
												options={ [
													{ label: __( 'Site Timezone (Global Sync - Recommended)', 'gravisain' ), value: 'site' },
													{ label: __( 'Visitor Local Time (Device Time)', 'gravisain' ), value: 'local' },
												] }
												onChange={ ( val ) => setAttributes( { timezoneBasis: val } ) }
												help={
													timezoneBasis === 'local'
														? __( 'Countdown ends at the exact target time on each visitor\'s local device clock.', 'gravisain' )
														: __( `Countdown ends globally at the exact target time according to your WordPress site timezone (${ siteOffset || '+00:00' }).`, 'gravisain' )
												}
											/>
										</div>

										{ /* 1. Target Date Row */ }
										<div>
											<span className="gravisain-dt-label">{ __( 'Date', 'gravisain' ) }</span>
											<div className="gravisain-dt-row">
												<div className="gravisain-dt-day">
													<input
														type="number"
														min="1"
														max="31"
														value={ currentDay }
														onChange={ ( e ) => updateDatePart( 'day', e.target.value ) }
														title={ __( 'Day', 'gravisain' ) }
													/>
												</div>
												<div className="gravisain-dt-month">
													<select
														value={ currentMonth }
														onChange={ ( e ) => updateDatePart( 'month', e.target.value ) }
														title={ __( 'Month', 'gravisain' ) }
													>
														<option value="0">{ __( 'January', 'gravisain' ) }</option>
														<option value="1">{ __( 'February', 'gravisain' ) }</option>
														<option value="2">{ __( 'March', 'gravisain' ) }</option>
														<option value="3">{ __( 'April', 'gravisain' ) }</option>
														<option value="4">{ __( 'May', 'gravisain' ) }</option>
														<option value="5">{ __( 'June', 'gravisain' ) }</option>
														<option value="6">{ __( 'July', 'gravisain' ) }</option>
														<option value="7">{ __( 'August', 'gravisain' ) }</option>
														<option value="8">{ __( 'September', 'gravisain' ) }</option>
														<option value="9">{ __( 'October', 'gravisain' ) }</option>
														<option value="10">{ __( 'November', 'gravisain' ) }</option>
														<option value="11">{ __( 'December', 'gravisain' ) }</option>
													</select>
												</div>
												<div className="gravisain-dt-year">
													<input
														type="number"
														min="2024"
														max="2099"
														value={ currentYear }
														onChange={ ( e ) => updateDatePart( 'year', e.target.value ) }
														title={ __( 'Year', 'gravisain' ) }
													/>
												</div>
											</div>
										</div>

										{ /* 2. Target Time Row */ }
										<div>
											<span className="gravisain-dt-label">{ __( 'Time', 'gravisain' ) }</span>
											<div className="gravisain-dt-row">
												<div className="gravisain-dt-time">
													<input
														type="number"
														min="0"
														max="23"
														value={ currentHours }
														onChange={ ( e ) => updateDatePart( 'hours', e.target.value ) }
														title={ __( 'Hours (24h)', 'gravisain' ) }
													/>
												</div>
												<span className="gravisain-dt-colon">:</span>
												<div className="gravisain-dt-time">
													<input
														type="number"
														min="0"
														max="59"
														value={ currentMinutes }
														onChange={ ( e ) => updateDatePart( 'minutes', e.target.value ) }
														title={ __( 'Minutes', 'gravisain' ) }
													/>
												</div>
												<div className="gravisain-dt-tz">
													{ timezoneBasis === 'local' ? __( 'Local Time', 'gravisain' ) : `${ __( 'Site', 'gravisain' ) } (${ siteOffset || '+00:00' })` }
												</div>
											</div>
										</div>

										{ /* 3. Native DatePicker Calendar below */ }
										<div className="gravisain-calendar-wrapper">
											<DatePicker
												currentDate={ targetDate }
												onChange={ onCalendarChange }
											/>
										</div>
									</div>
									<SelectControl
										label={ __( 'Display Layout', 'gravisain' ) }
										value={ layout }
										options={ [
											{ label: __( 'Boxes / Cards', 'gravisain' ), value: 'boxes' },
											{ label: __( 'Inline with Colons', 'gravisain' ), value: 'inline' },
											{ label: __( 'Minimal Text', 'gravisain' ), value: 'minimal' },
										] }
										onChange={ ( val ) => setAttributes( { layout: val } ) }
									/>
									<ResponsiveTabControl>
										{ ( device ) => {
											if ( device === 'tablet' ) {
												return (
													<SelectControl
														label={ __( 'Tablet Alignment', 'gravisain' ) }
														value={ alignmentTablet }
														options={ [
															{ label: __( 'Inherit', 'gravisain' ), value: '' },
															{ label: __( 'Left', 'gravisain' ), value: 'left' },
															{ label: __( 'Center', 'gravisain' ), value: 'center' },
															{ label: __( 'Right', 'gravisain' ), value: 'right' },
														] }
														onChange={ ( val ) => setAttributes( { alignmentTablet: val } ) }
													/>
												);
											}
											if ( device === 'mobile' ) {
												return (
													<SelectControl
														label={ __( 'Mobile Alignment', 'gravisain' ) }
														value={ alignmentMobile }
														options={ [
															{ label: __( 'Inherit', 'gravisain' ), value: '' },
															{ label: __( 'Left', 'gravisain' ), value: 'left' },
															{ label: __( 'Center', 'gravisain' ), value: 'center' },
															{ label: __( 'Right', 'gravisain' ), value: 'right' },
														] }
														onChange={ ( val ) => setAttributes( { alignmentMobile: val } ) }
													/>
												);
											}
											return (
												<SelectControl
													label={ __( 'Desktop Alignment', 'gravisain' ) }
													value={ alignment }
													options={ [
														{ label: __( 'Left', 'gravisain' ), value: 'left' },
														{ label: __( 'Center', 'gravisain' ), value: 'center' },
														{ label: __( 'Right', 'gravisain' ), value: 'right' },
													] }
													onChange={ ( val ) => setAttributes( { alignment: val } ) }
												/>
											);
										} }
									</ResponsiveTabControl>
								</PanelBody>

								<PanelBody title={ __( 'Units & Labels', 'gravisain' ) } initialOpen={ false }>
									<ToggleControl label={ __( 'Show Days', 'gravisain' ) } checked={ showDays } onChange={ ( val ) => setAttributes( { showDays: val } ) } />
									{ showDays && <TextControl label={ __( 'Days Label', 'gravisain' ) } value={ labelDays } onChange={ ( val ) => setAttributes( { labelDays: val } ) } /> }

									<ToggleControl label={ __( 'Show Hours', 'gravisain' ) } checked={ showHours } onChange={ ( val ) => setAttributes( { showHours: val } ) } />
									{ showHours && <TextControl label={ __( 'Hours Label', 'gravisain' ) } value={ labelHours } onChange={ ( val ) => setAttributes( { labelHours: val } ) } /> }

									<ToggleControl label={ __( 'Show Minutes', 'gravisain' ) } checked={ showMinutes } onChange={ ( val ) => setAttributes( { showMinutes: val } ) } />
									{ showMinutes && <TextControl label={ __( 'Minutes Label', 'gravisain' ) } value={ labelMinutes } onChange={ ( val ) => setAttributes( { labelMinutes: val } ) } /> }

									<ToggleControl label={ __( 'Show Seconds', 'gravisain' ) } checked={ showSeconds } onChange={ ( val ) => setAttributes( { showSeconds: val } ) } />
									{ showSeconds && <TextControl label={ __( 'Seconds Label', 'gravisain' ) } value={ labelSeconds } onChange={ ( val ) => setAttributes( { labelSeconds: val } ) } /> }
								</PanelBody>

								<PanelBody title={ __( 'After Timer Expires', 'gravisain' ) } initialOpen={ false }>
									<SelectControl
										label={ __( 'Action on Expiration', 'gravisain' ) }
										value={ expiryAction }
										options={ [
											{ label: __( 'Show Expiry Message', 'gravisain' ), value: 'message' },
											{ label: __( 'Hide Countdown Completely', 'gravisain' ), value: 'hide' },
											{ label: __( 'Stay at 00:00:00', 'gravisain' ), value: 'none' },
										] }
										onChange={ ( val ) => setAttributes( { expiryAction: val } ) }
									/>
									{ expiryAction === 'message' && (
										<TextControl
											label={ __( 'Expiry Message Text', 'gravisain' ) }
											value={ expiryMessage }
											onChange={ ( val ) => setAttributes( { expiryMessage: val } ) }
										/>
									) }
								</PanelBody>
							</>
						) }

						{ tab.name === 'style' && (
							<>
								<PanelBody title={ __( 'Colors', 'gravisain' ) } initialOpen={ true }>
									{ layout === 'boxes' && (
										<ColorControl
											label={ __( 'Box Background Color', 'gravisain' ) }
											value={ boxBackgroundColor }
											onChange={ ( val ) => setAttributes( { boxBackgroundColor: val } ) }
										/>
									) }
									<ColorControl
										label={ __( 'Number Color', 'gravisain' ) }
										value={ numberColor }
										onChange={ ( val ) => setAttributes( { numberColor: val } ) }
										disableGradient={ true }
									/>
									<ColorControl
										label={ __( 'Label Text Color', 'gravisain' ) }
										value={ labelColor }
										onChange={ ( val ) => setAttributes( { labelColor: val } ) }
										disableGradient={ true }
									/>
									{ layout === 'boxes' && (
										<ColorControl
											label={ __( 'Box Border Color', 'gravisain' ) }
											value={ borderColor }
											onChange={ ( val ) => setAttributes( { borderColor: val } ) }
											disableGradient={ true }
										/>
									) }
								</PanelBody>

								<PanelBody title={ __( 'Typography & Spacing', 'gravisain' ) } initialOpen={ false }>
									<RangeControl
										label={ __( 'Number Font Size (px)', 'gravisain' ) }
										value={ numberFontSize }
										onChange={ ( val ) => setAttributes( { numberFontSize: val } ) }
										min={ 16 }
										max={ 80 }
									/>
									<RangeControl
										label={ __( 'Label Font Size (px)', 'gravisain' ) }
										value={ labelFontSize }
										onChange={ ( val ) => setAttributes( { labelFontSize: val } ) }
										min={ 10 }
										max={ 28 }
									/>
									<RangeControl
										label={ __( 'Gap Between Units (px)', 'gravisain' ) }
										value={ gap }
										onChange={ ( val ) => setAttributes( { gap: val } ) }
										min={ 4 }
										max={ 60 }
									/>
									{ layout === 'boxes' && (
										<>
											<RangeControl
												label={ __( 'Box Border Radius (px)', 'gravisain' ) }
												value={ borderRadius }
												onChange={ ( val ) => setAttributes( { borderRadius: val } ) }
												min={ 0 }
												max={ 40 }
											/>
											<RangeControl
												label={ __( 'Box Border Width (px)', 'gravisain' ) }
												value={ borderWidth }
												onChange={ ( val ) => setAttributes( { borderWidth: val } ) }
												min={ 0 }
												max={ 10 }
											/>
										</>
									) }
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
