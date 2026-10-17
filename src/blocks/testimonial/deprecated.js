import { useBlockProps, RichText } from '@wordpress/block-editor';
import metadata from './block.json';

const v1 = {
	attributes: metadata.attributes,
	save( { attributes } ) {
		const {
			quote,
			authorName,
			authorRole,
			avatarUrl,
			rating,
			showRating,
			showAvatar,
			avatarLayout,
			avatarShape,
			showQuoteMark,
			textAlign,
			ratingColor,
			quoteColor,
			quoteFontSize,
			authorColor,
			authorFontSize,
			roleColor,
			roleFontSize,
			avatarSize,
			quoteMarkColor,
			cardBackgroundColor,
			cardBorderColor,
			cardBorderWidth,
			cardBorderRadius,
			cardPaddingTop,
			cardPaddingBottom,
			cardPaddingLeft,
			cardPaddingRight,
			boxShadow,
		} = attributes;

		const blockProps = useBlockProps.save( {
			className: [
				'gravisain-testimonial',
				`align-${ textAlign || 'left' }`,
				`avatar-layout-${ avatarLayout || 'left' }`,
				`avatar-shape-${ avatarShape || 'circle' }`,
				showQuoteMark ? 'has-quote-mark' : '',
				boxShadow ? 'has-shadow' : '',
			]
				.filter( Boolean )
				.join( ' ' ),
			style: {
				'--testi-bg': cardBackgroundColor || '#ffffff',
				'--testi-border': cardBorderColor || 'rgba(0, 0, 0, 0.08)',
				'--testi-border-width': `${ cardBorderWidth ?? 1 }px`,
				'--testi-radius': `${ cardBorderRadius ?? 12 }px`,
				'--testi-pt': `${ cardPaddingTop ?? 40 }px`,
				'--testi-pb': `${ cardPaddingBottom ?? 40 }px`,
				'--testi-pl': `${ cardPaddingLeft ?? 40 }px`,
				'--testi-pr': `${ cardPaddingRight ?? 40 }px`,
				'--testi-rating-color': ratingColor || '#fbbf24',
				'--testi-quote-color': quoteColor || '#334155',
				'--testi-quote-size': `${ quoteFontSize ?? 18 }px`,
				'--testi-author-color': authorColor || '#0f172a',
				'--testi-author-size': `${ authorFontSize ?? 16 }px`,
				'--testi-role-color': roleColor || '#64748b',
				'--testi-role-size': `${ roleFontSize ?? 14 }px`,
				'--testi-avatar-size': `${ avatarSize ?? 56 }px`,
				'--testi-quotemark-color': quoteMarkColor || 'rgba(79, 70, 229, 0.1)',
				'--testi-text-align': textAlign || 'left',
			},
		} );

		const stars = Array.from( { length: 5 }, ( _, i ) => ( i < rating ? '★' : '☆' ) );

		return (
			<div { ...blockProps }>
				{ showRating && (
					<div className="gravisain-testimonial__rating">
						{ stars.join( '' ) }
					</div>
				) }

				{ quote && (
					<RichText.Content
						tagName="p"
						className="gravisain-testimonial__quote"
						value={ quote }
					/>
				) }

				<div className="gravisain-testimonial__author-box">
					{ showAvatar && avatarUrl && (
						<div className="gravisain-testimonial__avatar-wrap">
							<img src={ avatarUrl } alt={ authorName } />
						</div>
					) }
					<div className="gravisain-testimonial__author-details">
						{ authorName && (
							<RichText.Content
								tagName="h4"
								className="gravisain-testimonial__author-name"
								value={ authorName }
							/>
						) }
						{ authorRole && (
							<RichText.Content
								tagName="span"
								className="gravisain-testimonial__author-role"
								value={ authorRole }
							/>
						) }
					</div>
				</div>
			</div>
		);
	},
};

export default [ v1 ];
