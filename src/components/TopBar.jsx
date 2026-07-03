import React from 'react';

/**
 * TopBar — Bar informasi atas yang melayang di atas iframe.
 *
 * Menampilkan:
 * - Nama lokasi aktif
 * - Badge kategori
 * - Status koneksi sensor (indikator visual)
 *
 * Tersembunyi saat Mode VR aktif.
 *
 * @param {Object} props
 * @param {Object|null} props.activePoint - Data titik aktif
 * @param {boolean} props.isVRMode - Status mode VR
 */
const TopBar = ({ activePoint, isVRMode }) => {
  // Sembunyikan saat VR mode
  if (isVRMode) return null;

  return (
    <div
      id="top-info-bar"
      className="
        fixed top-4 md:top-5
        left-1/2 -translate-x-1/2
        z-30
        animate-fade-in
      "
    >
      <div className="glass-card-dark rounded-2xl px-5 py-2.5 md:px-6 md:py-3 flex items-center gap-3 md:gap-4">
        {activePoint ? (
          <>
            {/* Ikon lokasi */}
            <span className="text-xl md:text-2xl">{activePoint.icon}</span>

            {/* Info lokasi */}
            <div className="flex flex-col">
              <span className="font-display font-semibold text-sm md:text-base text-white leading-tight">
                {activePoint.name}
              </span>
              <span className={`text-[10px] md:text-xs font-medium mt-0.5 ${activePoint.tagColor?.replace('bg-', 'text-').replace('/20', '/80') || 'text-white/50'}`}>
                {activePoint.category}
              </span>
            </div>

            {/* Divider */}
            <div className="w-px h-8 bg-white/15" />

            {/* Status indicator */}
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] md:text-xs text-white/40 font-medium">Live 360°</span>
            </div>
          </>
        ) : (
          <>
            <span className="text-xl">🧭</span>
            <span className="font-display text-sm md:text-base text-white/70 font-medium">
              Pilih titik eksplorasi untuk mulai menjelajah
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default TopBar;
