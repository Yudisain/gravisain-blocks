import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Section } from '../../components/Section.jsx';
import { Container } from '../../components/Container.jsx';
import { Image } from '../../components/Image.jsx';
import parseCustomCSS from '../../controls/parseCustomCSS';
import { getHeroCSSVariables } from './utils';

export default function save({ attributes }) {
	const { 
		layout, 
		background, 
		overlay, 
		spacing, 
		eyebrow, 
		title, 
		description, 
		primaryButton, 
		secondaryButton, 
		innerContainerMaxWidth,
		media = {}, 
		anchor, 
		customClassName, 
		customCSS,
		eyebrowTypography = {},
		eyebrowColor,
		titleTypography = {},
		titleColor,
		primaryButtonTypography = {},
		secondaryButtonTypography = {},
	} = attributes;

	const blockProps = useBlockProps.save({
		id: anchor || undefined,
		className: `gravisain-hero hero-layout-${layout} ${customClassName || ''}`.trim(),
		style: {
			...parseCustomCSS(customCSS),
			...getHeroCSSVariables(attributes)
		},
	});

	return (
		<Section 
			{...blockProps} 
			background={background} 
			overlay={overlay} 
			spacing={spacing}
		>
			<Container maxWidth="xl" className="hero-container" style={{ maxWidth: innerContainerMaxWidth || undefined }}>
				<div className={`hero-layout hero-layout-${layout}`}>
					<div className="hero-content">
						{!RichText.isEmpty(eyebrow) && (
							<RichText.Content
								tagName="span"
								className="hero-eyebrow"
								value={eyebrow}
							/>
						)}
						
						<RichText.Content
							tagName="h1"
							className="hero-title"
							value={title}
						/>

						<RichText.Content
							tagName="p"
							className="hero-description"
							value={description}
						/>

						<div className={`hero-button-group ${layout === '1-column' ? 'center' : ''}`}>
							{!RichText.isEmpty(primaryButton.text) && (
								<a href={primaryButton.url} className={`gravisain-button gravisain-button--${primaryButton.style} primary-btn`}>
									<RichText.Content value={primaryButton.text} />
								</a>
							)}
							
							{!RichText.isEmpty(secondaryButton.text) && (
								<a href={secondaryButton.url} className={`gravisain-button gravisain-button--${secondaryButton.style} secondary-btn`}>
									<RichText.Content value={secondaryButton.text} />
								</a>
							)}
						</div>
					</div>
					
					{layout !== '1-column' && media.url && (
						<div className="hero-media-wrapper">
							<Image src={media.url} alt={media.alt || 'Hero media'} />
						</div>
					)}
				</div>
			</Container>
		</Section>
	);
}
