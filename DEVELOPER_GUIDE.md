# Developer Guide - Using the Modular Components

## Quick Reference

### How to Use Components

#### 1. Form Input Components

**InputField** - For text/email inputs
```jsx
import InputField from '../components/Auth/InputField';
import { Mail } from 'lucide-react';

<InputField
  label="Email Address"
  icon={Mail}
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  placeholder="Enter your email"
  error={errors.email}
/>
```

**PasswordField** - For password inputs with visibility toggle
```jsx
import PasswordField from '../components/Auth/PasswordField';

<PasswordField
  label="Password"
  name="password"
  value={formData.password}
  onChange={handleChange}
  showPassword={showPassword}
  togglePassword={() => setShowPassword(!showPassword)}
  placeholder="Enter your password"
  error={errors.password}
/>
```

**SelectField** - For dropdown selections
```jsx
import SelectField from '../components/Auth/SelectField';
import { GraduationCap } from 'lucide-react';

<SelectField
  label="Branch"
  icon={GraduationCap}
  name="branch"
  value={formData.branch}
  onChange={handleChange}
  options={['CSE', 'IT', 'ECE', 'EEE']}
  error={errors.branch}
/>
```

**TextareaField** - For multi-line text
```jsx
import TextareaField from '../components/Auth/TextareaField';
import { FileText } from 'lucide-react';

<TextareaField
  label="Your Tips"
  icon={FileText}
  name="tips"
  value={formData.tips}
  onChange={handleChange}
  placeholder="Share your insights..."
  rows={5}
  error={errors.tips}
/>
```

**MultiInputField** - For dynamic arrays (tags, topics)
```jsx
import MultiInputField from '../components/Auth/MultiInputField';
import { BookOpen } from 'lucide-react';

<MultiInputField
  label="Topics Covered"
  icon={BookOpen}
  values={formData.topicsCovered}
  onChange={(values) => handleArrayChange('topicsCovered', values)}
  placeholder="Type topic and press Enter"
  error={errors.topicsCovered}
/>
```

#### 2. Display Components

**UserProfileCard** - Display user info
```jsx
import UserProfileCard from '../components/Dashboard/UserProfileCard';

<UserProfileCard user={user} onLogout={handleLogout} />
```

**StatsCard** - Display statistics
```jsx
import StatsCard from '../components/Dashboard/StatsCard';
import { BookOpen } from 'lucide-react';

<StatsCard
  icon={BookOpen}
  title="Posts Shared"
  value={userPosts.length}
  color="blue"  // "blue" | "green" | "purple" | "orange"
/>
```

**PostCard (Dashboard)** - Display user's posts with actions
```jsx
import PostCard from '../components/Dashboard/PostCard';

<PostCard 
  post={post} 
  onEdit={handleEditPost}
  onDelete={handleDeletePost}
/>
```

**HomePostCard** - Display posts in feed
```jsx
import HomePostCard from '../components/Home/HomePostCard';

<HomePostCard post={post} />
```

#### 3. Layout Components

**Header** - Complete header with navigation
```jsx
import Header from '../components/Home/Header';

<Header 
  isAuthenticated={isAuthenticated} 
  user={user} 
  onLogout={handleLogout}
/>
```

**SearchFilterBar** - Search and filter controls
```jsx
import SearchFilterBar from '../components/Home/SearchFilterBar';

<SearchFilterBar 
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
  filters={filters}
  setFilters={setFilters}
  sortBy={sortBy}
  setSortBy={setSortBy}
  companies={companies}
  difficulties={['Easy', 'Medium', 'Hard']}
/>
```

#### 4. Utility Components

**GraduationCapLogo** - SVG logo
```jsx
import GraduationCapLogo from '../components/Common/GraduationCapLogo';

<GraduationCapLogo size={40} />  // Default size is 40
```

**AnimatedBackground** - Animated gradient background
```jsx
import AnimatedBackground from '../components/Common/AnimatedBackground';

{/* Dark variant (default) */}
<AnimatedBackground />

{/* Light variant */}
<AnimatedBackground variant="light" />
```

**SuccessScreen** - Success message after form submission
```jsx
import SuccessScreen from '../components/Auth/SuccessScreen';

<SuccessScreen 
  title="Welcome Back!"
  message="Successfully signed in. Redirecting..."
  linkTo="/"
  linkText="Go to Dashboard"
/>
```

---

## Common Patterns

### Form Handling Pattern

```jsx
const [formData, setFormData] = useState({
  email: '',
  password: '',
  branch: ''
});

const [errors, setErrors] = useState({});
const [loading, setLoading] = useState(false);

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
  
  // Clear error when user starts typing
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

const validateForm = () => {
  const newErrors = {};
  
  if (!formData.email) {
    newErrors.email = 'Email is required';
  }
  
  if (!formData.password) {
    newErrors.password = 'Password is required';
  }
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async () => {
  if (!validateForm()) return;
  
  setLoading(true);
  
  try {
    // API call
    const response = await fetch('http://localhost:5000/api/v1/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    
    const data = await response.json();
    
    if (response.ok && data.success) {
      // Handle success
      setSuccess(true);
      setTimeout(() => navigate('/'), 2000);
    } else {
      setErrors({ submit: data.message || 'Operation failed' });
    }
  } catch (error) {
    setErrors({ submit: 'Network error. Please try again.' });
  } finally {
    setLoading(false);
  }
};
```

