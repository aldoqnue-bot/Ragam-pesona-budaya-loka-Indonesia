document.addEventListener('DOMContentLoaded', function() {
    // Array berisi pesan-pesan tentang budaya Indonesia
    const pesanBudaya = [
        "Batik diakui oleh UNESCO sebagai Warisan Kemanusiaan untuk Budaya Lisan dan Nonbendawi.",
        "Angklung, alat musik dari Jawa Barat, juga telah diakui sebagai Warisan Budaya Takbenda oleh UNESCO.",
        "Wayang Kulit adalah seni pertunjukan bayangan yang sarat filosofi hidup.",
        "Setiap provinsi di Indonesia memiliki setidaknya satu rumah adat dengan arsitektur yang unik.",
        "Rendang, masakan khas Sumatera Barat, pernah dinobatkan sebagai makanan terlezat di dunia.",
        "Indonesia memiliki lebih dari 700 bahasa daerah yang berbeda!",
        "Tari Kecak dari Bali melibatkan gerakan ritmis dan suara 'cak' untuk mengusir roh jahat.",
        "Candi Borobudur adalah candi Buddha terbesar di dunia, dibangun pada abad ke-9.",
        "Rumah Tongkonan Toraja melambangkan perahu terbalik dan digunakan dalam upacara kematian.",
        "Angklung dimainkan dengan cara digoyang dan menghasilkan melodi harmonis tanpa nada salah."
    ];

    const tombolPesan = document.getElementById('tombol-pesan');
    const outputPesan = document.getElementById('output-pesan');

    // Fungsi untuk memilih dan menampilkan pesan acak
    function tampilkanPesanAcak() {
        // Mendapatkan indeks acak dari array
        const indeksAcak = Math.floor(Math.random() * pesanBudaya.length);

        // Menampilkan pesan pada elemen output
        outputPesan.textContent = pesanBudaya[indeksAcak];
    }

    // Menambahkan event listener pada tombol
    tombolPesan.addEventListener('click', tampilkanPesanAcak);

    // Kuis Budaya
    const pertanyaanKuis = [
        {
            pertanyaan: "Apa nama alat musik bambu dari Jawa Barat yang diakui UNESCO?",
            pilihan: ["Angklung", "Gamelan", "Suling", "Kendang"],
            jawaban: "Angklung"
        },
        {
            pertanyaan: "Tari Kecak berasal dari daerah mana?",
            pilihan: ["Bali", "Jawa", "Sumatera", "Sulawesi"],
            jawaban: "Bali"
        },
        {
            pertanyaan: "Apa nama candi Buddha terbesar di dunia yang terletak di Indonesia?",
            pilihan: ["Borobudur", "Prambanan", "Mendut", "Sewu"],
            jawaban: "Borobudur"
        },
        {
            pertanyaan: "Rumah adat Minangkabau yang tahan gempa disebut?",
            pilihan: ["Rumah Gadang", "Rumah Joglo", "Rumah Tongkonan", "Rumah Limas"],
            jawaban: "Rumah Gadang"
        },
        {
            pertanyaan: "Masakan rendang berasal dari provinsi mana?",
            pilihan: ["Sumatera Barat", "Jawa Barat", "Bali", "Sulawesi Selatan"],
            jawaban: "Sumatera Barat"
        }
    ];

    let indeksPertanyaanSekarang = 0;
    let skor = 0;

    const elemenPertanyaan = document.getElementById('pertanyaan');
    const elemenPilihan = document.getElementById('pilihan');
    const tombolJawab = document.getElementById('tombol-jawab');
    const hasilKuis = document.getElementById('hasil-kuis');

    function tampilkanPertanyaan() {
        const pertanyaanSekarang = pertanyaanKuis[indeksPertanyaanSekarang];
        elemenPertanyaan.textContent = pertanyaanSekarang.pertanyaan;
        elemenPilihan.innerHTML = '';

        pertanyaanSekarang.pilihan.forEach(pilihan => {
            const tombolPilihan = document.createElement('button');
            tombolPilihan.textContent = pilihan;
            tombolPilihan.classList.add('pilihan-kuis');
            tombolPilihan.addEventListener('click', () => pilihPilihan(tombolPilihan, pilihan));
            elemenPilihan.appendChild(tombolPilihan);
        });

        hasilKuis.textContent = '';
    }

    function pilihPilihan(tombol, pilihan) {
        const tombolPilihan = document.querySelectorAll('.pilihan-kuis');
        tombolPilihan.forEach(btn => btn.classList.remove('selected'));
        tombol.classList.add('selected');
        tombol.dataset.pilihan = pilihan;
    }

    function jawabPertanyaan() {
        const pilihanTerpilih = document.querySelector('.pilihan-kuis.selected');
        if (!pilihanTerpilih) {
            hasilKuis.textContent = 'Silakan pilih jawaban terlebih dahulu!';
            return;
        }

        const jawaban = pilihanTerpilih.dataset.pilihan;
        const pertanyaanSekarang = pertanyaanKuis[indeksPertanyaanSekarang];

        if (jawaban === pertanyaanSekarang.jawaban) {
            skor++;
            hasilKuis.textContent = 'Benar! 🎉';
        } else {
            hasilKuis.textContent = `Salah! Jawaban yang benar adalah: ${pertanyaanSekarang.jawaban}`;
        }

        indeksPertanyaanSekarang++;
        if (indeksPertanyaanSekarang < pertanyaanKuis.length) {
            setTimeout(tampilkanPertanyaan, 2000);
        } else {
            setTimeout(() => {
                hasilKuis.textContent = `Kuis selesai! Skor Anda: ${skor}/${pertanyaanKuis.length}`;
                indeksPertanyaanSekarang = 0;
                skor = 0;
                setTimeout(tampilkanPertanyaan, 3000);
            }, 2000);
        }
    }

    tombolJawab.addEventListener('click', jawabPertanyaan);

    // Mulai kuis
    tampilkanPertanyaan();

    // Modal functionality
    const btnDetails = document.querySelectorAll('.btn-detail');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close');

    btnDetails.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const modal = document.getElementById(targetId);
            modal.style.display = 'block';
        });
    });

    closeButtons.forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
});
