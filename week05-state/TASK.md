# 5. nedēļas praktiskais uzdevums — CampusFlow: stāvoklis un formas

## Mērķis

Ielikt **CampusFlow** React komponentēs **stāvokli**:

- forma *Add a project* atgriežas kā **kontrolēta forma** — katra lauka vērtība glabājas React stāvoklī, nevis DOM;
- validācija ir **tīra funkcija** atsevišķā failā, kļūdas parādās pie katra lauka;
- pievienotie projekti glabājas **`App` stāvoklī**, jo tos vajag divām vietām: projektu sarakstam un kartītei *Active projects*;
- pievienotie projekti saglabājas `localStorage` caur **jūsu pašu hook `useLocalStorage<T>`**;
- API dati joprojām ienāk caur props no `main.tsx` — tāpat kā 4. nedēļā.

Vizuālajam noformējumam jāpaliek tādam pašam kā 4. nedēļā; forma izskatās tāpat kā 3. nedēļā.

Mācīšanās un praktiskā darba laikā ir atļauts izmantot:

- oficiālo dokumentāciju ([react.dev](https://react.dev/learn/managing-state));
- meklētājprogrammas;
- pamācības;
- mākslīgā intelekta rīkus.

Individuālā refleksija jāizpilda **patstāvīgi, neizmantojot mākslīgā intelekta rīkus**.

---

## 0. Pirms sākat

Ja 4. nedēļas uzdevums (`week04-react`) vēl nav pabeigts — **vispirms pabeidziet to**. Šis uzdevums balstās uz tā rezultātu.

Nepieciešama **Node.js 20.19+ vai 22.12+** (`node -v`).

---

## 1. Jaunā mape `week05-state`

Šoreiz atkal **kopējam** — projekta uzbūve nemainās:

1. Repozitorija saknē nokopējiet mapi `week04-react` un nosauciet kopiju `week05-state`.
2. Kopijā **izdzēsiet** mapes `node_modules` un `dist` (ja tās ir).
3. `package.json` laukā `"name"` ierakstiet `"week05-state"`.
4. Mapē `week05-state` palaidiet:

```bash
npm install
npm run dev
```

Pārliecinieties, ka lapa strādā tāpat kā 4. nedēļā.

5. Atjaunojiet datumus `public/api/*.json`, lai termiņi ir nākotnē.

---

## 2. Git kontrolpunkti

### Obligātie minimālie kontrolpunkti

1. `Create week05-state from week04-react`
2. `Add controlled Add a project form`
3. `Validate the form and show field errors`
4. `Keep added projects in App state`
5. `Persist added projects with useLocalStorage`

Commit ziņojumiem nav obligāti precīzi jāsakrīt ar šiem piemēriem, taču katram kontrolpunktam jāatspoguļo būtisks paveiktā darba posms.

Nav pieļaujams viss darbs vienā noslēguma commit.

---

## 3. Noteikumi šim uzdevumam

Paliek spēkā iepriekšējo nedēļu noteikumi — **aizliegts**:

- `any`, `// @ts-ignore`, `// @ts-expect-error`;
- `as` API datiem **un `localStorage` datiem**;
- izslēgt `strict` vai citus `tsconfig` iestatījumus;
- izsaukt `fetch` ārpus `src/api.ts`;
- `document.querySelector`, `createElement`, `innerHTML`, `dangerouslySetInnerHTML`;
- **`useEffect`** — tas būs 7. nedēļā.

Šonedēļ klāt nāk:

- `useState` drīkst lietot jebkurā komponentē, kurai vajag atcerēties vērtību;
- formas lauki ir **kontrolēti**: katram ir `value` **un** `onChange`. `FormData` un `form.elements` nelietojam;
- stāvokli **nemaina uz vietas** — `values.title = ...`, `list.push(...)` ir aizliegti; vienmēr jauns objekts vai masīvs;
- `localStorage` drīkst izsaukt **tikai** failā `src/hooks/useLocalStorage.ts`;
- `src/types.ts` un `src/api.ts` paliek tādi paši kā `week04-react`. `src/guards.ts` drīkst **papildināt** (7. sadaļa), esošās funkcijas nemaina.

Pārbaude — tās pašas **divas** komandas:

```bash
npm run build
npm run lint
```

---

## 4. Kontrolēta forma

### 4.1. Formas vērtību tips un validācija

Izveidojiet `src/validation.ts`. Formas laukos vienmēr ir **teksts** — arī laukā *Progress* un izvēlnē *Category*. Skaitlis un kategorija rodas tikai pēc pārbaudes. Tāpēc formai ir savs tips, nevis `Project`:

```ts
export interface FormValues {
  title: string;
  description: string;
  category: string;
  dueDate: string;
  progress: string;
}

export type FieldName = keyof FormValues;
export type FormErrors = Partial<Record<FieldName, string>>;

export const EMPTY_FORM: FormValues = { title: "", description: "", category: "", dueDate: "", progress: "" };

export type ValidationResult = { ok: true; project: Project } | { ok: false; errors: FormErrors };

export function validate(values: FormValues): ValidationResult
```

Pārnesiet `validate()` no sava `week03-api/src/main.ts`. Noteikumi paliek tie paši (nosaukums ≥ 3 simboli, apraksts ≥ 10, kategorija no saraksta, datums obligāts, progress vesels skaitlis 0–100, `status` ir `"done"`, ja progress ir 100). Atšķirības:

- vērtības nāk no `FormValues`, nevis `FormData` (`readField` vairs nav vajadzīgs);
- apraksts drīkst būt **ne garāks par 200** simboliem;
- funkcija atgriež `ValidationResult` — tāpat kā `LoadState`, lauks `ok` sašaurina tipu.

`validate()` nezina neko par React un DOM. Tā ir parasta funkcija: vērtības iekšā, rezultāts ārā.

### 4.2. `AddProjectForm`

Izveidojiet `src/components/AddProjectForm.tsx`:

```tsx
interface AddProjectFormProps {
  disabled: boolean;
  onAdd: (project: Project) => void;
}
```

Forma pati projektu **nekur nesaglabā** — tā tikai izsauc `onAdd`. Kur projekts nonāks, izlemj tas, kurš formu izmanto (tāpat kā `ErrorBox` un `onRetry` 4. nedēļā).

Komponentes iekšā — trīs stāvokļi:

```tsx
const [values, setValues] = useState<FormValues>(EMPTY_FORM);
const [errors, setErrors] = useState<FormErrors>({});
const [message, setMessage] = useState("");
```

Katrs lauks ir **kontrolēts** — vērtība nāk no stāvokļa, katra izmaiņa iet atpakaļ stāvoklī:

```tsx
<input
  name="title"
  type="text"
  value={values.title}
  onChange={(event) => update("title", event.target.value)}
/>
```

```tsx
function update(name: FieldName, value: string): void {
  setValues((current) => ({ ...current, [name]: value }));
}
```

`setValues` saņem **funkciju**: React tai iedod pašreizējo vērtību, un tā atgriež **jaunu objektu**.

Prasības:

- lauki tie paši kā 3. nedēļā: *Title*, *Category*, *Description*, *Due date*, *Progress (%)*; `<form noValidate>`;
- izvēlnes `<option>` veido ar `CATEGORIES.map(...)` no `types.ts` (ar `key`), pirmā opcija `<option value="">Choose…</option>`;
- *Progress* laukam `type="number"`, bet vērtība stāvoklī ir **teksts**;
- formu nosūtot (`onSubmit`): `event.preventDefault()` → `validate(values)` → kļūdas **vai** `onAdd(...)`, forma iztīrīta (`setValues(EMPTY_FORM)`), ziņa `"<nosaukums>" added.`;
- poga *Add project* ir atspējota, kamēr `disabled` ir `true`.

**`onSubmit` notikuma tips.** Ja apstrādātāju rakstāt kā atsevišķu funkciju, tipu importējiet **no `react`**:

```tsx
import { useState, type SubmitEvent } from "react";

function handleSubmit(event: SubmitEvent<HTMLFormElement>): void {
```

Bez importa `SubmitEvent` ir pārlūka (DOM) tips, un `npm run build` saka: *TS2322: Type '(event: SubmitEvent) => void' is not assignable to type 'SubmitEventHandler<HTMLFormElement>'*. Pamācībās un MI atbildēs bieži redzēsiet `FormEvent` — React tipos tas tagad ir **novecojis** (*deprecated*, redaktorā pārsvītrots). Neizmantojiet to.

Ieteikums: piecas reizes atkārtojas tas pats — `<label>`, virsraksts, lauks, kļūdas teksts. To var iznest komponentē `Field` ar `children` (tāpat kā `SectionHeading` 4. nedēļā):

```tsx
<Field label="Title" error={errors.title}>
  <input ... />
</Field>
```

### 4.3. Izmēģiniet un pierakstiet, ko redzat (vajadzēs refleksijā)

Katru izmēģinājumu pēc tam **atjaunojiet**.

1. **Lauks bez `onChange`.** *Title* laukam izdzēsiet `onChange`, bet atstājiet `value`. Mēģiniet ierakstīt tekstu. Paskatieties pārlūka konsolē.
2. **Stāvokļa maiņa uz vietas.** *Description* laukam uz brīdi ierakstiet:
   ```tsx
   onChange={(event) => { values.description = event.target.value; setValues(values); }}
   ```
   Ierakstiet `hello`. Kas redzams laukā? Pēc tam ierakstiet vienu burtu *Title* laukā. Kas tagad parādās *Description* laukā?
3. **Vērtība uzreiz pēc `set`.** *Progress* lauka `onChange` pēc `update(...)` pierakstiet `console.log(values.progress)`. Ierakstiet `42`. Ko rāda konsole?

---

## 5. Kļūdas, ziņa un aprēķinātās vērtības

- Kļūda parādās **zem sava lauka**; laukam `aria-invalid={errors.title !== undefined}` (sarkanā apmale no 3. nedēļas klasēm `aria-invalid:...` strādā pati).
- Ziņa *"... added."* ir elementā ar `role="status"`.
- Pēc veiksmīgas pievienošanas kļūdas pazūd (`setErrors({})`).

`useState<FormErrors>({})` — tips šeit ir obligāts. Bez tā (`useState({})`) stāvokļa tips ir `{}`, un `errors.title` dod *TS2339: Property 'title' does not exist on type '{}'*.

**Aprakstam simbolu skaitītājs** `37/200` zem lauka; ja vairāk par 200 — sarkanā krāsā. Skaitītājam **nav sava `useState`**: to aprēķina katrā zīmēšanā no `values.description`. Ko var aprēķināt no esošā stāvokļa, to stāvoklī neglabā.

---

## 6. Kur glabāt pievienotos projektus

Pievienotos projektus vajag **divām** komponentēm: `ProjectList` (kartītes) un pirmajai `StatCard` (*Active projects*). Abām kopīgs vecāks ir `App` — tāpēc stāvoklis dzīvo tur (*lifting state up*).

Šajā sadaļā sāciet ar parastu `useState`; 7. sadaļā to nomainīsiet:

```tsx
const [localProjects, setLocalProjects] = useState<Project[]>([]);
```

1. `App` sapludina API projektus ar pievienotajiem — tā pati loģika kā 3. nedēļas `projectsState()`:

```tsx
function withLocalProjects(state: LoadState<Project[]>, local: Project[]): LoadState<Project[]> {
  if (state.status !== "success") return state;
  return { status: "success", data: [...state.data, ...local] };
}
```

2. Sapludināto rezultātu saņem **gan** `ProjectSection`, **gan** *Active projects* kartīte.
3. Jauns projekts: `setLocalProjects([...localProjects, project])` — **nevis** `push`.
4. `ProjectSection` saņem `onAdd` un ieliek `<AddProjectForm>` zem projektu režģa:
   - `disabled={projects.status !== "success"}` — kamēr API projekti nav ielādēti, pievienot nevar;
   - pēc pievienošanas filtrs pārslēdzas uz **All**, lai jaunais projekts ir redzams. Filtrs ir `ProjectSection` stāvoklis, tāpēc to dara `ProjectSection` pati: sava funkcija `handleAdd`, kas izsauc `onAdd(project)` un `setFilter("all")`.
5. *Active projects* kartītes piezīme: `API + your projects`.

`main.tsx` **nemainās**. Kad ielādējas, piemēram, laikapstākļi, `main.tsx` atkal izsauc `root.render(<App ... />)` ar jauniem props — bet `App` stāvoklis (`localProjects`) un formā ierakstītais teksts **paliek**. Tāpat kā filtrs 4. nedēļā.

---

## 7. Pašu hook: `useLocalStorage<T>`

Pēc pārlādes pievienotie projekti pazūd. Izveidojiet `src/hooks/useLocalStorage.ts`:

```ts
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  isValid: (value: unknown) => value is T,
): readonly [T, (next: T) => void]
```

Hook ir parasta funkcija, kuras nosaukums sākas ar `use` un kura iekšā izsauc citus hook. Šis darbojas **tāpat kā `useState`**, tikai:

1. **Sākuma vērtību** vienreiz nolasa no `localStorage`. Iedodiet `useState` **funkciju**, nevis vērtību — tad React to izsauc tikai pirmajā zīmēšanā:
   ```ts
   const [value, setValue] = useState<T>(() => readStored(key, initialValue, isValid));
   ```
2. Nolasītais ir `unknown` (`const parsed: unknown = JSON.parse(raw)`) un tiek pārbaudīts ar `isValid` — `localStorage` saturu var izmainīt jebkurš, tāpat kā API atbildi. Ja dati ir bojāti, nav pareizajā formā vai `localStorage` nav pieejams — atgriež `initialValue`. `getItem` un `JSON.parse` ir `try/catch` iekšā.
3. Atgrieztā **setter** funkcija izsauc `setValue(next)` **un** `localStorage.setItem(key, JSON.stringify(next))` (arī `try/catch` — krātuve var būt pilna vai bloķēta).
4. Atgriež `[value, save]`.

Atslēga: `campusflow.week05.localProjects` (3. nedēļas atslēgu neaiztiekam — abas versijas darbojas uz `localhost:5173` un dala vienu `localStorage`).

`guards.ts` papildiniet ar:

```ts
export function isProjectList(value: unknown): value is Project[] {
  return Array.isArray(value) && value.every(isProject);
}
```

`App`:

```tsx
const [localProjects, setLocalProjects] = useLocalStorage<Project[]>(STORAGE_KEY, [], isProjectList);
```

Pārējā `App` daļa nemainās — hook atgriež to pašu, ko `useState`.

**Atgriešanas tips ir svarīgs.** Ja `readonly [T, (next: T) => void]` izdzēsīsiet, TypeScript `[value, save]` uzskata par parastu masīvu, kurā katrs elements var būt jebkas no abiem. Tad `setLocalProjects(...)` dod *TS2349: This expression is not callable. Not all constituents of type 'Project[] | ((next: Project[]) => void)' are callable.*

**Kāpēc bez `useEffect`?** Pamācībās `useLocalStorage` gandrīz vienmēr raksta ar `useEffect`. Mums tas nav vajadzīgs: lasām vienreiz sākumā (funkcija `useState` iekšā), rakstām tikai tad, kad paši mainām vērtību (setterī). `useEffect` būs 7. nedēļā — tur, kur tas tiešām vajadzīgs.

---

## 8. Hook noteikumi — tos pārbauda `npm run lint`

Hook (`useState`, `useLocalStorage`, ...) drīkst izsaukt **tikai**:

- komponentes vai cita hook **augšējā līmenī** — ne `if`, ne ciklā, ne pēc `return`;
- funkcijā, kuras nosaukums sākas ar lielo burtu (komponente) vai ar `use` (hook).

`npm run build` šīs kļūdas **neredz**. `npm run lint` pirmās divas parāda kā kļūdu (*error*), trešo — kā brīdinājumu (*warning*):

- `useState` iekš `if` → *React Hook "useState" is called conditionally. React Hooks must be called in the exact same order in every component render.*
- hook funkcijā `localState()` → *React Hook "useState" is called in function "localState" that is neither a React function component nor a custom React Hook function.*
- `setErrors(...)` tieši komponentes ķermenī (nevis notikuma apstrādātājā) → *Cannot call setState during render* — tā ir bezgalīga cikla recepte.

---

## 9. Pārbaude

4. nedēļas pārbaudes (TASK 11. sadaļa) jāiztur arī tagad: ielāde, bloķēts pieprasījums, nepareiza forma, tukšs saraksts, laikapstākļi bloķēti, teksts paliek teksts, filtrs paliek pēc *Try again*, tīra konsole.

Jaunas pārbaudes:

1. **Tukša forma:** *Add project* bez datiem → piecas kļūdas, pieci sarkani lauki, nekas netiek pievienots.
2. **Atstarpes:** nosaukums `"  ab  "` → kļūda (pēc `trim()` tie ir 2 simboli). Progress `50.5` vai `-1` → kļūda.
3. **Pievienošana:** derīgs projekts → jauna kartīte saraksta beigās, *Active projects* +1, ziņa *added.*, forma tukša.
4. **Pārlāde:** pārlādējiet lapu — pievienotais projekts joprojām ir. DevTools → *Application* → *Local Storage* → redzama atslēga `campusflow.week05.localProjects`.
5. **Progress 100:** projekts pievienojas kā *Done* un *Active projects* nemainās.
6. **Filtrs:** ieslēdziet **Active**, pievienojiet projektu → filtrs pārslēdzas uz **All**.
7. **Ielādes laikā:** *Slow 4G* → kamēr projekti ielādējas, *Add project* ir atspējota. Kļūdas gadījumā arī.
8. **Bojāts `localStorage`:** *Application* → *Local Storage* atslēgas vērtību nomainiet uz `{bad` un pārlādējiet → lapa strādā, redzami tikai API projekti, konsolē nav kļūdu.
9. **Ierakstītais paliek:** *Slow 4G*, pārlādējiet un, kamēr laikapstākļi vēl ielādējas, sāciet rakstīt *Title* laukā. Kad laikapstākļi ielādējas, teksts laukā paliek.
10. **Teksts paliek teksts:** nosaukumā ierakstiet `<img src=x onerror=alert(1)>` → kartītē redzami tieši šie simboli.
11. **Simbolu skaitītājs:** 201 simbols aprakstā → skaitītājs sarkans, nosūtot — kļūda.

Pēc pārbaudēm izdzēsiet atslēgu `campusflow.week05.localProjects` (*Application* → *Local Storage*).

Ja ir **React Developer Tools**: cilnē *Components* izvēlieties `AddProjectForm` un rakstiet formā — labajā pusē redzams, kā mainās tās stāvoklis.

---

## 10. Papildu uzdevumi (izvēles)

Ja pamata darbs pabeigts, izvēlieties vismaz vienu:

- **Kļūda pazūd, kad lauku labo:** `update()` papildus izsauc `setErrors((current) => ({ ...current, [name]: undefined }))`.
- **Dzēšana:** `ProjectCard` saņem neobligātu `onRemove?: () => void`; poga *Remove* redzama **tikai** pašu pievienotajiem projektiem (API projektus dzēst nevar). Dzēšana — `filter`, nevis `splice`.
- **`useReducer`:** trīs formas `useState` aizstājiet ar vienu reducer:
  ```ts
  interface FormState {
    values: FormValues;
    errors: FormErrors;
    message: string;
  }

  type FormAction =
    | { type: "changed"; name: FieldName; value: string }
    | { type: "failed"; errors: FormErrors }
    | { type: "added"; title: string };

  function formReducer(state: FormState, action: FormAction): FormState
  ```
  `switch (action.type)` iekšā TypeScript zina, kuri lauki ir katrai darbībai.
- **Atzīmēt kā pabeigtu:** pašu pievienotajam projektam poga *Mark as done* → `status: "done"`, `progress: 100` (ar `map`, jauns objekts).
- **Atsevišķas kļūdu saites:** `useId()` katram laukam unikālam `id`; kļūdas tekstam `id`, laukam `aria-describedby`.

---

## 11. Mākslīgā intelekta izmantošana

Mācīšanās un praktiskā darba laikā mākslīgā intelekta izmantošana ir atļauta.

Aizpildiet `AI_USAGE.md` pirms darba iesniegšanas.

Nav nepieciešams pievienot pilnas sarakstes ar mākslīgā intelekta rīkiem.

Ņemiet vērā, ko MI rīki šai tēmai gandrīz vienmēr piedāvā — un kāpēc šonedēļ to **nedrīkst**:

- `useEffect` hook `useLocalStorage` iekšā (3. un 7. sadaļa);
- `FormEvent` (novecojis, 4.2. sadaļa);
- nekontrolētu formu ar `FormData` vai `useRef` (3. sadaļa);
- `as Project[]` pēc `JSON.parse` (3. sadaļa — vajag `isProjectList`).

---

## 12. Darba iesniegšana

Gala versiju augšupielādējiet GitHub.

Iesniedziet:

- GitHub repozitorija saiti;
- pilnu projekta pirmkodu mapē `week05-state`;
- Git izmaiņu vēsturi;
- aizpildītu `AI_USAGE.md`;
- aizpildītu `REFLECTION.md`.

Pirms iesniegšanas pārbaudiet, ka:

- `npm install` izpildās bez kļūdām;
- **`npm run build` izpildās bez kļūdām**;
- **`npm run lint` neparāda brīdinājumus**;
- kodā nav `any`, `@ts-ignore`, `as` API vai `localStorage` datiem, `useEffect`, `querySelector`, `innerHTML`, `dangerouslySetInnerHTML`, `FormData`, `FormEvent`;
- `localStorage` ir **tikai** `src/hooks/useLocalStorage.ts`;
- katram formas laukam ir `value` **un** `onChange`;
- stāvoklis nekur netiek mainīts uz vietas (`push`, `splice`, `obj.lauks = ...`);
- visas 4. nedēļas un 11 jaunās pārbaudes (9. sadaļa) ir izietas;
- lapa izskatās tāpat kā 4. nedēļā, arī šaurā logā; forma — kā 3. nedēļā.
