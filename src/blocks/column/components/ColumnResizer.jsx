import { useState, useRef, useEffect } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';
import { SVG, Path } from '@wordpress/components';

export default function ColumnResizer( { clientId } ) {
	const [ isDragging, setIsDragging ] = useState( false );
	const [ liveWidths, setLiveWidths ] = useState( [ 50, 50 ] );
	const resizerRef = useRef( null );
	const initialData = useRef( null );
	const animationFrameRef = useRef( null );

	const { updateBlockAttributes } = useDispatch( 'core/block-editor' );

	const { block, nextBlock, parentBlock, previewDeviceType, stackOn } = useSelect(
		( select ) => {
			const { getBlock, getBlockRootClientId, getBlocks } = select( 'core/block-editor' );
			const parentId = getBlockRootClientId( clientId );
			if ( ! parentId ) return {};

			const siblings = getBlocks( parentId );
			const blockIndex = siblings.findIndex( ( b ) => b.clientId === clientId );

			const editorDevice = select( 'core/editor' )?.getDeviceType?.();
			const postDevice = select( 'core/edit-post' )?.__experimentalGetPreviewDeviceType?.();
			const siteDevice = select( 'core/edit-site' )?.__experimentalGetPreviewDeviceType?.();
			const currentDevice = editorDevice || postDevice || siteDevice || 'Desktop';

			const parent = getBlock( parentId );

			return {
				block: siblings[ blockIndex ],
				nextBlock: siblings[ blockIndex + 1 ], // May be undefined if it's the last column
				parentBlock: parent,
				previewDeviceType: currentDevice,
				stackOn: parent?.attributes?.stackOn || 'mobile',
			};
		},
		[ clientId ]
	);

	const onMouseDown = ( e ) => {
		e.preventDefault();
		e.stopPropagation();

		const ownerWindow = resizerRef.current?.ownerDocument?.defaultView || window;
		const ownerDocument = resizerRef.current?.ownerDocument || document;

		const { getBlocks } = window.wp.data.select( 'core/block-editor' );
		const siblings = getBlocks( parentBlock.clientId );
		const blockIndex = siblings.findIndex( ( b ) => b.clientId === clientId );
		if ( blockIndex === -1 || blockIndex >= siblings.length - 1 ) return;

		// Find the row layout inner container
		const columnNode = resizerRef.current.closest( '.wp-block-gravisain-column, .gravisain-column' );
		const rowNode = columnNode ? columnNode.closest( '.gravisain-row-layout-inner' ) : null;
		if ( ! rowNode ) return;

		// Accurately locate all sibling column DOM nodes by block clientIds or fallback to class selector
		let siblingNodes = siblings
			.map( ( b ) => {
				return (
					rowNode.querySelector( `[data-block="${ b.clientId }"]` ) ||
					ownerDocument.getElementById( `block-${ b.clientId }` )
				);
			} )
			.filter( Boolean );

		if ( siblingNodes.length !== siblings.length ) {
			siblingNodes = Array.from(
				rowNode.querySelectorAll( '.wp-block-gravisain-column, .gravisain-column' )
			).filter( ( el ) => el.closest( '.gravisain-row-layout-inner' ) === rowNode );
		}

		if ( siblingNodes.length < 2 || ! siblingNodes[ blockIndex ] || ! siblingNodes[ blockIndex + 1 ] ) {
			return;
		}

		// Calculate actual rendered column pixel widths
		const currentWidthsPx = siblingNodes.map( ( node ) => node.getBoundingClientRect().width );
		const totalColsWidth = currentWidthsPx.reduce( ( sum, w ) => sum + w, 0 );
		if ( totalColsWidth <= 0 ) return;

		// Proportional percentages that strictly sum to 100%
		const startWidthsPct = currentWidthsPx.map( ( w ) => ( w / totalColsWidth ) * 100 );

		initialData.current = {
			startX: e.clientX,
			totalColsWidth,
			rowNode,
			blockIndex,
			startWidthsPct,
			combinedPct: startWidthsPct[ blockIndex ] + startWidthsPct[ blockIndex + 1 ],
			newTemplate: '',
		};

		setIsDragging( true );
		setLiveWidths( [ startWidthsPct[ blockIndex ], startWidthsPct[ blockIndex + 1 ] ] );

		if ( ownerDocument.body ) {
			ownerDocument.body.classList.add( 'is-resizing-column' );
		}
		try {
			if ( window.parent && window.parent.document && window.parent.document.body ) {
				window.parent.document.body.classList.add( 'is-resizing-column' );
			}
		} catch ( err ) {}
	};

	useEffect( () => {
		const ownerWindow = resizerRef.current?.ownerDocument?.defaultView || window;
		const ownerDocument = resizerRef.current?.ownerDocument || document;

		const onMouseMove = ( e ) => {
			if ( ! isDragging || ! initialData.current ) return;

			const {
				startX,
				totalColsWidth,
				rowNode,
				blockIndex: bIdx,
				startWidthsPct,
				combinedPct,
			} = initialData.current;

			// Pixel difference
			const dx = e.clientX - startX;
			const deltaPercent = ( dx / totalColsWidth ) * 100;

			let newWidth = startWidthsPct[ bIdx ] + deltaPercent;
			let newNextWidth = startWidthsPct[ bIdx + 1 ] - deltaPercent;

			// Constraint to prevent collapsing (minimum 5%)
			const MIN_WIDTH = 5;
			if ( newWidth < MIN_WIDTH ) {
				newWidth = MIN_WIDTH;
				newNextWidth = combinedPct - MIN_WIDTH;
			} else if ( newNextWidth < MIN_WIDTH ) {
				newNextWidth = MIN_WIDTH;
				newWidth = combinedPct - MIN_WIDTH;
			}

			// Smart magnetic snap to standard column ratios unless holding Alt
			if ( ! e.altKey ) {
				const snapPoints = [ 20, 25, 33.33, 50, 66.67, 75, 80 ];
				for ( const snap of snapPoints ) {
					if ( Math.abs( newWidth - snap ) < 1.2 ) {
						newWidth = snap;
						newNextWidth = combinedPct - snap;
						break;
					}
				}
			}

			const newWidths = [ ...startWidthsPct ];
			newWidths[ bIdx ] = newWidth;
			newWidths[ bIdx + 1 ] = newNextWidth;

			// Format template string using CSS Grid fractional units (100% harmonious with CSS Grid gap calculation)
			const templateString = newWidths.map( ( w ) => `${ w.toFixed( 2 ) }fr` ).join( ' ' );
			initialData.current.newTemplate = templateString;

			setLiveWidths( [ newWidth, newNextWidth ] );

			// 60fps smooth dragging synchronized with browser refresh rate
			if ( animationFrameRef.current ) {
				cancelAnimationFrame( animationFrameRef.current );
			}
			animationFrameRef.current = requestAnimationFrame( () => {
				rowNode.style.gridTemplateColumns = templateString;
			} );
		};

		const onMouseUp = () => {
			if ( animationFrameRef.current ) {
				cancelAnimationFrame( animationFrameRef.current );
			}

			if ( initialData.current && initialData.current.newTemplate ) {
				const { newTemplate } = initialData.current;

				let targetAttr = 'gridTemplate';
				if ( previewDeviceType === 'Tablet' ) {
					targetAttr = 'gridTemplateTablet';
				} else if ( previewDeviceType === 'Mobile' ) {
					targetAttr = 'gridTemplateMobile';
				}

				// Dispatch attributes to React store for the parent row layout
				updateBlockAttributes( parentBlock.clientId, { [ targetAttr ]: newTemplate } );
			}

			setIsDragging( false );
			initialData.current = null;

			if ( ownerDocument?.body ) {
				ownerDocument.body.classList.remove( 'is-resizing-column' );
			}
			try {
				if ( window.parent && window.parent.document && window.parent.document.body ) {
					window.parent.document.body.classList.remove( 'is-resizing-column' );
				}
			} catch ( err ) {}
		};

		if ( isDragging ) {
			ownerWindow.addEventListener( 'mousemove', onMouseMove );
			ownerWindow.addEventListener( 'mouseup', onMouseUp );

			// Also listen on parent window if inside Gutenberg iframe canvas
			try {
				if ( window.parent && window.parent !== ownerWindow ) {
					window.parent.addEventListener( 'mousemove', onMouseMove );
					window.parent.addEventListener( 'mouseup', onMouseUp );
				}
			} catch ( err ) {}
		}

		return () => {
			if ( animationFrameRef.current ) {
				cancelAnimationFrame( animationFrameRef.current );
			}
			ownerWindow.removeEventListener( 'mousemove', onMouseMove );
			ownerWindow.removeEventListener( 'mouseup', onMouseUp );
			try {
				if ( window.parent && window.parent !== ownerWindow ) {
					window.parent.removeEventListener( 'mousemove', onMouseMove );
					window.parent.removeEventListener( 'mouseup', onMouseUp );
				}
			} catch ( err ) {}
			if ( ownerDocument?.body ) {
				ownerDocument.body.classList.remove( 'is-resizing-column' );
			}
			try {
				if ( window.parent && window.parent.document && window.parent.document.body ) {
					window.parent.document.body.classList.remove( 'is-resizing-column' );
				}
			} catch ( err ) {}
		};
	}, [ isDragging, clientId, nextBlock?.clientId, updateBlockAttributes, parentBlock?.clientId, previewDeviceType ] );

	// Do not render resizer if blocks are not loaded or if it's the last column
	if ( ! block || ! parentBlock || ! nextBlock ) {
		return null;
	}

	// If columns are vertically stacked in the current preview device, hide horizontal resizer
	const isMobile = previewDeviceType === 'Mobile';
	const isTablet = previewDeviceType === 'Tablet';
	const isStacked = ( isMobile && stackOn !== 'none' ) || ( isTablet && stackOn === 'tablet' );
	if ( isStacked ) {
		return null;
	}

	return (
		<div
			ref={ resizerRef }
			className={ `gravisain-column-resizer ${ isDragging ? 'is-dragging' : '' }` }
			onMouseDown={ onMouseDown }
		>
			<div className="gravisain-resizer-line" />
			<div className="gravisain-resizer-handle">
				<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14">
					<Path fill="#ffffff" d="M8.5 7L4 12l4.5 5v-3.5h7V17l4.5-5-4.5-5v3.5h-7V7z" />
				</SVG>
			</div>
			{ isDragging && (
				<div
					className="gravisain-resizer-tooltip"
					style={{
						position: 'absolute',
						bottom: 'calc(50% + 18px)',
						left: '50%',
						transform: 'translateX(-50%)',
						background: '#1e293b',
						color: '#ffffff',
						padding: '2px 7px',
						borderRadius: '4px',
						fontSize: '11px',
						fontWeight: '600',
						letterSpacing: '0.3px',
						lineHeight: '1.3',
						whiteSpace: 'nowrap',
						boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
						pointerEvents: 'none',
						display: 'flex',
						alignItems: 'center',
						gap: '4px',
						zIndex: 9999,
					}}
				>
					<span>{ Math.round( liveWidths[ 0 ] ) }%</span>
					<span style={{ opacity: 0.4, fontWeight: 400 }}>|</span>
					<span>{ Math.round( liveWidths[ 1 ] ) }%</span>
				</div>
			) }
		</div>
	);
}
