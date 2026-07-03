import React from 'react';

/**
 * VRToggle — Tombol floating untuk toggle Mode VR.
 *
 * Saat Mode VR diaktifkan:
 * - Sidebar navigasi disembunyikan
 * - Overlay UI hilang dari layar
 * - Layar HP bersih untuk dimasukkan ke VR Box / Google Cardboard
 *
 * CATATAN SENSOR:
 * Agar giroskop berfungsi di VR mode, halaman HARUS diakses via HTTPS.
 * Pada iOS Safari, pengguna juga perlu memberikan izin sensor secara manual
 * melalui DeviceOrientationEvent.requestPermission().
 *
 * @param {Object} props
 * @param {boolean} props.isVRMode - Status mode VR aktif/tidak
 * @param {Function} props.onToggle - Callback toggle VR mode
 */
const VRToggle = ({ isVRMode, onToggle }) => {
  return (
    <button
      id="vr-mode-toggle-btn"
      onClick={onToggle}
      className={`
        fixed z-50 transition-all duration-500 ease-out
        ${isVRMode
          ? 'bottom-6 left-1/2 -translate-x-1/2'
          : 'bottom-6 right-5 md:right-8'
        }
        ${isVRMode
          ? 'w-14 h-14 rounded-full bg-red-500/80 hover:bg-red-500 shadow-lg shadow-red-500/30'
          : 'px-5 py-3.5 rounded-2xl glass-card hover:bg-white/15'
        }
        flex items-center justify-center gap-2.5
        active:scale-90
        group
      `}
      aria-label={isVRMode ? 'Keluar dari Mode VR' : 'Masuk ke Mode VR'}
      title={isVRMode ? 'Keluar Mode VR' : 'Masuk Mode VR — Sembunyikan UI untuk VR Box'}
    >
      {isVRMode ? (
        /* Ikon X — keluar VR */
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      ) : (
        /* Ikon VR Headset + Label */
        <>
          <svg
            className="w-5 h-5 md:w-6 md:h-6 text-white/80 group-hover:text-emerald-400 transition-colors duration-300"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 7.5h16.5M3.75 7.5a2.25 2.25 0 00-2.25 2.25v5.25a2.25 2.25 0 002.25 2.25h4.318a2.25 2.25 0 001.59-.659l1.591-1.591a.75.75 0 011.06 0l1.591 1.591a2.25 2.25 0 001.59.659h4.318a2.25 2.25 0 002.25-2.25V9.75a2.25 2.25 0 00-2.25-2.25M3.75 7.5V6a2.25 2.25 0 012.25-2.25h12A2.25 2.25 0 0120.25 6v1.5"
            />
          </svg>
          <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors hidden md:inline">
            Mode VR
          </span>
          {/* Badge mobile */}
          <span className="md:hidden text-[10px] font-bold text-white/70">VR</span>
        </>
      )}
    </button>
  );
};

export default VRToggle;
