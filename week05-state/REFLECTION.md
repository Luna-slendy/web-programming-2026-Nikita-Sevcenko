# Individuālā refleksija

Aizpildiet šo daļu individuāli nodarbības beigās, **neizmantojot mākslīgā intelekta rīkus**.

Ieteicamais kopējais apjoms: **aptuveni 200–300 vārdi**.

---

## 1. Kontrolēts lauks

4.3. sadaļas 1. izmēģinājumā *Title* laukam bija `value`, bet nebija `onChange`.

Kas notika, kad mēģinājāt rakstīt? Ko teica konsole? Paskaidrojiet ar saviem vārdiem, kāpēc lauks uzvedās tieši tā.

---

## 2. Stāvoklis nav parasts mainīgais

2. izmēģinājumā jūs mainījāt `values.description` uz vietas un izsaucāt `setValues(values)`.

Kas bija redzams laukā, kamēr rakstījāt `hello`? Kas parādījās, kad ierakstījāt burtu citā laukā — un kāpēc tieši tas?

3. izmēģinājumā `console.log(values.progress)` uzreiz pēc `update(...)`. Ko rādīja konsole, un ko tas pasaka par to, kad mainās `values`?

---

## 3. Kur dzīvo stāvoklis

Pievienotie projekti glabājas `App`, filtrs — `ProjectSection`, formas lauki — `AddProjectForm`.

Kāpēc pievienotos projektus nevarēja glabāt `AddProjectForm` iekšā? Kāpēc filtru nevajag celt uz `App`?

---

## 4. Pašu hook

`useLocalStorage` sākuma vērtību pārbauda ar `isProjectList`, nevis ar `as Project[]`.

Kas varētu atrasties `localStorage` jūsu atslēgā, ja jūs to nebūtu rakstījuši paši? Ko 9. sadaļas 8. pārbaude parādīja?

Kāpēc šim hook nevajag `useEffect`? Kurā brīdī tas lasa `localStorage`, un kurā — raksta?
