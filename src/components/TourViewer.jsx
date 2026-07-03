import React from 'react';

/**
 * TourViewer — Komponen utama yang merender iframe 3DVista.
 *
 * ============================================================================
 * CATATAN PENTING — KEAMANAN & SENSOR
 * ============================================================================
 * 1. HTTPS WAJIB: Browser modern memblokir akses ke sensor (gyroscope,
 *    accelerometer, magnetometer) pada halaman non-HTTPS.
 *    - Chrome: Memblokir DeviceOrientationEvent & DeviceMotionEvent
 *    - Safari iOS: Memerlukan HTTPS + user gesture untuk izin sensor
 *    - Firefox: Memblokir sensor pada konteks non-secure
 *
 * 2. PERMISSION POLICY: Atribut `allow` pada iframe HARUS menyertakan
 *    permission untuk xr-spatial-tracking, gyroscope, accelerometer,
 *    dan magnetometer agar fitur VR/WebXR di 3DVista berfungsi.
 *
 * 3. iOS SAFARI: Pengguna perlu mengetuk tombol "Enter VR" atau serupa
 *    yang memicu DeviceOrientationEvent.requestPermission() sebagai
 *    user gesture. Ini adalah pembatasan keamanan Apple.
 *
 * 4. SAME-ORIGIN: File 3DVista harus disajikan dari origin yang sama
 *    (bukan CDN terpisah) untuk menghindari masalah CORS.
 * ============================================================================
 *
 * @param {Object} props
 * @param {boolean} props.isVRMode - Apakah sedang dalam mode VR
 */
const TourViewer = ({ isVRMode }) => {
  return (
    <div className="fixed inset-0 w-full h-screen z-0">
      {/*
        Path iframe mengarah ke folder hasil ekspor 3DVista di /public.
        File 3DVista yang di-publish harus diletakkan di:
        /public/virtual-tour-output/index.htm

        Catatan: Folder "virtual tour output" di dalam /public sudah berisi
        file index.htm dari ekspor 3DVista.
        Sesuaikan path jika nama folder/file berbeda.
      */}
      <iframe
        id="tour-viewer-iframe"
        src="/virtual tour output/index.htm"
        title="Eksplorasi Pulau Virtual — Tur 360° Interaktif"
        className="w-full h-full"
        style={{
          border: 'none',        // Seamless — hilangkan border iframe
          display: 'block',      // Hilangkan gap bawaan inline element
        }}
        /*
         * PERMISSION ATTRIBUTES — WAJIB untuk VR & Sensor
         * - fullscreen: Izinkan mode layar penuh
         * - xr-spatial-tracking: Izinkan WebXR untuk VR stereoskopik
         * - gyroscope: Izinkan akses giroskop HP
         * - accelerometer: Izinkan akses akselerometer HP
         * - magnetometer: Izinkan akses kompas digital HP
         */
        allow="fullscreen; xr-spatial-tracking; gyroscope; accelerometer; magnetometer"
        allowFullScreen
        /*
         * Referrer policy ketat untuk keamanan.
         * Loading lazy agar tidak membebani initial load jika konten berat.
         */
        referrerPolicy="strict-origin-when-cross-origin"
      />

      {/* Overlay gradient halus di atas iframe — tersembunyi saat VR mode */}
      {!isVRMode && (
        <div
          className="absolute inset-0 pointer-events-none z-[1] transition-opacity duration-500"
          style={{
            background: `
              linear-gradient(to right, rgba(8, 47, 73, 0.4) 0%, transparent 30%),
              linear-gradient(to bottom, rgba(8, 47, 73, 0.2) 0%, transparent 15%),
              linear-gradient(to top, rgba(8, 47, 73, 0.15) 0%, transparent 10%)
            `,
          }}
        />
      )}
    </div>
  );
};

export default TourViewer;
