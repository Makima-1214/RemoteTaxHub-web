'use client';

import { useState } from 'react';
import Link from 'next/link';
import countriesData from '@/data/countries.json';
import { calculateTax, Country } from '@/lib/taxCalculator';
import { getTranslation } from '@/lib/translations';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ComparePage() {
  const [salary, setSalary] = useState(60000);
  const [country1Id, setCountry1Id] = useState('united-states');
  const [country2Id, setCountry2Id] = useState('thailand');
  const [currentLang, setCurrentLang] = useState(() => {
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

  const country1 = countriesData.find((c) => c.id === country1Id) as Country;
  const country2 = countriesData.find((c) => c.id === country2Id) as Country;

  const calc1 = calculateTax(salary, country1);
  const calc2 = calculateTax(salary, country2);

  const comparisonData = [
    {
      name: t.grossSalary,
      [country1.name]: calc1.grossSalary,
      [country2.name]: calc2.grossSalary,
    },
    {
      name: t.incomeTax,
      [country1.name]: calc1.incomeTax,
      [country2.name]: calc2.incomeTax,
    },
    {
      name: t.socialSecurity,
      [country1.name]: calc1.socialSecurity,
      [country2.name]: calc2.socialSecurity,
    },
    {
      name: t.netSalary,
      [country1.name]: calc1.netSalary,
      [country2.name]: calc2.netSalary,
    },
  ];

  const monthlyComparison = [
    {
      name: t.monthlyNetIncome,
      [country1.name]: calc1.monthlyNet,
      [country2.name]: calc2.monthlyNet,
    },
    {
      name: t.costOfLiving,
      [country1.name]: calc1.monthlyCostOfLiving,
      [country2.name]: calc2.monthlyCostOfLiving,
    },
    {
      name: t.disposableIncome,
      [country1.name]: calc1.monthlyDisposable,
      [country2.name]: calc2.monthlyDisposable,
    },
  ];

  const netDifference = calc1.netSalary - calc2.netSalary;
  const disposableDifference = calc1.monthlyDisposable - calc2.monthlyDisposable;

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
            <LanguageSwitcher currentLang={currentLang} onLanguageChange={handleLanguageChange} />
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="pt-24 pb-12 px-6 bg-zinc-50 border-b border-zinc-200">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-zinc-600 hover:text-zinc-900 mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t.back}
          </Link>
          <h1 className="text-4xl font-bold text-zinc-900 mb-3">{t.compareTitle}</h1>
          <p className="text-lg text-zinc-600">{t.compareDesc}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Salary Input */}
        <div className="bg-white border border-zinc-200 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-zinc-900">{t.annualSalary}</h2>
          
          <div className="mb-6">
            <label className="block text-sm font-semibold text-zinc-900 mb-4">
              {t.annualSalary} (USD)
            </label>
            <input
              type="range"
              min="10000"
              max="200000"
              step="5000"
              value={salary}
              onChange={(e) => setSalary(Number(e.target.value))}
              className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900"
            />
            <div className="flex justify-between mt-4">
              <span className="text-sm text-zinc-500">$10,000</span>
              <span className="text-3xl font-bold text-zinc-900">
                ${salary.toLocaleString()}
              </span>
              <span className="text-sm text-zinc-500">$200,000</span>
            </div>
          </div>
        </div>

        {/* Country Selection */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white border border-zinc-200 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 text-zinc-900">{t.selectCountry1}</h3>
            <select
              value={country1Id}
              onChange={(e) => setCountry1Id(e.target.value)}
              className="w-full border-2 border-zinc-300 rounded-lg px-4 py-3 text-lg mb-4 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 outline-none"
            >
              {countriesData.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
            
            <div className="space-y-3">
              <div className="flex justify-between pb-3 border-b border-zinc-100">
                <span className="text-zinc-600">{t.netSalary}</span>
                <span className="font-bold text-green-600">
                  {country1.currency_symbol}{calc1.netSalary.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between pb-3 border-b border-zinc-100">
                <span className="text-zinc-600">{t.effectiveTaxRate}</span>
                <span className="font-semibold text-zinc-900">{calc1.effectiveTaxRate}%</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-zinc-100">
                <span className="text-zinc-600">{t.disposableIncome}</span>
                <span className={`font-semibold ${calc1.monthlyDisposable > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {country1.currency_symbol}{calc1.monthlyDisposable.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600">{t.costOfLiving}</span>
                <span className="font-semibold text-zinc-900">
                  {country1.currency_symbol}{calc1.monthlyCostOfLiving.toLocaleString()}{t.perMonth}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-zinc-200 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 text-zinc-900">{t.selectCountry2}</h3>
            <select
              value={country2Id}
              onChange={(e) => setCountry2Id(e.target.value)}
              className="w-full border-2 border-zinc-300 rounded-lg px-4 py-3 text-lg mb-4 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 outline-none"
            >
              {countriesData.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
            
            <div className="space-y-3">
              <div className="flex justify-between pb-3 border-b border-zinc-100">
                <span className="text-zinc-600">{t.netSalary}</span>
                <span className="font-bold text-green-600">
                  {country2.currency_symbol}{calc2.netSalary.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between pb-3 border-b border-zinc-100">
                <span className="text-zinc-600">{t.effectiveTaxRate}</span>
                <span className="font-semibold text-zinc-900">{calc2.effectiveTaxRate}%</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-zinc-100">
                <span className="text-zinc-600">{t.disposableIncome}</span>
                <span className={`font-semibold ${calc2.monthlyDisposable > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {country2.currency_symbol}{calc2.monthlyDisposable.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600">{t.costOfLiving}</span>
                <span className="font-semibold text-zinc-900">
                  {country2.currency_symbol}{calc2.monthlyCostOfLiving.toLocaleString()}{t.perMonth}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Winner Banner */}
        <div className="bg-zinc-900 text-white rounded-xl p-8 mb-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            🏆 {netDifference > 0 ? country1.name : country2.name} {t.winner}!
          </h2>
          <p className="text-xl mb-2 text-zinc-300">
            {t.takeHomePay}: ${Math.abs(netDifference).toLocaleString()}
          </p>
          <p className="text-lg text-zinc-400">
            {t.leftOver}: ${Math.abs(disposableDifference).toLocaleString()}
          </p>
        </div>

        {/* Annual Comparison Chart */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold mb-6 text-zinc-900">{t.taxComparison}</h3>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value) => `$${Number(value || 0).toLocaleString()}`} />
                <Legend />
                <Bar dataKey={country1.name} fill="#18181B" />
                <Bar dataKey={country2.name} fill="#71717A" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Comparison Chart */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold mb-6 text-zinc-900">{t.monthlyComparison}</h3>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value) => `$${Number(value || 0).toLocaleString()}`} />
                <Legend />
                <Bar dataKey={country1.name} fill="#18181B" />
                <Bar dataKey={country2.name} fill="#71717A" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Comparison Table */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-6 text-zinc-900">{t.keyMetrics}</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-900">Metric</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-zinc-900">{country1.name}</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-zinc-900">{country2.name}</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-zinc-900">Difference</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-zinc-100 hover:bg-zinc-50">
                  <td className="py-3 px-4 text-sm text-zinc-600">{t.grossSalary}</td>
                  <td className="text-right py-3 px-4 text-sm text-zinc-900">{country1.currency_symbol}{calc1.grossSalary.toLocaleString()}</td>
                  <td className="text-right py-3 px-4 text-sm text-zinc-900">{country2.currency_symbol}{calc2.grossSalary.toLocaleString()}</td>
                  <td className="text-right py-3 px-4 text-sm text-zinc-900">-</td>
                </tr>
                <tr className="border-b border-zinc-100 hover:bg-zinc-50">
                  <td className="py-3 px-4 text-sm text-zinc-600">{t.incomeTax}</td>
                  <td className="text-right py-3 px-4 text-sm text-red-600">{country1.currency_symbol}{calc1.incomeTax.toLocaleString()}</td>
                  <td className="text-right py-3 px-4 text-sm text-red-600">{country2.currency_symbol}{calc2.incomeTax.toLocaleString()}</td>
                  <td className="text-right py-3 px-4 text-sm text-zinc-900">${(calc1.incomeTax - calc2.incomeTax).toLocaleString()}</td>
                </tr>
                <tr className="border-b border-zinc-100 hover:bg-zinc-50">
                  <td className="py-3 px-4 text-sm text-zinc-600">{t.socialSecurity}</td>
                  <td className="text-right py-3 px-4 text-sm text-orange-600">{country1.currency_symbol}{calc1.socialSecurity.toLocaleString()}</td>
                  <td className="text-right py-3 px-4 text-sm text-orange-600">{country2.currency_symbol}{calc2.socialSecurity.toLocaleString()}</td>
                  <td className="text-right py-3 px-4 text-sm text-zinc-900">${(calc1.socialSecurity - calc2.socialSecurity).toLocaleString()}</td>
                </tr>
                <tr className="border-b border-zinc-100 hover:bg-zinc-50 font-semibold">
                  <td className="py-3 px-4 text-sm text-zinc-900">{t.netSalary}</td>
                  <td className="text-right py-3 px-4 text-sm text-green-600">{country1.currency_symbol}{calc1.netSalary.toLocaleString()}</td>
                  <td className="text-right py-3 px-4 text-sm text-green-600">{country2.currency_symbol}{calc2.netSalary.toLocaleString()}</td>
                  <td className="text-right py-3 px-4 text-sm text-green-600">${netDifference.toLocaleString()}</td>
                </tr>
                <tr className="border-b border-zinc-100 hover:bg-zinc-50">
                  <td className="py-3 px-4 text-sm text-zinc-600">{t.effectiveTaxRate}</td>
                  <td className="text-right py-3 px-4 text-sm text-zinc-900">{calc1.effectiveTaxRate}%</td>
                  <td className="text-right py-3 px-4 text-sm text-zinc-900">{calc2.effectiveTaxRate}%</td>
                  <td className="text-right py-3 px-4 text-sm text-zinc-900">{(calc1.effectiveTaxRate - calc2.effectiveTaxRate).toFixed(2)}%</td>
                </tr>
                <tr className="border-b border-zinc-100 hover:bg-zinc-50">
                  <td className="py-3 px-4 text-sm text-zinc-600">{t.monthlyNetIncome}</td>
                  <td className="text-right py-3 px-4 text-sm text-zinc-900">{country1.currency_symbol}{calc1.monthlyNet.toLocaleString()}</td>
                  <td className="text-right py-3 px-4 text-sm text-zinc-900">{country2.currency_symbol}{calc2.monthlyNet.toLocaleString()}</td>
                  <td className="text-right py-3 px-4 text-sm text-zinc-900">${(calc1.monthlyNet - calc2.monthlyNet).toLocaleString()}</td>
                </tr>
                <tr className="border-b border-zinc-100 hover:bg-zinc-50">
                  <td className="py-3 px-4 text-sm text-zinc-600">{t.costOfLiving}</td>
                  <td className="text-right py-3 px-4 text-sm text-zinc-900">{country1.currency_symbol}{calc1.monthlyCostOfLiving.toLocaleString()}</td>
                  <td className="text-right py-3 px-4 text-sm text-zinc-900">{country2.currency_symbol}{calc2.monthlyCostOfLiving.toLocaleString()}</td>
                  <td className="text-right py-3 px-4 text-sm text-zinc-900">${(calc1.monthlyCostOfLiving - calc2.monthlyCostOfLiving).toLocaleString()}</td>
                </tr>
                <tr className="hover:bg-zinc-50 font-semibold">
                  <td className="py-3 px-4 text-sm text-zinc-900">{t.disposableIncome}</td>
                  <td className={`text-right py-3 px-4 text-sm ${calc1.monthlyDisposable > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {country1.currency_symbol}{calc1.monthlyDisposable.toLocaleString()}
                  </td>
                  <td className={`text-right py-3 px-4 text-sm ${calc2.monthlyDisposable > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {country2.currency_symbol}{calc2.monthlyDisposable.toLocaleString()}
                  </td>
                  <td className="text-right py-3 px-4 text-sm text-green-600">
                    ${disposableDifference.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-sm text-zinc-600">
            {t.basedOnSalary} ${salary.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-zinc-50 border-t border-zinc-200 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-zinc-600">
          <p>{t.taxCalculationsDisclaimer}</p>
        </div>
      </footer>
    </div>
  );
}
