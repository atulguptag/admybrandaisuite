"use client";

import React, {
  useState,
  useEffect,
  FormEvent,
  ChangeEvent,
  useRef,
} from "react";
import Image from "next/image";
import {
  Menu,
  X,
  Moon,
  Sun,
  Check,
  Star,
  ArrowRight,
  Play,
  Brain,
  Target,
  BarChart3,
  Zap,
  Shield,
  Users,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  LucideIcon,
} from "lucide-react";

// Type Definitions and Interfaces
interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface PricingPlan {
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
}

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
  image: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface BlogPost {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
}

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
}

interface CalculatorData {
  campaigns: number;
  teamMembers: number;
  monthlyBudget: number;
}

// Add Google Fonts and global styles
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap');
  
  input[type="range"]::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #e40678;
    cursor: pointer;
    border: 3px solid #ffffff;
    box-shadow: 0 4px 12px rgba(228, 6, 120, 0.3);
    transition: all 0.2s ease;
  }

  input[type="range"]::-webkit-slider-thumb:hover {
    transform: scale(1.2);
    box-shadow: 0 6px 20px rgba(228, 6, 120, 0.4);
  }

  input[type="range"]::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #e40678;
    cursor: pointer;
    border: 3px solid #ffffff;
    box-shadow: 0 4px 12px rgba(228, 6, 120, 0.3);
    transition: all 0.2s ease;
  }

  input[type="range"]::-moz-range-thumb:hover {
    transform: scale(1.2);
    box-shadow: 0 6px 20px rgba(228, 6, 120, 0.4);
  }

  @media (max-width: 640px) {
    input[type="range"]::-webkit-slider-thumb {
      width: 18px;
      height: 18px;
    }

    input[type="range"]::-moz-range-thumb {
      width: 18px;
      height: 18px;
    }
  }
  
  /* Apply Poppins font globally */
  * {
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif !important;
  }
  
  /* Display font for headings */
  .font-display {
    font-family: 'Outfit', serif !important;
  }
  
  /* Custom Scrollbar Styles */
  :global(html) {
    scrollbar-width: thin;
    scrollbar-color: #e40678 transparent;
  }

  :global(*::-webkit-scrollbar) {
    width: 8px;
    height: 8px;
  }

  :global(*::-webkit-scrollbar-track) {
    background: transparent;
    border-radius: 10px;
  }

  :global(*::-webkit-scrollbar-thumb) {
    background: linear-gradient(135deg, #e40678 0%, #b8055e 100%);
    border-radius: 10px;
    border: 2px solid transparent;
    background-clip: content-box;
    transition: all 0.3s ease;
  }

  :global(*::-webkit-scrollbar-thumb:hover) {
    background: linear-gradient(135deg, #c5055f 0%, #9e0450 100%);
    border: 1px solid transparent;
    transform: scale(1.1);
  }

  :global(*::-webkit-scrollbar-thumb:active) {
    background: linear-gradient(135deg, #a8044f 0%, #8a0342 100%);
  }

  :global(*::-webkit-scrollbar-corner) {
    background: transparent;
  }

  /* Dark mode scrollbar adjustments */
  :global(.dark *::-webkit-scrollbar-track) {
    background: rgba(55, 65, 81, 0.3);
  }

  :global(.dark *::-webkit-scrollbar-thumb) {
    background: linear-gradient(135deg, #e40678 0%, #b8055e 100%);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  }

  /* Custom scrollbar for modal */
  :global(.modal-content::-webkit-scrollbar) {
    width: 6px;
  }

  :global(.modal-content::-webkit-scrollbar-thumb) {
    background: linear-gradient(135deg, #e40678 0%, #b8055e 100%);
    border-radius: 6px;
  }

  .glassmorphism {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .dark-glassmorphism {
    background: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .gradient-text {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  .animate-fade-in {
    animation: fadeIn 0.8s ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-slide-up {
    animation: slideUp 0.6s ease-out;
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-scale-in {
    animation: scaleIn 0.5s ease-out;
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .hover-lift {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .hover-lift:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
`;

// Add styles to document head
if (typeof document !== "undefined") {
  const styleElement = document.createElement("style");
  styleElement.textContent = globalStyles;
  document.head.appendChild(styleElement);
}

// Custom Hook for Scroll-triggered Animations
const useScrollAnimation = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px 0px -50px 0px",
        ...options,
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [options]);

  return [elementRef, isVisible] as const;
};

// Animated Container Component
interface AnimatedContainerProps {
  children: React.ReactNode;
  className?: string;
  animationType?:
    | "fadeIn"
    | "slideUp"
    | "slideInLeft"
    | "slideInRight"
    | "scaleIn";
  delay?: number;
}

const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  children,
  className = "",
  animationType = "fadeIn",
  delay = 0,
}) => {
  const [ref, isVisible] = useScrollAnimation();

  const getAnimationClass = () => {
    const baseClass = "transition-all duration-1000 ease-out";
    if (!isVisible) {
      switch (animationType) {
        case "slideUp":
          return `${baseClass} opacity-0 translate-y-10`;
        case "slideInLeft":
          return `${baseClass} opacity-0 -translate-x-10`;
        case "slideInRight":
          return `${baseClass} opacity-0 translate-x-10`;
        case "scaleIn":
          return `${baseClass} opacity-0 scale-95`;
        default:
          return `${baseClass} opacity-0`;
      }
    }
    return `${baseClass} opacity-100 translate-y-0 translate-x-0 scale-100`;
  };

  return (
    <div
      ref={ref}
      className={`${getAnimationClass()} ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

// 1. Navigation Component
interface NavigationProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (value: boolean) => void;
  scrollToSection: (sectionId: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  darkMode,
  setDarkMode,
  mobileMenuOpen,
  setMobileMenuOpen,
  scrollToSection,
}) => (
  <nav
    className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      darkMode
        ? "bg-gray-900/95 backdrop-blur-lg border-gray-800/50"
        : "bg-white/95 backdrop-blur-lg border-gray-200/50"
    } border-b shadow-sm`}
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16 lg:h-20">
        {/* Brand Logo */}
        <div className="flex items-center">
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold font-display text-[#e40678] tracking-tight">
            ADmyBRAND
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <div className="flex items-center space-x-2 xl:space-x-4">
            {[
              "home",
              "features",
              "pricing",
              "testimonials",
              "blog",
              "contact",
            ].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`px-4 py-2 text-sm xl:text-base font-medium rounded-lg transition-all duration-200 cursor-pointer hover:scale-105 capitalize ${
                  darkMode
                    ? "text-gray-300 hover:text-white hover:bg-[#e40678]/10"
                    : "text-gray-700 hover:text-gray-900 hover:bg-[#e40678]/5"
                }`}
              >
                {section}
              </button>
            ))}
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 sm:p-2.5 rounded-xl transition-all duration-200 cursor-pointer hover:scale-110 ${
              darkMode
                ? "bg-gray-800/80 text-yellow-400 hover:bg-gray-700 border border-gray-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
            }`}
          >
            {darkMode ? (
              <Sun size={18} className="sm:w-5 sm:h-5" />
            ) : (
              <Moon size={18} className="sm:w-5 sm:h-5" />
            )}
          </button>

          {/* CTA Button */}
          <button className="hidden sm:flex items-center bg-[#e40678] text-white px-4 lg:px-6 py-2 lg:py-2.5 rounded-xl font-medium text-sm lg:text-base hover:bg-[#c5055f] hover:shadow-lg hover:shadow-[#e40678]/25 transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
            <span className="hidden md:inline">Get Started</span>
            <span className="md:hidden">Start</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 sm:p-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
              darkMode
                ? "bg-gray-800/80 text-gray-300 hover:bg-gray-700 border border-gray-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
            }`}
          >
            {mobileMenuOpen ? (
              <X size={20} className="sm:w-6 sm:h-6" />
            ) : (
              <Menu size={20} className="sm:w-6 sm:h-6" />
            )}
          </button>
        </div>
      </div>
    </div>

    {/* Mobile Menu Overlay */}
    {mobileMenuOpen && (
      <div className="lg:hidden">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <div
          className={`relative z-50 border-t shadow-xl ${
            darkMode
              ? "border-gray-800/50 bg-gray-900/98"
              : "border-gray-200/50 bg-white/98"
          } backdrop-blur-lg`}
        >
          <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-1">
            {/* Navigation Links */}
            {[
              "home",
              "features",
              "pricing",
              "testimonials",
              "blog",
              "contact",
            ].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`flex items-center justify-between w-full px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 cursor-pointer group capitalize ${
                  darkMode
                    ? "text-gray-300 hover:text-white hover:bg-[#e40678]/10"
                    : "text-gray-700 hover:text-gray-900 hover:bg-[#e40678]/5"
                }`}
              >
                <span>{section}</span>
                <ArrowRight
                  size={16}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                />
              </button>
            ))}

            {/* Mobile CTA Button */}
            <div className="pt-4 border-t border-gray-200/20">
              <button className="w-full flex items-center justify-center bg-[#e40678] text-white px-6 py-4 rounded-xl font-semibold text-base hover:bg-[#c5055f] hover:shadow-lg hover:shadow-[#e40678]/25 transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                Get Started Free
                <ArrowRight size={18} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </nav>
);

// 2. Hero Section Component
interface HeroSectionProps {
  darkMode: boolean;
  setShowDemoModal: (value: boolean) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  darkMode,
  setShowDemoModal,
}) => (
  <section
    id="home"
    className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center"
  >
    <div className="max-w-7xl mx-auto w-full">
      <div className="text-center">
        <AnimatedContainer animationType="slideUp">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-display mb-6 leading-tight tracking-tight">
            Transform Your Marketing with{" "}
            <span
              className="bg-gradient-to-r from-[#e40678] to-[#b8055e] bg-clip-text text-transparent"
              style={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              AI Intelligence
            </span>
          </h1>
        </AnimatedContainer>

        <AnimatedContainer animationType="slideUp" delay={200}>
          <p
            className={`text-lg sm:text-xl md:text-2xl mb-10 max-w-4xl mx-auto leading-relaxed ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Revolutionize your digital marketing strategy with our advanced AI
            suite. Generate high-converting campaigns, target the right
            audience, and scale your business effortlessly.
          </p>
        </AnimatedContainer>

        <AnimatedContainer animationType="slideUp" delay={400}>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-16 px-4 sm:px-0">
            <button className="bg-[#e40678] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-[#b8055e] hover:shadow-2xl hover:shadow-[#e40678]/20 transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              Start Free Trial
            </button>
            <button
              onClick={() => setShowDemoModal(true)}
              className={`px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg border-2 transition-all duration-300 cursor-pointer ${
                darkMode
                  ? "border-[#e40678] text-[#e40678] hover:bg-[#e40678]/10 hover:border-[#b8055e]"
                  : "border-[#e40678] text-[#e40678] hover:bg-[#e40678]/5 hover:border-[#b8055e]"
              }`}
            >
              Watch Demo
            </button>
          </div>
        </AnimatedContainer>

        {/* Hero Visual Cards */}
        <AnimatedContainer animationType="scaleIn" delay={600}>
          <div className="relative max-w-6xl mx-auto px-4 sm:px-0">
            <div
              className={`rounded-3xl p-6 sm:p-8 lg:p-12 ${
                darkMode
                  ? "bg-gray-900/50 border border-gray-800"
                  : "bg-white/50 border border-gray-200"
              } backdrop-blur-xl animate-float shadow-2xl`}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                <AnimatedContainer animationType="slideUp" delay={800}>
                  <div
                    className={`p-6 lg:p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                      darkMode
                        ? "bg-gray-800/70 border border-gray-700"
                        : "bg-white/80 border border-gray-100"
                    } backdrop-blur-sm group`}
                  >
                    <div className="flex justify-center mb-4">
                      <div className="p-3 rounded-full bg-[#e40678]/10">
                        <BarChart3 className="w-8 h-8 lg:w-10 lg:h-10 text-[#e40678]" />
                      </div>
                    </div>
                    <h3 className="font-bold text-lg lg:text-xl mb-3 group-hover:text-[#e40678] transition-colors">
                      Analytics Dashboard
                    </h3>
                    <p
                      className={`text-sm lg:text-base ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Real-time performance tracking with advanced insights
                    </p>
                  </div>
                </AnimatedContainer>

                <AnimatedContainer animationType="slideUp" delay={1000}>
                  <div
                    className={`p-6 lg:p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                      darkMode
                        ? "bg-gray-800/70 border border-gray-700"
                        : "bg-white/80 border border-gray-100"
                    } backdrop-blur-sm group`}
                  >
                    <div className="flex justify-center mb-4">
                      <div className="p-3 rounded-full bg-[#e40678]/10">
                        <Brain className="w-8 h-8 lg:w-10 lg:h-10 text-[#e40678]" />
                      </div>
                    </div>
                    <h3 className="font-bold text-lg lg:text-xl mb-3 group-hover:text-[#e40678] transition-colors">
                      AI Content Engine
                    </h3>
                    <p
                      className={`text-sm lg:text-base ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Generate compelling campaigns with AI precision
                    </p>
                  </div>
                </AnimatedContainer>

                <AnimatedContainer animationType="slideUp" delay={1200}>
                  <div
                    className={`p-6 lg:p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                      darkMode
                        ? "bg-gray-800/70 border border-gray-700"
                        : "bg-white/80 border border-gray-100"
                    } backdrop-blur-sm group`}
                  >
                    <div className="flex justify-center mb-4">
                      <div className="p-3 rounded-full bg-[#e40678]/10">
                        <Target className="w-8 h-8 lg:w-10 lg:h-10 text-[#e40678]" />
                      </div>
                    </div>
                    <h3 className="font-bold text-lg lg:text-xl mb-3 group-hover:text-[#e40678] transition-colors">
                      Smart Targeting
                    </h3>
                    <p
                      className={`text-sm lg:text-base ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Reach your ideal audience with laser focus
                    </p>
                  </div>
                </AnimatedContainer>
              </div>
            </div>
          </div>
        </AnimatedContainer>
      </div>
    </div>
  </section>
);

// 3. Features Section Component
interface FeaturesSectionProps {
  darkMode: boolean;
  features: Feature[];
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  darkMode,
  features,
}) => (
  <section
    id="features"
    className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
  >
    <div className="max-w-7xl mx-auto">
      <AnimatedContainer animationType="slideUp">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-display mb-4 sm:mb-6 leading-tight">
            Powerful Features for Modern Marketing
          </h2>
          <p
            className={`text-base sm:text-lg md:text-xl lg:text-xl max-w-2xl sm:max-w-3xl mx-auto px-4 sm:px-0 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Our comprehensive AI suite provides everything you need to create,
            optimize, and scale your marketing campaigns with unprecedented
            efficiency.
          </p>
        </div>
      </AnimatedContainer>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {features.map((feature: Feature, index: number) => (
          <AnimatedContainer
            key={index}
            animationType="slideUp"
            delay={200 + index * 100}
          >
            <div
              className={`group p-6 sm:p-7 md:p-8 rounded-xl sm:rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden ${
                darkMode
                  ? "bg-gray-800/60 hover:bg-gray-800/80 border border-gray-700/50 hover:border-[#e40678]/30"
                  : "bg-white/80 hover:bg-white border border-gray-100 hover:border-[#e40678]/20 shadow-sm"
              } backdrop-blur-lg`}
            >
              {/* Subtle accent border on hover */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-[#e40678]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="mb-5 sm:mb-6">
                  <div className="inline-flex p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#e40678]/10 group-hover:bg-[#e40678]/15 transition-colors duration-300">
                    <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-[#e40678] group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl md:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 group-hover:text-[#e40678] transition-colors duration-300 leading-tight">
                  {feature.title}
                </h3>

                <p
                  className={`text-sm sm:text-base md:text-base leading-relaxed ${
                    darkMode
                      ? "text-gray-300 group-hover:text-gray-200"
                      : "text-gray-600 group-hover:text-gray-700"
                  } transition-colors duration-300`}
                >
                  {feature.description}
                </p>
              </div>

              {/* Subtle hover glow effect */}
              <div className="absolute -inset-0.5 bg-[#e40678]/20 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10"></div>
            </div>
          </AnimatedContainer>
        ))}
      </div>
    </div>
  </section>
);

// 4. Pricing Section Component
interface PricingSectionProps {
  darkMode: boolean;
  pricingPlans: PricingPlan[];
}

const PricingSection: React.FC<PricingSectionProps> = ({
  darkMode,
  pricingPlans,
}) => (
  <section id="pricing" className={`py-16 md:py-20 px-4 sm:px-6 lg:px-8`}>
    <div className="max-w-7xl mx-auto">
      <AnimatedContainer animationType="slideUp">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-4 md:mb-6">
            Choose Your Perfect Plan
          </h2>
          <p
            className={`text-lg md:text-xl max-w-3xl mx-auto px-4 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Flexible pricing options designed to grow with your business. Start
            free and upgrade as you scale.
          </p>
        </div>
      </AnimatedContainer>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
        {pricingPlans.map((plan: PricingPlan, index: number) => (
          <AnimatedContainer
            key={index}
            animationType="slideUp"
            delay={200 + index * 150}
          >
            <div
              className={`relative p-6 md:p-8 rounded-2xl md:rounded-3xl transition-all duration-300 hover:-translate-y-2 group ${
                plan.popular
                  ? "ring-2 ring-[#e40678] shadow-2xl shadow-[#e40678]/10 scale-[1.02] md:scale-105"
                  : "hover:shadow-xl"
              } ${
                darkMode ? "bg-gray-800/90" : "bg-white"
              } backdrop-blur-sm border ${
                darkMode ? "border-gray-700" : "border-gray-200"
              } hover:border-[#e40678]/30`}
            >
              {plan.popular && (
                <div className="absolute -top-3 md:-top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#e40678] text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6 md:mb-8">
                <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-[#e40678] transition-colors duration-300">
                  {plan.name}
                </h3>
                <p
                  className={`text-sm md:text-base ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  } mb-4`}
                >
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center">
                  <span className="text-3xl md:text-4xl font-bold text-[#e40678]">
                    ${plan.price}
                  </span>
                  <span
                    className={`text-sm md:text-base ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    } ml-2`}
                  >
                    /{plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                {plan.features.map((feature: string, featureIndex: number) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="w-4 h-4 md:w-5 md:h-5 text-[#e40678] mr-3 flex-shrink-0 mt-0.5" />
                    <span
                      className={`text-sm md:text-base ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 md:py-4 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 cursor-pointer ${
                  plan.popular
                    ? "bg-[#e40678] text-white hover:bg-[#c4056b] hover:shadow-lg hover:shadow-[#e40678]/25 transform hover:-translate-y-0.5"
                    : darkMode
                    ? "bg-gray-700 text-white hover:bg-[#e40678] border border-gray-600 hover:border-[#e40678]"
                    : "bg-gray-100 text-gray-900 hover:bg-[#e40678] hover:text-white border border-gray-200 hover:border-[#e40678]"
                }`}
              >
                {plan.popular ? "Start Free Trial" : "Get Started"}
              </button>
            </div>
          </AnimatedContainer>
        ))}
      </div>
    </div>
  </section>
);

// 5. Testimonials Section Component
interface TestimonialsSectionProps {
  darkMode: boolean;
  testimonials: Testimonial[];
  currentTestimonial: number;
  nextTestimonial: () => void;
  prevTestimonial: () => void;
  setCurrentTestimonial: (index: number) => void;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  darkMode,
  testimonials,
  currentTestimonial,
  nextTestimonial,
  prevTestimonial,
  setCurrentTestimonial,
}) => (
  <section id="testimonials" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <AnimatedContainer animationType="slideUp">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-4 md:mb-6">
            What Our Customers Say
          </h2>
          <p
            className={`text-lg md:text-xl max-w-3xl mx-auto px-4 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Join thousands of successful businesses who trust ADmyBRAND AI Suite
            to power their marketing success.
          </p>
        </div>
      </AnimatedContainer>

      <AnimatedContainer animationType="scaleIn" delay={300}>
        <div className="relative max-w-4xl mx-auto">
          <div
            className={`p-6 md:p-12 rounded-2xl md:rounded-3xl ${
              darkMode ? "bg-gray-800/90" : "bg-white"
            } backdrop-blur-sm border ${
              darkMode ? "border-gray-700" : "border-gray-200"
            } shadow-xl hover:shadow-2xl transition-all duration-300`}
          >
            <div className="text-center">
              <div className="flex justify-center mb-4 md:mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map(
                  (_, i: number) => (
                    <Star
                      key={i}
                      className="w-5 h-5 md:w-6 md:h-6 text-[#e40678] fill-current"
                    />
                  )
                )}
              </div>

              <blockquote className="text-lg md:text-xl lg:text-2xl font-medium mb-6 md:mb-8 leading-relaxed px-4">
                &quot;{testimonials[currentTestimonial].content}&quot;
              </blockquote>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="relative">
                  <Image
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-[#e40678]/20 shadow-lg hover:shadow-xl transition-all duration-300"
                    width={48}
                    height={48}
                    onError={(
                      e: React.SyntheticEvent<HTMLImageElement, Event>
                    ) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const nextSibling = target.nextSibling as HTMLElement;
                      if (nextSibling) {
                        nextSibling.style.display = "flex";
                      }
                    }}
                  />
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white font-bold text-lg bg-[#e40678] shadow-lg hidden">
                    {testimonials[currentTestimonial].avatar}
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="font-semibold text-base md:text-lg">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div
                    className={`text-sm md:text-base ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {testimonials[currentTestimonial].role} at{" "}
                    {testimonials[currentTestimonial].company}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className={`absolute left-2 md:left-0 top-1/2 transform -translate-y-1/2 p-2 md:p-3 rounded-full transition-all duration-200 cursor-pointer ${
              darkMode
                ? "bg-gray-800 text-white hover:bg-[#e40678] border border-gray-700"
                : "bg-white text-gray-700 hover:bg-[#e40678] hover:text-white border border-gray-200"
            } shadow-lg hover:shadow-xl`}
          >
            <ChevronLeft size={20} className="md:w-6 md:h-6" />
          </button>

          <button
            onClick={nextTestimonial}
            className={`absolute right-2 md:right-0 top-1/2 transform -translate-y-1/2 p-2 md:p-3 rounded-full transition-all duration-200 cursor-pointer ${
              darkMode
                ? "bg-gray-800 text-white hover:bg-[#e40678] border border-gray-700"
                : "bg-white text-gray-700 hover:bg-[#e40678] hover:text-white border border-gray-200"
            } shadow-lg hover:shadow-xl`}
          >
            <ChevronRight size={20} className="md:w-6 md:h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 md:mt-8 space-x-2">
            {testimonials.map((_, index: number) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-200 cursor-pointer ${
                  index === currentTestimonial
                    ? "bg-[#e40678] scale-125"
                    : darkMode
                    ? "bg-gray-600 hover:bg-gray-500"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </AnimatedContainer>
    </div>
  </section>
);

// 6. FAQ Section Component
interface FAQSectionProps {
  darkMode: boolean;
  faqs: FAQ[];
  openFAQ: number | null;
  toggleFAQ: (index: number) => void;
}

const FAQSection: React.FC<FAQSectionProps> = ({
  darkMode,
  faqs,
  openFAQ,
  toggleFAQ,
}) => (
  <section
    id="faq"
    className={`py-16 md:py-24 px-4 sm:px-6 lg:px-8 animate-fade-in`}
  >
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12 md:mb-20">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-4 md:mb-6 leading-tight">
          Frequently Asked Questions
        </h2>
        <p
          className={`text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto px-4 sm:px-0 ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Get answers to common questions about our AI marketing platform.
        </p>
      </div>

      <div className="space-y-3 md:space-y-4">
        {faqs.map((faq: FAQ, index: number) => (
          <div
            key={index}
            className={`rounded-xl md:rounded-2xl transition-all duration-300 hover:shadow-lg group ${
              darkMode
                ? "bg-gray-800/80 border border-gray-700 hover:border-[#e40678]/30"
                : "bg-white border border-gray-200 hover:border-[#e40678]/30"
            } backdrop-blur-sm overflow-hidden`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full p-4 md:p-6 text-left flex items-center justify-between hover:bg-[#e40678]/5 transition-all duration-200 cursor-pointer group/button"
            >
              <span className="text-base md:text-lg lg:text-xl font-semibold pr-4 group-hover/button:text-[#e40678] transition-colors duration-200">
                {faq.question}
              </span>
              <div
                className={`flex-shrink-0 p-1 rounded-full transition-all duration-200 ${
                  openFAQ === index
                    ? "bg-[#e40678]/10 rotate-180"
                    : "bg-gray-100 group-hover/button:bg-[#e40678]/10"
                }`}
              >
                {openFAQ === index ? (
                  <Minus className="w-4 h-4 md:w-5 md:h-5 text-[#e40678]" />
                ) : (
                  <Plus className="w-4 h-4 md:w-5 md:h-5 text-[#e40678]" />
                )}
              </div>
            </button>

            {openFAQ === index && (
              <div className="px-4 md:px-6 pb-4 md:pb-6 animate-fade-in">
                <div
                  className={`h-px mb-4 ${
                    darkMode ? "bg-gray-700" : "bg-gray-200"
                  }`}
                ></div>
                <p
                  className={`text-sm md:text-base lg:text-lg leading-relaxed ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

// 7. Contact Section Component
interface ContactSectionProps {
  darkMode: boolean;
  formData: FormData;
  formErrors: FormErrors;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  darkMode,
  formData,
  formErrors,
  handleSubmit,
  handleInputChange,
}) => (
  <section
    id="contact"
    className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 animate-fade-in"
  >
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12 md:mb-20">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-4 md:mb-6 leading-tight">
          Get in Touch
        </h2>
        <p
          className={`text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto px-4 sm:px-0 ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Ready to transform your marketing? Contact our team for a personalized
          demo and discover how ADmyBRAND AI Suite can accelerate your growth.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Contact Information */}
        <div className="order-2 lg:order-1">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 md:mb-8">
            Let&apos;s Start a Conversation
          </h3>

          <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
            <div className="flex items-start group">
              <div
                className={`p-3 md:p-4 rounded-xl mr-4 md:mr-6 transition-all duration-200 group-hover:scale-110 ${
                  darkMode
                    ? "bg-gray-800/80 border border-gray-700 group-hover:border-[#e40678]/30"
                    : "bg-gray-50 border border-gray-200 group-hover:border-[#e40678]/30 group-hover:shadow-lg"
                }`}
              >
                <Mail className="w-5 h-5 md:w-6 md:h-6 text-[#e40678]" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-base md:text-lg mb-1">
                  Email Us
                </div>
                <div
                  className={`text-sm md:text-base ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  hello@admybrand.com
                </div>
              </div>
            </div>

            <div className="flex items-start group">
              <div
                className={`p-3 md:p-4 rounded-xl mr-4 md:mr-6 transition-all duration-200 group-hover:scale-110 ${
                  darkMode
                    ? "bg-gray-800/80 border border-gray-700 group-hover:border-[#e40678]/30"
                    : "bg-gray-50 border border-gray-200 group-hover:border-[#e40678]/30 group-hover:shadow-lg"
                }`}
              >
                <Phone className="w-5 h-5 md:w-6 md:h-6 text-[#e40678]" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-base md:text-lg mb-1">
                  Call Us
                </div>
                <div
                  className={`text-sm md:text-base ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  +1 (555) 123-4567
                </div>
              </div>
            </div>

            <div className="flex items-start group">
              <div
                className={`p-3 md:p-4 rounded-xl mr-4 md:mr-6 transition-all duration-200 group-hover:scale-110 ${
                  darkMode
                    ? "bg-gray-800/80 border border-gray-700 group-hover:border-[#e40678]/30"
                    : "bg-gray-50 border border-gray-200 group-hover:border-[#e40678]/30 group-hover:shadow-lg"
                }`}
              >
                <MapPin className="w-5 h-5 md:w-6 md:h-6 text-[#e40678]" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-base md:text-lg mb-1">
                  Visit Us
                </div>
                <div
                  className={`text-sm md:text-base ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  123 Innovation Drive, San Francisco, CA 94105
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-base md:text-lg mb-4 md:mb-6">
              Follow Us
            </h4>
            <div className="flex flex-wrap gap-3 md:gap-4">
              {[Facebook, Twitter, Linkedin, Instagram].map(
                (Icon: LucideIcon, index: number) => (
                  <button
                    key={index}
                    className={`p-3 md:p-4 rounded-xl transition-all duration-200 cursor-pointer hover:scale-110 hover:-translate-y-1 ${
                      darkMode
                        ? "bg-gray-800/80 text-gray-300 hover:bg-[#e40678] hover:text-white border border-gray-700 hover:border-[#e40678]"
                        : "bg-gray-50 text-gray-600 hover:bg-[#e40678] hover:text-white border border-gray-200 hover:border-[#e40678] hover:shadow-lg"
                    }`}
                  >
                    <Icon size={18} className="md:w-5 md:h-5" />
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="order-1 lg:order-2">
          <div
            className={`p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl backdrop-blur-sm border transition-all duration-300 hover:shadow-2xl ${
              darkMode
                ? "bg-gray-800/70 border-gray-700 hover:border-[#e40678]/30"
                : "bg-white/80 border-gray-200 hover:border-[#e40678]/30"
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label className="block text-sm md:text-base font-medium mb-2 md:mb-3">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 md:px-5 py-3 md:py-4 rounded-xl md:rounded-2xl border transition-all duration-200 text-sm md:text-base ${
                    formErrors.name
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : darkMode
                      ? "border-gray-600 bg-gray-700/50 text-white focus:border-[#e40678] focus:ring-[#e40678]/20 hover:border-gray-500"
                      : "border-gray-300 bg-white/50 focus:border-[#e40678] focus:ring-[#e40678]/20 hover:border-gray-400"
                  } focus:outline-none focus:ring-2 backdrop-blur-sm`}
                  placeholder="Enter your full name"
                />
                {formErrors.name && (
                  <p className="text-red-500 text-xs md:text-sm mt-2">
                    {formErrors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm md:text-base font-medium mb-2 md:mb-3">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 md:px-5 py-3 md:py-4 rounded-xl md:rounded-2xl border transition-all duration-200 text-sm md:text-base ${
                    formErrors.email
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : darkMode
                      ? "border-gray-600 bg-gray-700/50 text-white focus:border-[#e40678] focus:ring-[#e40678]/20 hover:border-gray-500"
                      : "border-gray-300 bg-white/50 focus:border-[#e40678] focus:ring-[#e40678]/20 hover:border-gray-400"
                  } focus:outline-none focus:ring-2 backdrop-blur-sm`}
                  placeholder="Enter your email address"
                />
                {formErrors.email && (
                  <p className="text-red-500 text-xs md:text-sm mt-2">
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm md:text-base font-medium mb-2 md:mb-3">
                  Company *
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className={`w-full px-4 md:px-5 py-3 md:py-4 rounded-xl md:rounded-2xl border transition-all duration-200 text-sm md:text-base ${
                    formErrors.company
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : darkMode
                      ? "border-gray-600 bg-gray-700/50 text-white focus:border-[#e40678] focus:ring-[#e40678]/20 hover:border-gray-500"
                      : "border-gray-300 bg-white/50 focus:border-[#e40678] focus:ring-[#e40678]/20 hover:border-gray-400"
                  } focus:outline-none focus:ring-2 backdrop-blur-sm`}
                  placeholder="Enter your company name"
                />
                {formErrors.company && (
                  <p className="text-red-500 text-xs md:text-sm mt-2">
                    {formErrors.company}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm md:text-base font-medium mb-2 md:mb-3">
                  Message *
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`w-full px-4 md:px-5 py-3 md:py-4 rounded-xl md:rounded-2xl border transition-all duration-200 resize-none text-sm md:text-base ${
                    formErrors.message
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : darkMode
                      ? "border-gray-600 bg-gray-700/50 text-white focus:border-[#e40678] focus:ring-[#e40678]/20 hover:border-gray-500"
                      : "border-gray-300 bg-white/50 focus:border-[#e40678] focus:ring-[#e40678]/20 hover:border-gray-400"
                  } focus:outline-none focus:ring-2 backdrop-blur-sm`}
                  placeholder="Tell us about your project and how we can help..."
                />
                {formErrors.message && (
                  <p className="text-red-500 text-xs md:text-sm mt-2">
                    {formErrors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#e40678] text-white py-3 md:py-4 rounded-xl md:rounded-2xl font-semibold text-sm md:text-base hover:bg-[#b8055e] hover:shadow-2xl hover:shadow-[#e40678]/20 transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// 8. Footer Component
interface FooterProps {
  darkMode: boolean;
  scrollToSection: (sectionId: string) => void;
  newsletterEmail: string;
  newsletterError: string;
  handleNewsletterSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleNewsletterChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Footer: React.FC<FooterProps> = ({
  darkMode,
  scrollToSection,
  newsletterEmail,
  newsletterError,
  handleNewsletterSubmit,
  handleNewsletterChange,
}) => (
  <footer
    className={`py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-t ${
      darkMode
        ? "bg-gray-900/95 border-gray-800/50"
        : "bg-white border-gray-100"
    } backdrop-blur-sm`}
  >
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        {/* Brand Section */}
        <div className="sm:col-span-2 lg:col-span-2">
          <div className="mb-6">
            <div className="text-2xl md:text-3xl font-bold font-display text-[#e40678] mb-4">
              ADmyBRAND
            </div>
            <p
              className={`text-sm md:text-base leading-relaxed max-w-sm md:max-w-md ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Transform your marketing with AI intelligence. Generate
              high-converting campaigns, target the right audience, and scale
              your business effortlessly.
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-3">
            {[Facebook, Twitter, Linkedin, Instagram].map(
              (Icon: LucideIcon, index: number) => (
                <button
                  key={index}
                  className={`p-3 rounded-xl transition-all duration-300 cursor-pointer group ${
                    darkMode
                      ? "bg-gray-800/60 text-gray-400 hover:bg-[#e40678]/20 hover:text-[#e40678] border border-gray-700/50 hover:border-[#e40678]/30"
                      : "bg-gray-50 text-gray-500 hover:bg-[#e40678]/10 hover:text-[#e40678] border border-gray-200 hover:border-[#e40678]/30"
                  } hover:shadow-lg hover:shadow-[#e40678]/10 hover:-translate-y-1`}
                >
                  <Icon
                    size={20}
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                </button>
              )
            )}
          </div>
        </div>

        {/* Product Section */}
        <div className="space-y-4">
          <h4
            className={`font-semibold text-base md:text-lg ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Product
          </h4>
          <ul className="space-y-3">
            {[
              "Features",
              "Pricing",
              "API",
              "Documentation",
              "Integrations",
            ].map((item: string) => (
              <li key={item}>
                <button
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm md:text-base transition-all duration-200 cursor-pointer hover:translate-x-1 ${
                    darkMode
                      ? "text-gray-400 hover:text-[#e40678]"
                      : "text-gray-600 hover:text-[#e40678]"
                  }`}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Section */}
        <div className="space-y-4">
          <h4
            className={`font-semibold text-base md:text-lg ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Company
          </h4>
          <ul className="space-y-3">
            {["About Us", "Careers", "Blog", "Press", "Contact"].map(
              (item: string) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`text-sm md:text-base transition-all duration-200 cursor-pointer hover:translate-x-1 ${
                      darkMode
                        ? "text-gray-400 hover:text-[#e40678]"
                        : "text-gray-600 hover:text-[#e40678]"
                    }`}
                  >
                    {item}
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      {/* Newsletter Section */}
      <div
        className={`mt-12 md:mt-16 py-8 md:py-10 px-6 md:px-8 rounded-2xl md:rounded-3xl ${
          darkMode
            ? "bg-gray-800/40 border border-gray-700/50"
            : "bg-gray-50/80 border border-gray-200"
        }`}
      >
        <div className="text-center max-w-2xl mx-auto">
          <h3
            className={`text-lg md:text-xl font-semibold mb-3 md:mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Stay Updated
          </h3>
          <p
            className={`text-sm md:text-base mb-6 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Get the latest updates on AI marketing trends and product features.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={handleNewsletterChange}
                  placeholder="Enter your email"
                  className={`w-full px-4 py-3 rounded-xl border text-sm md:text-base transition-all duration-200 ${
                    newsletterError
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : darkMode
                      ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-[#e40678] focus:ring-[#e40678]/20 hover:border-gray-500"
                      : "bg-white border-gray-300 placeholder-gray-500 focus:border-[#e40678] focus:ring-[#e40678]/20 hover:border-gray-400"
                  } focus:outline-none focus:ring-2`}
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-[#e40678] text-white rounded-xl font-medium text-sm md:text-base hover:bg-[#c5055f] transition-all duration-300 hover:shadow-lg hover:shadow-[#e40678]/20 whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!newsletterEmail.trim()}
              >
                Subscribe
              </button>
            </div>
            {newsletterError && (
              <p className="text-red-500 text-xs md:text-sm mt-2 text-left sm:text-center">
                {newsletterError}
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Bottom Footer */}
      <div
        className={`mt-12 md:mt-16 pt-8 md:pt-10 border-t ${
          darkMode ? "border-gray-800/50" : "border-gray-200"
        }`}
      >
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p
            className={`text-xs md:text-sm text-center md:text-left ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            © 2025 ADmyBRAND. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6">
            <button
              className={`text-xs md:text-sm transition-colors duration-200 cursor-pointer ${
                darkMode
                  ? "text-gray-400 hover:text-[#e40678]"
                  : "text-gray-500 hover:text-[#e40678]"
              }`}
            >
              Privacy Policy
            </button>
            <button
              className={`text-xs md:text-sm transition-colors duration-200 cursor-pointer ${
                darkMode
                  ? "text-gray-400 hover:text-[#e40678]"
                  : "text-gray-500 hover:text-[#e40678]"
              }`}
            >
              Terms of Service
            </button>
            <button
              className={`text-xs md:text-sm transition-colors duration-200 cursor-pointer ${
                darkMode
                  ? "text-gray-400 hover:text-[#e40678]"
                  : "text-gray-500 hover:text-[#e40678]"
              }`}
            >
              Cookie Policy
            </button>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

// 9. Toast Notification Component
interface ToastNotificationProps {
  showToast: boolean;
  toastMessage: string;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({
  showToast,
  toastMessage,
}) => (
  <>
    {showToast && (
      <div
        className={
          "fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transition-all duration-300 bg-green-600 text-white"
        }
      >
        {toastMessage}
      </div>
    )}
  </>
);

// 10. Demo Modal Component
interface DemoModalProps {
  darkMode: boolean;
  showDemoModal: boolean;
  setShowDemoModal: (value: boolean) => void;
}

const DemoModal: React.FC<DemoModalProps> = ({
  darkMode,
  showDemoModal,
  setShowDemoModal,
}) => (
  <>
    {showDemoModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-2 sm:p-4">
        <div
          className={`${
            darkMode ? "bg-gray-900" : "bg-white"
          } rounded-2xl sm:rounded-3xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-y-auto relative border ${
            darkMode ? "border-gray-700" : "border-gray-200"
          } modal-content`}
        >
          <button
            onClick={() => setShowDemoModal(false)}
            className={`absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-2 sm:p-3 rounded-full ${
              darkMode
                ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            } hover:scale-110 transition-all duration-200 cursor-pointer`}
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Header */}
          <div
            className={`p-4 sm:p-6 lg:p-8 border-b ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <h2
              className={`text-xl sm:text-2xl lg:text-3xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              } mb-2`}
            >
              ADmyBRAND AI Suite Demo
            </h2>
            <p
              className={`${
                darkMode ? "text-gray-400" : "text-gray-600"
              } text-sm sm:text-base`}
            >
              Experience next-generation AI marketing automation
            </p>
          </div>

          {/* Video Container */}
          <div className="p-4 sm:p-6 lg:p-8">
            <div
              className={`w-full aspect-video ${
                darkMode ? "bg-gray-800" : "bg-gray-100"
              } flex items-center justify-center rounded-xl sm:rounded-2xl mb-6 overflow-hidden relative border ${
                darkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <div className="relative z-10 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto mb-3 sm:mb-4 bg-[#e40678] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                  <Play className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white ml-1" />
                </div>
                <span
                  className={`text-base sm:text-lg lg:text-xl font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  } block mb-2`}
                >
                  Interactive Demo
                </span>
                <p
                  className={`text-xs sm:text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  } px-4`}
                >
                  Click to start the AI marketing platform walkthrough
                </p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6">
              <div
                className={`${
                  darkMode ? "bg-gray-800" : "bg-gray-50"
                } rounded-xl p-4 sm:p-6 border ${
                  darkMode ? "border-gray-700" : "border-gray-200"
                } hover:border-[#e40678] transition-colors duration-300`}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#e40678]/10 rounded-lg flex items-center justify-center mb-3">
                  <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-[#e40678]" />
                </div>
                <h3
                  className={`font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  } mb-2 text-sm sm:text-base`}
                >
                  AI Content Generation
                </h3>
                <p
                  className={`${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  } text-xs sm:text-sm`}
                >
                  Generate high-converting copy with advanced AI
                </p>
              </div>

              <div
                className={`${
                  darkMode ? "bg-gray-800" : "bg-gray-50"
                } rounded-xl p-4 sm:p-6 border ${
                  darkMode ? "border-gray-700" : "border-gray-200"
                } hover:border-[#e40678] transition-colors duration-300`}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#e40678]/10 rounded-lg flex items-center justify-center mb-3">
                  <Target className="w-4 h-4 sm:w-5 sm:h-5 text-[#e40678]" />
                </div>
                <h3
                  className={`font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  } mb-2 text-sm sm:text-base`}
                >
                  Smart Targeting
                </h3>
                <p
                  className={`${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  } text-xs sm:text-sm`}
                >
                  Reach your ideal customers with precision
                </p>
              </div>

              <div
                className={`${
                  darkMode ? "bg-gray-800" : "bg-gray-50"
                } rounded-xl p-4 sm:p-6 border ${
                  darkMode ? "border-gray-700" : "border-gray-200"
                } hover:border-[#e40678] transition-colors duration-300 sm:col-span-2 lg:col-span-1`}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#e40678]/10 rounded-lg flex items-center justify-center mb-3">
                  <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-[#e40678]" />
                </div>
                <h3
                  className={`font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  } mb-2 text-sm sm:text-base`}
                >
                  Analytics Dashboard
                </h3>
                <p
                  className={`${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  } text-xs sm:text-sm`}
                >
                  Real-time insights and performance tracking
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center pt-2">
              <button className="w-full sm:w-auto bg-[#e40678] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-[#c1055f] transition-all duration-300 font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer">
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </>
);

// Component Type
const ADmyBrandLandingPage: React.FC = () => {
  // State with proper TypeScript typing
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<number>(0);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [newsletterEmail, setNewsletterEmail] = useState<string>("");
  const [newsletterError, setNewsletterError] = useState<string>("");

  const [showDemoModal, setShowDemoModal] = useState<boolean>(false);

  useEffect(() => {
    if (showDemoModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showDemoModal]);

  // Mock data with proper typing
  const features: Feature[] = [
    {
      icon: Brain,
      title: "AI-Powered Content Generation",
      description:
        "Generate high-converting ad copy, social media posts, and email campaigns with our advanced AI engine.",
    },
    {
      icon: Target,
      title: "Smart Audience Targeting",
      description:
        "Identify and reach your ideal customers with precision using machine learning algorithms.",
    },
    {
      icon: BarChart3,
      title: "Real-Time Analytics",
      description:
        "Track campaign performance, ROI, and customer engagement with comprehensive dashboards.",
    },
    {
      icon: Zap,
      title: "Automated Workflows",
      description:
        "Streamline your marketing processes with intelligent automation and scheduling tools.",
    },
    {
      icon: Shield,
      title: "Brand Safety & Compliance",
      description:
        "Ensure your campaigns meet industry standards with built-in compliance monitoring.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description:
        "Work seamlessly with your team using shared workspaces and real-time collaboration features.",
    },
  ];

  const pricingPlans: PricingPlan[] = [
    {
      name: "Starter",
      price: 29,
      period: "month",
      description: "Perfect for small businesses and startups",
      features: [
        "Up to 5 campaigns",
        "AI content generation",
        "Basic analytics",
        "Email support",
        "1 team member",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: 99,
      period: "month",
      description: "Ideal for growing marketing teams",
      features: [
        "Unlimited campaigns",
        "Advanced AI features",
        "Real-time analytics",
        "Priority support",
        "Up to 10 team members",
        "Custom integrations",
        "A/B testing tools",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: 299,
      period: "month",
      description: "For large organizations with complex needs",
      features: [
        "Everything in Professional",
        "Custom AI models",
        "Dedicated account manager",
        "24/7 phone support",
        "Unlimited team members",
        "White-label options",
        "Advanced security",
        "Custom reporting",
      ],
      popular: false,
    },
  ];

  const testimonials: Testimonial[] = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechFlow Inc.",
      content:
        "ADmyBRAND AI Suite transformed our marketing strategy. We've seen a 300% increase in campaign performance and saved countless hours on content creation.",
      rating: 5,
      avatar: "SJ",
      image:
        "https://images.unsplash.com/photo-1536763225213-b5592b525630?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
    },
    {
      name: "Michael Chen",
      role: "CEO",
      company: "GrowthLabs",
      content:
        "The AI-powered targeting features are incredible. We're reaching exactly the right audience and our ROI has never been better.",
      rating: 5,
      avatar: "MC",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Growth",
      company: "StartupForge",
      content:
        "This platform is a game-changer. The automation features alone have freed up our team to focus on strategy rather than execution.",
      rating: 5,
      avatar: "ER",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
    },
  ];

  const faqs: FAQ[] = [
    {
      question: "How does the AI content generation work?",
      answer:
        "Our AI uses advanced natural language processing and machine learning models trained on millions of high-performing marketing campaigns. Simply input your brand guidelines and campaign objectives, and our AI will generate compelling, on-brand content tailored to your audience.",
    },
    {
      question: "Can I integrate ADmyBRAND with my existing tools?",
      answer:
        "Yes! We offer seamless integrations with popular platforms including Google Ads, Facebook Ads, HubSpot, Salesforce, Mailchimp, and many more. Our API also allows for custom integrations with your proprietary systems.",
    },
    {
      question: "What kind of support do you provide?",
      answer:
        "We provide comprehensive support including email support for all plans, priority support for Professional users, and 24/7 phone support for Enterprise customers. We also offer onboarding assistance, training sessions, and a comprehensive knowledge base.",
    },
    {
      question: "Is my data secure with ADmyBRAND?",
      answer:
        "Absolutely. We use enterprise-grade security measures including 256-bit SSL encryption, SOC 2 compliance, and regular security audits. Your data is stored in secure, GDPR-compliant data centers with multiple backup systems.",
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer:
        "Yes, you can cancel your subscription at any time without any cancellation fees. You'll continue to have access to your account until the end of your current billing period.",
    },
    {
      question: "Do you offer a free trial?",
      answer:
        "Yes! We offer a 14-day free trial with full access to all Professional features. No credit card required to start your trial.",
    },
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev: number) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Toast auto-hide
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Email is invalid";
    if (!formData.company.trim()) errors.company = "Company is required";
    if (!formData.message.trim()) errors.message = "Message is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validateForm()) {
      setToastMessage("Thank you! Your message has been sent successfully.");
      setShowToast(true);
      setFormData({ name: "", email: "", company: "", message: "" });
      setFormErrors({});
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors((prev: FormErrors) => ({ ...prev, [name]: "" }));
    }
  };

  const nextTestimonial = (): void => {
    setCurrentTestimonial((prev: number) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = (): void => {
    setCurrentTestimonial(
      (prev: number) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const toggleFAQ = (index: number): void => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Add newsletter subscription handlers
  const validateNewsletterEmail = (): boolean => {
    if (!newsletterEmail.trim()) {
      setNewsletterError("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(newsletterEmail)) {
      setNewsletterError("Please enter a valid email address");
      return false;
    }
    setNewsletterError("");
    return true;
  };

  const handleNewsletterSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validateNewsletterEmail()) {
      setToastMessage(
        "Thank you! You've been successfully subscribed to our newsletter."
      );
      setShowToast(true);
      setNewsletterEmail("");
      setNewsletterError("");
    }
  };

  const handleNewsletterChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewsletterEmail(e.target.value);
    if (newsletterError) {
      setNewsletterError("");
    }
  };

  const scrollToSection = (sectionId: string): void => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const [blogPosts] = useState<BlogPost[]>([
    {
      title: "The Future of AI in Digital Marketing",
      excerpt:
        "Discover how artificial intelligence is revolutionizing the way businesses approach marketing campaigns and customer engagement.",
      author: "Sarah Johnson",
      date: "March 15, 2025",
      category: "AI Marketing",
      readTime: "5 min read",
      image:
        "https://images.unsplash.com/photo-1495055154266-57bbdeada43e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8VGhlJTIwRnV0dXJlJTIwb2YlMjBBSSUyMGluJTIwRGlnaXRhbCUyME1hcmtldGluZ3xlbnwwfDB8MHx8fDI%3D",
    },
    {
      title: "10 Proven Strategies for Better Ad Targeting",
      excerpt:
        "Learn the advanced techniques that top marketers use to reach their ideal customers and maximize campaign ROI.",
      author: "Michael Chen",
      date: "March 12, 2025",
      category: "Strategy",
      readTime: "8 min read",
      image:
        "https://images.unsplash.com/photo-1539209812470-7617c4f7cf82?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8MTAlMjBQcm92ZW4lMjBTdHJhdGVnaWVzJTIwZm9yJTIwQmV0dGVyJTIwQWQlMjBUYXJnZXRpbmd8ZW58MHwwfDB8fHwy",
    },
    {
      title: "Case Study: 300% ROI Increase with AI",
      excerpt:
        "See how TechFlow Inc. transformed their marketing results using ADmyBRAND's AI-powered campaign optimization.",
      author: "Emily Rodriguez",
      date: "March 10, 2025",
      category: "Case Study",
      readTime: "6 min read",
      image: "https://antalyze.ai/blogs/aoi.webp",
    },
    {
      title: "Maximizing Social Media ROI with AI Automation",
      excerpt:
        "Explore advanced automation techniques that help brands achieve 5x better engagement rates across social platforms.",
      author: "David Kim",
      date: "March 8, 2025",
      category: "Social Media",
      readTime: "7 min read",
      image:
        "https://aisera.com/wp-content/uploads/2024/09/maximizing-roi-with-ai-1024x572.jpg",
    },
    {
      title: "The Psychology Behind High-Converting Ad Copy",
      excerpt:
        "Understand the cognitive triggers and psychological principles that make ad campaigns irresistible to your target audience.",
      author: "Amanda Foster",
      date: "March 5, 2025",
      category: "Psychology",
      readTime: "9 min read",
      image:
        "https://images.unsplash.com/photo-1563050860-87d45eaaeabb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VGhlJTIwUHN5Y2hvbG9neSUyMEJlaGluZCUyMEhpZ2glMjBDb252ZXJ0aW5nJTIwQWQlMjBDb3B5fGVufDB8MHwwfHx8Mg%3D%3D",
    },
    {
      title: "Building Brand Authority Through Content Marketing",
      excerpt:
        "Learn how to establish thought leadership and build trust with strategic content that positions your brand as an industry expert.",
      author: "James Wilson",
      date: "March 3, 2025",
      category: "Branding",
      readTime: "4 min read",
      image:
        "https://cda.academy/uplu/2025/03/Building-Brand-Authority-with-Thoughtful-Content-Marketing-scaled.webp",
    },
  ]);

  const BlogSection: React.FC = () => (
    <section
      id="blog"
      className={`py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 ${
        darkMode ? "bg-gray-900/50" : "bg-gray-50/50"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <AnimatedContainer animationType="slideUp">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-display mb-4 sm:mb-6 leading-tight">
              Resources & Insights
            </h2>
            <p
              className={`text-base sm:text-lg md:text-xl lg:text-xl max-w-2xl sm:max-w-3xl mx-auto leading-relaxed px-4 sm:px-0 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Stay ahead of the curve with our latest marketing insights, case
              studies, and AI-powered strategies.
            </p>
          </div>
        </AnimatedContainer>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
          {blogPosts.map((post: BlogPost, index: number) => (
            <AnimatedContainer
              key={index}
              animationType="slideUp"
              delay={200 + index * 100}
            >
              <article
                className={`group rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer ${
                  darkMode
                    ? "bg-gray-800/70 hover:bg-gray-800/90 border border-gray-700/50 hover:border-[#e40678]/30"
                    : "bg-white hover:bg-white/90 border border-gray-200/50 hover:border-[#e40678]/30 shadow-sm"
                } backdrop-blur-sm hover:shadow-[#e40678]/10`}
              >
                <div
                  className={`h-32 sm:h-40 md:h-48 flex items-center justify-center text-4xl sm:text-5xl md:text-6xl transition-all duration-300 group-hover:scale-110 ${
                    darkMode ? "bg-gray-800/80" : "bg-gray-100/80"
                  }`}
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    width={192}
                    height={192}
                  />
                </div>

                <div className="p-4 sm:p-5 md:p-6">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-xs font-medium transition-colors duration-200 ${
                        darkMode
                          ? "bg-[#e40678]/20 text-[#e40678] group-hover:bg-[#e40678]/30"
                          : "bg-[#e40678]/10 text-[#e40678] group-hover:bg-[#e40678]/20"
                      }`}
                    >
                      {post.category}
                    </span>
                    <span
                      className={`text-xs sm:text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 line-clamp-2 group-hover:text-[#e40678] transition-colors duration-200">
                    {post.title}
                  </h3>
                  <p
                    className={`text-sm sm:text-base mb-3 sm:mb-4 line-clamp-3 leading-relaxed ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div
                      className={`text-xs sm:text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      By {post.author} • {post.date}
                    </div>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-[#e40678] transform group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </article>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </section>
  );

  const [calculatorData, setCalculatorData] = useState<CalculatorData>({
    campaigns: 5,
    teamMembers: 1,
    monthlyBudget: 1000,
  });
  const [calculatedPrice, setCalculatedPrice] = useState<number>(29);

  const calculatePrice = (
    campaigns: number,
    teamMembers: number,
    monthlyBudget: number
  ): number => {
    let basePrice = 29;
    if (campaigns > 5) basePrice = 99;
    if (campaigns > 20) basePrice = 299;

    const teamExtra =
      Math.max(
        0,
        teamMembers - (basePrice === 29 ? 1 : basePrice === 99 ? 10 : 999)
      ) * 10;
    const budgetMultiplier =
      monthlyBudget > 5000 ? 1.2 : monthlyBudget > 2000 ? 1.1 : 1;

    return Math.round((basePrice + teamExtra) * budgetMultiplier);
  };

  const PricingCalculator: React.FC = () => (
    <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div
          className={`p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl transition-all duration-300 ${
            darkMode
              ? "bg-gray-800/80 border border-gray-700/50 shadow-2xl"
              : "bg-white border border-gray-100 shadow-xl"
          } backdrop-blur-lg`}
        >
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display mb-3 sm:mb-4">
              Calculate Your Custom Price
            </h3>
            <p
              className={`text-sm sm:text-base lg:text-lg ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Get personalized pricing based on your specific needs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            <div className="space-y-6 sm:space-y-8">
              {/* Campaigns Slider */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center">
                  <label
                    className={`text-sm sm:text-base font-semibold ${
                      darkMode ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    Number of Campaigns
                  </label>
                  <span
                    className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                      darkMode
                        ? "bg-[#e40678]/20 text-[#e40678]"
                        : "bg-[#e40678]/10 text-[#e40678]"
                    }`}
                  >
                    {calculatorData.campaigns}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={calculatorData.campaigns}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const newData: CalculatorData = {
                        ...calculatorData,
                        campaigns: parseInt(e.target.value),
                      };
                      setCalculatorData(newData);
                      setCalculatedPrice(
                        calculatePrice(
                          newData.campaigns,
                          newData.teamMembers,
                          newData.monthlyBudget
                        )
                      );
                    }}
                    className={`w-full h-2 sm:h-3 rounded-lg appearance-none cursor-pointer transition-all duration-200 ${
                      darkMode
                        ? "bg-gray-700 slider-thumb-dark"
                        : "bg-gray-200 slider-thumb-light"
                    }`}
                    style={{
                      background: `linear-gradient(to right, #e40678 0%, #e40678 ${
                        (calculatorData.campaigns / 50) * 100
                      }%, ${darkMode ? "#374151" : "#e5e7eb"} ${
                        (calculatorData.campaigns / 50) * 100
                      }%, ${darkMode ? "#374151" : "#e5e7eb"} 100%)`,
                    }}
                  />
                </div>
              </div>

              {/* Team Members Slider */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center">
                  <label
                    className={`text-sm sm:text-base font-semibold ${
                      darkMode ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    Team Members
                  </label>
                  <span
                    className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                      darkMode
                        ? "bg-[#e40678]/20 text-[#e40678]"
                        : "bg-[#e40678]/10 text-[#e40678]"
                    }`}
                  >
                    {calculatorData.teamMembers}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={calculatorData.teamMembers}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const newData: CalculatorData = {
                        ...calculatorData,
                        teamMembers: parseInt(e.target.value),
                      };
                      setCalculatorData(newData);
                      setCalculatedPrice(
                        calculatePrice(
                          newData.campaigns,
                          newData.teamMembers,
                          newData.monthlyBudget
                        )
                      );
                    }}
                    className={`w-full h-2 sm:h-3 rounded-lg appearance-none cursor-pointer transition-all duration-200 ${
                      darkMode
                        ? "bg-gray-700 slider-thumb-dark"
                        : "bg-gray-200 slider-thumb-light"
                    }`}
                    style={{
                      background: `linear-gradient(to right, #e40678 0%, #e40678 ${
                        (calculatorData.teamMembers / 50) * 100
                      }%, ${darkMode ? "#374151" : "#e5e7eb"} ${
                        (calculatorData.teamMembers / 50) * 100
                      }%, ${darkMode ? "#374151" : "#e5e7eb"} 100%)`,
                    }}
                  />
                </div>
              </div>

              {/* Monthly Budget Slider */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center">
                  <label
                    className={`text-sm sm:text-base font-semibold ${
                      darkMode ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    Monthly Ad Budget
                  </label>
                  <span
                    className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                      darkMode
                        ? "bg-[#e40678]/20 text-[#e40678]"
                        : "bg-[#e40678]/10 text-[#e40678]"
                    }`}
                  >
                    ${calculatorData.monthlyBudget.toLocaleString()}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="500"
                    max="10000"
                    step="500"
                    value={calculatorData.monthlyBudget}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const newData: CalculatorData = {
                        ...calculatorData,
                        monthlyBudget: parseInt(e.target.value),
                      };
                      setCalculatorData(newData);
                      setCalculatedPrice(
                        calculatePrice(
                          newData.campaigns,
                          newData.teamMembers,
                          newData.monthlyBudget
                        )
                      );
                    }}
                    className={`w-full h-2 sm:h-3 rounded-lg appearance-none cursor-pointer transition-all duration-200 ${
                      darkMode
                        ? "bg-gray-700 slider-thumb-dark"
                        : "bg-gray-200 slider-thumb-light"
                    }`}
                    style={{
                      background: `linear-gradient(to right, #e40678 0%, #e40678 ${
                        ((calculatorData.monthlyBudget - 500) / 9500) * 100
                      }%, ${darkMode ? "#374151" : "#e5e7eb"} ${
                        ((calculatorData.monthlyBudget - 500) / 9500) * 100
                      }%, ${darkMode ? "#374151" : "#e5e7eb"} 100%)`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Price Display */}
            <div className="flex items-center justify-center">
              <div
                className={`p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border-2 border-[#e40678] w-full max-w-md mx-auto transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                  darkMode
                    ? "bg-[#e40678]/10 hover:bg-[#e40678]/15"
                    : "bg-[#e40678]/5 hover:bg-[#e40678]/10"
                }`}
              >
                <div className="text-center space-y-3 sm:space-y-4">
                  <div
                    className={`text-sm sm:text-base font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Estimated Monthly Cost
                  </div>
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#e40678] font-display">
                    ${calculatedPrice}
                  </div>
                  <div
                    className={`text-lg sm:text-xl font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    per month
                  </div>
                  <button
                    className={`w-full mt-4 sm:mt-6 px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer ${
                      darkMode
                        ? "bg-[#e40678] hover:bg-[#e40678]/90 text-white"
                        : "bg-[#e40678] hover:bg-[#e40678]/90 text-white"
                    }`}
                  >
                    Get Started Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white dark" : "bg-white text-gray-900"
      }`}
    >
      {/* Navigation */}
      <Navigation
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        scrollToSection={scrollToSection}
      />

      {/* Hero Section */}
      <HeroSection darkMode={darkMode} setShowDemoModal={setShowDemoModal} />

      {/* Features Section */}
      <FeaturesSection darkMode={darkMode} features={features} />

      {/* Pricing Calculator Section */}
      <PricingCalculator />

      {/* Pricing Section */}
      <PricingSection darkMode={darkMode} pricingPlans={pricingPlans} />

      {/* Testimonials Section */}
      <TestimonialsSection
        darkMode={darkMode}
        testimonials={testimonials}
        currentTestimonial={currentTestimonial}
        nextTestimonial={nextTestimonial}
        prevTestimonial={prevTestimonial}
        setCurrentTestimonial={setCurrentTestimonial}
      />

      <BlogSection />

      {/* FAQ Section */}
      <FAQSection
        darkMode={darkMode}
        faqs={faqs}
        openFAQ={openFAQ}
        toggleFAQ={toggleFAQ}
      />

      {/* Contact Section */}
      <ContactSection
        darkMode={darkMode}
        formData={formData}
        formErrors={formErrors}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
      />

      {/* Footer */}
      <Footer
        darkMode={darkMode}
        scrollToSection={scrollToSection}
        newsletterEmail={newsletterEmail}
        newsletterError={newsletterError}
        handleNewsletterSubmit={handleNewsletterSubmit}
        handleNewsletterChange={handleNewsletterChange}
      />

      {/* Toast Notification */}
      <ToastNotification showToast={showToast} toastMessage={toastMessage} />

      {/* Demo Modal */}
      <DemoModal
        darkMode={darkMode}
        showDemoModal={showDemoModal}
        setShowDemoModal={setShowDemoModal}
      />
    </div>
  );
};

export default ADmyBrandLandingPage;
