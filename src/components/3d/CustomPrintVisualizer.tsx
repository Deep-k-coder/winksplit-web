import React, { useState } from 'react';
import { Upload, Sparkles, Check, ArrowRight, MessageSquare, RefreshCw, Palette } from 'lucide-react';
import { generateCustomPrintWhatsAppLink } from '../../utils/whatsapp';
import { useCatalog } from '../../context/CatalogContext';

const PRESET_LOGOS = [
  { id: 'chai', name: 'Chai & Co.', text: '☕ CHAI & CO. ☕\nEst. 2024' },
  { id: 'biryani', name: 'Urban Biryani', text: 'URBAN BIRYANI\nAuthentic Aromas' },
  { id: 'cafe', name: 'Café Nirvana', text: 'CAFÉ NIRVANA\nOrganic Artisan Roasts' },
  { id: 'green', name: 'Green Spoon', text: '🌱 GREEN SPOON\nFresh • Local • Pure' },
];

const PACKAGING_TYPES = [
  { id: 'box', name: 'Kraft Takeaway Box', shape: 'box', defaultDim: '750 ml' },
  { id: 'bowl', name: 'Round Kraft Bowl', shape: 'bowl', defaultDim: '500 ml' },
  { id: 'bottle', name: 'Paper Bottle', shape: 'bottle', defaultDim: '500 ml' },
  { id: 'napkin', name: 'Kraft Table Napkin', shape: 'napkin', defaultDim: '2-Ply' },
];

const INK_COLORS = [
  { id: 'forest', name: 'WINKSPLIT Forest Green', hex: '#164332' },
  { id: 'espresso', name: 'Espresso Brown', hex: '#3E2723' },
  { id: 'black', name: 'Carbon Black', hex: '#1A1A1A' },
  { id: 'maroon', name: 'Indian Maroon', hex: '#6B1D2F' },
];

const PAPER_TONES = [
  { id: 'natural', name: 'Natural Brown Kraft', bg: 'from-[#D4A373] to-[#B88B58]', border: 'border-[#9E7244]' },
  { id: 'bleached', name: 'Virgin White Kraft', bg: 'from-[#FAF8F5] to-[#EFEAE2]', border: 'border-[#D6CEC2]' },
  { id: 'dark-kraft', name: 'Rustic Deep Kraft', bg: 'from-[#9E7244] to-[#7B532B]', border: 'border-[#5A3816]' },
];

