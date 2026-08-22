import { __ } from '@wordpress/i18n';
import { BaseControl, __experimentalBoxControl as BoxControl } from '@wordpress/components';

/**
 * Custom Spacing Control for Margin and Padding
 */
export default function SpacingControl( { label, value, onChange, help } ) {
	
	// Normalize value to ensure it works with BoxControl (must be an object)
	let normalizedValue = { top: '', right: '', bottom: '', left: '' };
	
	if ( value ) {
		if ( typeof value === 'string' || typeof value === 'number' ) {
			const strVal = typeof value === 'number' ? `${value}px` : value;
			normalizedValue = { top: strVal, right: strVal, bottom: strVal, left: strVal };
		} else if ( typeof value === 'object' ) {
			normalizedValue = { ...normalizedValue, ...value };
		}
	}

	return (
		<BaseControl label={ label } help={ help } className="gravisain-spacing-control">
			<BoxControl
				values={ normalizedValue }
				onChange={ onChange }
				resetValues={ { top: '', right: '', bottom: '', left: '' } }
			/>
		</BaseControl>
	);
}
