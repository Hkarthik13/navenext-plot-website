import type { AmortizationMonth } from '../types';


export interface EmiCalculationResult {
  monthlyEmi: number;
  principal: number;
  downPayment: number;
  totalInterest: number;
  totalRepayment: number;
  schedule: AmortizationMonth[];
}

/**
 * Standard reducing-balance EMI formula
 * E = P * r * (1+r)^n / ((1+r)^n - 1)
 */
export function calculateEMI(
  plotPrice: number,
  downPayment: number,
  annualInterestRate: number,
  tenureYears: number
): EmiCalculationResult {
  const principal = Math.max(0, plotPrice - downPayment);
  
  if (principal <= 0 || tenureYears <= 0) {
    return {
      monthlyEmi: 0,
      principal: 0,
      downPayment,
      totalInterest: 0,
      totalRepayment: 0,
      schedule: []
    };
  }

  const totalMonths = Math.max(1, Math.round(tenureYears * 12));
  
  // Safe zero interest check
  if (annualInterestRate <= 0) {
    const monthlyEmi = Math.round(principal / totalMonths);
    return {
      monthlyEmi,
      principal,
      downPayment,
      totalInterest: 0,
      totalRepayment: principal,
      schedule: []
    };
  }

  const monthlyRate = annualInterestRate / 12 / 100;
  const emiFactor = Math.pow(1 + monthlyRate, totalMonths);
  const monthlyEmi = Math.round((principal * monthlyRate * emiFactor) / (emiFactor - 1));
  const totalRepayment = monthlyEmi * totalMonths;
  const totalInterest = Math.max(0, totalRepayment - principal);

  // Generate Year-by-year amortization breakdown
  const schedule: AmortizationMonth[] = [];
  let currentBalance = principal;

  for (let year = 1; year <= tenureYears; year++) {
    const openingBalance = currentBalance;
    let yearInterest = 0;
    let yearPrincipal = 0;

    for (let m = 0; m < 12; m++) {
      if (currentBalance <= 0) break;
      const interestForMonth = currentBalance * monthlyRate;
      const principalForMonth = Math.min(currentBalance, monthlyEmi - interestForMonth);
      yearInterest += interestForMonth;
      yearPrincipal += principalForMonth;
      currentBalance -= principalForMonth;
    }

    schedule.push({
      year,
      openingBalance: Math.round(openingBalance),
      principalPaid: Math.round(yearPrincipal),
      interestPaid: Math.round(yearInterest),
      closingBalance: Math.max(0, Math.round(currentBalance))
    });

    if (currentBalance <= 0) break;
  }

  return {
    monthlyEmi,
    principal,
    downPayment,
    totalInterest,
    totalRepayment,
    schedule
  };
}
