/**
 * Data titik eksplorasi Pura (Tri Mandala).
 * Berisi 3 zona utama candi/pura di Bali sesuai filosofi kosmologi Hindu Bali.
 */

export const explorationPoints = [
  {
    id: 'nista-mandala',
    name: 'Nista Mandala (Jaba Sisi)',
    icon: '⛩️',
    category: 'Zona Terluar',
    tagColor: 'bg-blue-500/20 text-blue-300',
    description: 'Zona terluar pura yang berbatasan langsung dengan lingkungan luar. Berfungsi sebagai pintu masuk (kori) dan persiapan.',
    detailInfo: {
      title: 'Nista Mandala (Jaba Sisi)',
      subtitle: 'Zona Terluar & Pintu Masuk Pura',
      content: `Nista Mandala, atau sering disebut Jaba Sisi, adalah zona terluar dari struktur pura di Bali yang berbatasan langsung dengan dunia luar. Zona ini mewakili tingkat alam bawah (Bhurloka) dalam konsep kosmologi Hindu.

Area ini berfungsi sebagai pintu masuk utama (kori), tempat persiapan sebelum persembahyangan, area parkir, serta lokasi penyelenggaraan kegiatan sosial kemasyarakatan.

Di dalam zona ini terdapat bangunan umum seperti Wantilan (balai pertemuan adat) dan pelinggih Ratu Ngurah yang berfungsi sebagai penjaga batas luar pura secara spiritual.`,
      facts: [
        { icon: '🚪', label: 'Fungsi Utama', value: 'Pintu Masuk & Kori' },
        { icon: '🏠', label: 'Balai Sosial', value: 'Wantilan' },
        { icon: '🎴', label: 'Penjaga Batas', value: 'Pelinggih Ratu Ngurah' },
        { icon: '👥', label: 'Aktivitas', value: 'Persiapan & Sosial' },
      ],
    },
  },
  {
    id: 'madya-mandala',
    name: 'Madya Mandala (Jaba Tengah)',
    icon: '🏛️',
    category: 'Zona Tengah',
    tagColor: 'bg-amber-500/20 text-amber-300',
    description: 'Zona peralihan yang melambangkan dunia manusia. Berisi Bale Kulkul, Bale Pesandekan, dan Bale Gong.',
    detailInfo: {
      title: 'Madya Mandala (Jaba Tengah)',
      subtitle: 'Zona Peralihan & Dunia Manusia',
      content: `Madya Mandala, atau Jaba Tengah, merupakan zona pertengahan dalam struktur pura. Zona ini melambangkan dunia manusia (Bwah loka) tempat terjadinya interaksi, persiapan upacara, dan pementasan seni sakral.

Di area ini, umat mempersiapkan sarana upakara dan beristirahat sebelum memasuki kawasan inti pemujaan. 

Terdapat beberapa bangunan penting di zona ini:
1. Bale Kulkul: Menara tinggi tempat menggantungkan kulkul (kentongan kayu suci) untuk memanggil umat atau menandakan dimulainya upacara.
2. Bale Pesandekan: Tempat peristirahatan umat dan persiapan sesajen.
3. Bale Gong: Balai tempat meletakkan set gamelan yang mengiringi prosesi upacara adat.
4. Pewaregan: Dapur suci tempat menyiapkan hidangan suci prasadam/sesaji konsumsi upacara.`,
      facts: [
        { icon: '🔔', label: 'Menara Suci', value: 'Bale Kulkul' },
        { icon: '🛌', label: 'Rest Area', value: 'Bale Pesandekan' },
        { icon: '🎵', label: 'Gamelan', value: 'Bale Gong' },
        { icon: '🍳', label: 'Dapur Suci', value: 'Pewaregan' },
      ],
    },
  },
  {
    id: 'utama-mandala',
    name: 'Utama Mandala (Jeroan)',
    icon: '🛕',
    category: 'Zona Terdalam',
    tagColor: 'bg-emerald-500/20 text-emerald-300',
    description: 'Zona terdalam dan paling suci tempat para Dewa bersemayam. Hanya dimasuki umat berpakaian adat Bali untuk sembahyang.',
    detailInfo: {
      title: 'Utama Mandala (Jeroan)',
      subtitle: 'Zona Terdalam & Paling Suci (Nirwana)',
      content: `Utama Mandala, atau disebut Jeroan, adalah zona terdalam, paling suci, dan sakral dari kompleks pura. Area ini melambangkan Swah loka (dunia para dewa/tingkat tertinggi). 

Lantai di area Utama Mandala umumnya dibuat lebih tinggi dari zona lainnya. Untuk menjaga kesuciannya, area ini hanya boleh dimasuki oleh umat Hindu yang hendak bersembahyang dengan mengenakan pakaian adat Bali lengkap serta menjaga kesucian diri.

Di zona ini terdapat berbagai pelinggih (bangunan suci pemujaan):
1. Padmasana: Bangunan tertinggi tanpa atap di pojok timur laut pura, lambang stana Tuhan Yang Maha Esa (Sang Hyang Widhi Wasa).
2. Pelinggih Meru: Bangunan dengan atap bertingkat ganjil (tumpang) dari ijuk, lambang Gunung Mahameru tempat bersemayamnya para Dewa atau leluhur agung.
3. Bale Piasan & Bale Pasamuan: Tempat meletakkan sesaji dan stana sementara bagi para Dewa selama upacara keagamaan berlangsung.`,
      facts: [
        { icon: '✨', label: 'Pilar Utama', value: 'Padmasana' },
        { icon: '🗼', label: 'Atap Bertingkat', value: 'Pelinggih Meru' },
        { icon: '💐', label: 'Tempat Sesaji', value: 'Bale Piasan' },
        { icon: '🧘', label: 'Syarat Masuk', value: 'Pakaian Adat Bali' },
      ],
    },
  },
];
