import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { calculateEMI } from '../utils/emi';
import { formatINR } from '../utils/formatters';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

import {
  RotateCcw,
  PhoneCall,
  ChevronDown,
  ChevronUp,
  Calculator,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { PlotAppreciationCalculator } from '../components/plots/PlotAppreciationCalculator';

export const EmiCalculatorPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { showToast, submitEnquiry } = useApp();

  const priceFromQuery = searchParams.get('price');
  const plotNumberFromQuery = searchParams.get('plotNumber');

  // Calculator State
  const [plotPrice, setPlotPrice] = useState<number>(
    priceFromQuery ? Number(priceFromQuery) : 4800000
  );
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenureYears, setTenureYears] = useState<number>(20);

  // Additional Charges Toggle & Settings
  const [includeStatutory, setIncludeStatutory] = useState<boolean>(true);
  const stampDutyRate = 0.07;
  const legalCharges = 25000;
  const infraCorpus = 50000;

  // View Schedule toggle
  const [showAmortization, setShowAmortization] = useState<boolean>(false);

  // Enquiry modal state
  const [showEnquiryModal, setShowEnquiryModal] = useState<boolean>(false);
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [calculatorMode, setCalculatorMode] = useState<'emi' | 'appreciation'>('emi');

  useEffect(() => {
    if (priceFromQuery) {
      setPlotPrice(Number(priceFromQuery));
    }
  }, [priceFromQuery]);

  // Derived Financial Calculations
  const downPaymentAmount = Math.round((plotPrice * downPaymentPercent) / 100);
  const statutoryFees = includeStatutory
    ? Math.round(plotPrice * stampDutyRate + legalCharges + infraCorpus)
    : 0;

  const emiResult = useMemo(() => {
    return calculateEMI(plotPrice, downPaymentAmount, interestRate, tenureYears);
  }, [plotPrice, downPaymentAmount, interestRate, tenureYears]);

  // Multi-Tenure Comparison Matrix
  const tenureScenarios = [10, 15, 20, 25, 30].map((years) => {
    const res = calculateEMI(plotPrice, downPaymentAmount, interestRate, years);
    return {
      years,
      monthlyEmi: res.monthlyEmi,
      totalInterest: res.totalInterest,
      totalRepayment: res.totalRepayment
    };
  });

  const handleReset = () => {
    setPlotPrice(4800000);
    setDownPaymentPercent(20);
    setInterestRate(8.5);
    setTenureYears(20);
    setIncludeStatutory(true);
    showToast('Reset to defaults', 'info');
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantPhone) {
      showToast('Please provide your name and phone number', 'warning');
      return;
    }
    submitEnquiry({
      name: applicantName,
      phone: applicantPhone,
      email: '',
      projectId: 'finance-enquiry',
      projectName: 'Plot Loan Consultation',
      type: 'finance',
      message: `Financing inquiry for plot value ${formatINR(plotPrice)} (EMI: ${formatINR(emiResult.monthlyEmi)})`
    });
    setShowEnquiryModal(false);
    setApplicantName('');
    setApplicantPhone('');
    showToast('Loan assistance request received', 'success');
  };

  // Distribution Math
  const totalCost = emiResult.principal + emiResult.totalInterest + statutoryFees;
  const principalShare = totalCost > 0 ? (emiResult.principal / totalCost) * 100 : 0;
  const interestShare = totalCost > 0 ? (emiResult.totalInterest / totalCost) * 100 : 0;
  const statutoryShare = totalCost > 0 ? (statutoryFees / totalCost) * 100 : 0;

  return (
    <div className="font-sans-clean bg-[#faf8f5] min-h-screen text-[#1c2421] pb-24">
      {/* Header */}
      <section className="bg-white border-b border-[#e5ece8] pt-8 pb-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-4">
          <Breadcrumbs items={[{ label: 'EMI Calculator' }]} />
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pt-1">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#7b998a]">
                Financial Modeling
              </span>
              <h1 className="font-editorial text-3xl sm:text-4xl font-normal text-[#0f2e22] mt-0.5">
                {calculatorMode === 'emi' ? 'Plot Loan Calculator' : 'Land Value Appreciation Estimator'}
              </h1>
            </div>

            {plotNumberFromQuery && (
              <span className="text-xs font-medium text-[#7b998a]">
                Simulating for <strong className="text-[#0f2e22]">Plot #{plotNumberFromQuery}</strong>
              </span>
            )}
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => setCalculatorMode('emi')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                calculatorMode === 'emi'
                  ? 'bg-[#0f2e22] text-white shadow-xs'
                  : 'bg-[#faf8f5] text-[#55635c] border border-gray-200 hover:text-[#0f2e22]'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Plot Loan EMI</span>
            </button>
            <button
              type="button"
              onClick={() => setCalculatorMode('appreciation')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                calculatorMode === 'appreciation'
                  ? 'bg-[#0f2e22] text-white shadow-xs'
                  : 'bg-[#faf8f5] text-[#55635c] border border-gray-200 hover:text-[#0f2e22]'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Land Value Appreciation (CAGR)</span>
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8">
        {calculatorMode === 'appreciation' ? (
          <PlotAppreciationCalculator initialPrice={plotPrice} />
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Calculator Controls */}
              <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-[#e5ece8] space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h2 className="font-editorial text-xl font-medium text-[#0f2e22]">
                Parameters
              </h2>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-[#7b998a] hover:text-[#0f2e22] flex items-center gap-1 font-medium"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>

            {/* Manual plot price entry */}
            <div className="space-y-2">
              <label htmlFor="emi-plot-price" className="block text-xs text-[#55635c] font-medium">
                Plot Purchase Price (INR)
              </label>
              <div className="flex items-center gap-2 bg-[#faf8f5] px-3 py-2.5 rounded-md border border-[#c2d1c9] focus-within:border-[#0f2e22]">
                <span className="font-bold text-[#0f2e22]">&#8377;</span>
                <input
                  id="emi-plot-price"
                  type="number"
                  min="0"
                  step="10000"
                  inputMode="numeric"
                  value={plotPrice}
                  onChange={(e) => setPlotPrice(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full font-medium text-sm bg-transparent focus:outline-hidden text-[#0f2e22]"
                />
              </div>
              <p className="text-[11px] text-[#7b998a]">Current plot value: <span className="font-semibold text-[#0f2e22]">{formatINR(plotPrice)}</span></p>
            </div>

            {/* Manual down payment entry */}
            <div className="space-y-2">
              <div className="flex justify-between items-end gap-3">
                <label htmlFor="emi-down-payment" className="text-xs text-[#55635c] font-medium">Down Payment (%)</label>
                <span className="text-[11px] text-[#7b998a]">Amount: <strong className="text-[#0f2e22]">{formatINR(downPaymentAmount)}</strong></span>
              </div>
              <div className="flex items-center gap-2 bg-[#faf8f5] px-3 py-2.5 rounded-md border border-[#c2d1c9] focus-within:border-[#0f2e22]">
                <input
                  id="emi-down-payment"
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  inputMode="decimal"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Math.min(100, Math.max(0, Number(e.target.value) || 0)))}
                  className="w-full font-medium text-sm bg-transparent focus:outline-hidden text-[#0f2e22]"
                />
                <span className="text-sm font-semibold text-[#0f2e22]">%</span>
              </div>
              <p className="text-[11px] text-[#7b998a]">Enter any down payment from 0% to 100%.</p>
            </div>

            {/* Manual interest rate entry */}
            <div className="space-y-2">
              <label htmlFor="emi-interest-rate" className="block text-xs text-[#55635c] font-medium">Interest Rate (% per year)</label>
              <div className="flex items-center gap-2 bg-[#faf8f5] px-3 py-2.5 rounded-md border border-[#c2d1c9] focus-within:border-[#0f2e22]">
                <input
                  id="emi-interest-rate"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  inputMode="decimal"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Math.min(100, Math.max(0, Number(e.target.value) || 0)))}
                  className="w-full font-medium text-sm bg-transparent focus:outline-hidden text-[#0f2e22]"
                />
                <span className="text-sm font-semibold text-[#0f2e22]">%</span>
              </div>
              <p className="text-[11px] text-[#7b998a]">Enter the annual interest rate; 0% calculates an interest-free loan.</p>
            </div>

            {/* Manual tenure entry */}
            <div className="space-y-2">
              <label htmlFor="emi-tenure-years" className="block text-xs text-[#55635c] font-medium">Loan Tenure (years)</label>
              <div className="flex items-center gap-2 bg-[#faf8f5] px-3 py-2.5 rounded-md border border-[#c2d1c9] focus-within:border-[#0f2e22]">
                <input
                  id="emi-tenure-years"
                  type="number"
                  min="1"
                  max="30"
                  step="1"
                  inputMode="numeric"
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Math.min(30, Math.max(1, Number(e.target.value) || 1)))}
                  className="w-full font-medium text-sm bg-transparent focus:outline-hidden text-[#0f2e22]"
                />
                <span className="text-sm font-semibold text-[#0f2e22]">years</span>
              </div>
              <p className="text-[11px] text-[#7b998a]">{tenureYears * 12} monthly payments</p>
            </div>

            {/* Statutory Charges Option */}
            <div className="p-3.5 rounded-lg bg-[#faf8f5] border border-[#e5ece8] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer font-medium text-[#0f2e22]">
                  <input
                    type="checkbox"
                    checked={includeStatutory}
                    onChange={(e) => setIncludeStatutory(e.target.checked)}
                    className="w-3.5 h-3.5 accent-[#0f2e22] rounded-xs cursor-pointer"
                  />
                  <span>Include Registration & Legal (~7%)</span>
                </label>
                <span className="font-semibold text-[#0f2e22]">
                  {formatINR(statutoryFees)}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Output Summary Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0f2e22] text-white p-6 sm:p-8 rounded-xl shadow-xl space-y-6">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-[#8fa89b] font-medium">
                  Estimated Monthly EMI
                </span>
                <div className="font-editorial text-4xl sm:text-5xl font-normal text-[#f7f1e4]">
                  {formatINR(emiResult.monthlyEmi)}
                  <span className="text-sm font-sans font-normal text-[#8fa89b]"> / mo</span>
                </div>
              </div>

              {/* Summary Rows */}
              <div className="space-y-2 pt-4 border-t border-[#1b382d] text-xs">
                <div className="flex justify-between text-[#c2d1c9]">
                  <span>Principal Loan:</span>
                  <span className="font-semibold text-white">{formatINR(emiResult.principal)}</span>
                </div>
                <div className="flex justify-between text-[#c2d1c9]">
                  <span>Total Interest:</span>
                  <span className="font-semibold text-white">{formatINR(emiResult.totalInterest)}</span>
                </div>
                <div className="flex justify-between text-[#c2d1c9]">
                  <span>Down Payment:</span>
                  <span className="font-semibold text-white">{formatINR(emiResult.downPayment)}</span>
                </div>
                {includeStatutory && (
                  <div className="flex justify-between text-[#c2d1c9]">
                    <span>Statutory Fees:</span>
                    <span className="font-semibold text-white">{formatINR(statutoryFees)}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-[#1b382d] text-sm font-medium text-[#f7f1e4]">
                  <span>Total Repayment:</span>
                  <span className="text-[#c5a059] font-bold">{formatINR(emiResult.totalRepayment)}</span>
                </div>
              </div>

              {/* Simple Distribution Bar */}
              <div className="space-y-1.5 pt-1">
                <div className="text-[10px] text-[#8fa89b] flex justify-between">
                  <span>Principal ({Math.round(principalShare)}%)</span>
                  <span>Interest ({Math.round(interestShare)}%)</span>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden flex bg-gray-900">
                  <div style={{ width: `${principalShare}%` }} className="bg-[#16a34a]" />
                  <div style={{ width: `${interestShare}%` }} className="bg-[#c5a059]" />
                  {includeStatutory && (
                    <div style={{ width: `${statutoryShare}%` }} className="bg-purple-400" />
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowEnquiryModal(true)}
                className="w-full py-2.5 px-4 rounded-lg font-semibold text-xs text-[#0a1f17] bg-[#c5a059] hover:bg-[#d8b879] transition-colors flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Request Bank Loan Consultation</span>
              </button>
            </div>

            <div className="text-[11px] text-[#7b998a] leading-relaxed">
              Standard reducing balance calculation. Final interest rates and eligibility subject to bank underwriting.
            </div>
          </div>
        </div>

        {/* Tenure Scenarios Matrix */}
        <div className="mt-12 bg-white rounded-xl p-6 sm:p-8 border border-[#e5ece8] space-y-4">
          <h3 className="font-editorial text-xl font-normal text-[#0f2e22]">
            Tenure Scenarios
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-100 text-[#7b998a] uppercase text-[10px]">
                  <th className="py-2.5 px-3 font-semibold">Tenure</th>
                  <th className="py-2.5 px-3 font-semibold">Monthly EMI</th>
                  <th className="py-2.5 px-3 font-semibold">Total Interest</th>
                  <th className="py-2.5 px-3 font-semibold">Total Repayment</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {tenureScenarios.map((scen) => {
                  const isCurrent = scen.years === tenureYears;
                  return (
                    <tr key={scen.years} className={isCurrent ? 'bg-[#faf8f5] font-semibold' : ''}>
                      <td className="py-2.5 px-3 text-[#0f2e22]">{scen.years} Years</td>
                      <td className="py-2.5 px-3 font-bold text-[#0f2e22]">{formatINR(scen.monthlyEmi)}</td>
                      <td className="py-2.5 px-3 text-[#55635c]">{formatINR(scen.totalInterest)}</td>
                      <td className="py-2.5 px-3 text-[#55635c]">{formatINR(scen.totalRepayment)}</td>
                      <td className="py-2.5 px-3 text-right">
                        {isCurrent ? (
                          <span className="text-[11px] text-emerald-700 font-semibold">Active</span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setTenureYears(scen.years)}
                            className="text-xs text-[#0f2e22] hover:underline"
                          >
                            Select
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Year-by-Year Schedule (Accordion) */}
        <div className="mt-8 bg-white rounded-xl p-6 sm:p-8 border border-[#e5ece8] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-editorial text-xl font-normal text-[#0f2e22]">
              Amortization Schedule
            </h3>
            <button
              type="button"
              onClick={() => setShowAmortization(!showAmortization)}
              className="text-xs font-semibold text-[#0f2e22] flex items-center gap-1 hover:underline"
            >
              <span>{showAmortization ? 'Collapse' : 'Expand Schedule'}</span>
              {showAmortization ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {showAmortization && (
            <div className="overflow-x-auto pt-2">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-100 text-[#7b998a] uppercase text-[10px]">
                    <th className="py-2 px-3 font-semibold">Year</th>
                    <th className="py-2 px-3 font-semibold">Principal Paid</th>
                    <th className="py-2 px-3 font-semibold">Interest Paid</th>
                    <th className="py-2 px-3 font-semibold">Closing Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {emiResult.schedule.map((row) => (
                    <tr key={row.year} className="hover:bg-gray-50/50">
                      <td className="py-2 px-3 font-medium text-[#0f2e22]">Year {row.year}</td>
                      <td className="py-2 px-3 text-[#55635c]">{formatINR(row.principalPaid)}</td>
                      <td className="py-2 px-3 text-[#55635c]">{formatINR(row.interestPaid)}</td>
                      <td className="py-2 px-3 font-semibold text-[#0f2e22]">{formatINR(row.closingBalance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        </>
      )}
    </div>

      {/* Consultation Modal */}
      {showEnquiryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl border border-gray-200 space-y-4">
            <h3 className="font-editorial text-xl font-normal text-[#0f2e22]">
              Loan Assistance Request
            </h3>
            <p className="text-xs text-[#55635c]">
              We connect you with approved nationalized banks offering preferred plot loan rates.
            </p>

            <form onSubmit={handleEnquirySubmit} className="space-y-3 pt-1">
              <div>
                <label className="text-xs text-[#55635c] block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:outline-hidden focus:border-[#0f2e22]"
                />
              </div>

              <div>
                <label className="text-xs text-[#55635c] block mb-1">Mobile Number</label>
                <input
                  type="tel"
                  required
                  value={applicantPhone}
                  onChange={(e) => setApplicantPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:outline-hidden focus:border-[#0f2e22]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 text-xs font-semibold text-white bg-[#0f2e22] rounded-lg hover:bg-[#163e2f]"
                >
                  Submit Request
                </button>
                <button
                  type="button"
                  onClick={() => setShowEnquiryModal(false)}
                  className="py-2.5 px-4 text-xs text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
