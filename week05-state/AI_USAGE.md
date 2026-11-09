# Mākslīgā intelekta izmantošana

**Vārds, uzvārds:**  Nikita Ševčenko
**Izmantotais(-ie) MI rīks(-i):**  ChatGPT

## Kam es izmantoju mākslīgo intelektu?

- Lai atrastu, saņemt skaidrojumus un izlabotu kļūdas.
- Lai izveidotu projekta datu validācijas funkcijas.

## Kuru kodu vai konfigurāciju būtiskā apjomā ģenerēja mākslīgais intelekts?

- Mākslīgais intelekts būtiskā apjomā ģenerēja `validation.ts`

## Kuru kodu vai konfigurāciju es uzrakstīju pats/pati vai būtiski pārveidoju?

- `AddProjectForm.tsx` un `useLocalStorage.ts` kodu, kā arī pārveidoja `App.tsx`, `main.tsx` un `guards.ts`.

## Viens MI ieteikums, kuru es noraidīju vai izmainīju

Īsi paskaidrojiet savu izvēli: Sākotnēji MI ieteica atjaunināt projektu sarakstu, izmantojot funkciju `(current) => [...current, project]`. Es šo risinājumu izmainīju uz `[...localProjects, project]`, jo mans `useLocalStorage` āķis pieņem gatavu masīvu, nevis atjaunināšanas funkciju.

## Viena lieta, kuru es pārbaudīju pats/pati, nevis vienkārši uzticējos MI atbildei

Īsi paskaidrojiet, ko un kā jūs pārbaudījāt: Es pārbaudīju un salīdzināju `AddProjectForm` parametru nosaukumus ar tiem, kas tiek izmantoti `App.tsx`, un pārbaudīju, vai `onAdd` funkcija tiek pareizi nodota un izsaukta. Pēc kļūdu ziņojumiem veicu nepieciešamos labojumus.
