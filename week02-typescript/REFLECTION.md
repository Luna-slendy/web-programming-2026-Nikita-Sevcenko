# Individuālā refleksija

Aizpildiet šo daļu individuāli nodarbības beigās, **neizmantojot mākslīgā intelekta rīkus**.

Ieteicamais kopējais apjoms: **aptuveni 200–300 vārdi**.

---

## 1. Ko deva tipi?

Savā formulējumā paskaidrojiet, kāda ir atšķirība starp JavaScript un TypeScript.

Aprakstiet **vienu konkrētu kļūdu**, ko TypeScript jums parādīja šī darba laikā. Ko kods darīja nepareizi, un kā jūs to izlabojāt?

--- Datu tipi palīdz atklāt kļūdas jau koda rakstīšanas laikā, pirms programmas palaišanas, atšķirībā no standarta JavaScript pieejas.

TypeScript man palīdzēja pārbaudīt, kādi datu tipi atrodas dažās vietās. Piemēram, projektam ir jābūt nosaukumam, termiņam un statusam. Ja tiktu izmantots neeksistējošs atribūts vai tam tiktu piešķirts nepareizs datu tips, TypeScript izsniegtu kļūdu.

## 2. `null` un `querySelector`

Kāpēc TypeScript uzskata, ka `document.querySelector(...)` rezultāts var būt `null`?

Parādiet, kā jūs šo gadījumu apstrādājāt savā kodā, un paskaidrojiet, kāpēc izvēlējāties tieši šo veidu.

---«document.querySelector(...)» var atgriezt «null», jo HTML elements var neeksistēt, ja selektors ir norādīts nepareizi.

Savā kodā es pārbaudīju rezultātu, izmantojot nosacījumu:

«if (!element) return;»

TypeScript pārbaudīja, vai elements patiešām pastāv. Man šis risinājums šķita uzticamāks nekā vienkārša «!» izmantošana, jo programma pati to pārbauda.

## 3. Dati no ārpuses

`localStorage` saturu var izmainīt jebkurš lietotājs caur DevTools.

Paskaidrojiet:

- kāpēc `JSON.parse` rezultātam nevar vienkārši uzticēties, pat ja kodā tam ir norādīts tips;
- kāpēc lietotāja tekstu nedrīkst ievietot lapā ar `innerHTML`.

---Ja es norādu TypeScript, ka rezultātam ir noteikts tips, tas nenozīmē, ka dati patiešām ir šā tipa. Lietotājs var mainīt «localStorage» ar DevTools palīdzību un ievadīt citu informāciju. Tāpēc es uzskatu, ka ārējie dati ir jāpārbauda. Tāpat nevajadzētu pieņemt datus innerHTML formātā, jo tur ir iespējams panākt koda izpildi, izmantojot lietotāja ievadīto informāciju

## 4. Jūsu vērtējums

Aprakstiet vienu situāciju, kurā TypeScript, jūsuprāt, ir lieks, un vienu, kurā bez tā būtu grūti iztikt. Pamatojiet.

Manuprāt, TypeScript var būt lieks ļoti mazos skriptos, piemēram, ja ir jāraksta vienkārša funkcija, kas sastāv no dažām rindām. Šādā gadījumā papildu tipu rakstīšana var aizņemt vairāk laika nekā pati programma.

Lielos projektos TypeScript ir ļoti noderīgs. Pareiza TypeScript izmantošana šādos projektos var samazināt iespēju nejauši izmantot nepareizus datus.

Turklāt, manuprāt, TypeScript atvieglo kļūdu meklēšanu.

Lai gan dažos projektos es tomēr uzskatu, ka JavaScript var būt ērtāks, it īpaši, ja tas ir neliels projekts.