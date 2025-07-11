import { useState } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-xl font-bold text-gray-900 cursor-pointer">Mecatrónica Team</h1>
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            <button 
              onClick={() => scrollToSection('team')} 
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              {t('nav.team')}
            </button>
            <button 
              onClick={() => scrollToSection('history')} 
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              {t('nav.history')}
            </button>
            <button 
              onClick={() => scrollToSection('context')} 
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              Contexto
            </button>
            <button 
              onClick={() => scrollToSection('challenges')} 
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              {t('nav.challenges')}
            </button>
            <LanguageSwitcher />
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-2">
              <button 
                onClick={() => scrollToSection('team')} 
                className="text-gray-500 hover:text-blue-600 transition-colors text-left py-2"
              >
                {t('nav.team')}
              </button>
              <button 
                onClick={() => scrollToSection('history')} 
                className="text-gray-500 hover:text-blue-600 transition-colors text-left py-2"
              >
                {t('nav.history')}
              </button>
              <button 
                onClick={() => scrollToSection('context')} 
                className="text-gray-500 hover:text-blue-600 transition-colors text-left py-2"
              >
                Contexto
              </button>
              <button 
                onClick={() => scrollToSection('challenges')} 
                className="text-gray-500 hover:text-blue-600 transition-colors text-left py-2"
              >
                {t('nav.challenges')}
              </button>
              <div className="pt-2 border-t">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
