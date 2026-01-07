# Quick Reference Card - Component Usage

## 📁 Component Locations

```
✅ Common Components (Shared across app)
├── GraduationCapLogo        → src/components/Common/
└── AnimatedBackground       → src/components/Common/

✅ Form Components (Authentication & Input)
├── InputField              → src/components/Auth/
├── PasswordField           → src/components/Auth/
├── SelectField             → src/components/Auth/
├── TextareaField           → src/components/Auth/
├── MultiInputField         → src/components/Auth/
└── SuccessScreen           → src/components/Auth/

✅ Dashboard Components
├── UserProfileCard         → src/components/Dashboard/
├── StatsCard               → src/components/Dashboard/
└── PostCard                → src/components/Dashboard/

✅ Home Page Components
├── Header                  → src/components/Home/
├── UserDropdown            → src/components/Home/
├── SearchFilterBar         → src/components/Home/
└── HomePostCard            → src/components/Home/
```

## 🎯 Quick Import Guide

### For Login Page
```jsx
import InputField from '../components/Auth/InputField';
import PasswordField from '../components/Auth/PasswordField';
import SuccessScreen from '../components/Auth/SuccessScreen';
import AnimatedBackground from '../components/Common/AnimatedBackground';
import GraduationCapLogo from '../components/Common/GraduationCapLogo';
```

### For Signup Page
```jsx
import InputField from '../components/Auth/InputField';
import PasswordField from '../components/Auth/PasswordField';
import SelectField from '../components/Auth/SelectField';
import SuccessScreen from '../components/Auth/SuccessScreen';
import AnimatedBackground from '../components/Common/AnimatedBackground';
import GraduationCapLogo from '../components/Common/GraduationCapLogo';
```

### For Create Post Page
```jsx
import InputField from '../components/Auth/InputField';
import SelectField from '../components/Auth/SelectField';
import TextareaField from '../components/Auth/TextareaField';
import MultiInputField from '../components/Auth/MultiInputField';
import SuccessScreen from '../components/Auth/SuccessScreen';
import AnimatedBackground from '../components/Common/AnimatedBackground';
import GraduationCapLogo from '../components/Common/GraduationCapLogo';
```

### For Dashboard Page
```jsx
import UserProfileCard from '../components/Dashboard/UserProfileCard';
import StatsCard from '../components/Dashboard/StatsCard';
import PostCard from '../components/Dashboard/PostCard';
import AnimatedBackground from '../components/Common/AnimatedBackground';
import GraduationCapLogo from '../components/Common/GraduationCapLogo';
```

### For Home Page
```jsx
import Header from '../components/Home/Header';
import SearchFilterBar from '../components/Home/SearchFilterBar';
import HomePostCard from '../components/Home/HomePostCard';
```

## 📦 Component Props at a Glance

| Component | Required Props | Optional Props |
|-----------|---|---|
| **GraduationCapLogo** | - | `size` |
| **AnimatedBackground** | - | `variant` ("dark"\|"light") |
| **InputField** | `label`, `icon`, `name`, `value`, `onChange` | `error`, `className`, `type`, `placeholder` |
| **PasswordField** | `label`, `name`, `value`, `onChange`, `showPassword`, `togglePassword` | `error`, `placeholder` |
| **SelectField** | `label`, `icon`, `name`, `value`, `onChange`, `options` | `error` |
| **TextareaField** | `label`, `name`, `value`, `onChange` | `error`, `rows`, `placeholder`, `icon` |
| **MultiInputField** | `label`, `values`, `onChange` | `icon`, `placeholder`, `error` |
| **SuccessScreen** | `title`, `message`, `linkTo`, `linkText` | - |
| **UserProfileCard** | `user`, `onLogout` | - |
| **StatsCard** | `icon`, `title`, `value` | `color` |
| **PostCard** | `post`, `onEdit`, `onDelete` | - |
| **HomePostCard** | `post` | - |
| **Header** | `isAuthenticated`, `user` | `onLogout` |
| **UserDropdown** | `user`, `isOpen`, `onClose` | - |
| **SearchFilterBar** | `searchTerm`, `setSearchTerm`, `filters`, `setFilters`, `sortBy`, `setSortBy`, `companies`, `difficulties` | - |

## 🎨 Color Options for StatsCard

