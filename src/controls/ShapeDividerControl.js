import { __ } from '@wordpress/i18n';
import { SelectControl, RangeControl, ToggleControl, BaseControl } from '@wordpress/components';
import ColorControl from './ColorControl';
import { SHAPES } from './shapes';

export default function ShapeDividerControl( { label, value = {}, onChange } ) {
	const { 
		type = 'none', 
		color = '#e2e8f0', 
		height = 100, 
		width = 100, 
		flipH = false, 
		flipV = false 
	} = value;

	const updateSetting = ( key, newValue ) => {
		onChange( {
			...value,
			[ key ]: newValue
		} );
	};

	const shapeOptions = Object.keys( SHAPES ).map( key => ( {
		label: SHAPES[ key ].label,
		value: key
	} ) );

	return (
		<BaseControl label={ label } className="gravisain-shape-divider-control" style={ { marginBottom: '24px' } }>
			<SelectControl
				label={ __( 'Shape', 'gravisain-blocks' ) }
				value={ type }
				options={ shapeOptions }
				onChange={ ( val ) => updateSetting( 'type', val ) }
			/>

			{ type !== 'none' && (
				<div style={ { marginTop: '16px' } }>
					<ColorControl
						label={ __( 'Shape Color', 'gravisain-blocks' ) }
						value={ color }
						onChange={ ( val ) => updateSetting( 'color', val ) }
						disableGradient={ true }
					/>
					
					<RangeControl
						label={ __( 'Width (%)', 'gravisain-blocks' ) }
						value={ width }
						onChange={ ( val ) => updateSetting( 'width', val ) }
						min={ 100 }
						max={ 300 }
					/>

					<RangeControl
						label={ __( 'Height (px)', 'gravisain-blocks' ) }
						value={ height }
						onChange={ ( val ) => updateSetting( 'height', val ) }
						min={ 10 }
						max={ 500 }
					/>

					<div style={ { display: 'flex', gap: '16px' } }>
						<ToggleControl
							label={ __( 'Flip Horizontally', 'gravisain-blocks' ) }
							checked={ flipH }
							onChange={ ( val ) => updateSetting( 'flipH', val ) }
						/>
						<ToggleControl
							label={ __( 'Flip Vertically', 'gravisain-blocks' ) }
							checked={ flipV }
							onChange={ ( val ) => updateSetting( 'flipV', val ) }
						/>
					</div>
				</div>
			) }
		</BaseControl>
	);
}
