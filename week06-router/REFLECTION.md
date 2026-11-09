# Individuālā refleksija

Aizpildiet šo daļu individuāli nodarbības beigās, **neizmantojot mākslīgā intelekta rīkus**.

Ieteicamais kopējais apjoms: **aptuveni 200–300 vārdi**.

---

## 1. `Link` pret `<a>`

9. sadaļas 1. izmēģinājumā jūs salīdzinājāt `NavLink` un parastu `<a href>`.

Kas notika ar pieprasījumu skaitu *Network* cilnē, un kas ar ierakstīto tekstu? Paskaidrojiet ar saviem vārdiem, ko pārlūks dara katrā gadījumā.


Izmantojot NavLink, pārlūks nepārlādē visu lapu. React Router nomaina tikai attiecīgās lapas saturu, tāpēc Network cilnē netiek veikts jauns HTML dokumenta pieprasījums. Savukārt, izmantojot parastu <a href>, pārlūks veic pilnu lapas pārlādi un atkārtoti ielādē dokumentu. Tāpēc var pazust ievadītais teksts un cits komponentu lokālais stāvoklis.

---

## 2. Kas izdzīvo pāreju

2. izmēģinājumā jūs aizgājāt uz *Deadlines* un atgriezāties ar pogu **Atpakaļ**.

Kas notika ar filtru, ar ierakstīto tekstu un ar pievienoto projektu? Kāpēc ne visiem vienādi? Atbildē izmantojiet to, kurā komponentē katrs no tiem glabājas.


Pārejot uz Deadlines un atgriežoties ar pogu Atpakaļ, projektu filtrs un formas ievadītais teksts pazuda. Tie glabājās attiecīgi Projects lapas un formas komponentes lokālajā stāvoklī. Kad komponente tika noņemta no ekrāna, tās stāvoklis tika atiestatīts. Savukārt pievienotais projekts saglabājās, jo tā dati glabājas App komponentē un tiek saglabāti localStorage. Tāpēc tie nepazūd, mainot lapas.

---

## 3. Adrese kā dati

Lapā `/projects/p1` komponente nesaņem projektu caur props — tā saņem visu sarakstu un meklē pēc adreses.

Kāpēc pēc pārlādes (F5) šī lapa joprojām zina, kuru projektu rādīt? Ko 3. izmēģinājums parādīja par `loading` pārbaudes vietu, un kāpēc tas lietotājam ir svarīgi?


Lapa /projects/p1 izmanto useParams, lai no URL iegūtu projekta ID. Pēc tam tā atrod atbilstošo projektu kopējā projektu sarakstā. Pēc F5 lapa joprojām zina, kuru projektu rādīt, jo ID atrodas URL adresē, bet projektu saraksts tiek ielādēts no datu avota un localStorage. loading pārbaudei jābūt pirms projekta meklēšanas, citādi projekts var tikt kļūdaini parādīts kā neeksistējošs, kamēr dati vēl tiek ielādēti.

---

## 4. Kopīgais rāmis

`Header` tagad atrodas `Layout`.

Kāpēc pēc pārejas uz citu lapu mobilā izvēlne pati neaizvērās, lai gan lapas saturs nomainījās? Ko darītu `Layout` bez `<Outlet />`?


Header atrodas Layout komponentē, tāpēc tas netiek izveidots no jauna, pārejot starp iekšējām lapām. Mobilās izvēlnes stāvoklis paliek atvērts, ja to neaizver ar setIsMenuOpen(false). Outlet parāda pašreizējo ligzdoto maršrutu. Bez Outlet kopīgais Layout joprojām rādītu Header un Footer, bet lapu saturs netiktu attēlots.