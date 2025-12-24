# Oxillia Frontend

A modern, feature-rich e-commerce Angular application for cosmetics, built with Angular 20.3, featuring multi-tenant support, server-side rendering (SSR), state management with NgRx, and a comprehensive admin dashboard.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Testing](#testing)
- [Architecture](#architecture)
- [Contributing](#contributing)

## Overview

Oxillia is a feature-based Angular e-commerce application designed for cosmetics retailers. It supports:

- **Multi-tenant Architecture**: Support for multiple brands/companies
- **Server-Side Rendering (SSR)**: Improved performance and SEO
- **State Management**: NgRx for predictable state management
- **Responsive Design**: Mobile-first approach using Tailwind CSS and SCSS
- **Component Library**: PrimeNG and PrimeUIX for enterprise components
- **Type Safety**: Strict TypeScript configuration
- **Dark Mode Support**: Theme switching capabilities

## Tech Stack

### Core Framework
- **Angular**: 20.3.0
- **Node.js**: LTS (18+ recommended)
- **npm**: 9+

### Styling & UI
- **Tailwind CSS**: 3.4.18
- **SCSS**: Advanced styling with variables, mixins, and functions
- **PrimeNG**: 20.4.0 (Enterprise UI Components)
- **PrimeUIX**: 2.0.2 (UI Theme System)

### State Management
- **NgRx Store**: 20.1.0
- **NgRx Effects**: 20.1.0
- **RxJS**: 7.8.0

### Backend Integration
- **Express**: 5.1.0 (for SSR server)
- **Angular Platform Server**: 20.3.0

### Development Tools
- **Angular CLI**: 20.3.13
- **TypeScript**: 5.9.2
- **Karma**: 6.4.0 (Unit Testing)
- **Jasmine**: 5.9.0 (Test Framework)

### Code Quality
- **Prettier**: Configured with 100 character print width
- **PostCSS**: 8.5.6 (CSS Processing)
- **Autoprefixer**: 10.4.22 (Browser Compatibility)

## Project Structure

```
src/
├── app/
│   ├── core/                 # Core business logic (singleton services)
│   │   ├── constants/        # Application constants
│   │   ├── guards/           # Route guards (auth, role-based)
│   │   ├── interceptors/     # HTTP interceptors (auth, error handling)
│   │   ├── models/           # Shared data models
│   │   └── services/         # Core services (API, auth, theme, storage)
│   │
│   ├── features/             # Feature modules (lazy-loaded)
│   │   ├── auth/            # Authentication feature
│   │   │   ├── components/  # Login, register, password reset components
│   │   │   ├── services/    # Auth-specific services
│   │   │   └── store/       # Auth state management
│   │   │
│   │   ├── home/            # Landing page & home feature
│   │   │   ├── components/  # Hero, hero landing, brands, testimonials, etc.
│   │   │   ├── pages/       # Home page composition
│   │   │   └── home.routes.ts
│   │   │
│   │   ├── products/        # Product catalog & details
│   │   │   ├── pages/       # Product listing, detail pages
│   │   │   └── products.ts
│   │   │
│   │   └── integrations/    # Third-party integrations
│   │
│   ├── layout/              # Shared layout components
│   │   ├── main-layout/     # Main application layout
│   │   │   ├── components/  # Header, navbar, footer
│   │   │   └── main.routes.ts
│   │   ├── auth-layout/     # Authentication layout
│   │   └── admin-layout/    # Admin dashboard layout (prepared)
│   │
│   ├── shared/              # Reusable code (not singleton)
│   │   ├── components/      # Shared UI components
│   │   │   └── ui/          # Generic UI components
│   │   ├── directives/      # Custom Angular directives
│   │   ├── pipes/           # Custom Angular pipes
│   │   ├── utils/           # Utility functions
│   │   └── validators/      # Form validators
│   │
│   ├── store/               # Root state management
│   ├── app.routes.ts        # Main routing configuration
│   ├── app.ts               # Root component
│   └── app.config.ts        # Angular app configuration
│
├── styles/                  # Global styles
│   ├── abstracts/           # Variables, mixins, functions
│   ├── base/                # Reset, typography, fonts
│   ├── components/          # Component-specific styles
│   ├── layout/              # Layout styles
│   ├── pages/               # Page-specific styles
│   └── themes/              # Dark/light theme implementations
│
└── public/                  # Static assets
    └── assets/              # Images, fonts
```

## Prerequisites

- **Node.js**: 18.x or higher
- **npm**: 9.x or higher
- **Git**: For version control
- **Angular CLI**: Installed globally (optional but recommended)

```bash
npm install -g @angular/cli@20.3.13
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Oxillia-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Verify installation**
   ```bash
   ng version
   ```

## Development

### Start Development Server

```bash
npm start
```

or

```bash
ng serve
```

The application will be available at `http://localhost:4200/`. The app will automatically reload when you modify source files.

### Generate Components & Services

Generate a new component:
```bash
ng generate component features/home/components/my-component
```

Generate a service:
```bash
ng generate service core/services/my-service
```

Generate a pipe:
```bash
ng generate pipe shared/pipes/my-pipe
```

For a complete list of available schematics:
```bash
ng generate --help
```

### Code Style

This project uses **Prettier** for code formatting with the following config:
- Print Width: 100 characters
- Quotes: Single quotes
- Angular HTML Parser for template files

Format all files:
```bash
npx prettier --write src/
```

## Building for Production

### Standard Build

```bash
npm run build
```

Build artifacts are stored in the `dist/` directory, optimized for performance and speed.

### With Server-Side Rendering (SSR)

The project is configured with Angular Universal for SSR:

```bash
npm run build
npm run serve:ssr:Oxillia-frontend
```

This enables:
- Faster first contentful paint (FCP)
- Better SEO support
- Improved performance on slower networks

## Testing

### Unit Tests

Run unit tests with Karma and Jasmine:

```bash
npm test
```

Run tests in headless mode (CI environments):
```bash
ng test --watch=false --browsers=ChromeHeadless
```

Generate code coverage report:
```bash
ng test --code-coverage
```

### Development Testing Commands

Watch mode for active development:
```bash
ng test --watch=true
```

## Architecture

### Feature-Based Folder Structure

This project follows a **feature-based architecture** where each feature is self-contained:
- **Core**: Singleton services, guards, interceptors (provided at root level)
- **Features**: Independent, lazy-loaded modules
- **Shared**: Reusable components, pipes, directives, utilities
- **Layout**: Layout-specific components shared across features

### State Management (NgRx)

State is managed using **NgRx** for:
- Authentication state
- Product catalog
- User preferences
- Cart/checkout state

Actions → Effects → Reducers → Selectors workflow ensures predictable state mutations.

### Styling Architecture

Global styles use **SCSS** with:
- **Abstracts**: Variables, mixins, functions, spacing system
- **Base**: Reset, typography, fonts
- **Components**: Reusable component styles
- **Themes**: Light and dark mode implementations
- **Tailwind CSS**: Utility-first CSS framework

Both SCSS and Tailwind can be used together based on component needs.

### HTTP Interceptors

Custom interceptors handle:
- **Auth Interceptor**: Attaching auth tokens to requests
- **Error Interceptor**: Global error handling
- **Loading Interceptor**: Loading state management

### Guards

Route guards protect routes:
- **Auth Guard**: Requires authentication
- **Role Guard**: Role-based access control (prepared for admin)
- **Guest Guard**: Prevents authenticated users from accessing auth routes

## Environment Configuration

Different configurations can be set up for:
- Development (`ng serve`)
- Production (`ng build --configuration production`)
- Staging (`ng build --configuration staging`)

Configure environment variables in `src/environments/` directory.

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Follow the component naming conventions and folder structure
3. Keep components focused and reusable
4. Write meaningful commit messages
5. Submit a pull request with a clear description

### Naming Conventions

- **Components**: `kebab-case` (e.g., `hero-section.ts`)
- **Services**: `camelCase.service.ts` (e.g., `authService.ts`)
- **Models**: `PascalCase.model.ts` (e.g., `User.model.ts`)
- **Guards**: `camelCase.guard.ts` (e.g., `authGuard.ts`)
- **Interceptors**: `camelCase.interceptor.ts` (e.g., `authInterceptor.ts`)

## Performance Considerations

- Lazy-load features to reduce initial bundle size
- Use `ChangeDetectionStrategy.OnPush` for components when possible
- Unsubscribe from observables using `async` pipe or subscription management
- Use `trackBy` functions in `*ngFor` loops for large lists
- Optimize images and assets before adding to the project

## Troubleshooting

### Port 4200 Already in Use

```bash
ng serve --port 4201
```

### Clear Cache and Node Modules

```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

Ensure TypeScript compiler options are met:
```bash
ng build --configuration development
```

## License

Oxillia Frontend - All rights reserved

## Support

For issues or questions, please refer to the project documentation or contact the development team.

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
