# Individuālā refleksija

Aizpildiet šo daļu individuāli nodarbības beigās, **neizmantojot mākslīgā intelekta rīkus**.

Ieteicamais kopējais apjoms: **aptuveni 200–300 vārdi**.

---

## 1. Kontrolēts lauks

4.3. sadaļas 1. izmēģinājumā *Title* laukam bija `value`, bet nebija `onChange`.

Kas notika, kad mēģinājāt rakstīt? Ko teica konsole? Paskaidrojiet ar saviem vārdiem, kāpēc lauks uzvedās tieši tā.

Kad `Title` laukam bija norādīts `value`, bet nebija `onChange`, es nevarēju tajā rakstīt. Lauks palika nemainīgs, jo React to uzskatīja par kontrolētu lauku, kura vērtību nosaka programma. Konsolē parādījās React brīdinājums, ka laukam ir norādīta `value` vērtība bez `onChange` apstrādātāja. Lai lauks darbotos pareizi, nepieciešams izmantot `onChange`, kas atjaunina stāvokli.

---

## 2. Stāvoklis nav parasts mainīgais

2. izmēģinājumā jūs mainījāt `values.description` uz vietas un izsaucāt `setValues(values)`.

Kas bija redzams laukā, kamēr rakstījāt `hello`? Kas parādījās, kad ierakstījāt burtu citā laukā — un kāpēc tieši tas?

3. izmēģinājumā `console.log(values.progress)` uzreiz pēc `update(...)`. Ko rādīja konsole, un ko tas pasaka par to, kad mainās `values`?

Kad es mainīju `values.description` tieši un izsaucu `setValues(values)`, teksts `hello` laukā uzreiz neparādījās. Tas notika tāpēc, ka tika mainīts esošais objekts, nevis izveidots jauns objekts. React neatpazina stāvokļa izmaiņas, jo objekta atsauce palika tā pati. Kad ierakstīju burtu citā laukā, notika atkārtota renderēšana, un iepriekš ievadītais teksts kļuva redzams.

Izsaucot `console.log(values.progress)` uzreiz pēc `update(...)`, konsole parādīja iepriekšējo vērtību. Tas pierāda, ka React stāvoklis nemainās uzreiz un atjauninātā vērtība kļūst pieejama nākamajā renderēšanas reizē.

---

## 3. Kur dzīvo stāvoklis

Pievienotie projekti glabājas `App`, filtrs — `ProjectSection`, formas lauki — `AddProjectForm`.

Kāpēc pievienotos projektus nevarēja glabāt `AddProjectForm` iekšā? Kāpēc filtru nevajag celt uz `App`?

Pievienotie projekti jāglabā `App`, jo tos izmanto vairākas komponentes, piemēram, projektu saraksts un statistika. Ja tie atrastos tikai `AddProjectForm`, citas komponentes tiem nevarētu piekļūt. Filtrs paliek `ProjectSection`, jo to izmanto tikai projektu sadaļa. Nav nepieciešams pārvietot stāvokli uz augstāku komponenti, ja tas nav vajadzīgs citur.
---

## 4. Pašu hook

`useLocalStorage` sākuma vērtību pārbauda ar `isProjectList`, nevis ar `as Project[]`.

Kas varētu atrasties `localStorage` jūsu atslēgā, ja jūs to nebūtu rakstījuši paši? Ko 9. sadaļas 8. pārbaude parādīja?

Kāpēc šim hook nevajag `useEffect`? Kurā brīdī tas lasa `localStorage`, un kurā — raksta?

`localStorage` var saturēt kļūdainus, novecojušus vai manuāli mainītus datus. `isProjectList` pārbauda, vai saglabātā vērtība tiešām ir projektu masīvs. Astotajā pārbaudē kļūdaini dati, piemēram, `{bad`, neizraisīja lietotnes avāriju, un API projekti joprojām tika parādīti.

Šim hook nav nepieciešams `useEffect`, jo sākuma dati tiek nolasīti ar `useState` inicializētāju, bet `localStorage` tiek atjaunināts tieši stāvokļa maiņas funkcijā.