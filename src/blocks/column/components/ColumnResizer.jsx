import { useState, useRef, useEffect } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';
import { SVG, Path } from '@wordpress/components';

export default function ColumnResizer( { clientId } ) {
	const [ isDragging, setIsDragging ] = useState( false );
	const resizerRef = useRef( null );
	const initialData = useRef( null );

	const { updateBlockAttributes } = useDispatch( 'core/block-editor' );
	
	const { block, nextBlock, parentBlock } = useSelect( ( select ) => {
		const { getBlock, getBlockRootClientId, getBlocks } = select( 'core/block-editor' );
		const parentId = getBlockRootClientId( clientId );
		const siblings = getBlocks( parentId );
		const blockIndex = siblings.findIndex( ( b ) => b.clientId === clientId );
		
		return {
			block: siblings[ blockIndex ],
			nextBlock: siblings[ blockIndex + 1 ], // May be undefined if it's the last column
			parentBlock: getBlock( parentId ),
		};
	}, [ clientId ] );



	const getPercentageWidth = ( cssWidth ) => {
		if ( ! cssWidth ) return null;
		// Extract number from "50%"
		const match = cssWidth.match( /^([\d.]+)%$/ );
		return match ? parseFloat( match[ 1 ] ) : null;
	};

	const onMouseDown = ( e ) => {
		e.preventDefault();
		e.stopPropagation();

		const currentWidth = getPercentageWidth( block.attributes.width );
		const nextWidth = getPercentageWidth( nextBlock.attributes.width );

		// If widths are missing, assume equal distribution for fallback
		let resolvedCurrentWidth = currentWidth;
		let resolvedNextWidth = nextWidth;

		if ( ! resolvedCurrentWidth || ! resolvedNextWidth ) {
			const { getBlocks } = window.wp.data.select( 'core/block-editor' );
			const siblingsCount = getBlocks( parentBlock.clientId ).length;
			resolvedCurrentWidth = resolvedCurrentWidth || (100 / siblingsCount);
			resolvedNextWidth = resolvedNextWidth || (100 / siblingsCount);
		}

		// Find the parent row-layout width to calculate percentage changes
		const columnNode = resizerRef.current.closest('.wp-block-gravisain-column');
		const rowNode = columnNode ? columnNode.parentElement : null;
		const nextColumnNode = columnNode ? columnNode.nextElementSibling : null;
		const totalWidthPx = rowNode ? rowNode.offsetWidth : 1000;

		initialData.current = {
			startX: e.clientX,
			startWidth: resolvedCurrentWidth,
			startNextWidth: resolvedNextWidth,
			totalWidthPx: totalWidthPx,
			columnNode,
			nextColumnNode,
			newWidth: resolvedCurrentWidth,
			newNextWidth: resolvedNextWidth
		};

		setIsDragging( true );
		
		// Add dragging class to body to prevent text selection and show resizing cursor globally
		const ownerWindow = resizerRef.current?.ownerDocument?.defaultView || window;
		if ( ownerWindow?.document?.body ) {
			ownerWindow.document.body.classList.add('is-resizing-column');
		}
	};

	useEffect( () => {
		const ownerWindow = resizerRef.current?.ownerDocument?.defaultView || window;

		const onMouseMove = ( e ) => {
			if ( ! isDragging || ! initialData.current ) return;

			const { startX, startWidth, startNextWidth, totalWidthPx, columnNode, nextColumnNode } = initialData.current;
			
			// Calculate pixel difference
			const dx = e.clientX - startX;
			
			// Convert to percentage difference
			const deltaPercent = ( dx / totalWidthPx ) * 100;
			
			let newWidth = startWidth + deltaPercent;
			let newNextWidth = startNextWidth - deltaPercent;

			// Constraints to prevent collapsing (minimum 5%)
			const MIN_WIDTH = 5;
			if ( newWidth < MIN_WIDTH ) {
				newWidth = MIN_WIDTH;
				newNextWidth = startWidth + startNextWidth - MIN_WIDTH;
			} else if ( newNextWidth < MIN_WIDTH ) {
				newNextWidth = MIN_WIDTH;
				newWidth = startWidth + startNextWidth - MIN_WIDTH;
			}

			// Save to initialData for mouseUp
			initialData.current.newWidth = newWidth;
			initialData.current.newNextWidth = newNextWidth;

			// Apply inline styles directly to DOM for 60fps buttery smooth performance without React re-renders
			if ( columnNode ) {
				columnNode.style.flexBasis = `calc(${ newWidth.toFixed( 2 ) }% - var(--gravisain-gap-compensation, 0px))`;
				columnNode.style.maxWidth = `calc(${ newWidth.toFixed( 2 ) }% - var(--gravisain-gap-compensation, 0px))`;
			}
			if ( nextColumnNode ) {
				nextColumnNode.style.flexBasis = `calc(${ newNextWidth.toFixed( 2 ) }% - var(--gravisain-gap-compensation, 0px))`;
				nextColumnNode.style.maxWidth = `calc(${ newNextWidth.toFixed( 2 ) }% - var(--gravisain-gap-compensation, 0px))`;
			}
		};

		const onMouseUp = () => {
			if ( initialData.current ) {
				const { newWidth, newNextWidth, columnNode, nextColumnNode } = initialData.current;
				
				// Dispatch attributes to React only once when drag finishes
				updateBlockAttributes( clientId, { width: `${ newWidth.toFixed( 2 ) }%` } );
				updateBlockAttributes( nextBlock.clientId, { width: `${ newNextWidth.toFixed( 2 ) }%` } );
				
				// Clear inline styles so React can take over
				if ( columnNode ) {
					columnNode.style.flexBasis = '';
					columnNode.style.maxWidth = '';
				}
				if ( nextColumnNode ) {
					nextColumnNode.style.flexBasis = '';
					nextColumnNode.style.maxWidth = '';
				}
			}

			setIsDragging( false );
			initialData.current = null;
			if ( ownerWindow?.document?.body ) {
				ownerWindow.document.body.classList.remove('is-resizing-column');
			}
		};

		if ( isDragging ) {
			ownerWindow.addEventListener( 'mousemove', onMouseMove );
			ownerWindow.addEventListener( 'mouseup', onMouseUp );
		}

		return () => {
			ownerWindow.removeEventListener( 'mousemove', onMouseMove );
			ownerWindow.removeEventListener( 'mouseup', onMouseUp );
			if ( ownerWindow?.document?.body ) {
				ownerWindow.document.body.classList.remove('is-resizing-column');
			}
		};
	}, [ isDragging, clientId, nextBlock?.clientId, updateBlockAttributes ] );

	// Do not render resizer if blocks are not fully loaded in the store yet
	// or if there is no next block to resize against (last column)
	if ( ! block || ! parentBlock || ! nextBlock ) {
		return null;
	}

	return (
		<div
			ref={ resizerRef }
			className={`gravisain-column-resizer ${ isDragging ? 'is-dragging' : '' }`}
			onMouseDown={ onMouseDown }
		>
			<div className="gravisain-resizer-line"></div>
			<div className="gravisain-resizer-handle">
				<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
					<Path fill="currentColor" d="M15.5 12l-4-4-4 4 4 4 4-4zm-8-1h8v2h-8v-2z" />
				</SVG>
			</div>
		</div>
	);
}
