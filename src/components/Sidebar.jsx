import React, { useState } from 'react';

/**
 * Sidebar — Menu navigasi overlay dengan efek glassmorphism.
 *
 * Fitur:
 * - Daftar titik eksplorasi pulau dengan ikon & deskripsi
 * - Toggle hide/show (manual & otomatis saat VR mode)
 * - Animasi slide-in/out yang halus
 * - Mobile-friendly dengan tombol besar yang mudah di-tap
 *
 * @param {Object} props
 * @param {Array} props.points - Array data titik eksplorasi
 * @param {string|null} props.activePointId - ID titik yang sedang aktif
 * @param {Function} props.onSelectPoint - Callback saat titik dipilih
 * @param {Function} props.onOpenInfo - Callback untuk membuka InfoPanel
 * @param {boolean} props.isVisible - Visibilitas sidebar (dari parent)
 * @param {Function} props.onToggle - Toggle visibilitas
 * @param {boolean} props.isVRMode - Status mode VR
 */
const Sidebar = ({
  points,
  activePointId,
  onSelectPoint,
  onOpenInfo,
  isVisible,
  onToggle,
  isVRMode,
}) => {
  const [hoveredId, setHoveredId] = useState(null);

  // Sembunyikan sidebar sepenuhnya saat VR mode
  if (isVRMode) return null;

  return (
    <>
      {/* ========== Tombol Toggle Sidebar ========== */}
      <button
        id="sidebar-toggle-btn"
        onClick={onToggle}
        className={`
          fixed z-50 transition-all duration-500 ease-out
          ${isVisible ? 'left-[290px] md:left-[330px]' : 'left-0'}
          top-1/2 -translate-y-1/2
          w-10 h-20 md:w-11 md:h-24
          glass-card-dark rounded-r-2xl
          flex items-center justify-center
          hover:bg-white/15 active:scale-95
          group
        `}
        aria-label={isVisible ? 'Sembunyikan menu' : 'Tampilkan menu'}
        title={isVisible ? 'Sembunyikan menu' : 'Tampilkan menu'}
      >
        <svg
          className={`w-5 h-5 text-white/80 group-hover:text-emerald-400 transition-all duration-300 ${
            isVisible ? 'rotate-180' : 'rotate-0'
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* ========== Sidebar Panel ========== */}
      <aside
        id="sidebar-navigation"
        className={`
          fixed top-0 left-0 z-40
          w-[290px] md:w-[330px] h-full
          glass-card
          transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${isVisible ? 'translate-x-0' : '-translate-x-full'}
          flex flex-col
          overflow-hidden
        `}
        role="navigation"
        aria-label="Navigasi Titik Eksplorasi"
      >
        {/* ----- Header ----- */}
        <div className="p-5 md:p-6 border-b border-white/10">
          {/* Logo & Judul */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center text-xl md:text-2xl shadow-lg shadow-emerald-500/20 animate-float">
              🏝️
            </div>
            <div>
              <h1 className="font-display text-base md:text-lg font-bold text-white leading-tight">
                Eksplorasi Pulau
              </h1>
              <p className="text-[10px] md:text-xs text-emerald-300/80 font-medium tracking-wider uppercase">
                Virtual Tour 360°
              </p>
            </div>
          </div>

          {/* Divider dekoratif */}
          <div className="flex items-center gap-2 mt-4">
            <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/50 to-transparent" />
            <span className="text-[10px] text-white/40 font-medium tracking-widest uppercase">
              Titik Eksplorasi
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-cyan-500/50 to-transparent" />
          </div>
        </div>

        {/* ----- Daftar Titik Eksplorasi ----- */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 md:p-4 space-y-2">
          {points.map((point, index) => {
            const isActive = point.id === activePointId;
            const isHovered = point.id === hoveredId;

            return (
              <div
                key={point.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'both' }}
              >
                <button
                  id={`explore-btn-${point.id}`}
                  className={`btn-explore ${isActive ? 'active' : 'text-white/80 hover:text-white'}`}
                  onClick={() => onSelectPoint(point.id)}
                  onMouseEnter={() => setHoveredId(point.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Ikon */}
                  <span
                    className={`
                      text-2xl md:text-3xl flex-shrink-0
                      transition-transform duration-300
                      ${isHovered || isActive ? 'scale-110' : 'scale-100'}
                    `}
                  >
                    {point.icon}
                  </span>

                  {/* Teks */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-display font-semibold text-sm md:text-base truncate">
                        {point.name}
                      </span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-glow flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] md:text-xs text-white/50 leading-snug line-clamp-2">
                      {point.description}
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <svg
                    className={`
                      w-4 h-4 flex-shrink-0 transition-all duration-300
                      ${isActive ? 'text-emerald-400 translate-x-0.5' : 'text-white/20'}
                      ${isHovered ? 'text-white/50 translate-x-0.5' : ''}
                    `}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Tombol Detail Info — muncul saat item aktif */}
                {isActive && (
                  <button
                    id={`detail-btn-${point.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenInfo(point.id);
                    }}
                    className="
                      ml-12 md:ml-14 mt-1.5 mb-1
                      btn-action
                      bg-gradient-to-r from-emerald-600/80 to-cyan-600/80
                      hover:from-emerald-500 hover:to-cyan-500
                      text-white shadow-lg shadow-emerald-700/20
                      text-xs
                      animate-fade-in
                    "
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Detail Info
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* ----- Footer ----- */}
        <div className="p-4 md:p-5 border-t border-white/10">
          <div className="flex items-center gap-2 text-[10px] md:text-xs text-white/30">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
            <span>Gunakan VR Box untuk pengalaman imersif</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
