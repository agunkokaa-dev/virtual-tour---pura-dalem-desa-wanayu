import React, { useState, useCallback, useEffect } from 'react';
import TourViewer from './components/TourViewer';
import Sidebar from './components/Sidebar';
import InfoPanel from './components/InfoPanel';
import VRToggle from './components/VRToggle';
import TopBar from './components/TopBar';
import MusicPlayer from './components/MusicPlayer'; // ← Import MusicPlayer
import { explorationPoints } from './data/explorationPoints';

/**
 * ============================================================================
 * App.jsx — Eksplorasi Pulau Virtual
 * ============================================================================
 *
 * Aplikasi utama yang membungkus tur virtual 3DVista dengan UI overlay
 * berupa navigasi sidebar, info panel, dan toggle VR mode.
 *
 * ARSITEKTUR:
 * ┌─────────────────────────────────────────────┐
 * │  App (State Manager)                        │
 * │  ├── TourViewer (iframe 3DVista, z-0)       │
 * │  ├── TopBar (info bar atas, z-30)           │
 * │  ├── Sidebar (navigasi kiri, z-40)          │
 * │  ├── VRToggle (tombol VR, z-50)             │
 * │  ├── MusicPlayer (kontrol gamelan, z-50)   │
 * │  └── InfoPanel (panel detail kanan, z-60+)  │
 * └─────────────────────────────────────────────┘
 *
 * CATATAN KEAMANAN:
 * ─────────────────
 * Website ini WAJIB di-deploy menggunakan HTTPS agar:
 * 1. Sensor giroskop/akselerometer HP tidak diblokir browser
 * 2. WebXR API untuk mode VR stereoskopik dapat berfungsi
 * 3. DeviceOrientationEvent tidak ditolak (khususnya iOS Safari)
 *
 * Untuk development lokal, gunakan:
 * - `vite --https` (memerlukan sertifikat)
 * - Atau install: npm i -D @vitejs/plugin-basic-ssl
 *   lalu tambahkan di vite.config.js: plugins: [react(), basicSsl()]
 * ============================================================================
 */

