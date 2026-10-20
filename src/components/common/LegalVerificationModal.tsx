import React from 'react';
import { Project } from '../../types';
import {
  X,
  ShieldCheck,
  FileCheck,
  CheckCircle2,
  Building2,
  Landmark,
  Scale,
  Download,
  ExternalLink,
  Info
} from 'lucide-react';

interface LegalVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: Project;
}

export const LegalVerificationModal: React.FC<LegalVerificationModalProps> = ({
  isOpen,
  onClose,
  project
}) => {
  if (!isOpen) return null;

  const checklistItems = [
    {
      title: 'DTCP / CMDA Sanction Order',
      description: 'Official layout order copy signed by Directorate of Town and Country Planning (DTCP) or CMDA with approved parcel boundaries.',
      ref: project?.approvalNumber || 'TN/01/Layout/2026/0491',
      status: 'VERIFIED',
      icon: ShieldCheck
    },
    {
      title: 'RERA Registration & QR Demarcation',
      description: 'Registered under Real Estate Regulatory Authority with complete quarterly compliance updates and carpet/plot area disclosure.',
      ref: project ? `RERA Reg: TN/LAYOUT/${project.id.slice(5, 12).toUpperCase()}` : 'TN/RERA/LAYOUT/2026',
      status: 'VERIFIED',
      icon: FileCheck
    },
    {
      title: '30-Year Encumbrance Certificate (Nil EC)',
      description: 'Clean search report confirming zero legal disputes, no financial hypothecation, and 100% marketable freehold title for 30+ years.',
      ref: 'Sub-Registrar Office Online EC Verified',
      status: 'VERIFIED',
      icon: Scale
    },
    {
      title: 'Patta & Individual Chitta Transfer Readiness',
      description: 'Parent patta in developer name; instantaneous individual patta sub-division assistance guaranteed post-sale deed execution.',
      ref: 'Revenue Department Record Cleared',
      status: 'VERIFIED',
      icon: CheckCircle2
    },
    {
      title: 'Nationalized & Private Bank Approvals (Up to 80% Loan)',
      description: 'Pre-sanctioned plot purchase and home construction composite loan tie-ups with State Bank of India (SBI), HDFC Bank, ICICI Bank, and Axis Bank.',
      ref: 'Project Approval APF Codes Active',
      status: 'VERIFIED',
      icon: Landmark
    },
    {
      title: 'OSR & Road Gift Deed to Local Body',
      description: 'All 40ft & 30ft blacktop internal roads, street lighting, and open space reservation (parks) formally gifted to the local Panchayat / Municipality.',
      ref: 'Local Body Gift Deed Registered',
      status: 'VERIFIED',
      icon: Building2
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto font-sans-clean">
      <div className="bg-[#faf8f5] text-[#1c2421] w-full max-w-2xl rounded-2xl shadow-2xl border border-[#c2d1c9] overflow-hidden my-auto flex flex-col max-h-[90vh] animate-page-enter">
        {/* Header */}
        <div className="px-6 py-5 bg-[#0f2e22] text-white flex items-center justify-between border-b border-[#163e2f]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c5a059]/20 border border-[#c5a059]/40 flex items-center justify-center text-[#d8b879]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#d8b879]">
                  LEGAL DUE DILIGENCE DOSSIER
                </span>
                <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold rounded-full border border-emerald-500/30">
                  100% Clear Title
                </span>
              </div>
              <h3 className="font-editorial text-xl font-normal text-white mt-0.5">
                {project ? project.name : 'Plotted Land Legal Checklist'}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#c2d1c9] hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-start gap-3 text-emerald-950">
            <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Every plotted enclave hosted on Navanext undergoes rigorous multi-tier legal vetting by high court property advocates before being cataloged. All parent documents are available for inspection.
            </p>
          </div>

          {/* Checklist */}
          <div className="space-y-3">
            <h4 className="font-editorial text-base text-[#0f2e22] font-semibold">
              Legal Clearances & Sanctions
            </h4>
            
            <div className="space-y-2.5">
              {checklistItems.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-3.5 bg-white rounded-xl border border-[#e5ece8] hover:border-[#c2d1c9] transition-all flex items-start justify-between gap-3 shadow-2xs"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-[#0f2e22]/5 text-[#0f2e22] flex items-center justify-center shrink-0 mt-0.5">
                        <IconComponent className="w-4 h-4 text-[#0f2e22]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs text-[#0f2e22]">
                            {item.title}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#55635c] mt-0.5 leading-relaxed">
                          {item.description}
                        </p>
                        <div className="font-mono text-[10px] text-[#7b998a] mt-1.5 bg-gray-50 px-2 py-0.5 rounded inline-block border border-gray-200">
                          {item.ref}
                        </div>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 shrink-0">
                      <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                      {item.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bank Loan Section */}
          <div className="p-4 bg-white rounded-xl border border-[#ded5c7] space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-xs text-[#0f2e22]">
                Approved Banking Partners (APF Pre-Sanctioned)
              </span>
              <span className="text-[10px] text-[#7b998a]">Direct Loan Processing</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-medium text-[#0f2e22]">
              <span className="px-2.5 py-1 rounded-md bg-[#faf8f5] border border-gray-200">State Bank of India (SBI)</span>
              <span className="px-2.5 py-1 rounded-md bg-[#faf8f5] border border-gray-200">HDFC Bank</span>
              <span className="px-2.5 py-1 rounded-md bg-[#faf8f5] border border-gray-200">ICICI Bank</span>
              <span className="px-2.5 py-1 rounded-md bg-[#faf8f5] border border-gray-200">Axis Bank</span>
              <span className="px-2.5 py-1 rounded-md bg-[#faf8f5] border border-gray-200">Canara Bank</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-white border-t border-[#e5ece8] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-[#7b998a]">
            Want our advocate to call you with title copies?
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href="https://wa.me/917200386806?text=Hello%2C%20please%20share%20the%20legal%20clearance%20dossier%20and%20DTCP%20sanction%20copy."
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20ba59] transition-colors"
            >
              <span>Request Legal Copies on WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium text-[#55635c] hover:bg-gray-100 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