export const CustomPrintVisualizer: React.FC = () => {
  const { openQuoteModal } = useCatalog();
  const [selectedType, setSelectedType] = useState(PACKAGING_TYPES[0]);
  const [selectedInk, setSelectedInk] = useState(INK_COLORS[0]);
  const [selectedPaper, setSelectedPaper] = useState(PAPER_TONES[0]);
  const [selectedPresetLogo, setSelectedPresetLogo] = useState(PRESET_LOGOS[0]);
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(null);
  const [logoScale, setLogoScale] = useState(1);
  const [brandTagline, setBrandTagline] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomLogoUrl(url);
    }
  };

  const handleClearCustomLogo = () => {
    setCustomLogoUrl(null);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-wink-kraft-light/30 shadow-paper-lg">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: 3D Live Interactive Mockup Frame */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          <div className="w-full relative min-h-[380px] sm:min-h-[460px] rounded-2xl bg-gradient-to-br from-wink-ivory-300/60 via-wink-sand-light/40 to-wink-ivory-200/80 p-8 flex items-center justify-center border border-wink-kraft-light/40 shadow-inner overflow-hidden">
            
            {/* Background 3D grid line decoration */}
            <div className="absolute inset-0 bg-[radial-gradient(#C29B6C_1px,transparent_1px)] [background-size:20px_20px] opacity-25" />
            
            {/* Live Interactive Packaging Mockup Shape */}
            <div className="relative z-10 w-full max-w-sm flex items-center justify-center transition-all duration-500">
              
              {/* Product: Takeaway Box */}
              {selectedType.id === 'box' && (
                <div
                  className={`w-64 sm:w-72 h-56 sm:h-64 rounded-2xl bg-gradient-to-br ${selectedPaper.bg} ${selectedPaper.border} border-4 shadow-3d-float relative flex flex-col items-center justify-center p-6 transition-all duration-300`}
                  style={{ transform: 'perspective(600px) rotateX(8deg) rotateY(-4deg)' }}
                >
                  {/* Flap fold lines */}
                  <div className="absolute top-0 inset-x-0 h-10 border-b border-black/10 flex justify-between px-6 items-center">
                    <div className="w-12 h-1 bg-black/10 rounded-full" />
                    <span className="text-[10px] font-mono tracking-widest opacity-60">WINKSPLIT KRAFT</span>
                    <div className="w-12 h-1 bg-black/10 rounded-full" />
                  </div>

                  {/* Logo Center Display */}
                  <div className="my-auto text-center flex flex-col items-center justify-center" style={{ transform: `scale(${logoScale})` }}>
                    {customLogoUrl ? (
                      <img
                        src={customLogoUrl}
                        alt="Custom Logo"
                        className="max-h-24 max-w-[180px] object-contain drop-shadow-sm filter"
                        style={{ filter: `drop-shadow(0 1px 1px rgba(0,0,0,0.2))` }}
                      />
                    ) : (
                      <div
                        className="font-bold tracking-tight text-center px-4 py-2 border-2 rounded-xl transition-colors whitespace-pre-line"
                        style={{ color: selectedInk.hex, borderColor: selectedInk.hex }}
                      >
                        <span className="text-lg uppercase">{selectedPresetLogo.text}</span>
                        {brandTagline && <div className="text-xs font-normal mt-1 opacity-90">{brandTagline}</div>}
                      </div>
                    )}
                  </div>

                  {/* Eco Seal Stamp */}
                  <div className="absolute bottom-3 right-4 flex items-center gap-1.5 opacity-60">
                    <Sparkles className="w-3 h-3 text-wink-green-deep" />
                    <span className="text-[9px] uppercase tracking-wider font-semibold">100% Food-Grade Eco Kraft</span>
                  </div>
                </div>
              )}

              {/* Product: Round Bowl */}
              {selectedType.id === 'bowl' && (
                <div
                  className={`w-64 sm:w-72 h-64 sm:h-72 rounded-full bg-gradient-to-br ${selectedPaper.bg} ${selectedPaper.border} border-8 shadow-3d-float relative flex items-center justify-center p-6 transition-all duration-300`}
                  style={{ transform: 'perspective(600px) rotateX(25deg)' }}
                >
                  <div className="w-48 h-48 rounded-full border-2 border-dashed border-black/15 flex items-center justify-center p-4">
                    <div className="text-center" style={{ transform: `scale(${logoScale})` }}>
                      {customLogoUrl ? (
                        <img src={customLogoUrl} alt="Custom Logo" className="max-h-20 max-w-[140px] object-contain" />
                      ) : (
                        <div
                          className="font-bold text-center px-3 py-1.5 border rounded-lg whitespace-pre-line"
                          style={{ color: selectedInk.hex, borderColor: selectedInk.hex }}
                        >
                          <span className="text-sm uppercase">{selectedPresetLogo.text}</span>
                          {brandTagline && <div className="text-[11px] font-normal mt-0.5">{brandTagline}</div>}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Product: Paper Bottle */}
              {selectedType.id === 'bottle' && (
                <div
                  className={`w-36 sm:w-44 h-72 sm:h-80 rounded-3xl bg-gradient-to-br ${selectedPaper.bg} ${selectedPaper.border} border-4 shadow-3d-float relative flex flex-col items-center justify-center p-4 transition-all duration-300`}
                  style={{ transform: 'perspective(600px) rotateY(-8deg)' }}
                >
                  {/* Cap */}
                  <div className="absolute -top-5 w-16 h-6 rounded-t-lg bg-wink-green-deep border-b-2 border-black/20" />
                  
                  {/* Label area */}
                  <div className="w-full bg-white/90 rounded-xl p-3 shadow-inner my-auto flex flex-col items-center justify-center text-center">
                    <div style={{ transform: `scale(${logoScale})` }}>
                      {customLogoUrl ? (
                        <img src={customLogoUrl} alt="Custom Logo" className="max-h-16 max-w-[100px] object-contain" />
                      ) : (
                        <div
                          className="font-bold text-xs uppercase whitespace-pre-line"
                          style={{ color: selectedInk.hex }}
                        >
                          {selectedPresetLogo.text}
                          {brandTagline && <div className="text-[10px] font-normal mt-1">{brandTagline}</div>}
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="text-[9px] font-mono text-wink-charcoal-muted mt-2">WINKSPLIT 500ML</span>
                </div>
              )}

              {/* Product: Napkin */}
              {selectedType.id === 'napkin' && (
                <div
                  className={`w-64 sm:w-72 h-64 sm:h-72 rounded-lg bg-gradient-to-br ${selectedPaper.bg} ${selectedPaper.border} border-2 shadow-3d-float relative flex items-end justify-end p-6 transition-all duration-300`}
                  style={{ transform: 'perspective(600px) rotateX(12deg)' }}
                >
                  {/* Embossed textured border */}
                  <div className="absolute inset-2 border-4 border-dotted border-black/10 rounded pointer-events-none" />
                  
                  <div className="relative z-10" style={{ transform: `scale(${logoScale})` }}>
                    {customLogoUrl ? (
                      <img src={customLogoUrl} alt="Custom Logo" className="max-h-20 max-w-[120px] object-contain" />
                    ) : (
                      <div
                        className="font-bold text-xs text-right whitespace-pre-line p-2 border rounded-md"
                        style={{ color: selectedInk.hex, borderColor: selectedInk.hex }}
                      >
                        {selectedPresetLogo.text}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Live Indicator tag */}
            <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur shadow-sm border border-wink-kraft-light/30">
              <span className="w-2 h-2 rounded-full bg-wink-green animate-pulse" />
              <span className="text-xs font-semibold text-wink-green-deep">3D Mockup Studio</span>
            </div>
          </div>
        </div>

        {/* Right: Studio Customization Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-wink-green-mint text-wink-green-deep text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Interactive Brand Studio
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-wink-green-deep">
              Preview Your Brand on Packaging
            </h3>
            <p className="text-wink-charcoal-light text-sm mt-1">
              Select packaging shape, upload your restaurant logo or pick sample Indian styles, and choose eco ink colors.
            </p>
          </div>

          {/* 1. Select Packaging Shape */}
          <div>
            <label className="block text-xs font-bold text-wink-charcoal uppercase tracking-wider mb-2">
              1. Choose Packaging Product
            </label>
            <div className="grid grid-cols-2 gap-2">
              {PACKAGING_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-2 text-xs font-medium rounded-xl border text-left flex items-center justify-between transition-all ${
                    selectedType.id === type.id
                      ? 'bg-wink-green text-white border-wink-green shadow-sm'
                      : 'bg-wink-ivory text-wink-charcoal border-wink-kraft-light/30 hover:border-wink-green/40'
                  }`}
                >
                  <span>{type.name}</span>
                  {selectedType.id === type.id && <Check className="w-3.5 h-3.5 ml-1" />}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Choose Logo or Upload Custom */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-wink-charcoal uppercase tracking-wider">
                2. Brand Logo
              </label>
              {customLogoUrl && (
                <button
                  onClick={handleClearCustomLogo}
                  className="text-xs text-red-600 hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" /> Reset to Preset
                </button>
              )}
            </div>

            {/* Custom Upload Button */}
            <label className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl border-2 border-dashed border-wink-kraft hover:border-wink-green bg-wink-ivory-100 hover:bg-wink-ivory-200 cursor-pointer transition-colors text-xs font-semibold text-wink-green-deep mb-2.5">
              <Upload className="w-4 h-4 text-wink-green" />
              <span>{customLogoUrl ? 'Change Uploaded Logo (.PNG / .SVG)' : 'Upload Your Restaurant Logo'}</span>
              <input type="file" accept="image/png, image/jpeg, image/svg+xml" onChange={handleFileUpload} className="hidden" />
            </label>

            {/* Or choose sample Indian Brand Logos */}
            {!customLogoUrl && (
              <div className="grid grid-cols-2 gap-2">
                {PRESET_LOGOS.map((logo) => (
                  <button
                    key={logo.id}
                    onClick={() => setSelectedPresetLogo(logo)}
                    className={`px-3 py-2 text-xs font-medium rounded-xl border transition-all ${
                      selectedPresetLogo.id === logo.id
                        ? 'bg-wink-sand-light border-wink-kraft-dark text-wink-kraft-deep font-bold shadow-sm'
                        : 'bg-white border-wink-kraft-light/30 text-wink-charcoal-muted hover:border-wink-kraft'
                    }`}
                  >
                    {logo.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3. Paper Tone & Ink Colors */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-wink-charcoal uppercase tracking-wider mb-2">
                3. Paper Tone
              </label>
              <div className="flex items-center gap-2">
                {PAPER_TONES.map((paper) => (
                  <button
                    key={paper.id}
                    onClick={() => setSelectedPaper(paper)}
                    title={paper.name}
                    className={`w-9 h-9 rounded-full bg-gradient-to-br ${paper.bg} border-2 transition-all ${
                      selectedPaper.id === paper.id ? 'ring-2 ring-wink-green ring-offset-2 scale-110' : 'opacity-80 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-wink-charcoal uppercase tracking-wider mb-2">
                4. Eco Ink Color
              </label>
              <div className="flex items-center gap-2">
                {INK_COLORS.map((ink) => (
                  <button
                    key={ink.id}
                    onClick={() => setSelectedInk(ink)}
                    title={ink.name}
                    className={`w-9 h-9 rounded-full border-2 border-white shadow-sm transition-all ${
                      selectedInk.id === ink.id ? 'ring-2 ring-wink-green ring-offset-2 scale-110' : 'opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: ink.hex }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <a
              href={generateCustomPrintWhatsAppLink(selectedType.name, 5000)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold text-sm shadow-md transition-transform hover:-translate-y-0.5"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Order Custom Print on WhatsApp</span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-wink-green hover:bg-wink-green-deep text-white font-semibold text-sm shadow-md transition-transform hover:-translate-y-0.5"
            >
              <span>Connect With Us</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};
