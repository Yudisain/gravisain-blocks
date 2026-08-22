import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import Inspector from './components/Inspector';
import './editor.scss';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const {
		quote,
		authorName,
		authorRole,
		avatarUrl,
		avatarId,
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

	const blockProps = useBlockProps( {
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

	const onSelectMedia = ( media ) => {
		setAttributes( { avatarUrl: media.url, avatarId: media.id } );
	};

	const stars = Array.from( { length: 5 }, ( _, i ) => ( i < rating ? '★' : '☆' ) );

	return (
		<>
			<Inspector { ...props } />
			<div { ...blockProps }>
				{ showRating && (
					<div className="gravisain-testimonial__rating">
						{ stars.join( '' ) }
					</div>
				) }

				<RichText
					tagName="p"
					className="gravisain-testimonial__quote"
					value={ quote }
					onChange={ ( value ) => setAttributes( { quote: value } ) }
					placeholder={ __( 'Enter testimonial text...', 'gravisain' ) }
				/>

				<div className="gravisain-testimonial__author-box">
					{ showAvatar && (
						<div className="gravisain-testimonial__avatar-wrap">
							<MediaUploadCheck>
								<MediaUpload
									onSelect={ onSelectMedia }
									allowedTypes={ [ 'image' ] }
									value={ avatarId }
									render={ ( { open } ) => (
										<Button
											className={
												avatarUrl ? 'image-button' : 'button button-large'
											}
											onClick={ open }
										>
											{ ! avatarUrl ? (
												__( 'Upload Avatar', 'gravisain' )
											) : (
												<img src={ avatarUrl } alt={ authorName } />
											) }
										</Button>
									) }
								/>
							</MediaUploadCheck>
						</div>
					) }
					<div className="gravisain-testimonial__author-details">
						<RichText
							tagName="h4"
							className="gravisain-testimonial__author-name"
							value={ authorName }
							onChange={ ( value ) => setAttributes( { authorName: value } ) }
							placeholder={ __( 'Author Name', 'gravisain' ) }
						/>
						<RichText
							tagName="span"
							className="gravisain-testimonial__author-role"
							value={ authorRole }
							onChange={ ( value ) => setAttributes( { authorRole: value } ) }
							placeholder={ __( 'Company / Role', 'gravisain' ) }
						/>
					</div>
				</div>
			</div>
		</>
	);
}
