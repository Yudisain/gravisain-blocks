import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl, ToggleControl, TabPanel } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import ServerSideRender from '@wordpress/server-side-render';
import './editor.scss';

export default function Edit( { attributes, setAttributes, name } ) {
	const { 
		postType, postsToShow, columns, gap, 
		showImage, showTitle, showExcerpt, showMeta, showCategory,
		order, orderBy 
	} = attributes;

	const blockProps = useBlockProps( {
		className: `gravisain-posts-grid-preview`,
	} );

	// Fetch post types
	const postTypes = useSelect( ( select ) => {
		const types = select( 'core' ).getPostTypes( { per_page: -1 } );
		return types ? types.filter( pt => pt.viewable ).map( pt => ( { label: pt.labels.name, value: pt.slug } ) ) : [];
	}, [] );

	return (
		<>
			<InspectorControls>
				<TabPanel
					className="gravisain-inspector-tabs"
					activeClass="active-tab"
					tabs={ [
						{
							name: 'general',
							title: __( 'General', 'gravisain-blocks' ),
							className: 'gravisain-tab-general',
						},
						{
							name: 'style',
							title: __( 'Style', 'gravisain-blocks' ),
							className: 'gravisain-tab-style',
						}
					] }
				>
					{ ( tab ) => (
						<div className="gravisain-tab-content">
							{ tab.name === 'general' && (
								<>
									<PanelBody title={ __( 'Query Settings', 'gravisain-blocks' ) } initialOpen={ true }>
										<SelectControl
											label={ __( 'Post Type', 'gravisain-blocks' ) }
											value={ postType }
											options={ postTypes.length > 0 ? postTypes : [ { label: 'Post', value: 'post' }, { label: 'Page', value: 'page' } ] }
											onChange={ ( value ) => setAttributes( { postType: value } ) }
										/>
										<RangeControl
											label={ __( 'Posts to Show', 'gravisain-blocks' ) }
											value={ postsToShow }
											onChange={ ( value ) => setAttributes( { postsToShow: value } ) }
											min={ 1 }
											max={ 100 }
										/>
										<SelectControl
											label={ __( 'Order By', 'gravisain-blocks' ) }
											value={ orderBy }
											options={ [
												{ label: __( 'Date', 'gravisain-blocks' ), value: 'date' },
												{ label: __( 'Title', 'gravisain-blocks' ), value: 'title' },
												{ label: __( 'Menu Order', 'gravisain-blocks' ), value: 'menu_order' },
												{ label: __( 'Random', 'gravisain-blocks' ), value: 'rand' },
											] }
											onChange={ ( value ) => setAttributes( { orderBy: value } ) }
										/>
										<SelectControl
											label={ __( 'Order', 'gravisain-blocks' ) }
											value={ order }
											options={ [
												{ label: __( 'Descending (DESC)', 'gravisain-blocks' ), value: 'DESC' },
												{ label: __( 'Ascending (ASC)', 'gravisain-blocks' ), value: 'ASC' },
											] }
											onChange={ ( value ) => setAttributes( { order: value } ) }
										/>
									</PanelBody>

									<PanelBody title={ __( 'Display Elements', 'gravisain-blocks' ) } initialOpen={ false }>
										<ToggleControl
											label={ __( 'Show Featured Image', 'gravisain-blocks' ) }
											checked={ showImage }
											onChange={ ( value ) => setAttributes( { showImage: value } ) }
										/>
										<ToggleControl
											label={ __( 'Show Category', 'gravisain-blocks' ) }
											checked={ showCategory }
											onChange={ ( value ) => setAttributes( { showCategory: value } ) }
										/>
										<ToggleControl
											label={ __( 'Show Title', 'gravisain-blocks' ) }
											checked={ showTitle }
											onChange={ ( value ) => setAttributes( { showTitle: value } ) }
										/>
										<ToggleControl
											label={ __( 'Show Meta (Date & Author)', 'gravisain-blocks' ) }
											checked={ showMeta }
											onChange={ ( value ) => setAttributes( { showMeta: value } ) }
										/>
										<ToggleControl
											label={ __( 'Show Excerpt', 'gravisain-blocks' ) }
											checked={ showExcerpt }
											onChange={ ( value ) => setAttributes( { showExcerpt: value } ) }
										/>
									</PanelBody>
								</>
							) }

							{ tab.name === 'style' && (
								<PanelBody title={ __( 'Layout Settings', 'gravisain-blocks' ) } initialOpen={ true }>
									<RangeControl
										label={ __( 'Columns (Desktop)', 'gravisain-blocks' ) }
										value={ columns.desktop }
										onChange={ ( value ) => setAttributes( { columns: { ...columns, desktop: value } } ) }
										min={ 1 }
										max={ 6 }
									/>
									<RangeControl
										label={ __( 'Columns (Tablet)', 'gravisain-blocks' ) }
										value={ columns.tablet }
										onChange={ ( value ) => setAttributes( { columns: { ...columns, tablet: value } } ) }
										min={ 1 }
										max={ 4 }
									/>
									<RangeControl
										label={ __( 'Columns (Mobile)', 'gravisain-blocks' ) }
										value={ columns.mobile }
										onChange={ ( value ) => setAttributes( { columns: { ...columns, mobile: value } } ) }
										min={ 1 }
										max={ 4 }
									/>
									<RangeControl
										label={ __( 'Gap (Desktop)', 'gravisain-blocks' ) }
										value={ gap.desktop }
										onChange={ ( value ) => setAttributes( { gap: { ...gap, desktop: value } } ) }
										min={ 0 }
										max={ 100 }
									/>
								</PanelBody>
							) }
						</div>
					) }
				</TabPanel>
			</InspectorControls>

			<div { ...blockProps }>
				<ServerSideRender
					block={ name }
					attributes={{
						postType,
						postsToShow,
						columns,
						gap,
						showImage,
						showTitle,
						showExcerpt,
						showMeta,
						showCategory,
						order,
						orderBy,
					}}
					emptyResponsePlaceholder={
						<div className="gravisain-posts-empty">
							{ __( 'No posts found.', 'gravisain-blocks' ) }
						</div>
					}
				/>
			</div>
		</>
	);
}