function App() {
  // ===== State Management =====
  const [activePointId, setActivePointId] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false);
  const [infoPanelPointId, setInfoPanelPointId] = useState(null);
  const [isVRMode, setIsVRMode] = useState(false);

  // Data titik aktif (derived state)
  const activePoint = explorationPoints.find((p) => p.id === activePointId) || null;
  const infoPanelPoint = explorationPoints.find((p) => p.id === infoPanelPointId) || null;

  // ===== Handlers =====

  /**
   * Memilih titik eksplorasi.
   * Di sini Anda bisa menambahkan logika untuk mengirim pesan ke iframe 3DVista
   * via postMessage agar tur berpindah ke scene tertentu.
   */
  const handleSelectPoint = useCallback((pointId) => {
    setActivePointId(pointId);

    /*
     * TODO: Integrasi dengan 3DVista via postMessage
     * Contoh:
     * const iframe = document.getElementById('tour-viewer-iframe');
     * iframe?.contentWindow?.postMessage({
     *   action: 'goToScene',
     *   sceneId: pointId,
     * }, '*');
     *
     * Catatan: Ini memerlukan kustomisasi di sisi 3DVista (script_general.js)
     * untuk mendengarkan pesan dan menjalankan navigasi scene.
     */
  }, []);

  /** Membuka InfoPanel untuk titik tertentu */
  const handleOpenInfo = useCallback((pointId) => {
    setInfoPanelPointId(pointId);
    setIsInfoPanelOpen(true);
  }, []);

  /** Menutup InfoPanel */
  const handleCloseInfo = useCallback(() => {
    setIsInfoPanelOpen(false);
  }, []);

  /** Toggle visibilitas sidebar */
  const handleToggleSidebar = useCallback(() => {
    setIsSidebarVisible((prev) => !prev);
  }, []);

  /**
   * Toggle Mode VR.
   *
   * Saat VR Mode aktif:
   * - Semua UI overlay (sidebar, topbar, tombol) disembunyikan
   * - Layar HP bersih untuk dimasukkan ke VR Box / Google Cardboard
   * - Hanya tersisa tombol kecil untuk keluar dari VR mode
   *
   * CATATAN SENSOR (iOS):
   * Pada iOS 13+, akses sensor memerlukan user gesture:
   * DeviceOrientationEvent.requestPermission() harus dipanggil
   * dari event handler klik. Browser akan menampilkan dialog izin.
   */
  const handleToggleVR = useCallback(() => {
    setIsVRMode((prev) => {
      const newVRMode = !prev;

      if (newVRMode) {
        // Masuk VR mode — sembunyikan sidebar & tutup InfoPanel
        setIsSidebarVisible(false);
        setIsInfoPanelOpen(false);

        // Request fullscreen untuk pengalaman imersif
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen().catch(() => {
            // Gagal fullscreen — tidak fatal, lanjutkan saja
          });
        }

        /*
         * CATATAN iOS SENSOR PERMISSION:
         * Untuk mengaktifkan gyroscope di iOS Safari, uncomment kode di bawah:
         *
         * if (typeof DeviceOrientationEvent !== 'undefined'
         *     && typeof DeviceOrientationEvent.requestPermission === 'function') {
         *   DeviceOrientationEvent.requestPermission()
         *     .then((response) => {
         *       if (response === 'granted') {
         *         console.log('✅ Izin sensor giroskop diberikan');
         *       }
         *     })
         *     .catch(console.error);
         * }
         */
      } else {
        // Keluar VR mode — kembalikan sidebar
        setIsSidebarVisible(true);

        // Keluar dari fullscreen
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        }
      }

      return newVRMode;
    });
  }, []);

  // Dengarkan perubahan fullscreen dari luar (misal: user tekan Esc di fullscreen)
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && isVRMode) {
        setIsVRMode(false);
        setIsSidebarVisible(true);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [isVRMode]);

  // ===== Render =====
  return (
    <div id="app-root" className="relative w-full h-screen overflow-hidden bg-island-ocean-deep">
      {/*
        Layer 0: Iframe 3DVista — merender tur virtual sebagai background penuh.
        File tur virtual harus berada di: /public/virtual-tour-output/index.htm
      */}
      <TourViewer isVRMode={isVRMode} />

      {/*
        Layer 1: Top Bar — menampilkan lokasi aktif.
        Otomatis tersembunyi saat VR mode.
      */}
      <TopBar activePoint={activePoint} isVRMode={isVRMode} />

      {/*
        Layer 2: Sidebar Navigasi — daftar titik eksplorasi.
        Bisa di-toggle manual atau otomatis saat VR mode.
      */}
      <Sidebar
        points={explorationPoints}
        activePointId={activePointId}
        onSelectPoint={handleSelectPoint}
        onOpenInfo={handleOpenInfo}
        isVisible={isSidebarVisible}
        onToggle={handleToggleSidebar}
        isVRMode={isVRMode}
      />

      {/*
        Layer 3: Tombol Toggle VR Mode.
        Saat VR mode aktif, tombol berubah menjadi tombol "Keluar VR"
        di posisi tengah bawah layar.
      */}
      <VRToggle isVRMode={isVRMode} onToggle={handleToggleVR} />

      {/*
        Layer 3.5: MusicPlayer (Gamelan Bali).
        Mengontrol play/pause audio instrumen bali secara melayang di kiri bawah.
        Otomatis disembunyikan jika dalam Mode VR agar layar steril.
      */}
      <MusicPlayer isVRMode={isVRMode} />

      {/*
        Layer 4: InfoPanel — slide-in dari kanan.
        Menampilkan informasi edukasi/sejarah lokasi pulau.
      */}
      <InfoPanel
        isOpen={isInfoPanelOpen}
        onClose={handleCloseInfo}
        pointData={infoPanelPoint}
      />
    </div>
  );
}

export default App;
