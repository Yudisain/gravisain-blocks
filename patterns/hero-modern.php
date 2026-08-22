<?php
/**
 * Pattern: Modern Hero Section
 *
 * @package Gravisain\Blocks
 */

return [
	'slug'        => 'gravisain-blocks/hero-modern',
	'title'       => __( 'Modern Hero Section with Eyebrow and Buttons', 'gravisain-blocks' ),
	'categories'  => [ 'gravisain-heroes' ],
	'description' => __( 'A stunning, high-converting hero banner featuring eyebrow text, bold heading, description, and dual action buttons.', 'gravisain-blocks' ),
	'content'     => '<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|80","bottom":"var:preset|spacing|80","left":"var:preset|spacing|40","right":"var:preset|spacing|40"}}},"backgroundColor":"base","layout":{"type":"constrained","contentSize":"960px"}} -->
<div class="wp-block-group alignfull has-base-background-color has-background" style="padding-top:var(--wp--preset--spacing--80);padding-right:var(--wp--preset--spacing--40);padding-bottom:var(--wp--preset--spacing--80);padding-left:var(--wp--preset--spacing--40)">
	<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"14px","fontStyle":"normal","fontWeight":"600","textTransform":"uppercase","letterSpacing":"1.5px"}},"textColor":"primary"} -->
	<p class="has-text-align-center has-primary-color has-text-color" style="font-size:14px;font-style:normal;font-weight:600;letter-spacing:1.5px;text-transform:uppercase">' . esc_html__( 'NEXT-GENERATION WORDPRESS EXPERIENCE', 'gravisain-blocks' ) . '</p>
	<!-- /wp:paragraph -->

	<!-- wp:heading {"textAlign":"center","level":1,"style":{"typography":{"fontSize":"clamp(2.5rem, 5vw, 4rem)","lineHeight":"1.15","fontWeight":"800"}}} -->
	<h1 class="wp-block-heading has-text-align-center" style="font-size:clamp(2.5rem, 5vw, 4rem);font-weight:800;line-height:1.15">' . esc_html__( 'Build Blazing-Fast Sites With Architectural Precision', 'gravisain-blocks' ) . '</h1>
	<!-- /wp:heading -->

	<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"1.25rem","lineHeight":"1.7"},"spacing":{"margin":{"top":"24px","bottom":"36px"}}}} -->
	<p class="has-text-align-center" style="margin-top:24px;margin-bottom:36px;font-size:1.25rem;line-height:1.7">' . esc_html__( 'Gravisain combines a 100% hybrid PHP architecture with modern Gutenberg blocks, delivering exceptional PageSpeed scores and enterprise-grade maintainability.', 'gravisain-blocks' ) . '</p>
	<!-- /wp:paragraph -->

	<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
	<div class="wp-block-buttons">
		<!-- wp:button {"backgroundColor":"primary","textColor":"base","style":{"border":{"radius":"6px"},"typography":{"fontWeight":"600"}}} -->
		<div class="wp-block-button"><a class="wp-block-button__link has-base-color has-primary-background-color has-text-color has-background wp-element-button" style="border-radius:6px;font-weight:600">' . esc_html__( 'Explore Features', 'gravisain-blocks' ) . '</a></div>
		<!-- /wp:button -->

		<!-- wp:button {"style":{"border":{"radius":"6px","width":"2px"},"typography":{"fontWeight":"600"}},"className":"is-style-outline"} -->
		<div class="wp-block-button is-style-outline"><a class="wp-block-button__link wp-element-button" style="border-width:2px;border-radius:6px;font-weight:600">' . esc_html__( 'Live Documentation', 'gravisain-blocks' ) . '</a></div>
		<!-- /wp:button -->
	</div>
	<!-- /wp:buttons -->
</div>
<!-- /wp:group -->',
];
