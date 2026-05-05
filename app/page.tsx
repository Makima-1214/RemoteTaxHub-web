/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import countriesData from '@/data/countries.json';
import { Country } from '@/lib/taxCalculator';
import { getTranslation } from '@/lib/translations';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Home() {
  const [currentLang, setCurrentLang] = useState(() => {
    // Initialize from localStorage only on client side
    if (typeof window !== 'undefined') {
      return localStorage.getItem('language') || 'en';
    }
    return 'en';
  });

  const handleLanguageChange = (lang: string) => {
    setCurrentLang(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  const t = getTranslation(currentLang);
  const countries = countriesData as Country[];

  const tier1 = countries.slice(0, 15);
  const tier2 = countries.slice(15, 25);
  const tier3 = countries.slice(25);

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-zinc-200 z-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center h-14">
            <Link href="/" className="flex items-center gap-2.5 group">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-105 transition-transform">
                <rect width="32" height="32" rx="6" fill="#18181B"/>
                <path d="M8 12L16 8L24 12V20L16 24L8 20V12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 8V16M16 16L8 20M16 16L24 20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-black text-lg">RemoteTaxHub</span>
            </Link>
            <div className="flex items-center gap-6">
              <a href="#about" className="text-sm text-zinc-600 hover:text-zinc-900 font-medium transition-colors">
                {t.about}
              </a>
              <a href="#countries" className="text-sm text-zinc-600 hover:text-zinc-900 font-medium transition-colors">
                {t.browse}
              </a>
              <Link href="/compare" className="text-sm px-4 py-1.5 bg-zinc-900 text-white rounded font-medium hover:bg-zinc-800 transition-colors">
                {t.compare}
              </Link>
              <LanguageSwitcher currentLang={currentLang} onLanguageChange={handleLanguageChange} />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="pt-28 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1.5 bg-zinc-900 text-white text-xs font-medium rounded mb-6">
              {t.badge}
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black text-zinc-900 mb-6 leading-[1.1]">
              {t.heroTitle1}<br/>
              {t.heroTitle2}
            </h1>
            
            <p className="text-lg text-zinc-600 mb-8 leading-relaxed">
              {t.heroDesc}
            </p>
            
            <div className="flex flex-wrap gap-3">
              <a href="#countries" className="px-6 py-3 bg-zinc-900 text-white font-semibold rounded hover:bg-zinc-800 transition-colors">
                {t.seeAllCountries}
              </a>
              <Link href="/compare" className="px-6 py-3 bg-zinc-100 text-zinc-900 font-semibold rounded hover:bg-zinc-200 transition-colors">
                {t.compareTwoCountries}
              </Link>
            </div>
            
            <div className="mt-8 flex items-center gap-6 text-sm text-zinc-500">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {t.noSignup}
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {t.alwaysFree}
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {t.countriesCount}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About */}
      <div id="about" className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl border-2 border-zinc-200 p-8 md:p-10">
            <h2 className="text-2xl font-black text-zinc-900 mb-4">{t.aboutTitle}</h2>
            <div className="space-y-4 text-zinc-600 leading-relaxed">
              <p>{t.aboutP1}</p>
              <p>{t.aboutP2}</p>
              <p>
                <strong className="text-zinc-900">{t.aboutP3Title}</strong> {t.aboutP3}
              </p>
              <p>
                <strong className="text-zinc-900">{t.aboutP4Title}</strong> {t.aboutP4}
              </p>
              <p className="text-sm text-zinc-500 pt-2 border-t border-zinc-200">
                {t.aboutDisclaimer}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick note */}
      <div className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg">
            <p className="text-sm text-amber-900">
              <strong>{t.warningTitle}</strong> {t.warningText}
            </p>
          </div>
        </div>
      </div>

      {/* Countries */}
      <div className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          
          {/* High Income */}
          <section id="countries" className="mb-16">
            <div className="mb-8">
              <h2 className="text-3xl font-black text-zinc-900 mb-2">{t.highPayingTitle}</h2>
              <p className="text-zinc-600">{t.highPayingDesc}</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {tier1.map((country: Country) => (
                <Link
                  key={country.id}
                  href={`/country/${country.id}`}
                  className="country-card block bg-white rounded-xl border-2 border-zinc-200 hover:border-zinc-900 p-5 relative overflow-hidden group"
                >
                  {/* Subtle flag background */}
                  <div className="flag-bg absolute inset-0 pointer-events-none">
                    <img 
                      src={`https://flagcdn.com/w320/${country.flag_code}.png`}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <img 
                        src={`https://flagcdn.com/w40/${country.flag_code}.png`}
                        alt={`${country.name} flag`}
                        className="w-11 h-8 object-cover rounded shadow-md"
                      />
                      <h3 className="font-bold text-base text-zinc-900 group-hover:text-zinc-900">{country.name}</h3>
                    </div>
                    
                    <p className="text-xs text-zinc-600 mb-4 line-clamp-2 leading-relaxed">{country.description}</p>
                    
                    <div className="flex items-center justify-between pt-3 border-t-2 border-zinc-100">
                      <span className="text-xs text-zinc-500 font-medium">{t.costPerMonth}</span>
                      <span className="font-bold text-sm text-zinc-900">{country.currency_symbol}{country.cost_of_living}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Nomad Spots */}
          <section className="mb-16">
            <div className="mb-8">
              <h2 className="text-3xl font-black text-zinc-900 mb-2">{t.nomadTitle}</h2>
              <p className="text-zinc-600">{t.nomadDesc}</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {tier2.map((country: Country) => (
                <Link
                  key={country.id}
                  href={`/country/${country.id}`}
                  className="country-card block bg-white rounded-xl border-2 border-zinc-200 hover:border-zinc-900 p-5 relative overflow-hidden group"
                >
                  {/* Subtle flag background */}
                  <div className="flag-bg absolute inset-0 pointer-events-none">
                    <img 
                      src={`https://flagcdn.com/w320/${country.flag_code}.png`}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <img 
                        src={`https://flagcdn.com/w40/${country.flag_code}.png`}
                        alt={`${country.name} flag`}
                        className="w-11 h-8 object-cover rounded shadow-md"
                      />
                      <h3 className="font-bold text-base text-zinc-900 group-hover:text-zinc-900">{country.name}</h3>
                    </div>
                    
                    <p className="text-xs text-zinc-600 mb-4 line-clamp-2 leading-relaxed">{country.description}</p>
                    
                    <div className="flex items-center justify-between pt-3 border-t-2 border-zinc-100">
                      <span className="text-xs text-zinc-500 font-medium">{t.costPerMonth}</span>
                      <span className="font-bold text-sm text-zinc-900">{country.currency_symbol}{country.cost_of_living}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Emerging */}
          <section className="mb-16">
            <div className="mb-8">
              <h2 className="text-3xl font-black text-zinc-900 mb-2">{t.emergingTitle}</h2>
              <p className="text-zinc-600">{t.emergingDesc}</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {tier3.map((country: Country) => (
                <Link
                  key={country.id}
                  href={`/country/${country.id}`}
                  className="country-card block bg-white rounded-xl border-2 border-zinc-200 hover:border-zinc-900 p-5 relative overflow-hidden group"
                >
                  {/* Subtle flag background */}
                  <div className="flag-bg absolute inset-0 pointer-events-none">
                    <img 
                      src={`https://flagcdn.com/w320/${country.flag_code}.png`}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <img 
                        src={`https://flagcdn.com/w40/${country.flag_code}.png`}
                        alt={`${country.name} flag`}
                        className="w-11 h-8 object-cover rounded shadow-md"
                      />
                      <h3 className="font-bold text-base text-zinc-900 group-hover:text-zinc-900">{country.name}</h3>
                    </div>
                    
                    <p className="text-xs text-zinc-600 mb-4 line-clamp-2 leading-relaxed">{country.description}</p>
                    
                    <div className="flex items-center justify-between pt-3 border-t-2 border-zinc-100">
                      <span className="text-xs text-zinc-500 font-medium">{t.costPerMonth}</span>
                      <span className="font-bold text-sm text-zinc-900">{country.currency_symbol}{country.cost_of_living}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="bg-zinc-900 rounded-xl p-12 text-white">
            <h2 className="text-3xl font-black mb-4">
              {t.ctaTitle}
            </h2>
            <p className="text-zinc-300 mb-8 text-lg">
              {t.ctaDesc}
            </p>
            <Link href="/compare" className="inline-block px-8 py-3 bg-white text-zinc-900 font-bold rounded hover:bg-zinc-100 transition-colors">
              {t.compareNow}
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-200 py-16 px-6 bg-zinc-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 gap-8 mb-12">
            <div className="md:col-span-5">
              <div className="flex items-center gap-2.5 mb-4">
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="32" height="32" rx="6" fill="#18181B"/>
                  <path d="M8 12L16 8L24 12V20L16 24L8 20V12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 8V16M16 16L8 20M16 16L24 20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="font-black text-lg">RemoteTaxHub</span>
              </div>
              <p className="text-sm text-zinc-600 mb-4 leading-relaxed">
                {t.footerDesc}
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-9 h-9 bg-zinc-200 hover:bg-zinc-900 hover:text-white rounded flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
                </a>
                <a href="#" className="w-9 h-9 bg-zinc-200 hover:bg-zinc-900 hover:text-white rounded flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
                </a>
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="font-bold text-sm mb-4">{t.product}</div>
              <div className="space-y-3 text-sm">
                <div><a href="#countries" className="text-zinc-600 hover:text-zinc-900 transition-colors">{t.browseCountries}</a></div>
                <div><Link href="/compare" className="text-zinc-600 hover:text-zinc-900 transition-colors">{t.compare}</Link></div>
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="font-bold text-sm mb-4">{t.resources}</div>
              <div className="space-y-3 text-sm">
                <div><a href="#" className="text-zinc-600 hover:text-zinc-900 transition-colors">{t.blog}</a></div>
                <div><a href="#" className="text-zinc-600 hover:text-zinc-900 transition-colors">{t.faq}</a></div>
                <div><a href="#" className="text-zinc-600 hover:text-zinc-900 transition-colors">{t.contact}</a></div>
              </div>
            </div>
            <div className="md:col-span-3">
              <div className="font-bold text-sm mb-4">{t.legal}</div>
              <div className="space-y-3 text-sm">
                <div><a href="#" className="text-zinc-600 hover:text-zinc-900 transition-colors">{t.privacy}</a></div>
                <div><a href="#" className="text-zinc-600 hover:text-zinc-900 transition-colors">{t.terms}</a></div>
                <div><a href="#" className="text-zinc-600 hover:text-zinc-900 transition-colors">{t.disclaimer}</a></div>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-zinc-200 text-sm text-zinc-600">
            {t.footerCopyright}
          </div>
        </div>
      </footer>
    </div>
  );
}
