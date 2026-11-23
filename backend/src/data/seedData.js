// Berisi 26 Resep Praktis, Kategori, Alat Masak, Bahan, dan Substitusi

export const categories = [
  {
    id: "sarapan",
    name: "Sarapan",
    slug: "sarapan",
    description: "Menu pagi cepat, praktis, dan berenergi untuk mengawali hari.",
    icon: "Coffee"
  },
  {
    id: "makan-siang",
    name: "Makan Siang",
    slug: "makan-siang",
    description: "Hidangan lezat, mengenyangkan, dan pas untuk mengisi tenaga tengah hari.",
    icon: "Utensils"
  },
  {
    id: "makan-malam",
    name: "Makan Malam",
    slug: "makan-malam",
    description: "Menu santap malam yang hangat, nyaman, dan menenangkan.",
    icon: "Moon"
  },
  {
    id: "camilan",
    name: "Camilan",
    slug: "camilan",
    description: "Camilan gurih dan renyah untuk teman nugas atau bersantai.",
    icon: "Cookie"
  },
  {
    id: "minuman",
    name: "Minuman",
    slug: "minuman",
    description: "Minuman segar, pelepas dahaga, dan mudah diracik sendiri.",
    icon: "GlassWater"
  },
  {
    id: "dessert",
    name: "Dessert",
    slug: "dessert",
    description: "Hidangan penutup manis pencuci mulut yang memanjakan lidah.",
    icon: "Cake"
  },
  {
    id: "anak-kos",
    name: "Masakan Anak Kos",
    slug: "anak-kos",
    description: "Menu super hemat, minim alat, bahan minimarket/warung, dan anti ribet.",
    icon: "Home"
  }
];

export const tools = [
  {
    id: "rice-cooker",
    name: "Rice Cooker",
    slug: "rice-cooker",
    icon: "CookingPot",
    description: "Penanak nasi serbaguna yang bisa untuk menumis, mengukus, dan merebus."
  },
  {
    id: "wajan",
    name: "Wajan / Kuali",
    slug: "wajan",
    icon: "Flame",
    description: "Wajan cekung standar untuk menumis cepat atau menggoreng dalam minyak banyak."
  },
  {
    id: "teflon",
    name: "Teflon / Wajan Datar",
    slug: "teflon",
    icon: "CircleDot",
    description: "Wajan anti lengket untuk telur dadar, roti panggang, dan tumisan minim minyak."
  },
  {
    id: "panci",
    name: "Panci Rebus",
    slug: "panci",
    icon: "Soup",
    description: "Panci tinggi untuk merebus sayur, sup, mie, dan kuah-kuahan."
  },
  {
    id: "kompor",
    name: "Kompor Gas / Listrik",
    slug: "kompor",
    icon: "FlameKindling",
    description: "Sumber panas utama memasak di dapur atau kosan."
  },
  {
    id: "blender",
    name: "Blender",
    slug: "blender",
    icon: "Sparkles",
    description: "Pencampur dan penghalus bumbu atau buah-buahan secara cepat."
  },
  {
    id: "microwave",
    name: "Microwave",
    slug: "microwave",
    icon: "Tv",
    description: "Penghangat dan pemanggang makanan instan dengan gelombang mikro."
  },
  {
    id: "air-fryer",
    name: "Air Fryer",
    slug: "air-fryer",
    icon: "Wind",
    description: "Penggoreng tanpa minyak untuk makanan renyah dan lebih sehat."
  },
  {
    id: "kukusan",
    name: "Kukusan / Steamer",
    slug: "kukusan",
    icon: "CloudFog",
    description: "Pengukus makanan untuk menjaga kelembapan dan nutrisi bahan makanan."
  }
];

export const substitutions = [
  {
    id: 1,
    original_ingredient: "Santan",
    substitute_ingredient: "Susu Evaporasi atau Susu UHT + Sedikit Air",
    reason: "Menghasilkan tekstur kuah gurih dan creamy tanpa risiko santan pecah.",
    taste_change: "Rasa sedikit lebih manis dan creamy, namun aroma khas kelapa berkurang.",
    texture_change: "Kuah lebih ringan dan tidak terlalu kental berlemak.",
    suitable_for: "Sup, soto, gulai ringan, dan minuman."
  },
  {
    id: 2,
    original_ingredient: "Minyak Goreng",
    substitute_ingredient: "Margarin atau Mentega Cair",
    reason: "Bisa digunakan untuk menumis bahan dan menambah aroma harum gurih.",
    taste_change: "Aroma tumisan jadi lebih wangi gurih gurih mentega.",
    texture_change: "Tidak ada perbedaan tekstur signifikan pada hasil tumisan.",
    suitable_for: "Tumisan, telur dadar, nasi goreng."
  },
  {
    id: 3,
    original_ingredient: "Kecap Manis",
    substitute_ingredient: "Kecap Asin + Gula Merah / Gula Pasir Larut",
    reason: "Memberikan perpaduan rasa asin kedelai dan manis karamel yang serupa.",
    taste_change: "Rasa manis sedikit lebih tajam dan kurang beraroma rempah kecap manis asli.",
    texture_change: "Lebih cair dibandingkan kecap manis kental botolan.",
    suitable_for: "Nasi goreng, tempe orek, ayam kecap."
  },
  {
    id: 4,
    original_ingredient: "Tepung Maizena",
    substitute_ingredient: "Tepung Tapioka atau Tepung Terigu yang Dilarutkan",
    reason: "Sebagai agen pengental kuah capcay atau saus.",
    taste_change: "Rasa netral hampir sama, tepung terigu sedikit lebih keruh warnanya.",
    texture_change: "Tapioka lebih kenyal dan glossy, terigu lebih pekat padat.",
    suitable_for: "Capcay, saus kental, sup kental."
  },
  {
    id: 5,
    original_ingredient: "Saus Tiram",
    substitute_ingredient: "Kecap Asin + Sejumput Gula + Kaldu Bubuk Jamur",
    reason: "Meniru sensasi umami dan asin gurih khas saus tiram untuk tumisan.",
    taste_change: "Kurang aroma khas tiram/seafood, tapi tetap gurih pekat.",
    texture_change: "Sedikit lebih cair dibanding saus tiram botolan.",
    suitable_for: "Tumis kangkung, capcay, nasi goreng."
  },
  {
    id: 6,
    original_ingredient: "Bawang Bombay",
    substitute_ingredient: "Bawang Merah Tambahan (2-3 siung)",
    reason: "Keluarga allium yang memberikan aroma harum saat ditumis.",
    taste_change: "Rasa manis karamel bombay berkurang, aroma bawang merah lebih tajam khas nusantara.",
    texture_change: "Irisan lebih kecil dan gampang layu dibanding bombay.",
    suitable_for: "Semua tumisan, nasi goreng, sup."
  },
  {
    id: 7,
    original_ingredient: "Daging Ayam",
    substitute_ingredient: "Tahu Putih / Jamur Tiram Suwir",
    reason: "Sumber protein nabati ramah kantong kos-kosan dengan daya serap bumbu luar biasa.",
    taste_change: "Rasa lebih ringan dan segar, menyerap bumbu marinasi dengan sangat baik.",
    texture_change: "Tekstur lembut atau kenyal mirip serat daging ayam suwir.",
    suitable_for: "Nasi goreng, mie nyemek, sup, tumisan."
  },
  {
    id: 8,
    original_ingredient: "Telur Ayam",
    substitute_ingredient: "Tahu Sutra Hancur (Scrambled Tofu)",
    reason: "Alternatif protein nabati yang bisa dibumbui mirip tekstur orak-arik telur.",
    taste_change: "Rasa lebih tawar, perlu tambahan kunyit bubuk dan kaldu bubuk untuk warna dan rasa.",
    texture_change: "Lembut dan basah menyerupai orak-arik telur setengah matang.",
    suitable_for: "Nasi goreng, tumisan sayur."
  },
  {
    id: 9,
    original_ingredient: "Cabai Rawit Merah",
    substitute_ingredient: "Bubuk Cabai Kering atau Saus Sambal Botolan",
    reason: "Memberikan sensasi pedas instan ketika cabai segar di kulkas habis.",
    taste_change: "Sensasi pedas tetap ada, namun minus aroma segar cabai petik.",
    texture_change: "Tidak ada gigitan renyah potongan cabai segar.",
    suitable_for: "Seblak, mie nyemek, sambal kecap."
  },
  {
    id: 10,
    original_ingredient: "Keju Cheddar",
    substitute_ingredient: "Susu Bubuk Gurih atau Saus Mayones Gurih",
    reason: "Memberikan sentuhan rasa creamy gurih pada makanan panggangan.",
    taste_change: "Gurih creamy tetap terasa nikmat walau tanpa lelehan khas keju padat.",
    texture_change: "Tidak ada sensasi elastis / parutan keju renyah.",
    suitable_for: "Roti bakar, makaroni telur, pancake."
  }
];

