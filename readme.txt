=== Gravisain Blocks ===
Contributors: yudisain, gravisain
Tags: blocks, page builder, editor
Requires at least: 6.2
Tested up to: 7.1
Stable tag: 1.0.0
Requires PHP: 7.4
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Modular Gutenberg blocks with responsive design controls for website creation.

== Description ==

Gravisain Blocks provides a collection of responsive blocks for the WordPress block editor (Gutenberg), allowing you to create structured page layouts directly within the native editor.

Each block includes responsive controls across desktop, tablet, and mobile devices, with settings organized into General, Style, and Advanced tabs.

= Custom Blocks Include =
* **FAQ Accordion & Item** – Create interactive accordions with customizable item gaps, width controls, dynamic state styling, and flexible toggle icons (`arrow-down-alt2`, `plus/minus`, `chevron-down`).
* **Advanced Heading** – Responsive typography with device-specific font sizes, line heights, alignments, gradient text, highlight styling, and custom margins/paddings.
* **Advanced Button & Buttons Group** – Create responsive button groups or standalone buttons with icon placement (`left`, `right`, `top`), flexible alignment, border radius, and hover animations.
* **Row Layout & Column** – Responsive grid and flex row containers with column spans across Desktop, Tablet, and Mobile, customizable gutters, backgrounds, and overlays.
* **Section / Container** – Flexible section wrapper with responsive width (`px`, `%`), minimum height (`px`, `vh`), vertical content alignment (`top`, `center`, `bottom`, `stretch`), and overflow controls.
* **Info Box & Feature Card** – Feature cards with Dashicon presets or custom images, flexible icon positioning (`top`, `left`, `right`), hover animations, and custom borders/shadows.
* **Testimonials Card** – Display client reviews with 1-5 star ratings, flexible avatar layouts (`left`, `top`, `right`), avatar shapes (`circle`, `rounded`, `square`), and real-time state styling.
* **Features Grid** – Responsive feature grid layouts with customizable column counts, row/column gaps, and inner paddings.
* **Count Up & Countdown Timer** – Animated number counters and evergreen/fixed date countdown timers with typography and border styling.
* **Form & Input Fields** – Contact and form fields built directly with Gutenberg blocks.
* **Progress Bar** – Visual progress indicators with custom percentages, labels, and color styling.
* **Tabs & Tab Pane** – Horizontal and vertical tab interfaces with independent tab content canvases and active/inactive state styling.
* **Table of Contents** – Automatically generate anchor links from your page or post headings.
* **Table & Google Maps** – Responsive data tables and interactive Google Maps embeds.
* **Icon & Icon List** – Dashicons/SVG presets with custom sizing, background circles, borders, and spacing.
* **Lottie Animations** – Embed interactive JSON Lottie animations with speed and loop controls.
* **Hero Section & Modal Popup** – Hero banners and interactive modal dialogs.
* **Spacer / Divider** – Space dividers with height controls across device breakpoints.
* **Advertisement / Ad Space** – Structured Google AdSense ad slots (via Publisher ID and Slot ID) and clickable image banners with responsive controls.

= Key Features =
* **Native Editor Integration:** Built with WordPress core block standards and dynamic CSS properties for consistent editor-to-frontend display.
* **Clean Performance:** Vanilla JavaScript on the frontend without unnecessary external library dependencies.
* **Organized Inspector:** Block settings logically structured across General, Style, and Advanced tabs.

== Installation ==

1. Upload the `gravisain-blocks` folder to the `/wp-content/plugins/` directory, or install directly through the WordPress plugins screen.
2. Activate the plugin through the 'Plugins' menu in WordPress.
3. Open any page or post in the Gutenberg Block Editor and click the '+' inserter to find the 'Gravisain Blocks' category.

== Frequently Asked Questions ==

= Which themes are compatible with Gravisain Blocks? =
Gravisain Blocks is compatible with any WordPress theme that supports the Block Editor (Gutenberg), including block themes and classic themes.

= Does this plugin require jQuery? =
No. Frontend scripts use Vanilla JavaScript without jQuery dependencies.

= Are block assets loaded on every page? =
No. Styles and scripts for each block are only enqueued when that block is present on the page.

== External Services ==

This plugin utilizes external services to deliver typography fonts, interactive map embeds, advertising units, and optional login security protection:

1. **Google Fonts**
* **Service Name:** Google Fonts
* **Provider:** Google LLC
* **Usage:** Used to render typography fonts in Gutenberg blocks when non-system fonts are chosen in block typography settings (e.g. Advanced Heading, Hero, Advanced Text). The plugin loads stylesheets from `https://fonts.googleapis.com` and web font files from `https://fonts.gstatic.com`.
* **What Data is Sent and When:** When a user views a page containing blocks configured with Google Fonts, the visitor's browser sends an HTTP GET request to Google servers including standard browser request headers (such as IP address and User-Agent) to download the requested font files. No personal identifiable information (PII) is collected or stored by this plugin.
* **Terms of Service:** https://policies.google.com/terms
* **Privacy Policy:** https://policies.google.com/privacy

2. **Google Maps Embed**
* **Service Name:** Google Maps Embed
* **Provider:** Google LLC
* **Usage:** Used when the Google Maps block (`gravisain/google-maps`) is added to a page or post to display an interactive map based on the location entered by the editor. The block embeds an iframe from `https://maps.google.com/maps`.
* **What Data is Sent and When:** When a visitor views a page containing the Google Maps block, the visitor's browser loads the map iframe directly from Google servers, sending standard browser request headers (such as IP address and User-Agent) and the configured location query parameters.
* **Terms of Service:** https://policies.google.com/terms
* **Privacy Policy:** https://policies.google.com/privacy

3. **Google AdSense (Optional)**
* **Service Name:** Google AdSense
* **Provider:** Google LLC
* **Usage:** Used only when the Advertisement / Ad Space block (`gravisain/ad`) is configured in "Google AdSense" mode with a valid Publisher ID (`ca-pub-xxx`) and Slot ID. The block renders a structured `<ins class="adsbygoogle">` unit.
* **What Data is Sent and When:** When a visitor views a page containing an active AdSense ad unit, the visitor's browser communicates with Google AdSense servers to retrieve relevant ad content, transmitting standard browser request data.
* **Terms of Service:** https://policies.google.com/terms
* **Privacy Policy:** https://policies.google.com/privacy

4. **Cloudflare Turnstile (Optional)**
* **Service Name:** Cloudflare Turnstile
* **Provider:** Cloudflare, Inc.
* **Usage:** Used only when explicitly enabled by an administrator under `Gravisain > Login Security` and valid API keys are configured. When enabled, it enqueues the official Turnstile API script (`https://challenges.cloudflare.com/turnstile/v0/api.js`) on `wp-login.php` and verifies verification tokens with Cloudflare's API (`https://challenges.cloudflare.com/turnstile/v0/siteverify`) to protect against brute-force login attacks.
* **Terms of Service:** https://www.cloudflare.com/website-terms/
* **Privacy Policy:** https://www.cloudflare.com/privacypolicy/

== Source Code & Build ==

In compliance with WordPress.org Guidelines #1 and #4 (GPL & Open Source Transparency):
* The uncompiled source code for all blocks is included in the `src/` directory.
* Public development repository: https://github.com/yudisain/gravisain-blocks
* Build instructions:
  1. Clone repository: `git clone https://github.com/yudisain/gravisain-blocks.git`
  2. Install dependencies: `npm install`
  3. Compile assets: `npm run build`

== Changelog ==

= 1.0.0 =
* Initial release.
