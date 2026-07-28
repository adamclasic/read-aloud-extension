/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageTab } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveDemo } from './components/InteractiveDemo';
import { Features } from './components/Features';
import { ComparisonTable } from './components/ComparisonTable';
import { Faq } from './components/Faq';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { Footer } from './components/Footer';
import { InstallModal } from './components/InstallModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<PageTab>('home');
  const [isInstallModalOpen, setIsInstallModalOpen] = useState<boolean>(false);

  const handleOpenInstall = () => {
    setIsInstallModalOpen(true);
  };

  const handleCloseInstall = () => {
    setIsInstallModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 font-sans selection:bg-blue-600 selection:text-white antialiased flex flex-col justify-between">
      {/* Sticky Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenInstall={handleOpenInstall}
      />

      {/* Main Page Content */}
      <main className="flex-grow">
        {currentTab === 'home' ? (
          <>
            <Hero onSelectTab={setCurrentTab} onOpenInstall={handleOpenInstall} />
            <InteractiveDemo />
            <Features />
            <ComparisonTable />
            <Faq />
          </>
        ) : (
          <PrivacyPolicyPage onSelectTab={setCurrentTab} />
        )}
      </main>

      {/* Footer */}
      <Footer onSelectTab={setCurrentTab} onOpenInstall={handleOpenInstall} />

      {/* Installation & Setup Modal */}
      <InstallModal
        isOpen={isInstallModalOpen}
        onClose={handleCloseInstall}
      />
    </div>
  );
}

