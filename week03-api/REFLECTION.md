# Individuālā refleksija

Aizpildiet šo daļu individuāli nodarbības beigās, **neizmantojot mākslīgā intelekta rīkus**.

Ieteicamais kopējais apjoms: **aptuveni 200–300 vārdi**.

---

## 1. Kad `fetch` nemet kļūdu?
`fetch` automātiski nemet kļūdu, ja serveris atbild ar HTTP statusu 404 vai 500. Šādos gadījumos pieprasījums ir saņēmis atbildi, tāpēc `fetch` to uzskata par veiksmīgi izpildītu tīkla pieprasījumu. Tā ir problēma, jo lietotne var mēģināt izmantot nepareizus vai neesošus datus. 

---

## 2. `any` un `unknown`


Ar `any` ir bīstami strādāt, jo TypeScript ļauj izmantot šādu vērtību bez pārbaudes. Ja dati nav tādi, kādus mēs gaidām, var rasties kļūdas. `unknown` liek vispirms pārbaudīt datu tipu un struktūru. Izmantojot `data as Project[]`, mēs tikai pasakām TypeScript, ka dati ir projektu masīvs, bet nepārbaudām, vai tā patiešām ir. Type guard funkcija, piemēram, `isProject`, pārbauda datu struktūru un atgriež `true` tikai tad, ja dati atbilst prasībām.
---

## 3. Sveša API dati

Open-Meteo datus pārveidojām savā `CurrentWeather` tipā, lai lietotnē izmantotu saprotamus un vienotus nosaukumus, piemēram, `temperature` un `windSpeed`. Tādējādi API specifiskie lauku nosaukumi paliek tikai `api.ts` failā. Ja Open-Meteo pārdēvētu kādu lauku, būtu jāpielāgo datu pārveidošana. Bez validācijas lietotne varētu saņemt `undefined` vērtības vai nepareizi attēlot laikapstākļus.

---

## 4. Lietotāja skatījums

Pēc ielādes stāvokļu pievienošanas lietotājs redz ziņojumu, ka dati tiek ielādēti. Ja pieprasījums neizdodas, tiek parādīts kļūdas ziņojums un poga `Try again`. Ja saraksts ir tukšs, tiek parādīts atbilstošs paziņojums. Tas ir saprotamāk nekā lapa bez datiem vai neskaidra kļūda.