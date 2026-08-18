/**
 * Helper kompresi dan penyesuaian ukuran gambar client-side (maksimal 2MB)
 * Secara otomatis menyesuaikan resolusi (downscale) dan kompresi kualitas JPEG/WebP
 */
export async function compressAndResizeImage(file, maxSizeBytes = 2 * 1024 * 1024, maxDimension = 1600) {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error('File tidak ditemukan'));
    }

    // Validasi tipe file
    if (!file.type.startsWith('image/')) {
      return reject(new Error('Format file harus berupa gambar (JPG, PNG, WebP)'));
    }

    const originalSize = file.size;
    const reader = new FileReader();

    reader.onload = (readerEvent) => {
      const img = new window.Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // 1. Skala dimensi jika melebihi batas maksimum
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        // Isi background putih agar PNG transparan ter-render baik jika di-convert ke JPEG
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        // 2. Loop kompresi adaptif untuk memastikan ukuran < maxSizeBytes (2MB)
        let quality = 0.88;
        let dataUrl = canvas.toDataURL('image/jpeg', quality);

        // Perkirakan ukuran base64 dalam bytes: (length * 3) / 4
        let estimatedSize = Math.round((dataUrl.length * 3) / 4);

        while (estimatedSize > maxSizeBytes && quality > 0.3) {
          quality -= 0.12;
          dataUrl = canvas.toDataURL('image/jpeg', quality);
          estimatedSize = Math.round((dataUrl.length * 3) / 4);
        }

        resolve({
          dataUrl,
          originalSize,
          compressedSize: estimatedSize,
          width,
          height,
          quality: Math.round(quality * 100)
        });
      };

      img.onerror = () => reject(new Error('Gagal memproses file gambar'));
      img.src = readerEvent.target.result;
    };

    reader.onerror = () => reject(new Error('Gagal membaca file'));
    reader.readAsDataURL(file);
  });
}

/**
 * Format bytes to readable size (e.g. 1.8 MB, 350 KB)
 */
export function formatFileSize(bytes) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}
