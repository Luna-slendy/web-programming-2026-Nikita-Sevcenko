# Individuālā refleksija

Aizpildiet šo daļu individuāli nodarbības beigās, **neizmantojot mākslīgā intelekta rīkus**.

Ieteicamais kopējais apjoms: **aptuveni 200–300 vārdi**.

---

## 1. Props tipi

5. sadaļā jūs izdzēsāt obligātu prop (`note`) un ierakstījāt neeksistējošu vērtību (`tone="green"`).

Kur un kad parādījās kļūda — redaktorā, pārlūkā, pēc `npm run build`? Ko tieši tā teica?

Kas notiktu ar to pašu kļūdu pagājušā gada React projektā, kas bija rakstīts JavaScript?

---

## 2. Kas pārnāca, kas pazuda

`types.ts`, `guards.ts` un `api.ts` pārnesāt uz React projektu bez nevienas izmaiņas, bet `render.ts` — nē.

Paskaidrojiet, kāpēc pirmos trīs varēja pārnest tieši tādus, kādi tie ir. Kas `render.ts` bija tāds, kā šajos trīs failos nav?

---

## 3. Funkcija kā prop

`ErrorBox` saņem `onRetry: () => void` un pati neko neielādē.

Kāpēc `ErrorBox` neizsauc `fetchProjects()` pati? Ko jūs zaudētu, ja tā darītu?

Kāda ir atšķirība starp `onClick={onRetry}` un `onClick={onRetry()}`?

---

## 4. `key` un stāvoklis

Kāpēc saraksta elementa `key` ir `project.id`, nevis masīva indekss? Kura pārbaude jums parādīja aizmirstu `key`, un kura — klusēja?

11. sadaļas 7. pārbaudē `render()` tika izsaukts vairākas reizes, bet filtrs palika uz **Done**. Kur šī vērtība glabājas, un kāpēc jauni props to neizdzēsa?
