/* Ders içerikleri
   words:     [İngilizce, Türkçe, emoji]
   sentences: [İngilizce, Türkçe]
   fills:     [boşluklu cümle, doğru cevap, [yanlış seçenekler], Türkçe ipucu]
   Ünitede <span class="say">...</span> içine yazılan her şey dokununca seslendirilir. */

const UNITS = [
{
  id: "u1", icon: "👋", title: "Merhaba!", subtitle: "Selamlaşma ve tanışma",
  grammar: `
    <p>İlk adım: selamlaşmak. Her ifadeye <b>dokun ve dinle</b>, sonra sesli tekrar et.</p>
    <table class="g">
      <tr><td><span class="say">Hello!</span></td><td>Merhaba!</td></tr>
      <tr><td><span class="say">Hi!</span></td><td>Selam!</td></tr>
      <tr><td><span class="say">Good morning.</span></td><td>Günaydın.</td></tr>
      <tr><td><span class="say">Good night.</span></td><td>İyi geceler.</td></tr>
      <tr><td><span class="say">Goodbye. / Bye!</span></td><td>Hoşça kal. / Görüşürüz!</td></tr>
      <tr><td><span class="say">Thank you.</span></td><td>Teşekkür ederim.</td></tr>
    </table>
    <h4>Tanışma</h4>
    <p><span class="say">What is your name?</span> → Adın ne?<br>
       <span class="say">My name is Ali.</span> → Benim adım Ali.<br>
       <span class="say">Nice to meet you.</span> → Tanıştığıma memnun oldum.</p>
    <div class="tip">💡 İngilizce yazıldığı gibi okunmaz. Bu yüzden her kelimeyi mutlaka <b>dinleyerek</b> öğren.</div>`,
  words: [
    ["hello", "merhaba", "👋"], ["hi", "selam", "🙋"], ["goodbye", "hoşça kal", "👋"],
    ["good morning", "günaydın", "🌅"], ["good night", "iyi geceler", "🌙"],
    ["thank you", "teşekkür ederim", "🙏"], ["please", "lütfen", "🥺"],
    ["yes", "evet", "✅"], ["no", "hayır", "❌"], ["sorry", "özür dilerim / pardon", "😔"],
    ["name", "isim, ad", "🏷️"], ["nice", "güzel, hoş", "😊"]
  ],
  sentences: [
    ["Hello, my name is Ali.", "Merhaba, benim adım Ali."],
    ["What is your name?", "Senin adın ne?"],
    ["My name is Elif.", "Benim adım Elif."],
    ["Nice to meet you.", "Tanıştığıma memnun oldum."],
    ["Good morning, Ali.", "Günaydın, Ali."],
    ["Yes, please.", "Evet, lütfen."],
    ["No, thank you.", "Hayır, teşekkür ederim."],
    ["Goodbye, Elif.", "Hoşça kal, Elif."]
  ],
  fills: [
    ["My ___ is Ali.", "name", ["nice", "yes"], "Benim adım Ali."],
    ["Good ___!", "morning", ["name", "please"], "Günaydın!"],
    ["Thank ___.", "you", ["your", "my"], "Teşekkür ederim."],
    ["What is ___ name?", "your", ["you", "yes"], "Senin adın ne?"],
    ["Nice to ___ you.", "meet", ["name", "thank"], "Tanıştığıma memnun oldum."]
  ]
},
{
  id: "u2", icon: "🧑", title: "Ben, Sen, O", subtitle: "I, you, he, she, it, we, they",
  grammar: `
    <p>Türkçede tek bir <b>“o”</b> var. İngilizcede ise üç tane: erkek için <b>he</b>, kadın için <b>she</b>, hayvan ve eşya için <b>it</b>.</p>
    <table class="g">
      <tr><td><span class="say">I</span></td><td>ben</td></tr>
      <tr><td><span class="say">you</span></td><td>sen / siz</td></tr>
      <tr><td><span class="say">he</span></td><td>o (erkek) 👨</td></tr>
      <tr><td><span class="say">she</span></td><td>o (kadın) 👩</td></tr>
      <tr><td><span class="say">it</span></td><td>o (hayvan, eşya) 🐱📦</td></tr>
      <tr><td><span class="say">we</span></td><td>biz</td></tr>
      <tr><td><span class="say">they</span></td><td>onlar</td></tr>
    </table>
    <p><b>I</b> (ben) her zaman büyük harfle yazılır.</p>
    <h4>Örnekler</h4>
    <p><span class="say">He is a boy.</span> → O bir erkek çocuk.<br>
       <span class="say">She is a girl.</span> → O bir kız çocuk.<br>
       <span class="say">It is a cat.</span> → O bir kedi.</p>
    <div class="tip">💡 <b>a</b> = bir. <b>is</b> kelimesini bir sonraki derste öğreneceksin, şimdilik “-dır” gibi düşün.</div>`,
  words: [
    ["I", "ben", "🙋"], ["you", "sen, siz", "👉"], ["he", "o (erkek)", "👨"],
    ["she", "o (kadın)", "👩"], ["it", "o (hayvan, eşya)", "📦"], ["we", "biz", "👫"],
    ["they", "onlar", "👨‍👩‍👧"], ["man", "adam", "👨"], ["woman", "kadın", "👩"],
    ["boy", "erkek çocuk", "👦"], ["girl", "kız çocuk", "👧"], ["cat", "kedi", "🐱"],
    ["dog", "köpek", "🐶"], ["and", "ve", "➕"]
  ],
  sentences: [
    ["He is a boy.", "O bir erkek çocuk."],
    ["She is a girl.", "O bir kız çocuk."],
    ["It is a cat.", "O bir kedi."],
    ["It is a dog.", "O bir köpek."],
    ["He is a man.", "O bir adam."],
    ["She is a woman.", "O bir kadın."],
    ["A cat and a dog.", "Bir kedi ve bir köpek."]
  ],
  fills: [
    ["___ is a boy.", "He", ["She", "It"], "O bir erkek çocuk."],
    ["___ is a girl.", "She", ["He", "It"], "O bir kız çocuk."],
    ["___ is a dog.", "It", ["He", "She"], "O bir köpek."],
    ["Ali and Elif → ___", "they", ["we", "it"], "Ali ve Elif → onlar"],
    ["You and I → ___", "we", ["they", "he"], "Sen ve ben → biz"],
    ["Elif → ___", "she", ["he", "it"], "Elif bir kız."]
  ]
},
{
  id: "u3", icon: "🙂", title: "am / is / are", subtitle: "Olmak fiili: -ım, -sın, -dır",
  grammar: `
    <p>Türkçede “öğrenci<b>yim</b>”, “mutlu<b>sun</b>” gibi ekler kullanırız. İngilizcede bunun yerine <b>am / is / are</b> kelimeleri gelir.</p>
    <table class="g">
      <tr><td><span class="say">I am</span></td><td>ben ...ım</td><td><span class="say">I'm</span></td></tr>
      <tr><td><span class="say">you are</span></td><td>sen ...sın</td><td><span class="say">you're</span></td></tr>
      <tr><td><span class="say">he is</span></td><td>o ...dır</td><td><span class="say">he's</span></td></tr>
      <tr><td><span class="say">she is</span></td><td>o ...dır</td><td><span class="say">she's</span></td></tr>
      <tr><td><span class="say">it is</span></td><td>o ...dır</td><td><span class="say">it's</span></td></tr>
      <tr><td><span class="say">we are</span></td><td>biz ...ız</td><td><span class="say">we're</span></td></tr>
      <tr><td><span class="say">they are</span></td><td>onlar ...dır</td><td><span class="say">they're</span></td></tr>
    </table>
    <h4>Örnekler</h4>
    <p><span class="say">I am a student.</span> → Ben bir öğrenciyim.<br>
       <span class="say">She is happy.</span> → O mutlu.<br>
       <span class="say">We are from Turkey.</span> → Biz Türkiye'deniz (Türk'üz).</p>
    <div class="tip">💡 Kolay kural: <b>I → am</b>, tekil (he, she, it) → <b>is</b>, çoğul ve you → <b>are</b>.</div>`,
  words: [
    ["student", "öğrenci", "🎓"], ["teacher", "öğretmen", "👩‍🏫"], ["doctor", "doktor", "🩺"],
    ["happy", "mutlu", "😊"], ["sad", "üzgün", "😢"], ["tired", "yorgun", "😩"],
    ["hungry", "aç", "🍽️"], ["from", "-den, -dan", "📍"], ["friend", "arkadaş", "🤝"],
    ["Turkey", "Türkiye", "🇹🇷"], ["England", "İngiltere", "🇬🇧"], ["very", "çok", "💯"]
  ],
  sentences: [
    ["I am a student.", "Ben bir öğrenciyim."],
    ["You are a teacher.", "Sen bir öğretmensin."],
    ["He is a doctor.", "O bir doktor."],
    ["She is happy.", "O mutlu."],
    ["We are tired.", "Biz yorgunuz."],
    ["They are very hungry.", "Onlar çok aç."],
    ["I am from Turkey.", "Ben Türkiye'denim."],
    ["He's from England.", "O İngiltere'den."]
  ],
  fills: [
    ["I ___ a student.", "am", ["is", "are"], "Ben bir öğrenciyim."],
    ["She ___ happy.", "is", ["am", "are"], "O mutlu."],
    ["They ___ tired.", "are", ["am", "is"], "Onlar yorgun."],
    ["We ___ from Turkey.", "are", ["is", "am"], "Biz Türkiye'deniz."],
    ["It ___ a cat.", "is", ["am", "are"], "O bir kedi."],
    ["You ___ my friend.", "are", ["is", "am"], "Sen benim arkadaşımsın."],
    ["___ am hungry.", "I", ["He", "They"], "Ben açım."]
  ]
},
{
  id: "u4", icon: "❓", title: "Değil ve Soru", subtitle: "isn't, aren't, Are you...?",
  grammar: `
    <h4>Olumsuz: not = değil</h4>
    <table class="g">
      <tr><td><span class="say">I am not tired.</span></td><td>Yorgun değilim.</td></tr>
      <tr><td><span class="say">He is not old.</span> = <span class="say">He isn't old.</span></td><td>O yaşlı değil.</td></tr>
      <tr><td><span class="say">They are not here.</span> = <span class="say">They aren't here.</span></td><td>Onlar burada değil.</td></tr>
    </table>
    <h4>Soru: kelimeyi başa al</h4>
    <p><span class="say">You are happy.</span> → <span class="say">Are you happy?</span> (Mutlu musun?)<br>
       <span class="say">She is a doctor.</span> → <span class="say">Is she a doctor?</span> (O doktor mu?)</p>
    <h4>Kısa cevaplar</h4>
    <p><span class="say">Yes, I am.</span> / <span class="say">No, I'm not.</span><br>
       <span class="say">Yes, he is.</span> / <span class="say">No, he isn't.</span><br>
       <span class="say">Yes, they are.</span> / <span class="say">No, they aren't.</span></p>
    <div class="tip">💡 Türkçedeki “mi, mı, mu” eki yerine İngilizcede <b>am / is / are</b> cümlenin başına geçer.</div>`,
  words: [
    ["big", "büyük", "🐘"], ["small", "küçük", "🐭"], ["hot", "sıcak", "🔥"],
    ["cold", "soğuk", "🧊"], ["old", "yaşlı, eski", "👴"], ["young", "genç", "🧒"],
    ["new", "yeni", "✨"], ["good", "iyi", "👍"], ["bad", "kötü", "👎"],
    ["here", "burada", "📍"], ["there", "orada", "👉"], ["not", "değil", "🚫"]
  ],
  sentences: [
    ["I am not tired.", "Ben yorgun değilim."],
    ["He is not a teacher.", "O bir öğretmen değil."],
    ["It isn't cold.", "O soğuk değil."],
    ["They aren't here.", "Onlar burada değil."],
    ["Are you hungry?", "Aç mısın?"],
    ["Is she a doctor?", "O bir doktor mu?"],
    ["No, she isn't.", "Hayır, değil."],
    ["Is it big?", "O büyük mü?"]
  ],
  fills: [
    ["He ___ not old.", "is", ["am", "are"], "O yaşlı değil."],
    ["They ___ here.", "aren't", ["isn't", "not"], "Onlar burada değil."],
    ["___ you happy?", "Are", ["Is", "Am"], "Mutlu musun?"],
    ["___ he a student?", "Is", ["Are", "Am"], "O bir öğrenci mi?"],
    ["Is it cold? — Yes, it ___.", "is", ["are", "am"], "Soğuk mu? — Evet, soğuk."],
    ["Are you tired? — No, I'm ___.", "not", ["no", "isn't"], "Yorgun musun? — Hayır, değilim."]
  ]
},
{
  id: "u5", icon: "🔢", title: "Sayılar", subtitle: "1–20 ve yaş sormak",
  grammar: `
    <table class="g nums">
      <tr><td><span class="say">one</span> 1</td><td><span class="say">two</span> 2</td><td><span class="say">three</span> 3</td><td><span class="say">four</span> 4</td></tr>
      <tr><td><span class="say">five</span> 5</td><td><span class="say">six</span> 6</td><td><span class="say">seven</span> 7</td><td><span class="say">eight</span> 8</td></tr>
      <tr><td><span class="say">nine</span> 9</td><td><span class="say">ten</span> 10</td><td><span class="say">eleven</span> 11</td><td><span class="say">twelve</span> 12</td></tr>
      <tr><td><span class="say">thirteen</span> 13</td><td><span class="say">fourteen</span> 14</td><td><span class="say">fifteen</span> 15</td><td><span class="say">sixteen</span> 16</td></tr>
      <tr><td><span class="say">seventeen</span> 17</td><td><span class="say">eighteen</span> 18</td><td><span class="say">nineteen</span> 19</td><td><span class="say">twenty</span> 20</td></tr>
    </table>
    <p>13–19 arası sayılar <b>-teen</b> ile biter.</p>
    <h4>Yaş sormak</h4>
    <p><span class="say">How old are you?</span> → Kaç yaşındasın?<br>
       <span class="say">I am ten years old.</span> → On yaşındayım.<br>
       <span class="say">I am ten.</span> → (kısaca) Onum.</p>
    <h4>Kaç tane?</h4>
    <p><span class="say">How many cats?</span> → Kaç kedi?<br>
       <span class="say">Three cats.</span> → Üç kedi.</p>
    <div class="tip">💡 Birden fazlaysa kelimenin sonuna <b>-s</b> gelir: one cat → two cat<b>s</b>. Ama Türkçedeki gibi: “üç kedi” (kediler değil).</div>`,
  words: [
    ["one", "bir (1)", "1️⃣"], ["two", "iki (2)", "2️⃣"], ["three", "üç (3)", "3️⃣"],
    ["four", "dört (4)", "4️⃣"], ["five", "beş (5)", "5️⃣"], ["six", "altı (6)", "6️⃣"],
    ["seven", "yedi (7)", "7️⃣"], ["eight", "sekiz (8)", "8️⃣"], ["nine", "dokuz (9)", "9️⃣"],
    ["ten", "on (10)", "🔟"], ["eleven", "on bir (11)", "🕚"], ["twelve", "on iki (12)", "🕛"],
    ["twenty", "yirmi (20)", "2️⃣0️⃣"], ["how many", "kaç tane", "🔢"]
  ],
  sentences: [
    ["I am ten years old.", "Ben on yaşındayım."],
    ["How old are you?", "Kaç yaşındasın?"],
    ["She is seven.", "O yedi yaşında."],
    ["He is twenty years old.", "O yirmi yaşında."],
    ["How many cats?", "Kaç tane kedi?"],
    ["Two dogs and one cat.", "İki köpek ve bir kedi."]
  ],
  fills: [
    ["two + three = ___", "five", ["four", "six"], "iki + üç = beş"],
    ["How ___ are you?", "old", ["many", "is"], "Kaç yaşındasın?"],
    ["I ___ nine years old.", "am", ["is", "are"], "Dokuz yaşındayım."],
    ["ten + two = ___", "twelve", ["eleven", "twenty"], "on + iki = on iki"],
    ["one, two, ___, four", "three", ["five", "ten"], "bir, iki, üç, dört"],
    ["How ___ dogs? — Two dogs.", "many", ["old", "are"], "Kaç köpek? — İki köpek."]
  ]
},
{
  id: "u6", icon: "🎨", title: "Renkler ve a / an", subtitle: "Eşyalar, renkler, the",
  grammar: `
    <h4>a / an = bir</h4>
    <p>Kelime <b>sesli harf sesiyle</b> (a, e, i, o, u) başlıyorsa <b>an</b>, diğerlerinde <b>a</b> kullanılır.</p>
    <table class="g">
      <tr><td><span class="say">a book</span>, <span class="say">a pen</span>, <span class="say">a car</span></td><td>bir kitap, bir kalem, bir araba</td></tr>
      <tr><td><span class="say">an apple</span>, <span class="say">an egg</span>, <span class="say">an umbrella</span></td><td>bir elma, bir yumurta, bir şemsiye</td></tr>
    </table>
    <h4>Renk isimden önce gelir</h4>
    <p><span class="say">a red car</span> → kırmızı bir araba<br>
       <span class="say">a red apple</span> → kırmızı bir elma (red “r” ile başlar → <b>a</b>)</p>
    <h4>the = belirli olan</h4>
    <p><span class="say">a bag</span> → bir çanta (herhangi biri)<br>
       <span class="say">The bag is black.</span> → Çanta siyah. (bildiğimiz çanta)</p>
    <h4>Renk sormak</h4>
    <p><span class="say">What color is it?</span> → O ne renk?<br><span class="say">It is green.</span> → Yeşil.</p>`,
  words: [
    ["red", "kırmızı", "🔴"], ["blue", "mavi", "🔵"], ["green", "yeşil", "🟢"],
    ["yellow", "sarı", "🟡"], ["black", "siyah", "⚫"], ["white", "beyaz", "⚪"],
    ["orange", "turuncu; portakal", "🍊"], ["book", "kitap", "📖"], ["pen", "kalem", "🖊️"],
    ["apple", "elma", "🍎"], ["egg", "yumurta", "🥚"], ["bag", "çanta", "👜"],
    ["umbrella", "şemsiye", "☂️"], ["car", "araba", "🚗"], ["color", "renk", "🎨"]
  ],
  sentences: [
    ["It is a red car.", "O kırmızı bir araba."],
    ["It is an apple.", "O bir elma."],
    ["The bag is black.", "Çanta siyah."],
    ["What color is it?", "O ne renk?"],
    ["It is green.", "O yeşil."],
    ["The umbrella is yellow.", "Şemsiye sarı."],
    ["A blue pen and a white book.", "Mavi bir kalem ve beyaz bir kitap."]
  ],
  fills: [
    ["It is ___ apple.", "an", ["a", "two"], "O bir elma."],
    ["It is ___ book.", "a", ["an", "two"], "O bir kitap."],
    ["It is ___ egg.", "an", ["a", "one"], "O bir yumurta."],
    ["It is ___ red bag.", "a", ["an", "two"], "O kırmızı bir çanta."],
    ["It is ___ umbrella.", "an", ["a", "two"], "O bir şemsiye."],
    ["The sky is ___.", "blue", ["red", "black"], "Gökyüzü mavi."]
  ]
},
{
  id: "u7", icon: "👨‍👩‍👧", title: "Ailem", subtitle: "my, your, his, her, 's",
  grammar: `
    <h4>Kimin? (iyelik sıfatları)</h4>
    <table class="g">
      <tr><td><span class="say">my</span></td><td>benim</td><td><span class="say">my mother</span> = annem</td></tr>
      <tr><td><span class="say">your</span></td><td>senin / sizin</td><td><span class="say">your father</span> = baban</td></tr>
      <tr><td><span class="say">his</span></td><td>onun (erkek)</td><td><span class="say">his sister</span></td></tr>
      <tr><td><span class="say">her</span></td><td>onun (kadın)</td><td><span class="say">her brother</span></td></tr>
      <tr><td><span class="say">its</span></td><td>onun (hayvan/eşya)</td><td><span class="say">its name</span></td></tr>
      <tr><td><span class="say">our</span></td><td>bizim</td><td><span class="say">our family</span></td></tr>
      <tr><td><span class="say">their</span></td><td>onların</td><td><span class="say">their baby</span></td></tr>
    </table>
    <h4>'s = -nın, -nin</h4>
    <p><span class="say">Ali's mother</span> → Ali'nin annesi<br>
       <span class="say">Elif's dog</span> → Elif'in köpeği</p>
    <h4>This is ... = Bu ...</h4>
    <p><span class="say">This is my brother.</span> → Bu benim erkek kardeşim.</p>
    <div class="tip">💡 Türkçede “annem” tek kelime; İngilizcede iki kelime: <b>my mother</b>.</div>`,
  words: [
    ["mother", "anne", "👩"], ["father", "baba", "👨"], ["sister", "kız kardeş", "👧"],
    ["brother", "erkek kardeş", "👦"], ["baby", "bebek", "👶"], ["family", "aile", "👨‍👩‍👧"],
    ["grandmother", "büyükanne, nine", "👵"], ["grandfather", "büyükbaba, dede", "👴"],
    ["son", "oğul", "👦"], ["daughter", "kız evlat", "👧"],
    ["my", "benim", "🙋"], ["your", "senin", "👉"], ["his", "onun (erkek)", "👨"], ["her", "onun (kadın)", "👩"]
  ],
  sentences: [
    ["This is my mother.", "Bu benim annem."],
    ["My father is a doctor.", "Babam bir doktor."],
    ["Her brother is ten.", "Onun erkek kardeşi on yaşında."],
    ["His sister is a student.", "Onun kız kardeşi bir öğrenci."],
    ["Our family is big.", "Bizim ailemiz büyük."],
    ["Their baby is small.", "Onların bebeği küçük."],
    ["Ali's grandmother is old.", "Ali'nin büyükannesi yaşlı."],
    ["Is your father a teacher?", "Baban öğretmen mi?"]
  ],
  fills: [
    ["I am Ali. ___ name is Ali.", "My", ["His", "Your"], "Ben Ali. Benim adım Ali."],
    ["She is Elif. ___ mother is a teacher.", "Her", ["His", "My"], "O Elif. Onun annesi öğretmen."],
    ["He is Can. ___ sister is six.", "His", ["Her", "Their"], "O Can. Onun kız kardeşi altı yaşında."],
    ["We are a family. ___ dog is big.", "Our", ["Their", "My"], "Biz bir aileyiz. Bizim köpeğimiz büyük."],
    ["They are students. ___ teacher is nice.", "Their", ["Our", "His"], "Onlar öğrenci. Onların öğretmeni iyi."],
    ["This is Ali___ dog.", "'s", ["s", "is"], "Bu Ali'nin köpeği."]
  ]
},
{
  id: "u8", icon: "👉", title: "Bu, Şu, Çoğul", subtitle: "this, that, these, those",
  grammar: `
    <table class="g">
      <tr><th></th><th>yakın</th><th>uzak</th></tr>
      <tr><td>tekil</td><td><span class="say">this</span> = bu</td><td><span class="say">that</span> = şu / o</td></tr>
      <tr><td>çoğul</td><td><span class="say">these</span> = bunlar</td><td><span class="say">those</span> = şunlar</td></tr>
    </table>
    <p><span class="say">This is a chair.</span> → Bu bir sandalye.<br>
       <span class="say">These are chairs.</span> → Bunlar sandalye.</p>
    <h4>Çoğul yapmak</h4>
    <table class="g">
      <tr><td>+ s</td><td><span class="say">cat → cats</span>, <span class="say">book → books</span></td></tr>
      <tr><td>+ es</td><td><span class="say">box → boxes</span>, <span class="say">bus → buses</span></td></tr>
      <tr><td>düzensiz</td><td><span class="say">man → men</span>, <span class="say">woman → women</span>, <span class="say">child → children</span>, <span class="say">person → people</span></td></tr>
    </table>
    <div class="tip">💡 Tekil → <b>is</b>, çoğul → <b>are</b>: This <b>is</b> a key. These <b>are</b> keys.</div>`,
  words: [
    ["this", "bu", "👇"], ["that", "şu, o", "👉"], ["these", "bunlar", "👇"],
    ["those", "şunlar", "👉"], ["chair", "sandalye", "🪑"], ["table", "masa", "🍽️"],
    ["house", "ev", "🏠"], ["door", "kapı", "🚪"], ["window", "pencere", "🪟"],
    ["box", "kutu", "📦"], ["children", "çocuklar", "🧒"], ["people", "insanlar", "👥"],
    ["flower", "çiçek", "🌸"], ["key", "anahtar", "🔑"]
  ],
  sentences: [
    ["This is a chair.", "Bu bir sandalye."],
    ["That is a house.", "Şu bir ev."],
    ["These are flowers.", "Bunlar çiçek."],
    ["Those are my keys.", "Şunlar benim anahtarlarım."],
    ["Is this your bag?", "Bu senin çantan mı?"],
    ["These boxes are big.", "Bu kutular büyük."],
    ["The children are happy.", "Çocuklar mutlu."]
  ],
  fills: [
    ["___ is a door.", "This", ["These", "Those"], "Bu bir kapı."],
    ["___ are windows.", "These", ["This", "That"], "Bunlar pencere."],
    ["That ___ my car.", "is", ["are", "am"], "Şu benim arabam."],
    ["Those ___ apples.", "are", ["is", "am"], "Şunlar elma."],
    ["one box, two ___", "boxes", ["boxs", "box"], "bir kutu, iki kutu"],
    ["one man, two ___", "men", ["mans", "man"], "bir adam, iki adam"],
    ["one child, three ___", "children", ["childs", "child"], "bir çocuk, üç çocuk"]
  ]
},
{
  id: "u9", icon: "🎒", title: "have / has", subtitle: "Benim ... var",
  grammar: `
    <p>Türkçedeki “Benim bir bisikletim <b>var</b>” cümlesi İngilizcede <b>have / has</b> ile kurulur.</p>
    <table class="g">
      <tr><td><span class="say">I have</span>, <span class="say">you have</span>, <span class="say">we have</span>, <span class="say">they have</span></td></tr>
      <tr><td><span class="say">he has</span>, <span class="say">she has</span>, <span class="say">it has</span></td></tr>
    </table>
    <p><span class="say">I have a bike.</span> → Bir bisikletim var.<br>
       <span class="say">She has a phone.</span> → Onun bir telefonu var.</p>
    <h4>Yok demek</h4>
    <p><span class="say">I don't have a car.</span> → Arabam yok.<br>
       <span class="say">He doesn't have a car.</span> → Onun arabası yok.</p>
    <h4>Soru</h4>
    <p><span class="say">Do you have a pen?</span> → Kalemin var mı?<br>
       <span class="say">Does she have a cat?</span> → Onun kedisi var mı?</p>
    <div class="tip">💡 he / she / it → <b>has</b>. Ama <b>doesn't</b> ve <b>does</b> ile tekrar <b>have</b> olur.</div>`,
  words: [
    ["have", "sahip olmak; -si var", "🤲"], ["has", "(o) -si var", "🤲"], ["garden", "bahçe", "🌳"],
    ["room", "oda", "🚪"], ["bike", "bisiklet", "🚲"], ["phone", "telefon", "📱"],
    ["computer", "bilgisayar", "💻"], ["hair", "saç", "💇"], ["eyes", "gözler", "👀"],
    ["long", "uzun", "📏"], ["short", "kısa", "✂️"], ["brown", "kahverengi", "🟤"], ["money", "para", "💰"]
  ],
  sentences: [
    ["I have a bike.", "Benim bir bisikletim var."],
    ["She has a phone.", "Onun bir telefonu var."],
    ["We have a big garden.", "Bizim büyük bir bahçemiz var."],
    ["He has brown eyes.", "Onun kahverengi gözleri var."],
    ["They have two children.", "Onların iki çocuğu var."],
    ["My sister has long hair.", "Kız kardeşimin uzun saçları var."],
    ["I don't have a computer.", "Benim bilgisayarım yok."],
    ["Do you have a pen?", "Kalemin var mı?"]
  ],
  fills: [
    ["I ___ a cat.", "have", ["has", "am"], "Bir kedim var."],
    ["She ___ a dog.", "has", ["have", "is"], "Onun bir köpeği var."],
    ["They ___ a car.", "have", ["has", "are"], "Onların bir arabası var."],
    ["My father ___ short hair.", "has", ["have", "are"], "Babamın kısa saçı var."],
    ["He doesn't ___ a bike.", "have", ["has", "is"], "Onun bisikleti yok."],
    ["___ you have a phone?", "Do", ["Does", "Are"], "Telefonun var mı?"]
  ]
},
{
  id: "u10", icon: "🏠", title: "Evim", subtitle: "There is / are, in, on, under",
  grammar: `
    <h4>... var / ... yok</h4>
    <table class="g">
      <tr><td><span class="say">There is a bed.</span></td><td>Bir yatak var. (tekil)</td></tr>
      <tr><td><span class="say">There are two beds.</span></td><td>İki yatak var. (çoğul)</td></tr>
      <tr><td><span class="say">There isn't a sofa.</span></td><td>Kanepe yok.</td></tr>
      <tr><td><span class="say">Is there a garden?</span></td><td>Bahçe var mı?</td></tr>
    </table>
    <h4>Nerede?</h4>
    <table class="g">
      <tr><td><span class="say">in</span></td><td>içinde</td><td><span class="say">in the box</span> 📦</td></tr>
      <tr><td><span class="say">on</span></td><td>üstünde</td><td><span class="say">on the table</span></td></tr>
      <tr><td><span class="say">under</span></td><td>altında</td><td><span class="say">under the bed</span></td></tr>
      <tr><td><span class="say">next to</span></td><td>yanında</td><td><span class="say">next to the door</span></td></tr>
      <tr><td><span class="say">behind</span></td><td>arkasında</td><td><span class="say">behind the house</span></td></tr>
    </table>
    <p><span class="say">The cat is under the table.</span> → Kedi masanın altında.</p>
    <div class="tip">💡 Türkçede “masanın altında” derken yer sonda; İngilizcede başta: <b>under</b> the table.</div>`,
  words: [
    ["kitchen", "mutfak", "🍳"], ["bedroom", "yatak odası", "🛏️"], ["bathroom", "banyo", "🛁"],
    ["bed", "yatak", "🛏️"], ["sofa", "kanepe", "🛋️"], ["tree", "ağaç", "🌲"],
    ["in", "içinde, -de", "📥"], ["on", "üstünde", "⬆️"], ["under", "altında", "⬇️"],
    ["next to", "yanında", "↔️"], ["behind", "arkasında", "🔙"], ["lamp", "lamba", "💡"],
    ["picture", "resim", "🖼️"], ["wall", "duvar", "🧱"]
  ],
  sentences: [
    ["There is a bed in my room.", "Odamda bir yatak var."],
    ["There are two chairs in the kitchen.", "Mutfakta iki sandalye var."],
    ["The cat is under the table.", "Kedi masanın altında."],
    ["The book is on the bed.", "Kitap yatağın üstünde."],
    ["The lamp is next to the sofa.", "Lamba kanepenin yanında."],
    ["Is there a garden?", "Bahçe var mı?"],
    ["There isn't a tree in the garden.", "Bahçede ağaç yok."],
    ["The dog is behind the door.", "Köpek kapının arkasında."]
  ],
  fills: [
    ["There ___ a sofa in the room.", "is", ["are", "am"], "Odada bir kanepe var."],
    ["There ___ three pictures.", "are", ["is", "am"], "Üç resim var."],
    ["The cat is ___ the box.", "in", ["on", "under"], "Kedi kutunun içinde."],
    ["The pen is ___ the table.", "on", ["in", "under"], "Kalem masanın üstünde."],
    ["The dog is ___ the bed.", "under", ["on", "in"], "Köpek yatağın altında."],
    ["___ there a bathroom?", "Is", ["Are", "Do"], "Banyo var mı?"]
  ]
},
{
  id: "u11", icon: "🍞", title: "Geniş Zaman 1", subtitle: "I like, we live, they play",
  grammar: `
    <p><b>Present Simple</b> (geniş zaman): alışkanlıklar ve genel doğrular. “Çay <b>içerim</b>”, “İzmir'de <b>yaşarız</b>”.</p>
    <p>I / you / we / they + fiilin yalın hali:</p>
    <p><span class="say">I like tea.</span> → Çay severim.<br>
       <span class="say">We live in Izmir.</span> → İzmir'de yaşıyoruz.<br>
       <span class="say">They play football.</span> → Futbol oynarlar.</p>
    <h4>Olumsuz: don't</h4>
    <p><span class="say">I don't eat bread.</span> → Ekmek yemem.<br>(don't = do not)</p>
    <h4>Soru: Do ...?</h4>
    <p><span class="say">Do you like milk?</span> → Süt sever misin?<br>
       <span class="say">Yes, I do.</span> / <span class="say">No, I don't.</span></p>
    <div class="tip">💡 Türkçede fiil sonda (çay <b>severim</b>), İngilizcede özneden hemen sonra: I <b>like</b> tea.</div>`,
  words: [
    ["like", "sevmek, hoşlanmak", "❤️"], ["love", "çok sevmek", "😍"], ["eat", "yemek (yemek yemek)", "🍽️"],
    ["drink", "içmek", "🥤"], ["play", "oynamak", "⚽"], ["read", "okumak", "📖"],
    ["go", "gitmek", "🚶"], ["live", "yaşamak, oturmak", "🏡"], ["work", "çalışmak", "💼"],
    ["water", "su", "💧"], ["milk", "süt", "🥛"], ["bread", "ekmek", "🍞"],
    ["school", "okul", "🏫"], ["football", "futbol", "⚽"], ["tea", "çay", "🍵"]
  ],
  sentences: [
    ["I like tea.", "Ben çay severim."],
    ["We live in Istanbul.", "Biz İstanbul'da yaşıyoruz."],
    ["They play football.", "Onlar futbol oynar."],
    ["I drink milk.", "Ben süt içerim."],
    ["You read books.", "Sen kitap okursun."],
    ["I don't eat bread.", "Ben ekmek yemem."],
    ["Do you go to school?", "Okula gider misin?"],
    ["We work here.", "Biz burada çalışırız."]
  ],
  fills: [
    ["I ___ water.", "drink", ["eat", "play"], "Su içerim."],
    ["They ___ football.", "play", ["read", "live"], "Onlar futbol oynar."],
    ["We ___ in Izmir.", "live", ["like", "drink"], "İzmir'de yaşarız."],
    ["I ___ like milk.", "don't", ["doesn't", "not"], "Süt sevmem."],
    ["___ you like tea?", "Do", ["Does", "Are"], "Çay sever misin?"],
    ["Do they work here? — Yes, they ___.", "do", ["are", "does"], "Burada çalışırlar mı? — Evet."]
  ]
},
{
  id: "u12", icon: "⏰", title: "Geniş Zaman 2", subtitle: "He likes, she goes — günlük rutin",
  grammar: `
    <p><b>he / she / it</b> ile fiilin sonuna <b>-s</b> gelir!</p>
    <table class="g">
      <tr><td><span class="say">I like</span></td><td>→</td><td><span class="say">she likes</span></td></tr>
      <tr><td><span class="say">I work</span></td><td>→</td><td><span class="say">he works</span></td></tr>
      <tr><td><span class="say">I go</span></td><td>→</td><td><span class="say">he goes</span> (+es)</td></tr>
      <tr><td><span class="say">I watch</span></td><td>→</td><td><span class="say">she watches</span> (+es)</td></tr>
      <tr><td><span class="say">I have</span></td><td>→</td><td><span class="say">it has</span> (düzensiz)</td></tr>
    </table>
    <h4>Olumsuz ve soru: doesn't / does</h4>
    <p><span class="say">She doesn't like milk.</span> → Süt sevmez.<br>
       <span class="say">Does he play football?</span> → Futbol oynar mı?<br>
       <span class="say">Yes, he does.</span> / <span class="say">No, he doesn't.</span></p>
    <h4>Saat</h4>
    <p><span class="say">at seven o'clock</span> → saat yedide<br>
       <span class="say">in the morning</span> → sabahleyin, <span class="say">in the evening</span> → akşamleyin</p>
    <div class="tip">💡 doesn't / does varsa fiil yine <b>yalın</b> olur: She doesn't like<s>s</s>.</div>`,
  words: [
    ["get up", "kalkmak (yataktan)", "⏰"], ["wash", "yıkamak", "🧼"], ["watch", "izlemek; kol saati", "📺"],
    ["sleep", "uyumak", "😴"], ["breakfast", "kahvaltı", "🥐"], ["lunch", "öğle yemeği", "🥪"],
    ["dinner", "akşam yemeği", "🍲"], ["every day", "her gün", "📅"], ["morning", "sabah", "🌅"],
    ["afternoon", "öğleden sonra", "🌤️"], ["evening", "akşam", "🌆"], ["o'clock", "saat (tam)", "🕖"],
    ["TV", "televizyon", "📺"], ["home", "ev; eve", "🏠"]
  ],
  sentences: [
    ["She gets up at seven o'clock.", "O saat yedide kalkar."],
    ["He eats breakfast every day.", "O her gün kahvaltı yapar."],
    ["My mother works in a school.", "Annem bir okulda çalışır."],
    ["He goes to school in the morning.", "O sabah okula gider."],
    ["She watches TV in the evening.", "O akşam televizyon izler."],
    ["Ali doesn't like milk.", "Ali süt sevmez."],
    ["Does she play football?", "O futbol oynar mı?"],
    ["The cat sleeps on the sofa.", "Kedi kanepede uyur."]
  ],
  fills: [
    ["She ___ tea.", "likes", ["like", "liking"], "O çay sever."],
    ["He ___ to school.", "goes", ["go", "gos"], "O okula gider."],
    ["My father ___ TV.", "watches", ["watch", "watchs"], "Babam televizyon izler."],
    ["It ___ under the bed.", "sleeps", ["sleep", "sleeping"], "O yatağın altında uyur."],
    ["She doesn't ___ milk.", "drink", ["drinks", "drinking"], "O süt içmez."],
    ["___ he work here?", "Does", ["Do", "Is"], "O burada çalışır mı?"]
  ]
},
{
  id: "u13", icon: "🤔", title: "Soru Kelimeleri", subtitle: "What, Where, Who + günler",
  grammar: `
    <table class="g">
      <tr><td><span class="say">What?</span></td><td>Ne?</td><td><span class="say">What is this?</span></td></tr>
      <tr><td><span class="say">Where?</span></td><td>Nerede? Nereye?</td><td><span class="say">Where do you live?</span></td></tr>
      <tr><td><span class="say">Who?</span></td><td>Kim?</td><td><span class="say">Who is she?</span></td></tr>
      <tr><td><span class="say">When?</span></td><td>Ne zaman?</td><td><span class="say">When do you get up?</span></td></tr>
      <tr><td><span class="say">Why?</span></td><td>Neden?</td><td><span class="say">Why are you sad?</span></td></tr>
      <tr><td><span class="say">How?</span></td><td>Nasıl?</td><td><span class="say">How are you?</span></td></tr>
    </table>
    <p>Cevap: <span class="say">Because I am tired.</span> → Çünkü yorgunum.<br>
       <span class="say">I'm fine, thank you.</span> → İyiyim, teşekkürler.</p>
    <h4>Haftanın günleri</h4>
    <p><span class="say">Monday</span> Pazartesi · <span class="say">Tuesday</span> Salı · <span class="say">Wednesday</span> Çarşamba · <span class="say">Thursday</span> Perşembe · <span class="say">Friday</span> Cuma · <span class="say">Saturday</span> Cumartesi · <span class="say">Sunday</span> Pazar</p>
    <p><span class="say">on Monday</span> → pazartesi günü</p>
    <div class="tip">💡 Gün isimleri İngilizcede her zaman <b>büyük harfle</b> başlar.</div>`,
  words: [
    ["what", "ne", "❓"], ["where", "nerede, nereye", "📍"], ["who", "kim", "🧑"],
    ["when", "ne zaman", "🕐"], ["why", "neden", "🤷"], ["how", "nasıl", "🤔"],
    ["because", "çünkü", "💬"], ["fine", "iyi", "👌"], ["today", "bugün", "📆"],
    ["Monday", "Pazartesi", "1️⃣"], ["Tuesday", "Salı", "2️⃣"], ["Wednesday", "Çarşamba", "3️⃣"],
    ["Thursday", "Perşembe", "4️⃣"], ["Friday", "Cuma", "5️⃣"], ["Saturday", "Cumartesi", "6️⃣"],
    ["Sunday", "Pazar", "7️⃣"]
  ],
  sentences: [
    ["Where do you live?", "Nerede yaşıyorsun?"],
    ["What is this?", "Bu ne?"],
    ["Who is that man?", "Şu adam kim?"],
    ["How are you?", "Nasılsın?"],
    ["I'm fine, thank you.", "İyiyim, teşekkür ederim."],
    ["When do you get up?", "Ne zaman kalkarsın?"],
    ["Why are you sad?", "Neden üzgünsün?"],
    ["Because I am tired.", "Çünkü yorgunum."],
    ["Today is Friday.", "Bugün cuma."]
  ],
  fills: [
    ["___ is your name?", "What", ["Where", "Who"], "Adın ne?"],
    ["___ do you live?", "Where", ["What", "Who"], "Nerede yaşıyorsun?"],
    ["___ is she? — She is my sister.", "Who", ["What", "Why"], "O kim? — Kız kardeşim."],
    ["___ are you? — I'm fine.", "How", ["Who", "Where"], "Nasılsın? — İyiyim."],
    ["___ are you happy? — Because it is Sunday.", "Why", ["Who", "Where"], "Neden mutlusun? — Çünkü pazar."],
    ["Monday, Tuesday, ___", "Wednesday", ["Friday", "Sunday"], "Pazartesi, Salı, Çarşamba"]
  ]
},
{
  id: "u14", icon: "💪", title: "can / can't", subtitle: "Yapabilirim, yapamam",
  grammar: `
    <p><b>can</b> = -ebilmek. Tüm kişilerde aynı kalır, <b>-s almaz</b>.</p>
    <table class="g">
      <tr><td><span class="say">I can swim.</span></td><td>Yüzebilirim.</td></tr>
      <tr><td><span class="say">She can sing.</span></td><td>O şarkı söyleyebilir.</td></tr>
      <tr><td><span class="say">He can't drive.</span></td><td>O araba süremez.</td></tr>
    </table>
    <p><b>can't</b> = cannot = -emez</p>
    <h4>Soru</h4>
    <p><span class="say">Can you speak English?</span> → İngilizce konuşabilir misin?<br>
       <span class="say">Yes, I can.</span> / <span class="say">No, I can't.</span></p>
    <h4>Rica etmek</h4>
    <p><span class="say">Can you help me?</span> → Bana yardım edebilir misin?</p>
    <div class="tip">💡 can'den sonra fiil hep yalın: She can sing<s>s</s>.</div>`,
  words: [
    ["can", "-ebilmek", "💪"], ["can't", "-emez", "🙅"], ["swim", "yüzmek", "🏊"],
    ["run", "koşmak", "🏃"], ["sing", "şarkı söylemek", "🎤"], ["dance", "dans etmek", "💃"],
    ["cook", "yemek pişirmek", "👨‍🍳"], ["drive", "araba sürmek", "🚗"], ["speak", "konuşmak (bir dili)", "🗣️"],
    ["English", "İngilizce", "🇬🇧"], ["fly", "uçmak", "🕊️"], ["jump", "zıplamak", "🦘"],
    ["ride", "binmek, sürmek", "🚴"], ["help", "yardım etmek", "🆘"], ["bird", "kuş", "🐦"]
  ],
  sentences: [
    ["I can swim.", "Ben yüzebilirim."],
    ["She can sing.", "O şarkı söyleyebilir."],
    ["He can't drive.", "O araba süremez."],
    ["Birds can fly.", "Kuşlar uçabilir."],
    ["Can you speak English?", "İngilizce konuşabilir misin?"],
    ["Yes, I can.", "Evet, yapabilirim."],
    ["My little brother can't ride a bike.", "Küçük kardeşim bisiklete binemez."],
    ["Can you help me?", "Bana yardım edebilir misin?"]
  ],
  fills: [
    ["She can ___.", "swim", ["swims", "swimming"], "O yüzebilir."],
    ["A dog can't ___.", "fly", ["flies", "flying"], "Bir köpek uçamaz."],
    ["___ you cook? — Yes, I can.", "Can", ["Are", "Is"], "Yemek yapabilir misin? — Evet."],
    ["He ___ drive.", "can't", ["can", "isn't"], "O araba süremez."],
    ["Can she speak English? — No, she ___.", "can't", ["isn't", "doesn't"], "İngilizce konuşabilir mi? — Hayır."],
    ["I can ___ a bike.", "ride", ["rides", "riding"], "Bisiklete binebilirim."]
  ]
},
{
  id: "u15", icon: "🏃", title: "Şimdiki Zaman", subtitle: "I am reading, it is raining",
  grammar: `
    <p><b>Present Continuous</b>: şu anda olan şeyler. Türkçedeki <b>-yor</b> eki.</p>
    <p><b>am / is / are + fiil-ing</b></p>
    <table class="g">
      <tr><td><span class="say">I am reading.</span></td><td>Okuyorum.</td></tr>
      <tr><td><span class="say">She is walking.</span></td><td>O yürüyor.</td></tr>
      <tr><td><span class="say">They are playing.</span></td><td>Onlar oynuyor.</td></tr>
    </table>
    <h4>-ing kuralları</h4>
    <table class="g">
      <tr><td>normal</td><td><span class="say">read → reading</span>, <span class="say">play → playing</span></td></tr>
      <tr><td>e düşer</td><td><span class="say">write → writing</span>, <span class="say">dance → dancing</span></td></tr>
      <tr><td>harf ikizlenir</td><td><span class="say">sit → sitting</span>, <span class="say">run → running</span>, <span class="say">swim → swimming</span></td></tr>
    </table>
    <p><span class="say">What are you doing?</span> → Ne yapıyorsun?<br>
       <span class="say">He isn't sleeping.</span> → O uyumuyor.<br>
       <span class="say">Look! It is raining.</span> → Bak! Yağmur yağıyor.</p>
    <div class="tip">💡 Geniş zaman = her zaman (I read books). Şimdiki zaman = şu an (I am reading now).</div>`,
  words: [
    ["now", "şimdi", "⏱️"], ["look", "bakmak; bak!", "👀"], ["walk", "yürümek", "🚶"],
    ["sit", "oturmak", "🪑"], ["write", "yazmak", "✍️"], ["listen", "dinlemek", "🎧"],
    ["rain", "yağmur; yağmur yağmak", "🌧️"], ["sun", "güneş", "☀️"], ["park", "park", "🏞️"],
    ["music", "müzik", "🎵"], ["wait", "beklemek", "⏳"], ["talk", "konuşmak, sohbet etmek", "💬"],
    ["smile", "gülümsemek", "😊"], ["do", "yapmak", "🛠️"]
  ],
  sentences: [
    ["I am reading a book now.", "Şimdi bir kitap okuyorum."],
    ["She is walking in the park.", "O parkta yürüyor."],
    ["They are playing football.", "Onlar futbol oynuyor."],
    ["It is raining.", "Yağmur yağıyor."],
    ["We are listening to music.", "Biz müzik dinliyoruz."],
    ["He isn't sleeping.", "O uyumuyor."],
    ["What are you doing?", "Ne yapıyorsun?"],
    ["Look! The sun is shining.", "Bak! Güneş parlıyor."]
  ],
  fills: [
    ["I am ___ a letter.", "writing", ["write", "writes"], "Bir mektup yazıyorum."],
    ["She ___ sitting on the sofa.", "is", ["are", "am"], "O kanepede oturuyor."],
    ["They are ___ in the park.", "running", ["runing", "run"], "Onlar parkta koşuyor."],
    ["We ___ eating lunch.", "are", ["is", "am"], "Öğle yemeği yiyoruz."],
    ["Look! The baby is ___.", "smiling", ["smile", "smiles"], "Bak! Bebek gülümsüyor."],
    ["What ___ you doing?", "are", ["is", "do"], "Ne yapıyorsun?"]
  ]
},
{
  id: "u16", icon: "📆", title: "was / were", subtitle: "Dün evdeydim",
  grammar: `
    <p>Geçmişte <b>am / is → was</b>, <b>are → were</b> olur. Türkçedeki <b>-dı, -di</b> eki.</p>
    <table class="g">
      <tr><td><span class="say">I was</span>, <span class="say">he was</span>, <span class="say">she was</span>, <span class="say">it was</span></td></tr>
      <tr><td><span class="say">you were</span>, <span class="say">we were</span>, <span class="say">they were</span></td></tr>
    </table>
    <p><span class="say">I was at home yesterday.</span> → Dün evdeydim.<br>
       <span class="say">They were happy.</span> → Onlar mutluydu.</p>
    <h4>Olumsuz ve soru</h4>
    <p><span class="say">He wasn't at school.</span> → O okulda değildi.<br>
       <span class="say">Were you busy?</span> → Meşgul müydün?<br>
       <span class="say">Yes, I was.</span> / <span class="say">No, I wasn't.</span></p>
    <h4>Zaman ifadeleri</h4>
    <p><span class="say">yesterday</span> dün · <span class="say">last night</span> dün gece · <span class="say">last week</span> geçen hafta · <span class="say">two days ago</span> iki gün önce</p>
    <p><span class="say">I was born in 2010.</span> → 2010'da doğdum.</p>`,
  words: [
    ["was", "idi (tekil)", "⏪"], ["were", "idi (çoğul, you)", "⏪"], ["yesterday", "dün", "📆"],
    ["last week", "geçen hafta", "🗓️"], ["last night", "dün gece", "🌃"], ["weekend", "hafta sonu", "🎈"],
    ["party", "parti", "🎉"], ["at home", "evde", "🏠"], ["born", "doğmuş (I was born = doğdum)", "👶"],
    ["ago", "önce", "⏮️"], ["sick", "hasta", "🤒"], ["busy", "meşgul", "📋"], ["city", "şehir", "🏙️"]
  ],
  sentences: [
    ["I was at home yesterday.", "Dün evdeydim."],
    ["She was sick last week.", "O geçen hafta hastaydı."],
    ["We were at a party.", "Biz bir partideydik."],
    ["They were happy.", "Onlar mutluydu."],
    ["He wasn't at school.", "O okulda değildi."],
    ["Were you busy last night?", "Dün gece meşgul müydün?"],
    ["I was born in Ankara.", "Ben Ankara'da doğdum."],
    ["It was cold two days ago.", "İki gün önce hava soğuktu."]
  ],
  fills: [
    ["I ___ tired yesterday.", "was", ["were", "am"], "Dün yorgundum."],
    ["They ___ at the park.", "were", ["was", "is"], "Onlar parktaydı."],
    ["She ___ at home last night.", "was", ["were", "are"], "O dün gece evdeydi."],
    ["We ___ happy at the party.", "were", ["was", "is"], "Partide mutluyduk."],
    ["He ___ at school yesterday.", "wasn't", ["weren't", "isn't"], "O dün okulda değildi."],
    ["___ you sick last week?", "Were", ["Was", "Are"], "Geçen hafta hasta mıydın?"]
  ]
},
{
  id: "u17", icon: "🕰️", title: "Geçmiş Zaman", subtitle: "played, went, saw, ate",
  grammar: `
    <p><b>Past Simple</b>: geçmişte olup bitmiş işler. Türkçedeki <b>-dı / -di</b>.</p>
    <h4>Düzenli fiiller: + ed</h4>
    <p><span class="say">play → played</span> · <span class="say">watch → watched</span> · <span class="say">walk → walked</span> · <span class="say">live → lived</span> · <span class="say">stop → stopped</span></p>
    <h4>Düzensiz fiiller (ezberlenir)</h4>
    <table class="g">
      <tr><td><span class="say">go → went</span></td><td>gitti</td><td><span class="say">see → saw</span></td><td>gördü</td></tr>
      <tr><td><span class="say">eat → ate</span></td><td>yedi</td><td><span class="say">have → had</span></td><td>vardı / yedi</td></tr>
      <tr><td><span class="say">come → came</span></td><td>geldi</td><td><span class="say">buy → bought</span></td><td>satın aldı</td></tr>
      <tr><td><span class="say">make → made</span></td><td>yaptı</td><td><span class="say">take → took</span></td><td>aldı, götürdü</td></tr>
      <tr><td><span class="say">get → got</span></td><td>aldı, oldu</td><td><span class="say">swim → swam</span></td><td>yüzdü</td></tr>
      <tr><td><span class="say">drink → drank</span></td><td>içti</td><td><span class="say">read → read</span></td><td>okudu</td></tr>
    </table>
    <p>Tüm kişilerde aynı: <span class="say">I went</span>, <span class="say">she went</span>, <span class="say">they went</span>.</p>
    <h4>Olumsuz ve soru: didn't / did</h4>
    <p><span class="say">I didn't go to school.</span> → Okula gitmedim.<br>
       <span class="say">Did you see the film?</span> → Filmi gördün mü?<br>
       <span class="say">Yes, I did.</span> / <span class="say">No, I didn't.</span></p>
    <div class="tip">💡 didn't / did varsa fiil yalın kalır: I didn't <b>go</b> (went değil).</div>`,
  words: [
    ["played", "oynadı (play)", "⚽"], ["watched", "izledi (watch)", "📺"], ["walked", "yürüdü (walk)", "🚶"],
    ["visited", "ziyaret etti (visit)", "🏡"], ["went", "gitti (go)", "🚌"], ["saw", "gördü (see)", "👀"],
    ["ate", "yedi (eat)", "🍽️"], ["had", "vardı; yedi (have)", "🤲"], ["came", "geldi (come)", "🏃"],
    ["bought", "satın aldı (buy)", "🛒"], ["made", "yaptı (make)", "🎂"], ["took", "aldı, götürdü (take)", "✋"],
    ["then", "sonra", "➡️"], ["summer", "yaz", "🏖️"], ["sea", "deniz", "🌊"]
  ],
  sentences: [
    ["I played football yesterday.", "Dün futbol oynadım."],
    ["We went to the sea last summer.", "Geçen yaz denize gittik."],
    ["She watched a film.", "O bir film izledi."],
    ["He ate an apple.", "O bir elma yedi."],
    ["They visited their grandmother.", "Onlar büyükannelerini ziyaret etti."],
    ["I saw a big dog.", "Büyük bir köpek gördüm."],
    ["My mother made a cake.", "Annem bir kek yaptı."],
    ["I didn't go to school.", "Okula gitmedim."],
    ["Did you buy bread?", "Ekmek aldın mı?"]
  ],
  fills: [
    ["Yesterday I ___ TV.", "watched", ["watch", "watches"], "Dün televizyon izledim."],
    ["Last week we ___ to Izmir.", "went", ["go", "goed"], "Geçen hafta İzmir'e gittik."],
    ["She ___ a cat in the garden.", "saw", ["see", "seed"], "Bahçede bir kedi gördü."],
    ["They ___ pizza for dinner.", "ate", ["eat", "eated"], "Akşam yemeğinde pizza yediler."],
    ["I didn't ___ my homework.", "do", ["did", "done"], "Ödevimi yapmadım."],
    ["___ you see the film?", "Did", ["Do", "Were"], "Filmi gördün mü?"]
  ]
}
];
