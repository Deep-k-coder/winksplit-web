import React from 'react';
import { MessageSquare } from 'lucide-react';
import { generateWhatsAppLink } from '../../utils/whatsapp';

export const WhatsAppFloatingBtn: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center group">
      {/* Tooltip Label */}
      <span className="hidden sm:block mr-3 px-3 py-1.5 rounded-xl bg-wink-green-deep text-white text-xs font-semibold shadow-lg backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0 border border-wink-kraft/30">
        Order on WhatsApp
      </span>

      {/* Floating Action Button */}
      <a
        href={generateWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact WINKSPLIT on WhatsApp"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 whatsapp-pulse border-2 border-white"
      >
        <MessageSquare className="w-7 h-7 fill-white text-white" />
      </a>
    </div>
  );
};
