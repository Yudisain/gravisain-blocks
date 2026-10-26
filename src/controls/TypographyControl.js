import { __ } from '@wordpress/i18n';
import { useState, useMemo } from '@wordpress/element';
import { BaseControl, ComboboxControl, SelectControl, RangeControl } from '@wordpress/components';
import googleFonts from './google-fonts.json';

const systemFonts = [
	{ label: __('Default / Inherit', 'gravisain-blocks'), value: '' },
	{ label: 'System Stack (-apple-system, Segoe UI)', value: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
	{ label: 'Arial, sans-serif', value: 'Arial, sans-serif' },
	{ label: 'Helvetica, sans-serif', value: 'Helvetica, sans-serif' },
	{ label: 'Verdana, sans-serif', value: 'Verdana, sans-serif' },
	{ label: 'Tahoma, sans-serif', value: 'Tahoma, sans-serif' },
	{ label: 'Trebuchet MS, sans-serif', value: 'Trebuchet MS, sans-serif' },
	{ label: 'Georgia, serif', value: 'Georgia, serif' },
	{ label: 'Times New Roman, serif', value: 'Times New Roman, serif' },
	{ label: 'Palatino, serif', value: 'Palatino, serif' },
	{ label: 'Garamond, serif', value: 'Garamond, serif' },
	{ label: 'Courier New, monospace', value: 'Courier New, monospace' },
	{ label: 'Impact, sans-serif', value: 'Impact, sans-serif' },
];

const popularGoogleFontNames = [
	'Inter',
	'Roboto',
	'Poppins',
	'Open Sans',
	'Montserrat',
	'Lato',
	'Plus Jakarta Sans',
	'Oswald',
	'Raleway',
	'Playfair Display',
	'Nunito',
	'Rubik',
	'Ubuntu',
	'Merriweather',
	'Work Sans',
	'DM Sans',
	'Outfit',
	'Barlow',
	'Manrope',
	'Lora',
	'Space Grotesk',
	'Syne',
	'Sora',
	'Cabin',
	'Kanit',
	'Quicksand',
	'Fira Sans',
	'Cinzel',
	'Bebas Neue',
	'Archivo',
];

const popularFontSet = new Set(popularGoogleFontNames);

const popularGoogleFontOptions = popularGoogleFontNames
	.filter(fontName => Boolean(googleFonts[fontName]))
	.map(fontName => ({
		label: fontName,
		value: fontName
	}));

const otherGoogleFontOptions = Object.keys(googleFonts)
	.filter(fontName => !['inherit', 'system-stack'].includes(fontName.toLowerCase()) && !fontName.includes(',') && !popularFontSet.has(fontName))
	.map(fontName => ({
		label: fontName,
		value: fontName
	}));

const allFontOptions = [...systemFonts, ...popularGoogleFontOptions, ...otherGoogleFontOptions];

const ResetIcon = () => (
	<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
		<path d="M3 3v5h5" />
	</svg>
);

export default function TypographyControl({ label, value = {}, onChange }) {
	const { fontFamily, fontSize, fontStyle, fontWeight, lineHeight, letterSpacing } = value;
	const currentFontStyle = fontStyle || value?.style || 'normal';
	const [ filterValue, setFilterValue ] = useState( '' );

	const hasActiveValues = Boolean(
		fontFamily ||
		( fontSize !== undefined && fontSize !== null && fontSize !== '' ) ||
		( fontWeight && fontWeight !== 'inherit' && fontWeight !== '' ) ||
		( lineHeight !== undefined && lineHeight !== null && lineHeight !== '' ) ||
		( letterSpacing !== undefined && letterSpacing !== null && letterSpacing !== '' ) ||
		( currentFontStyle && currentFontStyle !== 'normal' )
	);

	const handleChange = (key, newValue) => {
		const updated = { ...value };
		if ( newValue === undefined || newValue === null || newValue === '' ) {
			delete updated[ key ];
			if ( key === 'fontStyle' ) delete updated.style;
		} else {
			updated[ key ] = newValue;
			if ( key === 'fontStyle' ) updated.style = newValue;
		}
		onChange( updated );
	};

	const handleResetAll = () => {
		onChange( {} );
	};

	const parseNumber = (val) => {
		if (typeof val === 'number') return val;
		if (typeof val === 'string' && val !== '') return parseFloat(val);
		return undefined;
	};

	// Optimize options for instant search responsiveness
	const displayedOptions = useMemo(() => {
		if (!filterValue || filterValue.trim() === '') {
			const topFonts = allFontOptions.slice(0, 100);
			if (fontFamily && !topFonts.some(opt => opt.value === fontFamily)) {
				const current = allFontOptions.find(opt => opt.value === fontFamily);
				if (current) {
					return [current, ...topFonts];
				}
			}
			return topFonts;
		}

		const query = filterValue.toLowerCase().trim();
		return allFontOptions
			.filter(opt => opt.label.toLowerCase().includes(query))
			.slice(0, 80);
	}, [filterValue, fontFamily]);

	const inlineStyles = `
		.gravisain-typography-control .components-range-control__number,
		.gravisain-typography-control .components-input-control__container,
		.gravisain-typography-control .components-input-control {
			min-height: 32px !important;
			height: 32px !important;
		}
		.gravisain-typography-control input.components-range-control__number {
			min-height: 32px !important;
			height: 32px !important;
			padding: 2px 8px !important;
			font-size: 13px !important;
			box-sizing: border-box !important;
		}
		.gravisain-typography-control .components-range-control__reset,
		.gravisain-typography-control .components-range-control .components-button {
			min-height: 32px !important;
			height: 32px !important;
			line-height: 30px !important;
			padding: 0 10px !important;
			font-size: 12px !important;
			box-sizing: border-box !important;
		}
		.gravisain-typography-control .components-select-control__input {
			min-height: 32px !important;
			height: 32px !important;
			font-size: 13px !important;
			box-sizing: border-box !important;
		}
	`;

	return (
		<BaseControl className="gravisain-typography-control">
			<style>{ inlineStyles }</style>
			{ label && (
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
					<span style={{ fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', color: '#1e1e1e' }}>{ label }</span>
					{ hasActiveValues && (
						<button
							type="button"
							className="gravisain-typography-reset-btn"
							onClick={ handleResetAll }
							title={ __( 'Reset Typography', 'gravisain-blocks' ) }
							style={{
								background: 'transparent',
								border: 'none',
								cursor: 'pointer',
								display: 'inline-flex',
								alignItems: 'center',
								gap: '4px',
								padding: '2px 6px',
								color: '#757575',
								fontSize: '11px',
								borderRadius: '2px',
							}}
						>
							<ResetIcon />
							<span>{ __( 'Reset', 'gravisain-blocks' ) }</span>
						</button>
					) }
				</div>
			) }
			<div style={{ paddingLeft: '10px', borderLeft: '2px solid #e2e4e7', marginBottom: '15px' }}>
				<ComboboxControl
					label={__('Font Family', 'gravisain-blocks')}
					value={fontFamily || ''}
					options={displayedOptions}
					onFilterValueChange={(filter) => setFilterValue(filter)}
					onChange={(val) => handleChange('fontFamily', val || '')}
					allowReset={true}
					placeholder={__('Search fonts...', 'gravisain-blocks')}
				/>
				
				<div style={{ marginTop: '10px' }}>
					<SelectControl
						label={__('Font Style', 'gravisain-blocks')}
						value={currentFontStyle}
						options={[
							{ label: __('Normal', 'gravisain-blocks'), value: 'normal' },
							{ label: __('Italic', 'gravisain-blocks'), value: 'italic' },
							{ label: __('Oblique', 'gravisain-blocks'), value: 'oblique' },
						]}
						onChange={(val) => handleChange('fontStyle', val)}
						__next40pxDefaultSize={false}
					/>
				</div>

				<div style={{ marginTop: '10px' }}>
					<RangeControl
						label={__('Size (px)', 'gravisain-blocks')}
						value={parseNumber(fontSize)}
						onChange={(val) => handleChange('fontSize', val)}
						min={8}
						max={120}
						allowReset
						resetFallbackValue={undefined}
						__next40pxDefaultSize={false}
					/>
				</div>
				
				<div style={{ marginTop: '10px' }}>
					<SelectControl
						label={__('Weight', 'gravisain-blocks')}
						value={fontWeight || ''}
						options={[
							{ label: __('Inherit', 'gravisain-blocks'), value: '' },
							{ label: 'Normal', value: 'normal' },
							{ label: 'Bold', value: 'bold' },
							{ label: '100', value: '100' },
							{ label: '200', value: '200' },
							{ label: '300', value: '300' },
							{ label: '400', value: '400' },
							{ label: '500', value: '500' },
							{ label: '600', value: '600' },
							{ label: '700', value: '700' },
							{ label: '800', value: '800' },
							{ label: '900', value: '900' },
						]}
						onChange={(val) => handleChange('fontWeight', val)}
						__next40pxDefaultSize={false}
					/>
				</div>

				<div style={{ marginTop: '10px' }}>
					<RangeControl
						label={__('Line Height', 'gravisain-blocks')}
						value={parseNumber(lineHeight)}
						onChange={(val) => handleChange('lineHeight', val)}
						min={0.5}
						max={3}
						step={0.1}
						allowReset
						resetFallbackValue={undefined}
						__next40pxDefaultSize={false}
					/>
				</div>
				<div style={{ marginTop: '10px' }}>
					<RangeControl
						label={__('Letter Spacing (px)', 'gravisain-blocks')}
						value={parseNumber(letterSpacing)}
						onChange={(val) => handleChange('letterSpacing', val)}
						min={-5}
						max={15}
						step={0.1}
						allowReset
						resetFallbackValue={undefined}
						__next40pxDefaultSize={false}
					/>
				</div>
			</div>
		</BaseControl>
	);
}
