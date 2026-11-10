/* A1 hikayeler
   after: hangi üniteden sonra okunması önerilir
   paras: paragraflar → her paragraf [İngilizce, Türkçe] cümle listesi
   questions: [soru, Türkçe soru, doğru cevap, [yanlışlar]] */

const STORIES = [
{
  id: "s1", after: "u4", icon: "🐱", title: "Hello, I am Mia", trTitle: "Merhaba, ben Mia",
  paras: [
    [["Hello!", "Merhaba!"],
     ["My name is Mia.", "Benim adım Mia."],
     ["I am a student.", "Ben bir öğrenciyim."],
     ["I am from England.", "İngiltere'denim."],
     ["I am not old. I am young.", "Yaşlı değilim. Gencim."]],
    [["This is Tom.", "Bu Tom."],
     ["Tom is my cat.", "Tom benim kedim."],
     ["He is not big. He is small.", "O büyük değil. O küçük."],
     ["Tom is hungry.", "Tom aç."],
     ["Is he sad? No, he isn't.", "Üzgün mü? Hayır, değil."],
     ["He is happy.", "O mutlu."],
     ["And I am happy too!", "Ve ben de mutluyum!"]]
  ],
  questions: [
    ["Where is Mia from?", "Mia nereli?", "England", ["Turkey", "Spain"]],
    ["Who is Tom?", "Tom kim?", "A cat", ["A dog", "A teacher"]],
    ["Is Tom big?", "Tom büyük mü?", "No, he isn't.", ["Yes, he is.", "Yes, I am."]]
  ]
},
{
  id: "s2", after: "u7", icon: "👨‍👩‍👧‍👦", title: "My Family", trTitle: "Benim Ailem",
  paras: [
    [["This is my family.", "Bu benim ailem."],
     ["We are from Turkey.", "Biz Türkiye'deniz."],
     ["My name is Can. I am ten years old.", "Adım Can. On yaşındayım."]],
    [["This is my father. His name is Murat.", "Bu babam. Onun adı Murat."],
     ["He is a doctor.", "O bir doktor."],
     ["This is my mother. Her name is Ayşe.", "Bu annem. Onun adı Ayşe."],
     ["She is a teacher.", "O bir öğretmen."]],
    [["My sister is six. Her name is Ela.", "Kız kardeşim altı yaşında. Onun adı Ela."],
     ["Ela is small, but she is very funny.", "Ela küçük ama çok komik."],
     ["My grandmother is old, but she is very happy.", "Büyükannem yaşlı ama çok mutlu."],
     ["Our dog is big and black.", "Köpeğimiz büyük ve siyah."],
     ["His name is Max.", "Onun adı Max."],
     ["I love my family!", "Ailemi çok seviyorum!"]]
  ],
  questions: [
    ["How old is Can?", "Can kaç yaşında?", "Ten", ["Six", "Twenty"]],
    ["What is his father?", "Babasının mesleği ne?", "A doctor", ["A teacher", "A student"]],
    ["What color is Max?", "Max ne renk?", "Black", ["White", "Red"]],
    ["Who is Ela?", "Ela kim?", "Can's sister", ["Can's mother", "Can's dog"]]
  ]
},
{
  id: "s3", after: "u10", icon: "🏡", title: "Where Is Luna?", trTitle: "Luna Nerede?",
  paras: [
    [["My house is small, but it is nice.", "Evim küçük ama güzel."],
     ["There are three rooms in my house.", "Evimde üç oda var."],
     ["There is a kitchen, a bathroom and a bedroom.", "Bir mutfak, bir banyo ve bir yatak odası var."]],
    [["In the kitchen, there is a table and four chairs.", "Mutfakta bir masa ve dört sandalye var."],
     ["The table is white.", "Masa beyaz."],
     ["In my bedroom, there is a bed and a lamp.", "Yatak odamda bir yatak ve bir lamba var."],
     ["There are pictures on the wall.", "Duvarda resimler var."]],
    [["I have a cat. Her name is Luna.", "Bir kedim var. Onun adı Luna."],
     ["Where is Luna now?", "Luna şimdi nerede?"],
     ["She isn't on the sofa.", "Kanepenin üstünde değil."],
     ["She isn't under the bed.", "Yatağın altında değil."],
     ["Oh, there she is! She is in a box!", "Ah, işte orada! Bir kutunun içinde!"]]
  ],
  questions: [
    ["How many rooms are there?", "Kaç oda var?", "Three", ["Two", "Four"]],
    ["What color is the table?", "Masa ne renk?", "White", ["Black", "Red"]],
    ["Where is Luna?", "Luna nerede?", "In a box", ["On the sofa", "Under the bed"]]
  ]
},
{
  id: "s4", after: "u12", icon: "⏰", title: "Ben's Day", trTitle: "Ben'in Günü",
  paras: [
    [["This is Ben. He is twelve years old.", "Bu Ben. O on iki yaşında."],
     ["He lives in London with his family.", "Ailesiyle Londra'da yaşıyor."]],
    [["Ben gets up at seven o'clock every day.", "Ben her gün saat yedide kalkar."],
     ["He washes his face.", "Yüzünü yıkar."],
     ["Then he eats breakfast with his mother.", "Sonra annesiyle kahvaltı yapar."],
     ["He eats bread and eggs, and he drinks milk.", "Ekmek ve yumurta yer, süt içer."],
     ["He goes to school at eight o'clock.", "Saat sekizde okula gider."],
     ["He likes his school and his teacher.", "Okulunu ve öğretmenini sever."]],
    [["In the afternoon, he plays football with his friends.", "Öğleden sonra arkadaşlarıyla futbol oynar."],
     ["In the evening, he reads a book.", "Akşam kitap okur."],
     ["He doesn't watch TV.", "Televizyon izlemez."],
     ["He goes to bed at nine o'clock.", "Saat dokuzda yatar."]]
  ],
  questions: [
    ["When does Ben get up?", "Ben ne zaman kalkar?", "At seven o'clock", ["At eight o'clock", "At nine o'clock"]],
    ["What does he drink?", "Ne içer?", "Milk", ["Tea", "Water"]],
    ["What does he do in the afternoon?", "Öğleden sonra ne yapar?", "He plays football.", ["He watches TV.", "He sleeps."]],
    ["Does Ben watch TV?", "Ben televizyon izler mi?", "No, he doesn't.", ["Yes, he does.", "Yes, he is."]]
  ]
},
{
  id: "s5", after: "u13", icon: "🤝", title: "The New Girl", trTitle: "Yeni Kız",
  paras: [
    [["It is Monday.", "Pazartesi."],
     ["There is a new girl in the class.", "Sınıfta yeni bir kız var."],
     ["She is alone.", "Yalnız."]],
    [["Ali: Hello! What is your name?", "Ali: Merhaba! Adın ne?"],
     ["Girl: Hi! My name is Sara.", "Kız: Selam! Adım Sara."],
     ["Ali: Where are you from, Sara?", "Ali: Nerelisin Sara?"],
     ["Sara: I am from Spain.", "Sara: İspanya'danım."],
     ["Ali: Where do you live now?", "Ali: Şimdi nerede yaşıyorsun?"],
     ["Sara: I live in Bursa with my family.", "Sara: Ailemle Bursa'da yaşıyorum."],
     ["Ali: Do you like Turkey?", "Ali: Türkiye'yi seviyor musun?"],
     ["Sara: Yes, I do! The people are very nice.", "Sara: Evet! İnsanlar çok iyi."],
     ["Ali: Why are you sad?", "Ali: Neden üzgünsün?"],
     ["Sara: Because I don't have friends here.", "Sara: Çünkü burada arkadaşım yok."],
     ["Ali: I am your friend now!", "Ali: Artık ben senin arkadaşınım!"]],
    [["Sara smiles. She is happy now.", "Sara gülümser. Artık mutlu."]]
  ],
  questions: [
    ["Where is Sara from?", "Sara nereli?", "Spain", ["Turkey", "England"]],
    ["Where does she live now?", "Şimdi nerede yaşıyor?", "In Bursa", ["In Spain", "In London"]],
    ["Why is Sara sad?", "Sara neden üzgün?", "She doesn't have friends.", ["She is hungry.", "She is tired."]]
  ]
},
{
  id: "s6", after: "u14", icon: "🐦", title: "The Little Bird", trTitle: "Küçük Kuş",
  paras: [
    [["There is a little bird in the garden.", "Bahçede küçük bir kuş var."],
     ["His name is Pip.", "Onun adı Pip."],
     ["Pip can sing, but he can't fly.", "Pip şarkı söyleyebilir ama uçamaz."],
     ["He is very young.", "O çok küçük."],
     ["“I can't fly,” says Pip. “I am sad.”", "“Uçamıyorum,” der Pip. “Üzgünüm.”"]],
    [["A cat comes to the garden.", "Bahçeye bir kedi gelir."],
     ["The cat can run and jump.", "Kedi koşabilir ve zıplayabilir."],
     ["Pip is afraid. “Help! Help!”", "Pip korkar. “İmdat! İmdat!”"],
     ["His mother is in the tree.", "Annesi ağaçta."],
     ["“Pip! You can do it! Jump and fly!”", "“Pip! Yapabilirsin! Zıpla ve uç!”"]],
    [["Pip jumps… and he flies!", "Pip zıplar… ve uçar!"],
     ["Now Pip is in the tree with his mother.", "Şimdi Pip annesiyle ağaçta."],
     ["He can fly, and he can sing.", "Uçabiliyor ve şarkı söyleyebiliyor."],
     ["He is very happy.", "Çok mutlu."]]
  ],
  questions: [
    ["What can Pip do at the start?", "Başta Pip ne yapabiliyor?", "He can sing.", ["He can fly.", "He can swim."]],
    ["Who comes to the garden?", "Bahçeye kim gelir?", "A cat", ["A dog", "A boy"]],
    ["Where is Pip's mother?", "Pip'in annesi nerede?", "In the tree", ["In the house", "Under the tree"]]
  ]
},
{
  id: "s7", after: "u15", icon: "🌳", title: "In the Park", trTitle: "Parkta",
  paras: [
    [["It is Sunday afternoon.", "Pazar öğleden sonrası."],
     ["The sun is shining and the sky is blue.", "Güneş parlıyor ve gökyüzü mavi."],
     ["I am sitting in the park with my sister.", "Kız kardeşimle parkta oturuyorum."],
     ["There are a lot of people here today.", "Bugün burada çok insan var."]],
    [["A man is running with his dog.", "Bir adam köpeğiyle koşuyor."],
     ["Two children are playing football.", "İki çocuk futbol oynuyor."],
     ["An old woman is reading a book under a tree.", "Yaşlı bir kadın bir ağacın altında kitap okuyor."],
     ["A girl is eating an ice cream.", "Bir kız dondurma yiyor."],
     ["My sister is listening to music.", "Kız kardeşim müzik dinliyor."]],
    [["And what am I doing?", "Peki ben ne yapıyorum?"],
     ["I am writing this story!", "Bu hikayeyi yazıyorum!"],
     ["Oh no! Look! It is raining now!", "Ah hayır! Bak! Şimdi yağmur yağıyor!"],
     ["Everybody is running home.", "Herkes eve koşuyor."]]
  ],
  questions: [
    ["What day is it?", "Hangi gün?", "Sunday", ["Monday", "Friday"]],
    ["What is the man doing?", "Adam ne yapıyor?", "He is running with his dog.", ["He is reading a book.", "He is sleeping."]],
    ["What is the sister doing?", "Kız kardeş ne yapıyor?", "She is listening to music.", ["She is eating.", "She is writing."]],
    ["What happens at the end?", "Sonunda ne oluyor?", "It is raining.", ["The sun is shining.", "They are swimming."]]
  ]
},
{
  id: "s8", after: "u17", icon: "🏖️", title: "A Day at the Sea", trTitle: "Denizde Bir Gün",
  paras: [
    [["Last summer, I went to the sea with my family.", "Geçen yaz ailemle denize gittim."],
     ["The weather was very hot.", "Hava çok sıcaktı."],
     ["We got up early and took the bus.", "Erkenden kalktık ve otobüse bindik."],
     ["The sea was blue and beautiful.", "Deniz mavi ve güzeldi."]],
    [["My father and I swam in the sea.", "Babam ve ben denizde yüzdük."],
     ["My little brother played with the sand.", "Küçük kardeşim kumla oynadı."],
     ["He made a big sandcastle.", "Büyük bir kumdan kale yaptı."],
     ["My mother read a book under the umbrella.", "Annem şemsiyenin altında kitap okudu."],
     ["At noon, we ate sandwiches and drank cold water.", "Öğlen sandviç yedik ve soğuk su içtik."]],
    [["In the afternoon, we saw a big boat.", "Öğleden sonra büyük bir tekne gördük."],
     ["We came home in the evening.", "Akşam eve geldik."],
     ["We were tired, but we were very happy.", "Yorgunduk ama çok mutluyduk."],
     ["It was a great day!", "Harika bir gündü!"]]
  ],
  questions: [
    ["How was the weather?", "Hava nasıldı?", "Very hot", ["Cold", "Rainy"]],
    ["What did the little brother make?", "Küçük kardeş ne yaptı?", "A sandcastle", ["A cake", "A boat"]],
    ["What did the mother do?", "Anne ne yaptı?", "She read a book.", ["She swam.", "She slept."]],
    ["When did they come home?", "Eve ne zaman geldiler?", "In the evening", ["In the morning", "At noon"]]
  ]
},
{
  id: "s9", after: "u17", icon: "🐕", title: "The Lost Dog", trTitle: "Kayıp Köpek",
  paras: [
    [["Yesterday was Saturday.", "Dün cumartesiydi."],
     ["Emma went to the park with her dog, Rex.", "Emma köpeği Rex ile parka gitti."],
     ["Rex is a small brown dog.", "Rex küçük, kahverengi bir köpek."],
     ["In the park, Emma saw her friend Lucy.", "Parkta arkadaşı Lucy'yi gördü."],
     ["They talked and laughed.", "Konuştular ve güldüler."]],
    [["Then Emma looked for Rex.", "Sonra Emma Rex'i aradı."],
     ["But Rex wasn't there!", "Ama Rex orada değildi!"],
     ["Emma was very sad. She called, “Rex! Rex!”", "Emma çok üzgündü. “Rex! Rex!” diye seslendi."],
     ["They looked under the trees and behind the cars.", "Ağaçların altına ve arabaların arkasına baktılar."],
     ["They didn't find him.", "Onu bulamadılar."]],
    [["Then Emma went home.", "Sonra Emma eve gitti."],
     ["And who was in the garden? Rex!", "Peki bahçede kim vardı? Rex!"],
     ["He was hungry, and he was waiting for his dinner.", "Açtı ve akşam yemeğini bekliyordu."],
     ["Emma laughed and gave him a big hug.", "Emma güldü ve ona kocaman sarıldı."]]
  ],
  questions: [
    ["Who is Rex?", "Rex kim?", "Emma's dog", ["Emma's friend", "Lucy's cat"]],
    ["Who did Emma see in the park?", "Emma parkta kimi gördü?", "Lucy", ["Rex", "Her mother"]],
    ["Where was Rex?", "Rex neredeydi?", "In the garden at home", ["In the park", "Under a car"]]
  ]
},
{
  id: "s10", after: "u17", icon: "🇬🇧", title: "Ayşe in London", trTitle: "Londra'da Ayşe",
  paras: [
    [["My name is Ayşe, and I am twenty years old.", "Adım Ayşe ve yirmi yaşındayım."],
     ["I am from Izmir, but now I live in London.", "İzmirliyim ama şimdi Londra'da yaşıyorum."],
     ["I am a student. I study English here.", "Öğrenciyim. Burada İngilizce okuyorum."]],
    [["London is a very big city.", "Londra çok büyük bir şehir."],
     ["It often rains here, and it is cold in winter.", "Burada sık sık yağmur yağar ve kışın hava soğuktur."],
     ["Every morning, I take the bus to school.", "Her sabah okula otobüsle giderim."],
     ["My teacher is very nice, and my classmates are from many countries.", "Öğretmenim çok iyi ve sınıf arkadaşlarım birçok ülkeden."]],
    [["Last weekend, we visited a big museum.", "Geçen hafta sonu büyük bir müzeyi ziyaret ettik."],
     ["We saw old pictures and ate lunch in a small café.", "Eski resimler gördük ve küçük bir kafede öğle yemeği yedik."]],
    [["I like London, but I miss my family.", "Londra'yı seviyorum ama ailemi özlüyorum."],
     ["I call my mother every day.", "Her gün annemi ararım."],
     ["Today it is sunny, so I am walking in the park.", "Bugün hava güneşli, bu yüzden parkta yürüyorum."],
     ["I am happy here!", "Burada mutluyum!"]]
  ],
  questions: [
    ["Where is Ayşe from?", "Ayşe nereli?", "Izmir", ["London", "Ankara"]],
    ["What does she do in London?", "Londra'da ne yapıyor?", "She studies English.", ["She works in a café.", "She is a teacher."]],
    ["What did she do last weekend?", "Geçen hafta sonu ne yaptı?", "She visited a museum.", ["She went to the sea.", "She played football."]],
    ["Who does she call every day?", "Her gün kimi arıyor?", "Her mother", ["Her teacher", "Her friend"]]
  ]
}
];
