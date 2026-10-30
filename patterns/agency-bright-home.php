<?php
/**
 * Pattern: Creative Digital Agency (Light / Bright Edition) - Complete Homepage Template
 *
 * @package Gravisain\Blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Gravisain\Blocks\PatternRegistry;

$gravisain_blocks_bright_content = PatternRegistry::get_template_content( 'agency-bright' );
if ( empty( $gravisain_blocks_bright_content ) ) {
	return array();
}

return array(
	'slug'        => 'gravisain-blocks/agency-bright-home',
	'title'       => __( 'Digital Agency (Light Edition) — Full Homepage', 'gravisain-blocks' ),
	'categories'  => array( 'gravisain-templates', 'gravisain-heroes', 'gravisain-sections' ),
	'description' => __( 'A clean, vibrant, light-themed digital agency and creative studio homepage built 100% with Gravisain blocks.', 'gravisain-blocks' ),
	'content'     => $gravisain_blocks_bright_content,
);
