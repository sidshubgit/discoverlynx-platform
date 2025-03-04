import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Menu, X, ChevronDown, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center">
            <span className="font-display text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              BizIndex
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/businesses" className="text-sm font-medium hover:text-primary transition-colors">
              Businesses
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-sm" asChild>
              <Link to="/search">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Link>
            </Button>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {user?.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium hidden sm:inline">{user?.name}</span>
                    <ChevronDown className="h-4 w-4 ml-1 opacity-70" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">Profile</Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/admin" className="cursor-pointer">Admin Portal</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={logout}
                    className="cursor-pointer text-red-500 focus:text-red-500"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center p-2 rounded-md focus:outline-none"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 backdrop-blur-sm border-b"
          >
            <div className="container mx-auto px-4 py-4 space-y-3">
              <Link 
                to="/businesses" 
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary/10 transition-colors"
              >
                Businesses
              </Link>
              <Link 
                to="/about" 
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary/10 transition-colors"
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary/10 transition-colors"
              >
                Contact
              </Link>
              <Link 
                to="/search" 
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary/10 transition-colors"
              >
                Search
              </Link>
              
              <div className="pt-2 border-t">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <Link
                      to="/dashboard"
                      className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary/10 transition-colors"
                    >
                      Dashboard
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary/10 transition-colors"
                      >
                        Admin Portal
                      </Link>
                    )}
                    <button
                      onClick={logout}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-500 hover:bg-red-50 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Link to="/login">
                      <Button variant="outline" size="sm" className="w-full">
                        Login
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button size="sm" className="w-full">
                        Register
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
