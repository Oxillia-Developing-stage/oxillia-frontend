---
name: E-commerce Angular Folder Structure
overview: Create a comprehensive feature-based folder structure for a cosmetics e-commerce store with multi-tenant support, NgRx state management, and prepared admin dashboard area.
todos:
  - id: create-folder-structure
    content: Create all folder directories following the proposed structure (core/, shared/, features/, integrations/, layout/)
    status: pending
  - id: setup-ngrx
    content: Install and configure NgRx (@ngrx/store, @ngrx/effects, @ngrx/store-devtools) with root store setup
    status: pending
  - id: create-core-services
    content: "Create core services: auth.service.ts, api.service.ts (base HTTP service), theme.service.ts, storage.service.ts"
    status: pending
    dependencies:
      - create-folder-structure
  - id: create-core-guards
    content: Create auth.guard.ts, role.guard.ts (prepared for admin), and guest.guard.ts
    status: pending
    dependencies:
      - create-core-services
  - id: create-core-interceptors
    content: "Create interceptors: auth.interceptor.ts, error.interceptor.ts, loading.interceptor.ts"
    status: pending
    dependencies:
      - create-core-services
  - id: create-core-models
    content: "Create base models: user.model.ts, product.model.ts, company.model.ts with TypeScript interfaces"
    status: pending
    dependencies:
      - create-folder-structure
  - id: setup-root-routing
    content: Configure app.routes.ts with lazy-loaded feature routes and layout routing strategy
    status: pending
    dependencies:
      - create-folder-structure
  - id: create-shared-components
    content: Create domain-specific shared components (product-card, company-card, rating-stars) and minimal generic UI components if needed
    status: pending
    dependencies:
      - create-folder-structure
  - id: create-layout-components
    content: Create main-layout with header/footer components inside, auth-layout, and admin-layout placeholder
    status: pending
    dependencies:
      - create-folder-structure
  - id: setup-integration-structure
    content: Create integration folder structure with interfaces and factory services for shipping and payments
    status: pending
    dependencies:
      - create-folder-structure
---

# E-commerce Angular Folder Structure

## Architecture Overview

This structure follows **feature-based architecture** with clear separation between customer-facing features and admin features (prepared for future implementation). It uses Angular standalone components with NgRx for state management.

## Folder Structure

