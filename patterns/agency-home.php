<?php
/**
 * Pattern: Creative Digital Agency (Dark Edition) - Complete Homepage Template
 *
 * @package Gravisain\Blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Gravisain\Blocks\PatternRegistry;

$gravisain_blocks_agency_content = PatternRegistry::get_template_content( 'agency' );
if ( empty( $gravisain_blocks_agency_content ) ) {
	return [];
}

return [
	'slug'        => 'gravisain-blocks/agency-home',
	'title'       => __( 'Digital Agency (Dark Edition) — Full Homepage', 'gravisain-blocks' ),
	'categories'  => [ 'gravisain-templates', 'gravisain-heroes', 'gravisain-sections' ],
	'description' => __( 'A stunning, high-converting digital agency and creative studio homepage built 100% with Gravisain blocks.', 'gravisain-blocks' ),
	'content'     => $gravisain_blocks_agency_content,
];
