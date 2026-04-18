# Shared Styles Library

This library contains all shared SCSS styles used across both the ecommerce and dashboard applications.

## Structure

```
libs/shared-styles/src/
├── index.scss          # Main entry point
└── styles/             # All style files
    ├── abstracts/      # Variables, mixins, functions
    ├── base/           # Base styles, reset, fonts
    ├── components/     # Component styles
    ├── layout/          # Layout styles
    ├── pages/          # Page-specific styles
    ├── themes/         # Theme files (dark/light)
    └── vendors/        # Third-party styles (PrimeNG, Swiper)
```

## Usage

Both apps import the shared styles in their `styles.scss` file:

```scss
@import 'index.scss';
```

The `stylePreprocessorOptions` in each app's `project.json` includes `libs/shared-styles/src` in the includePaths, allowing the import to resolve correctly.

## Adding New Styles

1. Add your SCSS files to the appropriate folder in `libs/shared-styles/src/styles/`
2. Import them in `libs/shared-styles/src/styles/main.scss` if needed
3. Both apps will automatically pick up the changes

