# CampusBridge - Modular Component Architecture

## Directory Tree

```
FRONTEND/
└── src/
    ├── components/
    │   ├── Common/
    │   │   ├── GraduationCapLogo.jsx
    │   │   │   └── Returns: SVG Logo component
    │   │   └── AnimatedBackground.jsx
    │   │       └── Props: variant("dark"|"light")
    │   │
    │   ├── Auth/                    # Form Components for Authentication
    │   │   ├── InputField.jsx
    │   │   │   └── Props: label, icon, error, className, ...inputProps
    │   │   ├── PasswordField.jsx
    │   │   │   └── Props: label, name, value, onChange, showPassword, togglePassword, error, placeholder
    │   │   ├── SelectField.jsx
    │   │   │   └── Props: label, icon, options, error, ...selectProps
    │   │   ├── TextareaField.jsx
    │   │   │   └── Props: label, icon, error, rows, ...textareaProps
    │   │   ├── MultiInputField.jsx
    │   │   │   └── Props: label, icon, values, onChange, placeholder, error
    │   │   └── SuccessScreen.jsx
    │   │       └── Props: title, message, linkTo, linkText
    │   │
    │   ├── Dashboard/               # Dashboard Specific Components
    │   │   ├── UserProfileCard.jsx
    │   │   │   └── Props: user, onLogout
    │   │   ├── StatsCard.jsx
    │   │   │   └── Props: icon, title, value, color
    │   │   └── PostCard.jsx
    │   │       └── Props: post, onEdit, onDelete
    │   │
    │   └── Home/                    # Homepage Components
    │       ├── Header.jsx
    │       │   └── Props: isAuthenticated, user, onLogout
    │       ├── UserDropdown.jsx
    │       │   └── Props: user, isOpen, onClose
    │       ├── SearchFilterBar.jsx
    │       │   └── Props: searchTerm, setSearchTerm, filters, setFilters, sortBy, setSortBy, companies, difficulties
    │       └── HomePostCard.jsx
    │           └── Props: post
    │
    └── pages/
        ├── HomePage.jsx
        │   └── Imports: Header, SearchFilterBar, HomePostCard, AnimatedBackground
        ├── loginPage.jsx
        │   └── Imports: GraduationCapLogo, AnimatedBackground, InputField, PasswordField, SuccessScreen
        ├── signupPage.jsx
        │   └── Imports: GraduationCapLogo, AnimatedBackground, InputField, PasswordField, SelectField, SuccessScreen
        ├── forgotPasswordPage.jsx
        │   └── Imports: GraduationCapLogo, AnimatedBackground, InputField, PasswordField, SuccessScreen
        ├── createPostPage.jsx
        │   └── Imports: GraduationCapLogo, AnimatedBackground, InputField, SelectField, TextareaField, MultiInputField, SuccessScreen
        ├── dashboardPage.jsx
        │   └── Imports: GraduationCapLogo, AnimatedBackground, UserProfileCard, StatsCard, PostCard
        └── postPage.jsx
            └── (Empty - Ready for implementation)
```

## Component Dependency Graph

```
GraduationCapLogo ───┬──→ Header
                     ├──→ LoginPage
                     ├──→ SignupPage
                     ├──→ ForgotPasswordPage
                     ├──→ CreatePostPage
                     └──→ DashboardPage

AnimatedBackground ──┬──→ Header
                     ├──→ SuccessScreen
                     ├──→ LoginPage
                     ├──→ SignupPage
                     ├──→ ForgotPasswordPage
                     ├──→ CreatePostPage
                     ├──→ DashboardPage
                     └──→ HomePage

InputField ──────────┬──→ LoginPage
                     ├──→ SignupPage
                     ├──→ ForgotPasswordPage
                     └──→ CreatePostPage

PasswordField ───────┬──→ LoginPage
                     ├──→ SignupPage
                     └──→ ForgotPasswordPage

SelectField ─────────┬──→ SignupPage
                     └──→ CreatePostPage

TextareaField ───────→ CreatePostPage

MultiInputField ─────→ CreatePostPage

SuccessScreen ───────┬──→ LoginPage
                     ├──→ SignupPage
                     ├──→ ForgotPasswordPage
                     └──→ CreatePostPage

UserDropdown ────────→ Header

Header ──────────────→ HomePage

SearchFilterBar ─────→ HomePage

HomePostCard ────────→ HomePage

UserProfileCard ─────→ DashboardPage

StatsCard ───────────→ DashboardPage

PostCard (Dashboard) ─→ DashboardPage
```

