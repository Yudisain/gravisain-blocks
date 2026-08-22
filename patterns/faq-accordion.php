<?php
/**
 * Pattern: FAQ Accordion Section
 *
 * @package Gravisain\Blocks
 */

return [
	'slug'        => 'gravisain-blocks/faq-accordion',
	'title'       => __( 'FAQ Accordion Section using Native HTML5 Details', 'gravisain-blocks' ),
	'categories'  => [ 'gravisain-sections' ],
	'description' => __( 'Accessible FAQ section using native Details/Summary blocks with zero JavaScript overhead.', 'gravisain-blocks' ),
	'content'     => '<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"72px","bottom":"72px","left":"32px","right":"32px"}}},"layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group alignfull" style="padding-top:72px;padding-right:32px;padding-bottom:72px;padding-left:32px">
	<!-- wp:heading {"textAlign":"center","style":{"typography":{"fontSize":"2.25rem","fontWeight":"800"}}} -->
	<h2 class="wp-block-heading has-text-align-center" style="font-size:2.25rem;font-weight:800">' . esc_html__( 'Frequently Asked Questions', 'gravisain-blocks' ) . '</h2>
	<!-- /wp:heading -->

	<!-- wp:paragraph {"align":"center","style":{"spacing":{"margin":{"bottom":"40px"}}},"textColor":"secondary"} -->
	<p class="has-text-align-center has-secondary-color has-text-color" style="margin-bottom:40px">' . esc_html__( 'Everything you need to know about Gravisain Theme & Companion Plugins.', 'gravisain-blocks' ) . '</p>
	<!-- /wp:paragraph -->

	<!-- wp:details {"style":{"border":{"width":"1px","radius":"8px","color":"#e2e8f0"},"spacing":{"padding":{"top":"20px","right":"24px","bottom":"20px","left":"24px"},"margin":{"bottom":"16px"}}}} -->
	<details class="wp-block-details has-border-color" style="border-color:#e2e8f0;border-width:1px;border-radius:8px;margin-bottom:16px;padding-top:20px;padding-right:24px;padding-bottom:20px;padding-left:24px">
		<!-- wp:summary {"style":{"typography":{"fontSize":"1.1rem","fontWeight":"600"}}} -->
		<summary style="font-size:1.1rem;font-weight:600">' . esc_html__( 'Why is Gravisain faster than page-builder based themes?', 'gravisain-blocks' ) . '</summary>
		<!-- /wp:summary -->
		<!-- wp:paragraph {"style":{"spacing":{"margin":{"top":"12px"}}}} -->
		<p style="margin-top:12px">' . esc_html__( 'Gravisain uses a strict hybrid PHP architecture where headers, footers, and layouts are rendered server-side with optimized CSS/JS. We do not load heavy client-side UI frameworks or jQuery.', 'gravisain-blocks' ) . '</p>
		<!-- /wp:paragraph -->
	</details>
	<!-- /wp:details -->

	<!-- wp:details {"style":{"border":{"width":"1px","radius":"8px","color":"#e2e8f0"},"spacing":{"padding":{"top":"20px","right":"24px","bottom":"20px","left":"24px"},"margin":{"bottom":"16px"}}}} -->
	<details class="wp-block-details has-border-color" style="border-color:#e2e8f0;border-width:1px;border-radius:8px;margin-bottom:16px;padding-top:20px;padding-right:24px;padding-bottom:20px;padding-left:24px">
		<!-- wp:summary {"style":{"typography":{"fontSize":"1.1rem","fontWeight":"600"}}} -->
		<summary style="font-size:1.1rem;font-weight:600">' . esc_html__( 'Can I use Gravisain Blocks without installing extra page builders?', 'gravisain-blocks' ) . '</summary>
		<!-- /wp:summary -->
		<!-- wp:paragraph {"style":{"spacing":{"margin":{"top":"12px"}}}} -->
		<p style="margin-top:12px">' . esc_html__( 'Yes! Gravisain Blocks utilizes WordPress core Gutenberg blocks and enhances them with curated layout patterns and design tokens.', 'gravisain-blocks' ) . '</p>
		<!-- /wp:paragraph -->
	</details>
	<!-- /wp:details -->

	<!-- wp:details {"style":{"border":{"width":"1px","radius":"8px","color":"#e2e8f0"},"spacing":{"padding":{"top":"20px","right":"24px","bottom":"20px","left":"24px"},"margin":{"bottom":"16px"}}}} -->
	<details class="wp-block-details has-border-color" style="border-color:#e2e8f0;border-width:1px;border-radius:8px;margin-bottom:16px;padding-top:20px;padding-right:24px;padding-bottom:20px;padding-left:24px">
		<!-- wp:summary {"style":{"typography":{"fontSize":"1.1rem","fontWeight":"600"}}} -->
		<summary style="font-size:1.1rem;font-weight:600">' . esc_html__( 'Is Gravisain compatible with WooCommerce?', 'gravisain-blocks' ) . '</summary>
		<!-- /wp:summary -->
		<!-- wp:paragraph {"style":{"spacing":{"margin":{"top":"12px"}}}} -->
		<p style="margin-top:12px">' . esc_html__( 'Absolutely! Gravisain includes deep WooCommerce integration featuring AJAX cart fragments, custom product grid layout controls, and distraction-free checkout.', 'gravisain-blocks' ) . '</p>
		<!-- /wp:paragraph -->
	</details>
	<!-- /wp:details -->
</div>
<!-- /wp:group -->',
];