### Using Icons from lucide-react

```jsx
import { 
  Mail, Lock, Eye, EyeOff, Building, Calendar,
  BookOpen, Users, Plus, Trash2, Edit, ArrowLeft
} from 'lucide-react';

// Use in components
<InputField icon={Mail} ... />
<PasswordField ... />
<SelectField icon={Building} ... />
```

### Conditional Rendering

```jsx
if (loading) {
  return <LoadingSpinner />;
}

if (error) {
  return <ErrorMessage error={error} />;
}

if (success) {
  return <SuccessScreen title="Success!" message="Done!" />;
}

return (
  // Main component
);
```

---

## Component Styling

All components use **Tailwind CSS** for styling with:
- Glassmorphism effects (backdrop-blur, semi-transparent backgrounds)
- Gradient backgrounds
- Smooth transitions and animations
- Responsive design
- Consistent color scheme

### Color Classes Used
- **Blue:** `bg-blue-500`, `text-blue-600`, `border-blue-200`
- **Green:** `bg-green-50`, `text-green-600`
- **Red:** `bg-red-50`, `text-red-600`
- **Purple:** `bg-purple-50`, `text-purple-600`
- **Orange:** `bg-orange-50`, `text-orange-600`

### Common Utility Classes
- `backdrop-blur-sm` - Light blur effect
- `backdrop-blur-xl` - Strong blur effect
- `border-white/20` - Semi-transparent white border
- `text-white/70` - Semi-transparent text
- `hover:shadow-xl` - Shadow on hover
- `transition-all duration-300` - Smooth transitions
- `rounded-xl` - Medium border radius
- `rounded-2xl` - Large border radius

---

## Best Practices

### 1. Error Handling
```jsx
// ✅ Good
{error && <p className="text-red-300/90 text-sm">{error}</p>}

// ✅ Also good
{errors.email && (
  <div className="flex items-center space-x-3 text-red-300/90 text-sm bg-red-500/10 border border-red-400/20 rounded-xl p-4">
    <AlertCircle size={16} className="flex-shrink-0" />
    <span>{errors.email}</span>
  </div>
)}
```

### 2. Loading States
```jsx
// ✅ Good
<button disabled={loading} className={loading ? 'opacity-60 cursor-not-allowed' : ''}>
  {loading ? (
    <div className="flex items-center justify-center space-x-2">
      <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
      <span>Loading...</span>
    </div>
  ) : (
    'Submit'
  )}
</button>
```

### 3. State Management
```jsx
// ✅ Keep related state together
const [formData, setFormData] = useState({...});
const [errors, setErrors] = useState({});
const [loading, setLoading] = useState(false);

// ❌ Avoid scattered state
const [email, setEmail] = useState('');
const [emailError, setEmailError] = useState('');
const [password, setPassword] = useState('');
const [passwordError, setPasswordError] = useState('');
```

### 4. Component Props
```jsx
// ✅ Good - Destructure props
const InputField = ({ label, icon: Icon, error, className = "", ...props }) => {
  // Component logic
};

// ✅ Good - Use consistent naming
<InputField
  label="Email"
  icon={Mail}
  name="email"
  value={formData.email}
  onChange={handleChange}
  error={errors.email}
/>

// ❌ Avoid - Passing entire objects
<InputField formData={formData} setFormData={setFormData} ... />
```

---

## Troubleshooting

### Issue: Component not appearing
- Check if component is imported correctly
- Verify the relative path is correct
- Check the console for any import errors

### Issue: Styling not applied
- Check if Tailwind CSS is configured
- Verify className syntax is correct
- Check if there are conflicting styles
- Use `!important` only as last resort (bad practice)

### Issue: Form validation not working
- Ensure `handleChange` updates formData correctly
- Check validation logic in `validateForm()`
- Verify error state is being set and passed to components
- Check if error messages are displayed

### Issue: API calls failing
- Check API endpoint URL
- Verify request headers (Content-Type, Authorization)
- Check response format matches expectations
- Use browser DevTools to debug network requests

---

## Adding New Components

### Step 1: Create Component File
```jsx
// components/[Category]/NewComponent.jsx

const NewComponent = ({ prop1, prop2 }) => {
  return (
    <div className="...">
      {/* Component JSX */}
    </div>
  );
};

export default NewComponent;
```

### Step 2: Import and Use
```jsx
import NewComponent from '../components/[Category]/NewComponent';

<NewComponent prop1={value1} prop2={value2} />
```

### Step 3: Update Documentation
- Add component to this guide
- Update COMPONENT_REFACTORING_SUMMARY.md
- Update ARCHITECTURE_DIAGRAM.md

---

## Resources

- **Lucide Icons:** https://lucide.dev/
- **Tailwind CSS:** https://tailwindcss.com/docs
- **React Docs:** https://react.dev/
- **Lucide React:** https://www.npmjs.com/package/lucide-react

---

## Questions?

Refer to:
1. COMPONENT_REFACTORING_SUMMARY.md - Overview of all components
2. ARCHITECTURE_DIAGRAM.md - Component relationships and dependencies
3. Component files in `src/components/` - Implementation details
4. Page files in `src/pages/` - Usage examples