export const recipes = [
  {
    id: "rec-01",
    name: "Nasi Goreng Telur Kampung",
    slug: "nasi-goreng-telur-kampung",
    description: "Nasi goreng sederhana ala anak kos dengan aroma harum bawang merah, telur orak-arik, dan kecap manis gurih. Cepat, murah, dan pasti kenyang.",
    image_url: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
    category_id: "anak-kos",
    cooking_time: 12,
    preparation_time: 5,
    estimated_cost: 8000,
    cost_per_serving: 8000,
    servings: 1,
    difficulty: "Mudah",
    is_popular: true,
    is_kos_friendly: true,
    tags: ["sarapan", "anak-kos", "hemat", "cepat"],
    tips: "Gunakan nasi sisa kemarin malam yang sudah dingin atau dimasukkan kulkas agar butiran nasi tidak lembek saat digoreng.",
    tools: ["wajan", "kompor"],
    ingredients: [
      { name: "Nasi Putih (dingin)", quantity: 1, unit: "piring", is_optional: false, notes: "sekitar 200 gram" },
      { name: "Telur Ayam", quantity: 1, unit: "butir", is_optional: false, notes: "kocok lepas" },
      { name: "Bawang Merah", quantity: 3, unit: "siung", is_optional: false, notes: "iris tipis" },
      { name: "Bawang Putih", quantity: 2, unit: "siung", is_optional: false, notes: "cincang halus" },
      { name: "Cabai Rawit", quantity: 3, unit: "buah", is_optional: true, notes: "sesuai selera pedas" },
      { name: "Kecap Manis", quantity: 1.5, unit: "sdm", is_optional: false, notes: "sesuai selera warna" },
      { name: "Kecap Asin / Garam", quantity: 0.5, unit: "sdt", is_optional: false, notes: "" },
      { name: "Minyak Goreng", quantity: 2, unit: "sdm", is_optional: false, notes: "untuk menumis" }
    ],
    instructions: [
      {
        step_number: 1,
        title: "Panaskan Minyak dan Orak-arik Telur",
        instruction: "Pertama, panaskan dua sendok makan minyak di wajan menggunakan api sedang. Setelah wajan mulai hangat, tuangkan telur kocok dan orak-arik cepat sampai matang berbutir, lalu pinggirkan sebentar ke tepi wajan.",
        duration_minutes: 2,
        tips: "Jangan biarkan telur terlalu kering agar tetap lembut dan menyatu dengan nasi nanti."
      },
      {
        step_number: 2,
        title: "Tumis Bumbu Aromatik",
        instruction: "Kedua, masukkan irisan bawang merah, bawang putih cincang, dan cabai rawit ke bagian wajan yang berminyak. Tumis selama sekitar satu menit hingga aromanya wangi semerbak dan warnanya mulai sedikit kecokelatan.",
        duration_minutes: 2,
        tips: "Gunakan api sedang cenderung kecil agar bawang putih tidak mudah gosong dan pahit."
      },
      {
        step_number: 3,
        title: "Campur Nasi dan Masukkan Bumbu",
        instruction: "Ketiga, masukkan nasi putih dingin ke dalam wajan. Aduk rata bersama telur dan tumisan bawang. Tambahkan satu setengah sendok makan kecap manis, setengah sendok teh garam atau kecap asin, dan sedikit kaldu bubuk bila ada.",
        duration_minutes: 3,
        tips: "Tekan-tekan gumpalan nasi dengan spatula agar semua bumbu kecap meresap rata ke seluruh butiran."
      },
      {
        step_number: 4,
        title: "Goreng dengan Api Besar dan Angkat",
        instruction: "Terakhir, besarkan sedikit api kompor, aduk cepat selama dua menit sampai nasi berasap tipis dan keluar aroma harum gurih khas nasi goreng gerobakan. Matikan api dan sajikan hangat di piring kesayanganmu.",
        duration_minutes: 2,
        tips: "Api besar di akhir proses memasak memberikan efek aroma smokey sedap!"
      }
    ]
  },
  {
    id: "rec-02",
    name: "Telur Dadar Padang Gurih Tebal",
    slug: "telur-dadar-padang-gurih-tebal",
    description: "Telur dadar tebal, garing di luar dan lembut di dalam dengan sensasi daun bawang, cabai, dan sedikit tepung beras agar kokoh mantap.",
    image_url: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
    category_id: "makan-siang",
    cooking_time: 15,
    preparation_time: 5,
    estimated_cost: 9000,
    cost_per_serving: 4500,
    servings: 2,
    difficulty: "Mudah",
    is_popular: true,
    is_kos_friendly: true,
    tags: ["makan-siang", "padang", "telur", "hemat"],
    tips: "Gunakan minyak yang agak banyak dan wajan kecil yang cekung agar telur bisa mengembang tebal sempurna.",
    tools: ["wajan", "kompor"],
    ingredients: [
      { name: "Telur Ayam / Bebek", quantity: 3, unit: "butir", is_optional: false, notes: "bisa campur bebek" },
      { name: "Daun Bawang", quantity: 2, unit: "batang", is_optional: false, notes: "iris halus" },
      { name: "Bawang Merah", quantity: 4, unit: "siung", is_optional: false, notes: "iris tipis" },
      { name: "Cabai Merah Keriting", quantity: 3, unit: "buah", is_optional: false, notes: "cincang halus" },
      { name: "Tepung Beras / Terigu", quantity: 1.5, unit: "sdm", is_optional: false, notes: "larutkan dgn 2 sdm air" },
      { name: "Kaldu Bubuk & Garam", quantity: 1, unit: "sdt", is_optional: false, notes: "" },
      { name: "Minyak Goreng", quantity: 50, unit: "ml", is_optional: false, notes: "untuk menggoreng" }
    ],
    instructions: [
      {
        step_number: 1,
        title: "Kocok Telur dan Bumbu",
        instruction: "Pertama, siapkan mangkuk sedang. Pecahkan tiga butir telur, masukkan irisan daun bawang, bawang merah, cabai cincang, larutan tepung beras, garam, dan kaldu bubuk. Kocok lepas memakai garpu sampai sedikit berbusa dan tercampur rata.",
        duration_minutes: 3,
        tips: "Tepung beras berfungsi mengikat serat telur agar tebal kokoh dan pinggirannya renyah kriuk."
      },
      {
        step_number: 2,
        title: "Panaskan Minyak dalam Wajan",
        instruction: "Kedua, tuangkan minyak ke wajan dan panaskan dengan api sedang hingga minyak benar-benar panas merata.",
        duration_minutes: 2,
        tips: "Minyak harus panas saat telur dituangkan agar langsung mekar bersarang."
      },
      {
        step_number: 3,
        title: "Goreng Telur dengan Api Kecil",
        instruction: "Ketiga, tuang seluruh adonan telur ke dalam wajan. Segera kecilkan api ke level sedang-kecil. Tutup wajan sejenak agar bagian dalam telur cepat matang merata tanpa membuat bagian bawahnya lekas hangus.",
        duration_minutes: 5,
        tips: "Goyang wajan sesekali agar telur tidak menempel di dasar."
      },
      {
        step_number: 4,
        title: "Balik Telur dan Tiriskan",
        instruction: "Keempat, setelah bagian bawahnya kecokelatan dan kokoh, balik telur dengan hati-hati menggunakan spatula lebar. Goreng sisi sebaliknya selama dua hingga tiga menit sampai garing keemasan. Angkat, tiriskan, dan potong menjadi empat bagian.",
        duration_minutes: 3,
        tips: "Jika takut telur hancur saat dibalik, gunakan bantuan piring datar untuk membalik."
      }
    ]
  },
  {
    id: "rec-03",
    name: "Tempe Orek Manis Gurih Basah",
    slug: "tempe-orek-manis-gurih-basah",
    description: "Lauk andalan warteg dan anak kos. Potongan tempe renyah dengan balutan saus kecap karamel yang gurih pedas manis.",
    image_url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    category_id: "anak-kos",
    cooking_time: 18,
    preparation_time: 5,
    estimated_cost: 7000,
    cost_per_serving: 3500,
    servings: 2,
    difficulty: "Mudah",
    is_popular: true,
    is_kos_friendly: true,
    tags: ["anak-kos", "warteg", "tempe", "vegetarian", "murah"],
    tips: "Potong tempe seukuran korek api agar bumbu kecap cepat meresap dan matang serempak.",
    tools: ["wajan", "kompor"],
    ingredients: [
      { name: "Tempe Kedelai", quantity: 1, unit: "papan", is_optional: false, notes: "potong korek api" },
      { name: "Bawang Merah", quantity: 4, unit: "siung", is_optional: false, notes: "iris tipis" },
      { name: "Bawang Putih", quantity: 2, unit: "siung", is_optional: false, notes: "iris tipis" },
      { name: "Cabai Merah & Hijau", quantity: 3, unit: "buah", is_optional: false, notes: "iris serong" },
      { name: "Kecap Manis", quantity: 3, unit: "sdm", is_optional: false, notes: "pilih yang kental" },
      { name: "Gula Merah / Pasir", quantity: 1, unit: "sdt", is_optional: false, notes: "" },
      { name: "Air Bersih", quantity: 50, unit: "ml", is_optional: false, notes: "untuk mematangkan kuah" },
      { name: "Minyak Goreng", quantity: 3, unit: "sdm", is_optional: false, notes: "untuk menumis" }
    ],
    instructions: [
      {
        step_number: 1,
        title: "Goreng Tempe Setengah Matang",
        instruction: "Pertama, panaskan minyak di wajan. Goreng potongan tempe sampai permukaannya setengah kering berwarna kekuningan, sekitar empat sampai lima menit. Angkat dan sisihkan.",
        duration_minutes: 5,
        tips: "Jangan goreng terlalu garing jika menyukai tekstur tempe orek yang basah dan empuk juicy."
      },
      {
        step_number: 2,
        title: "Tumis Bumbu Iris",
        instruction: "Kedua, gunakan sisa minyak sekitar dua sendok makan di wajan yang sama. Masukkan bawang merah, bawang putih, dan cabai iris. Tumis sampai aromanya wangi dan layu.",
        duration_minutes: 2,
        tips: "Tumis dengan api sedang agar bawang layu manis tanpa bau langu."
      },
      {
        step_number: 3,
        title: "Bumbui dan Buat Karamel",
        instruction: "Ketiga, tuangkan tiga sendok makan kecap manis, gula merah, garam, kaldu bubuk, dan lima puluh mililiter air. Aduk-aduk sampai kuah mulai mendidih dan mengental berbusa.",
        duration_minutes: 2,
        tips: "Kombinasi air dan kecap mendidih akan membentuk saus karamel legit yang mengilap."
      },
      {
        step_number: 4,
        title: "Masukkan Tempe dan Aduk Cepat",
        instruction: "Keempat, masukkan tempe goreng ke dalam wajan. Aduk cepat dengan spatula hingga seluruh permukaan tempe terselimuti saus kecap pekat dan air menyusut. Matikan api, siap disajikan dengan nasi hangat.",
        duration_minutes: 3,
        tips: "Lauk ini tahan hingga dua hari jika disimpan di wadah kedap udara!"
      }
    ]
  },
  {
    id: "rec-04",
    name: "Tahu Kecap Pedas Manis Cepat Saji",
    slug: "tahu-kecap-pedas-manis",
    description: "Tahu goreng lembut yang disiram saus kecap pedas gurih kaya irisan cabai dan bawang. Cocok untuk makan malam darurat tanggal tua.",
    image_url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    category_id: "makan-malam",
    cooking_time: 14,
    preparation_time: 4,
    estimated_cost: 6000,
    cost_per_serving: 3000,
    servings: 2,
    difficulty: "Mudah",
    is_popular: false,
    is_kos_friendly: true,
    tags: ["makan-malam", "anak-kos", "tahu", "hemat", "vegetarian"],
    tips: "Tepuk-tepuk tahu dengan tisu dapur sebelum digoreng agar minyak tidak memercik ke mana-mana.",
    tools: ["wajan", "kompor"],
    ingredients: [
      { name: "Tahu Putih / Kuning", quantity: 5, unit: "kotak", is_optional: false, notes: "potong dadu sedang" },
      { name: "Kecap Manis", quantity: 3, unit: "sdm", is_optional: false, notes: "" },
      { name: "Bawang Putih", quantity: 2, unit: "siung", is_optional: false, notes: "cincang halus" },
      { name: "Bawang Merah", quantity: 3, unit: "siung", is_optional: false, notes: "iris tipis" },
      { name: "Cabai Rawit Merah", quantity: 5, unit: "buah", is_optional: false, notes: "iris tipis" },
      { name: "Air Asam Jawa / Jeruk Limau", quantity: 1, unit: "sdt", is_optional: true, notes: "pemberi aksen segar" },
      { name: "Minyak Goreng", quantity: 3, unit: "sdm", is_optional: false, notes: "" }
    ],
    instructions: [
      {
        step_number: 1,
        title: "Goreng Potongan Tahu",
        instruction: "Pertama, panaskan minyak secukupnya di wajan. Masukkan potongan tahu dan goreng hingga berkulit tipis keemasan, sekitar empat sampai lima menit. Angkat dan tiriskan di piring saji.",
        duration_minutes: 5,
        tips: "Jangan goreng tahu terlalu kering agar tekstur dalamnya tetap lembut dan empuk."
      },
      {
        step_number: 2,
        title: "Tumis Bumbu Pedas",
        instruction: "Kedua, kurangi minyak wajan hingga tersisa satu sendok makan. Tumis bawang putih, bawang merah, dan irisan cabai rawit selama satu hingga dua menit sampai beraroma harum pedas.",
        duration_minutes: 2,
        tips: "Hati-hati uap cabai yang menyengat, tumis dengan api sedang."
      },
      {
        step_number: 3,
        title: "Bikin Kuah Siram Kecap",
        instruction: "Ketiga, tambahkan tiga sendok makan kecap manis, sedikit garam, kaldu bubuk, dan tiga puluh mililiter air. Masak sebentar sampai meletup-letup dan saus mengilap harum.",
        duration_minutes: 2,
        tips: "Beri perasan jeruk limau bila ingin sensasi asam manis segar khas sambal kecap."
      },
      {
        step_number: 4,
        title: "Siramkan ke Tahu",
        instruction: "Terakhir, siramkan saus kecap pedas panas ini langsung ke atas tahu goreng yang sudah ditata di piring. Sajikan segera selagi hangat.",
        duration_minutes: 1,
        tips: "Paling nikmat disantap dengan nasi putih hangat yang masih mengepul!"
      }
    ]
  },
  {
    id: "rec-05",
    name: "Tumis Kangkung Terasi Gurih Segar",
    slug: "tumis-kangkung-terasi-gurih",
    description: "Kangkung segar ditumis kilat dengan bumbu terasi harum, cabai merah, dan sentuhan bawang putih gurih. Hijau segar dan kaya serat.",
    image_url: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    category_id: "makan-siang",
    cooking_time: 10,
    preparation_time: 5,
    estimated_cost: 6500,
    cost_per_serving: 3250,
    servings: 2,
    difficulty: "Mudah",
    is_popular: true,
    is_kos_friendly: true,
    tags: ["makan-siang", "sayuran", "sehat", "terasi", "cepat"],
    tips: "Tumis kangkung dengan api paling besar dan dalam waktu singkat agar warna daun tetap hijau cerah dan batangnya tetap renyah.",
    tools: ["wajan", "kompor"],
    ingredients: [
      { name: "Kangkung Segar", quantity: 1, unit: "ikat", is_optional: false, notes: "siangi dan cuci bersih" },
      { name: "Bawang Merah", quantity: 3, unit: "siung", is_optional: false, notes: "iris tipis" },
      { name: "Bawang Putih", quantity: 2, unit: "siung", is_optional: false, notes: "iris tipis" },
      { name: "Cabai Merah Keriting", quantity: 3, unit: "buah", is_optional: false, notes: "iris serong" },
      { name: "Terasi Bakar / Matang", quantity: 0.5, unit: "sdt", is_optional: false, notes: "haluskan" },
      { name: "Saus Tiram", quantity: 1, unit: "sdm", is_optional: true, notes: "opsional" },
      { name: "Air Bersih", quantity: 30, unit: "ml", is_optional: false, notes: "" },
      { name: "Minyak Goreng", quantity: 2, unit: "sdm", is_optional: false, notes: "" }
    ],
    instructions: [
      {
        step_number: 1,
        title: "Tumis Bumbu dan Terasi",
        instruction: "Pertama, panaskan dua sendok makan minyak di wajan dengan api sedang-tinggi. Masukkan bawang merah, bawang putih, cabai iris, dan terasi yang sudah dihaluskan. Tumis cepat sampai terasi larut dan mengeluarkan aroma khas yang sedap.",
        duration_minutes: 2,
        tips: "Pastikan terasi matang agar aromanya tidak langu di lidah."
      },
      {
        step_number: 2,
        title: "Masukkan Batang Kangkung Terlebih Dahulu",
        instruction: "Kedua, masukkan bagian batang kangkung terlebih dahulu, aduk selama tiga puluh detik karena batang butuh waktu sedikit lebih lama matang dibandingkan daun.",
        duration_minutes: 1,
        tips: "Memisahkan batang dan daun menjaga kerenyahan optimal."
      },
      {
        step_number: 3,
        title: "Masukkan Daun Kangkung dan Bumbu",
        instruction: "Ketiga, masukkan seluruh daun kangkung, beri saus tiram, garam, sejumput gula pasir, dan tiga puluh mililiter air. Aduk bolak-balik dengan api besar selama satu hingga dua menit sampai daun layu namun tetap hijau.",
        duration_minutes: 2,
        tips: "Jangan terlalu lama memasak agar kangkung tidak menghitam atau lembek."
      },
      {
        step_number: 4,
        title: "Angkat dan Sajikan Segera",
        instruction: "Keempat, cicipi kuahnya, jika rasa asin gurih sudah pas, segera matikan kompor dan tuang ke piring saji.",
        duration_minutes: 1,
        tips: "Sajikan langsung selagi panas berasap agar sensasi renyahnya maksimal."
      }
    ]
  },
  {
    id: "rec-06",
    name: "Mie Nyemek Telur Sayur Mantap",
    slug: "mie-nyemek-telur-sayur",
    description: "Mie instan goreng yang disulap menjadi hidangan nyemek kuah kental gurih ala warkop dengan telur ceplok orak-arik dan sawi hijau.",
    image_url: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    category_id: "anak-kos",
    cooking_time: 12,
    preparation_time: 3,
    estimated_cost: 7500,
    cost_per_serving: 7500,
    servings: 1,
    difficulty: "Mudah",
    is_popular: true,
    is_kos_friendly: true,
    tags: ["makan-malam", "anak-kos", "mie-instan", "cepat", "favorit"],
    tips: "Kuah nyemek harus pas, tidak terlalu banyak seperti mie kuah dan tidak kering seperti mie goreng.",
    tools: ["wajan", "panci", "kompor"],
    ingredients: [
      { name: "Mie Goreng Instan", quantity: 1, unit: "bungkus", is_optional: false, notes: "beserta bumbu bawaan" },
      { name: "Telur Ayam", quantity: 1, unit: "butir", is_optional: false, notes: "" },
      { name: "Sawi Hijau / Kol", quantity: 3, unit: "lembar", is_optional: false, notes: "potong-potong" },
      { name: "Bawang Merah", quantity: 2, unit: "siung", is_optional: false, notes: "iris tipis" },
      { name: "Bawang Putih", quantity: 1, unit: "siung", is_optional: false, notes: "cincang" },
      { name: "Cabai Rawit", quantity: 4, unit: "buah", is_optional: false, notes: "iris serong" },
      { name: "Kecap Manis & Saus Sambal", quantity: 1, unit: "sdm", is_optional: false, notes: "tambahan racikan warkop" },
      { name: "Air Bersih", quantity: 200, unit: "ml", is_optional: false, notes: "untuk kuah nyemek" }
    ],
    instructions: [
      {
        step_number: 1,
        title: "Tumis Bumbu Iris dan Telur",
        instruction: "Pertama, panaskan satu sendok makan minyak di wajan atau panci kecil. Tumis bawang merah, bawang putih, dan cabai rawit sampai harum. Masukkan telur, orak-arik kasar hingga setengah matang.",
        duration_minutes: 2,
        tips: "Biarkan ada gumpalan telur yang agak besar agar kuah mie makin gurih berserat."
      },
      {
        step_number: 2,
        title: "Tuang Air dan Masukkan Mie",
        instruction: "Kedua, tuangkan dua ratus mililiter air ke dalam wajan. Tunggu hingga air mulai mendidih, lalu masukkan keping mie instan dan potongan sayur sawi.",
        duration_minutes: 3,
        tips: "Jangan patahkan mie jika menyukai tekstur mie panjang yang kenyal."
      },
      {
        step_number: 3,
        title: "Bumbui Ala Warkop",
        instruction: "Ketiga, masukkan seluruh bumbu bawaan mie instan, tambahkan satu sendok makan kecap manis ekstra dan satu sendok makan saus sambal botolan. Aduk merata sampai mie matang kenyal dan kuah mengental.",
        duration_minutes: 2,
        tips: "Penambahan sedikit kecap manis dan saus sambal membuat kuahnya legit kental ala warkop khas."
      },
      {
        step_number: 4,
        title: "Sajikan Panas Berasap",
        instruction: "Keempat, setelah kuah menyusut menjadi nyemek berselera, matikan api dan tuang ke dalam mangkuk. Taburi bawang goreng bawaan mie.",
        duration_minutes: 1,
        tips: "Santap selagi masih panas mengepul ditemani kerupuk!"
      }
    ]
  },
  {
    id: "rec-07",
    name: "Nasi Liwet Teri Rice Cooker Praktis",
    slug: "nasi-liwet-teri-rice-cooker",
    description: "Satu wadah langsung jadi! Nasi liwet wangi rempah sereh dan daun salam dengan taburan teri asin gurih dan cabai utuh tanpa perlu kompor.",
    image_url: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
    category_id: "makan-siang",
    cooking_time: 30,
    preparation_time: 8,
    estimated_cost: 16000,
    cost_per_serving: 4000,
    servings: 4,
    difficulty: "Mudah",
    is_popular: true,
    is_kos_friendly: true,
    tags: ["makan-siang", "rice-cooker", "praktis", "hemat", "tradisional"],
    tips: "Goreng teri asin sebentar sebelum dimasukkan ke beras agar aromanya makin keluar dan tidak amis.",
    tools: ["rice-cooker"],
    ingredients: [
      { name: "Beras Putih", quantity: 3, unit: "cup", is_optional: false, notes: "cuci bersih" },
      { name: "Teri Asin / Teri Medan", quantity: 50, unit: "gram", is_optional: false, notes: "cuci dan goreng sebentar" },
      { name: "Bawang Merah", quantity: 5, unit: "siung", is_optional: false, notes: "iris tipis" },
      { name: "Bawang Putih", quantity: 3, unit: "siung", is_optional: false, notes: "iris tipis" },
      { name: "Serai", quantity: 2, unit: "batang", is_optional: false, notes: "memarkan" },
      { name: "Daun Salam", quantity: 3, unit: "lembar", is_optional: false, notes: "" },
      { name: "Cabai Rawit Utuh", quantity: 8, unit: "buah", is_optional: false, notes: "cuci bersih" },
      { name: "Garam & Kaldu Ayam", quantity: 1, unit: "sdt", is_optional: false, notes: "" },
      { name: "Air Bersih", quantity: 600, unit: "ml", is_optional: false, notes: "sesuai takaran masak beras biasa" }
    ],
    instructions: [
      {
        step_number: 1,
        title: "Cuci Beras dan Masukkan ke Rice Cooker",
        instruction: "Pertama, cuci bersih tiga cup beras di dalam panci rice cooker, lalu tambahkan air bersih sesuai batas takaran masak nasi harianmu.",
        duration_minutes: 3,
        tips: "Air jangan berlebihan agar nasi liwet pulen dan tidak lembek."
      },
      {
        step_number: 2,
        title: "Masukkan Bumbu Aromatik dan Bumbu",
        instruction: "Kedua, masukkan irisan bawang merah, bawang putih, serai yang dimemarkan, daun salam, cabai rawit utuh, satu sendok teh garam, dan satu sendok teh kaldu ayam ke dalam beras. Aduk rata dengan centong.",
        duration_minutes: 2,
        tips: "Cabai dibiarkan utuh agar aromanya sedap tanpa membuat nasi langsung terasa pedas bagi yang tidak kuat pedas."
      },
      {
        step_number: 3,
        title: "Taburkan Teri dan Masak di Rice Cooker",
        instruction: "Ketiga, taburkan sebagian teri asin goreng di atas permukaan beras. Tutup rice cooker dan tekan tombol 'Cook' atau masak seperti memasak nasi biasa.",
        duration_minutes: 25,
        tips: "Biarkan rice cooker bekerja otomatis hingga tombol berpindah ke 'Warm'."
      },
      {
        step_number: 4,
        title: "Aduk Rata dan Diamkan",
        instruction: "Keempat, setelah matang dan berpindah ke Warm, buka tutup rice cooker, aduk nasi dari bawah ke atas agar rempah dan teri menyatu. Taburkan sisa teri renyah di atasnya, tutup kembali lima menit, lalu sajikan.",
        duration_minutes: 5,
        tips: "Menutup kembali lima menit setelah diaduk membuat nasi liwet lebih tanak dan pulen!"
      }
    ]
  },
  {
    id: "rec-08",
    name: "Sup Sayur Bakso Hangat Bernutrisi",
    slug: "sup-sayur-bakso-hangat",
    description: "Kuah kaldu bening gurih bertabur bakso sapi, wortel, buncis, dan kentang yang segar dan menyehatkan tubuh saat cuaca dingin.",
    image_url: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    category_id: "makan-malam",
    cooking_time: 20,
    preparation_time: 6,
    estimated_cost: 12000,
    cost_per_serving: 4000,
    servings: 3,
    difficulty: "Mudah",
    is_popular: false,
    is_kos_friendly: true,
    tags: ["makan-malam", "sup", "sehat", "sayur", "bakso"],
    tips: "Tumis bawang putih cincang hingga harum terlebih dahulu sebelum dimasukkan ke air sup agar kuahnya beraroma sedap khas kaldu restoran.",
    tools: ["panci", "kompor"],
    ingredients: [
      { name: "Bakso Sapi", quantity: 6, unit: "butir", is_optional: false, notes: "kerat silang atau belah dua" },
      { name: "Wortel", quantity: 1, unit: "buah", is_optional: false, notes: "iris bulat tipis" },
      { name: "Kentang", quantity: 1, unit: "buah", is_optional: false, notes: "potong dadu sedang" },
      { name: "Buncis / Kol", quantity: 50, unit: "gram", is_optional: false, notes: "potong-potong" },
      { name: "Bawang Putih", quantity: 3, unit: "siung", is_optional: false, notes: "geprek dan cincang" },
      { name: "Daun Bawang & Seledri", quantity: 1, unit: "batang", is_optional: false, notes: "iris tipis" },
      { name: "Merica Bubuk & Garam", quantity: 1, unit: "sdt", is_optional: false, notes: "" },
      { name: "Air Bersih", quantity: 750, unit: "ml", is_optional: false, notes: "untuk kuah sup" }
    ],
    instructions: [
      {
        step_number: 1,
        title: "Rebus Air dan Sayuran Keras",
        instruction: "Pertama, tuangkan tujuh ratus lima puluh mililiter air ke dalam panci dan didihkan dengan api sedang. Masukkan potongan kentang dan wortel, rebus selama sekitar lima menit hingga mulai empuk.",
        duration_minutes: 5,
        tips: "Masukkan sayuran keras terlebih dahulu agar matang bersamaan dengan sayuran lunak."
      },
      {
        step_number: 2,
        title: "Tumis Bawang Putih Terpisah",
        instruction: "Kedua, tumis cincangan bawang putih dengan satu sendok teh minyak di teflon kecil sampai harum kekuningan, lalu tuangkan beserta minyaknya ke dalam panci kuah sup.",
        duration_minutes: 2,
        tips: "Teknik bawang putih goreng ini rahasia kuah sup bening yang luar biasa harum dan gurih."
      },
      {
        step_number: 3,
        title: "Masukkan Bakso dan Sayuran Hijau",
        instruction: "Ketiga, masukkan bakso sapi yang sudah dikerat dan potongan buncis ke dalam panci. Tambahkan satu sendok teh garam, setengah sendok teh merica bubuk, dan satu sendok teh kaldu sapi/jamur.",
        duration_minutes: 5,
        tips: "Bakso akan mekar cantik jika sudah matang sempurna."
      },
      {
        step_number: 4,
        title: "Beri Daun Bawang Seledri dan Sajikan",
        instruction: "Keempat, taburkan irisan daun bawang dan seledri cincang. Aduk sebentar selama satu menit, matikan api, dan angkat. Sup sayur bakso siap dinikmati selagi panas.",
        duration_minutes: 2,
        tips: "Taburi bawang goreng di atasnya untuk sensasi renyah gurih ekstra."
      }
    ]
  },
  {
    id: "rec-09",
    name: "Tumis Sosis Saus Mentega Manis",
    slug: "tumis-sosis-saus-mentega",
    description: "Sosis yang dikerat merekah dan dibalut saus mentega gurih manis dengan sentuhan bawang bombay dan kecap manis pekat.",
    image_url: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80",
    category_id: "anak-kos",
    cooking_time: 12,
    preparation_time: 4,
    estimated_cost: 11000,
    cost_per_serving: 5500,
    servings: 2,
    difficulty: "Mudah",
    is_popular: true,
    is_kos_friendly: true,
    tags: ["anak-kos", "sosis", "cepat", "sarapan", "makan-siang"],
    tips: "Kerat sosis secara spiral atau silang agar saus mentega meresap ke dalam daging sosis.",
    tools: ["teflon", "kompor"],
    ingredients: [
      { name: "Sosis Sapi / Ayam", quantity: 5, unit: "buah", is_optional: false, notes: "kerat silang" },
      { name: "Margarin / Mentega", quantity: 2, unit: "sdm", is_optional: false, notes: "untuk menumis" },
      { name: "Bawang Bombay", quantity: 0.5, unit: "buah", is_optional: false, notes: "iris memanjang" },
      { name: "Bawang Putih", quantity: 2, unit: "siung", is_optional: false, notes: "cincang" },
      { name: "Kecap Manis", quantity: 2, unit: "sdm", is_optional: false, notes: "" },
      { name: "Saus Tiram", quantity: 1, unit: "sdm", is_optional: false, notes: "" },
      { name: "Saus Tomat / Sambal", quantity: 1, unit: "sdm", is_optional: true, notes: "sesuai selera" },
      { name: "Air Bersih", quantity: 40, unit: "ml", is_optional: false, notes: "" }
    ],
    instructions: [
      {
        step_number: 1,
        title: "Lelehkan Margarin dan Goreng Sosis",
        instruction: "Pertama, panaskan dua sendok makan margarin di wajan teflon dengan api sedang. Masukkan sosis yang sudah dikerat, tumis sekitar dua hingga tiga menit sampai sosis mekar dan matang kecokelatan.",
        duration_minutes: 3,
        tips: "Aroma margarin yang meleleh akan langsung meresap ke dalam gurihnya sosis."
      },
      {
        step_number: 2,
        title: "Tumis Bawang Bombay dan Putih",
        instruction: "Kedua, masukkan irisan bawang bombay dan cincangan bawang putih ke dalam wajan bersama sosis. Aduk rata selama satu sampai dua menit hingga bawang bombay sedikit layu dan harum wangi.",
        duration_minutes: 2,
        tips: "Jangan tumis bombay terlalu lembek agar masih ada sedikit sensasi renyah manis."
      },
      {
        step_number: 3,
        title: "Masukkan Racikan Saus Mentega",
        instruction: "Ketiga, tuangkan dua sendok makan kecap manis, satu sendok makan saus tiram, satu sendok makan saus tomat, sedikit merica bubuk, dan empat puluh mililiter air bersih.",
        duration_minutes: 2,
        tips: "Air membantu melarutkan saus agar tidak gosong saat dikaramelisasi."
      },
      {
        step_number: 4,
        title: "Masak hingga Mengental Mengilap",
        instruction: "Keempat, aduk cepat dengan api sedang hingga saus mendidih, mereduksi, dan melapisi seluruh permukaan sosis dengan warna cokelat mengilap yang sedap. Angkat dan sajikan.",
        duration_minutes: 2,
        tips: "Menu ini salah satu bekal favorit yang tetap enak dinikmati meski sudah dingin."
      }
    ]
  },
  {
    id: "rec-10",
    name: "Nasi Telur Ceplok Sambal Matah",
    slug: "nasi-telur-ceplok-sambal-matah",
    description: "Telur ceplok mata sapi setengah matang dengan siraman sambal matah khas Bali yang segar, wangi serai, dan pedas menggigit.",
    image_url: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80",
    category_id: "sarapan",
    cooking_time: 10,
    preparation_time: 5,
    estimated_cost: 8500,
    cost_per_serving: 8500,
    servings: 1,
    difficulty: "Mudah",
    is_popular: true,
    is_kos_friendly: true,
    tags: ["sarapan", "telur", "sambal-matah", "pedas", "segar"],
    tips: "Siramkan minyak goreng yang benar-benar panas mendidih ke racikan sambal matah agar terasi dan bawangnya layu aromatik tanpa bau mentah langu.",
    tools: ["teflon", "kompor"],
    ingredients: [
      { name: "Telur Ayam", quantity: 1, unit: "butir", is_optional: false, notes: "ceplok sesuai selera" },
      { name: "Nasi Putih Hangat", quantity: 1, unit: "piring", is_optional: false, notes: "" },
      { name: "Bawang Merah", quantity: 4, unit: "siung", is_optional: false, notes: "iris halus" },
      { name: "Cabai Rawit Merah", quantity: 5, unit: "buah", is_optional: false, notes: "iris halus" },
      { name: "Batang Serai Muda", quantity: 1, unit: "batang", is_optional: false, notes: "ambil putihnya, iris sangat halus" },
      { name: "Daun Jeruk", quantity: 2, unit: "lembar", is_optional: false, notes: "buang tulang, iris halus" },
      { name: "Terasi Bakar", quantity: 0.25, unit: "sdt", is_optional: false, notes: "haluskan" },
      { name: "Jeruk Limau", quantity: 1, unit: "buah", is_optional: false, notes: "peras airnya" },
      { name: "Minyak Goreng Panas", quantity: 2, unit: "sdm", is_optional: false, notes: "" }
    ],
    instructions: [
      {
        step_number: 1,
        title: "Buat Telur Ceplok Mata Sapi",
        instruction: "Pertama, panaskan satu sendok makan minyak di teflon. Pecahkan satu butir telur, beri sedikit taburan garam, dan masak hingga bagian pinggirnya renyah dengan kuning telur setengah matang meleleh. Angkat dan taruh di atas nasi hangat.",
        duration_minutes: 3,
        tips: "Kuning telur meleleh saat dipecahkan di atas nasi panas memberikan kenikmatan luar biasa."
      },
      {
        step_number: 2,
        title: "Campur Bahan Iris Sambal Matah",
        instruction: "Kedua, siapkan mangkuk tahan panas. Masukkan irisan bawang merah, cabai rawit, serai muda, daun jeruk, terasi bakar halus, garam, dan sedikit gula. Remas-remas ringan menggunakan sendok.",
        duration_minutes: 2,
        tips: "Gunakan serai bagian putih paling bawah karena teksturnya paling empuk dan wangi."
      },
      {
        step_number: 3,
        title: "Siram Minyak Panas dan Beri Limau",
        instruction: "Ketiga, panaskan dua sendok makan minyak di teflon hingga berasap tipis. Langsung tuangkan minyak panas mendidih ini ke dalam mangkuk sambal matah. Aduk cepat, lalu beri perasan air jeruk limau.",
        duration_minutes: 1,
        tips: "Suara mendesis saat disiram minyak panas menandakan suhu minyak pas!"
      },
      {
        step_number: 4,
        title: "Sajikan di Atas Telur",
        instruction: "Keempat, tuangkan sambal matah segar beserta minyak wanginya ke atas telur ceplok dan nasi hangat. Langsung nikmati selagi segar.",
        duration_minutes: 1,
        tips: "Perpaduan pedas, gurih telur, dan harum serai limau sangat membangkitkan selera makan."
      }
    ]
  },
  {
    id: "rec-11",
    name: "Ayam Kecap Manis Bumbu Meresap",
    slug: "ayam-kecap-manis-rumahan",
    description: "Potongan ayam lembut dimasak perlahan dalam kuah kecap rempah manis gurih berbumbu bawang bombay dan jahe hangat.",
    image_url: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=80",
    category_id: "makan-malam",
    cooking_time: 25,
    preparation_time: 6,
    estimated_cost: 22000,
    cost_per_serving: 7333,
    servings: 3,
    difficulty: "Sedang",
    is_popular: true,
    is_kos_friendly: false,
    tags: ["makan-malam", "ayam", "kecap", "keluarga", "rumahan"],
    tips: "Goreng ayam sebentar hingga setengah matang sebelum dimasak dengan kuah kecap agar daging ayam tidak mudah hancur dan bumbu terkunci.",
    tools: ["wajan", "kompor"],
    ingredients: [
      { name: "Daging Ayam", quantity: 300, unit: "gram", is_optional: false, notes: "potong ukuran sedang" },
      { name: "Kecap Manis", quantity: 4, unit: "sdm", is_optional: false, notes: "" },
      { name: "Bawang Bombay", quantity: 0.5, unit: "buah", is_optional: false, notes: "iris kasar" },
      { name: "Bawang Putih", quantity: 3, unit: "siung", is_optional: false, notes: "memarkan dan cincang" },
      { name: "Jahe", quantity: 2, unit: "cm", is_optional: false, notes: "memarkan" },
      { name: "Merica Bubuk & Garam", quantity: 1, unit: "sdt", is_optional: false, notes: "" },
      { name: "Air Bersih", quantity: 200, unit: "ml", is_optional: false, notes: "untuk ungkep ayam" },
      { name: "Minyak Goreng", quantity: 3, unit: "sdm", is_optional: false, notes: "" }
    ],
    instructions: [
      {
        step_number: 1,
        title: "Goreng Ayam Setengah Matang",
        instruction: "Pertama, panaskan minyak di wajan. Masukkan potongan ayam yang sudah dicuci bersih dan diberi sedikit garam. Goreng sekitar empat hingga lima menit sampai permukaannya berubah warna kekuningan. Angkat dan sisihkan.",
        duration_minutes: 5,
        tips: "Menggoreng setengah matang membuat tekstur daging ayam tetap juicy dan tidak amis."
      },
      {
        step_number: 2,
        title: "Tumis Bumbu Halus dan Jahe",
        instruction: "Kedua, kurangi minyak di wajan. Masukkan bawang putih cincang, jahe geprek, dan sebagian bawang bombay. Tumis hingga keluar aroma wangi sedap dan kecokelatan.",
        duration_minutes: 2,
        tips: "Jahe berfungsi menghilangkan aroma anyir ayam sekaligus menghangatkan masakan."
      },
      {
        step_number: 3,
        title: "Ungkep Ayam Bersama Kecap dan Air",
        instruction: "Ketiga, masukkan ayam goreng ke dalam wajan. Tuangkan empat sendok makan kecap manis, garam, merica bubuk, dan dua ratus mililiter air bersih. Aduk rata dan tutup wajan.",
        duration_minutes: 10,
        tips: "Masak dengan api kecil-sedang agar bumbu kecap meresap jauh ke dalam serat daging ayam."
      },
      {
        step_number: 4,
        title: "Kentalkan Kuah dan Taburi Bombay Segar",
        instruction: "Keempat, setelah air menyusut dan kuah mengental legit berkilau, masukkan sisa bawang bombay iris. Aduk sebentar selama satu menit hingga bombay agak layu, matikan api.",
        duration_minutes: 3,
        tips: "Bawang bombay yang dimasukkan di akhir memberikan rasa manis renyah yang kontras dan lezat."
      }
    ]
  },
  {
    id: "rec-12",
    name: "Pisang Goreng Crispy Madu Wijen",
    slug: "pisang-goreng-crispy-madu",
    description: "Camilan sore manis renyah keemasan dengan adonan tepung beras berwijen yang kriuk tahan lama dan manis alami pisang matang.",
    image_url: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
    category_id: "camilan",
    cooking_time: 15,
    preparation_time: 5,
    estimated_cost: 8000,
    cost_per_serving: 4000,
    servings: 2,
    difficulty: "Mudah",
    is_popular: false,
    is_kos_friendly: true,
    tags: ["camilan", "manis", "pisang", "krispi", "sore"],
    tips: "Pilih pisang raja, pisang uli, atau kepok yang sudah benar-benar matang agar manisnya lumer saat digigit.",
    tools: ["wajan", "kompor"],
    ingredients: [
      { name: "Pisang Kepok / Uli Matang", quantity: 4, unit: "buah", is_optional: false, notes: "belah bentuk kipas" },
      { name: "Tepung Terigu", quantity: 4, unit: "sdm", is_optional: false, notes: "" },
      { name: "Tepung Beras", quantity: 2, unit: "sdm", is_optional: false, notes: "rahasia renyah tahan lama" },
      { name: "Gula Pasir", quantity: 1, unit: "sdm", is_optional: false, notes: "" },
      { name: "Garam", quantity: 0.25, unit: "sdt", is_optional: false, notes: "penyeimbang gurih" },
      { name: "Biji Wijen", quantity: 1, unit: "sdm", is_optional: true, notes: "opsional penambah harum" },
      { name: "Air Es / Air Dingin", quantity: 70, unit: "ml", is_optional: false, notes: "atur kekentalan" },
      { name: "Minyak Goreng", quantity: 150, unit: "ml", is_optional: false, notes: "untuk deep fry" }
    ],
    instructions: [
      {
        step_number: 1,
        title: "Bikin Adonan Tepung Renyah",
        instruction: "Pertama, campurkan tepung terigu, tepung beras, gula, garam, biji wijen, dan air dingin di mangkuk. Aduk hingga membentuk adonan kental yang tidak bergerindil.",
        duration_minutes: 3,
        tips: "Air dingin membantu menciptakan perbedaan suhu ekstrem dengan minyak panas sehingga hasil gorengan lebih renyah."
      },
      {
        step_number: 2,
        title: "Celupkan Pisang ke Adonan",
        instruction: "Kedua, belah pisang menjadi dua atau bentuk kipas, lalu celupkan pisang hingga terbalut rata dengan adonan tepung.",
        duration_minutes: 2,
        tips: "Pastikan seluruh bagian pisang terlapisi adonan agar pisang tidak menyerap terlalu banyak minyak."
      },
      {
        step_number: 3,
        title: "Goreng Pisang hingga Kuning Keemasan",
        instruction: "Ketiga, panaskan minyak di wajan dengan api sedang. Masukkan pisang satu per satu. Goreng selama sekitar enam hingga delapan menit sambil dibalik sesekali sampai warnanya kuning keemasan dan renyah berkerut.",
        duration_minutes: 7,
        tips: "Kucurkan sedikit adonan encer ke atas minyak untuk menciptakan kremesan kriuk ekstra!"
      },
      {
        step_number: 4,
        title: "Tiriskan dan Sajikan",
        instruction: "Keempat, angkat pisang goreng, tiriskan di atas saringan atau tisu makan. Sajikan selagi hangat ditemani secangkir kopi atau teh hangat.",
        duration_minutes: 2,
        tips: "Bisa diberi drizzle madu atau susu kental manis di atasnya untuk sensasi ekstra nikmat."
      }
    ]
  },
  {
    id: "rec-13",
    name: "Roti Telur Lipat Keju Teflon",
    slug: "roti-telur-lipat-keju-teflon",
    description: "Sarapan ala cafe kekinian dibuat dengan wajan teflon anak kos: roti tawar dibalut telur dadar lembut dan keju leleh lumer.",
    image_url: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
    category_id: "sarapan",
    cooking_time: 10,
    preparation_time: 3,
    estimated_cost: 9500,
    cost_per_serving: 9500,
    servings: 1,
    difficulty: "Mudah",
    is_popular: true,
    is_kos_friendly: true,
    tags: ["sarapan", "roti", "keju", "telur", "teflon", "viral"],
    tips: "Celupkan roti ke dalam telur mentah di teflon sebelum membaliknya agar kedua sisi roti terselimuti telur gurih.",
    tools: ["teflon", "kompor"],
    ingredients: [
      { name: "Roti Tawar", quantity: 2, unit: "lembar", is_optional: false, notes: "" },
      { name: "Telur Ayam", quantity: 2, unit: "butir", is_optional: false, notes: "kocok lepas dengan sedikit garam" },
      { name: "Keju Slice / Parut", quantity: 1, unit: "lembar", is_optional: false, notes: "" },
      { name: "Margarin", quantity: 1, unit: "sdm", is_optional: false, notes: "untuk memanggang" },
      { name: "Saus Sambal / Mayones", quantity: 1, unit: "sdm", is_optional: true, notes: "isian ekstra" }
    ],
    instructions: [
      {
        step_number: 1,
        title: "Kocok Telur dan Tuang ke Teflon",
        instruction: "Pertama, panaskan satu sendok makan margarin di wajan teflon datar dengan api kecil. Tuangkan telur yang sudah dikocok lepas sampai merata ke seluruh permukaan teflon.",
        duration_minutes: 2,
        tips: "Gunakan api kecil agar telur tidak cepat gosong sebelum roti dimasukkan."
      },
      {
        step_number: 2,
        title: "Letakkan Roti dan Balik",
        instruction: "Kedua, letakkan dua lembar roti tawar berdampingan di atas telur setengah matang. Balikkan segera posisi roti agar kedua sisinya basah terkena adonan telur.",
        duration_minutes: 2,
        tips: "Trik ini membuat aroma mentega dan telur meresap ke kedua sisi roti."
      },
      {
        step_number: 3,
        title: "Balik Telur Utuh dan Lipat Pinggiran",
        instruction: "Ketiga, setelah bagian bawah telur matang kokoh, balikkan seluruh telur beserta roti secara bersamaan menggunakan spatula lebar. Lipat pinggiran telur yang melebihi roti ke bagian dalam roti.",
        duration_minutes: 3,
        tips: "Rapikan pinggiran telur agar membentuk kotak presisi mengikuti roti."
      },
      {
        step_number: 4,
        title: "Beri Keju dan Lipat Roti Menjadi Satu",
        instruction: "Keempat, taruh satu lembar keju slice dan sedikit saus di salah satu sisi roti. Lipat roti menjadi satu tangkup sandwich. Panggang masing-masing sisi roti selama satu menit sampai garing keemasan dan keju di dalamnya meleleh lumer. Angkat dan nikmati.",
        duration_minutes: 2,
        tips: "Potong diagonal menjadi dua segitiga untuk tampilan ala toast cafe!"
      }
    ]
  },
  {
    id: "rec-14",
    name: "Omelet Sayur Pelangi Bernutrisi",
    slug: "omelet-sayur-pelangi",
    description: "Telur dadar gulung kaya serat dengan irisan wortel, daun bawang, dan buncis cincang yang cerah berwarna-warni.",
    image_url: "https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=800&q=80",
    category_id: "sarapan",
    cooking_time: 12,
    preparation_time: 5,
    estimated_cost: 7500,
    cost_per_serving: 7500,
    servings: 1,
    difficulty: "Mudah",
    is_popular: false,
    is_kos_friendly: true,
    tags: ["sarapan", "sehat", "sayuran", "diet", "rendah-kalori"],
    tips: "Potong sayuran sekecil mungkin agar cepat empuk dan adonan telur mudah digulung atau dilipat.",
    tools: ["teflon", "kompor"],
    ingredients: [
      { name: "Telur Ayam", quantity: 2, unit: "butir", is_optional: false, notes: "" },
      { name: "Wortel", quantity: 0.5, unit: "buah", is_optional: false, notes: "cincang dadu sangat kecil" },
      { name: "Daun Bawang", quantity: 1, unit: "batang", is_optional: false, notes: "iris halus" },
      { name: "Bawang Merah", quantity: 2, unit: "siung", is_optional: false, notes: "cincang halus" },
      { name: "Garam & Merica Bubuk", quantity: 0.5, unit: "sdt", is_optional: false, notes: "" },
      { name: "Minyak / Margarin", quantity: 1, unit: "sdm", is_optional: false, notes: "" }
    ],
    instructions: [
      {
        step_number: 1,
        title: "Kocok Telur Bersama Sayuran",
        instruction: "Pertama, kocok lepas dua butir telur dalam mangkuk. Masukkan wortel cincang halus, daun bawang, bawang merah, garam, dan merica. Aduk sampai semua bahan menyatu.",
        duration_minutes: 3,
        tips: "Sayuran berwarna oranye dan hijau menciptakan kontras warna pelangi yang cantik."
      },
      {
        step_number: 2,
        title: "Panaskan Teflon dengan Api Kecil",
        instruction: "Kedua, oleskan satu sendok makan margarin ke wajan teflon datar dan panaskan dengan api kecil.",
        duration_minutes: 2,
        tips: "Api kecil penting agar sayuran matang sebelum telur terlalu kecokelatan."
      },
      {
        step_number: 3,
        title: "Tuang Adonan dan Gulung Perlahan",
        instruction: "Ketiga, tuangkan adonan telur ke teflon. Saat telur mulai setengah matang mengeras, dorong dan gulung salah satu ujungnya secara bertahap menyerupai omelet gulung ala Jepang.",
        duration_minutes: 4,
        tips: "Gunakan bantuan dua spatula kecil atau sendok untuk menggulung rapi."
      },
      {
        step_number: 4,
        title: "Panggang Sisi Luar dan Potong",
        instruction: "Keempat, balikkan sisi lipatan ke bawah agar rekat matang. Diamkan satu menit, angkat ke talenan, dan potong-potong menjadi beberapa irisan tebal siap santap.",
        duration_minutes: 2,
        tips: "Bisa ditambahkan sedikit taburan keju atau saus tomat saat disajikan."
      }
    ]
  },
  {
    id: "rec-15",
    name: "Perkedel Kentang Kornet Gurih",
    slug: "perkedel-kentang-kornet-gurih",
    description: "Perkedel kentang lembut harum bawang goreng dan daun seledri dengan campuran kornet sapi gurih yang dibalut putih telur krispi.",
    image_url: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80",
    category_id: "makan-siang",
    cooking_time: 25,
    preparation_time: 10,
    estimated_cost: 14000,
    cost_per_serving: 3500,
    servings: 4,
    difficulty: "Sedang",
    is_popular: false,
    is_kos_friendly: true,
    tags: ["makan-siang", "perkedel", "kentang", "lauk-pauk"],
    tips: "Goreng kentang daripada merebusnya sebelum dihaluskan agar kadar air sedikit dan adonan perkedel tidak hancur saat digoreng.",
    tools: ["panci", "wajan", "kompor"],
    ingredients: [
      { name: "Kentang", quantity: 300, unit: "gram", is_optional: false, notes: "kupas dan potong dadu" },
      { name: "Kornet Sapi", quantity: 2, unit: "sdm", is_optional: false, notes: "bisa diganti daging cincang" },
      { name: "Bawang Merah Goreng", quantity: 2, unit: "sdm", is_optional: false, notes: "remas kasar" },
      { name: "Daun Seledri", quantity: 1, unit: "batang", is_optional: false, notes: "cincang halus" },
      { name: "Biji Pala Bubuk", quantity: 0.25, unit: "sdt", is_optional: true, notes: "aroma khas perkedel" },
      { name: "Garam & Merica", quantity: 0.5, unit: "sdt", is_optional: false, notes: "" },
      { name: "Telur Ayam (Kocok)", quantity: 1, unit: "butir", is_optional: false, notes: "untuk baluran luar" },
      { name: "Minyak Goreng", quantity: 200, unit: "ml", is_optional: false, notes: "untuk menggoreng" }
    ],
    instructions: [
      {
        step_number: 1,
        title: "Goreng dan Haluskan Kentang",
        instruction: "Pertama, goreng potongan kentang di minyak panas sampai empuk matang namun tidak gosong. Angkat dan selagi masih panas, haluskan kentang menggunakan ulekan atau garpu di mangkuk.",
        duration_minutes: 8,
        tips: "Menghaluskan kentang saat masih panas jauh lebih cepat dan hasilnya lembut merata."
      },
      {
        step_number: 2,
        title: "Campur Bumbu dan Kornet",
        instruction: "Kedua, tambahkan dua sendok makan kornet sapi, bawang goreng remas, seledri cincang, sejumput pala bubuk, garam, dan merica ke adonan kentang. Aduk rata menggunakan tangan atau sendok sampai kalis.",
        duration_minutes: 3,
        tips: "Cicipi secuil adonan untuk memastikan kadar asin gurihnya sudah pas."
      },
      {
        step_number: 3,
        title: "Bentuk Bulatan Pipih dan Balur Telur",
        instruction: "Ketiga, ambil satu sendok makan penuh adonan kentang, bulatkan lalu pipihkan rapi. Celupkan bulatan perkedel ke dalam kocokan telur hingga terbalur rata.",
        duration_minutes: 4,
        tips: "Lapisan telur kocok mencegah perkedel pecah dan menghasilkan sarang keemasan gurih di luarnya."
      },
      {
        step_number: 4,
        title: "Goreng hingga Kuning Kecokelatan",
        instruction: "Keempat, masukkan perkedel ke dalam minyak panas dengan api sedang. Goreng sekitar tiga menit per sisi sampai berwarna kuning kecokelatan. Angkat dan tiriskan.",
        duration_minutes: 6,
        tips: "Jangan sering membolak-balik perkedel di wajan agar tidak hancur."
      }
    ]
  },
  {
    id: "rec-16",
    name: "Tahu Crispy Renyah Seharian",
    slug: "tahu-crispy-renyah-seharian",
    description: "Tahu goreng dengan balutan kremesan tepung gurih berongga yang super renyah dan kriuk tahan seharian.",
    image_url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    category_id: "camilan",
    cooking_time: 20,
    preparation_time: 5,
    estimated_cost: 6000,
    cost_per_serving: 3000,
    servings: 2,
    difficulty: "Mudah",
    is_popular: true,
    is_kos_friendly: true,
    tags: ["camilan", "anak-kos", "kriuk", "tahu", "gorengan"],
    tips: "Tuangkan adonan tepung encer dari jarak agak tinggi ke atas minyak panas saat tahu sedang digoreng untuk membentuk kremesan bersarang.",
    tools: ["wajan", "kompor"],
    ingredients: [
      { name: "Tahu Putih Segar", quantity: 6, unit: "kotak", is_optional: false, notes: "potong kotak 2x2 cm" },
      { name: "Tepung Terigu", quantity: 3, unit: "sdm", is_optional: false, notes: "" },
      { name: "Tepung Tapioka / Maizena", quantity: 1, unit: "sdm", is_optional: false, notes: "" },
      { name: "Baking Powder", quantity: 0.5, unit: "sdt", is_optional: false, notes: "kunci kriuk mengembang" },
      { name: "Kaldu Bubuk & Bawang Putih Bubuk", quantity: 1, unit: "sdt", is_optional: false, notes: "" },
      { name: "Air Bersih", quantity: 150, unit: "ml", is_optional: false, notes: "adonan harus sangat encer" },
      { name: "Minyak Goreng", quantity: 200, unit: "ml", is_optional: false, notes: "untuk deep fry" }
    ],
    instructions: [
      {
        step_number: 1,
        title: "Rendam Tahu dalam Adonan Encer",
        instruction: "Pertama, campurkan tepung terigu, tapioka, baking powder, kaldu bubuk, bawang putih bubuk, dan air di mangkuk besar. Masukkan potongan tahu ke dalam adonan encer dan diamkan sepuluh menit agar bumbu meresap.",
        duration_minutes: 5,
        tips: "Adonan harus cair seperti susu agar kremesannya nanti tipis renyah dan tidak tebal keras."
      },
      {
        step_number: 2,
        title: "Goreng Tahu Sampai Berkulit",
        instruction: "Kedua, panaskan minyak banyak di wajan sampai benar-benar panas. Tiriskan tahu dari adonan dan masukkan ke minyak panas. Goreng sampai tahu mengapung dan berkulit kering.",
        duration_minutes: 6,
        tips: "Pastikan minyak cukup banyak agar tahu terendam rata."
      },
      {
        step_number: 3,
        title: "Tuang Adonan Tepung Encer Bertahap",
        instruction: "Ketiga, tuang sepertiga sisa adonan tepung encer dari jarak agak tinggi memutar ke atas wajan. Minyak akan mendesis berbusa. Aduk cepat ke arah tahu agar kremesan menempel di permukaan tahu. Ulangi proses ini dua kali setelah kremesan mulai kering.",
        duration_minutes: 6,
        tips: "Teknik menuang bertahap ini yang menghasilkan lapisan selimut crispy khas tahu Sumedang modern."
      },
      {
        step_number: 4,
        title: "Goreng hingga Garing dan Tiriskan",
        instruction: "Keempat, lanjutkan menggoreng sampai warna kremesan kuning kecokelatan dan terdengar garing saat diaduk spatula. Angkat dan tiriskan di atas saringan. Sajikan dengan cabai rawit hijau segar.",
        duration_minutes: 3,
        tips: "Kremesan ini tetap renyah bahkan setelah dingin berjam-jam!"
      }
    ]
  },
  {
    id: "rec-17",
    name: "Capcay Kuah Kental Komplit Hemat",
    slug: "capcay-kuah-kental-komplit",
    description: "Aneka sayuran segar warna-warni berpadu dengan bakso dan kuah kental gurih saus tiram yang sedap dan menyehatkan.",
    image_url: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    category_id: "makan-malam",
    cooking_time: 18,
    preparation_time: 7,
    estimated_cost: 15000,
    cost_per_serving: 5000,
    servings: 3,
    difficulty: "Sedang",
    is_popular: true,
    is_kos_friendly: true,
    tags: ["makan-malam", "sayuran", "capcay", "sehat", "chinese-food"],
    tips: "Larutkan tepung maizena dengan air dingin terlebih dahulu sebelum dituangkan ke kuah mendidih agar kuah tidak menggumpal.",
    tools: ["wajan", "kompor"],
    ingredients: [
      { name: "Wortel", quantity: 1, unit: "buah", is_optional: false, notes: "iris serong tipis" },
      { name: "Kembang Kol / Brokoli", quantity: 80, unit: "gram", is_optional: false, notes: "potong kuntum" },
      { name: "Sawi Putih & Sawi Hijau", quantity: 100, unit: "gram", is_optional: false, notes: "potong-potong" },
      { name: "Bakso Sapi", quantity: 4, unit: "butir", is_optional: false, notes: "iris bulat" },
      { name: "Bawang Putih", quantity: 3, unit: "siung", is_optional: false, notes: "cincang halus" },
      { name: "Bawang Bombay", quantity: 0.5, unit: "buah", is_optional: false, notes: "iris memanjang" },
      { name: "Saus Tiram", quantity: 1.5, unit: "sdm", is_optional: false, notes: "" },
      { name: "Minyak Wijen", quantity: 0.5, unit: "sdm", is_optional: true, notes: "opsional pemberi aroma" },
      { name: "Tepung Maizena", quantity: 1, unit: "sdm", is_optional: false, notes: "larutkan dgn 3 sdm air" },
      { name: "Air Bersih", quantity: 250, unit: "ml", is_optional: false, notes: "" }
    ],
    instructions: [
      {
        step_number: 1,
        title: "Tumis Bawang Putih dan Bombay",
        instruction: "Pertama, panaskan dua sendok makan minyak di wajan dengan api sedang. Masukkan cincangan bawang putih dan bawang bombay iris. Tumis selama dua menit sampai harum dan layu.",
        duration_minutes: 2,
        tips: "Gunakan wajan berukuran cukup besar agar sayuran bisa diaduk leluasa."
      },
      {
        step_number: 2,
        title: "Masukkan Bakso dan Sayuran Keras",
        instruction: "Kedua, masukkan irisan bakso sapi, wortel, dan kembang kol. Tambahkan saus tiram, sedikit kecap asin, merica bubuk, dan dua ratus lima puluh mililiter air. Tutup wajan sebentar selama tiga menit sampai wortel empuk.",
        duration_minutes: 4,
        tips: "Menutup wajan membantu uap air mematangkan kembang kol dan wortel secara merata."
      },
      {
        step_number: 3,
        title: "Masukkan Sawi dan Daun Sayuran",
        instruction: "Ketiga, buka tutup wajan, masukkan sawi putih dan sawi hijau. Aduk cepat selama satu sampai dua menit dengan api besar sampai sawi mulai layu.",
        duration_minutes: 2,
        tips: "Sayuran hijau dimasak sebentar agar vitamin tetap terjaga dan warna tetap segar berseri."
      },
      {
        step_number: 4,
        title: "Kentalkan Kuah dengan Maizena",
        instruction: "Keempat, kecilkan api sedikit, tuangkan larutan tepung maizena secara perlahan sambil kuah terus diaduk memutar. Kuah akan berubah menjadi kental dan mengilap meletup. Teteskan sedikit minyak wijen, matikan api, dan sajikan.",
        duration_minutes: 2,
        tips: "Kuah kental ini sangat sedap disiramkan ke atas sepiring nasi putih hangat."
      }
    ]
  },
  {
    id: "rec-18",
    name: "Bubur Ayam Praktis Rice Cooker",
    slug: "bubur-ayam-rice-cooker",
    description: "Bubur ayam gurih lembut dimasak otomatis di rice cooker dengan kaldu ayam, taburan ayam suwir, dan cakwe renyah.",
    image_url: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    category_id: "sarapan",
    cooking_time: 35,
    preparation_time: 8,
    estimated_cost: 12000,
    cost_per_serving: 6000,
    servings: 2,
    difficulty: "Mudah",
    is_popular: true,
    is_kos_friendly: true,
    tags: ["sarapan", "rice-cooker", "bubur", "nyaman", "anak-kos"],
    tips: "Perbandingan beras dan air untuk bubur rice cooker adalah 1 : 6 atau 1 : 7 agar kelembutannya pas tanpa perlu diaduk terus-menerus.",
    tools: ["rice-cooker"],
    ingredients: [
      { name: "Beras Putih", quantity: 1, unit: "cup", is_optional: false, notes: "cuci bersih" },
      { name: "Air / Kaldu Ayam", quantity: 1200, unit: "ml", is_optional: false, notes: "sekitar 6 cup takar" },
      { name: "Dada Ayam Fillet", quantity: 100, unit: "gram", is_optional: false, notes: "rebus bareng bubur, suwir" },
      { name: "Bawang Putih", quantity: 2, unit: "siung", is_optional: false, notes: "geprek halus" },
      { name: "Jahe", quantity: 2, unit: "cm", is_optional: false, notes: "memarkan" },
      { name: "Garam & Kaldu Bubuk", quantity: 1, unit: "sdt", is_optional: false, notes: "" },
      { name: "Kecap Asin & Minyak Wijen", quantity: 1, unit: "sdt", is_optional: false, notes: "" },
      { name: "Daun Bawang & Kerupuk", quantity: 1, unit: "porsi", is_optional: true, notes: "pelengkap" }
    ],
    instructions: [
      {
        step_number: 1,
        title: "Campur Beras, Daging Ayam, dan Air di Rice Cooker",
        instruction: "Pertama, masukkan beras bersih, potongan dada ayam utuh, seribu dua ratus mililiter air kaldu, bawang putih geprek, jahe, garam, dan kaldu bubuk ke dalam panci rice cooker.",
        duration_minutes: 5,
        tips: "Memasak dada ayam langsung bersama beras membuat air kaldunya meresap kuat ke dalam bulir beras."
      },
      {
        step_number: 2,
        title: "Masak dengan Mode Porridge / Cook",
        instruction: "Kedua, tutup rice cooker dan pilih mode 'Porridge' (jika ada) atau mode 'Cook' biasa. Biarkan rice cooker bekerja mematangkan bubur secara otomatis.",
        duration_minutes: 25,
        tips: "Jika menggunakan rice cooker biasa, ganjal sedikit tutupnya dengan sendok jika air mulai berbuih naik."
      },
      {
        step_number: 3,
        title: "Angkat dan Suwir Daging Ayam",
        instruction: "Ketiga, buka rice cooker saat bubur mulai mengental. Angkat dada ayam yang sudah matang empuk, lalu suwir-suwir tipis menggunakan dua garpu.",
        duration_minutes: 3,
        tips: "Aduk bubur dengan centong memutar selama satu menit agar teksturnya semakin halus seperti sutra."
      },
      {
        step_number: 4,
        title: "Tata Bubur dan Beri Topping",
        instruction: "Keempat, tuang bubur panas ke dalam mangkuk. Beri tetesan kecap asin dan minyak wijen, tata suwiran ayam di atasnya, taburi daun bawang cincang, bawang goreng, dan kerupuk.",
        duration_minutes: 2,
        tips: "Sarapan hangat yang sangat ramah lambung di pagi hari!"
      }
    ]
  },
  {
    id: "rec-19",
    name: "Makaroni Telur Keju Gurih (Maklor)",
    slug: "makaroni-telur-keju-maklor",
    description: "Jajanan hits kesukaan sejuta umat: makaroni rebus kenyal digoreng bersama kocokan telur, mentega, dan taburan bumbu keju gurih asin.",
    image_url: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
    category_id: "camilan",
    cooking_time: 14,
    preparation_time: 4,
    estimated_cost: 8000,
    cost_per_serving: 4000,
    servings: 2,
    difficulty: "Mudah",
    is_popular: true,
    is_kos_friendly: true,
    tags: ["camilan", "anak-kos", "makaroni", "jajanan-sd", "gurih"],
    tips: "Rebus makaroni dengan sedikit minyak dan garam agar makaroni tidak saling lengket saat ditiriskan.",
    tools: ["teflon", "panci", "kompor"],
    ingredients: [
      { name: "Makaroni Pipa Kering", quantity: 80, unit: "gram", is_optional: false, notes: "rebus al dente" },
      { name: "Telur Ayam", quantity: 2, unit: "butir", is_optional: false, notes: "kocok lepas" },
      { name: "Margarin", quantity: 1, unit: "sdm", is_optional: false, notes: "untuk menggoreng" },
      { name: "Bubuk Bumbu Keju / Balado", quantity: 1.5, unit: "sdm", is_optional: false, notes: "sesuai selera" },
      { name: "Kaldu Bubuk & Cabai Bubuk", quantity: 0.5, unit: "sdt", is_optional: true, notes: "" }
    ],
    instructions: [
      {
        step_number: 1,
        title: "Rebus Makaroni hingga Kenyal",
        instruction: "Pertama, rebus makaroni di panci berisi air mendidih selama enam hingga tujuh menit sampai empuk kenyal (al dente). Tiriskan airnya.",
        duration_minutes: 7,
        tips: "Jangan rebus terlalu lembek agar tekstur kenyal saat digoreng tetap terasa."
      },
      {
        step_number: 2,
        title: "Tumis Makaroni dengan Margarin",
        instruction: "Kedua, panaskan satu sendok makan margarin di wajan teflon datar. Masukkan makaroni rebus dan tumis selama satu menit hingga terkena aroma gurih mentega.",
        duration_minutes: 2,
        tips: "Ratakan makaroni di seluruh dasar wajan teflon."
      },
      {
        step_number: 3,
        title: "Tuang Kocokan Telur",
        instruction: "Ketiga, tuangkan dua butir telur kocok secara merata di atas hamparan makaroni. Diamkan sejenak hingga telur bagian bawah mulai mengering, lalu aduk dan orak-arik kasar bersama makaroni.",
        duration_minutes: 3,
        tips: "Aduk bolak-balik agar setiap butir makaroni terbalut butiran telur dadar gurih."
      },
      {
        step_number: 4,
        title: "Bumbui dan Kocok di Wadah",
        instruction: "Keempat, setelah telur matang garing, angkat maklor ke dalam wadah atau mangkuk. Taburkan bumbu keju dan cabai bubuk, lalu aduk atau kocok wadah sampai bumbu terbalut merata.",
        duration_minutes: 2,
        tips: "Sajikan hangat selagi renyah gurihnya masih maksimal!"
      }
    ]
  },
  {
    id: "rec-20",
    name: "Pancake Teflon Fluffy Manis Sederhana",
    slug: "pancake-teflon-fluffy-sederhana",
    description: "Pancake empuk montok manis dibuat tanpa mixer cukup menggunakan teflon biasa, disiram kucuran madu atau sirup manis.",
    image_url: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80",
    category_id: "dessert",
    cooking_time: 15,
    preparation_time: 5,
    estimated_cost: 7000,
    cost_per_serving: 3500,
    servings: 2,
    difficulty: "Mudah",
    is_popular: false,
    is_kos_friendly: true,
    tags: ["dessert", "sarapan", "pancake", "manis", "teflon"],
    tips: "Balik pancake saat gelembung-gelembung udara di permukaannya mulai pecah dan bagian pinggirnya terlihat matang kokoh.",
    tools: ["teflon", "kompor"],
    ingredients: [
      { name: "Tepung Terigu", quantity: 6, unit: "sdm", is_optional: false, notes: "sekitar 80 gram" },
      { name: "Gula Pasir", quantity: 2, unit: "sdm", is_optional: false, notes: "" },
      { name: "Baking Powder", quantity: 0.5, unit: "sdt", is_optional: false, notes: "pemicu montok fluffy" },
      { name: "Telur Ayam", quantity: 1, unit: "butir", is_optional: false, notes: "" },
      { name: "Susu UHT / Air", quantity: 80, unit: "ml", is_optional: false, notes: "" },
      { name: "Margarin Cair", quantity: 1, unit: "sdm", is_optional: false, notes: "" },
      { name: "Madu / Susu Kental Manis", quantity: 2, unit: "sdm", is_optional: true, notes: "topping" }
    ],
    instructions: [
      {
        step_number: 1,
        title: "Campur Bahan Kering dan Basah",
        instruction: "Pertama, campurkan tepung terigu, gula pasir, dan baking powder di mangkuk. Di mangkuk kecil lain, kocok telur bersama susu cair dan margarin leleh.",
        duration_minutes: 3,
        tips: "Memisahkan bahan cair dan kering membuat adonan lebih mudah tercampur rata."
      },
      {
        step_number: 2,
        title: "Aduk Adonan Jangan Terlalu Kuat",
        instruction: "Kedua, tuangkan bahan cair ke dalam mangkuk bahan kering. Aduk perlahan menggunakan garpu atau whisk sampai tercampur. Jangan mengaduk terlalu lama agar pancake tidak alot.",
        duration_minutes: 2,
        tips: "Adonan pancake yang bagus masih sedikit menyisakan gumpalan kecil halus."
      },
      {
        step_number: 3,
        title: "Panggang di Teflon Tanpa Minyak Banyak",
        instruction: "Ketiga, panaskan wajan teflon anti lengket dengan api paling kecil. Tuangkan satu sendok sayur adonan ke tengah teflon. Masak sekitar dua menit sampai permukaan pancake berlubang gelembung udara.",
        duration_minutes: 3,
        tips: "Jangan oles minyak berlebih di teflon agar warna cokelat pancake mulus merata tanpa bercak."
      },
      {
        step_number: 4,
        title: "Balik dan Panggang Sisi Sebaliknya",
        instruction: "Keempat, balikkan pancake dengan spatula dan masak sisi sebaliknya selama satu menit hingga kuning kecokelatan. Angkat, susun bertumpuk, dan siramkan madu atau sirup maple manis.",
        duration_minutes: 2,
        tips: "Tambahkan irisan pisang atau strawberry jika ingin sensasi lebih segar!"
      }
    ]
  },
  {
    id: "rec-21",
    name: "Roti Bakar Coklat Keju Susu Lumer",
    slug: "roti-bakar-coklat-keju-susu",
    description: "Roti bakar renyah mentega dengan isian meises coklat lumer, parutan keju gurih melimpah, dan kucuran susu kental manis.",
    image_url: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
    category_id: "dessert",
    cooking_time: 10,
    preparation_time: 3,
    estimated_cost: 9000,
    cost_per_serving: 4500,
    servings: 2,
    difficulty: "Mudah",
    is_popular: true,
    is_kos_friendly: true,
    tags: ["dessert", "camilan", "roti-bakar", "manis", "malam"],
    tips: "Oleskan margarin secara merata hingga ke tepi luar roti agar seluruh bagian roti menjadi renyah garing saat dipanggang.",
    tools: ["teflon", "kompor"],
    ingredients: [
      { name: "Roti Tawar", quantity: 4, unit: "lembar", is_optional: false, notes: "" },
      { name: "Margarin", quantity: 2, unit: "sdm", is_optional: false, notes: "olesan luar & dalam" },
      { name: "Meises Coklat", quantity: 3, unit: "sdm", is_optional: false, notes: "" },
      { name: "Keju Cheddar Parut", quantity: 30, unit: "gram", is_optional: false, notes: "" },
      { name: "Susu Kental Manis Putih", quantity: 2, unit: "sdm", is_optional: false, notes: "" }
    ],
    instructions: [
      {
        step_number: 1,
        title: "Oles dan Susun Isian Roti",
        instruction: "Pertama, oleskan sedikit margarin di bagian dalam lembaran roti tawar. Taburkan meises coklat tebal, parutan keju cheddar, dan beri kucuran susu kental manis. Tangkupkan dengan lembaran roti pasangannya.",
        duration_minutes: 3,
        tips: "Kombinasi asin keju dan manis coklat susu menghasilkan rasa gurih legit yang seimbang."
      },
      {
        step_number: 2,
        title: "Oles Permukaan Luar Roti",
        instruction: "Kedua, oleskan margarin merata pada sisi permukaan luar roti yang akan bersentuhan langsung dengan teflon panas.",
        duration_minutes: 1,
        tips: "Lapisan margarin luar ini yang membuat roti renyah keemasan dan wangi harum saat dibakar."
      },
      {
        step_number: 3,
        title: "Panggang di Teflon Api Kecil",
        instruction: "Ketiga, panaskan wajan teflon dengan api kecil. Letakkan roti, tekan-tekan perlahan menggunakan spatula agar isian di dalam merekat rapat. Panggang dua sampai tiga menit per sisi sampai cokelat keemasan dan coklat meleleh.",
        duration_minutes: 4,
        tips: "Selalu gunakan api kecil agar coklat dan keju di dalam sempat lumer sebelum kulit roti gosong."
      },
      {
        step_number: 4,
        title: "Potong dan Beri Topping Ekstra",
        instruction: "Keempat, angkat roti bakar ke talenan, potong menjadi empat bagian segitiga. Taburkan sedikit parutan keju ekstra di atasnya dan sajikan selagi masih garing hangat.",
        duration_minutes: 2,
        tips: "Paling asyik dinikmati saat nongkrong santai atau begadang nugas!"
      }
    ]
  },
  {
    id: "rec-22",
    name: "Seblak Kuah Pedas Makaroni Kerupuk",
    slug: "seblak-kuah-pedas-makaroni",
    description: "Sensasi pedas gurih khas Bandung dengan bumbu kencur wangi menyengat, kerupuk basah kenyal, makaroni, sosis, dan kuah merah pedas membakar lidah.",
    image_url: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    category_id: "anak-kos",
    cooking_time: 18,
    preparation_time: 5,
    estimated_cost: 9500,
    cost_per_serving: 9500,
    servings: 1,
    difficulty: "Sedang",
    is_popular: true,
    is_kos_friendly: true,
    tags: ["anak-kos", "pedas", "seblak", "bandung", "viral"],
    tips: "Rendam kerupuk mentah di air hangat selama 15 menit sebelum dimasak agar kerupuk kenyal lembut tanpa lengket di wajan.",
    tools: ["wajan", "panci", "kompor"],
    ingredients: [
      { name: "Kerupuk Bawang Mentah", quantity: 40, unit: "gram", is_optional: false, notes: "rendam air hangat" },
      { name: "Makaroni Rebus", quantity: 30, unit: "gram", is_optional: true, notes: "" },
      { name: "Sosis / Bakso", quantity: 2, unit: "buah", is_optional: false, notes: "potong serong" },
      { name: "Telur Ayam", quantity: 1, unit: "butir", is_optional: false, notes: "" },
      { name: "Sawi Hijau", quantity: 2, unit: "lembar", is_optional: false, notes: "potong-potong" },
      { name: "Kencur", quantity: 3, unit: "cm", is_optional: false, notes: "kunci wangi seblak" },
      { name: "Bawang Merah", quantity: 3, unit: "siung", is_optional: false, notes: "" },
      { name: "Bawang Putih", quantity: 2, unit: "siung", is_optional: false, notes: "" },
      { name: "Cabai Rawit Merah & Keriting", quantity: 8, unit: "buah", is_optional: false, notes: "haluskan" },
      { name: "Air Bersih", quantity: 300, unit: "ml", is_optional: false, notes: "" }
    ],
    instructions: [
      {
        step_number: 1,
        title: "Haluskan dan Tumis Bumbu Kencur",
        instruction: "Pertama, haluskan kencur, bawang merah, bawang putih, dan aneka cabai menggunakan ulekan atau blender. Panaskan dua sendok makan minyak, tumis bumbu halus sampai matang wangi dan tidak berbau langu.",
        duration_minutes: 3,
        tips: "Aroma kencur yang matang sempurna adalah ciri khas kenikmatan seblak asli."
      },
      {
        step_number: 2,
        title: "Orak-arik Telur Bersama Bumbu",
        instruction: "Kedua, pinggirkan bumbu ke sisi wajan, pecahkan telur di sisi yang berminyak dan orak-arik kasar sampai telur matang berserat.",
        duration_minutes: 2,
        tips: "Telur yang diorak-arik bersama bumbu akan membuat kuah seblak menjadi kental gurih bertekstur."
      },
      {
        step_number: 3,
        title: "Tuang Air dan Masukkan Isian Seblak",
        instruction: "Ketiga, tuangkan tiga ratus mililiter air ke dalam wajan. Masukkan kerupuk yang sudah direndam, makaroni, dan irisan sosis. Tambahkan garam, kaldu bubuk, dan sejumput gula pasir. Masak hingga kuah mendidih membara.",
        duration_minutes: 5,
        tips: "Kerupuk yang kenyal adalah tekstur terbaik yang membuat seblak nagih."
      },
      {
        step_number: 4,
        title: "Masukkan Sawi dan Angkat",
        instruction: "Keempat, masukkan potongan sawi hijau. Aduk selama satu menit sampai sawi layu. Matikan api dan tuang seblak kuah panas beruap ke dalam mangkuk saji.",
        duration_minutes: 2,
        tips: "Nikmati selagi panas membara untuk sensasi pedas gurih yang melegakan hidung mampet!"
      }
    ]
  },
  {
    id: "rec-23",
    name: "Sayur Bening Bayam Jagung Manis",
    slug: "sayur-bening-bayam-jagung",
    description: "Sayur kuah bening segar beraroma temu kunci atau bawang merah dengan manisnya jagung pipil dan bayam segar yang menyejukkan tubuh.",
    image_url: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    category_id: "makan-siang",
    cooking_time: 14,
    preparation_time: 5,
    estimated_cost: 7000,
    cost_per_serving: 3500,
    servings: 2,
    difficulty: "Mudah",
    is_popular: false,
    is_kos_friendly: true,
    tags: ["makan-siang", "sehat", "bayam", "jagung", "bening", "segar"],
    tips: "Masukkan daun bayam paling akhir dan segera matikan kompor saat daun mulai layu agar bayam tidak berubah kehitaman atau terlalu layu.",
    tools: ["panci", "kompor"],
    ingredients: [
      { name: "Bayam Hijau Segar", quantity: 1, unit: "ikat", is_optional: false, notes: "petik daunnya" },
      { name: "Jagung Manis", quantity: 1, unit: "tongkol", is_optional: false, notes: "potong melingkar atau pipil" },
      { name: "Bawang Merah", quantity: 3, unit: "siung", is_optional: false, notes: "iris tipis" },
      { name: "Temu Kunci / Daun Salam", quantity: 2, unit: "cm", is_optional: true, notes: "memarkan, opsional" },
      { name: "Gula Pasir & Garam", quantity: 1, unit: "sdt", is_optional: false, notes: "" },
      { name: "Air Bersih", quantity: 700, unit: "ml", is_optional: false, notes: "" }
    ],
    instructions: [
      {
        step_number: 1,
        title: "Didihkan Air dan Rebus Jagung",
        instruction: "Pertama, masukkan tujuh ratus mililiter air ke dalam panci bersama potongan jagung manis, irisan bawang merah, dan temu kunci geprek. Masak dengan api sedang selama enam hingga tujuh menit sampai jagung manis empuk.",
        duration_minutes: 7,
        tips: "Manis alami dari jagung akan keluar ke dalam sari air rebusan."
      },
      {
        step_number: 2,
        title: "Bumbui Kuah Bening",
        instruction: "Kedua, tambahkan satu sendok teh garam dan satu sendok teh gula pasir. Aduk dan cicipi kuah sampai terasa manis gurih segar yang pas.",
        duration_minutes: 2,
        tips: "Sayur bening bayam khas rumahan identik dengan perpaduan gurih dan sedikit manis yang menyegarkan."
      },
      {
        step_number: 3,
        title: "Masukkan Daun Bayam",
        instruction: "Ketiga, masukkan seluruh daun bayam yang sudah dicuci bersih ke dalam panci kuah mendidih. Aduk perlahan selama tiga puluh detik sampai daun terendam air panas.",
        duration_minutes: 1,
        tips: "Jangan tinggalkan panci karena bayam matang dalam hitungan detik!"
      },
      {
        step_number: 4,
        title: "Segera Matikan Api dan Sajikan",
        instruction: "Keempat, segera matikan api kompor saat bayam mulai layu dan warnanya masih hijau segar cerah. Tuang ke dalam mangkuk saji bersama kuah beningnya.",
        duration_minutes: 1,
        tips: "Sangat cocok disandingkan bersama sambal terasi dan tempe goreng renyah."
      }
    ]
  },
  {
    id: "rec-24",
    name: "Es Jeruk Peras Murni Segar",
    slug: "es-jeruk-peras-segar",
    description: "Minuman pelepas dahaga nomor satu Indonesia: air perasan jeruk peras asli dengan sirup gula pasir dan es batu dingin yang menyegarkan tenggorokan.",
    image_url: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80",
    category_id: "minuman",
    cooking_time: 5,
    preparation_time: 4,
    estimated_cost: 5000,
    cost_per_serving: 5000,
    servings: 1,
    difficulty: "Mudah",
    is_popular: true,
    is_kos_friendly: true,
    tags: ["minuman", "dingin", "jeruk", "segar", "murah"],
    tips: "Larutkan gula pasir dengan sedikit air hangat terlebih dahulu agar gula tidak mengendap di dasar gelas saat terkena es batu.",
    tools: ["kompor"],
    ingredients: [
      { name: "Jeruk Peras Segar", quantity: 3, unit: "buah", is_optional: false, notes: "belah dua melintang" },
      { name: "Gula Pasir", quantity: 2, unit: "sdm", is_optional: false, notes: "sesuai selera manis" },
      { name: "Air Hangat", quantity: 30, unit: "ml", is_optional: false, notes: "untuk melarutkan gula" },
      { name: "Es Batu", quantity: 1, unit: "gelas", is_optional: false, notes: "" }
    ],
    instructions: [
      {
        step_number: 1,
        title: "Larutkan Gula Pasir",
        instruction: "Pertama, masukkan dua sendok makan gula pasir ke dalam gelas saji, tuangkan tiga puluh mililiter air hangat. Aduk menggunakan sendok panjang sampai butiran gula larut sempurna.",
        duration_minutes: 1,
        tips: "Gula yang larut sempurna memastikan rasa manis merata di setiap tegukan."
      },
      {
        step_number: 2,
        title: "Peras Buah Jeruk",
        instruction: "Kedua, peras air jeruk menggunakan alat pemeras jeruk atau saringan kecil di atas gelas agar bijinya tidak ikut masuk.",
        duration_minutes: 2,
        tips: "Jangan memeras kulit jeruk terlalu keras agar minyak pahit dari kulit tidak ikut keluar."
      },
      {
        step_number: 3,
        title: "Masukkan Es Batu dan Aduk",
        instruction: "Ketiga, tambahkan es batu hingga memenuhi gelas. Aduk memutar sampai dinding luar gelas mulai berembun dingin.",
        duration_minutes: 1,
        tips: "Sensasi embun dingin di gelas adalah tanda minuman sudah mencapai suhu kesegaran maksimal!"
      },
      {
        step_number: 4,
        title: "Sajikan Segar",
        instruction: "Keempat, beri irisan tipis jeruk di bibir gelas sebagai hiasan. Nikmati kesegaran asam manis alaminya di siang hari yang terik.",
        duration_minutes: 1,
        tips: "Kaya vitamin C alami yang menyegarkan pikiran lelah."
      }
    ]
  },
  {
    id: "rec-25",
    name: "Jus Mangga Creamy Smoothie Sehat",
    slug: "jus-mangga-creamy-smoothie",
    description: "Jus mangga kental manis dengan sensasi susu creamy yang lembut menyegarkan, diblender halus dalam hitungan menit.",
    image_url: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=80",
    category_id: "minuman",
    cooking_time: 8,
    preparation_time: 5,
    estimated_cost: 10000,
    cost_per_serving: 10000,
    servings: 1,
    difficulty: "Mudah",
    is_popular: false,
    is_kos_friendly: true,
    tags: ["minuman", "dessert", "mangga", "smoothie", "blender", "sehat"],
    tips: "Bekukan potongan mangga di freezer terlebih dahulu sebelum diblender agar tekstur jus kental alami tanpa perlu terlalu banyak es batu cair.",
    tools: ["blender"],
    ingredients: [
      { name: "Mangga Harum Manis Matang", quantity: 1, unit: "buah", is_optional: false, notes: "kupas dan potong dadu" },
      { name: "Susu UHT Full Cream", quantity: 100, unit: "ml", is_optional: false, notes: "dingin" },
      { name: "Susu Kental Manis", quantity: 2, unit: "sdm", is_optional: false, notes: "" },
      { name: "Es Batu", quantity: 0.5, unit: "gelas", is_optional: false, notes: "" }
    ],
    instructions: [
      {
        step_number: 1,
        title: "Siapkan Potongan Mangga di Blender",
        instruction: "Pertama, masukkan potongan mangga matang manis ke dalam tabung blender. Sisihkan beberapa potongan kecil dadu mangga untuk topping di akhir.",
        duration_minutes: 2,
        tips: "Gunakan mangga yang matang pohon agar aroma wangi dan manis alaminya kuat."
      },
      {
        step_number: 2,
        title: "Tambahkan Susu dan Es Batu",
        instruction: "Kedua, tuangkan seratus mililiter susu UHT dingin, dua sendok makan susu kental manis, dan setengah gelas es batu ke dalam blender.",
        duration_minutes: 1,
        tips: "Susu full cream memberikan sentuhan rasa creamy seperti dessert cafe premium."
      },
      {
        step_number: 3,
        title: "Blender hingga Kental Halus",
        instruction: "Ketiga, pasang tutup blender rapat-rapat. Nyalakan blender dengan kecepatan sedang selama tiga puluh detik, lalu naikkan ke kecepatan tinggi selama satu menit sampai adonan berbusa lembut dan teksturnya halus merata.",
        duration_minutes: 2,
        tips: "Pastikan es batu sudah hancur sempurna menjadi buliran halus."
      },
      {
        step_number: 4,
        title: "Tuang ke Gelas dan Beri Topping",
        instruction: "Keempat, tuang smoothie mangga ke dalam gelas tinggi. Beri potongan dadu mangga segar di atas permukaannya. Sajikan segera dengan sedotan ramah lingkungan.",
        duration_minutes: 1,
        tips: "Minuman kaya vitamin A dan C yang memanjakan lidah!"
      }
    ]
  },
  {
    id: "rec-26",
    name: "Pisang Coklat Lumer Crispy (Piscok)",
    slug: "pisang-coklat-lumer-crispy",
    description: "Jajanan manis legendaris: pisang matang manis dibungkus kulit lumpia renyah dengan isian coklat lumer yang meleleh saat digigit hangat.",
    image_url: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
    category_id: "camilan",
    cooking_time: 15,
    preparation_time: 6,
    estimated_cost: 10000,
    cost_per_serving: 2500,
    servings: 4,
    difficulty: "Mudah",
    is_popular: true,
    is_kos_friendly: true,
    tags: ["camilan", "dessert", "piscok", "coklat", "lumer", "gorengan"],
    tips: "Rekatkan ujung kulit lumpia dengan larutan tepung terigu dan air agar tidak bocor saat digoreng di minyak panas.",
    tools: ["wajan", "kompor"],
    ingredients: [
      { name: "Pisang Uli / Raja Matang", quantity: 4, unit: "buah", is_optional: false, notes: "belah memanjang jadi dua" },
      { name: "Kulit Lumpia Siap Pakai", quantity: 8, unit: "lembar", is_optional: false, notes: "" },
      { name: "Coklat Batang / Meises", quantity: 50, unit: "gram", is_optional: false, notes: "iris tipis atau tabur" },
      { name: "Larutan Terigu (1 sdt terigu + 2 sdm air)", quantity: 1, unit: "sdm", is_optional: false, notes: "perekat ujung" },
      { name: "Minyak Goreng", quantity: 150, unit: "ml", is_optional: false, notes: "untuk menggoreng" }
    ],
    instructions: [
      {
        step_number: 1,
        title: "Bungkus Pisang dan Coklat",
        instruction: "Pertama, bentangkan satu lembar kulit lumpia di talenan bersih. Taruh sepotong pisang matang di bagian bawah, beri taburan meises coklat melimpah di atasnya.",
        duration_minutes: 3,
        tips: "Jangan menaruh coklat terlalu dekat ke tepi agar tidak meleleh keluar saat digoreng."
      },
      {
        step_number: 2,
        title: "Gulung Rapat dan Rekatkan Ujungnya",
        instruction: "Kedua, lipat sisi kanan dan kiri kulit lumpia ke arah dalam, lalu gulung rapat ke atas. Oleskan sedikit larutan tepung terigu pada ujung kulit lumpia dan tekan agar terkunci rapat.",
        duration_minutes: 3,
        tips: "Pastikan gulungan padat dan tidak ada celah berlubang."
      },
      {
        step_number: 3,
        title: "Goreng dengan Api Sedang",
        instruction: "Ketiga, panaskan minyak di wajan dengan api sedang. Masukkan gulungan piscok satu per satu. Goreng selama sekitar empat hingga lima menit sambil dibalik perlahan sampai kulit lumpia garing berwarna cokelat keemasan.",
        duration_minutes: 5,
        tips: "Gunakan api sedang cenderung kecil agar kulit garing renyah tanpa membuat coklat di dalam gosong terbakar."
      },
      {
        step_number: 4,
        title: "Tiriskan dan Nikmati Lumerannya",
        instruction: "Keempat, angkat piscok dan tiriskan di atas saringan. Diamkan satu hingga dua menit agar coklat di dalamnya tidak membakar lidah, lalu nikmati sensasi lumeran coklatnya.",
        duration_minutes: 2,
        tips: "Sangat lezat disajikan dengan kucuran susu kental manis coklat ekstra!"
      }
    ]
  }
];