```
src/app/
├── core/                          # Core singleton services, guards, interceptors
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── api.service.ts
│   │   ├── theme.service.ts
│   │   └── storage.service.ts
│   ├── guards/
│   │   ├── auth.guard.ts
│   │   ├── role.guard.ts          # Prepared for admin roles
│   │   └── guest.guard.ts
│   ├── interceptors/
│   │   ├── auth.interceptor.ts
│   │   ├── error.interceptor.ts
│   │   └── loading.interceptor.ts
│   ├── models/
│   │   ├── user.model.ts
│   │   ├── product.model.ts
│   │   ├── company.model.ts
│   │   └── index.ts
│   └── constants/
│       ├── api-endpoints.ts
│       └── app-constants.ts
│
├── shared/                        # Reusable components, directives, pipes
│   ├── components/
│   │   ├── product-card/          # Domain-specific shared components
│   │   ├── company-card/
│   │   ├── rating-stars/
│   │   ├── ui/                    # Generic UI components (only if needed)
│   │   │   ├── button/            # Custom button (if PrimeNG doesn't suffice)
│   │   │   ├── loading-spinner/
│   │   │   └── modal/             # Custom modal (if needed)
│   │   └── primeng-overrides/     # PrimeNG customizations
│   ├── directives/
│   ├── pipes/
│   ├── validators/
│   └── utils/
│       └── helpers.ts
│
├── store/                         # NgRx Store (Root level)
│   ├── index.ts                   # Root state interface
│   ├── app.state.ts
│   └── app.actions.ts
│
├── features/                      # Feature modules
│   ├── auth/
│   │   ├── components/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── forgot-password/
│   │   │   └── verify-email/
│   │   ├── store/
│   │   │   ├── auth.actions.ts
│   │   │   ├── auth.effects.ts
│   │   │   ├── auth.reducer.ts
│   │   │   ├── auth.selectors.ts
│   │   │   └── auth.state.ts
│   │   ├── services/
│   │   │   └── auth-api.service.ts
│   │   └── auth.routes.ts
│   │
│   ├── products/
│   │   ├── components/
│   │   │   ├── product-list/
│   │   │   ├── product-details/
│   │   │   ├── product-filters/
│   │   │   └── product-search/
│   │   │   # Note: product-card is in shared/components/ (reusable across features)
│   │   ├── pages/
│   │   │   ├── product-list-page/
│   │   │   └── product-details-page/
│   │   ├── store/
│   │   │   ├── products.actions.ts
│   │   │   ├── products.effects.ts
│   │   │   ├── products.reducer.ts
│   │   │   ├── products.selectors.ts
│   │   │   └── products.state.ts
│   │   ├── services/
│   │   │   └── products-api.service.ts
│   │   └── products.routes.ts
│   │
│   ├── categories/
│   │   ├── components/
│   │   │   ├── category-tree/
│   │   │   ├── category-nav/
│   │   │   └── breadcrumbs/
│   │   ├── store/
│   │   │   ├── categories.actions.ts
│   │   │   ├── categories.effects.ts
│   │   │   ├── categories.reducer.ts
│   │   │   ├── categories.selectors.ts
│   │   │   └── categories.state.ts
│   │   ├── services/
│   │   │   └── categories-api.service.ts
│   │   └── categories.routes.ts
│   │
│   ├── cart/
│   │   ├── components/
│   │   │   ├── cart-item/
│   │   │   ├── cart-summary/
│   │   │   ├── cart-icon/
│   │   │   └── mini-cart/
│   │   ├── pages/
│   │   │   └── cart-page/
│   │   ├── store/
│   │   │   ├── cart.actions.ts
│   │   │   ├── cart.effects.ts
│   │   │   ├── cart.reducer.ts
│   │   │   ├── cart.selectors.ts
│   │   │   └── cart.state.ts
│   │   └── cart.routes.ts
│   │
│   ├── checkout/
│   │   ├── components/
│   │   │   ├── shipping-form/
│   │   │   ├── payment-form/
│   │   │   ├── order-summary/
│   │   │   └── checkout-steps/
│   │   ├── pages/
│   │   │   └── checkout-page/
│   │   ├── store/
│   │   │   ├── checkout.actions.ts
│   │   │   ├── checkout.effects.ts
│   │   │   ├── checkout.reducer.ts
│   │   │   ├── checkout.selectors.ts
│   │   │   └── checkout.state.ts
│   │   ├── services/
│   │   │   ├── shipping.service.ts
│   │   │   └── payment.service.ts
│   │   └── checkout.routes.ts
│   │
│   ├── orders/
│   │   ├── components/
│   │   │   ├── order-list/
│   │   │   ├── order-card/
│   │   │   ├── order-details/
│   │   │   └── order-tracking/
│   │   ├── pages/
│   │   │   ├── orders-page/
│   │   │   └── order-details-page/
│   │   ├── store/
│   │   │   ├── orders.actions.ts
│   │   │   ├── orders.effects.ts
│   │   │   ├── orders.reducer.ts
│   │   │   ├── orders.selectors.ts
│   │   │   └── orders.state.ts
│   │   ├── services/
│   │   │   └── orders-api.service.ts
│   │   └── orders.routes.ts
│   │
│   ├── profile/
│   │   ├── components/
│   │   │   ├── profile-form/
│   │   │   ├── address-form/
│   │   │   ├── address-list/
│   │   │   └── password-change/
│   │   ├── pages/
│   │   │   ├── profile-page/
│   │   │   └── settings-page/
│   │   ├── store/
│   │   │   ├── profile.actions.ts
│   │   │   ├── profile.effects.ts
│   │   │   ├── profile.reducer.ts
│   │   │   ├── profile.selectors.ts
│   │   │   └── profile.state.ts
│   │   ├── services/
│   │   │   └── profile-api.service.ts
│   │   └── profile.routes.ts
│   │
│   ├── companies/                 # Multi-tenant: Companies & Brands
│   │   ├── components/
│   │   │   ├── company-selector/
│   │   │   └── brand-list/
│   │   ├── store/
│   │   │   ├── companies.actions.ts
│   │   │   ├── companies.effects.ts
│   │   │   ├── companies.reducer.ts
│   │   │   ├── companies.selectors.ts
│   │   │   └── companies.state.ts
│   │   ├── services/
│   │   │   └── companies-api.service.ts
│   │   └── companies.routes.ts
│   │
│   ├── home/                      # Homepage feature
│   │   ├── components/
│   │   │   ├── hero-section/
│   │   │   ├── featured-products/
│   │   │   ├── category-showcase/
│   │   │   └── brand-showcase/
│   │   ├── pages/
│   │   │   └── home-page/
│   │   └── home.routes.ts
│   │
│   └── admin/                     # PREPARED FOR FUTURE - Admin Dashboard
│       ├── components/            # Placeholder structure
│       ├── pages/
│       │   ├── dashboard/
│       │   ├── products-management/
│       │   ├── orders-management/
│       │   ├── users-management/
│       │   └── settings/
│       ├── store/                 # Admin-specific state
│       ├── guards/
│       │   └── admin.guard.ts     # Role-based guard
│       └── admin.routes.ts
│
├── integrations/                  # External service integrations
│   ├── shipping/
│   │   ├── services/
│   │   │   ├── shipping-provider.interface.ts
│   │   │   ├── fedex.service.ts
│   │   │   ├── ups.service.ts
│   │   │   └── shipping-factory.service.ts
│   │   └── models/
│   │       └── shipping-rate.model.ts
│   │
│   └── payments/
│       ├── services/
│       │   ├── payment-provider.interface.ts
│       │   ├── stripe.service.ts
│       │   ├── paypal.service.ts
│       │   └── payment-factory.service.ts
│       └── models/
│           └── payment-intent.model.ts
│
├── layout/                        # Main layout components
│   ├── main-layout/
│   │   ├── components/            # Layout-specific components
│   │   │   ├── header/
│   │   │   ├── footer/
│   │   │   └── navbar/
│   │   ├── main-layout.component.ts
│   │   └── main-layout.component.html
│   ├── auth-layout/
│   │   ├── auth-layout.component.ts
│   │   └── auth-layout.component.html
│   └── admin-layout/              # Prepared for admin
│       ├── components/            # Admin layout components
│       │   ├── admin-header/
│       │   └── admin-sidebar/
│       ├── admin-layout.component.ts
│       └── admin-layout.component.html
│
└── app.routes.ts                  # Root routing configuration
```

