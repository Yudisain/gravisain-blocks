import { __ } from '@wordpress/i18n';
import { BaseControl, Button, TextControl, Popover, Tooltip } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { ICONS } from './icons';

export default function IconPickerControl( { label, value, onChange } ) {
	const [ isVisible, setIsVisible ] = useState( false );
	const [ search, setSearch ] = useState( '' );

	const toggleVisible = () => setIsVisible( ! isVisible );

	// Filter icons based on search query
	const filteredIcons = Object.keys( ICONS ).filter( ( key ) => 
		key.toLowerCase().includes( search.toLowerCase() )
	);

	return (
		<BaseControl label={ label } className="gravisain-icon-picker-control" style={ { marginBottom: '24px' } }>
			<div style={ { display: 'flex', alignItems: 'center', gap: '12px' } }>
				<Button
					variant="secondary"
					className="gravisain-icon-picker-button"
					onClick={ toggleVisible }
					style={ { 
						width: '40px', 
						height: '40px', 
						padding: '8px', 
						display: 'flex', 
						justifyContent: 'center', 
						alignItems: 'center',
						border: '1px solid #ccc',
						borderRadius: '4px'
					} }
				>
					{ value && ICONS[ value ] ? (
						<div dangerouslySetInnerHTML={ { __html: ICONS[ value ] } } style={{ width: '100%', height: '100%' }} />
					) : (
						<span style={{ fontSize: '18px', lineHeight: 1 }}>+</span>
					) }
				</Button>
				
				{ value && (
					<Button isDestructive isLink onClick={ () => onChange( '' ) }>
						{ __( 'Remove Icon', 'gravisain' ) }
					</Button>
				) }
			</div>

			{ isVisible && (
				<Popover
					position="bottom center"
					onClose={ () => setIsVisible( false ) }
					onFocusOutside={ () => setIsVisible( false ) }
					style={ { padding: '16px', width: '280px' } }
				>
					<TextControl
						label={ __( 'Search Icon', 'gravisain' ) }
						value={ search }
						onChange={ ( val ) => setSearch( val ) }
						placeholder={ __( 'Search...', 'gravisain' ) }
					/>
					
					<div style={ { 
						display: 'grid', 
						gridTemplateColumns: 'repeat(5, 1fr)', 
						gap: '8px', 
						maxHeight: '200px', 
						overflowY: 'auto',
						marginTop: '12px'
					} }>
						{ filteredIcons.length > 0 ? (
							filteredIcons.map( ( key ) => (
								<Tooltip text={ key } key={ key }>
									<Button
										className={ `gravisain-icon-item ${ value === key ? 'is-active' : '' }` }
										style={ { 
											padding: '6px', 
											border: value === key ? '2px solid var(--wp-admin-theme-color)' : '1px solid #e0e0e0',
											borderRadius: '4px',
											background: value === key ? '#f0f6fc' : 'transparent',
											aspectRatio: '1/1'
										} }
										onClick={ () => {
											onChange( key );
											setIsVisible( false );
										} }
									>
										<div dangerouslySetInnerHTML={ { __html: ICONS[ key ] } } style={{ width: '100%', height: '100%' }} />
									</Button>
								</Tooltip>
							) )
						) : (
							<p style={{ gridColumn: '1 / -1', textAlign: 'center', margin: '10px 0', color: '#757575' }}>
								{ __( 'No icons found.', 'gravisain' ) }
							</p>
						) }
					</div>
				</Popover>
			) }
		</BaseControl>
	);
}
