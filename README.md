# React Storefront

Build and deploy e-commerce progressive web apps in record time.

[Full Guides, API Documentation, and Examples](https://pwa.moovweb.com/)

# Example Site

[Example Site Built with React Storefront](https://react-storefront-boilerplate.moovweb.cloud)

You can create a local copy of this site using `create-react-storefront` to use as a starting point for your own site:

```
npm install -g create-react-storefront
create-react-storefront my-site
```

## License

All rights reserved.

## Contributing

To contribute to react-storefront:

1. Make a branch from `master`
2. Make your changes
3. Add tests
4. Verify all tests pass by running `yarn test`
5. Add an item to the Change Log in readme.md.  Use your best judgement as to whether your change is a patch, minor release, or major release.  We'll ensure that the correct version number is assigned before it is released.
6. Create a PR.

## Development

First, clone the repo and run yarn to install dependencies

```
yarn
```

To use your local copy of react-storefront when developing apps, in your clone of this repo, run:

```
yarn link:all
```

To automatically transpile your code when you make changes, run:

```
yarn watch
```

Then, in your app's root directory run:

```
npm link react-storefront && npm link babel-plugin-react-storefront && npm link react-storefront-moov-xdn && npm link react-storefront-middleware
```

## Publishing

To publish a release, run:

```
yarn release
```

## Changelog

### 6.7.0

* Browsers that support source maps will now display original react-storefront source code when debugging.
* Changes to `Filter` and `FilterButton`:
  * adds `LoadMask` into `Filter`'s `facetGroups` block when model is loading
  * disables clear all button when model is loading
  * clear all button semantics fixed: use `<button>` instead `<a>` w/o `href` attribute
* Added AMP analytics when using AnalyticsProvider
* Added ability to pass amp-analytics attributes

### 6.6.2

* Handle `content-type: text/plain` in post bodies.

### 6.6.1

* Fixed posting from AMP when served from Google cache by adding the correct CORS headers.

### 6.6.0

* Fixed a bug where `ImageSwitcher`'s `thumbs` class is not applied when rendering AMP.
* Added customization props to `Rating`
* Added ability to add plugins to client webpack bundle
* Added `minimumTextLength` to `SearchModelBase`
* Added `AmpModal` component based on `<amp-lightbox>`.
* Added `AnalyticsProvider` for loading analytics on mount
* Fixes a layout issue with the `Drawer` component on iOS <= 10

### 6.5.0

* Removed extraneous logging of config on every request.
* `Menu` now renders children so you can add custom controls.
* Fixed a bug where an error would be thrown when posting application/json data with ESL enabled or posting an empty body.

### 6.4.0

* Added `name` prop to `QuantitySelector` to make it easier to submit the value when rendering AMP.
* Fixed a bug where multipart/form-data requests were not parsed properly.

### 6.3.0

* `fetch` now supports the `redirect` option with values `"follow"`, `"error"`, and `"manual"`.
* Added `x-rsf-routes` header to get available route information.

### 6.2.0

* Added `searchButtonVariant` and `showClearButton` props to `SearchDrawer` to give you greater control over the behavior of the search input.
* Fixes an issue where the page scrolls to the top when a route with a `proxyUpstream` handler runs on the client.
* Added `notFoundSrc` prop to `Image` component which will be used in case the primary image source fails to load
* TTF files are now processed by webpack file loader
* Fixed a bug where links were unresponsive until all JavaScript was fully loaded.

### 6.1.1

* Fixes a bug that resulted in an error from mst-middleware about rendering circular JSON when the user opens the main menu.

### 6.1.0

* `fetch` now supports inflating responses with `content-encoding: gzip`
* `<Track>` now allows you to map triggers to events.  For example: `<Track trigger={{ onVisible: 'productShown', onClick: 'productClicked' }}>`
* `<Link>` now has a `onVisible` prop that you can use to be notified when a link is scrolled into the viewport.
* `withGlobalState(request, callback, localState)` now passes `request` to the `callback`.
* Removed proxy-polyfill, which was causing errors when using analytics in IE11. If you plan to support IE11 and use analytics, you must call `analytics.fire('eventName', data)` instead of the proxied methods like `analytics.eventName(data)`.

### 6.0.3

* Properly handle vendor chunks for components shared between pages.

### 6.0.2

* Fixed a bug causing the Filter component's apply button to be hidden on iOS.

### 6.0.1

* Corrected some out-of-date peerDependencies.

### 6.0.0

* Upgraded to mobx 4 and mobx-state-tree 3
* Upgraded to babel 7
* Upgraded to webpack 4
* Upgraded to material-ui@3.8.1

### 5.13.0

* Changes to `Filter` and `FilterButton`:
  * adds `LoadMask` into `Filter`'s `facetGroups` block when model is loading
  * disables clear all button when model is loading
  * clear all button semantics fixed: use `<button>` instead `<a>` w/o `href` attribute

### 5.12.1

* Fixes a layout issue with the `Drawer` component on iOS <= 10

### 5.12.0

* Added `AnalyticsProvider` for loading analytics on mount

### 5.11.0

* Added `AmpModal` component based on `<amp-lightbox>`.

### 5.10.2

* Fixed where links were unresponsive until all JavaScript was fully loaded.
* Removed extraneous console.log calls.

### 5.10.1

* Added `notFoundSrc` prop to `ImageSwitcher` and handle missing images before the app mounts.

### 5.10.0

* Added `searchButtonVariant` and `showClearButton` props to `SearchDrawer` to give you greater control over the behavior of the search input.
* Fixed an issue where the page scrolls to the top when a route with a `proxyUpstream` handler runs on the client.
* Added `notFoundSrc` prop to `Image` component which will be used in case the primary image source fails to load

### 5.9.0

* Removed proxy-polyfill, which was causing errors when using analytics in IE11. If you plan to support IE11 and use analytics, you must call `analytics.fire('eventName', data)` instead of the proxied methods like `analytics.eventName(data)`.

### 5.8.2

* Fixed a bug causing the Filter component's apply button to be hidden on iOS.

### 5.8.1

* Switch Webpack Bundle Analyzer to static mode so that analysis can be saved by CI

### 5.8.0

* Added a `state` field to `BreadcrumbModel` so that state can be passed to skeletons when the user clicks on a breadcrumb.
* Added support for setting bundle analyzer mode using `ANALYZER_MODE` env variable.

### 5.7.1

* Fixed case error with importing lodash/isFunction in Router.

### 5.7.0

* Added `cookie` helper method to `Response`
* Replaced regular `<iframe>` with `<amp-iframe>` when rendering AMP.
* Replaced YouTube `<iframe>` with `<amp-youtube>` when rendering AMP.
* Removed extra padding at the bottom of the Drawer component.
* Improved accessibility of QuantitySelector and ButtonSelector.

### 5.6.3

* Improved error handling for SSR.

### 5.6.2

* Fix layout issue with Filter title bar.
* Added warning for setting cookies on cached route

### 5.6.1

* Fix for production webpack builds with no options

### 5.6.0

* Fix errors in SearchResultModelBase when filtering after paging.
* Runs `yarn link:all` during CI builds to ensure that linking will work properly.
* Transition to PWA and open filter/sort from AMP.
* Added `variant="drawer|menu"` to `FilterButton`.  The default is "`drawer`".

### 5.5.0

* Added `envVariables` to webpack server options
* Added ability to set asset path base

### 5.4.0

* Added `itemRenderer` prop to `Menu`

### 5.3.2

* Fixes an issue with Chrome 71 which prevents async loading of scripts by the service worker.

### 5.3.1

* Fix bugs related to production builds

### 5.3.0

* Code is now transpiled to ES5 before publishing
* Bundle size reduced by about 20%
* Can now run your build with an environment variable `ANALYZE=true` to see client build stats in your browser.

### 5.2.4

* Fixed a bug with sending redirects in response to POST requests from AMP.

### 5.2.3

* Prevents errors when webpack's OpenBrowserPlugin fails

### 5.2.2

* Fixed bug where all analytics targets would result in AMP event triggers being rendered, even if they don't support AMP.
* Removed some unused dependencies.

### 5.2.1

* Fixed vertical alignment of + / - icons in QuantiySelector

### 5.2.0

* You can now display the main menu on the right by setting `<AppBar menuAlign="right"/>` and `<Menu align="right"/>`.
* You can disable the "menu" label below the main menu button by setting `<AppBar menuIconProps={{ label: false }}/>`
* You can now provide a custom eslint config for webpack client and server builds.
* Fix bug where an empty popup would show when the user hovers over a NavTab without a menu on desktop.

### 5.1.1

* Fixed error when attempting to redirect from http to https.

### 5.1.0

* Added x-rsf-response-type and x-rsf-handler headers
* TabPanel's onChange prop no longer requires selected to be controlled.

### 5.0.4

* TabPanel is now controllable via a new `onChange` prop.
* Fixed bug in Container that would cause horizontal scrollbars to display on the window body.

### 5.0.3

* Fix CSS syntax error in LoadMask that could cause CSS not to load properly app-wide
* Reduce latency when serving static assets

### 5.0.2

* Corrected peerDependencies by adding "react-transition-group" and removing "react-css-transition-group"

### 5.0.1

* Improved performance of page transitions by setting `app.loading` to `true` in `PageLink` to eliminate a reconciliation cycle.
* The service worker now excludes mp4 videos from the catch-all runtime route to work around a known issue with videos and service workers in Safari.

### 5.0.0

* Upgrade to Material UI 3
* Improved responsive capabilities of many components
* NavTabs can now have menus
* Menu icon is now animated

### 4.10.1

* Added option to override selectedIndex in ImageSwitcher

### 4.10.0

* AMP analytics event data is now automatically generated based on configured targets.
* Added support for pageview events in AMP.
* Adds support for res.arrayBuffer() to react-storefront's internal fetch implementation.  This allows developers to fetch binary data as a buffer.

### 4.9.0

* Prefetching now ramps up over the course of 25 minutes by default to ease the load on servers after clearing the cache during deployment

* Removes some assets from the precache manifest that don't need to be prefetched.

### 4.8.1

* You can now set a custom content-type using `response.set('content-type', contentType)`.

### 4.8.0

* You can now override `<meta>` tags using `react-helmet`.

* Now throws an error in development when a cache handler runs during non-GET request

* Removes set-cookie headers when route has a cache handler with server maxAgeSeconds > 0.

* Automatically caches all proxied images and fonts for a day

### 4.7.0

* ExpandableSection's expanded state can now be controlled via an expanded prop

### 4.6.2

* Fixed bug with Referrer-Policy header.

### 4.6.1

* Added Referrer-Policy: no-referrer-when-downgrade response header

### 4.6.0

* Added `response.json()` helper method for sending JSON data
* Fixed ShowMore infinity scrolling bug

### 4.5.1

* Added `X-Frame-Options: SAMEORIGIN` response header by default.

### 4.5.0

* `response.redirect(url, status)` no longer requires you to call response.send() afterwards. 
* Fixed bug where `<Image lazy/>` and `<Link prefetch="visible"/>` elements would eager fetch when hidden by upgrading react-visibility-sensor.

### 4.4.2

* Fixed XXS vulnerability where code could be injected via the URL into the canonical link tag.

### 4.4.1

* Moved proxy-polyfill to dependencies.

### 4.4.0

* Static assets are now cached at the network edge.
* s-maxage is now only removed when there is no outer edge cache.

### 4.3.0

* Added `anchorProps` to Link
* Added analytics support for IE9+ via the addition of proxy-polyfill

### 4.2.0

* Added onSuccess prop to `Track`
* Prefetching now automatically resumes once page navigation is complete.

### 4.1.0

 * Added `ProductModelBase.basePrice`
 * `ProductModelBase.price` is now a view that returns the `price` of the selected size or, if not present, the `basePrice`.
 * `ButtonSelector` can now display a CSS color code instead of an image via the new `color` field on `OptionModelBase`
 * `ButtonSelector` can now be configured to display a strike through when disabled by setting `strikeThroughDisabled`.  The angle can be controlled via `strikeThroughAngle`.

### 4.0.0

* Renamed to react-storefront and published on npmjs.org
* Routes now automatically fire pageView analytics events.  The `track` handler module has been removed
* The new `<Track>` component let's you track interactions with analytics declaratively.
* CommerceAnalyticsTarget and all subclasses have been moved to a separate package called 'moov-pwa-analytics'
* Many methods of CommerceAnalyticsTarget have a new signature.  All event methods now take a single options object.  Please check your calls to methods on `react-storefront/analytics` to make sure they match the updated signatures.
* Built in models in `react-storefront/model` no longer fire analytics events.  Analytics events are only fired front components.
* AMP analytics are now supported.

### 3.2.0

* You can now return state objects from `proxyUpstream` handlers to render the PWA.  Return null or undefined to render the proxied page.

### 3.1.0

* Skeletons are no longer fullscreen.  Pages remain hidden while `app.loading` is `true`, instead of being covered by the LoadMask/Skeleton.

### 3.0.0

* Pages now keeps one page of each type hidden in the DOM to make navigating back and forward much faster.  
* AppModelBase.applyState has been optimized to minimize rerendering of observer components.
* ResponsiveTiles has been optimized to render faster.

### 2.6

* Renamed Breadcrumbs component to BackNav.  It no longer tags an array of breadcrumbs, it now takes a single url and text.

* Created a new Breadcrumbs component for displaying multiple breadcrumbs.

### 2.5

* The request parameter passed to fromServer handlers has been refactored.  The "path" property has been deprecated in favor of separate "pathname" and "search" properties.
* Added a new `UpdateNotification` component that notifies the user when a new version of the app is available.
* The service worker will now only load HTML from the cache when coming from AMP or when launching from the homescreen.

### 2.4

* Adds the ability to reuse product thumbnails as the main product image in the PDP skeleton when navigating from PLP to PDP.

### 2.3.1

* Fixed `Link` bug which formatted URL's incorrectly
* Fixed issue where prefetched results are deleted when new SW is installed

### 2.3

* Added `SearchDrawer`, which replaces `SearchPopup`.

### 2.2

* You can now perfect proxy and transform pages from the upstream site using the new `proxyUpstream` handler. As a result, support for `requestHeaderTransform({ fallbackToAdapt: true })` has been removed.  Instead, simple add a `fallback(proxyUpstream())` handler to your router.

### 2.1

* Improved error handling with react-redbox and sourcemapped stacktraces for server-side errors
* Added react error boundary to catch errors while rendering and display a component stack trace.
* Automatically relay `set-cookie` headers from `fetch` calls to upstream APIs when not caching on the server.
* Added `fetchWithCookies` to automatically forward all cookies when calling upstream APIs.

### 2.0

* Support for moovsdk
* Refactored handler signature to `handler(params, request, response)`
* Renamed `ShowMoreButton` to `ShowMore` and added `infiniteScroll` prop
* Functionality for moov_edge_request_transform, moov_edge_response_transform, moov_request_header_transform, index, and moov_response_header transform are not standardized in `platform/*` modules.
* `moov-react-dev-server` is no longer needed
* new `ButtonSelector` component for color and size selections
* App state is automatically recorded in `window.history.state` so back and forward transitions are instantaneous.
* AMP Form POST is now supported and multipart encoded request bodies are parsed automatically.
* Added `Skeleton` components for creating custom loading skeletons

