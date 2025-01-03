# No Homeless People

**No Homeless People**, evsiz veya yardıma ihtiyacı olan bireylerin konumlarının ve ihtiyaçlarının paylaşıldığı bir sosyal medya platformudur. Bu proje, topluluk desteğiyle yardıma muhtaç bireylerin topluma kazandırılmasını amaçlamaktadır.

## Özellikler

- **Akış (Feed):** Kullanıcılar tarafından oluşturulan yardım taleplerinin görüntülendiği ekran.
- **Profil (Profile):** Kullanıcının kendi profil bilgilerini düzenleyebildiği ve oluşturduğu yardım taleplerini yönetebildiği ekran.
- **Gönderi Paylaşımı:** İhtiyaç açıklaması, ihtiyaç listesi ve konum bilgisi içeren gönderiler oluşturma.
- **Offline Çalışma:** SQLite kullanılarak veriler yerel olarak saklanır.
- **Dil Çevirisi:** Yapay zeka tabanlı çeviri teknolojisi ile gönderiler farklı dillere çevrilebilir.
- **Konum Tabanlı Öneriler:** GPS kullanılarak yakın çevredeki ihtiyaç sahiplerini önerme.
- **Bildirimler:** Yardım taleplerine hızlı erişim için mobil bildirimler.

## Teknik Detaylar

- **Frontend:** React Native
- **Backend:** MongoDB ile RESTful API (CRUD) desteği
- **Yerel Veri Depolama:** SQLite
- **Konum ve Harita:** Google Maps API
- **Çeviri:** Yapay zeka tabanlı bulut çeviri hizmeti (ör. Google Translate API)
- **Yetkilendirme:** OAuth veya JWT kullanılarak güvenli giriş sistemi

## Kurulum

1. **Gereksinimler:**
   - Node.js
   - Expo CLI
   - MongoDB
   - SQLite

2. **Depoyu Klonlayın:**
   ```bash
   git clone https://github.com/YusufDemir0/NoHomelessPeople.git
   cd NoHomelessPeople
3. **Bağımlılıkları Yükleyin:**

npm install
Çevre Değişkenlerini Ayarlayın (.env):

**.env dosyasını oluşturun ve MongoDB bağlantı bilgilerini ekleyin:**

MONGO_URI=your_mongodb_connection_string
Uygulamayı Çalıştırın:

expo start

**Kullanım**
Uygulamayı başlatın ve bir hesap oluşturun.
Yardım taleplerini inceleyin veya yeni bir talep oluşturun.
Profil bilgilerinizi düzenleyin ve ihtiyaç duyduğunuz gönderileri yönetin.

**Katkı Sağlama**
Projeye katkıda bulunmak için aşağıdaki adımları takip edin:

Depoyu fork edin.
Yeni bir dal oluşturun:

git checkout -b feature/your-feature-name
Değişikliklerinizi yapın ve commit edin:

git commit -m "Add your feature description"
Dalınızı gönderin:
 
git push origin feature/your-feature-name
Bir pull request gönderin.

**İletişim**
Eğer bir sorunuz veya öneriniz varsa, lütfen bizimle iletişime geçin.
Yusuf Demir-210201009
Egemen Çakır-200201052
Önder Alp Civcir-200201083
Halil Asav-210201097

İletişi Mail: yusufdemir4154@gmail.com
