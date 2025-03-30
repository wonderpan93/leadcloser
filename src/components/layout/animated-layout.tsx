import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { LogOut, Menu, User, Settings, CreditCard, HelpCircle, X } from 'lucide-react';

// Animation variants
const navItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 }
};

const navContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface NavbarProps {
  isLoggedIn?: boolean;
  userName?: string;
  userEmail?: string;
  onLogout?: () => void;
}

export function AnimatedNavbar({ isLoggedIn = false, userName = '', userEmail = '', onLogout }: NavbarProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Navigation items
  const navItems: NavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '/#features' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'About', href: '/about' }
  ];

  // User menu items
  const userMenuItems: NavItem[] = [
    { label: 'Dashboard', href: '/dashboard', icon: <User className="mr-2 h-4 w-4" /> },
    { label: 'Settings', href: '/settings', icon: <Settings className="mr-2 h-4 w-4" /> },
    { label: 'Billing', href: '/billing', icon: <CreditCard className="mr-2 h-4 w-4" /> },
    { label: 'Help', href: '/help', icon: <HelpCircle className="mr-2 h-4 w-4" /> }
  ];

  // Handle scroll event to change navbar appearance
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-navy-blue shadow-md py-2' : 'bg-transparent py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="flex items-center">
            <div className="h-10 w-10 relative mr-2">
              <Image 
                src="/images/LeadCloserLogo.jpg" 
                alt="LeadCloser Logo" 
                fill
                className="object-contain rounded-full"
              />
            </div>
            <span className="text-2xl font-bold text-gold">LeadCloser</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav
          className="hidden md:flex items-center space-x-8"
          variants={navContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {navItems.map((item) => (
            <motion.div key={item.label} variants={navItemVariants}>
              <Link 
                href={item.href}
                className="text-white hover:text-gold transition-colors"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        {/* Auth Buttons or User Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="relative group">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-navy-blue-light hover:bg-navy-blue text-white px-4 py-2 rounded-full transition-colors"
              >
                <span>{userName.split(' ')[0]}</span>
                <div className="h-8 w-8 rounded-full bg-gold flex items-center justify-center text-navy-blue-dark">
                  {userName.charAt(0).toUpperCase()}
                </div>
              </motion.button>
              
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-10 opacity-0 scale-95 transform origin-top-right transition-all duration-200 invisible group-hover:opacity-100 group-hover:scale-100 group-hover:visible">
                <div className="py-2">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{userName}</p>
                    <p className="text-xs text-gray-500 truncate">{userEmail}</p>
                  </div>
                  {userMenuItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  ))}
                  <button
                    onClick={onLogout}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/login">
                  <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-navy-blue-dark">
                    Log In
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/signup">
                  <Button className="bg-gold text-navy-blue-dark hover:bg-gold-dark">
                    Sign Up
                  </Button>
                </Link>
              </motion.div>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-gold"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="md:hidden bg-navy-blue"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-white hover:text-gold py-2 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-navy-blue-light">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="h-8 w-8 rounded-full bg-gold flex items-center justify-center text-navy-blue-dark">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-white">{userName}</div>
                      <div className="text-sm text-gray-300">{userEmail}</div>
                    </div>
                  </div>
                  {userMenuItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex items-center py-2 text-white hover:text-gold"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.icon}
                      <span className="ml-2">{item.label}</span>
                    </Link>
                  ))}
                  <button
                    onClick={() => {
                      if (onLogout) onLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center py-2 text-red-400 hover:text-red-300 w-full text-left"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full border-gold text-gold hover:bg-gold hover:text-navy-blue-dark">
                      Log In
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-gold text-navy-blue-dark hover:bg-gold-dark">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}

export function AnimatedFooter() {
  const footerLinks = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "/#features" },
        { label: "Pricing", href: "/#pricing" },
        { label: "Testimonials", href: "/#testimonials" },
        { label: "FAQ", href: "/faq" }
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" }
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Help Center", href: "/help" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Cookie Policy", href: "/cookies" }
      ]
    }
  ];

  return (
    <motion.footer
      className="bg-navy-blue py-12 px-4 sm:px-6 lg:px-8 text-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center">
              <div className="h-10 w-10 relative mr-2">
                <Image 
                  src="/images/LeadCloserLogo.jpg" 
                  alt="LeadCloser Logo" 
                  fill
                  className="object-contain rounded-full"
                />
              </div>
              <span className="text-2xl font-bold text-gold">LeadCloser</span>
            </Link>
            <p className="mt-4 text-gray-300 text-sm">
              AI-powered lead generation for solopreneurs and small businesses.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gold">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gold">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
          
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-gold tracking-wider uppercase">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 pt-8 border-t border-navy-blue-light flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            &copy; {new Date().getFullYear()} LeadCloser. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:w-64 px-4 py-2 rounded-md bg-navy-blue-light border border-navy-blue-light focus:border-gold focus:outline-none"
              />
              <Button type="submit" className="bg-gold text-navy-blue-dark hover:bg-gold-dark">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

interface LayoutProps {
  children: React.ReactNode;
  isLoggedIn?: boolean;
  userName?: string;
  userEmail?: string;
  onLogout?: () => void;
  hideFooter?: boolean;
}

export function AnimatedLayout({
  children,
  isLoggedIn = false,
  userName = '',
  userEmail = '',
  onLogout,
  hideFooter = false
}: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-navy-blue">
      <AnimatedNavbar
        isLoggedIn={isLoggedIn}
        userName={userName}
        userEmail={userEmail}
        onLogout={onLogout}
      />
      <main className="flex-grow pt-16">
        {children}
      </main>
      {!hideFooter && <AnimatedFooter />}
    </div>
  );
}