## Key Architectural Decisions

### 1. **Feature-Based Structure**

Each feature is self-contained with its own:

- Components
- Store (NgRx)
- Services
- Routes
- Models (if feature-specific)

### 2. **NgRx Store Organization**

- Root store in `app/store/` for app-level state
- Feature stores in each feature's `store/` folder
- Effects handle all backend API calls

### 3. **Multi-Tenant Support**

- `companies/` feature manages company/brand selection
- Services can filter by current company context
- State management tracks active company

### 4. **Integration Pattern**

- `integrations/` folder uses **Strategy Pattern**
- Interface-based providers (shipping, payments)
- Factory services for provider selection
- Easy to add new providers

### 5. **Admin Dashboard Preparation**

- `admin/` folder structure ready
- Role guards prepared in `core/guards/`
- Separate admin layout component
- Can be developed independently later

### 6. **Routing Strategy**

- Feature-level routes in each feature
- Lazy loading ready
- Route guards for auth and roles

### 7. **Shared Components Organization**

- **Domain-specific components** (product-card, company-card, rating-stars) at `shared/components/` root level
  - These are business-logic components shared across features
  - Clear, specific naming without generic grouping
- **Generic UI components** in `shared/components/ui/` (only if needed)
  - Since PrimeNG is used heavily, minimal generic components needed
  - Only create custom UI components when PrimeNG doesn't suffice

### 8. **Layout Components Organization**

- **Layout-specific components** (header, footer) inside their respective layout folders
  - `layout/main-layout/components/header/` - tightly coupled to main layout
  - `layout/main-layout/components/footer/` - cohesive with layout structure
  - Better cohesion: header/footer are part of the layout, not separate entities
  - If reuse is needed later, components can be moved to `shared/components/`

## Implementation Steps

1. **Create folder structure** - All directories and placeholder files
2. **Set up NgRx** - Install packages, configure store
3. **Create core services** - Auth, API base service
4. **Set up routing** - Root routes with lazy loading
5. **Create shared components** - Button, Card, Input basics
6. **Implement first feature** - Auth or Home as starting point

## File Naming Conventions

- Components: `kebab-case.component.ts`
- Services: `kebab-case.service.ts`
- Models: `kebab-case.model.ts`
- Store files: `feature-name.actions.ts`, `feature-name.effects.ts`, etc.
- Routes: `feature-name.routes.ts`

This structure scales well, maintains clear separation of concerns, and prepares for future admin functionality.