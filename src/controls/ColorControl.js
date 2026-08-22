import { __ } from '@wordpress/i18n';
import { BaseControl, GradientPicker, Button, Dropdown } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { SketchPicker } from 'react-color';

/**
 * Custom Color Control for Gravisain Blocks
 * Supports both solid colors and gradients (from theme.json).
 */
export default function ColorControl( { label, value, onChange, help, disableGradient = false } ) {
	const { colors, gradients } = useSelect( ( select ) => {
		const settings = select( 'core/block-editor' ).getSettings();
		const rawColors = settings.colors || [];
		
		const uniqueColors = [];
		const seenHex = new Set();
		
		rawColors.forEach( c => {
			if ( c && c.color && ! seenHex.has( c.color ) ) {
				seenHex.add( c.color );
				uniqueColors.push( c );
			}
		});

		return {
			colors: uniqueColors.length > 0 ? uniqueColors : rawColors,
			gradients: settings.gradients || [],
		};
	}, [] );

	const isGradient = typeof value === 'string' && value.includes( 'gradient' );
	const [ mode, setMode ] = wp.element.useState( isGradient ? 'gradient' : 'solid' );

	const presetColors = colors.map( c => c.color );

	const renderSketchPicker = () => (
		<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
			<Dropdown
				className="gravisain-color-dropdown"
				contentClassName="gravisain-color-popover"
				position="bottom right"
				popoverProps={{
					focusOnMount: false,
				}}
				renderToggle={ ( { isOpen, onToggle } ) => (
					<Button 
						onClick={ onToggle }
						className="gravisain-color-indicator"
						style={{ 
							backgroundColor: value || 'transparent',
							width: '30px',
							height: '30px',
							borderRadius: '50%',
							border: '1px solid #ccc',
							padding: 0,
							minWidth: 0,
							boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)'
						}}
						aria-expanded={ isOpen }
					/>
				) }
				renderContent={ () => (
					<div style={{ padding: '0px' }} onMouseDown={ ( e ) => e.stopPropagation() }>
						<SketchPicker
							color={ ( value && value !== 'transparent' ) ? value : '#ffffff' }
							onChange={ ( color ) => {
								if ( color.rgb.a === 1 ) {
									onChange( color.hex );
								} else {
									onChange( `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})` );
								}
							} }
							presetColors={ presetColors }
							styles={{ default: { picker: { boxShadow: 'none', border: 'none' } } }}
						/>
						<div style={{ padding: '10px', borderTop: '1px solid #eee', textAlign: 'center' }}>
							<Button isSmall variant="secondary" onClick={ () => onChange( undefined ) }>
								{ __( 'Clear', 'gravisain' ) }
							</Button>
						</div>
					</div>
				) }
			/>
			{ !disableGradient && <span style={{ fontSize: '12px', color: '#757575' }}>{ value ? value : __( 'Select color', 'gravisain' ) }</span> }
		</div>
	);

	const renderGradientPicker = () => (
		<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
			<Dropdown
				className="gravisain-color-dropdown"
				contentClassName="gravisain-color-popover"
				position="bottom right"
				popoverProps={{
					focusOnMount: false,
				}}
				renderToggle={ ( { isOpen, onToggle } ) => (
					<Button 
						onClick={ onToggle }
						className="gravisain-color-indicator"
						style={{ 
							background: value || 'transparent',
							width: '30px',
							height: '30px',
							borderRadius: '50%',
							border: '1px solid #ccc',
							padding: 0,
							minWidth: 0,
							boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)'
						}}
						aria-expanded={ isOpen }
					/>
				) }
				renderContent={ () => (
					<div style={{ padding: '16px' }} onMouseDown={ ( e ) => e.stopPropagation() }>
						<GradientPicker
							gradients={ gradients }
							value={ isGradient ? value : undefined }
							onChange={ onChange }
							clearable={ true }
						/>
					</div>
				) }
			/>
			{ !disableGradient && <span style={{ fontSize: '12px', color: '#757575' }}>{ value ? (value.length > 20 ? value.substring(0, 20) + '...' : value) : __( 'Select gradient', 'gravisain' ) }</span> }
		</div>
	);

	if ( disableGradient ) {
		return (
			<BaseControl label={ label } help={ help } className="gravisain-color-control">
				{ renderSketchPicker() }
			</BaseControl>
		);
	}

	return (
		<BaseControl help={ help } className="gravisain-color-control" style={{ marginBottom: '16px' }}>
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
				<span className="components-base-control__label" style={{ marginBottom: 0 }}>{ label }</span>
				<div style={{ display: 'flex', background: '#f0f0f0', borderRadius: '4px', padding: '2px' }}>
					<Button
						variant={ mode === 'solid' ? 'primary' : 'tertiary' }
						style={{ height: '24px', padding: '0 8px', fontSize: '12px', minWidth: 0 }}
						onClick={ () => setMode( 'solid' ) }
					>
						{ __( 'Solid', 'gravisain' ) }
					</Button>
					<Button
						variant={ mode === 'gradient' ? 'primary' : 'tertiary' }
						style={{ height: '24px', padding: '0 8px', fontSize: '12px', minWidth: 0 }}
						onClick={ () => setMode( 'gradient' ) }
					>
						{ __( 'Gradient', 'gravisain' ) }
					</Button>
				</div>
			</div>
			
			{ mode === 'solid' && renderSketchPicker() }
			
			{ mode === 'gradient' && renderGradientPicker() }
		</BaseControl>
	);
}
