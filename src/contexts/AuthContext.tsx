import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  password?: string; // Added for mock authentication
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<User>;
  logout: () => void;
  updateProfile: (data: { name: string; email: string }) => Promise<void>;
  deleteAccount: () => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for stored auth
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      // Don't expose password in the user state
      delete parsedUser.password;
      setUser(parsedUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock login - would be replaced with actual API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check if user exists in localStorage
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const existingUser = registeredUsers.find((u: User) => u.email === email);
      
      if (!existingUser) {
        throw new Error('No account found with this email. Please register first.');
      }

      if (existingUser.password !== password) {
        throw new Error('Invalid password');
      }

      // Don't expose password in the user state
      const userWithoutPassword = { ...existingUser };
      delete userWithoutPassword.password;
      
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<User> => {
    setIsLoading(true);
    try {
      // Mock registration - would be replaced with actual API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check if user already exists
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      if (registeredUsers.some((u: User) => u.email === email)) {
        throw new Error('An account with this email already exists');
      }

      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        email,
        role: 'user',
        password, // Store password for mock authentication
      };
      
      // Store in registered users
      registeredUsers.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

      // Don't expose password in the user state
      const userWithoutPassword = { ...newUser };
      delete userWithoutPassword.password;
      
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      return userWithoutPassword; // Return the created user
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: { name: string; email: string }) => {
    setIsLoading(true);
    try {
      // Mock API call - would be replaced with actual API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (!user) {
        throw new Error('No user logged in');
      }

      // Update in registered users
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const userIndex = registeredUsers.findIndex((u: User) => u.id === user.id);
      
      if (userIndex === -1) {
        throw new Error('User not found');
      }

      registeredUsers[userIndex] = {
        ...registeredUsers[userIndex],
        ...data,
      };
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

      const updatedUser: User = {
        ...user,
        ...data,
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (!user) {
        throw new Error('No user logged in');
      }

      // Verify current password and update in registered users
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const userIndex = registeredUsers.findIndex((u: User) => u.id === user.id);
      
      if (userIndex === -1) {
        throw new Error('User not found');
      }

      if (registeredUsers[userIndex].password !== currentPassword) {
        throw new Error('Current password is incorrect');
      }

      if (currentPassword === newPassword) {
        throw new Error('New password must be different from current password');
      }

      registeredUsers[userIndex].password = newPassword;
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    try {
      // Mock API call - would be replaced with actual API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real implementation, this would send a password reset email
      // For now, we'll just simulate a successful request
      if (!email) {
        throw new Error('Email is required');
      }

      // Simulate successful password reset request
      return;
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAccount = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (!user) {
        throw new Error('No user logged in');
      }

      // Remove from registered users
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const updatedUsers = registeredUsers.filter((u: User) => u.id !== user.id);
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
      
      // Remove user's businesses
      const storedBusinesses = JSON.parse(localStorage.getItem('businesses') || '[]');
      const remainingBusinesses = storedBusinesses.filter((business: any) => business.userId !== user.id);
      localStorage.setItem('businesses', JSON.stringify(remainingBusinesses));
      
      // Clear user data
      setUser(null);
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Delete account error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAdmin = user?.role === 'admin';
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        deleteAccount,
        changePassword,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
