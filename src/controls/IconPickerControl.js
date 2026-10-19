import { __ } from '@wordpress/i18n';
import { BaseControl, Button, TextControl, TextareaControl, Popover, Tooltip } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';
import { ICONS, getIconMarkup } from './icons';

export default function IconPickerControl( { label, value, onChange, help } ) {
	const detectTab = ( val ) => {
		if ( ! val || typeof val !== 'string' ) return 'icon';
		const trimmed = val.trim();
		if ( trimmed.startsWith( 'number:' ) || ( /^\d+$/.test( trimmed ) && ! ICONS[ trimmed ] ) ) return 'number';
		if ( trimmed.startsWith( '<svg' ) || trimmed.startsWith( '<SVG' ) ) return 'svg';
		if (
			trimmed.startsWith( 'http://' ) ||
			trimmed.startsWith( 'https://' ) ||
			trimmed.startsWith( '/' ) ||
			trimmed.startsWith( 'data:image' )
		) {
			return 'image';
		}
		return 'icon';
	};

	const [ activeTab, setActiveTab ] = useState( () => detectTab( value ) );
	const [ isPopoverVisible, setIsPopoverVisible ] = useState( false );
	const [ search, setSearch ] = useState( '' );

	// Local cache for values when switching between tabs
	const [ cached, setCached ] = useState( {
		icon: detectTab( value ) === 'icon' ? value : '',
		svg: detectTab( value ) === 'svg' ? value : '',
		image: detectTab( value ) === 'image' ? value : '',
		number: detectTab( value ) === 'number' ? value : 'number:1',
	} );

	// Synchronize if parent changes value externally
	useEffect( () => {
		const type = detectTab( value );
		if ( value && type !== activeTab ) {
			setActiveTab( type );
		}
		if ( value ) {
			setCached( ( prev ) => ( { ...prev, [ type ]: value } ) );
		}
	}, [ value ] );

	const handleTabChange = ( tab ) => {
		setActiveTab( tab );
		const nextVal = cached[ tab ] || ( tab === 'number' ? 'number:1' : '' );
		if ( tab === 'number' && ! cached.number ) {
			setCached( ( prev ) => ( { ...prev, number: 'number:1' } ) );
		}
		onChange( nextVal );
	};

	const handleNumberChange = ( numStr ) => {
		const clean = ( numStr || '' ).replace( /^number:/, '' );
		const formatted = clean ? `number:${ clean }` : '';
		setCached( ( prev ) => ( { ...prev, number: formatted } ) );
		onChange( formatted );
	};

	const handleIconSelect = ( iconKey ) => {
		setCached( ( prev ) => ( { ...prev, icon: iconKey } ) );
		onChange( iconKey );
		setIsPopoverVisible( false );
	};

	const handleSvgChange = ( svgStr ) => {
		setCached( ( prev ) => ( { ...prev, svg: svgStr } ) );
		onChange( svgStr );
	};

	const handleImageSelect = ( media ) => {
		const url = media?.url || '';
		setCached( ( prev ) => ( { ...prev, image: url } ) );
		onChange( url );
	};

	const handleClear = () => {
		setCached( ( prev ) => ( { ...prev, [ activeTab ]: '' } ) );
		onChange( '' );
	};

	// Filter icons based on search query
	const filteredIcons = Object.keys( ICONS ).filter( ( key ) =>
		key.toLowerCase().includes( search.toLowerCase() )
	);

	const isSvgVal = Boolean(
		value &&
		typeof value === 'string' &&
		( value.trim().startsWith( '<svg' ) || value.trim().startsWith( '<SVG' ) )
	);

	const isImageVal = Boolean(
		value &&
		typeof value === 'string' &&
		( value.startsWith( 'http' ) || value.startsWith( '/' ) || value.startsWith( 'data:image' ) )
	);

	const currentMarkup = getIconMarkup( value, null );

	return (
		<BaseControl label={ label } help={ help } className="gravisain-icon-picker-control" style={ { marginBottom: '20px' } }>
			{ /* Subtabs: ICON | SVG | IMAGE | NUMBER */ }
			<div
				className="gravisain-icon-subtabs"
				style={ {
					display: 'flex',
					borderBottom: '1px solid #dcdcde',
					marginBottom: '12px',
					gap: '4px',
				} }
			>
				{ [
					{ id: 'icon', label: __( 'ICON', 'gravisain' ) },
					{ id: 'svg', label: __( 'SVG', 'gravisain' ) },
					{ id: 'image', label: __( 'IMAGE', 'gravisain' ) },
					{ id: 'number', label: __( 'NUMBER', 'gravisain' ) },
				].map( ( tab ) => {
					const isActive = activeTab === tab.id;
					return (
						<button
							key={ tab.id }
							type="button"
							className={ `subtab-btn ${ isActive ? 'active' : '' }` }
							onClick={ () => handleTabChange( tab.id ) }
							style={ {
								background: 'none',
								border: 'none',
								padding: '6px 12px',
								fontSize: '11px',
								fontWeight: 600,
								color: isActive ? '#4f46e5' : '#64748b',
								borderBottom: isActive ? '2px solid #4f46e5' : '2px solid transparent',
								marginBottom: '-1px',
								textTransform: 'uppercase',
								letterSpacing: '0.5px',
								cursor: 'pointer',
								outline: 'none',
								transition: 'all 0.15s ease',
							} }
						>
							{ tab.label }
						</button>
					);
				} ) }
			</div>

			{ /* TAB 1: ICON PRESET */ }
			{ activeTab === 'icon' && (
				<div className="gravisain-subtab-icon-content">
					<div style={ { display: 'flex', alignItems: 'center', gap: '10px' } }>
						<Button
							variant="secondary"
							onClick={ () => setIsPopoverVisible( ! isPopoverVisible ) }
							className="gravisain-icon-picker-button"
							style={ {
								width: '42px',
								height: '42px',
								minWidth: '42px',
								padding: '8px',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								border: '1px solid #cbd5e1',
								borderRadius: '6px',
								background: '#f8fafc',
								color: '#0f172a',
								cursor: 'pointer',
							} }
							title={ __( 'Choose Icon', 'gravisain' ) }
						>
							{ value && currentMarkup && currentMarkup.type === 'svg' ? (
								<div
									dangerouslySetInnerHTML={ { __html: currentMarkup.content } }
									style={ {
										width: '22px',
										height: '22px',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									} }
								/>
							) : (
								<span style={ { fontSize: '20px', lineHeight: 1, color: '#4f46e5' } }>+</span>
							) }
						</Button>

						<div style={ { display: 'flex', flexDirection: 'column', gap: '2px', flex: 1, minWidth: 0 } }>
							<Button
								variant="secondary"
								isSmall
								onClick={ () => setIsPopoverVisible( ! isPopoverVisible ) }
								style={ { alignSelf: 'flex-start', fontSize: '12px', fontWeight: 500 } }
							>
								{ value ? __( 'Change Icon', 'gravisain' ) : __( 'Select Icon', 'gravisain' ) }
							</Button>
							{ value && (
								<span style={ { fontSize: '11px', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }>
									{ typeof value === 'string' ? value : '' }
								</span>
							) }
						</div>

						{ value && (
							<Button isDestructive isLink onClick={ handleClear } style={ { fontSize: '12px' } }>
								{ __( 'Remove', 'gravisain' ) }
							</Button>
						) }
					</div>

					{ isPopoverVisible && (
						<Popover
							position="bottom center"
							onClose={ () => setIsPopoverVisible( false ) }
							onFocusOutside={ () => setIsPopoverVisible( false ) }
							style={ { padding: '16px', width: '300px' } }
						>
							<TextControl
								label={ __( 'Search Icon', 'gravisain' ) }
								value={ search }
								onChange={ ( val ) => setSearch( val ) }
								placeholder={ __( 'Search icons...', 'gravisain' ) }
							/>

							<div
								style={ {
									display: 'grid',
									gridTemplateColumns: 'repeat(5, 1fr)',
									gap: '8px',
									maxHeight: '220px',
									overflowY: 'auto',
									marginTop: '12px',
									paddingRight: '4px',
								} }
							>
								{ filteredIcons.length > 0 ? (
									filteredIcons.map( ( key ) => (
										<Tooltip text={ key } key={ key }>
											<Button
												className={ `gravisain-icon-item ${ value === key ? 'is-active' : '' }` }
												style={ {
													padding: '6px',
													border: value === key ? '2px solid #4f46e5' : '1px solid #e2e8f0',
													borderRadius: '6px',
													background: value === key ? '#eef2ff' : '#ffffff',
													aspectRatio: '1/1',
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center',
													cursor: 'pointer',
												} }
												onClick={ () => handleIconSelect( key ) }
											>
												<div
													dangerouslySetInnerHTML={ { __html: ICONS[ key ] } }
													style={ {
														width: '20px',
														height: '20px',
														display: 'flex',
														alignItems: 'center',
														justifyContent: 'center',
													} }
												/>
											</Button>
										</Tooltip>
									) )
								) : (
									<p style={ { gridColumn: '1 / -1', textAlign: 'center', margin: '12px 0', color: '#64748b', fontSize: '12px' } }>
										{ __( 'No icons found.', 'gravisain' ) }
									</p>
								) }
							</div>
						</Popover>
					) }
				</div>
			) }

			{ /* TAB 2: RAW SVG */ }
			{ activeTab === 'svg' && (
				<div className="gravisain-subtab-svg-content">
					<TextareaControl
						label={ __( 'SVG Code', 'gravisain' ) }
						value={ isSvgVal ? value : '' }
						onChange={ handleSvgChange }
						rows={ 4 }
						placeholder={ '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">...</svg>' }
						help={ __( 'Paste raw SVG code here.', 'gravisain' ) }
					/>

					{ isSvgVal && (
						<div style={ { marginTop: '10px', display: 'flex', alignItems: 'center', gap: '12px' } }>
							<div
								style={ {
									width: '42px',
									height: '42px',
									border: '1px solid #cbd5e1',
									borderRadius: '6px',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									padding: '6px',
									background: '#f8fafc',
									overflow: 'hidden',
								} }
							>
								<div
									dangerouslySetInnerHTML={ { __html: value } }
									style={ { width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' } }
								/>
							</div>
							<Button isDestructive isLink onClick={ handleClear } style={ { fontSize: '12px' } }>
								{ __( 'Clear SVG', 'gravisain' ) }
							</Button>
						</div>
					) }
				</div>
			) }

			{ /* TAB 3: IMAGE */ }
			{ activeTab === 'image' && (
				<div className="gravisain-subtab-image-content">
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ handleImageSelect }
							allowedTypes={ [ 'image' ] }
							render={ ( { open } ) => (
								<>
									{ isImageVal ? (
										<div style={ { display: 'flex', alignItems: 'center', gap: '12px' } }>
											<div
												style={ {
													width: '42px',
													height: '42px',
													border: '1px solid #cbd5e1',
													borderRadius: '6px',
													padding: '4px',
													background: '#f8fafc',
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center',
												} }
											>
												<img
													src={ value }
													alt=""
													style={ { maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' } }
												/>
											</div>
											<Button variant="secondary" isSmall onClick={ open } style={ { fontSize: '12px' } }>
												{ __( 'Replace Image', 'gravisain' ) }
											</Button>
											<Button isDestructive isLink onClick={ handleClear } style={ { marginLeft: 'auto', fontSize: '12px' } }>
												{ __( 'Remove', 'gravisain' ) }
											</Button>
										</div>
									) : (
										<Button
											variant="secondary"
											onClick={ open }
											style={ { width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '6px' } }
										>
											<span className="dashicons dashicons-upload" style={ { fontSize: '16px', lineHeight: '16px', width: '16px', height: '16px' } }></span>
											{ __( 'Select / Upload Image', 'gravisain' ) }
										</Button>
									) }
								</>
							) }
						/>
					</MediaUploadCheck>
				</div>
			) }

			{ /* TAB 4: NUMBER */ }
			{ activeTab === 'number' && (
				<div className="gravisain-subtab-number-content">
					<div style={ { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' } }>
						<div
							style={ {
								width: '42px',
								height: '42px',
								minWidth: '42px',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								border: '1px solid #cbd5e1',
								borderRadius: '6px',
								background: '#f8fafc',
								color: '#4f46e5',
								fontWeight: 700,
								fontSize: '18px',
								userSelect: 'none',
							} }
							title={ __( 'Number Preview', 'gravisain' ) }
						>
							{ ( typeof value === 'string' ? value.replace( /^number:/, '' ) : '' ) || '—' }
						</div>

						<div style={ { flex: 1, minWidth: 0 } }>
							<TextControl
								value={
									typeof value === 'string' && value.startsWith( 'number:' )
										? value.replace( /^number:/, '' )
										: ( /^\d+$/.test( value ) && ! ICONS[ value ] ? value : ( value ? value.replace( /^number:/, '' ) : '' ) )
								}
								onChange={ ( val ) => handleNumberChange( val ) }
								placeholder={ __( 'e.g. 1, 2, 01, A...', 'gravisain' ) }
								style={ { margin: 0 } }
							/>
						</div>

						{ value && (
							<Button isDestructive isLink onClick={ handleClear } style={ { fontSize: '12px', padding: 0 } }>
								{ __( 'Remove', 'gravisain' ) }
							</Button>
						) }
					</div>

					<div style={ { marginTop: '8px' } }>
						<span style={ { fontSize: '11px', color: '#64748b', fontWeight: 500, display: 'block', marginBottom: '6px' } }>
							{ __( 'Quick Presets:', 'gravisain' ) }
						</span>
						<div style={ { display: 'flex', flexWrap: 'wrap', gap: '6px' } }>
							{ [ '1', '2', '3', '4', '5', '6', '01', '02', '03' ].map( ( preset ) => {
								const currentVal = typeof value === 'string' ? value.replace( /^number:/, '' ) : '';
								const isSelected = currentVal === preset;
								return (
									<Button
										key={ preset }
										variant={ isSelected ? 'primary' : 'secondary' }
										isSmall
										onClick={ () => handleNumberChange( preset ) }
										style={ {
											minWidth: '32px',
											justifyContent: 'center',
											fontWeight: 600,
											fontSize: '12px',
											padding: '2px 8px',
										} }
									>
										{ preset }
									</Button>
								);
							} ) }
						</div>
					</div>
				</div>
			) }

			{ /* Scoped inline style ensuring SVGs in picker button and items render with exact dimensions */ }
			<style>{ `
				.gravisain-icon-picker-button svg,
				.gravisain-icon-item svg,
				.gravisain-subtab-svg-content svg,
				.gravisain-subtab-number-content svg {
					width: 100% !important;
					height: 100% !important;
					max-width: 100% !important;
					max-height: 100% !important;
					display: block !important;
				}
				/* Override WordPress core rule ".components-button svg { fill: currentColor }"
				   which otherwise turns our outline (stroke-based) Lucide icons into solid blobs
				   inside the editor. Only SVGs that carry a stroke are outline icons -> keep fill:none.
				   Brand logos have no stroke and rely on fill:currentColor, so they stay solid.
				   IMPORTANT: selectors intentionally omit any ancestor (.gravisain-icon-picker-control)
				   because the icon grid is rendered inside a <Popover> portal that relocates these
				   elements to document.body, where that ancestor does not exist. */
				.gravisain-icon-picker-button svg[stroke],
				.gravisain-icon-item svg[stroke],
				.gravisain-subtab-svg-content svg[stroke] {
					fill: none !important;
				}
				.gravisain-icon-picker-button svg text,
				.gravisain-subtab-number-content svg text {
					stroke: none !important;
					fill: currentColor !important;
				}
			` }</style>
		</BaseControl>
	);
}