```jsx
<StatsCard
  icon={BookOpen}
  title="Posts Shared"
  value={5}
  color="blue"      // ✅ Default
/>

<StatsCard color="green" ... />   // ✅ Green variant
<StatsCard color="purple" ... />  // ✅ Purple variant
<StatsCard color="orange" ... />  // ✅ Orange variant
```

## 🏗️ Typical Page Structure

### Auth Pages (Login, Signup, Forgot Password)
```jsx
<div className="min-h-screen relative overflow-hidden">
  <AnimatedBackground />
  <div className="relative z-10 max-w-md w-full">
    <GraduationCapLogo size={32} />
    {/* Form with InputField, PasswordField, SelectField */}
    {success && <SuccessScreen ... />}
  </div>
</div>
```

### Create Post Page
```jsx
<div className="min-h-screen relative overflow-hidden">
  <AnimatedBackground />
  <div className="relative z-10 max-w-4xl mx-auto">
    <GraduationCapLogo size={32} />
    {/* Form with all field components */}
    {success && <SuccessScreen ... />}
  </div>
</div>
```

### Dashboard Page
```jsx
<div className="min-h-screen bg-gradient-to-br">
  <AnimatedBackground variant="light" />
  <div className="relative z-10 max-w-7xl mx-auto">
    <GraduationCapLogo size={32} />
    <UserProfileCard user={user} onLogout={handleLogout} />
    <StatsCard ... /> {/* Multiple cards */}
    <PostCard post={post} onEdit={...} onDelete={...} /> {/* Multiple posts */}
  </div>
</div>
```

### Home Page
```jsx
<div className="min-h-screen">
  <Header isAuthenticated={isAuth} user={user} />
  <SearchFilterBar ... />
  <HomePostCard post={post} /> {/* Multiple posts */}
</div>
```

## 🔧 Common Setup in Pages

### Form State Pattern
```jsx
const [formData, setFormData] = useState({
  field1: '',
  field2: '',
  arrayField: []
});

const [errors, setErrors] = useState({});
const [loading, setLoading] = useState(false);
const [success, setSuccess] = useState(false);

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
  if (errors[name]) {
    setErrors(prev => ({ ...prev, [name]: '' }));
  }
};

const handleArrayChange = (name, values) => {
  setFormData(prev => ({ ...prev, [name]: values }));
  if (errors[name]) {
    setErrors(prev => ({ ...prev, [name]: '' }));
  }
};
```

## 🎓 Icon Imports
```jsx
import { 
  Mail, Lock, Eye, EyeOff,              // Password fields
  Building, Briefcase, BookOpen,         // Post fields
  Calendar, Target, FileText, Trophy,    // Create post
  Plus, Trash2, Edit, ArrowLeft,         // Actions
  Users, Home, Settings, LogOut           // Navigation
} from 'lucide-react';
```

## ✅ Best Practices Checklist

- [ ] Clear errors on user input
- [ ] Show loading state during API calls
- [ ] Display success screen after submission
- [ ] Validate form before submission
- [ ] Handle errors gracefully
- [ ] Use proper icon for each field
- [ ] Include helpful placeholder text
- [ ] Test on mobile devices
- [ ] Test form validation
- [ ] Test error scenarios

## 🐛 Debugging Tips

### Check imports
```bash
# Verify file exists
ls src/components/Auth/InputField.jsx

# Check export in component
grep "export default" src/components/Auth/InputField.jsx
```

### Check props
```jsx
// Add to component to see all props
console.log('Props:', { ...allProps });

// Verify required props are passed
if (!label) console.warn('InputField: label prop is required');
```

### Check styles
```jsx
// Add border to see element bounds
className="border border-red-500 ..."

// Check Tailwind is loaded
// Check browser DevTools for applied styles
```

## 📞 Getting Help

1. **Documentation Files:**
   - `DEVELOPER_GUIDE.md` - Usage examples
   - `ARCHITECTURE_DIAGRAM.md` - Component relationships
   - `COMPONENT_REFACTORING_SUMMARY.md` - Overview

2. **Component Files:**
   - Check JSDoc comments in component
   - Review prop types and defaults
   - Look at usage in page files

3. **Example Pages:**
   - LoginPage.jsx - Form field usage
   - DashboardPage.jsx - Display component usage
   - HomePage.jsx - Complex layout usage

---

**Last Updated:** January 2, 2026
**Version:** 1.0
