# Individuālā refleksija

Aizpildiet šo daļu individuāli nodarbības beigās, **neizmantojot mākslīgā intelekta rīkus**.

Ieteicamais kopējais apjoms: **aptuveni 200–300 vārdi**.

---

## 1. Props tipi

5. sadaļā jūs izdzēsāt obligātu prop (`note`) un ierakstījāt neeksistējošu vērtību (`tone="green"`).

Kļūda parādījās redaktorā, jo trūka obligātā note prop un tone="green" nebija atļauta vērtība. TypeScript parādīja tipu kļūdu. JavaScript projektā šādu kļūdu redaktors automātiski neatklātu, un tā varētu palikt nepamanīta.

---

## 2. Kas pārnāca, kas pazuda

`types.ts`, `guards.ts` un `api.ts` pārnesāt uz React projektu bez nevienas izmaiņas, bet `render.ts` — nē.


Failus `types.ts`, `guards.ts` un `api.ts` varēja pārnest bez izmaiņām, jo tie satur datu tipus, datu pārbaudes un API pieprasījumu loģiku. Tie nav tieši piesaistīti konkrētam lietotāja saskarnes attēlošanas veidam. Savukārt `render.ts` bija saistīts ar DOM elementu atrašanu un saskarnes veidošanu. React projektā saskarni attēlo komponenti, bet tās izmaiņas pārvalda React, izmantojot stāvokli un props. Tāpēc vecā attēlošanas loģika bija jāaizstāj ar React komponentiem.

---

## 3. Funkcija kā prop

`ErrorBox` saņem `onRetry: () => void` un pati neko neielādē.

`ErrorBox` pati neizsauc `fetchProjects()`, jo tās uzdevums ir attēlot kļūdu un piedāvāt atkārtotas ielādes iespēju. Atkārtotu ielādi pārvalda augstāks komponents, kuram pieder datu ielādes loģika. Tas padara komponentu atkārtoti izmantojamu un atvieglo testēšanu. `onClick={onRetry}` nodod funkciju, kuru izsauks pēc klikšķa, bet `onClick={onRetry()}` izsauc funkciju uzreiz renderēšanas laikā.

---

## 4. `key` un stāvoklis

Kāpēc saraksta elementa `key` ir `project.id`, nevis masīva indekss? Kura pārbaude jums parādīja aizmirstu `key`, un kura — klusēja?

`project.id` ir labāka izvēle nekā masīva indekss, jo identifikators paliek nemainīgs, arī tad, ja saraksta elementi tiek filtrēti vai pārkārtoti. ESLint vai cita statiskās analīzes pārbaude var atklāt trūkstošu `key`, bet pārlūks pats parasti to neuzrāda kā kļūdu, kas aptur lietotni. Filtra vērtība `Done` glabājas React stāvoklī, ko pārvalda `useState`. Atkārtota renderēšana ar jauniem props pati par sevi šo stāvokli neizdzēš, jo props un komponenta lokālais stāvoklis ir divas atšķirīgas lietas.
