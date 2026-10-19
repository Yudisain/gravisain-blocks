=== Gravisain Blocks ===
Contributors: yudisain, gravisain
Tags: blocks, page builder, editor
Requires at least: 6.2
Tested up to: 7.1
Stable tag: 1.0.0.1
Requires PHP: 7.4
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

28+ Premium Modular Gutenberg Blocks with dynamic design controls, enabling high-performance website creation.

== Description ==

Gravisain Blocks extends the WordPress block editor with powerful custom blocks and advanced responsive design controls, helping you build fast, accessible, and professional websites directly inside Gutenberg.

Each block is architected with modular components, performance, accessibility, and 1:1 editor-to-frontend visual precision in mind.

Whether you are building landing pages, corporate websites, or complex layouts, Gravisain Blocks provides a modern workflow with 3-tab inspector panels (General, Style, Advanced) right inside the native WordPress editor.

= Custom Blocks Include =
* **FAQ Accordion & Item** – Create interactive accordions with customizable item gaps, width controls, dynamic state styling, and flexible toggle icons (`arrow-down-alt2`, `plus/minus`, `chevron-down`).
* **Advanced Heading** – Responsive typography with device-specific font sizes, line heights, alignments, gradient text, highlight styling, and custom margins/paddings.
* **Advanced Button & Buttons Group** – Create responsive button groups or standalone buttons with icon placement (`left`, `right`, `top`), flexible alignment, border radius, and hover animations (`lift`, `scale`, `glow`).
* **Row Layout & Column** – Responsive grid and flex row containers with column spans across Desktop, Tablet, and Mobile, customizable gutters, backgrounds, and overlays.
* **Section / Container** – Flexible section wrapper with responsive width (`px`, `%`), minimum height (`px`, `vh`), vertical content alignment (`top`, `center`, `bottom`, `stretch`), and overflow controls.
* **Info Box & Feature Card** – High-converting feature cards with Dashicon presets or custom images, flexible icon positioning (`top`, `left`, `right`), hover animations, and custom borders/shadows.
* **Testimonials Card** – Display client reviews with 1-5 star ratings, flexible avatar layouts (`left`, `top`, `right`), avatar shapes (`circle`, `rounded`, `square`), and real-time state styling.
* **Features Grid** – Responsive feature grid layouts with customizable column counts, row/column gaps, and inner paddings.
* **Count Up & Countdown Timer** – Animated number counters and evergreen/fixed date countdown timers with complete typography and border styling.
* **Form & Input Fields** – Contact and marketing forms built directly with Gutenberg blocks.
* **Progress Bar** – Visual progress indicators with custom percentages, labels, and color gradients.
* **Tabs & Tab Pane** – Horizontal and vertical tab interfaces with independent tab content canvases and active/inactive state styling.
* **Table of Contents** – Automatically generate smooth-scrolling anchor links from your page or post headings.
* **Table & Google Maps** – Custom responsive data tables and interactive Google Maps embeds.
* **Icon & Icon List** – Over 1500+ Dashicons/SVG presets with custom sizing, background circles, borders, and spacing.
* **Lottie Animations** – Embed interactive JSON Lottie animations with speed and loop controls.
* **Hero Section & Modal Popup** – Full-width hero banners and interactive modal dialogs.
* **Spacer / Divider** – Responsive space dividers with height controls across device breakpoints.
* **Advertisement / Ad Space** – Google AdSense-ready ad slots and clickable image banners. Paste raw ad network code (AdSense, Ezoic, Media.net, Adsterra) or upload a banner image with optional link, plus responsive alignment, spacing, and an optional "Advertisement" label.

= Key Features =
* **1:1 Editor vs Frontend Accuracy:** Built with dynamic CSS variables (`--block-var`) to ensure that what you see inside the Gutenberg editor matches the frontend pixel-for-pixel.
* **Zero Bloat / Performance Optimized:** Vanilla JS and modular styling ensure fast page speeds without unnecessary React re-renders.
* **3-Tab Inspector Architecture:** Every block features clean, logically separated controls across General, Style, and Advanced tabs.

== Installation ==

