/* Hikayelerde kelimeye dokununca çıkan sözlük.
   Ünitelerdeki kelimeler otomatik eklenir; burası ek kelimeler ve düzensiz biçimler içindir. */

const DICT = {
  // küçük kelimeler
  "a": "bir", "an": "bir", "the": "(belirli tanımlık)", "and": "ve", "but": "ama", "or": "veya",
  "so": "bu yüzden; çok", "too": "de, da; çok", "to": "-e, -a; -mek", "of": "-nin", "for": "için; -i",
  "with": "ile, birlikte", "at": "-de; saat ...'de", "in": "içinde, -de", "on": "üstünde; -de",
  "about": "hakkında", "all": "hepsi, bütün", "some": "biraz, bazı", "many": "birçok, çok",
  "a lot": "çok", "lot": "(a lot of) çok", "every": "her", "everybody": "herkes", "very": "çok",
  "often": "sık sık", "early": "erken", "alone": "yalnız", "again": "tekrar", "also": "ayrıca",

  // zamirler ve biçimleri
  "me": "beni, bana", "him": "onu, ona (erkek)", "us": "bizi, bize", "them": "onları, onlara",
  "its": "onun (hayvan/eşya)", "our": "bizim", "their": "onların",
  "i'm": "ben ...ım (I am)", "you're": "sen ...sın (you are)", "he's": "o ...dır (he is)",
  "she's": "o ...dır (she is)", "it's": "o ...dır (it is)", "we're": "biz ...ız (we are)",
  "they're": "onlar ...dır (they are)", "isn't": "değil (is not)", "aren't": "değil (are not)",
  "don't": "-mez, -maz (do not)", "doesn't": "-mez, -maz (does not)", "didn't": "-medi (did not)",
  "wasn't": "değildi (was not)", "weren't": "değildi (were not)", "cannot": "-emez",
  "am": "-ım (olmak)", "is": "-dır (olmak)", "are": "-dır, -sın, -ız (olmak)", "be": "olmak",
  "does": "(he/she/it için yardımcı fiil)", "did": "yaptı; (geçmiş yardımcı fiil)",

  // düzensiz biçimler
  "men": "adamlar (man)", "women": "kadınlar (woman)", "child": "çocuk", "person": "kişi",
  "got": "aldı; kalktı (get up → got up)", "get": "almak, olmak", "swam": "yüzdü (swim)",
  "drank": "içti (drink)", "ran": "koştu (run)", "gave": "verdi (give)", "give": "vermek",
  "said": "dedi (say)", "say": "demek, söylemek", "says": "der (say)", "found": "buldu (find)",
  "find": "bulmak", "see": "görmek", "come": "gelmek", "buy": "satın almak", "make": "yapmak",
  "take": "almak, götürmek; binmek (otobüse)", "visit": "ziyaret etmek", "flies": "uçar (fly)",
  "studies": "okur, çalışır (study)", "study": "ders çalışmak, okumak", "goes": "gider (go)",
  "watches": "izler (watch)", "washes": "yıkar (wash)", "slept": "uyudu (sleep)", "stop": "durmak",
  "sat": "oturdu (sit)", "wrote": "yazdı (write)", "spoke": "konuştu (speak)", "sang": "şarkı söyledi (sing)",

  // ünitelerdeki çok kelimeli ifadelerin parçaları
  "good": "iyi", "morning": "sabah", "night": "gece", "thank": "teşekkür etmek", "thanks": "teşekkürler",
  "meet": "tanışmak, buluşmak", "bye": "görüşürüz", "how": "nasıl", "old": "yaşlı, eski",
  "years": "yıllar (… years old = … yaşında)", "year": "yıl", "next": "sonraki (next to = yanında)",
  "last": "son, geçen", "week": "hafta", "o'clock": "saat (tam)", "up": "yukarı (get up = kalkmak)",
  "home": "ev; eve", "day": "gün", "days": "günler",

  // sayılar
  "thirteen": "on üç", "fourteen": "on dört", "fifteen": "on beş", "sixteen": "on altı",
  "seventeen": "on yedi", "eighteen": "on sekiz", "nineteen": "on dokuz",

  // isimler
  "sky": "gökyüzü", "letter": "mektup", "bus": "otobüs", "face": "yüz", "class": "sınıf",
  "classmates": "sınıf arkadaşları", "classmate": "sınıf arkadaşı", "country": "ülke", "countries": "ülkeler",
  "museum": "müze", "café": "kafe", "cafe": "kafe", "winter": "kış", "weather": "hava (durumu)",
  "sand": "kum", "sandcastle": "kumdan kale", "sandwich": "sandviç", "sandwiches": "sandviçler",
  "boat": "tekne, kayık", "noon": "öğle vakti", "ice": "buz", "cream": "krema (ice cream = dondurma)",
  "story": "hikaye", "hug": "sarılma", "film": "film", "cake": "kek, pasta", "pizza": "pizza",
  "homework": "ödev", "fish": "balık", "start": "başlangıç; başlamak", "end": "son",
  "girl": "kız çocuk", "london": "Londra", "spain": "İspanya", "izmir": "İzmir", "istanbul": "İstanbul",
  "ankara": "Ankara", "bursa": "Bursa",

  // fiiller
  "laugh": "gülmek", "call": "aramak; seslenmek", "miss": "özlemek; kaçırmak", "shine": "parlamak",
  "shining": "parlıyor (shine)", "happen": "olmak, gerçekleşmek", "happens": "olur (happen)",
  "know": "bilmek", "want": "istemek", "need": "ihtiyacı olmak", "open": "açmak", "close": "kapatmak",

  // sıfatlar
  "little": "küçük", "funny": "komik", "afraid": "korkmuş", "beautiful": "güzel", "great": "harika",
  "sunny": "güneşli", "rainy": "yağmurlu", "lost": "kayıp", "nice": "güzel, hoş, iyi",

  // ünlemler
  "oh": "ah, oh", "look": "bakmak; bak!", "hey": "hey"
};
