import { __ } from '@wordpress/i18n';
import { useState, useRef, useEffect } from '@wordpress/element';

// Chain / Link icon
const LinkIcon = () => (
	<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
		<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
	</svg>
);

// Unlink / Broken Chain icon
const UnlinkIcon = () => (
	<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<line x1="1" y1="1" x2="23" y2="23" />
		<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
		<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
	</svg>
);

// Reset / Undo icon
const ResetIcon = () => (
	<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
		<path d="M3 3v5h5" />
	</svg>
);

const STEP_PRESETS = {
	px: [ 0, 2, 4, 6, 8, 10, 12, 16, 20, 24, 28, 32, 40, 48, 64, 80, 100 ],
	em: [ 0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3, 4, 5 ],
	rem: [ 0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3, 4, 5 ],
	'%': [ 0, 2, 5, 8, 10, 15, 20, 25, 30, 40, 50, 60, 80, 100 ],
};

const inlineStyles = `
	.gravisain-spacing-control {
		box-sizing: border-box;
		margin-bottom: 16px;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
	}
	.gravisain-spacing-control * {
		box-sizing: border-box;
	}
	.gravisain-spacing-control .gravisain-spacing-header {
		display: flex !important;
		align-items: center !important;
		justify-content: space-between !important;
		margin-bottom: 8px !important;
	}
	.gravisain-spacing-control .gravisain-spacing-title {
		font-size: 12px !important;
		font-weight: 500 !important;
		color: #1e293b !important;
		margin: 0 !important;
	}
	.gravisain-spacing-control .gravisain-spacing-actions {
		display: flex !important;
		align-items: center !important;
		gap: 5px !important;
	}
	.gravisain-spacing-control .gravisain-action-btn {
		background: #ffffff !important;
		border: 1px solid #cbd5e1 !important;
		width: 26px !important;
		height: 26px !important;
		border-radius: 4px !important;
		display: inline-flex !important;
		align-items: center !important;
		justify-content: center !important;
		color: #64748b !important;
		cursor: pointer !important;
		padding: 0 !important;
		margin: 0 !important;
		outline: none !important;
		box-shadow: none !important;
		transition: all 0.15s ease !important;
	}
	.gravisain-spacing-control .gravisain-action-btn:hover {
		border-color: #94a3b8 !important;
		color: #1e293b !important;
		background: #f8fafc !important;
	}
	.gravisain-spacing-control .gravisain-action-btn.is-active {
		background: #2563eb !important;
		border-color: #2563eb !important;
		color: #ffffff !important;
	}
	.gravisain-spacing-control .gravisain-spacing-box-group {
		display: flex !important;
		flex-direction: row !important;
		align-items: stretch !important;
		width: 100% !important;
		gap: 0 !important;
		position: relative !important;
	}
	.gravisain-spacing-control .gravisain-spacing-box {
		flex: 1 1 0% !important;
		min-width: 0 !important;
		display: flex !important;
		flex-direction: column !important;
		border: 1px solid #cbd5e1 !important;
		border-right: none !important;
		background: #ffffff !important;
		box-sizing: border-box !important;
		position: relative !important;
		cursor: pointer !important;
		transition: border-color 0.15s ease, box-shadow 0.15s ease !important;
	}
	.gravisain-spacing-control .gravisain-spacing-box:first-child {
		border-top-left-radius: 4px !important;
		border-bottom-left-radius: 4px !important;
	}
	.gravisain-spacing-control .gravisain-spacing-box .gravisain-box-label {
		font-size: 9px !important;
		font-weight: 600 !important;
		text-align: center !important;
		padding: 4px 2px 2px !important;
		color: #64748b !important;
		text-transform: uppercase !important;
		letter-spacing: 0.3px !important;
		border-bottom: 2px solid transparent !important;
		user-select: none !important;
		line-height: 1 !important;
	}
	.gravisain-spacing-control .gravisain-spacing-box input {
		border: none !important;
		outline: none !important;
		box-shadow: none !important;
		background: transparent !important;
		width: 100% !important;
		text-align: center !important;
		font-size: 12px !important;
		font-weight: 500 !important;
		color: #1e293b !important;
		padding: 3px 2px !important;
		height: 28px !important;
		min-height: 28px !important;
		max-height: 28px !important;
		margin: 0 !important;
		box-sizing: border-box !important;
		-moz-appearance: textfield !important;
	}
	.gravisain-spacing-control input::-webkit-outer-spin-button,
	.gravisain-spacing-control input::-webkit-inner-spin-button {
		-webkit-appearance: none !important;
		margin: 0 !important;
	}
	.gravisain-spacing-control .gravisain-spacing-box.is-focused,
	.gravisain-spacing-control .gravisain-spacing-box:focus-within {
		z-index: 2 !important;
		border-color: #2563eb !important;
		box-shadow: 0 0 0 1px #2563eb !important;
	}
	.gravisain-spacing-control .gravisain-spacing-box.is-focused .gravisain-box-label,
	.gravisain-spacing-control .gravisain-spacing-box:focus-within .gravisain-box-label {
		border-bottom-color: #2563eb !important;
		color: #2563eb !important;
	}
	.gravisain-spacing-control .gravisain-unit-wrapper {
		position: relative !important;
		display: flex !important;
	}
	.gravisain-spacing-control .gravisain-unit-btn {
		background: #ffffff !important;
		border: 1px solid #cbd5e1 !important;
		border-top-right-radius: 4px !important;
		border-bottom-right-radius: 4px !important;
		font-size: 11px !important;
		font-weight: 600 !important;
		color: #334155 !important;
		padding: 0 10px !important;
		cursor: pointer !important;
		min-width: 40px !important;
		display: flex !important;
		align-items: center !important;
		justify-content: center !important;
		box-sizing: border-box !important;
		transition: all 0.15s ease !important;
		height: auto !important;
		margin: 0 !important;
	}
	.gravisain-spacing-control .gravisain-unit-btn:hover {
		background: #f8fafc !important;
		border-color: #94a3b8 !important;
	}
	.gravisain-spacing-control .gravisain-unit-btn.is-open {
		border-color: #2563eb !important;
		color: #2563eb !important;
	}
	.gravisain-spacing-control .gravisain-unit-dropdown {
		position: absolute !important;
		top: 100% !important;
		right: 0 !important;
		margin-top: 4px !important;
		background: #ffffff !important;
		border: 1px solid #cbd5e1 !important;
		border-radius: 4px !important;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
		z-index: 1000 !important;
		display: flex !important;
		flex-direction: column !important;
		min-width: 60px !important;
		overflow: hidden !important;
	}
	.gravisain-spacing-control .gravisain-unit-option {
		background: transparent !important;
		border: none !important;
		padding: 6px 12px !important;
		font-size: 11px !important;
		font-weight: 600 !important;
		color: #334155 !important;
		text-align: left !important;
		cursor: pointer !important;
		transition: background 0.1s ease !important;
		display: block !important;
		width: 100% !important;
	}
	.gravisain-spacing-control .gravisain-unit-option:hover {
		background: #f1f5f9 !important;
		color: #2563eb !important;
	}
	.gravisain-spacing-control .gravisain-unit-option.is-selected {
		background: #eff6ff !important;
		color: #2563eb !important;
	}
	.gravisain-spacing-control .gravisain-spacing-slider-section {
		margin-top: 8px !important;
		background: #ffffff !important;
		border: 1px solid #e2e8f0 !important;
		border-radius: 6px !important;
		padding: 10px 12px !important;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04) !important;
	}
	.gravisain-spacing-control .gravisain-slider-header {
		font-size: 11px !important;
		font-weight: 600 !important;
		color: #475569 !important;
		text-transform: uppercase !important;
		letter-spacing: 0.4px !important;
		margin-bottom: 8px !important;
	}
	.gravisain-spacing-control .gravisain-slider-row {
		display: flex !important;
		align-items: center !important;
		gap: 10px !important;
	}
	.gravisain-spacing-control .gravisain-slider-track-wrap {
		flex: 1 !important;
		position: relative !important;
		display: flex !important;
		align-items: center !important;
	}
	.gravisain-spacing-control .gravisain-slider-track-wrap input[type="range"] {
		-webkit-appearance: none !important;
		width: 100% !important;
		height: 6px !important;
		background: transparent !important;
		cursor: pointer !important;
		position: relative !important;
		z-index: 2 !important;
		margin: 0 !important;
		padding: 0 !important;
		border: none !important;
	}
	.gravisain-spacing-control .gravisain-slider-track-wrap input[type="range"]::-webkit-slider-thumb {
		-webkit-appearance: none !important;
		width: 16px !important;
		height: 16px !important;
		border-radius: 50% !important;
		background: #2563eb !important;
		border: 2px solid #ffffff !important;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25) !important;
		cursor: pointer !important;
		margin-top: -5px !important;
	}
	.gravisain-spacing-control .gravisain-slider-track-wrap input[type="range"]::-moz-range-thumb {
		width: 16px !important;
		height: 16px !important;
		border-radius: 50% !important;
		background: #2563eb !important;
		border: 2px solid #ffffff !important;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25) !important;
		cursor: pointer !important;
	}
	.gravisain-spacing-control .gravisain-slider-stepped-track {
		position: absolute !important;
		left: 0 !important;
		right: 0 !important;
		height: 6px !important;
		background: #e2e8f0 !important;
		border-radius: 3px !important;
		pointer-events: none !important;
		display: flex !important;
		align-items: center !important;
		justify-content: space-between !important;
		padding: 0 4px !important;
		box-sizing: border-box !important;
	}
	.gravisain-spacing-control .gravisain-step-tick {
		width: 2px !important;
		height: 2px !important;
		background: #94a3b8 !important;
		border-radius: 50% !important;
	}
	.gravisain-spacing-control .gravisain-slider-tooltip {
		position: absolute !important;
		top: 20px !important;
		background: #1e293b !important;
		color: #ffffff !important;
		font-size: 10px !important;
		font-weight: 600 !important;
		padding: 2px 6px !important;
		border-radius: 3px !important;
		pointer-events: none !important;
		white-space: nowrap !important;
		transform: translateX(-50%) !important;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2) !important;
		z-index: 10 !important;
	}
	.gravisain-spacing-control .gravisain-reset-btn {
		background: #ffffff !important;
		border: 1px solid #2563eb !important;
		color: #2563eb !important;
		font-size: 11px !important;
		font-weight: 600 !important;
		padding: 4px 10px !important;
		border-radius: 4px !important;
		cursor: pointer !important;
		transition: all 0.15s ease !important;
		flex-shrink: 0 !important;
	}
	.gravisain-spacing-control .gravisain-reset-btn:hover {
		background: #2563eb !important;
		color: #ffffff !important;
	}
`;