1. Upload the `gravisain-blocks` folder to the `/wp-content/plugins/` directory, or install directly through the WordPress plugins screen.
2. Activate the plugin through the 'Plugins' menu in WordPress.
3. Open any page or post in the Gutenberg Block Editor and click the '+' inserter to find the 'Gravisain Blocks' category.

== Frequently Asked Questions ==

= Is Gravisain Blocks compatible with Full Site Editing (FSE) and Block Themes? =
Yes! Gravisain Blocks is 100% compatible with Full Site Editing (FSE), block themes, and classic hybrid themes like the Gravisain Theme.

= Do I need any external dependencies or frameworks like jQuery? =
No. Gravisain Blocks is built with pure ES Modules, React/Gutenberg components, and Vanilla CSS/SCSS. It does not require jQuery or external bloat.

= Does it slow down my website load speed? =
No. Each block only loads the necessary assets when used on a page, keeping your Core Web Vitals optimal.

== External Services ==

This plugin utilizes external services to deliver typography fonts and optional login security protection:

1. **Google Fonts**
* **Service Name:** Google Fonts
* **Provider:** Google LLC
* **Usage:** Used to render typography fonts in Gutenberg blocks when non-system fonts are chosen in block typography settings (e.g. Advanced Heading, Hero, Advanced Text). The plugin loads stylesheets from `https://fonts.googleapis.com` and web font files from `https://fonts.gstatic.com`.
* **What Data is Sent and When:** When a user views a page containing blocks configured with Google Fonts, the visitor's browser sends an HTTP GET request to Google servers including standard browser request headers (such as IP address and User-Agent) to download the requested font files. No personal identifiable information (PII) is collected or stored by this plugin.
* **Terms of Service:** https://policies.google.com/terms
* **Privacy Policy:** https://policies.google.com/privacy

2. **Cloudflare Turnstile (Optional)**
* **Service Name:** Cloudflare Turnstile
* **Provider:** Cloudflare, Inc.
* **Usage:** Used only when explicitly enabled by an administrator under `Gravisain > Login Security` (or `Appearance > Customize > Login Security & Turnstile`) and valid API keys are configured. When enabled, it enqueues the official Turnstile API script (`https://challenges.cloudflare.com/turnstile/v0/api.js`) on `wp-login.php` and verifies verification tokens with Cloudflare's API (`https://challenges.cloudflare.com/turnstile/v0/siteverify`) to prevent brute-force login attacks.
* **Terms of Service:** https://www.cloudflare.com/website-terms/
* **Privacy Policy:** https://www.cloudflare.com/privacypolicy/

== Source Code & Build ==

In compliance with WordPress.org Guidelines #1 and #4 (GPL & Open Source Transparency):
* The uncompiled, human-readable source code for all React/Gutenberg blocks is bundled in the `src/` directory.
* The public development repository is available at: https://github.com/yudisain/gravisain-blocks
* Build instructions:
  1. Clone repository: `git clone https://github.com/yudisain/gravisain-blocks.git`
  2. Install dependencies: `npm install`
  3. Compile assets: `npm run build` (powered by `@wordpress/scripts`)

== Changelog ==

= 1.0.1 =
* Maintenance update and performance improvements.

= 1.0.0.1 =
* Info Box: Added 6 Quick Layout Presets (Top Center, Center Circle, Top Left, Left Inline, Overlap Center, Overlap Left) with 1-click styling.
* Performance and CSS grid layout optimizations.

= 1.0.0 =
* Maintenance update and performance improvements.

= 0.9.3 =
* Maintenance update and performance improvements.

= 0.9.2 =
* Maintenance update and performance improvements.

= 0.9.1 =
* Maintenance update and performance improvements.

= 0.9.0 =
* Initial public release of Gravisain Blocks.
* 28+ Modular Gutenberg blocks with 3-tab inspector panels and 1:1 CSS variable synchronization.
* Added FAQ Accordion, Advanced Heading, Row Layout, Info Box, Testimonials, Features Grid, and Container blocks.
* Full compatibility with WordPress 6.2+ and PHP 7.4+.
