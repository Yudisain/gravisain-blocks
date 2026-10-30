<?php
/**
 * Pattern: Call to Action Banner
 *
 * @package Gravisain\Blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

return array(
	'slug'        => 'gravisain-blocks/cta-banner',
	'title'       => __( 'High-Impact Call to Action Banner', 'gravisain-blocks' ),
	'categories'  => array( 'gravisain-cta' ),
	'description' => __( 'A bold conversion banner with heading, description, and action buttons.', 'gravisain-blocks' ),
	'content'     => '<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"64px","bottom":"64px","left":"32px","right":"32px"}}},"backgroundColor":"primary","textColor":"base","layout":{"type":"constrained","contentSize":"840px"}} -->
<div class="wp-block-group alignfull has-base-color has-primary-background-color has-text-color has-background" style="padding-top:64px;padding-right:32px;padding-bottom:64px;padding-left:32px">
	<!-- wp:heading {"textAlign":"center","style":{"typography":{"fontSize":"2.25rem","fontWeight":"800"}}} -->
	<h2 class="wp-block-heading has-text-align-center" style="font-size:2.25rem;font-weight:800">' . esc_html__( 'Ready To Launch Your Next Project?', 'gravisain-blocks' ) . '</h2>
	<!-- /wp:heading -->

	<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"1.15rem"},"spacing":{"margin":{"top":"16px","bottom":"32px"}}}} -->
	<p class="has-text-align-center" style="margin-top:16px;margin-bottom:32px;font-size:1.15rem">' . esc_html__( 'Join developers and creators building next-generation websites with Gravisain.', 'gravisain-blocks' ) . '</p>
	<!-- /wp:paragraph -->

	<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
	<div class="wp-block-buttons">
		<!-- wp:button {"backgroundColor":"base","textColor":"primary","style":{"border":{"radius":"6px"},"typography":{"fontWeight":"700"}}} -->
		<div class="wp-block-button"><a class="wp-block-button__link has-primary-color has-base-background-color has-text-color has-background wp-element-button" style="border-radius:6px;font-weight:700">' . esc_html__( 'Get Gravisain Now', 'gravisain-blocks' ) . '</a></div>
		<!-- /wp:button -->
	</div>
	<!-- /wp:buttons -->
</div>
<!-- /wp:group -->',
);
