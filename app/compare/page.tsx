'use client';

import { useState } from 'react';
import Link from 'next/link';
import countriesData from '@/data/countries.json';
import { calculateTax, Country } from '@/lib/taxCalculator';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ComparePage() {
  const [salary, setSalary] = useState(60000);
  const [country1Id, setCountry1Id] = useState('united-states');
  const [country2Id, setCountry2Id] = useState('thailand');

  const country1 = countriesData.find((c) => c.id === country1Id) as Country;
  const country2 = countriesData.find((c) => c.id === country2Id) as Country;

  const calc1 = calculateTax(salary, country1);
  const calc2 = calculateTax(salary, country2);

  const comparisonData = [
    {
      name: 'Gross Salary',
      [country1.name]: calc1.grossSalary,
      [country2.name]: calc2.grossSalary,
    },
    {
      name: 'Income Tax',
      [country1.name]: calc1.incomeTax,
      [country2.name]: calc2.incomeTax,
    },
    {
      name: 'Social Security',
      [country1.name]: calc1.socialSecurity,
      [country2.name]: calc2.socialSecurity,
    },
    {
      name: 'Net Salary',
      [country1.name]: calc1.netSalary,
      [country2.name]: calc2.netSalary,
    },
  ];

  const monthlyComparison = [
    {
      name: 'Monthly Net',
      [country1.name]: calc1.monthlyNet,
      [country2.name]: calc2.monthlyNet,
    },
    {
      name: 'Cost of Living',
      [country1.name]: calc1.monthlyCostOfLiving,
      [country2.name]: calc2.monthlyCostOfLiving,
    },
    {
      name: 'Disposable',
      [country1.name]: calc1.monthlyDisposable,
      [country2.name]: calc2.monthlyDisposable,
    },
  ];

  const netDifference = calc1.netSalary - calc2.netSalary;
  const disposableDifference = calc1.monthlyDisposable - calc2.monthlyDisposable;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-purple-200 hover:text-white mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-2">Compare Countries</h1>
          <p className="text-purple-100">
            See which country gives you the best take-home pay
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Salary Input */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Set Your Salary</h2>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Gross Salary (USD equivalent)
            </label>
            <input
              type="range"
              min="10000"
              max="200000"
              step="5000"
              value={salary}
              onChange={(e) => setSalary(Number(e.target.value))}
              className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-600">$10,000</span>
              <span className="text-2xl font-bold text-purple-600">
                ${salary.toLocaleString()}
              </span>
              <span className="text-sm text-gray-600">$200,000</span>
            </div>
          </div>
        </div>

        {/* Country Selection */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Country 1</h3>
            <select
              value={country1Id}
              onChange={(e) => setCountry1Id(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 text-lg mb-4"
            >
              {countriesData.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Net Salary</span>
                <span className="font-bold text-green-600">
                  {country1.currency_symbol}{calc1.netSalary.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Effective Tax Rate</span>
                <span className="font-semibold">{calc1.effectiveTaxRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly Disposable</span>
                <span className={`font-semibold ${calc1.monthlyDisposable > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {country1.currency_symbol}{calc1.monthlyDisposable.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cost of Living</span>
                <span className="font-semibold">
                  {country1.currency_symbol}{calc1.monthlyCostOfLiving.toLocaleString()}/mo
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Country 2</h3>
            <select
              value={country2Id}
              onChange={(e) => setCountry2Id(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 text-lg mb-4"
            >
              {countriesData.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Net Salary</span>
                <span className="font-bold text-green-600">
                  {country2.currency_symbol}{calc2.netSalary.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Effective Tax Rate</span>
                <span className="font-semibold">{calc2.effectiveTaxRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly Disposable</span>
                <span className={`font-semibold ${calc2.monthlyDisposable > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {country2.currency_symbol}{calc2.monthlyDisposable.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cost of Living</span>
                <span className="font-semibold">
                  {country2.currency_symbol}{calc2.monthlyCostOfLiving.toLocaleString()}/mo
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Winner Banner */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl p-8 mb-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {netDifference > 0 ? '🏆 ' + country1.name : '🏆 ' + country2.name} Wins!
          </h2>
          <p className="text-xl mb-2">
            Higher net salary by: ${Math.abs(netDifference).toLocaleString()}
          </p>
          <p className="text-lg">
            Better monthly disposable income by: ${Math.abs(disposableDifference).toLocaleString()}
          </p>
        </div>

        {/* Annual Comparison Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold mb-4">Annual Comparison</h3>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `$${Number(value || 0).toLocaleString()}`} />
                <Legend />
                <Bar dataKey={country1.name} fill="#3b82f6" />
                <Bar dataKey={country2.name} fill="#ec4899" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Comparison Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold mb-4">Monthly Budget Comparison</h3>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyComparison}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `$${Number(value || 0).toLocaleString()}`} />
                <Legend />
                <Bar dataKey={country1.name} fill="#3b82f6" />
                <Bar dataKey={country2.name} fill="#ec4899" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Comparison Table */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Detailed Breakdown</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Metric</th>
                  <th className="text-right py-3 px-4">{country1.name}</th>
                  <th className="text-right py-3 px-4">{country2.name}</th>
                  <th className="text-right py-3 px-4">Difference</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">Gross Salary</td>
                  <td className="text-right py-3 px-4">{country1.currency_symbol}{calc1.grossSalary.toLocaleString()}</td>
                  <td className="text-right py-3 px-4">{country2.currency_symbol}{calc2.grossSalary.toLocaleString()}</td>
                  <td className="text-right py-3 px-4">-</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">Income Tax</td>
                  <td className="text-right py-3 px-4 text-red-600">{country1.currency_symbol}{calc1.incomeTax.toLocaleString()}</td>
                  <td className="text-right py-3 px-4 text-red-600">{country2.currency_symbol}{calc2.incomeTax.toLocaleString()}</td>
                  <td className="text-right py-3 px-4">${(calc1.incomeTax - calc2.incomeTax).toLocaleString()}</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">Social Security</td>
                  <td className="text-right py-3 px-4 text-orange-600">{country1.currency_symbol}{calc1.socialSecurity.toLocaleString()}</td>
                  <td className="text-right py-3 px-4 text-orange-600">{country2.currency_symbol}{calc2.socialSecurity.toLocaleString()}</td>
                  <td className="text-right py-3 px-4">${(calc1.socialSecurity - calc2.socialSecurity).toLocaleString()}</td>
                </tr>
                <tr className="border-b hover:bg-gray-50 font-semibold">
                  <td className="py-3 px-4">Net Salary</td>
                  <td className="text-right py-3 px-4 text-green-600">{country1.currency_symbol}{calc1.netSalary.toLocaleString()}</td>
                  <td className="text-right py-3 px-4 text-green-600">{country2.currency_symbol}{calc2.netSalary.toLocaleString()}</td>
                  <td className="text-right py-3 px-4 text-green-600">${netDifference.toLocaleString()}</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">Effective Tax Rate</td>
                  <td className="text-right py-3 px-4">{calc1.effectiveTaxRate}%</td>
                  <td className="text-right py-3 px-4">{calc2.effectiveTaxRate}%</td>
                  <td className="text-right py-3 px-4">{(calc1.effectiveTaxRate - calc2.effectiveTaxRate).toFixed(2)}%</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">Monthly Net</td>
                  <td className="text-right py-3 px-4">{country1.currency_symbol}{calc1.monthlyNet.toLocaleString()}</td>
                  <td className="text-right py-3 px-4">{country2.currency_symbol}{calc2.monthlyNet.toLocaleString()}</td>
                  <td className="text-right py-3 px-4">${(calc1.monthlyNet - calc2.monthlyNet).toLocaleString()}</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">Cost of Living</td>
                  <td className="text-right py-3 px-4">{country1.currency_symbol}{calc1.monthlyCostOfLiving.toLocaleString()}</td>
                  <td className="text-right py-3 px-4">{country2.currency_symbol}{calc2.monthlyCostOfLiving.toLocaleString()}</td>
                  <td className="text-right py-3 px-4">${(calc1.monthlyCostOfLiving - calc2.monthlyCostOfLiving).toLocaleString()}</td>
                </tr>
                <tr className="hover:bg-gray-50 font-semibold">
                  <td className="py-3 px-4">Monthly Disposable</td>
                  <td className={`text-right py-3 px-4 ${calc1.monthlyDisposable > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {country1.currency_symbol}{calc1.monthlyDisposable.toLocaleString()}
                  </td>
                  <td className={`text-right py-3 px-4 ${calc2.monthlyDisposable > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {country2.currency_symbol}{calc2.monthlyDisposable.toLocaleString()}
                  </td>
                  <td className="text-right py-3 px-4 text-green-600">
                    ${disposableDifference.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* AdSense Placeholder */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-200 rounded-lg p-8 text-center text-gray-500">
          <div className="text-sm mb-2">Advertisement</div>
          <div className="text-xs">Google AdSense Placeholder (728x90)</div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2026 RemoteTaxHub.com - Tax calculations are estimates. Consult a tax professional for accurate advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
