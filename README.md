# Z3 Yazılım — Stajyer Yol Haritası

Yeni gelen geliştiriciler için sıfırdan üretime uzanan bir onboarding kılavuzu.
PHP · Laravel · Vagrant/Homestead · MySQL · nginx · Bootstrap · Git.

Tek dosyalık, bağımsız bir statik site. Build adımı yok — doğrudan açılır ya da
herhangi bir statik sunucudan servis edilir.

## Özellikler

- **7 faz, 29 konu** — her konu ayrı "sayfa" (hash-routing), sırayla ilerlenir.
- Her konuda: *neden önemli*, açıklama, kod örneği (kopyala butonlu, renklendirilmiş),
  pratik adımlar ve kaynak linkleri.
- **Kalıcı ilerleme** — konu tamamlandıkça işaretlenir, `localStorage`'a yazılır;
  stajyer kaldığı yerden devam eder.
- Kurumsal renkler, mobil uyumlu (menü çekmeceye dönüşür).

## Local çalıştırma

Basit bir statik sunucu yeterli (bazı tarayıcılar `file://` üzerinde `localStorage`'ı
kısıtladığı için sunucudan açmak daha güvenli):

```bash
# Python varsa
python3 -m http.server 8000

# ya da Node
npx serve
```

Sonra tarayıcıda `http://localhost:8000` aç.

## Deploy (Vercel)

Framework yok, statik site. Vercel içe aktarınca:

- **Framework Preset:** Other
- **Build Command:** (boş)
- **Output Directory:** (varsayılan / kök)

Otomatik algılar; ekstra ayar gerekmez.

## İçeriği düzenleme

Tüm içerik **`data.js`** içinde. Konu eklemek/çıkarmak/güncellemek için sadece
bu dosyayı düzenlemen yeterli — `app.js`'e dokunmana gerek yok.

Yapı:

```js
{
  num: 2, id: "ortam", title: "Local Ortam",
  topics: [
    {
      id: "benzersiz-id",        // URL'de #benzersiz-id olur
      eyebrow: "Faz 2 · ...",
      title: "Konu başlığı",
      why: "Neden önemli (kısa)",
      body: `<p>HTML içerik...</p>`,
      code: [ { lang: "php", fn: "dosya.php", src: `...kod...` } ],
      steps: [ "adım 1", "adım 2" ],
      resources: [ { t: "Doküman", label: "...", url: "https://..." } ]
    }
  ]
}
```

`lang` için desteklenen renklendirme: `php`, `bash`, `yaml`, `nginx`, `html` (Blade).

## Dosya yapısı

```
index.html   → iskelet + tüm stiller
data.js      → içerik (düzenlenecek yer burası)
app.js       → router, ilerleme takibi, renklendirme
```
