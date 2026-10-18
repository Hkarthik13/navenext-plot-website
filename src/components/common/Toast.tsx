import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-xl border backdrop-blur-md transition-all duration-300 transform translate-y-0 ${
              isSuccess
                ? 'bg-[#0f2e22]/95 border-[#1e4d3b] text-white shadow-emerald-950/20'
                : isWarning
                ? 'bg-amber-900/95 border-amber-700 text-amber-50 shadow-amber-950/20'
                : isError
                ? 'bg-rose-900/95 border-rose-700 text-rose-50'
                : 'bg-[#1c2421]/95 border-[#2a3430] text-white'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-[#c5a059]" />}
              {isWarning && <AlertCircle className="w-5 h-5 text-amber-300" />}
              {isError && <AlertCircle className="w-5 h-5 text-rose-300" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-[#8fa89b]" />}
            </div>
            <div className="flex-1 text-sm font-medium leading-relaxed font-sans-clean">
              {toast.message}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-white transition-colors p-0.5 rounded-lg shrink-0"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
