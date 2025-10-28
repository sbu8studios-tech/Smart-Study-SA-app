import React, { useState, useRef } from 'react';
// FIX: Corrected import path for Icons.tsx to be a relative path.
import { EmailIcon, LockIcon } from './Icons';

// --- Reusable Form Components (Scoped to this file for simplicity) ---

interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon: React.ReactNode;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({ label, id, error, icon, ...props }) => (
    <div className="form-group-enhanced">
      <input
        id={id}
        {...props}
        placeholder=" " // Important for the :not(:placeholder-shown) selector to work
        className={`floating-label-input ${error ? 'error' : ''}`}
      />
      <label htmlFor={id} className="floating-label">{label}</label>
      <div className="input-icon">{icon}</div>
      {error && <p className="input-error-text">{error}</p>}
    </div>
);


// --- Main Email Login Form Component ---

const EmailLoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });
  const [errors, setErrors] = useState<{email?: string, password?: string}>({});
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const validateForm = (data: typeof formData) => {
      const newErrors: {email?: string, password?: string} = {};
      if (!data.email) {
          newErrors.email = 'Email address is required.';
      } else if (!/\S+@\S+\.\S+/.test(data.email)) {
          newErrors.email = 'Email address is invalid.';
      }
      if (!data.password) {
          newErrors.password = 'Password is required.';
      } else if (data.password.length < 8) {
          newErrors.password = 'Password must be at least 8 characters.';
      }
      return newErrors;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    const newErrors = validateForm(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      formRef.current?.classList.add('shake');
      setTimeout(() => {
        formRef.current?.classList.remove('shake');
      }, 500);
      return;
    }
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
    console.log('Logging in with:', formData);
    setIsLoading(false);
    // In a real app, you would call your auth service here.
    alert(`Simulating Sign In for ${formData.email}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <form 
      ref={formRef}
      className="enhanced-email-form"
      onSubmit={handleSubmit}
      noValidate
    >
        <FloatingLabelInput
          id="email"
          name="email"
          type="email"
          label="Email Address"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          icon={<EmailIcon />}
          required
        />
      
        <FloatingLabelInput
          id="password"
          name="password"
          type="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          icon={<LockIcon />}
          required
        />
      
      <div className="form-options">
        <label className="checkbox-container">
          <input 
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
          />
          <span className="checkmark"></span>
          Remember me
        </label>
        
        <button type="button" className="forgot-password-link">
          Forgot password?
        </button>
      </div>
      
      <button
        type="submit"
        className="submit-btn-enhanced"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="btn-loading">
            <div className="loading-dots">
              <div></div>
              <div></div>
              <div></div>
            </div>
            <span>Signing in...</span>
          </div>
        ) : (
          'Sign In'
        )}
      </button>
      
      <div className="signup-prompt">
        <span>Don't have an account? </span>
        <button type="button" className="signup-link">
          Sign up now
        </button>
      </div>
    </form>
  );
};

export default EmailLoginForm;