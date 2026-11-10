# İngilizce Yolculuğum

Sıfırdan (I, you, he, she…) A1 seviyesinde hikaye okuyabilecek düzeye kadar kişisel İngilizce uygulaması.
iPad'e Safari üzerinden **Ana Ekrana Ekle** ile yüklenir, uygulama gibi açılır ve internetsiz çalışır.

## İçerik
- **17 ünite**: selamlaşma → zamirler → am/is/are → olumsuz/soru → sayılar → a/an, renkler → aile, my/your →
  this/that, çoğul → have/has → there is/are, edatlar → geniş zaman (2 ünite) → soru kelimeleri, günler →
  can → şimdiki zaman → was/were → geçmiş zaman
- Her ünitede: Türkçe konu anlatımı, emojili kelime kartları, örnek cümleler ve ~16 soruluk alıştırma
  (kelime seçme, dinleme, cümle kurma, boşluk doldurma). Geçmek için %50 gerekir.
- **10 A1 hikaye**: kelimeye dokununca anlamı, cümle cümle sesli okuma ve çeviri, anlama soruları
- **Tekrar**: öğrenilen kelimeler aralıklı tekrar sistemiyle (1-2-4-8-16 gün) yeniden sorulur
- Seri (🔥), XP, günlük hedef, yedekleme

## iPad'e yükleme
Uygulamanın bir **https** adresinde yayınlanması gerekir (ör. GitHub Pages veya Netlify — ücretsiz).
1. iPad'de Safari ile adresi aç
2. Paylaş (□↑) → **Ana Ekrana Ekle**

Daha doğal ses için iPad'de: Ayarlar → Erişilebilirlik → Seslendirilen İçerik → Sesler → İngilizce →
“Gelişmiş/Premium” bir ses indir, sonra uygulamanın Ayarlar sekmesinden seç.

## Bilgisayarda deneme
```bash
python -m http.server 8765
```
Sonra tarayıcıda http://localhost:8765 adresini aç.

## İçerik ekleme / güncelleme
- Üniteler: `content/units.js` · Hikayeler: `content/stories.js` · Sözlük: `content/dict.js`
- Yayınladıktan sonra iPad'in yeni sürümü alması için `sw.js` içindeki `VERSION` değerini artır (v1 → v2).
