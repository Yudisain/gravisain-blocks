import { useBlockProps, RichText } from '@wordpress/block-editor';
import metadata from './block.json';

const v2 = {
	attributes: metadata.attributes,
	save( { attributes } ) {
		const {
			iconType,
			mediaType,
			dashicon,
			imageUrl,
			imageFocalPoint,
			iconSize,
			iconBoxSize,
			iconRadius,
			iconColor,
			iconBackgroundColor,
			textAlign,
			eyebrow,
			showEyebrow,
			eyebrowColor,
			title,
			titleColor,
			titleFontSize,
			description,
			descriptionColor,
			descriptionFontSize,
			linkText,
			showLink,
			linkUrl,
			linkColor,
			cardBackgroundColor,
			cardBorderColor,
			cardBorderWidth,
			cardBorderRadius,
			cardPaddingTop,
			cardPaddingBottom,
			cardPaddingLeft,
			cardPaddingRight,
			hoverEffect,
		} = attributes;

		const icons = {
			star: '★',
			lightning: '⚡',
			shield: '🛡️',
			check: '✓',
			heart: '♥',
			award: '🏆',
		};

		const blockProps = useBlockProps.save( {
			className: [
				'gravisain-info-box-card',
				`align-${ textAlign || 'left' }`,
				hoverEffect && hoverEffect !== 'none' ? `hover-${ hoverEffect }` : '',
			]
				.filter( Boolean )
				.join( ' ' ),
			style: {
				'--info-box-bg': cardBackgroundColor || '#ffffff',
				'--info-box-border': cardBorderColor || 'rgba(0, 0, 0, 0.08)',
				'--info-box-border-width': `${ cardBorderWidth ?? 1 }px`,
				'--info-box-radius': `${ cardBorderRadius ?? 12 }px`,
				'--info-box-pt': `${ cardPaddingTop ?? 32 }px`,
				'--info-box-pb': `${ cardPaddingBottom ?? 32 }px`,
				'--info-box-pl': `${ cardPaddingLeft ?? 28 }px`,
				'--info-box-pr': `${ cardPaddingRight ?? 28 }px`,
				'--info-box-icon-color': iconColor || '#2563eb',
				'--info-box-icon-bg': iconBackgroundColor || 'rgba(37, 99, 235, 0.1)',
				'--info-box-icon-size': `${ iconSize ?? 24 }px`,
				'--info-box-icon-box-size': `${ iconBoxSize ?? 48 }px`,
				'--info-box-icon-radius': `${ iconRadius ?? 10 }px`,
				'--info-box-title-color': titleColor || '#0f172a',
				'--info-box-title-size': `${ titleFontSize ?? 20 }px`,
				'--info-box-desc-color': descriptionColor || '#475569',
				'--info-box-desc-size': `${ descriptionFontSize ?? 15 }px`,
				'--info-box-eyebrow-color': eyebrowColor || '#64748b',
				'--info-box-link-color': linkColor || '#2563eb',
				'--info-box-align':
					textAlign === 'center'
						? 'center'
						: textAlign === 'right'
						? 'flex-end'
						: 'flex-start',
				'--info-box-text-align': textAlign || 'left',
			},
		} );

		return (
			<div { ...blockProps }>
				<div className="gravisain-info-box-icon">
					{ mediaType === 'image' && imageUrl ? (
						<img
							src={ imageUrl }
							alt={ title || 'icon' }
							className="gravisain-info-box-img"
							style={ imageFocalPoint && ( imageFocalPoint.x !== 0.5 || imageFocalPoint.y !== 0.5 ) ? {
								objectPosition: `${Math.round(imageFocalPoint.x * 100)}% ${Math.round(imageFocalPoint.y * 100)}%`,
							} : undefined }
						/>
					) : dashicon ? (
						<span className={ `dashicons dashicons-${ dashicon }` } />
					) : (
						<span>{ icons[ iconType ] || '★' }</span>
					) }
				</div>

				{ showEyebrow && eyebrow && (
					<RichText.Content
						tagName="span"
						className="gravisain-info-box-eyebrow"
						value={ eyebrow }
					/>
				) }

				{ title && (
					<RichText.Content
						tagName="h3"
						className="gravisain-info-box-title"
						value={ title }
					/>
				) }

				{ description && (
					<RichText.Content
						tagName="p"
						className="gravisain-info-box-desc"
						value={ description }
					/>
				) }

				{ showLink && linkText && (
					<a href={ linkUrl || '#' } className="gravisain-info-box-link">
						<RichText.Content value={ linkText } />
					</a>
				) }
			</div>
		);
	},
};

