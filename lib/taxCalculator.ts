export interface TaxBracket {
  min: number;
  max: number;
  rate: number;
}

export interface Country {
  id: string;
  name: string;
  flag?: string;
  flag_code?: string;
  currency: string;
  currency_symbol: string;
  cost_of_living: number;
  tax_brackets: TaxBracket[];
  social_security: number;
  description: string;
}

export interface TaxCalculation {
  grossSalary: number;
  incomeTax: number;
  socialSecurity: number;
  totalTax: number;
  netSalary: number;
  effectiveTaxRate: number;
  monthlyNet: number;
  monthlyCostOfLiving: number;
  monthlyDisposable: number;
}

export function calculateTax(
  annualSalary: number,
  country: Country
): TaxCalculation {
  let incomeTax = 0;

  // Calculate progressive income tax
  for (const bracket of country.tax_brackets) {
    if (annualSalary > bracket.min) {
      const taxableInBracket = Math.min(
        annualSalary - bracket.min,
        bracket.max - bracket.min
      );
      incomeTax += (taxableInBracket * bracket.rate) / 100;
    }
  }

  // Calculate social security
  const socialSecurity = (annualSalary * country.social_security) / 100;

  // Total deductions
  const totalTax = incomeTax + socialSecurity;
  const netSalary = annualSalary - totalTax;
  const effectiveTaxRate = (totalTax / annualSalary) * 100;

  // Monthly calculations
  const monthlyNet = netSalary / 12;
  const monthlyCostOfLiving = country.cost_of_living;
  const monthlyDisposable = monthlyNet - monthlyCostOfLiving;

  return {
    grossSalary: annualSalary,
    incomeTax: Math.round(incomeTax),
    socialSecurity: Math.round(socialSecurity),
    totalTax: Math.round(totalTax),
    netSalary: Math.round(netSalary),
    effectiveTaxRate: Math.round(effectiveTaxRate * 100) / 100,
    monthlyNet: Math.round(monthlyNet),
    monthlyCostOfLiving,
    monthlyDisposable: Math.round(monthlyDisposable),
  };
}

export function formatCurrency(amount: number, symbol: string): string {
  return `${symbol}${amount.toLocaleString()}`;
}

export function compareCountries(
  salary: number,
  country1: Country,
  country2: Country
) {
  const calc1 = calculateTax(salary, country1);
  const calc2 = calculateTax(salary, country2);

  return {
    country1: {
      name: country1.name,
      ...calc1,
    },
    country2: {
      name: country2.name,
      ...calc2,
    },
    difference: {
      netSalary: calc1.netSalary - calc2.netSalary,
      monthlyDisposable: calc1.monthlyDisposable - calc2.monthlyDisposable,
      effectiveTaxRate: calc1.effectiveTaxRate - calc2.effectiveTaxRate,
    },
  };
}
