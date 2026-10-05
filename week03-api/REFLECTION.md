# Individuālā refleksija

Aizpildiet šo daļu individuāli nodarbības beigās, **neizmantojot mākslīgā intelekta rīkus**.

Ieteicamais kopējais apjoms: **aptuveni 200–300 vārdi**.

---

## 1. Kad `fetch` nemet kļūdu?

`fetch` nemet kļūdu, ja serveris atbild ar statusu 404 vai 500.

Paskaidrojiet, kāpēc tā ir problēma, un parādiet rindu savā kodā, kas šo gadījumu apstrādā.

---

## 2. `any` un `unknown`

`response.json()` atgriež `Promise<any>`.

Paskaidrojiet savā formulējumā, kāpēc ar to ir bīstami strādāt un ko maina `const data: unknown = await response.json();`.

Kāda ir atšķirība starp `data as Project[]` un type guard funkciju?

---

## 3. Sveša API dati

Kāpēc Open-Meteo atbildi (`temperature_2m`, `wind_speed_10m`, ...) pārveidojām **savā** tipā `CurrentWeather`, nevis izmantojām API lauku nosaukumus visā lietotnē?

Kas notiktu ar jūsu lapu, ja Open-Meteo rīt pārdēvētu kādu lauku?

---

## 4. Lietotāja skatījums

Aprakstiet **vienu** pārbaudi, ko jūs veicāt ar DevTools (lēns tīkls, bloķēts pieprasījums, bojāts JSON, tukšs saraksts).

Ko lietotājs redzēja **pirms** ielādes stāvokļu pievienošanas un ko redz tagad?