const v1 = {
	attributes: metadata.attributes,
	save( { attributes } ) {
		const {
			iconType,
			mediaType,
			dashicon,
			imageUrl,
			iconSize,
			iconBoxSize,
			iconRadius,
			iconColor,
			iconBackgroundColor,
			textAlign,
			eyebrow,
			showEyebrow,
			eyebrowColor,
			title,
			titleColor,
			titleFontSize,
			description,
			descriptionColor,
			descriptionFontSize,
			linkText,
			showLink,
			linkUrl,
			linkColor,
			cardBackgroundColor,
			cardBorderColor,
			cardBorderWidth,
			cardBorderRadius,
			cardPaddingTop,
			cardPaddingBottom,
			cardPaddingLeft,
			cardPaddingRight,
			hoverEffect,
		} = attributes;

		const icons = {
			star: '★',
			lightning: '⚡',
			shield: '🛡️',
			check: '✓',
			heart: '♥',
			award: '🏆',
		};

		const blockProps = useBlockProps.save( {
			className: [
				'gravisain-info-box-card',
				`align-${ textAlign || 'left' }`,
				hoverEffect && hoverEffect !== 'none' ? `hover-${ hoverEffect }` : '',
			]
				.filter( Boolean )
				.join( ' ' ),
			style: {
				'--info-box-bg': cardBackgroundColor || '#ffffff',
				'--info-box-border': cardBorderColor || 'rgba(0, 0, 0, 0.08)',
				'--info-box-border-width': `${ cardBorderWidth ?? 1 }px`,
				'--info-box-radius': `${ cardBorderRadius ?? 12 }px`,
				'--info-box-pt': `${ cardPaddingTop ?? 32 }px`,
				'--info-box-pb': `${ cardPaddingBottom ?? 32 }px`,
				'--info-box-pl': `${ cardPaddingLeft ?? 28 }px`,
				'--info-box-pr': `${ cardPaddingRight ?? 28 }px`,
				'--info-box-icon-color': iconColor || '#2563eb',
				'--info-box-icon-bg': iconBackgroundColor || 'rgba(37, 99, 235, 0.1)',
				'--info-box-icon-size': `${ iconSize ?? 24 }px`,
				'--info-box-icon-box-size': `${ iconBoxSize ?? 48 }px`,
				'--info-box-icon-radius': `${ iconRadius ?? 10 }px`,
				'--info-box-title-color': titleColor || '#0f172a',
				'--info-box-title-size': `${ titleFontSize ?? 20 }px`,
				'--info-box-desc-color': descriptionColor || '#475569',
				'--info-box-desc-size': `${ descriptionFontSize ?? 15 }px`,
				'--info-box-eyebrow-color': eyebrowColor || '#64748b',
				'--info-box-link-color': linkColor || '#2563eb',
				'--info-box-align':
					textAlign === 'center'
						? 'center'
						: textAlign === 'right'
						? 'flex-end'
						: 'flex-start',
				'--info-box-text-align': textAlign || 'left',
			},
		} );

		return (
			<div { ...blockProps }>
				<div className="gravisain-info-box-icon">
					{ mediaType === 'image' && imageUrl ? (
						<img src={ imageUrl } alt={ title || 'icon' } className="gravisain-info-box-img" />
					) : dashicon ? (
						<span className={ `dashicons dashicons-${ dashicon }` } />
					) : (
						<span>{ icons[ iconType ] || '★' }</span>
					) }
				</div>

				{ showEyebrow && eyebrow && (
					<RichText.Content
						tagName="span"
						className="gravisain-info-box-eyebrow"
						value={ eyebrow }
					/>
				) }

				{ title && (
					<RichText.Content
						tagName="h3"
						className="gravisain-info-box-title"
						value={ title }
					/>
				) }

				{ description && (
					<RichText.Content
						tagName="p"
						className="gravisain-info-box-desc"
						value={ description }
					/>
				) }

				{ showLink && linkText && (
					<span className="gravisain-info-box-link">
						{ linkText }
					</span>
				) }
			</div>
		);
	},
};

export default [ v2, v1 ];
