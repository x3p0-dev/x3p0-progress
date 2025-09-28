# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.1] - 2025-09-28

### Fixed

- Percentage-based goals should be limited to 100% (i.e., per hundred).
- Default block gap spacing corrected for WordPress 6.8.
- Ensure that editor scripts can be translated.

## [2.0.0] - 2025-09-19

### Added

- WordPress block supports:
  - `__experimentalStyle` (defines a default `blockGap`)
  - `layout` (not editable but uses vertical flex)
  - `shadow`
  - `spacing.blockGap`

### Changed

- Block supports no longer apply to the `<progress>` element. They now apply to the entire block wrapping `<div>`.
- CSS custom properties of `--x3p0-progress--background-color` and `--x3p0-progress--foreground-color` renamed to `--x3p0-progress--color--background` and `--x3p0-progress--color--foreground`.
- The plugin now executes on the `plugins_loaded` hook.

### Removed

- CSS custom property `--x3p0-progress--gap` removed in favor of using Core `blockGap` implementation. Set via `styles.blocks.x3p0/progress.spacing.blockGap` now.
- Old shadow implementation. The block now uses the Core `shadow` support.
- `plugin()` function no longer exists and shouldn't have been used publicly anyway.
- The Hand-Drawn block style was removed in favor of leaving block styles to themes.
- Unused `width` and `widthUnit` block attributes.
- Gradient support for `<progress>` removed for now but may be revisited in the future.

## [1.0.0] - 2022-10-30

### Added

* Literally everything. This is version 1.0, after all.
