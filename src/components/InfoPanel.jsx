import React, { useEffect, useRef } from 'react';

/**
 * InfoPanel — Panel samping slide-in dari kanan.
 *
 * Menampilkan detail informasi edukasi dan sejarah mengenai
 * lokasi pulau yang sedang dipilih.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Status buka/tutup panel
 * @param {Function} props.onClose - Callback untuk menutup panel
 * @param {Object|null} props.pointData - Data titik eksplorasi yang dipilih
 */
const InfoPanel = ({ isOpen, onClose, pointData }) => {
  const panelRef = useRef(null);

  // Tutup panel dengan tombol Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Klik di luar panel untuk menutup (pada overlay backdrop)
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!pointData) return null;

  const { detailInfo, icon, category, tagColor } = pointData;

  return (
    <>
      {/* ========== Backdrop Overlay ========== */}
      <div
        id="info-panel-backdrop"
        className={`
          fixed inset-0 z-[60]
          bg-black/40 backdrop-blur-sm
          transition-opacity duration-300
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        onClick={handleBackdropClick}
        aria-hidden={!isOpen}
      />

      {/* ========== Panel Slide-in ========== */}
      <div
        ref={panelRef}
        id="info-panel"
        className={`
          fixed top-0 right-0 z-[70]
          w-full max-w-md md:max-w-lg h-full
          glass-card
          transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          flex flex-col
          overflow-hidden
        `}
        role="dialog"
        aria-modal="true"
        aria-label={`Informasi Detail: ${detailInfo?.title || ''}`}
      >
        {/* ----- Header ----- */}
        <div className="relative p-5 md:p-6 border-b border-white/10">
          {/* Gradient dekoratif di belakang header */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.3) 0%, rgba(14, 165, 233, 0.2) 50%, transparent 100%)',
            }}
          />

          <div className="relative">
            {/* Tombol Close */}
            <button
              id="info-panel-close-btn"
              onClick={onClose}
              className="
                absolute -top-1 right-0
                w-9 h-9 md:w-10 md:h-10 rounded-xl
                bg-white/10 hover:bg-white/20
                flex items-center justify-center
                transition-all duration-200 active:scale-90
                group
              "
              aria-label="Tutup panel informasi"
            >
              <svg
                className="w-5 h-5 text-white/60 group-hover:text-white transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Ikon & Badge */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl md:text-5xl">{icon}</span>
              <span className={`badge ${tagColor}`}>
                {category}
              </span>
            </div>

            {/* Judul */}
            <h2 className="font-display text-xl md:text-2xl font-bold text-white leading-tight pr-10">
              {detailInfo.title}
            </h2>
            <p className="text-sm md:text-base text-emerald-300/70 font-medium mt-1">
              {detailInfo.subtitle}
            </p>
          </div>
        </div>

        {/* ----- Konten Scrollable ----- */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-5 md:p-6 space-y-6">
          {/* Fakta Menarik — Grid Cards */}
          {detailInfo.facts && detailInfo.facts.length > 0 && (
            <div>
              <h3 className="font-display text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">
                Fakta Menarik
              </h3>
              <div className="grid grid-cols-2 gap-2.5">
                {detailInfo.facts.map((fact, i) => (
                  <div
                    key={i}
                    className="
                      bg-white/5 hover:bg-white/10
                      border border-white/10
                      rounded-xl p-3 md:p-3.5
                      transition-all duration-300
                      hover:scale-[1.02]
                      group/fact
                    "
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg group-hover/fact:scale-110 transition-transform duration-300">
                        {fact.icon}
                      </span>
                      <span className="text-[10px] md:text-xs text-white/40 font-medium">
                        {fact.label}
                      </span>
                    </div>
                    <p className="text-sm md:text-base font-semibold text-white pl-0.5">
                      {fact.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Deskripsi Panjang */}
          <div>
            <h3 className="font-display text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">
              Informasi Lengkap
            </h3>
            <div className="space-y-4">
              {detailInfo.content.split('\n\n').map((paragraph, i) => (
                <p
                  key={i}
                  className="text-sm md:text-[15px] text-white/70 leading-relaxed md:leading-7"
                >
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          </div>

          {/* Catatan keamanan sensor */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <span className="text-lg mt-0.5">⚠️</span>
              <div>
                <h4 className="text-xs font-semibold text-amber-300 mb-1">
                  Tips Pengalaman VR
                </h4>
                <p className="text-[11px] md:text-xs text-amber-200/60 leading-relaxed">
                  Untuk pengalaman terbaik dengan VR Box, pastikan Anda mengakses website ini
                  melalui <strong className="text-amber-200">HTTPS</strong> agar sensor giroskop
                  dan akselerometer HP dapat berfungsi dengan baik. Di iOS, Anda perlu
                  mengizinkan akses sensor saat diminta oleh browser.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ----- Footer ----- */}
        <div className="p-4 md:p-5 border-t border-white/10">
          <button
            id="info-panel-close-footer-btn"
            onClick={onClose}
            className="
              btn-action w-full
              bg-white/10 hover:bg-white/15
              text-white/80 hover:text-white
              border border-white/10
            "
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Tur
          </button>
        </div>
      </div>
    </>
  );
};

export default InfoPanel;