/**
 * Standard Kadence-style Box Model Spacing Control for Margin & Padding
 */
export default function SpacingControl( {
	label = __( 'Padding', 'gravisain' ),
	value,
	onChange,
	allowNegative = false,
} ) {
	// Parse current unit and values
	const parseValue = ( val ) => {
		const res = { top: '', right: '', bottom: '', left: '', unit: 'px' };
		if ( ! val ) return res;

		if ( typeof val === 'string' || typeof val === 'number' ) {
			const str = String( val ).trim();
			const match = str.match( /^([-\d.]+)\s*([a-z%]*)$/i );
			if ( match ) {
				const num = match[ 1 ];
				const u = match[ 2 ] || 'px';
				res.unit = u;
				res.top = num;
				res.right = num;
				res.bottom = num;
				res.left = num;
			}
			return res;
		}

		if ( typeof val === 'object' ) {
			let detectedUnit = val.unit || 'px';
			[ 'top', 'right', 'bottom', 'left' ].forEach( ( side ) => {
				const v = val[ side ];
				if ( v !== undefined && v !== null && v !== '' ) {
					const match = String( v ).trim().match( /^([-\d.]+)\s*([a-z%]*)$/i );
					if ( match ) {
						res[ side ] = match[ 1 ];
						if ( match[ 2 ] ) detectedUnit = match[ 2 ];
					} else {
						res[ side ] = String( v );
					}
				}
			} );
			res.unit = detectedUnit;
		}
		return res;
	};

	const parsed = parseValue( value );
	const [ isLinked, setIsLinked ] = useState( () => {
		const { top, right, bottom, left } = parsed;
		return top === right && right === bottom && bottom === left && top !== '';
	} );

	const [ showSlider, setShowSlider ] = useState( false );
	const [ isUnitOpen, setIsUnitOpen ] = useState( false );
	const [ activeSide, setActiveSide ] = useState( 'top' );
	const containerRef = useRef( null );
	const dropdownRef = useRef( null );

	// Close slider & unit dropdown on click outside
	useEffect( () => {
		const handleClickOutside = ( e ) => {
			if ( dropdownRef.current && ! dropdownRef.current.contains( e.target ) ) {
				setIsUnitOpen( false );
			}
			if ( containerRef.current && ! containerRef.current.contains( e.target ) ) {
				setShowSlider( false );
			}
		};
		document.addEventListener( 'mousedown', handleClickOutside );
		return () => document.removeEventListener( 'mousedown', handleClickOutside );
	}, [] );

	// Emit formatted change
	const updateValues = ( newVals ) => {
		if ( ! onChange ) return;
		const u = newVals.unit || parsed.unit || 'px';
		const out = {
			top: newVals.top !== '' && newVals.top !== undefined ? `${newVals.top}${u}` : '',
			right: newVals.right !== '' && newVals.right !== undefined ? `${newVals.right}${u}` : '',
			bottom: newVals.bottom !== '' && newVals.bottom !== undefined ? `${newVals.bottom}${u}` : '',
			left: newVals.left !== '' && newVals.left !== undefined ? `${newVals.left}${u}` : '',
			unit: u,
		};
		onChange( out );
	};

	const handleSideChange = ( side, val ) => {
		if ( isLinked ) {
			updateValues( {
				...parsed,
				top: val,
				right: val,
				bottom: val,
				left: val,
			} );
		} else {
			updateValues( {
				...parsed,
				[ side ]: val,
			} );
		}
	};

	const handleUnitChange = ( newUnit ) => {
		setIsUnitOpen( false );
		updateValues( {
			...parsed,
			unit: newUnit,
		} );
	};

	const toggleLink = () => {
		const nextLinked = ! isLinked;
		setIsLinked( nextLinked );
		if ( nextLinked ) {
			const baseVal = parsed.top || parsed.right || parsed.bottom || parsed.left || '';
			updateValues( {
				...parsed,
				top: baseVal,
				right: baseVal,
				bottom: baseVal,
				left: baseVal,
			} );
		}
	};

	const handleReset = () => {
		updateValues( {
			top: '',
			right: '',
			bottom: '',
			left: '',
			unit: parsed.unit || 'px',
		} );
	};

	const handleBoxClick = ( side, e ) => {
		setActiveSide( side );
		setShowSlider( true );
	};

	// Slider logic
	const currentSideVal = isLinked ? ( parsed.top || '' ) : ( parsed[ activeSide ] || '' );
	const presets = STEP_PRESETS[ parsed.unit ] || STEP_PRESETS.px;
	const numVal = currentSideVal !== '' ? parseFloat( currentSideVal ) : 0;
	const minVal = allowNegative ? -100 : 0;
	const maxVal = parsed.unit === 'px' ? 120 : ( parsed.unit === '%' ? 100 : 6 );
	const sliderStep = parsed.unit === 'px' ? 1 : 0.1;

	const statusLabel = () => {
		const prefix = label ? label.toUpperCase() : 'SPACING';
		if ( isLinked ) {
			return currentSideVal !== '' ? `${prefix}: ${currentSideVal}${parsed.unit}` : `${prefix} UNSET`;
		}
		const sideName = activeSide.toUpperCase();
		return currentSideVal !== '' ? `${prefix} ${sideName}: ${currentSideVal}${parsed.unit}` : `${prefix} ${sideName} UNSET`;
	};

	return (
		<div className="gravisain-spacing-control" ref={ containerRef }>
			<style>{ inlineStyles }</style>

			{ /* Header with Title & Action Icons (Toggle Slider removed) */ }
			<div className="gravisain-spacing-header">
				<div className="gravisain-spacing-title">{ label }</div>
				<div className="gravisain-spacing-actions">
					<button
						type="button"
						className={ `gravisain-action-btn ${ isLinked ? 'is-active' : '' }` }
						onClick={ toggleLink }
						title={ isLinked ? __( 'Unlink Values', 'gravisain' ) : __( 'Link Values', 'gravisain' ) }
					>
						{ isLinked ? <LinkIcon /> : <UnlinkIcon /> }
					</button>

					<button
						type="button"
						className="gravisain-action-btn"
						onClick={ handleReset }
						title={ __( 'Reset Values', 'gravisain' ) }
					>
						<ResetIcon />
					</button>
				</div>
			</div>

			{ /* 4-Box Inputs (Always shows Top, Right, Bottom, Left cleanly) */ }
			<div className="gravisain-spacing-box-group">
				{ [ 'top', 'right', 'bottom', 'left' ].map( ( side ) => (
					<div
						key={ side }
						className={ `gravisain-spacing-box ${ activeSide === side && showSlider ? 'is-focused' : '' }` }
						onClick={ ( e ) => handleBoxClick( side, e ) }
					>
						<span className="gravisain-box-label">{ side }</span>
						<input
							type="number"
							value={ parsed[ side ] !== undefined ? parsed[ side ] : '' }
							onChange={ ( e ) => handleSideChange( side, e.target.value ) }
							onFocus={ ( e ) => handleBoxClick( side, e ) }
							placeholder="-"
							step={ sliderStep }
						/>
					</div>
				) ) }

				{ /* Unit Button & Dropdown */ }
				<div className="gravisain-unit-wrapper" ref={ dropdownRef }>
					<button
						type="button"
						className={ `gravisain-unit-btn ${ isUnitOpen ? 'is-open' : '' }` }
						onClick={ () => setIsUnitOpen( ! isUnitOpen ) }
						title={ __( 'Change Unit', 'gravisain' ) }
					>
						{ ( parsed.unit || 'px' ).toUpperCase() }
					</button>

					{ isUnitOpen && (
						<div className="gravisain-unit-dropdown">
							{ [ 'px', 'em', 'rem', '%' ].map( ( u ) => (
								<button
									key={ u }
									type="button"
									className={ `gravisain-unit-option ${ parsed.unit === u ? 'is-selected' : '' }` }
									onClick={ () => handleUnitChange( u ) }
								>
									{ u.toUpperCase() }
								</button>
							) ) }
						</div>
					) }
				</div>
			</div>

			{ /* Stepped Slider Section: appears when TOP/RIGHT/BOTTOM/LEFT box is clicked */ }
			{ showSlider && (
				<div className="gravisain-spacing-slider-section">
					<div className="gravisain-slider-header">{ statusLabel() }</div>
					<div className="gravisain-slider-row">
						<div className="gravisain-slider-track-wrap">
							<div className="gravisain-slider-stepped-track">
								{ presets.map( ( p, idx ) => (
									<span key={ idx } className="gravisain-step-tick" />
								) ) }
							</div>
							<input
								type="range"
								min={ minVal }
								max={ maxVal }
								step={ sliderStep }
								value={ currentSideVal !== '' ? numVal : minVal }
								onChange={ ( e ) => handleSideChange( activeSide, e.target.value ) }
							/>
							{ currentSideVal !== '' && (
								<div
									className="gravisain-slider-tooltip"
									style={ {
										left: `${ Math.max( 0, Math.min( 100, ( ( numVal - minVal ) / ( maxVal - minVal ) ) * 100 ) ) }%`,
									} }
								>
									{ currentSideVal }
									{ parsed.unit }
								</div>
							) }
						</div>

						<button
							type="button"
							className="gravisain-reset-btn"
							onClick={ () => handleSideChange( activeSide, '' ) }
						>
							{ __( 'Reset', 'gravisain' ) }
						</button>
					</div>
				</div>
			) }
		</div>
	);
}
