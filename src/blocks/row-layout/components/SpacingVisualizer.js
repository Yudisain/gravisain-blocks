import { __ } from '@wordpress/i18n';
import { useState, useEffect, useRef } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import './SpacingVisualizer.scss';

export default function SpacingVisualizer( { attributes, setAttributes, isSelected, blockRef, prefix } ) {
	if ( ! isSelected ) {
		return null;
	}

	const previewDeviceType = useSelect( ( select ) => {
		const editorDevice = select( 'core/editor' )?.getDeviceType?.();
		const postDevice = select( 'core/edit-post' )?.__experimentalGetPreviewDeviceType?.();
		const siteDevice = select( 'core/edit-site' )?.__experimentalGetPreviewDeviceType?.();
		return editorDevice || postDevice || siteDevice || 'Desktop';
	}, [] );

	const isTablet = previewDeviceType === 'Tablet';
	const isMobile = previewDeviceType === 'Mobile';

	const activePaddingKey = isMobile ? 'paddingMobile' : ( isTablet ? 'paddingTablet' : 'padding' );

	const currentDevicePadding = attributes[ activePaddingKey ];
	const inheritedPadding = isMobile
		? ( attributes.paddingMobile || attributes.paddingTablet || attributes.padding )
		: ( isTablet ? ( attributes.paddingTablet || attributes.padding ) : attributes.padding );
	
	// Helper to extract numeric values safely
	const getNumericValue = ( spacingObj, side ) => {
		if ( ! spacingObj ) return 0;
		const val = typeof spacingObj === 'string' ? spacingObj : ( spacingObj[ side ] || '' );
		const parsed = parseInt( val, 10 );
		return isNaN( parsed ) ? 0 : parsed;
	};

	const [ isDragging, setIsDragging ] = useState( false );
	const [ activeHandle, setActiveHandle ] = useState( null );
	const [ dragValue, setDragValue ] = useState( 0 );
	
	const visualizerRef = useRef( null );
	const dragStartY = useRef( 0 );
	const initialValue = useRef( 0 );

	const paddingTop = getNumericValue( currentDevicePadding || inheritedPadding, 'top' );
	const paddingBottom = getNumericValue( currentDevicePadding || inheritedPadding, 'bottom' );

	const handleMouseDown = ( e, side, type ) => {
		e.preventDefault();
		e.stopPropagation();
		
		setIsDragging( true );
		setActiveHandle( `${type}-${side}` );
		dragStartY.current = e.clientY;
		
		if ( type === 'padding' ) {
			initialValue.current = getNumericValue( currentDevicePadding || inheritedPadding, side );
		}
		
		setDragValue( initialValue.current );
	};

	const stateRef = useRef( { isDragging: false, activeHandle: null, dragValue: 0 } );
	const devicePaddingRef = useRef( { activePaddingKey, currentDevicePadding, inheritedPadding } );
	
	// Keep ref in sync with state for event listeners
	useEffect( () => {
		stateRef.current = { isDragging, activeHandle, dragValue };
	}, [ isDragging, activeHandle, dragValue ] );

	useEffect( () => {
		devicePaddingRef.current = { activePaddingKey, currentDevicePadding, inheritedPadding };
	}, [ activePaddingKey, currentDevicePadding, inheritedPadding ] );

	useEffect( () => {
		if ( ! isDragging ) return;

		const doc = visualizerRef.current?.ownerDocument || document;
		const win = doc.defaultView || window;

		const handleMouseMoveEvent = ( e ) => {
			const state = stateRef.current;
			if ( ! state.isDragging || ! state.activeHandle ) return;

			const [ type, side ] = state.activeHandle.split('-');
			const deltaY = e.clientY - dragStartY.current;
			
			let newValue = initialValue.current;
			
			if ( side === 'top' ) {
				newValue += deltaY;
			} else if ( side === 'bottom' ) {
				newValue += deltaY; 
			}

			newValue = Math.max( 0, newValue ); 
			
			// Update state and ref immediately
			setDragValue( newValue );
			stateRef.current.dragValue = newValue;

			if ( blockRef && blockRef.current ) {
				let varName = `--gravisain-${type}-${side}`;
				if ( prefix === 'container' ) {
					varName = `--gravisain-container-p${side.charAt(0)}`; // pt or pb
				} else if ( prefix === 'col' ) {
					varName = `--gravisain-col-p${side.charAt(0)}`; // pt or pb
				}
				blockRef.current.style.setProperty( varName, `${newValue}px` );
				
				// Force immediate visual update by directly overriding the padding inline
				// This bypasses any CSS attribute selector caching issues during drag
				if ( type === 'padding' ) {
					blockRef.current.style.setProperty( `padding-${side}`, `${newValue}px`, 'important' );
				}
			}
		};

		const handleMouseUpEvent = () => {
			const state = stateRef.current;
			if ( ! state.isDragging || ! state.activeHandle ) return;

			const [ type, side ] = state.activeHandle.split('-');
			
			if ( type === 'padding' ) {
				const { activePaddingKey: padKey, currentDevicePadding: devPad, inheritedPadding: inhPad } = devicePaddingRef.current;
				const baseObj = typeof devPad === 'object' && devPad !== null 
					? { ...devPad } 
					: ( typeof inhPad === 'object' && inhPad !== null ? { ...inhPad } : { top: '', right: '', bottom: '', left: '' } );

				if ( typeof devPad === 'string' ) {
					baseObj.top = devPad;
					baseObj.right = devPad;
					baseObj.bottom = devPad;
					baseObj.left = devPad;
				}
				
				baseObj[ side ] = `${state.dragValue}px`;
				setAttributes( { [ padKey ]: baseObj } );

				if ( blockRef && blockRef.current ) {
					blockRef.current.style.removeProperty( `padding-${side}` );
				}
			}
			
			setIsDragging( false );
			setActiveHandle( null );
			stateRef.current.isDragging = false;
			stateRef.current.activeHandle = null;
		};

		const safeAddParentListener = () => {
			try {
				if ( win.parent && win.parent.document ) {
					win.parent.document.addEventListener( 'mouseup', handleMouseUpEvent );
					win.parent.document.addEventListener( 'mousemove', handleMouseMoveEvent );
				}
			} catch ( error ) {}
		};

		const safeRemoveParentListener = () => {
			try {
				if ( win.parent && win.parent.document ) {
					win.parent.document.removeEventListener( 'mouseup', handleMouseUpEvent );
					win.parent.document.removeEventListener( 'mousemove', handleMouseMoveEvent );
				}
			} catch ( error ) {}
		};

		doc.addEventListener( 'mousemove', handleMouseMoveEvent );
		doc.addEventListener( 'mouseup', handleMouseUpEvent );
		safeAddParentListener();
		
		return () => {
			doc.removeEventListener( 'mousemove', handleMouseMoveEvent );
			doc.removeEventListener( 'mouseup', handleMouseUpEvent );
			safeRemoveParentListener();
		};
	}, [ isDragging ] );

	const renderHandle = ( side, type, currentValue ) => {
		const isHovering = activeHandle === `${type}-${side}`;
		const displayValue = isDragging && isHovering ? dragValue : currentValue;
		
		return (
			<div 
				className={`gravisain-spacing-zone is-${type}-${side} ${isDragging && isHovering ? 'is-dragging' : ''}`}
				style={{ height: `${displayValue}px` }}
				onMouseDown={(e) => handleMouseDown(e, side, type)}
			>
				<div className="gravisain-spacing-handle-center">
					<span className="gravisain-spacing-value">{displayValue || 'None'}</span>
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M12 4L16 8H8L12 4Z" fill="currentColor"/>
						<path d="M12 20L8 16H16L12 20Z" fill="currentColor"/>
						<rect x="11" y="8" width="2" height="8" fill="currentColor"/>
					</svg>
				</div>
			</div>
		);
	};

	return (
		<div className={`gravisain-spacing-visualizer ${isDragging ? 'is-dragging-active' : ''}`} ref={visualizerRef}>
			{ renderHandle( 'top', 'padding', paddingTop ) }
			{ renderHandle( 'bottom', 'padding', paddingBottom ) }
		</div>
	);
}
