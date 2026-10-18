import React, { useState, useMemo } from 'react';
import { formatINR } from '../../utils/formatters';
import {
  TrendingUp,
  Sparkles,
  ShieldCheck,
  Building,
  Info,
  Calendar,
  Layers
} from 'lucide-react';

interface PlotAppreciationCalculatorProps {
  initialPrice?: number;
  projectName?: string;
}

export const PlotAppreciationCalculator: React.FC<PlotAppreciationCalculatorProps> = ({
  initialPrice = 4500000,
  projectName
}) => {
  const [investment, setInvestment] = useState<number>(initialPrice);
  const [cagrRate, setCagrRate] = useState<number>(13.5); // 13.5% historical average for sanctioned Tamil Nadu plots
  const [holdingYears, setHoldingYears] = useState<number>(5);

  // Future Value Formula: FV = PV * (1 + r)^n
  const futureValue = useMemo(() => {
    const rate = cagrRate / 100;
    return Math.round(investment * Math.pow(1 + rate, holdingYears));
  }, [investment, cagrRate, holdingYears]);

  const capitalGain = futureValue - investment;
  const gainPercentage = Math.round((capitalGain / investment) * 100);

  // Growth trajectory milestones
  const milestones = useMemo(() => {
    const yearsList = [1, 3, 5, 7, 10];
    return yearsList.map((y) => {
      const val = Math.round(investment * Math.pow(1 + cagrRate / 100, y));
      return {
        year: y,
        val,
        gain: val - investment
      };
    });
  }, [investment, cagrRate]);

  return (
    <div className="bg-white rounded-2xl border border-[#c2d1c9] shadow-md p-6 font-sans-clean text-[#1c2421]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-[#e5ece8] gap-2">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#c5a059]/15 text-[#0f2e22] text-[11px] font-semibold mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>REAL ESTATE WEALTH PROJECTION</span>
          </div>
          <h3 className="font-editorial text-2xl font-normal text-[#0f2e22]">
            Land Value Appreciation Estimator
          </h3>
          <p className="text-xs text-[#55635c] mt-0.5">
            {projectName ? `Projected asset valuation for ${projectName}` : 'Sanctioned plotted corridors historically appreciate at 12% – 16% CAGR.'}
          </p>
        </div>

        <div className="bg-[#0f2e22] text-white px-4 py-2 rounded-xl text-right">
          <div className="text-[10px] text-[#d8b879] uppercase font-bold tracking-wider">
            Projected in {holdingYears} Years
          </div>
          <div className="text-xl font-bold font-sans text-white">
            {formatINR(futureValue)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-5 text-xs">
          {/* Plot Investment Amount */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-[#0f2e22]">Plot Purchase Value</label>
              <span className="font-bold text-[#0f2e22] font-mono text-sm">
                {formatINR(investment)}
              </span>
            </div>
            <input
              type="range"
              min={1500000}
              max={15000000}
              step={100000}
              value={investment}
              onChange={(e) => setInvestment(Number(e.target.value))}
              className="w-full accent-[#0f2e22] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>₹15 Lakhs</span>
              <span>₹75 Lakhs</span>
              <span>₹1.5 Crores</span>
            </div>
          </div>

          {/* Holding Tenure */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-[#0f2e22]">Holding Horizon</label>
              <span className="font-bold text-[#0f2e22]">{holdingYears} Years</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[3, 5, 7, 10].map((yr) => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => setHoldingYears(yr)}
                  className={`py-2 px-3 rounded-lg font-semibold text-xs transition-colors cursor-pointer ${
                    holdingYears === yr
                      ? 'bg-[#0f2e22] text-white shadow-xs'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {yr} Years
                </button>
              ))}
            </div>
          </div>

          {/* Annual CAGR Growth Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-[#0f2e22]">Expected Annual CAGR</label>
              <span className="font-bold text-[#c5a059] font-mono text-sm">{cagrRate}% p.a.</span>
            </div>
            <input
              type="range"
              min={8}
              max={20}
              step={0.5}
              value={cagrRate}
              onChange={(e) => setCagrRate(Number(e.target.value))}
              className="w-full accent-[#c5a059] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>8% (Conservative)</span>
              <span>13.5% (Corridor Average)</span>
              <span>20% (High Growth Metro Node)</span>
            </div>
          </div>

          {/* Plotted vs Apartment Insight Note */}
          <div className="p-3 bg-[#faf8f5] border border-[#e5ece8] rounded-xl flex items-start gap-2.5 text-[#55635c] text-[11px] leading-relaxed">
            <Sparkles className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
            <span>
              <strong>Why Plotted Land?</strong> Unlike apartments where building structures depreciate over 30 years, 100% of your investment goes into the appreciating land parcel with complete freehold ownership.
            </span>
          </div>
        </div>

        {/* Results & Timeline Column */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          {/* Summary Metric Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-[#f4f7f5] rounded-xl border border-[#c2d1c9]/60">
              <span className="text-[10px] font-semibold text-[#7b998a] uppercase tracking-wider block">
                Estimated Net Gain
              </span>
              <div className="text-xl font-bold font-sans text-emerald-800 mt-1">
                +{formatINR(capitalGain)}
              </div>
              <span className="text-[11px] text-emerald-700 font-medium">
                +{gainPercentage}% on capital
              </span>
            </div>

            <div className="p-4 bg-[#faf8f4] rounded-xl border border-[#ded5c7]">
              <span className="text-[10px] font-semibold text-[#7b998a] uppercase tracking-wider block">
                Doubling Period
              </span>
              <div className="text-xl font-bold font-sans text-[#0f2e22] mt-1">
                ~{(72 / cagrRate).toFixed(1)} Years
              </div>
              <span className="text-[11px] text-[#55635c]">
                Based on Rule of 72
              </span>
            </div>
          </div>

          {/* Growth Milestone Bars */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-[#0f2e22]">
              <span>Growth Timeline</span>
              <span>Valuation</span>
            </div>
            <div className="space-y-2">
              {milestones.map((m) => {
                const maxVal = milestones[milestones.length - 1].val;
                const widthPercent = Math.max(20, Math.round((m.val / maxVal) * 100));
                const isCurrentTenure = m.year === holdingYears;

                return (
                  <div key={m.year} className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className={`font-medium ${isCurrentTenure ? 'text-[#0f2e22] font-bold' : 'text-gray-500'}`}>
                        Year {m.year}
                      </span>
                      <span className={`font-mono font-semibold ${isCurrentTenure ? 'text-[#0f2e22]' : 'text-gray-600'}`}>
                        {formatINR(m.val)}
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isCurrentTenure ? 'bg-[#c5a059]' : 'bg-[#0f2e22]/70'
                        }`}
                        style={{ width: `${widthPercent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
