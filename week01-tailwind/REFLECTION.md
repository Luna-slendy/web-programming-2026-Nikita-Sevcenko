# Individuālā refleksija

Aizpildiet šo daļu individuāli nodarbības beigās, **neizmantojot mākslīgā intelekta rīkus**.

Ieteicamais kopējais apjoms: **aptuveni 200–300 vārdi**.

---

## 1. Utility-first CSS pieeja

Savā formulējumā paskaidrojiet, ko nozīmē **utility-first CSS** pieeja.

Kā pāreja no `styles.css` uz Tailwind CSS mainīja to, **kur un kā tiek aprakstīts tīmekļa lapas vizuālais noformējums**?

---Utility-first CSS ir pieeja, kur tīmekļa lapas noformējums tiek veidots, izmantojot daudz mazu, konkrētu CSS utilītklasu. Katra klase parasti atbild par vienu noteiktu īpašību, piemēram, atstarpi, krāsu, fonta izmēru, izkārtojumu vai responsivitāti.

---Iepriekšējā projektā liela daļa noformējuma atradās `styles.css` failā, kur katram elementam bija savs CSS selektors. Pārejot uz Tailwind CSS, daudz vairāk noformējuma tika aprakstīts tieši HTML elementos, izmantojot Tailwind utilītklases. Tādēļ `styles.css` kļuva daudz īsāks, un lielākā daļa vizuālā noformējuma tagad atrodas HTML klasēs.

## 2. Divi migrācijas piemēri

Izvēlieties **divas tīmekļa vietnes daļas**, kuras jūs pats/pati pārveidojāt no tradicionālā CSS uz Tailwind CSS.

Katram piemēram paskaidrojiet:

- ko darīja sākotnējais CSS kods;
- kuras Tailwind CSS utilītklases jūs izmantojāt;
- kāpēc izvēlētās utilītklases nodrošina nepieciešamo rezultātu.

---Viens no pārveidotajiem elementiem bija projektu kartīšu sadaļa. Sākotnējā CSS versijā projektu kartītēm bija atsevišķs `.project-card` selektors, kas noteica fonu, apmales, noapaļojumus, ēnu un atstarpes. Tailwind versijā šim nolūkam izmantoju tādas utilītklases kā `rounded-[18px]`, `border`, `bg-white`, `p-[22px]` un `shadow`. Responsivitātei projektu režģim izmantoju `grid-cols-1`, `min-[641px]:grid-cols-2` un `min-[961px]:grid-cols-3`.

---Otrs piemērs bija termiņu un resursu sadaļa. Tradicionālajā CSS šiem elementiem bija atsevišķi selektori un media queries. Tailwind versijā izkārtojumu izveidoju ar `flex`, `grid`, `gap` un responsīvajām utilītklasēm. Tas ļāva vienā HTML elementā aprakstīt gan pamata izkārtojumu, gan tā izmaiņas dažādos ekrāna izmēros.

## 3. Jūsu vērtējums

Aprakstiet:

- vienu situāciju, kurā Tailwind CSS, jūsuprāt, ir ērtāks par tradicionālo CSS;
Tailwind ir piemērotāks vietām, kur elements neatkārtojas, un nav nepieciešams izveidot jaunu klasi atsevišķam elementam; turklāt tu uzreiz raksti objekta izskatu, nevis to, „kas tas ir”, t. i., uzreiz nosaki ārējo izskatu, bez nepieciešamības atsevišķi rakstīt parasto CSS.

- vienu situāciju, kurā jūs dotu priekšroku individuāli rakstītam CSS.
Man šķiet, ka CSS ir ērtāks, strādājot ar lieliem projektiem, kur ir daudz atkārtojošos elementu, jo standarta CSS ir vieglāk saprast, ko tieši katrs elements nozīmē, savukārt Tailwind, manuprāt, ir daudz sarežģītāks.

Pamatojiet savu viedokli.
