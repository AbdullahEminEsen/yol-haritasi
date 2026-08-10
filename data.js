/* =========================================================================
   Z3 Yazılım — Stajyer Yol Haritası içeriği
   Bu dosyayı düzenleyerek konu ekleyebilir / çıkarabilir / güncelleyebilirsiniz.
   Yapı:  faz -> konular[]
   Konu alanları: id, eyebrow, title, why, body(html), code[], steps[], resources[]
   ========================================================================= */

const ROADMAP = [
{
  num: 0, id: "temeller", title: "Temeller",
  subtitle: "Ortama girmeden önce",
  checkpoint: { desc: "Terminal, Git ve HTTP alıştırmalarını yaptıysan; istersen küçük test repo&#39;nun linkini ya da bir çıktının ekran görüntüsünü paylaş.", url: "https://tally.so/r/VLaRKE" },
  topics: [
    {
      id: "terminal",
      eyebrow: "Faz 0 · Temeller",
      title: "Terminal & Linux temelleri",
      why: "Sunucularımız Ubuntu, local ortamımız (Homestead) da bir Linux sanal makinesi. Fare ile değil, komut satırıyla çalışacaksın. Bu yüzden ilk gün burada başlıyoruz.",
      body: `
        <p>Bir geliştiricinin en çok vakit geçirdiği yer terminaldir. Dosya oluşturmak, proje kurmak, sunucuya bağlanmak, log okumak — hepsi buradan geçer. Korkutucu görünse de aslında birkaç komutla günün %90'ını çevirirsin.</p>
        <h3>Mutlaka bileceğin komutlar</h3>
        <ul>
          <li><code>pwd</code> — şu an hangi klasördeyim?</li>
          <li><code>ls -la</code> — bu klasörde ne var? (gizli dosyalar dahil)</li>
          <li><code>cd klasor</code> — klasöre gir, <code>cd ..</code> bir üste çık</li>
          <li><code>mkdir</code> / <code>touch</code> — klasör / dosya oluştur</li>
          <li><code>cat</code>, <code>less</code>, <code>tail -f</code> — dosya içeriği oku (özellikle <code>tail -f</code> ile canlı log takibi)</li>
          <li><code>grep "aranan" dosya</code> — metin içinde arama</li>
        </ul>
        <p>Windows'ta çalışıyorsan bile sorun yok — Homestead içindeki Linux makinesine bağlandığında bu komutlar aynı çalışır.</p>`,
      code: [
        { lang:"bash", fn:"terminal", src:
`# Proje klasörüne git ve içeriğini gör
cd ~/code/proje
ls -la

# Log dosyasını canlı izle (Laravel'de en çok kullanacağın komut)
tail -f storage/logs/laravel.log

# Bir hatayı log içinde ara
grep "SQLSTATE" storage/logs/laravel.log` }
      ],
      steps: [
        "Terminali aç ve <code>pwd</code> yazıp nerede olduğunu gör.",
        "<code>cd</code> ile birkaç klasör arasında gez, <code>ls -la</code> ile içeriklerini incele.",
        "Bir klasör oluştur, içine dosya at, sonra sil: <code>mkdir deneme && cd deneme && touch test.txt && ls</code>."
      ],
      resources: [
        { t:"Rehber", label:"The Missing Semester — Shell'in kullanımı (MIT)", url:"https://missing.csail.mit.edu/2020/course-shell/" },
        { t:"Alıştırma", label:"Linux komut satırı temelleri (Ubuntu)", url:"https://ubuntu.com/tutorials/command-line-for-beginners" }
      ]
    },
    {
      id: "git",
      eyebrow: "Faz 0 · Temeller",
      title: "Git & GitHub akışı",
      why: "Kodunun geçmişini tutmak, güvenle deneyip geri alabilmek ve ileride ekip halinde çalışabilmek için Git şart. Kendi projelerinde baştan doğru alışkanlık kurarsan, ekip çalışmasına da hazır olursun.",
      body: `
        <p><strong>Git</strong> kodun geçmişini tutar; ne zaman neyi değiştirdiğin hepsi kayıtlıdır, istediğin ana geri dönebilirsin. <strong>GitHub</strong> ise bu geçmişi çevrimiçi sakladığın ve paylaştığın yerdir. Profesyonel projelerde her iş bir <em>branch</em>'te yapılır, sonra <em>Pull Request (PR)</em> ile birleştirilir. Sen de kendi projelerinde bu akışı kurarsan hem kaosa düşmezsin hem de ekip çalışmasına hazır olursun.</p>
        <h3>Günlük döngü</h3>
        <ul>
          <li>Yeni bir iş → yeni bir branch aç (asla doğrudan <code>main</code>'e yazma)</li>
          <li>Küçük ve anlamlı commit'ler at (dev bir commit yerine 5 küçük commit)</li>
          <li>İşin bitince <code>push</code> et ve Pull Request aç</li>
          <li>Kendin gözden geçir (ya da bir arkadaşına baktır), sonra merge et</li>
        </ul>
        <p>Commit mesajı yazarken "değişiklikler" gibi anlamsız mesajlar yazma; ne yaptığını yaz: <code>fix: boş tarihte çöken filtreyi düzelt</code>.</p>
        <h3>Neyi commit'leme</h3>
        <p>Her dosya git'e girmez. Bazıları <strong>gizli</strong> (şifre içerir), bazıları <strong>gereksiz</strong> (tek komutla yeniden üretilir ve çok yer kaplar). Bunlar <code>.gitignore</code> dosyasına yazılır; Laravel projesi bunların çoğuyla zaten hazır gelir.</p>
        <ul>
          <li><code>.env</code> — <strong>asla commit'leme.</strong> Veritabanı şifresi, API anahtarları burada. Git'e girerse herkes görür.</li>
          <li><code>vendor/</code> — Composer paketleri; <code>composer install</code> ile geri gelir.</li>
          <li><code>node_modules/</code> — npm paketleri; <code>npm install</code> ile geri gelir.</li>
          <li><code>storage/logs/</code>, derlenmiş asset'ler, <code>.DS_Store</code> gibi geçici dosyalar.</li>
        </ul>
        <p><strong>İlk kuralın:</strong> <code>git add .</code>'dan önce <code>git status</code> ile ne eklediğine bak. Yanlışlıkla <code>.env</code>'i commit'lediysen aşağıdaki komutla git'ten çıkar (dosya diskte kalır).</p>`,
      code: [
        { lang:"bash", fn:"git akışı", src:
`# Güncel main'i çek ve yeni branch aç
git checkout main
git pull
git checkout -b feature/giris-sayfasi

# Değişiklikleri gör, ekle, commit'le
git status
git add .
git commit -m "feat: giriş sayfası formunu ekle"

# Uzağa gönder ve PR aç
git push -u origin feature/giris-sayfasi` },
        { lang:"bash", fn:".gitignore (tipik satırlar)", src:
`/vendor
/node_modules
.env
/storage/*.key
/public/build
.DS_Store` },
        { lang:"bash", fn:"yanlışlıkla eklediysen geri al", src:
`# .env'i git takibinden çıkar (dosya diskte kalır)
git rm --cached .env
git commit -m "chore: .env'i takipten çıkar"` }
      ],
      steps: [
        "GitHub'da kendine ücretsiz bir hesap aç (yoksa).",
        "Boş bir klasörde <code>git init</code> yap, bir dosya ekle ve commit'le; sonra GitHub'da yeni bir repo açıp <code>git remote add origin &lt;repo-url&gt;</code> ile bağlayıp push'la.",
        "Küçük bir branch aç, bir değişiklik yap, commit + push; ardından GitHub'da kendi PR'ını açmayı dene.",
        "<code>git add .</code>'dan önce her zaman <code>git status</code> ile ne eklediğini kontrol et — <code>.env</code> asla girmesin."
      ],
      resources: [
        { t:"İnteraktif", label:"Learn Git Branching (görsel, oyunlaştırılmış)", url:"https://learngitbranching.js.org/?locale=tr_TR" },
        { t:"Doküman", label:"GitHub — Git Handbook", url:"https://docs.github.com/en/get-started/using-git/about-git" }
      ]
    },
    {
      id: "web-nasil-calisir",
      eyebrow: "Faz 0 · Temeller",
      title: "Web nasıl çalışır?",
      why: "Laravel'in her satırı aslında bir HTTP isteğine cevap üretmek için var. İstek/cevap döngüsünü anlamadan framework'ü ezberlersin. Anlarsan mantığı kurarsın.",
      body: `
        <p>Bir kullanıcı adres çubuğuna bir URL yazdığında ne olur? Tarayıcı, sunucuya bir <strong>HTTP isteği (request)</strong> gönderir. Sunucu bunu işler ve bir <strong>cevap (response)</strong> döner — genelde HTML, bazen JSON.</p>
        <h3>Bilmen gereken kavramlar</h3>
        <ul>
          <li><strong>HTTP metodları:</strong> <code>GET</code> (veri al), <code>POST</code> (veri gönder), <code>PUT/PATCH</code> (güncelle), <code>DELETE</code> (sil)</li>
          <li><strong>Status kodları:</strong> <code>200</code> tamam, <code>302</code> yönlendirme, <code>404</code> bulunamadı, <code>500</code> sunucu hatası</li>
          <li><strong>Request'in parçaları:</strong> URL, header'lar, query string (<code>?id=5</code>), body</li>
          <li><strong>Client / Server:</strong> Tarayıcı istemci (client), bizim PHP kodumuz sunucu (server) tarafıdır</li>
        </ul>
        <p>Laravel'de bir route yazdığında aslında "şu URL'e şu metodla istek gelirse, şu cevabı üret" demiş oluyorsun. Hepsi bu.</p>`,
      code: [
        { lang:"bash", fn:"bir HTTP isteği", src:
`GET /raporlar?tarih=2026-01 HTTP/1.1
Host: blog.local
Accept: text/html

# Sunucunun cevabı:
HTTP/1.1 200 OK
Content-Type: text/html
# ...ardından HTML gövdesi gelir` }
      ],
      steps: [
        "Tarayıcıda F12 → Network sekmesini aç, bir siteyi yenile ve giden istekleri izle.",
        "Bir isteğe tıkla; metodunu, status kodunu ve header'larını incele.",
        "GET ile POST arasındaki farkı kendi cümlelerinle bir yere not et."
      ],
      resources: [
        { t:"Doküman", label:"MDN — HTTP'ye genel bakış", url:"https://developer.mozilla.org/tr/docs/Web/HTTP/Overview" },
        { t:"Referans", label:"HTTP status kodları (MDN)", url:"https://developer.mozilla.org/en-US/docs/Web/HTTP/Status" }
      ]
    }
  ]
},

{
  num: 1, id: "php", title: "PHP Temelleri",
  subtitle: "Dilin kendisi",
  checkpoint: { desc: "PHP örneklerini (diziler, OOP, Composer) çalıştırdıysan; kısa kod parçanı ya da çıktı görüntünü paylaşabilirsin.", url: "https://tally.so/r/VLaRKE" },
  topics: [
    {
      id: "php-syntax",
      eyebrow: "Faz 1 · PHP Temelleri",
      title: "PHP söz dizimi & değişkenler",
      why: "Laravel bir PHP framework'ü. Dili bilmeden framework öğrenmek, gramer bilmeden roman yazmaya benzer. Önce sağlam bir PHP temeli.",
      body: `
        <p>PHP, web için doğmuş bir dil. Kodun <code>&lt;?php</code> ile başlar. Değişkenler <code>$</code> ile yazılır ve tip belirtmezsin — PHP tipi kendi anlar (ama modern PHP'de tip belirtmek iyi alışkanlıktır).</p>
        <h3>Temel tipler</h3>
        <ul>
          <li><strong>string</strong> — metin: <code>"merhaba"</code></li>
          <li><strong>int / float</strong> — sayı: <code>42</code>, <code>3.14</code></li>
          <li><strong>bool</strong> — doğru/yanlış: <code>true</code>, <code>false</code></li>
          <li><strong>array</strong> — liste veya sözlük</li>
          <li><strong>null</strong> — değer yok</li>
        </ul>
        <p>String birleştirme <code>.</code> (nokta) iledir, <code>+</code> ile değil. Çift tırnak içinde değişken doğrudan yazılabilir; tek tırnakta yazılmaz.</p>`,
      code: [
        { lang:"php", fn:"basics.php", src:
`<?php
$ad = "Emin";
$yas = 25;
$aktifMi = true;

// Çift tırnakta değişken doğrudan çözülür
echo "Merhaba $ad, yaşın $yas.";

// Tek tırnakta çözülmez, birleştirmek gerekir
echo 'Merhaba ' . $ad;

// Modern PHP: fonksiyonda tip belirtmek
function selamla(string $isim): string {
    return "Selam, {$isim}!";
}` }
      ],
      steps: [
        "Bir <code>test.php</code> dosyası oluştur ve içinde birkaç değişken tanımla.",
        "<code>php test.php</code> ile terminalden çalıştır, çıktıyı gör.",
        "String birleştirme ve çift/tek tırnak farkını kendi örneğinle dene."
      ],
      resources: [
        { t:"Doküman", label:"PHP Manual — Dil referansı", url:"https://www.php.net/manual/tr/langref.php" },
        { t:"Kurs", label:"PHP The Right Way (modern PHP pratikleri)", url:"https://phptherightway.com/" }
      ]
    },
    {
      id: "php-yapilar",
      eyebrow: "Faz 1 · PHP Temelleri",
      title: "Diziler, döngüler, fonksiyonlar",
      why: "Veritabanından gelen kayıtlar birer dizidir. Onları döngüyle işleyip fonksiyonlarla düzenlersin. Laravel'in Collection'ları da bu mantığın üstüne kuruludur.",
      body: `
        <p><strong>Diziler (array)</strong> PHP'nin bel kemiğidir. İki tür vardır: sıralı liste (<code>[1,2,3]</code>) ve anahtar-değer sözlüğü (<code>['ad' =&gt; 'Emin']</code>). Veritabanı kayıtları genelde ikincisi gibi gelir.</p>
        <h3>Sık kullanılan döngüler</h3>
        <ul>
          <li><code>foreach</code> — bir diziyi baştan sona gezmek için (en çok kullanacağın)</li>
          <li><code>for</code> — sayaç bazlı döngü</li>
          <li><code>while</code> — koşul sağlandığı sürece dön</li>
        </ul>
        <p><strong>Fonksiyonlar</strong> tekrar eden kodu tek yerde toplar. Bir işi bir kez yaz, her yerde çağır. İyi bir fonksiyon tek bir iş yapar ve adı ne yaptığını söyler.</p>`,
      code: [
        { lang:"php", fn:"collections.php", src:
`<?php
$kullanicilar = [
    ['ad' => 'Emin', 'yas' => 25],
    ['ad' => 'Ayşe', 'yas' => 30],
];

// Diziyi gez
foreach ($kullanicilar as $kullanici) {
    echo $kullanici['ad'] . ' - ' . $kullanici['yas'] . "\\n";
}

// Fonksiyon: yaş ortalaması
function ortalamaYas(array $liste): float {
    $toplam = array_sum(array_column($liste, 'yas'));
    return $toplam / count($liste);
}

echo ortalamaYas($kullanicilar); // 27.5` }
      ],
      steps: [
        "Bir dizi oluştur ve <code>foreach</code> ile ekrana yazdır.",
        "<code>array_map</code>, <code>array_filter</code>, <code>array_column</code> fonksiyonlarını sırayla dene.",
        "Kendi fonksiyonunu yaz: bir sayı listesi al, sadece çift olanları döndür."
      ],
      resources: [
        { t:"Doküman", label:"PHP — Diziler (array fonksiyonları)", url:"https://www.php.net/manual/tr/ref.array.php" },
        { t:"Referans", label:"PHP — Kontrol yapıları", url:"https://www.php.net/manual/tr/language.control-structures.php" }
      ]
    },
    {
      id: "php-oop",
      eyebrow: "Faz 1 · PHP Temelleri",
      title: "OOP: sınıflar, kalıtım, interface, trait",
      why: "Laravel baştan sona nesne yönelimlidir. Model, Controller, Service — hepsi birer sınıf. OOP mantığını kurmadan Laravel'de yazdığın kod ezber kalır. Bu konu bu fazın en önemlisi.",
      body: `
        <p><strong>Nesne Yönelimli Programlama (OOP)</strong>, kodu gerçek dünya nesneleri gibi düşünmeni sağlar. Bir <code>Kullanici</code> sınıfı, bir kullanıcının hem verilerini (ad, email) hem davranışlarını (giriş yap, şifre değiştir) tek çatı altında toplar.</p>
        <h3>Dört temel kavram</h3>
        <ul>
          <li><strong>Class / Object:</strong> Class kalıp, object o kalıptan üretilen gerçek örnek</li>
          <li><strong>Kalıtım (extends):</strong> Bir sınıf başka bir sınıfın özelliklerini devralır</li>
          <li><strong>Interface:</strong> "Bu sınıf şu metotları içermeli" diye sözleşme koyar</li>
          <li><strong>Trait:</strong> Birden fazla sınıfın paylaştığı ortak kodu tek yerde tutar</li>
        </ul>
        <p>Laravel'de <code>class UserController extends Controller</code> yazdığında kalıtımı, <code>use HasFactory</code> yazdığında trait'i kullanıyorsun. Yani bunlar teori değil, her gün göreceğin şeyler.</p>`,
      code: [
        { lang:"php", fn:"Kullanici.php", src:
`<?php
class Kullanici {
    public function __construct(
        public string $ad,
        private string $email
    ) {}

    public function getEmail(): string {
        return $this->email;
    }
}

// Kalıtım: Admin, Kullanici'nin her şeyine sahip + fazlası
class Admin extends Kullanici {
    public function yetkiVer(): string {
        return "{$this->ad} artık yönetici.";
    }
}

$a = new Admin('Deniz', 'deniz@example.com');
echo $a->yetkiVer();` }
      ],
      steps: [
        "Bir <code>Urun</code> sınıfı yaz: ad ve fiyat özellikleri olsun, bir de <code>indirimliFiyat()</code> metodu.",
        "Bu sınıftan <code>new Urun(...)</code> ile bir nesne üret ve metodunu çağır.",
        "<code>extends</code> ile bir alt sınıf türet ve yeni bir metot ekle."
      ],
      resources: [
        { t:"Doküman", label:"PHP — Sınıflar ve nesneler", url:"https://www.php.net/manual/tr/language.oop5.php" },
        { t:"Rehber", label:"PHP OOP — trait & interface açıklamalı", url:"https://www.php.net/manual/tr/language.oop5.traits.php" }
      ]
    },
    {
      id: "composer",
      eyebrow: "Faz 1 · PHP Temelleri",
      title: "Composer, namespace & autoload",
      why: "Laravel'i kuran, paketleri indiren, sınıfları otomatik yükleyen şey Composer. Her projede <code>composer install</code> yazacaksın. Namespace'i anlamazsan 'class not found' hatalarında kaybolursun.",
      body: `
        <p><strong>Composer</strong>, PHP'nin paket yöneticisidir (JavaScript'teki npm gibi). Projenin ihtiyaç duyduğu kütüphaneleri <code>composer.json</code>'a yazar, <code>composer install</code> ile indirir.</p>
        <h3>Namespace neden var?</h3>
        <p>Büyük projelerde aynı isimde iki sınıf olabilir. <strong>Namespace</strong>, sınıfları klasör gibi gruplayarak çakışmayı önler. Laravel'de <code>App\\Models\\User</code> aslında "App klasörü içinde Models içinde User sınıfı" demektir.</p>
        <h3>Autoload (PSR-4)</h3>
        <p>Eskiden her dosyayı <code>require</code> ile elle dahil ederdin. Composer'ın <strong>autoload</strong>'u sayesinde bir sınıfı kullandığın anda otomatik yüklenir. Sadece namespace ile klasör yapısının eşleşmesi yeter.</p>`,
      code: [
        { lang:"bash", fn:"composer", src:
`# Projenin bağımlılıklarını indir (klonladıktan sonra ilk iş)
composer install

# Yeni bir paket ekle
composer require guzzlehttp/guzzle

# Autoload haritasını yenile
composer dump-autoload` },
        { lang:"php", fn:"namespace örneği", src:
`<?php
namespace App\\Services;

use App\\Models\\User;   // başka namespace'ten sınıf çağır

class RaporServisi {
    public function uret(User $user): array {
        return ['sahip' => $user->name];
    }
}` }
      ],
      steps: [
        "Bir Laravel projesinde <code>composer.json</code> dosyasını aç ve <code>require</code> bölümünü incele.",
        "<code>composer install</code> çalıştır ve <code>vendor/</code> klasörünün oluştuğunu gör.",
        "<code>app/</code> altında herhangi bir sınıf aç; dosyanın en üstündeki <code>namespace</code> ile klasör yolunun nasıl eşleştiğine dikkat et."
      ],
      resources: [
        { t:"Doküman", label:"Composer — Temel kullanım", url:"https://getcomposer.org/doc/01-basic-usage.md" },
        { t:"Standart", label:"PSR-4 Autoloading standardı", url:"https://www.php-fig.org/psr/psr-4/" }
      ]
    }
  ]
},

{
  num: 2, id: "ortam", title: "Local Ortam",
  subtitle: "Bizim kurulumumuz",
  checkpoint: { desc: "Homestead&#39;i kurup siteyi tarayıcıda açtıysan; <code>php -v</code> çıktısı ve açılan sayfanın ekran görüntüsünü paylaş.", url: "https://tally.so/r/VLaRKE" },
  topics: [
    {
      id: "vagrant-vbox",
      eyebrow: "Faz 2 · Local Ortam",
      title: "VirtualBox & Vagrant nedir?",
      why: "Kodu kendi bilgisayarında değil, sunucuyla birebir aynı bir sanal makinede çalıştırıyoruz. Böylece 'bende çalışıyordu' sorunu ortadan kalkar. Bu ikili, o sanal makineyi kuran araçlar.",
      body: `
        <p><strong>VirtualBox</strong>, bilgisayarının içinde ayrı bir bilgisayar (sanal makine) çalıştırmanı sağlar. Bizim durumumuzda bu, sunucumuzla aynı özelliklere sahip bir Ubuntu makinesidir.</p>
        <p><strong>Vagrant</strong> ise bu sanal makineyi tek komutla kurup ayağa kaldıran araçtır. "Şu Ubuntu'yu, şu PHP sürümüyle, şu klasörler bağlı olacak şekilde kur" dersin, gerisini Vagrant halleder.</p>
        <h3>Neden kendi makineme kurmuyoruz?</h3>
        <ul>
          <li>Herkeste aynı PHP, aynı MySQL, aynı nginx sürümü olur → tutarlılık</li>
          <li>Bilgisayarını kirletmezsin; sil-baştan kurmak tek komut</li>
          <li>Canlı sunucuyla aynı ortam → sürprizler azalır</li>
        </ul>
        <p><strong>Homestead</strong>, Laravel ekibinin hazırladığı, Vagrant üzerinde çalışan hazır bir kutudur — bir sonraki konu tam olarak bu.</p>`,
      code: [
        { lang:"bash", fn:"vagrant temel komutlar", src:
`# Sanal makineyi ayağa kaldır
vagrant up

# Makinenin içine SSH ile gir
vagrant ssh

# Değişiklikten sonra yeniden yapılandır
vagrant reload --provision

# İşin bitince kapat (silmez, durdurur)
vagrant halt` }
      ],
      steps: [
        "VirtualBox'ı resmi siteden indir ve kur.",
        "Vagrant'ı indir ve kur; <code>vagrant --version</code> ile doğrula.",
        "Kavramı zihninde oturt: VirtualBox = sanal makineyi çalıştıran motor, Vagrant = onu yöneten şoför."
      ],
      resources: [
        { t:"İndir", label:"VirtualBox — resmi indirme", url:"https://www.virtualbox.org/wiki/Downloads" },
        { t:"İndir", label:"Vagrant — resmi indirme", url:"https://developer.hashicorp.com/vagrant/install" }
      ]
    },
    {
      id: "homestead-kurulum",
      eyebrow: "Faz 2 · Local Ortam",
      title: "Laravel Homestead kurulumu",
      why: "Bizim standart geliştirme ortamımız bu. İlk günlerinde en çok uğraşacağın konu — bir kez düzgün kurunca aylarca sorunsuz çalışır. Takılırsan çekinme, sor.",
      body: `
        <p><strong>Homestead</strong>, PHP, MySQL, nginx, Redis ve daha fazlasını hazır içeren resmi bir Vagrant box'udur. Biz repoyu klonlayıp uğraşmak yerine, box'ı doğrudan projeye <strong>pinleyip</strong> başlatıyoruz — daha hızlı, ve sürüm herkeste sabit kalıyor.</p>
        <h3>Kurulum mantığı</h3>
        <ol style="padding-left:20px">
          <li>Projenin duracağı klasöre girersin</li>
          <li><code>vagrant init laravel/homestead --box-version 14.0.2</code> ile o klasöre bir <code>Vagrantfile</code> oluşturursun</li>
          <li><code>vagrant up</code> dersin; box yoksa önce iner, sonra makine ayağa kalkar</li>
          <li><code>vagrant ssh</code> ile içine girip çalışırsın</li>
        </ol>
        <p><strong>Neden sürümü pinliyoruz?</strong> <code>--box-version</code> vermezsen Vagrant bazen mimariyi <em>"unknown"</em> görüp yanlış ya da beklediğinden eski bir box çekebiliyor. Sürümü (<code>14.0.2</code>) sabitlemek, ekipteki herkeste birebir aynı ortamı garantiler.</p>`,
      code: [
        { lang:"bash", fn:"homestead kurulum", src:
`# Projenin duracağı klasöre gir (yoksa oluştur)
cd ~/code/blog

# Homestead box'ını 14.0.2'ye pinleyerek Vagrantfile üret
vagrant init laravel/homestead --box-version 14.0.2

# Makineyi başlat (box yoksa önce indirir — ilk sefer uzun sürebilir)
vagrant up

# Makinenin içine gir ve PHP'nin hazır olduğunu doğrula
vagrant ssh
php -v` }
      ],
      steps: [
        "VirtualBox ve Vagrant'ın kurulu olduğundan emin ol (önceki konu).",
        "Projenin duracağı klasöre gir: <code>cd ~/code/blog</code>.",
        "<code>vagrant init laravel/homestead --box-version 14.0.2</code> çalıştır; klasörde bir <code>Vagrantfile</code> oluştuğunu gör.",
        "<code>vagrant up</code> ile makineyi ayağa kaldır (box ilk sefer indirilir, sabret).",
        "<code>vagrant ssh</code> ile bağlan ve <code>php -v</code> ile ortamın hazır olduğunu doğrula."
      ],
      resources: [
        { t:"Doküman", label:"Laravel Homestead — resmi kurulum rehberi", url:"https://laravel.com/docs/homestead" },
        { t:"Depo", label:"laravel/homestead — GitHub", url:"https://github.com/laravel/homestead" }
      ]
    },
    {
      id: "vagrantfile-ag",
      eyebrow: "Faz 2 · Local Ortam",
      title: "Vagrantfile: ağ & port ayarları",
      why: "Projeyi bilgisayarının tarayıcısından açabilmen ve veritabanına Navicat ile bağlanabilmen için makinenin portlarını host'a yönlendirmen gerekir. Bu ayarlar Vagrantfile'da yapılır; olmazsa 'siteye erişemiyorum' ya da 'Navicat bağlanmıyor' dersin.",
      body: `
        <p><code>vagrant init</code> sana bir <code>Vagrantfile</code> üretti. Ağ ve port ayarlarını bunun içine eklersin. En temiz akış: init'ten sonra, <code>vagrant up</code>'tan önce eklemek. Sonradan eklersen <code>vagrant reload</code> ile uygularsın.</p>
        <h3>İki tür bağlantı</h3>
        <ul>
          <li><strong>private_network:</strong> Makineye sabit bir yerel IP verir (<code>192.168.33.10</code>). Makineye bu IP üzerinden de ulaşabilirsin.</li>
          <li><strong>forwarded_port:</strong> Makinedeki bir portu bilgisayarının aynı portuna bağlar. Örneğin guest 80 → host 80 sayesinde site tarayıcıda açılır; guest 3306 → host 3306 sayesinde Navicat MySQL'e bağlanır.</li>
        </ul>
        <p>Bizim kullandığımız ayarlar aşağıda. <code>vbguest</code> satırları, VirtualBox Guest Additions'ın boot sırasında otomatik güncellenip makineyi takmasını engeller; <code>boot_timeout</code> ise yavaş makinelerde ilk açılışa daha uzun süre tanır.</p>`,
      code: [
        { lang:"ruby", fn:"Vagrantfile (ilgili satırlar)", src:
`config.vm.network "private_network", ip: "192.168.33.10"

config.vbguest.auto_update = false
config.vbguest.no_remote = true

config.vm.network "forwarded_port", guest: 80,   host: 80
config.vm.network "forwarded_port", guest: 443,  host: 443
config.vm.network "forwarded_port", guest: 3306, host: 3306   # MySQL -> Navicat
config.vm.network "forwarded_port", guest: 9200, host: 9200   # Elasticsearch
# config.vm.network "forwarded_port", guest: 8080, host: 8080, protocol: "tcp"

config.vm.boot_timeout = 300` },
        { lang:"bash", fn:"değişikliği uygula", src:
`# Vagrantfile'ı düzenledikten sonra ayarları uygula
vagrant reload` }
      ],
      steps: [
        "<code>vagrant init</code> ile oluşan <code>Vagrantfile</code>'ı aç.",
        "<code>private_network</code> satırıyla makineye sabit IP ver (<code>192.168.33.10</code>).",
        "Gereken portları <code>forwarded_port</code> ile host'a yönlendir: 80, 443, 3306 (MySQL), 9200 (Elasticsearch).",
        "Makine zaten çalışıyorsa <code>vagrant reload</code> ile ayarları uygula.",
        "Tarayıcıda siteyi, Navicat'te <code>127.0.0.1:3306</code>'yı test et."
      ],
      resources: [
        { t:"Doküman", label:"Vagrant — Forwarded Ports", url:"https://developer.hashicorp.com/vagrant/docs/networking/forwarded_ports" },
        { t:"Doküman", label:"Vagrant — Private Networks", url:"https://developer.hashicorp.com/vagrant/docs/networking/private_network" }
      ]
    },
    {
      id: "php-surumu",
      eyebrow: "Faz 2 · Local Ortam",
      title: "PHP 8.5'i kurma ve seçme",
      why: "Projelerimizi PHP 8.5 ile çalıştırıyoruz. Box birden fazla PHP sürümü barındırabilir; doğru sürümü hem komut satırında (CLI) hem de nginx'in kullandığı FPM'de aktif etmen gerekir. Yanlış sürüm 'bu fonksiyon yok' gibi tuhaf hatalara yol açar.",
      body: `
        <p>Homestead box'ı içinde birden çok PHP sürümü bir arada bulunabilir; hangisini kullanacağını sen seçersin. İki yer önemli:</p>
        <ul>
          <li><strong>CLI</strong> — <code>php artisan</code>, <code>composer</code> gibi komutların kullandığı sürüm</li>
          <li><strong>FPM</strong> — nginx'in PHP isteklerini ilettiği servis; site config'indeki <code>fastcgi_pass</code> socket'i buna işaret eder</li>
        </ul>
        <h3>Kurulum / aktifleştirme</h3>
        <p>Box'ta 8.5 hazır gelmiyorsa apt ile kurarsın (Homestead'de <code>ondrej/php</code> deposu zaten ekli). Ardından CLI sürümünü Homestead'in <code>php85</code> yardımcı komutuyla ya da <code>update-alternatives</code> ile değiştirirsin.</p>
        <p><strong>Doğrulama:</strong> <code>php -v</code> çıktısında <code>8.5</code> görmeli, ve nginx site config'inde <code>fastcgi_pass</code> <code>php8.5-fpm.sock</code>'a işaret etmelidir. İkisi uyuşmazsa site çalışır ama komut satırı farklı sürümle çalışır — kafa karıştırır.</p>`,
      code: [
        { lang:"bash", fn:"PHP 8.5 kur (makine içinde)", src:
`vagrant ssh

# 8.5 paketlerini kur (ondrej deposu Homestead'de hazır)
sudo apt-get update
sudo apt-get install -y php8.5-fpm php8.5-cli php8.5-mysql \\
    php8.5-mbstring php8.5-xml php8.5-curl php8.5-zip

# CLI'yi 8.5'e geçir (Homestead yardımcı komutu)
php85     # yoksa: sudo update-alternatives --set php /usr/bin/php8.5

php -v    # çıktıda 8.5 görmelisin

# Composer'ı yeni PHP sürümüne göre güncelle
composer self-update` },
        { lang:"bash", fn:"FPM'i doğrula", src:
`# 8.5 FPM servisi çalışıyor mu?
sudo systemctl status php8.5-fpm

# nginx'in bağlanacağı socket burada olmalı
ls /run/php/php8.5-fpm.sock` }
      ],
      steps: [
        "<code>vagrant ssh</code> ile makineye gir, <code>php -v</code> ile mevcut sürümü gör.",
        "8.5 değilse apt ile kur: fpm, cli, mysql, mbstring, xml, curl, zip paketleri.",
        "CLI'yi 8.5'e geçir (<code>php85</code> ya da <code>update-alternatives</code>), <code>php -v</code> ile doğrula.",
        "PHP sürümünü değiştirdikten sonra <code>composer self-update</code> çalıştır — Composer'ın yeni sürümle uyumlu olduğundan emin ol.",
        "<code>php8.5-fpm</code> servisinin çalıştığını ve socket'in <code>/run/php/php8.5-fpm.sock</code>'ta olduğunu kontrol et.",
        "Site config'indeki <code>fastcgi_pass</code>'in bu socket'e işaret ettiğinden emin ol (bir sonraki konu)."
      ],
      resources: [
        { t:"Doküman", label:"PHP 8.5 — yenilikler / geçiş rehberi", url:"https://www.php.net/manual/en/migration85.php" },
        { t:"Depo", label:"ondrej/php PPA — PHP paketleri", url:"https://launchpad.net/~ondrej/+archive/ubuntu/php" }
      ]
    },
    {
      id: "site-eslemesi",
      eyebrow: "Faz 2 · Local Ortam",
      title: "Site tanımlama (nginx sites-enabled + hosts)",
      why: "Yeni bir projeyi tarayıcıda açabilmek için iki şey gerekir: makine içinde nginx'in o projeyi tanıması, ve bilgisayarının o alan adını makineye yönlendirmesi. Bizde bu ikisi de elle yapılır — mantığını kavrarsan her yeni projede 2 dakikada hallolur.",
      body: `
        <p>Bizde <code>Homestead.yaml</code> <strong>kullanmıyoruz</strong>. Box'ı başlattıktan sonra site'ı iki adımda tanıtıyoruz: makine içinde nginx'i elle ayarlıyoruz, bilgisayarında da <code>hosts</code> dosyasına bir satır ekliyoruz.</p>
        <h3>1. Makine içinde: nginx sites-enabled</h3>
        <p><code>vagrant ssh</code> ile makineye girip <code>/etc/nginx/sites-enabled/</code> altındaki server bloğunu düzenlersin (ya da yeni bir tane oluşturursun). İki kritik satır var: <code>server_name</code> — hangi alan adına cevap vereceği; ve <code>root</code> — projenin <code>public</code> klasörü.</p>
        <h3>2. Bilgisayarında: hosts dosyası</h3>
        <p>Tarayıcının bu alan adını makineye yönlendirmesi için host makinenin <code>hosts</code> dosyasına bir satır eklersin. Biz <code>xip.io</code> biçiminde adlar kullanıyoruz: <code>blog.127.0.0.1.xip.io</code> gibi. Bu isimlendirme, alt-alan adı konforu sağlayan eski bir kalıptır; <code>hosts</code>'a sabitlediğimiz için de dış bir servise ihtiyaç kalmaz, isim doğrudan <code>127.0.0.1</code>'e çözülür.</p>
        <p><strong>Değişiklikten sonra:</strong> nginx config'ini her düzenlediğinde makine içinde önce <code>sudo nginx -t</code> ile doğrula (hata varsa satırını söyler), sonra <code>sudo systemctl reload nginx</code> ile yeniden yükle. Aksi halde nginx eski hâliyle çalışmaya devam eder.</p>`,
      code: [
        { lang:"bash", fn:"makine içinde site config'ini aç", src:
`# Makineye gir
vagrant ssh

# Projeye ait server bloğunu düzenle (yoksa oluştur)
sudo nano /etc/nginx/sites-enabled/blog` },
        { lang:"nginx", fn:"/etc/nginx/sites-enabled/blog", src:
`server {
    listen 80;
    server_name blog.127.0.0.1.xip.io;
    root /home/vagrant/code/blog/public;   # projenin public'i

    index index.php index.html;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \\.php$ {
        # Kullandığın PHP sürümüne göre socket yolu (biz 8.5 kullanıyoruz)
        fastcgi_pass unix:/run/php/php8.5-fpm.sock;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
    }
}` },
        { lang:"bash", fn:"doğrula + yeniden yükle", src:
`sudo nginx -t                    # config geçerli mi?
sudo systemctl reload nginx      # değişikliği uygula` },
        { lang:"bash", fn:"host: hosts dosyası", src:
`# Bilgisayarının (host) hosts dosyasına ekle
# Mac/Linux:  sudo nano /etc/hosts
# Windows:    C:\\Windows\\System32\\drivers\\etc\\hosts

127.0.0.1   blog.127.0.0.1.xip.io` }
      ],
      steps: [
        "Box çalışırken <code>vagrant ssh</code> ile makineye gir.",
        "<code>/etc/nginx/sites-enabled/</code> altında server bloğunu düzenle: <code>server_name</code>'i alan adına, <code>root</code>'u projenin <code>public</code> klasörüne ayarla.",
        "<code>sudo nginx -t</code> ile doğrula, ardından <code>sudo systemctl reload nginx</code> ile yeniden yükle.",
        "Bilgisayarının <code>hosts</code> dosyasına <code>127.0.0.1&nbsp;&nbsp;blog.127.0.0.1.xip.io</code> satırını ekle.",
        "Tarayıcıda alan adını aç; Laravel'in geldiğini gör. Gelmezse önce makine içinde <code>error.log</code>'a bak."
      ],
      resources: [
        { t:"Doküman", label:"Laravel için örnek nginx yapılandırması", url:"https://laravel.com/docs/deployment#nginx" },
        { t:"Doküman", label:"nginx — server_name yönergesi", url:"https://nginx.org/en/docs/http/server_names.html" }
      ]
    },
    {
      id: "nginx-rol",
      eyebrow: "Faz 2 · Local Ortam",
      title: "nginx'in local ortamdaki rolü",
      why: "Tarayıcıdan gelen isteği ilk karşılayan nginx'tir; onu PHP'ye iletir. Canlı sunucumuzda da nginx var. Bizde site config'ini elle düzenlediğin için (önceki konu) bu bloğun ne yaptığını anlaman ayrıca önemli.",
      body: `
        <p><strong>nginx</strong> bir <em>web sunucusudur</em>. Görevi basit ama kritik: tarayıcıdan gelen isteği karşılamak ve onu doğru yere yönlendirmek. Statik dosyaysa (resim, CSS) doğrudan verir; PHP gerektiren bir istekse PHP-FPM'e iletir, cevabı alıp tarayıcıya döner.</p>
        <h3>İsteğin akışı</h3>
        <ul>
          <li>Tarayıcı <code>blog.127.0.0.1.xip.io</code>'ya istek atar (hosts bunu makineye yönlendirir)</li>
          <li>nginx, <code>server_name</code>'i eşleşen server bloğunu bulur</li>
          <li>İsteği o bloğun <code>root</code>'undaki <code>index.php</code>'ye yönlendirir ve PHP-FPM'e iletir</li>
          <li>Laravel devreye girer, cevabı üretir</li>
          <li>nginx cevabı tarayıcıya geri döner</li>
        </ul>
        <p>Bizde site yapılandırmasını <code>Homestead.yaml</code> üretmez — <code>/etc/nginx/sites-enabled/</code> altındaki bloğu sen yazarsın. Bu yüzden bir site açılmadığında ilk bakacağın yer bu blok ve nginx loglarıdır. Log okumayı alışkanlık edin: hataların çoğu orada zaten adıyla yazılı.</p>`,
      code: [
        { lang:"bash", fn:"nginx kontrol (makine içinde)", src:
`# Önce makineye gir
vagrant ssh

# nginx durumunu kontrol et
sudo systemctl status nginx

# Yapılandırmayı test et (hata varsa söyler)
sudo nginx -t

# nginx hata loglarını izle
sudo tail -f /var/log/nginx/error.log

# Site yapılandırmalarının bulunduğu yer
ls /etc/nginx/sites-available/` }
      ],
      steps: [
        "<code>vagrant ssh</code> ile makineye gir.",
        "<code>sudo nginx -t</code> ile yapılandırmanın geçerli olduğunu doğrula.",
        "<code>/etc/nginx/sites-available/</code> içinde sitenin config dosyasını bul ve incele.",
        "Bir sayfa hata verdiğinde önce <code>error.log</code>'a bakma alışkanlığı edin."
      ],
      resources: [
        { t:"Doküman", label:"nginx — başlangıç rehberi", url:"https://nginx.org/en/docs/beginners_guide.html" },
        { t:"Rehber", label:"nginx + PHP-FPM nasıl çalışır", url:"https://www.digitalocean.com/community/tutorials/understanding-nginx-http-proxying-load-balancing-buffering-and-caching" }
      ]
    }
  ]
},

{
  num: 3, id: "laravel", title: "Laravel'e Giriş",
  subtitle: "Framework'ün temelleri",
  checkpoint: { desc: "İlk route / controller / Blade sayfanı çalıştırdıysan; ekran görüntüsünü ya da kod linkini paylaş.", url: "https://tally.so/r/VLaRKE" },
  topics: [
    {
      id: "laravel-yapi",
      eyebrow: "Faz 3 · Laravel'e Giriş",
      title: "Proje yapısı & request lifecycle",
      why: "Bir Laravel projesini ilk açtığında onlarca klasör görürsün. Hangisi ne işe yarar bilmezsen kaybolursun. Bir isteğin baştan sona nasıl aktığını da anlaman gerek.",
      body: `
        <p>Bir Laravel projesinde en çok dokunacağın klasörler:</p>
        <ul>
          <li><code>routes/</code> — URL'ler burada tanımlı (<code>web.php</code>, <code>api.php</code>)</li>
          <li><code>app/Http/Controllers/</code> — isteği işleyen sınıflar</li>
          <li><code>app/Models/</code> — veritabanı tabloları</li>
          <li><code>resources/views/</code> — Blade şablonları (HTML)</li>
          <li><code>config/</code> — ayarlar</li>
          <li><code>database/migrations/</code> — tablo yapıları</li>
          <li><code>.env</code> — ortam değişkenleri (veritabanı şifresi vb.)</li>
        </ul>
        <h3>Request lifecycle (bir isteğin yolculuğu)</h3>
        <p>İstek → <code>public/index.php</code> → çekirdek (kernel) → middleware'ler → route eşleşir → controller çalışır → cevap üretilir → middleware'lerden geri geçer → tarayıcıya döner. Bu döngüyü aklında tutarsan, "acaba bu kod nerede çalışıyor?" sorusuna hep cevabın olur.</p>`,
      code: [
        { lang:"bash", fn:"yeni proje + çalıştır", src:
`# Yeni Laravel projesi (öğrenmek için)
composer create-project laravel/laravel deneme
cd deneme

# Uygulama anahtarını üret
php artisan key:generate

# Geliştirme sunucusunu başlat (Homestead dışında hızlı deneme için)
php artisan serve` }
      ],
      steps: [
        "Bir Laravel projesi aç ve yukarıdaki klasörleri tek tek gez.",
        "<code>.env</code> dosyasını aç; veritabanı ayarlarını incele (ama şifreleri kimseyle paylaşma).",
        "<code>routes/web.php</code>'yi aç; ilk route'un neye benzediğini gör."
      ],
      resources: [
        { t:"Doküman", label:"Laravel — Directory Structure", url:"https://laravel.com/docs/structure" },
        { t:"Doküman", label:"Laravel — Request Lifecycle", url:"https://laravel.com/docs/lifecycle" }
      ]
    },
    {
      id: "routing",
      eyebrow: "Faz 3 · Laravel'e Giriş",
      title: "Routing",
      why: "Her sayfa bir route ile başlar. 'Bu URL'e gidince ne olacak?' sorusunun cevabı burada. En temel Laravel becerisi bu.",
      body: `
        <p>Route, bir URL ile bir kod parçasını eşleştirir. <code>routes/web.php</code>'de tanımlanır. Basit bir sayfayı doğrudan route içinde de yazabilirsin ama gerçek projelerde route'u bir controller'a bağlarsın.</p>
        <h3>Bilmen gerekenler</h3>
        <ul>
          <li><strong>Route parametreleri:</strong> <code>/urun/{id}</code> ile URL'den değer alırsın</li>
          <li><strong>İsimli route:</strong> <code>-&gt;name('urun.detay')</code> ile route'a isim verirsin, sonra <code>route('urun.detay')</code> ile linklersin</li>
          <li><strong>HTTP metodları:</strong> <code>Route::get</code>, <code>Route::post</code>, <code>Route::put</code>, <code>Route::delete</code></li>
        </ul>
        <p>İpucu: Tanımlı tüm route'ları görmek için <code>php artisan route:list</code> çok işine yarar.</p>`,
      code: [
        { lang:"php", fn:"routes/web.php", src:
`<?php
use Illuminate\\Support\\Facades\\Route;
use App\\Http\\Controllers\\RaporController;

// Basit route
Route::get('/', function () {
    return view('welcome');
});

// Parametreli + controller'a bağlı + isimli route
Route::get('/rapor/{id}', [RaporController::class, 'goster'])
    ->name('rapor.goster');

// Sadece POST kabul eden route
Route::post('/rapor', [RaporController::class, 'kaydet']);` }
      ],
      steps: [
        "Basit bir GET route'u yaz ve tarayıcıda aç.",
        "Parametreli bir route yaz (<code>/selam/{isim}</code>) ve URL'den geleni ekrana bas.",
        "<code>php artisan route:list</code> çalıştır ve projedeki route'ları incele."
      ],
      resources: [
        { t:"Doküman", label:"Laravel — Routing", url:"https://laravel.com/docs/routing" }
      ]
    },
    {
      id: "controllers",
      eyebrow: "Faz 3 · Laravel'e Giriş",
      title: "Controller'lar",
      why: "İş mantığı route içinde değil, controller'da yazılır. Bizim projelerdeki kodun büyük kısmı controller'larda. Nasıl yapılandırıldıklarını bilmen şart.",
      body: `
        <p><strong>Controller</strong>, bir isteği alıp cevabı hazırlayan sınıftır. Route "şu URL gelirse" der, controller "gelince şunu yap" der. Veriyi çeker, işler, view'e gönderir.</p>
        <h3>Artisan ile üretmek</h3>
        <p>Controller'ları elle değil, <code>artisan</code> komutuyla oluşturursun. Bu hem hızlı hem standart bir iskelet verir.</p>
        <p>Bir controller metodu tipik olarak şunları yapar: gelen isteği alır (<code>Request $request</code>), gerekli veriyi veritabanından çeker, bir <code>view</code> döner veya bir yere <code>redirect</code> eder.</p>`,
      code: [
        { lang:"bash", fn:"controller üret", src:
`php artisan make:controller RaporController` },
        { lang:"php", fn:"RaporController.php", src:
`<?php
namespace App\\Http\\Controllers;

use App\\Models\\Rapor;
use Illuminate\\Http\\Request;

class RaporController extends Controller
{
    public function goster($id)
    {
        $rapor = Rapor::findOrFail($id);
        return view('rapor.goster', ['rapor' => $rapor]);
    }

    public function kaydet(Request $request)
    {
        Rapor::create($request->only(['baslik', 'icerik']));
        return redirect()->route('rapor.index')
            ->with('mesaj', 'Rapor kaydedildi.');
    }
}` }
      ],
      steps: [
        "<code>php artisan make:controller SelamController</code> ile bir controller oluştur.",
        "İçine bir metot yaz, bir route ile bağla ve tarayıcıdan çağır.",
        "Controller'dan bir view döndürmeyi ve view'e veri göndermeyi dene."
      ],
      resources: [
        { t:"Doküman", label:"Laravel — Controllers", url:"https://laravel.com/docs/controllers" }
      ]
    },
    {
      id: "blade",
      eyebrow: "Faz 3 · Laravel'e Giriş",
      title: "Blade template motoru",
      why: "Kullanıcının gördüğü HTML'i Blade ile üretiyoruz. Controller'dan gelen veriyi ekrana basmak, döngü kurmak, koşul yazmak — hepsi Blade ile. Bizim view'lerimiz baştan sona Blade.",
      body: `
        <p><strong>Blade</strong>, Laravel'in şablon motorudur. HTML içinde PHP yazmanı kolaylaştırır. <code>.blade.php</code> uzantılı dosyalar <code>resources/views/</code> altında durur.</p>
        <h3>En çok kullanacağın söz dizimi</h3>
        <ul>
          <li><code>{{ $degisken }}</code> — değeri güvenli şekilde ekrana bas (XSS'e karşı otomatik korur)</li>
          <li><code>@if / @foreach / @forelse</code> — koşul ve döngüler</li>
          <li><code>@extends / @section / @yield</code> — ortak layout (tekrar eden header/footer için)</li>
          <li><code>@include</code> — başka bir Blade parçasını dahil et</li>
        </ul>
        <p><strong>Güvenlik notu:</strong> <code>{{ }}</code> her zaman veriyi kaçışlar (escape). Kullanıcıdan gelen veriyi asla <code>{!! !!}</code> ile ham basma — güvendiğin HTML dışında.</p>`,
      code: [
        { lang:"html", fn:"rapor/goster.blade.php", src:
`@extends('layouts.app')

@section('content')
    <h1>{{ $rapor->baslik }}</h1>

    @if ($rapor->onayli)
        <span class="badge">Onaylı</span>
    @endif

    <ul>
        @forelse ($rapor->maddeler as $madde)
            <li>{{ $madde->metin }}</li>
        @empty
            <li>Henüz madde yok.</li>
        @endforelse
    </ul>
@endsection` }
      ],
      steps: [
        "<code>resources/views/</code> altında bir <code>.blade.php</code> dosyası oluştur.",
        "Controller'dan bir dizi gönder ve <code>@foreach</code> ile ekrana yazdır.",
        "<code>@if</code> ile bir koşula göre farklı içerik göster."
      ],
      resources: [
        { t:"Doküman", label:"Laravel — Blade Templates", url:"https://laravel.com/docs/blade" }
      ]
    },
    {
      id: "middleware",
      eyebrow: "Faz 3 · Laravel'e Giriş",
      title: "Middleware",
      why: "'Bu sayfaya sadece giriş yapmış kullanıcı girebilsin' gibi kurallar middleware ile konur. İstek controller'a ulaşmadan önce bir filtre gibi çalışır. Yetki kontrolünün temeli budur.",
      body: `
        <p><strong>Middleware</strong>, istek controller'a varmadan önce (ya da cevap dönerken) araya giren bir katmandır. Bir güvenlik kapısı gibi düşün: her istek önce buradan geçer, uygunsa devam eder, değilse geri çevrilir.</p>
        <h3>Sık kullanılan örnekler</h3>
        <ul>
          <li><code>auth</code> — giriş yapmamış kullanıcıyı login sayfasına atar</li>
          <li><code>verified</code> — email doğrulaması ister</li>
          <li>Kendi middleware'in — örneğin sadece admin'lerin geçmesine izin ver</li>
        </ul>
        <p>Middleware'i bir route'a ya da route grubuna uygularsın. Böylece "şu sayfalar sadece giriş yapmışlara açık" demek tek satır olur.</p>`,
      code: [
        { lang:"php", fn:"route'a middleware uygula", src:
`<?php
// Sadece giriş yapmış kullanıcılar erişebilir
Route::get('/panel', [PanelController::class, 'index'])
    ->middleware('auth');

// Bir grup route'u tek seferde koru
Route::middleware(['auth'])->group(function () {
    Route::get('/rapor', [RaporController::class, 'index']);
    Route::get('/ayarlar', [AyarController::class, 'index']);
});` }
      ],
      steps: [
        "Bir route'a <code>auth</code> middleware'i ekle ve giriş yapmadan açmayı dene — login'e atıldığını gör.",
        "Birden çok route'u bir <code>middleware group</code> içine al.",
        "<code>php artisan make:middleware</code> ile basit bir kendi middleware'ini oluştur ve mantığını incele."
      ],
      resources: [
        { t:"Doküman", label:"Laravel — Middleware", url:"https://laravel.com/docs/middleware" }
      ]
    }
  ]
},

{
  num: 4, id: "veritabani", title: "Veritabanı & Eloquent",
  subtitle: "Veriyle çalışmak",
  checkpoint: { desc: "Migration&#39;ları çalıştırıp Navicat&#39;te tabloları gördüysen; Navicat ekranının ya da <code>migrate</code> çıktısının görüntüsünü paylaş.", url: "https://tally.so/r/VLaRKE" },
  topics: [
    {
      id: "veritabani-kurulum",
      eyebrow: "Faz 4 · Veritabanı & Eloquent",
      title: "Veritabanı bağlantısı & Navicat",
      why: "Migration yazmadan önce Laravel'in bağlanacağı bir veritabanı ve doğru .env ayarları gerekir. Veritabanını gözle görebilmek için de bilgisayarına Navicat'in ücretsiz sürümünü (Premium Lite) kurarsın — tabloları, kayıtları ve ilişkileri görmek işini çok kolaylaştırır.",
      body: `
        <p>Üç adım: makinede bir veritabanı oluştur, Laravel'in <code>.env</code>'ini ayarla, ve Navicat ile host bilgisayarından bağlan.</p>
        <h3>1. Veritabanını oluştur</h3>
        <p>Homestead box'ında MySQL hazır gelir; varsayılan kullanıcı <code>homestead</code>, şifre <code>secret</code>. Makine içinde projen için bir veritabanı açarsın.</p>
        <h3>2. .env ayarları</h3>
        <p>Laravel makinenin içinde çalıştığı için MySQL'e <code>127.0.0.1:3306</code> üzerinden bağlanır. Proje kökündeki <code>.env</code>'de <code>DB_*</code> satırlarını doldurursun.</p>
        <h3>3. Navicat ile bağlan</h3>
        <p>Navicat host bilgisayarında çalışır ve makinedeki MySQL'e bağlanır. Vagrantfile'da guest'in <code>3306</code> portunu host'a <code>3306</code> olarak yönlendirdiğimiz için (önceki konu), Navicat'te: host <code>127.0.0.1</code>, port <code>3306</code>, kullanıcı <code>homestead</code>, şifre <code>secret</code>. Alternatif olarak makinenin sabit IP'siyle de bağlanabilirsin: <code>192.168.33.10:3306</code>.</p>
        <p><strong>Not:</strong> Bu port sizin Vagrant ağ/port-forward ayarınıza bağlı — bağlanamazsan önce forward'ı kontrol et.</p>`,
      code: [
        { lang:"bash", fn:"veritabanı oluştur (makine içinde)", src:
`vagrant ssh

# MySQL'e gir (kullanıcı: homestead, şifre: secret)
mysql -u homestead -psecret

# MySQL içinde:
CREATE DATABASE blog CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
SHOW DATABASES;
EXIT;` },
        { lang:"bash", fn:".env (proje kökü)", src:
`DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=blog
DB_USERNAME=homestead
DB_PASSWORD=secret` },
        { lang:"bash", fn:"Navicat bağlantısı (host bilgisayar)", src:
`Host      : 127.0.0.1
Port      : 3306         # guest 3306 -> host 3306 (Vagrantfile'da forward)
Kullanici : homestead
Sifre     : secret` }
      ],
      steps: [
        "<code>vagrant ssh</code> → <code>mysql -u homestead -psecret</code> ile gir, projen için bir veritabanı oluştur.",
        "Proje <code>.env</code>'inde <code>DB_DATABASE</code>, <code>DB_USERNAME=homestead</code>, <code>DB_PASSWORD=secret</code> ayarla.",
        "<code>php artisan migrate</code> ile bağlantıyı test et (migration'ları bir sonraki konu anlatır).",
        "Navicat Premium Lite'ı (ücretsiz) kur ve host <code>127.0.0.1</code>, port <code>3306</code> ile bağlan.",
        "Navicat'te veritabanını aç; tabloların ve kayıtların geldiğini gör."
      ],
      resources: [
        { t:"İndir", label:"Navicat Premium Lite — ücretsiz sürüm", url:"https://www.navicat.com/en/download/navicat-premium-lite" },
        { t:"Doküman", label:"Laravel — Veritabanı yapılandırması", url:"https://laravel.com/docs/database#configuration" }
      ]
    },
    {
      id: "migrations",
      eyebrow: "Faz 4 · Veritabanı & Eloquent",
      title: "Migration'lar",
      why: "Tabloları elle phpMyAdmin'den değil, kodla oluşturuyoruz. Böylece herkeste aynı tablo yapısı olur ve değişiklikler git'te takip edilir. Bir tabloya sütun eklemek migration ile olur.",
      body: `
        <p><strong>Migration</strong>, veritabanı yapısının koddaki hâlidir. "Şu tabloyu şu sütunlarla oluştur" dersin, versiyon kontrolüne girer, ekipteki herkes aynı komutla aynı tabloları elde eder.</p>
        <h3>Neden migration?</h3>
        <ul>
          <li>Tablo yapısı git'te tutulur, geçmişi bellidir</li>
          <li><code>php artisan migrate</code> ile herkes aynı şemayı kurar</li>
          <li>Hata yaparsan <code>migrate:rollback</code> ile geri alırsın</li>
        </ul>
        <p><strong>Dikkat:</strong> Canlıdaki bir tabloyu asla elle değiştirme. Değişikliği migration olarak yaz, çalıştır. Böylece hem local hem canlı aynı kalır.</p>`,
      code: [
        { lang:"bash", fn:"migration üret & çalıştır", src:
`# Yeni tablo için migration üret
php artisan make:migration create_raporlar_table

# Mevcut tabloya sütun eklemek için
php artisan make:migration add_onayli_to_raporlar_table

# Migration'ları çalıştır
php artisan migrate

# Son grubu geri al
php artisan migrate:rollback` },
        { lang:"php", fn:"..._create_raporlar_table.php", src:
`<?php
use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('raporlar', function (Blueprint $table) {
            $table->id();
            $table->string('baslik');
            $table->text('icerik')->nullable();
            $table->boolean('onayli')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('raporlar');
    }
};` }
      ],
      steps: [
        "<code>php artisan make:migration create_notlar_table</code> ile bir migration oluştur.",
        "<code>up()</code> içinde birkaç sütun tanımla (<code>string</code>, <code>text</code>, <code>boolean</code>).",
        "<code>php artisan migrate</code> ile çalıştır ve tablonun oluştuğunu doğrula."
      ],
      resources: [
        { t:"Doküman", label:"Laravel — Migrations", url:"https://laravel.com/docs/migrations" }
      ]
    },
    {
      id: "eloquent",
      eyebrow: "Faz 4 · Veritabanı & Eloquent",
      title: "Eloquent modelleri & CRUD",
      why: "Veritabanıyla SQL yazarak değil, PHP nesneleriyle konuşuyoruz. <code>Rapor::find(1)</code> yazmak, uzun bir SELECT sorgusundan hem kısa hem güvenli. Günlük işin çoğu buradan geçer.",
      body: `
        <p><strong>Eloquent</strong>, Laravel'in ORM'idir — yani veritabanı tablolarını PHP sınıflarına (modellere) çevirir. <code>raporlar</code> tablosu, <code>Rapor</code> modeline karşılık gelir. Böylece SQL yerine metot çağırırsın.</p>
        <h3>CRUD — dört temel işlem</h3>
        <ul>
          <li><strong>Create:</strong> <code>Rapor::create([...])</code></li>
          <li><strong>Read:</strong> <code>Rapor::all()</code>, <code>Rapor::find(1)</code>, <code>Rapor::where(...)-&gt;get()</code></li>
          <li><strong>Update:</strong> <code>$rapor-&gt;update([...])</code></li>
          <li><strong>Delete:</strong> <code>$rapor-&gt;delete()</code></li>
        </ul>
        <p><strong>Güvenlik:</strong> <code>create</code> ve <code>update</code>'in çalışması için modelde <code>$fillable</code> tanımlaman gerekir — hangi alanların toplu doldurulabileceğini belirtir. Bu, istenmeyen alanların doldurulmasını engeller.</p>`,
      code: [
        { lang:"php", fn:"app/Models/Rapor.php", src:
`<?php
namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;

class Rapor extends Model
{
    protected $table = 'raporlar';

    // Toplu doldurulabilecek alanlar
    protected $fillable = ['baslik', 'icerik', 'onayli'];
}` },
        { lang:"php", fn:"CRUD örnekleri", src:
`<?php
// Oluştur
$rapor = Rapor::create([
    'baslik' => 'Ocak Raporu',
    'icerik' => 'İçerik...',
]);

// Oku
$hepsi   = Rapor::all();
$tekil   = Rapor::findOrFail(1);
$onayli  = Rapor::where('onayli', true)->latest()->get();

// Güncelle
$tekil->update(['onayli' => true]);

// Sil
$tekil->delete();` }
      ],
      steps: [
        "<code>php artisan make:model Not -m</code> ile hem model hem migration üret.",
        "Modelde <code>$fillable</code> tanımla.",
        "<code>php artisan tinker</code> içinde bir kayıt oluştur, oku ve sil (bir sonraki konuda tinker'ı işleyeceğiz)."
      ],
      resources: [
        { t:"Doküman", label:"Laravel — Eloquent: Başlangıç", url:"https://laravel.com/docs/eloquent" }
      ]
    },
    {
      id: "relationships",
      eyebrow: "Faz 4 · Veritabanı & Eloquent",
      title: "İlişkiler (relationships)",
      why: "Gerçek veriler birbirine bağlıdır: bir kullanıcının çok raporu, bir raporun bir sahibi olur. Eloquent ilişkileri bu bağları PHP tarafında kurar. Bunu bilmeden karmaşık ekranlar yapamazsın.",
      body: `
        <p>Tablolar birbirine bağlıdır. Eloquent, bu bağları modele metot olarak tanımlamanı sağlar. Böylece <code>$user-&gt;raporlar</code> yazarak o kullanıcının tüm raporlarına ulaşırsın — arka planda gerekli sorgu otomatik çalışır.</p>
        <h3>En sık kullanılan üç ilişki</h3>
        <ul>
          <li><strong>hasMany:</strong> Bir kullanıcının çok raporu vardır</li>
          <li><strong>belongsTo:</strong> Bir rapor bir kullanıcıya aittir</li>
          <li><strong>belongsToMany:</strong> Çoka-çok (ör. bir raporun çok etiketi, bir etiketin çok raporu)</li>
        </ul>
        <p><strong>Performans notu:</strong> Döngü içinde ilişkiye erişirken "N+1 sorgu problemi" oluşabilir. Bunu önlemek için <code>with()</code> ile eager loading yaparsın: <code>User::with('raporlar')-&gt;get()</code>.</p>`,
      code: [
        { lang:"php", fn:"ilişki tanımı", src:
`<?php
class User extends Model
{
    // Bir kullanıcının çok raporu
    public function raporlar() {
        return $this->hasMany(Rapor::class);
    }
}

class Rapor extends Model
{
    // Bir rapor bir kullanıcıya ait
    public function sahip() {
        return $this->belongsTo(User::class, 'user_id');
    }
}

// Kullanımı
$user = User::with('raporlar')->find(1); // eager loading
foreach ($user->raporlar as $rapor) {
    echo $rapor->baslik;
}` }
      ],
      steps: [
        "İki model arasında <code>hasMany</code> / <code>belongsTo</code> ilişkisi kur.",
        "Bir kaydın ilişkili kayıtlarına <code>-&gt;</code> ile eriş.",
        "<code>with()</code> kullanan ve kullanmayan sorgular arasındaki fark için <code>php artisan telescope</code> ya da log'a bakarak sorgu sayısını gözlemle."
      ],
      resources: [
        { t:"Doküman", label:"Laravel — Eloquent Relationships", url:"https://laravel.com/docs/eloquent-relationships" },
        { t:"Rehber", label:"N+1 problemi & eager loading", url:"https://laravel.com/docs/eloquent-relationships#eager-loading" }
      ]
    },
    {
      id: "seeder-factory",
      eyebrow: "Faz 4 · Veritabanı & Eloquent",
      title: "Seeder & Factory",
      why: "Boş bir veritabanıyla arayüz test etmek zordur. Factory ve seeder ile saniyeler içinde yüzlerce sahte kayıt üretip gerçekçi bir ekranla çalışırsın. Geliştirmeyi çok hızlandırır.",
      body: `
        <p><strong>Factory</strong>, bir model için sahte (ama gerçekçi) veri üreten kalıptır. <strong>Seeder</strong> ise bu kalıpları kullanarak veritabanını doldurur.</p>
        <h3>Ne işe yarar?</h3>
        <ul>
          <li>Yeni bir sayfa ya da özellik geliştirirken elle veri girmek yerine tek komutla 50 kayıt üret</li>
          <li>Ekip arkadaşların da aynı örnek veriyle çalışsın</li>
          <li>Testlerde kullanılır</li>
        </ul>
        <p>Laravel, <code>fake()</code> yardımcısıyla gerçekçi isim, email, tarih vb. üretir. <code>php artisan migrate:fresh --seed</code> komutu tabloları sıfırlayıp baştan doldurur — geliştirmede çok kullanışlı.</p>`,
      code: [
        { lang:"php", fn:"database/factories/RaporFactory.php", src:
`<?php
namespace Database\\Factories;

use Illuminate\\Database\\Eloquent\\Factories\\Factory;

class RaporFactory extends Factory
{
    public function definition(): array
    {
        return [
            'baslik' => fake()->sentence(3),
            'icerik' => fake()->paragraph(),
            'onayli' => fake()->boolean(),
        ];
    }
}` },
        { lang:"bash", fn:"kullanımı", src:
`# Tinker içinde 20 sahte rapor üret
php artisan tinker
>>> App\\Models\\Rapor::factory()->count(20)->create();

# Ya da seeder ile tabloları sıfırla + doldur
php artisan migrate:fresh --seed` }
      ],
      steps: [
        "<code>php artisan make:factory NotFactory</code> ile bir factory oluştur.",
        "<code>definition()</code> içinde <code>fake()</code> ile alanları doldur.",
        "Tinker'da <code>factory()-&gt;count(10)-&gt;create()</code> ile kayıt üret ve tabloda gör."
      ],
      resources: [
        { t:"Doküman", label:"Laravel — Database: Seeding", url:"https://laravel.com/docs/seeding" },
        { t:"Doküman", label:"Laravel — Eloquent Factories", url:"https://laravel.com/docs/eloquent-factories" }
      ]
    },
    {
      id: "tinker",
      eyebrow: "Faz 4 · Veritabanı & Eloquent",
      title: "Tinker & Query Builder",
      why: "Bir sorguyu denemek için kod yazıp sayfayı yenilemek yavaş. Tinker ile canlı bir PHP konsolunda anında dener, sonucu görürsün. Query Builder ise Eloquent'in yetmediği karmaşık sorgular için.",
      body: `
        <p><strong>Tinker</strong>, projenin içinde açılan bir REPL'dir (interaktif konsol). Model çağırabilir, kayıt oluşturabilir, sorgu deneyebilirsin — hepsi anında. Bir mantığı denemenin en hızlı yolu.</p>
        <h3>Query Builder</h3>
        <p>Eloquent çoğu işi çözer ama bazen daha ham, esnek sorgular gerekir (join'ler, gruplama, ham koşullar). <strong>Query Builder</strong> (<code>DB::table(...)</code>) tam bunun için. Eloquent'ten daha alt seviyededir ama SQL yazmaktan hâlâ güvenlidir.</p>
        <p><strong>Güvenlik:</strong> Kullanıcıdan gelen değerleri asla doğrudan sorguya yapıştırma. Query Builder'ın parametreli yapısı SQL injection'a karşı seni korur — bu korumayı bozacak şekilde string birleştirme yapma.</p>`,
      code: [
        { lang:"bash", fn:"tinker oturumu", src:
`php artisan tinker

>>> App\\Models\\Rapor::count()
=> 20

>>> App\\Models\\Rapor::where('onayli', true)->pluck('baslik')

>>> $r = App\\Models\\Rapor::first();
>>> $r->update(['onayli' => true]);` },
        { lang:"php", fn:"Query Builder", src:
`<?php
use Illuminate\\Support\\Facades\\DB;

$sonuclar = DB::table('raporlar')
    ->where('onayli', true)
    ->whereDate('created_at', '>=', '2026-01-01')
    ->orderByDesc('created_at')
    ->limit(10)
    ->get();` }
      ],
      steps: [
        "<code>php artisan tinker</code> aç ve bir modelde <code>count()</code>, <code>first()</code> dene.",
        "Tinker içinde bir kayıt oluştur ve güncelle.",
        "<code>DB::table(...)</code> ile basit bir Query Builder sorgusu yaz."
      ],
      resources: [
        { t:"Doküman", label:"Laravel — Query Builder", url:"https://laravel.com/docs/queries" },
        { t:"Paket", label:"Laravel Tinker (GitHub)", url:"https://github.com/laravel/tinker" }
      ]
    }
  ]
},

{
  num: 5, id: "frontend", title: "Form, Validation & Arayüz",
  subtitle: "Kullanıcıyla buluşan taraf",
  checkpoint: { desc: "Form + validation çalışmanı (Form Request ile) bitirdiysen; formun ve bir hata mesajının ekran görüntüsünü paylaş.", url: "https://tally.so/r/VLaRKE" },
  topics: [
    {
      id: "validation",
      eyebrow: "Faz 5 · Form, Validation & Arayüz",
      title: "Form işleme & validation",
      why: "Kullanıcıdan veri alırken 'boş mu, doğru formatta mı?' kontrolü şart. Validation olmadan kötü veri veritabanına girer, uygulama çöker. Her formda karşına çıkacak.",
      body: `
        <p>Kullanıcı bir form gönderdiğinde, veriyi kaydetmeden önce doğrulaman gerekir: zorunlu alanlar dolu mu, email geçerli mi, sayı gerçekten sayı mı? Laravel bunu <strong>Form Request</strong> sınıflarıyla, controller'ı şişirmeden yapar.</p>
        <h3>Neden Form Request?</h3>
        <p>Kuralları controller içine yazarsan controller zamanla kalabalıklaşır ve aynı kuralları hem create hem update'te tekrarlarsın. Bunun yerine her işlem için ayrı bir request sınıfı üretiriz:</p>
        <ul>
          <li><code>Store{Model}Request</code> — <strong>oluşturma</strong> (create) kuralları</li>
          <li><code>Update{Model}Request</code> — <strong>güncelleme</strong> (update) kuralları</li>
        </ul>
        <p>Kurallar <code>rules()</code> metodunda durur. Controller metodunda <code>Request</code> yerine bu sınıfı type-hint edersin; Laravel isteği <em>otomatik</em> doğrular, kural sağlanmazsa istek daha controller'a girmeden geri döner. Doğrulanmış temiz veriye <code>$request-&gt;validated()</code> ile ulaşırsın.</p>
        <p><code>authorize()</code> metodu "bu kullanıcı bu isteği yapabilir mi?" sorusunu yanıtlar; şimdilik <code>return true;</code> yeterli. Blade tarafında hataları <code>@error('alan')</code> ile gösterir, formu <code>old()</code> ile dolu tutarsın.</p>`,
      code: [
        { lang:"bash", fn:"request sınıflarını üret", src:
`# create ve update için ayrı request sınıfları
php artisan make:request StoreRaporRequest
php artisan make:request UpdateRaporRequest` },
        { lang:"php", fn:"app/Http/Requests/StoreRaporRequest.php", src:
`<?php
namespace App\\Http\\Requests;

use Illuminate\\Foundation\\Http\\FormRequest;

class StoreRaporRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // yetki mantığı buraya (şimdilik açık)
    }

    public function rules(): array
    {
        return [
            'baslik' => 'required|string|max:255',
            'email'  => 'required|email',
            'onayli' => 'boolean',
        ];
    }
}` },
        { lang:"php", fn:"RaporController.php", src:
`<?php
namespace App\\Http\\Controllers;

use App\\Http\\Requests\\StoreRaporRequest;
use App\\Http\\Requests\\UpdateRaporRequest;
use App\\Models\\Rapor;

class RaporController extends Controller
{
    public function store(StoreRaporRequest $request)
    {
        // istek zaten doğrulandı; sadece temiz veriyi al
        Rapor::create($request->validated());

        return redirect()->route('rapor.index')
            ->with('mesaj', 'Kaydedildi.');
    }

    public function update(UpdateRaporRequest $request, Rapor $rapor)
    {
        $rapor->update($request->validated());

        return redirect()->route('rapor.index')
            ->with('mesaj', 'Güncellendi.');
    }
}` },
        { lang:"html", fn:"blade'de hata gösterimi", src:
`<input type="text" name="baslik" value="{{ old('baslik') }}">

@error('baslik')
    <span class="text-danger">{{ $message }}</span>
@enderror` }
      ],
      steps: [
        "<code>php artisan make:request StoreRaporRequest</code> ve <code>UpdateRaporRequest</code> ile iki request sınıfı üret.",
        "Kuralları <code>rules()</code> içine yaz; <code>authorize()</code>'ı şimdilik <code>return true;</code> bırak.",
        "Controller'da <code>Request</code> yerine bu sınıfları type-hint et; veriye <code>$request-&gt;validated()</code> ile ulaş.",
        "Kuralı bilerek ihlal et; isteğin controller'a hiç girmeden geri döndüğünü ve <code>@error</code> + <code>old()</code> ile formun korunduğunu gör."
      ],
      resources: [
        { t:"Doküman", label:"Laravel — Form Request Validation", url:"https://laravel.com/docs/validation#form-request-validation" },
        { t:"Referans", label:"Kullanılabilir tüm validation kuralları", url:"https://laravel.com/docs/validation#available-validation-rules" }
      ]
    },
    {
      id: "blade-layout",
      eyebrow: "Faz 5 · Form, Validation & Arayüz",
      title: "Blade component & layout",
      why: "Her sayfada aynı header ve footer'ı tekrar yazmazsın — ortak bir layout kurar, sayfaları onun içine yerleştirirsin. Tekrar eden parçaları (kart, buton) component yaparsın. Temiz kodun anahtarı.",
      body: `
        <p>İyi bir arayüzde tekrar yoktur. Blade bunu iki araçla çözer:</p>
        <h3>Layout (@extends / @section)</h3>
        <p>Header, footer, menü gibi her sayfada ortak olan iskeleti bir <code>layouts/app.blade.php</code>'de tutarsın. Her sayfa bu iskeleti <code>@extends</code> eder, sadece kendi içeriğini <code>@section</code> içinde yazar.</p>
        <h3>Component (x-...)</h3>
        <p>Bir kart, uyarı kutusu, buton gibi tekrar eden parçaları component yaparsın. Sonra <code>&lt;x-kart&gt;</code> gibi HTML etiketi gibi kullanırsın. Değişiklik gerektiğinde tek yeri düzeltirsin.</p>`,
      code: [
        { lang:"html", fn:"resources/views/layouts/app.blade.php", src:
`<!doctype html>
<html lang="tr">
<head>
    <title>@yield('title', 'Panel')</title>
</head>
<body>
    <nav>{{-- ortak menü --}}</nav>

    <main>
        @yield('content')
    </main>

    <footer>{{-- ortak footer --}}</footer>
</body>
</html>` },
        { lang:"html", fn:"bir sayfa (bu layout'u kullanır)", src:
`@extends('layouts.app')

@section('title', 'Raporlar')

@section('content')
    <h1>Raporlar</h1>
    {{-- sayfaya özel içerik --}}
@endsection` }
      ],
      steps: [
        "Bir <code>layouts/app.blade.php</code> oluştur; içine <code>@yield('content')</code> koy.",
        "İki farklı sayfa yap; ikisi de bu layout'u <code>@extends</code> etsin.",
        "<code>php artisan make:component Kart</code> ile bir component üret ve bir sayfada kullan."
      ],
      resources: [
        { t:"Doküman", label:"Laravel — Blade Layouts", url:"https://laravel.com/docs/blade#layouts-using-template-inheritance" },
        { t:"Doküman", label:"Laravel — Blade Components", url:"https://laravel.com/docs/blade#components" }
      ]
    },
    {
      id: "bootstrap",
      eyebrow: "Faz 5 · Form, Validation & Arayüz",
      title: "Bootstrap ile arayüz",
      why: "Arayüzlerimizi Bootstrap ile kuruyoruz. Sıfırdan CSS yazmak yerine hazır grid, buton, form ve kart bileşenleriyle hızlı ve tutarlı ekranlar çıkarırsın. Bizim standart CSS framework'ümüz bu.",
      body: `
        <p><strong>Bootstrap</strong>, hazır CSS sınıfları sunan bir arayüz framework'üdür. <code>class="btn btn-primary"</code> yazarsın, düzgün bir buton çıkar. Grid sistemiyle (<code>row</code> / <code>col</code>) sayfayı responsive bölersin.</p>
        <h3>En çok kullanacakların</h3>
        <ul>
          <li><strong>Grid:</strong> <code>container</code> → <code>row</code> → <code>col-md-6</code> (satır ve sütunlar)</li>
          <li><strong>Bileşenler:</strong> <code>card</code>, <code>btn</code>, <code>table</code>, <code>alert</code>, <code>modal</code>, <code>nav</code></li>
          <li><strong>Utility sınıflar:</strong> <code>mt-3</code> (margin), <code>p-2</code> (padding), <code>text-center</code>, <code>d-flex</code></li>
        </ul>
        <p>Bootstrap dokümantasyonu çok iyidir — bir bileşen lazım olduğunda ezberlemeye çalışma, dokümandan kopyala, uyarla. Zamanla sık kullandıkların aklında kalır.</p>`,
      code: [
        { lang:"html", fn:"bootstrap grid + kart", src:
`<div class="container mt-4">
  <div class="row g-3">
    <div class="col-md-6">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Rapor</h5>
          <p class="card-text">Ocak ayı özeti.</p>
          <a href="#" class="btn btn-primary">Görüntüle</a>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="alert alert-success">Kaydedildi!</div>
    </div>
  </div>
</div>` }
      ],
      steps: [
        "Bir Blade sayfasına Bootstrap'i ekle (CDN ile hızlı başlangıç yapılabilir).",
        "Bir <code>container &gt; row &gt; col</code> yapısıyla iki sütunlu bir düzen kur.",
        "Bir <code>card</code>, bir <code>btn</code> ve bir <code>alert</code> bileşenini dokümandan alıp dene."
      ],
      resources: [
        { t:"Doküman", label:"Bootstrap — resmi dokümantasyon", url:"https://getbootstrap.com/docs/5.3/getting-started/introduction/" },
        { t:"Referans", label:"Bootstrap — Grid sistemi", url:"https://getbootstrap.com/docs/5.3/layout/grid/" }
      ]
    },
    {
      id: "vite",
      eyebrow: "Faz 5 · Form, Validation & Arayüz",
      title: "Asset derleme (Vite)",
      why: "CSS ve JavaScript dosyalarını tarayıcıya vermeden önce derlemek gerekir. Laravel bunu Vite ile yapar. 'Stilim neden uygulanmıyor?' sorununun cevabı çoğu zaman burada.",
      body: `
        <p>Modern projelerde CSS/JS dosyaları doğrudan sunulmaz; önce <strong>derlenir</strong> (birleştirme, küçültme, dönüştürme). Laravel bu iş için <strong>Vite</strong> kullanır.</p>
        <h3>Bilmen gerekenler</h3>
        <ul>
          <li><code>npm install</code> — JS bağımlılıklarını indirir (composer'ın JS karşılığı)</li>
          <li><code>npm run dev</code> — geliştirme sırasında çalışır, değişiklikleri anında yansıtır (hot reload)</li>
          <li><code>npm run build</code> — canlıya çıkmadan önce optimize edilmiş dosyaları üretir</li>
          <li>Blade'de <code>@vite(['resources/css/app.css', 'resources/js/app.js'])</code> ile dahil edersin</li>
        </ul>
        <p>Local'de stil değişikliklerin görünmüyorsa ilk bakacağın şey: <code>npm run dev</code> çalışıyor mu? Çoğu zaman sorun budur.</p>`,
      code: [
        { lang:"bash", fn:"vite komutları", src:
`# JS bağımlılıklarını kur
npm install

# Geliştirme sırasında (arka planda açık kalır)
npm run dev

# Canlıya çıkmadan önce
npm run build` },
        { lang:"html", fn:"blade'de dahil etme", src:
`<head>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>` }
      ],
      steps: [
        "<code>npm install</code> çalıştır ve <code>node_modules/</code>'ın oluştuğunu gör.",
        "<code>npm run dev</code> ile geliştirme sunucusunu başlat.",
        "<code>resources/css/app.css</code>'e bir stil ekle ve tarayıcıda anında değiştiğini gözlemle."
      ],
      resources: [
        { t:"Doküman", label:"Laravel — Vite ile asset derleme", url:"https://laravel.com/docs/vite" }
      ]
    }
  ]
},

{
  num: 6, id: "profesyonel", title: "Profesyonelleşme",
  subtitle: "Ekip standardına geçiş",
  checkpoint: { desc: "Kendi projeni GitHub&#39;a atıp bir PR açtıysan; repo ve PR linkini paylaş.", url: "https://tally.so/r/VLaRKE" },
  topics: [
    {
      id: "auth",
      eyebrow: "Faz 6 · Profesyonelleşme",
      title: "Authentication & yetkilendirme",
      why: "Neredeyse her uygulamada giriş sistemi ve 'kim neyi görebilir' kuralları vardır. Laravel bunu hazır sunar; mantığını anlaman yeter. Panel projelerinin belkemiği bu.",
      body: `
        <p>İki ayrı kavram var, karıştırma:</p>
        <ul>
          <li><strong>Authentication (kimlik doğrulama):</strong> "Sen kimsin?" — giriş yapma, oturum açma</li>
          <li><strong>Authorization (yetkilendirme):</strong> "Buna iznin var mı?" — bu kullanıcı bu raporu düzenleyebilir mi?</li>
        </ul>
        <h3>Laravel'de neler var?</h3>
        <p>Giriş/kayıt ekranlarını sıfırdan yazmazsın; <strong>Laravel Breeze</strong> ya da <strong>Jetstream</strong> gibi başlangıç kitleri bunu hazır kurar. Yetkilendirme için <strong>Gate</strong> ve <strong>Policy</strong> yapıları vardır — "bu kullanıcı bu kaydı silebilir mi?" mantığını tek yerde toplar.</p>
        <p>Giriş yapmış kullanıcıya her yerden <code>auth()-&gt;user()</code> ile ulaşırsın.</p>`,
      code: [
        { lang:"php", fn:"yetki kontrolü örnekleri", src:
`<?php
// Giriş yapmış kullanıcı
$user = auth()->user();

// Controller'da yetki kontrolü (Policy üzerinden)
public function guncelle(Request $request, Rapor $rapor)
{
    $this->authorize('update', $rapor); // izin yoksa 403 döner

    $rapor->update($request->validated());
    return back();
}` },
        { lang:"html", fn:"blade'de yetkiye göre gösterim", src:
`@auth
    <p>Hoş geldin, {{ auth()->user()->name }}</p>
@endauth

@can('update', $rapor)
    <a href="#">Düzenle</a>
@endcan` }
      ],
      steps: [
        "Bir deneme projesine Laravel Breeze kur ve hazır gelen login/register ekranlarını incele.",
        "<code>auth()-&gt;user()</code> ile giriş yapan kullanıcının bilgisine eriş.",
        "Basit bir Policy yaz ve <code>@can</code> ile bir butonu koşullu göster."
      ],
      resources: [
        { t:"Doküman", label:"Laravel — Authentication", url:"https://laravel.com/docs/authentication" },
        { t:"Doküman", label:"Laravel — Authorization (Gate & Policy)", url:"https://laravel.com/docs/authorization" }
      ]
    },
    {
      id: "artisan",
      eyebrow: "Faz 6 · Profesyonelleşme",
      title: "Artisan komutları",
      why: "Artisan, Laravel'in terminal aracı. Model üretmekten cache temizlemeye kadar her şey buradan. Günde onlarca kez kullanacaksın; sık komutları ezberlemek hızını katlar.",
      body: `
        <p><strong>Artisan</strong>, Laravel ile gelen komut satırı aracıdır. Dosya üretir, veritabanı işlemleri yapar, cache temizler, hatta kendi komutlarını yazabilirsin.</p>
        <h3>Her gün kullanacakların</h3>
        <ul>
          <li><code>php artisan make:...</code> — model, controller, migration vb. üret</li>
          <li><code>php artisan migrate</code> — veritabanı değişikliklerini uygula</li>
          <li><code>php artisan route:list</code> — tüm route'ları listele</li>
          <li><code>php artisan tinker</code> — interaktif konsol</li>
          <li><code>php artisan optimize:clear</code> — takıldığında cache'leri temizle (çok işe yarar)</li>
        </ul>
        <p>Bir şey beklenmedik davranıyorsa, çoğu zaman cache'tir. <code>optimize:clear</code> ilk denemen olsun.</p>`,
      code: [
        { lang:"bash", fn:"sık kullanılan artisan komutları", src:
`# Tüm komutları listele
php artisan list

# Üreteçler
php artisan make:model Urun -mcr   # model + migration + controller + resource

# Cache temizle (bir şeyler tuhafsa)
php artisan optimize:clear

# Route ve config'i incele
php artisan route:list
php artisan about` }
      ],
      steps: [
        "<code>php artisan list</code> ile mevcut komutlara göz at.",
        "<code>php artisan make:model Deneme -mc</code> ile tek komutta birden çok dosya üret.",
        "Bir şey beklendiği gibi çalışmadığında <code>php artisan optimize:clear</code> denemeyi alışkanlık edin."
      ],
      resources: [
        { t:"Doküman", label:"Laravel — Artisan Console", url:"https://laravel.com/docs/artisan" }
      ]
    },
    {
      id: "debugging",
      eyebrow: "Faz 6 · Profesyonelleşme",
      title: "Debugging & log",
      why: "Kodun çalışmadığında panik yapmak yerine sistemli bakmak gerekir. Doğru debug alışkanlığı, bir stajyeri gerçek geliştiriciden ayıran en net şey. Log okumayı sevmeyi öğren.",
      body: `
        <p>Hata çözmek tahmin işi değildir. Sırayla bakılır:</p>
        <h3>Araç kutun</h3>
        <ul>
          <li><code>dd($degisken)</code> — "dump and die": değeri ekrana basar ve durur (en hızlı bakış)</li>
          <li><code>dump($x)</code> — durdurmadan değeri gösterir</li>
          <li><code>Log::info('mesaj', [...])</code> — <code>storage/logs/laravel.log</code>'a yazar</li>
          <li><code>tail -f storage/logs/laravel.log</code> — logu canlı izle</li>
          <li><strong>Laravel Telescope</strong> — istekleri, sorguları, hataları tarayıcıdan izleten panel</li>
        </ul>
        <p><strong>Yaklaşım:</strong> Önce hata mesajını gerçekten oku (yarısı zaten cevabı söyler). Sonra <code>dd()</code> ile değişkenin beklediğin gibi olup olmadığını kontrol et. En sona kadar "neden olmuyor?" değil, "değer burada ne?" diye sor.</p>`,
      code: [
        { lang:"php", fn:"debug araçları", src:
`<?php
// Bir değeri anında incele ve dur
dd($request->all());

// Akışı bozmadan gözlemle
dump($rapor->toArray());

// Kalıcı log kaydı
use Illuminate\\Support\\Facades\\Log;
Log::info('Rapor kaydedildi', ['id' => $rapor->id]);
Log::error('Beklenmeyen durum', ['veri' => $veri]);` }
      ],
      steps: [
        "Bir controller'da <code>dd()</code> ile gelen isteği incele.",
        "<code>Log::info()</code> ile bir mesaj yaz, sonra <code>tail -f</code> ile logda gör.",
        "Bir deneme projesine Telescope kurup istekleri panelden izlemeyi dene."
      ],
      resources: [
        { t:"Doküman", label:"Laravel — Logging", url:"https://laravel.com/docs/logging" },
        { t:"Araç", label:"Laravel Telescope", url:"https://laravel.com/docs/telescope" }
      ]
    },
    {
      id: "kod-standardi",
      eyebrow: "Faz 6 · Profesyonelleşme",
      title: "Kod standartları & Git workflow",
      why: "Tek başına yazdığın kod ile ekipte yazdığın kod farklıdır. Ortak standartlar ve düzgün bir Git akışı olmadan ekip birbirini yavaşlatır. Buraya geldiysen artık gerçek ekip çalışmasına hazırsın.",
      body: `
        <p>Profesyonel geliştirme, "çalışan kod"un ötesinde "başkasının okuyup sürdürebileceği kod" demektir.</p>
        <h3>Kod standardı</h3>
        <ul>
          <li>PHP dünyasında <strong>PSR-12</strong> yaygın stil standardıdır (girinti, boşluk, isimlendirme)</li>
          <li><strong>Laravel Pint</strong> ile kodu tek komutla otomatik biçimlendirebilirsin</li>
          <li>Değişken ve metot isimleri ne yaptığını anlatsın; <code>$x</code> değil <code>$onayliRaporlar</code></li>
        </ul>
        <h3>Ekip Git akışı</h3>
        <ul>
          <li>Her iş kendi branch'inde; <code>main</code>'e doğrudan yazılmaz</li>
          <li>İş bitince <strong>Pull Request</strong> açılır, ekip <strong>review</strong> eder</li>
          <li>Review'da gelen yorumları savunmaya geçmeden değerlendir — herkes böyle öğrenir</li>
          <li>Onaylanınca merge edilir</li>
        </ul>
        <p>İlk PR'ında çekingen olman normal. Küçük tut, açıklamasını iyi yaz, sorularını sor. Kimse ilk günden kusursuz kod beklemiyor — öğrenmeye açık olman yeterli.</p>`,
      code: [
        { lang:"bash", fn:"pint ile biçimlendirme", src:
`# Kodu PSR standardına göre otomatik düzelt
./vendor/bin/pint

# Sadece neyin değişeceğini gör (dokunmadan)
./vendor/bin/pint --test` },
        { lang:"bash", fn:"PR öncesi son kontrol", src:
`git checkout main && git pull          # güncel main'i al
git checkout -b feature/yeni-is        # yeni branch
# ...kodla, commit'le...
./vendor/bin/pint                      # biçimlendir
git push -u origin feature/yeni-is     # gönder → GitHub'da PR aç` }
      ],
      steps: [
        "<code>./vendor/bin/pint --test</code> çalıştır ve stil önerilerini gör.",
        "Küçük bir değişikliği branch → commit → push → PR akışıyla tamamla.",
        "Açık kaynak bir projede bir Pull Request'i inceleyip review yorumlarının nasıl yazıldığını gözlemle."
      ],
      resources: [
        { t:"Standart", label:"PSR-12 — kod stili standardı", url:"https://www.php-fig.org/psr/psr-12/" },
        { t:"Araç", label:"Laravel Pint — otomatik biçimlendirici", url:"https://laravel.com/docs/pint" }
      ]
    }
  ]
}
];
