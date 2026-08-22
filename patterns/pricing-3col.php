<?php
/**
 * Pattern: 3-Column Pricing Cards
 *
 * @package Gravisain\Blocks
 */

return [
	'slug'        => 'gravisain-blocks/pricing-3col',
	'title'       => __( '3-Column Pricing Table with Featured Tier', 'gravisain-blocks' ),
	'categories'  => [ 'gravisain-pricing' ],
	'description' => __( 'Modern pricing table with highlighted popular plan card.', 'gravisain-blocks' ),
	'content'     => '<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"80px","bottom":"80px","left":"32px","right":"32px"}}},"layout":{"type":"constrained","contentSize":"1160px"}} -->
<div class="wp-block-group alignfull" style="padding-top:80px;padding-right:32px;padding-bottom:80px;padding-left:32px">
	<!-- wp:heading {"textAlign":"center","style":{"typography":{"fontSize":"2.5rem","fontWeight":"800"}}} -->
	<h2 class="wp-block-heading has-text-align-center" style="font-size:2.5rem;font-weight:800">' . esc_html__( 'Flexible Pricing Plans', 'gravisain-blocks' ) . '</h2>
	<!-- /wp:heading -->

	<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"1.125rem"},"spacing":{"margin":{"bottom":"48px"}}}} -->
	<p class="has-text-align-center" style="margin-bottom:48px;font-size:1.125rem">' . esc_html__( 'Choose the perfect tier for your agency or business project.', 'gravisain-blocks' ) . '</p>
	<!-- /wp:paragraph -->

	<!-- wp:columns {"align":"wide","style":{"spacing":{"blockGap":{"top":"24px","left":"24px"}}}} -->
	<div class="wp-block-columns alignwide">
		<!-- wp:column {"style":{"spacing":{"padding":{"top":"36px","right":"28px","bottom":"36px","left":"28px"}},"border":{"radius":"10px","width":"1px","color":"#e2e8f0"}}} -->
		<div class="wp-block-column has-border-color" style="border-color:#e2e8f0;border-width:1px;border-radius:10px;padding-top:36px;padding-right:28px;padding-bottom:36px;padding-left:28px">
			<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1.35rem","fontWeight":"700"}}} -->
			<h3 class="wp-block-heading" style="font-size:1.35rem;font-weight:700">' . esc_html__( 'Starter', 'gravisain-blocks' ) . '</h3>
			<!-- /wp:heading -->
			<!-- wp:paragraph {"style":{"typography":{"fontSize":"2.5rem","fontWeight":"800"},"spacing":{"margin":{"top":"12px","bottom":"20px"}}}} -->
			<p style="margin-top:12px;margin-bottom:20px;font-size:2.5rem;font-weight:800">$49<span style="font-size:1rem;font-weight:500;color:#64748b">/yr</span></p>
			<!-- /wp:paragraph -->
			<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.95rem"}}} -->
			<p style="font-size:0.95rem">✓ ' . esc_html__( '1 WordPress Website', 'gravisain-blocks' ) . '<br>✓ ' . esc_html__( 'Core Hybrid Layouts', 'gravisain-blocks' ) . '<br>✓ ' . esc_html__( '1 Year Updates & Support', 'gravisain-blocks' ) . '</p>
			<!-- /wp:paragraph -->
			<!-- wp:buttons {"style":{"spacing":{"margin":{"top":"24px"}}}} -->
			<div class="wp-block-buttons" style="margin-top:24px">
				<!-- wp:button {"width":100,"style":{"border":{"radius":"6px"}},"className":"is-style-outline"} -->
				<div class="wp-block-button has-custom-width wp-block-button__width-100 is-style-outline"><a class="wp-block-button__link wp-element-button" style="border-radius:6px">' . esc_html__( 'Choose Starter', 'gravisain-blocks' ) . '</a></div>
				<!-- /wp:button -->
			</div>
			<!-- /wp:buttons -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column {"style":{"spacing":{"padding":{"top":"40px","right":"28px","bottom":"40px","left":"28px"}},"border":{"radius":"10px","width":"2px","color":"#4f46e5"}},"backgroundColor":"base"} -->
		<div class="wp-block-column has-border-color has-base-background-color has-background" style="border-color:#4f46e5;border-width:2px;border-radius:10px;padding-top:40px;padding-right:28px;padding-bottom:40px;padding-left:28px">
			<!-- wp:paragraph {"style":{"typography":{"fontSize":"11px","fontWeight":"700","textTransform":"uppercase"},"color":"primary"}} -->
			<p class="has-primary-color has-text-color" style="font-size:11px;font-weight:700;text-transform:uppercase">★ ' . esc_html__( 'MOST POPULAR', 'gravisain-blocks' ) . '</p>
			<!-- /wp:paragraph -->
			<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1.5rem","fontWeight":"700"}}} -->
			<h3 class="wp-block-heading" style="font-size:1.5rem;font-weight:700">' . esc_html__( 'Professional', 'gravisain-blocks' ) . '</h3>
			<!-- /wp:heading -->
			<!-- wp:paragraph {"style":{"typography":{"fontSize":"2.75rem","fontWeight":"800"},"spacing":{"margin":{"top":"12px","bottom":"20px"}}}} -->
			<p style="margin-top:12px;margin-bottom:20px;font-size:2.75rem;font-weight:800">$129<span style="font-size:1rem;font-weight:500;color:#64748b">/yr</span></p>
			<!-- /wp:paragraph -->
			<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.95rem"}}} -->
			<p style="font-size:0.95rem">✓ ' . esc_html__( 'Up to 10 Websites', 'gravisain-blocks' ) . '<br>✓ ' . esc_html__( 'All Premium Block Patterns', 'gravisain-blocks' ) . '<br>✓ ' . esc_html__( 'WooCommerce & Hooked Elements', 'gravisain-blocks' ) . '<br>✓ ' . esc_html__( 'Priority Support', 'gravisain-blocks' ) . '</p>
			<!-- /wp:paragraph -->
			<!-- wp:buttons {"style":{"spacing":{"margin":{"top":"24px"}}}} -->
			<div class="wp-block-buttons" style="margin-top:24px">
				<!-- wp:button {"backgroundColor":"primary","textColor":"base","width":100,"style":{"border":{"radius":"6px"},"typography":{"fontWeight":"700"}}} -->
				<div class="wp-block-button has-custom-width wp-block-button__width-100"><a class="wp-block-button__link has-base-color has-primary-background-color has-text-color has-background wp-element-button" style="border-radius:6px;font-weight:700">' . esc_html__( 'Choose Professional', 'gravisain-blocks' ) . '</a></div>
				<!-- /wp:button -->
			</div>
			<!-- /wp:buttons -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column {"style":{"spacing":{"padding":{"top":"36px","right":"28px","bottom":"36px","left":"28px"}},"border":{"radius":"10px","width":"1px","color":"#e2e8f0"}}} -->
		<div class="wp-block-column has-border-color" style="border-color:#e2e8f0;border-width:1px;border-radius:10px;padding-top:36px;padding-right:28px;padding-bottom:36px;padding-left:28px">
			<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1.35rem","fontWeight":"700"}}} -->
			<h3 class="wp-block-heading" style="font-size:1.35rem;font-weight:700">' . esc_html__( 'Agency Unlimited', 'gravisain-blocks' ) . '</h3>
			<!-- /wp:heading -->
			<!-- wp:paragraph {"style":{"typography":{"fontSize":"2.5rem","fontWeight":"800"},"spacing":{"margin":{"top":"12px","bottom":"20px"}}}} -->
			<p style="margin-top:12px;margin-bottom:20px;font-size:2.5rem;font-weight:800">$299<span style="font-size:1rem;font-weight:500;color:#64748b">/yr</span></p>
			<!-- /wp:paragraph -->
			<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.95rem"}}} -->
			<p style="font-size:0.95rem">✓ ' . esc_html__( 'Unlimited Websites', 'gravisain-blocks' ) . '<br>✓ ' . esc_html__( 'Starter Sites Demo Importer', 'gravisain-blocks' ) . '<br>✓ ' . esc_html__( 'VIP Dedicated Support & Updates', 'gravisain-blocks' ) . '</p>
			<!-- /wp:paragraph -->
			<!-- wp:buttons {"style":{"spacing":{"margin":{"top":"24px"}}}} -->
			<div class="wp-block-buttons" style="margin-top:24px">
				<!-- wp:button {"width":100,"style":{"border":{"radius":"6px"}},"className":"is-style-outline"} -->
				<div class="wp-block-button has-custom-width wp-block-button__width-100 is-style-outline"><a class="wp-block-button__link wp-element-button" style="border-radius:6px">' . esc_html__( 'Choose Agency', 'gravisain-blocks' ) . '</a></div>
				<!-- /wp:button -->
			</div>
			<!-- /wp:buttons -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->
</div>
<!-- /wp:group -->',
];