## Component Types

### 1. **Container Components** (Pages)
- HomePage
- loginPage
- signupPage
- forgotPasswordPage
- createPostPage
- dashboardPage

### 2. **Presentational Components** (Reusable)
- **Form Fields:** InputField, PasswordField, SelectField, TextareaField, MultiInputField
- **Cards:** UserProfileCard, StatsCard, PostCard (Dashboard), HomePostCard
- **Navigation:** Header, UserDropdown

### 3. **Utility Components**
- GraduationCapLogo
- AnimatedBackground
- SuccessScreen

## Data Flow Examples

### Login Page Flow
```
LoginPage
├── State: formData, errors, loading, success
├── Uses: InputField × 2, PasswordField × 1
├── On Submit: Validates → API Call → SuccessScreen
└── After Success: Redirects to HomePage
```

### Dashboard Page Flow
```
DashboardPage
├── State: user, userPosts, loading, error
├── Uses: UserProfileCard, StatsCard × 4, PostCard × N
├── On Mount: Fetches user data and posts
├── Actions: Edit Post, Delete Post, Logout
└── User Interaction: Click to edit/delete posts
```

### HomePage Flow
```
HomePage
├── State: posts, filteredPosts, searchTerm, filters, sortBy
├── Uses: Header, SearchFilterBar, HomePostCard × N
├── On Mount: Fetches all posts
├── On Change: Filters and sorts posts in real-time
└── User Interaction: Search, filter, view post details
```

## Component Composition Pattern

```jsx
// Example: Using form components in CreatePostPage
<InputField
  label="Company Name"
  icon={Building}
  name="companyName"
  value={formData.companyName}
  onChange={handleChange}
  placeholder="Enter company name"
  error={errors.companyName}
/>

<SelectField
  label="Interview Type"
  icon={Briefcase}
  name="interviewType"
  value={formData.interviewType}
  onChange={handleChange}
  options={interviewTypes}
  error={errors.interviewType}
/>

<MultiInputField
  label="Topics Covered"
  icon={BookOpen}
  values={formData.topicsCovered}
  onChange={(values) => handleArrayChange('topicsCovered', values)}
  placeholder="Add topic and press Enter"
  error={errors.topicsCovered}
/>

<SuccessScreen
  title="Experience Shared!"
  message="Your placement experience has been posted."
  linkTo="/"
  linkText="View All Posts"
/>
```

## Benefits of This Architecture

| Aspect | Benefit |
|--------|---------|
| **Modularity** | Each component has a single responsibility |
| **Reusability** | Form components used in multiple pages |
| **Maintainability** | Easy to find and update component logic |
| **Testability** | Components can be tested independently |
| **Scalability** | Easy to add new pages and features |
| **Consistency** | Shared components ensure uniform styling |
| **Performance** | Smaller components = faster rendering |
| **Development Speed** | Components can be developed in parallel |

## File Size Comparison

### Before Refactoring
- HomePage.jsx: ~590 lines (includes Header, UserDropdown, SearchFilterBar, PostCard)
- DashboardPage.jsx: ~372 lines (includes UserProfileCard, StatsCard, PostCard)
- loginPage.jsx: ~322 lines (includes InputField, PasswordField, SuccessScreen)
- signupPage.jsx: ~352 lines (includes InputField, PasswordField, SelectField, SuccessScreen)
- createPostPage.jsx: ~453 lines (includes all form components)

### After Refactoring
- HomePage.jsx: ~150 lines (clean, focused)
- DashboardPage.jsx: ~100 lines (clean, focused)
- loginPage.jsx: ~100 lines (clean, focused)
- signupPage.jsx: ~100 lines (clean, focused)
- createPostPage.jsx: ~100 lines (clean, focused)
- **New Component Files: 17** (each 30-80 lines, single-responsibility)

## Future Enhancements

1. **Custom Hooks:** Extract form logic into `useForm` hook
2. **Context API:** Share auth state globally
3. **Component Stories:** Add Storybook for component documentation
4. **Unit Tests:** Add Jest/React Testing Library tests
5. **Layout Components:** Create Layout wrapper for consistency
6. **Error Boundaries:** Add error boundary components
7. **Loading States:** Extract loading skeleton components
8. **Modal Components:** Create reusable Modal component
9. **Toast Notifications:** Create Toast/Alert components
10. **API Service:** Abstract API calls into service layer
