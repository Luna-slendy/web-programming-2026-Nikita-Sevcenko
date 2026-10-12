# 4. nedēļas praktiskais uzdevums — CampusFlow: React komponentes ar tipizētiem props

## Mērķis

Pārnest **CampusFlow** uz **React + TypeScript**:

- lapa ir salikta no komponentēm (`Header`, `StatCard`, `ProjectCard`, ...), nevis no viena gara `index.html`;
- katrai komponentei ir **aprakstīts props tips** — ja komponentei iedod nepareizus datus, kļūdu parāda TypeScript, nevis pārlūks;
- 3. nedēļas datu slānis (`types.ts`, `guards.ts`, `api.ts`) tiek pārnests **bez nevienas izmaiņas**;
- 3. nedēļas `render.ts` (`createElement`, `replaceChildren`) pazūd — tā vietā ir JSX;
- ielādes, kļūdu un tukšie stāvokļi strādā tāpat kā 3. nedēļā.

Vizuālajam noformējumam jāpaliek tādam pašam kā jūsu 3. nedēļas versijā.

**Šonedēļ lapā nav formas *Add a project*.** Tā atgriezīsies nākamnedēļ kā React forma.

Mācīšanās un praktiskā darba laikā ir atļauts izmantot:

- oficiālo dokumentāciju ([react.dev](https://react.dev/learn/typescript));
- meklētājprogrammas;
- pamācības;
- mākslīgā intelekta rīkus.

Individuālā refleksija jāizpilda **patstāvīgi, neizmantojot mākslīgā intelekta rīkus**.

---

## 0. Pirms sākat

Ja 3. nedēļas uzdevums (`week03-api`) vēl nav pabeigts — **vispirms pabeidziet to**. Šis uzdevums balstās uz tā rezultātu.

Pārbaudiet Node.js versiju:

```bash
node -v
```

Nepieciešama **Node.js 20.19+ vai 22.12+**.

---

## 1. Jauns projekts `week04-react`

Šoreiz mapi **nekopējam** — React projektam ir cita uzbūve, tāpēc to veidojam no Vite veidnes.

1. Repozitorija saknē palaidiet:

```bash
npm create vite@latest week04-react -- --template react-ts
```

Vite uzdos divus jautājumus:

| Jautājums | Atbilde |
|---|---|
| *Which linter to use?* | **Oxlint** |
| *Install with npm and start now?* | **No** |

2. Instalējiet pakotnes un Tailwind:

```bash
cd week04-react
npm install
npm install tailwindcss @tailwindcss/vite
```

3. `vite.config.ts` pievienojiet Tailwind spraudni blakus React spraudnim:

```ts
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

4. Iztīriet veidnes demo:
   - izdzēsiet `src/App.css`, mapi `src/assets/`, `public/favicon.svg` un `public/icons.svg`;
   - `src/index.css` saturu **pilnībā aizstājiet** ar sava `week03-api/src/style.css` saturu (`@import "tailwindcss";` un `@theme { ... }`). Ja veidnes CSS paliks, lapa būs sašaurināta un centrēta.

5. Pārnesiet no `week03-api` **bez izmaiņām**:
   - `src/types.ts`, `src/guards.ts`, `src/api.ts`;
   - mapi `public/api/` (ar `projects.json` un `deadlines.json`).

   **Nepārnesiet** `render.ts`, `main.ts` un `storage.ts`.

6. `index.html`: nomainiet `<title>` uz `CampusFlow Dashboard` un `<body>` ielieciet tās pašas klases, kas bija 3. nedēļā. `index.html` joprojām ir parasts HTML — šeit raksta `class`.

7. `src/App.tsx` saturu uz brīdi aizstājiet ar šo un palaidiet `npm run dev`:

```tsx
function App() {
  return <h1 className="p-8 text-3xl font-bold text-primary">CampusFlow</h1>;
}

export default App;
```

Ja virsraksts ir liels un violets — React un Tailwind strādā.

8. Atjaunojiet datumus `public/api/*.json`, lai termiņi ir nākotnē.

---

## 2. Git kontrolpunkti

### Obligātie minimālie kontrolpunkti

1. `Create week04-react with Vite react-ts and Tailwind`
2. `Move static layout to React components`
3. `Pass API data to App as typed props`
4. `Render projects and deadlines from LoadState props`
5. `Add weather card, filter and mobile menu`

Commit ziņojumiem nav obligāti precīzi jāsakrīt ar šiem piemēriem, taču katram kontrolpunktam jāatspoguļo būtisks paveiktā darba posms.

Nav pieļaujams viss darbs vienā noslēguma commit.

---

## 3. Noteikumi šim uzdevumam

Paliek spēkā iepriekšējo nedēļu noteikumi — **aizliegts**:

- `any`, `// @ts-ignore`, `// @ts-expect-error`;
- `as` API datiem;
- izslēgt `strict` vai citus `tsconfig` iestatījumus;
- izsaukt `fetch` ārpus `src/api.ts`.

Šonedēļ klāt nāk:

- katra komponente ir **savā failā** mapē `src/components/`, faila un komponentes nosaukums ar lielo burtu (`ProjectCard.tsx`);
- katrai komponentei, kas saņem datus, ir **`interface ...Props`**;
- **aizliegts** `document.querySelector`, `createElement`, `innerHTML` un `dangerouslySetInnerHTML` — DOM tagad pārvalda React;
- `useState` drīkst lietot tikai lokālam saskarnes stāvoklim (izvēlne, filtrs). **`useEffect` šonedēļ nelietojam** — dati komponentēs ienāk tikai caur props.

Pārbaude — **divas** komandas:

```bash
npm run build
npm run lint
```

`npm run build` pārbauda tipus. `npm run lint` atrod React kļūdas, kuras tipi neredz (piemēram, aizmirstu `key`). `npm run dev` nepārbauda ne vienu, ne otru.

---

## 4. No HTML uz JSX: nemainīgā daļa

Sāciet ar to lapas daļu, kurā nav datu no API. Izveidojiet komponentes:

| Fails | Saturs | Props |
|---|---|---|
| `Header.tsx` | logo, navigācija, lietotājs | `userName`, `userInitials`, `course` — visi `string` |
| `Hero.tsx` | lielais virsraksts un *This week* bloks | nav |
| `Resources.tsx` | *Useful links* | nav |
| `Footer.tsx` | kājene | `note: string` |

`App.tsx` tās saliek kopā:

```tsx
<Header userName="Alex Student" userInitials="AZ" course="Web Programming" />
```

JSX izskatās kā HTML, bet ir TypeScript. Atšķirības, ar kurām saskarsieties:

| HTML | JSX |
|---|---|
| `class="..."` | `className="..."` |
| `<input>`, `<br>` | `<input />`, `<br />` — katram tagam jābūt aizvērtam |
| `style="width: 50%"` | `style={{ width: "50%" }}` — objekts, nevis teksts |
| `<!-- komentārs -->` | `{/* komentārs */}` |
| vairāki elementi blakus | viens ārējais elements vai fragments `<> ... </>` |
| `aria-label`, `data-...`, `id`, `href` | tāpat kā HTML |

Ja kaut kur paliks `class`, `npm run build` to parādīs: *Property 'class' does not exist ... Did you mean 'className'?*

---

## 5. Tipizēti props: `StatCard`

Četras statistikas kartītes ir viens un tas pats HTML ar citiem tekstiem. Izveidojiet `src/components/StatCard.tsx`:

```tsx
type StatTone = "neutral" | "positive" | "danger";

interface StatCardProps {
  index: string;
  label: string;
  value: string;
  note: string;
  tone?: StatTone;
}

function StatCard({ index, label, value, note, tone = "neutral" }: StatCardProps) {
  // ...
}

export default StatCard;
```

Prasības:

- `tone` ir **neobligāts** (`?`), noklusējuma vērtība `"neutral"`;
- piezīmes krāsa ir atkarīga no `tone`, un klases glabājas `Record<StatTone, string>` — tāpat kā kategoriju krāsas 2. nedēļā;
- lapā ir četras kartītes, visas no `StatCard`.

**Izmēģiniet un pierakstiet, ko redzat** (vajadzēs refleksijā):

1. vienai kartītei izdzēsiet `note="..."`;
2. vienai kartītei ierakstiet `tone="green"`.

Paskatieties redaktorā, pārlūkā un palaidiet `npm run build`. Pēc tam atjaunojiet kodu.

---

## 6. Dati: `main.tsx` un `App` props

3. nedēļā `main.ts` glabāja trīs `LoadState` mainīgos un pēc katras izmaiņas izsauca `render()`, kas pats pārzīmēja DOM. Šonedēļ `main.tsx` dara **to pašu**, tikai `render()` vairs neaiztiek DOM — tas iedod React jaunus props:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { fetchDeadlines, fetchProjects, fetchWeather } from "./api.ts";
import type { CurrentWeather, Deadline, LoadState, Project } from "./types.ts";

const container = document.getElementById("root");
if (container === null) {
  throw new Error("Element #root not found.");
}
const root = createRoot(container);

let projects: LoadState<Project[]> = { status: "loading" };
let deadlines: LoadState<Deadline[]> = { status: "loading" };
let weather: LoadState<CurrentWeather> = { status: "loading" };

function render(): void {
  root.render(
    <StrictMode>
      <App
        projects={projects}
        deadlines={deadlines}
        weather={weather}
        onRetryProjects={() => void loadProjects()}
        onRetryDeadlines={() => void loadDeadlines()}
      />
    </StrictMode>,
  );
}
```

Zem tā pārnesiet no sava `week03-api/src/main.ts` **ielādes funkcijas** (`loadProjects`, `loadDeadlines`, `loadWeather`, kļūdas ziņojuma veidošanu) un trīs izsaukumus faila beigās. Tās nemainās: stāvoklis → `loading`, `render()`, `try/catch`, `render()`.

**Nepārnesiet** neko, kas strādāja ar DOM: elementu meklēšanu, `addEventListener`, formu, `localStorage`.

`App.tsx` aprakstiet, ko `App` saņem:

```tsx
interface AppProps {
  projects: LoadState<Project[]>;
  deadlines: LoadState<Deadline[]>;
  weather: LoadState<CurrentWeather>;
  onRetryProjects: () => void;
  onRetryDeadlines: () => void;
}
```

Pārbaude: uz brīdi ielieciet `App` iekšā `<p>{projects.status}</p>` — lapā jāparādās `loading`, pēc tam `success`.

Katrs `render()` izsaukums iedod React pilnīgi jaunu props komplektu. React salīdzina jauno JSX ar iepriekšējo un DOM maina tikai tur, kur kaut kas atšķiras. Tā nav ierastā React pieeja — parasti stāvokli glabā pašas komponentes. To izdarīsim nākamnedēļ; šonedēļ komponentes tikai **saņem** datus.

---

## 7. Projekti

### 7.1. `ProjectCard`

```tsx
interface ProjectCardProps {
  project: Project;
}
```

Atveriet blakus savu 3. nedēļas `render.ts` funkciju `createProjectCard` un pārrakstiet to par komponenti: tie paši dati, tās pašas klases, bet JSX, nevis `createElement`.

- Tekstu ielieciet ar figūriekavām: `{project.title}`. React to parāda kā **tekstu** — `textContent` vairs nav vajadzīgs.
- Progresa joslas platums nāk no datiem: `style={{ width: `${project.progress}%` }}`.
- Kategoriju un statusa krāsu `Record<...>` objekti pārceļas uz šo failu.

### 7.2. Stāvokļu komponentes

Failā `src/components/StateBox.tsx` izveidojiet trīs komponentes (vienā failā drīkst būt vairākas, ja visas ir komponentes):

```tsx
export function LoadingBox({ text }: LoadingBoxProps)            // role="status"
export function ErrorBox({ message, onRetry }: ErrorBoxProps)    // role="alert" + poga Try again
export function EmptyBox({ title, text }: EmptyBoxProps)
```

`ErrorBox` saņem **funkciju kā prop**:

```tsx
interface ErrorBoxProps {
  message: string;
  onRetry: () => void;
}
```

`ErrorBox` nezina, kas tiks ielādēts no jauna — to izlemj tas, kurš komponenti izmanto. Tāpēc viena `ErrorBox` der gan projektiem, gan termiņiem.

Uzmanību: `onClick={onRetry}`, **nevis** `onClick={onRetry()}`. Ar iekavām funkcija tiktu izsaukta uzreiz zīmēšanas laikā, nevis pēc klikšķa.

### 7.3. `ProjectList`

```tsx
interface ProjectListProps {
  state: LoadState<Project[]>;
  filter: ProjectFilter;
  onRetry: () => void;
}
```

| `state.status` | Ko atgriež komponente |
|---|---|
| `loading` | `<LoadingBox text="Loading projects…" />` |
| `error` | `<ErrorBox message={state.message} onRetry={onRetry} />` |
| `success`, saraksts tukšs | `<EmptyBox ... />` |
| `success` | `<ProjectCard />` katram projektam |

Sarakstu veido ar `.map()`, un katram elementam vajag **`key`**:

```tsx
visible.map((project) => <ProjectCard key={project.id} project={project} />)
```

`key` ir `project.id` — nevis masīva indekss. Ja `key` aizmirsīsiet, `npm run build` klusēs; to parādīs `npm run lint` un pārlūka konsole.

Pagaidām `App` iedod `filter="all"` — filtra pogas pievienosiet 10. sadaļā.

---

## 8. Termiņi

Pēc tā paša parauga:

- `DeadlineItem.tsx` — viens termiņš, props `deadline: Deadline`;
- `DeadlineSection.tsx` — saņem `deadlines: LoadState<Deadline[]>` un `onRetry`, rāda ielādi / kļūdu / *"No upcoming deadlines."* / sarakstu.

Kārtojot pēc datuma, vispirms izveidojiet kopiju: `[...state.data].sort(...)`. `sort()` maina masīvu uz vietas, bet **props mainīt nedrīkst**.

---

## 9. Laikapstākļi: komponente, kas izmanto komponenti

Izveidojiet `WeatherCard.tsx`, kas saņem `weather: LoadState<CurrentWeather>` un atgriež **`<StatCard />`** ar atbilstošiem props:

| `weather.status` | `value` | `note` | `tone` |
|---|---|---|---|
| `loading` | `…` | `Loading weather…` | noklusējums |
| `error` | `–` | `Weather unavailable` | `danger` |
| `success` | temperatūra, °C | vēja ātrums, km/h | noklusējums |

Pirmā kartīte (*Active projects*) arī rāda `…` ielādes laikā un `–` kļūdas gadījumā.

---

## 10. `children`, filtrs un izvēlne

### 10.1. `SectionHeading` ar `children`

Sadaļu virsraksti (*OVERVIEW / Your workspace*, *PROJECTS / Current work*, *DEADLINES / Coming up*) atšķiras tikai ar to, kas ir labajā pusē: teksts, filtra pogas vai saite. Izveidojiet vienu komponenti:

```tsx
import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}
```

`children` ir viss, ko ieliek starp atverošo un aizverošo tagu:

```tsx
<SectionHeading eyebrow="DEADLINES" title="Coming up">
  <a href="#">See all</a>
</SectionHeading>
```

### 10.2. Filtrs

- `ProjectFilters.tsx` — trīs pogas; props `current: ProjectFilter` un `onChange: (filter: ProjectFilter) => void`; aktīvajai pogai `aria-pressed={true}`.
- Filtra vērtību glabā komponente, kurā ir gan pogas, gan saraksts (piemēram, `ProjectSection.tsx`):

```tsx
const [filter, setFilter] = useState<ProjectFilter>("all");
```

`useState<ProjectFilter>` nozīmē, ka stāvoklī nevar ielikt neko citu kā `"all"`, `"active"` vai `"done"`.

### 10.3. Mobilā izvēlne

`Header` glabā `useState(false)`; poga pārslēdz izvēlni, `aria-expanded={isMenuOpen}`.

---

## 11. Pārbaude

Tās pašas pārbaudes, kas 3. nedēļā (TASK 6.5. un 7. sadaļa), jāiztur arī React versijai:

1. **Ielāde:** *Network* → *Disable cache* + *Slow 4G* → trīs ielādes teksti.
2. **Bloķēts pieprasījums:** *Block request* uz `projects.json` → kļūda ar **Try again**, termiņi un laikapstākļi strādā.
3. **Nepareiza forma:** `"progress": "50"` → kļūda par formātu.
4. **Tukšs saraksts:** `[]` → tukšā stāvokļa paziņojums.
5. **Laikapstākļi bloķēti:** *"Weather unavailable"*, pārējā lapa strādā.

Jaunas pārbaudes:

6. **Teksts paliek teksts:** `projects.json` viena projekta nosaukumā ierakstiet `<b>test</b>` → lapā jāredz tieši šie simboli, nevis treknraksts.
7. **Stāvoklis saglabājas:** bloķējiet `deadlines.json` un pārlādējiet lapu. Nospiediet filtru **Done**. Tad izslēdziet bloķēšanu un termiņu sadaļā nospiediet **Try again** — `main.tsx` izsauc `render()` vēl divas reizes, bet filtram jāpaliek uz **Done**.
8. **Konsole:** nav sarkanu React brīdinājumu (piemēram, par `key`).

Pēc pārbaudēm atjaunojiet īstos datus.

Ja pārlūkā var instalēt paplašinājumu **React Developer Tools**: cilnē *Components* uzklikšķiniet uz `ProjectCard` un apskatiet, kādus props tā saņēma.

---

## 12. Papildu uzdevumi (izvēles)

Ja pamata darbs pabeigts, izvēlieties vismaz vienu:

- **`Pill` komponente** kategorijas, statusa un termiņa nozīmītēm — ar `children: ReactNode`;
- **pilnīga `switch` pārbaude** komponentē `ProjectList`: `switch (state.status)` ar `default` zaru un `never`;
- **ģeneriska komponente** visām sadaļām ar ielādi:

```tsx
interface AsyncBoxProps<T> {
  state: LoadState<T>;
  loadingText: string;
  onRetry: () => void;
  children: (data: T) => ReactNode;
}

function AsyncBox<T>({ state, loadingText, onRetry, children }: AsyncBoxProps<T>)
```

- **poga ar visiem `<button>` atribūtiem:** `interface ButtonProps extends ComponentProps<"button"> { variant: "primary" | "secondary" }` (`ComponentProps` no `react`);
- **termiņu nozīmītes** (*Today*, *3 days*, *Overdue*) ar krāsu pēc atlikušo dienu skaita;
- **laikapstākļu apraksts** no `weatherCode` (ja 3. nedēļā to jau uzrakstījāt — pārnesiet funkciju atsevišķā failā bez izmaiņām).

---

## 13. Mākslīgā intelekta izmantošana

Mācīšanās un praktiskā darba laikā mākslīgā intelekta izmantošana ir atļauta.

Aizpildiet `AI_USAGE.md` pirms darba iesniegšanas.

Nav nepieciešams pievienot pilnas sarakstes ar mākslīgā intelekta rīkiem.

Ņemiet vērā: MI rīki React datu ielādei gandrīz vienmēr piedāvā `useEffect`. Šonedēļ tas nav atļauts (3. sadaļa) — ja MI to ieraksta, tas ir ieteikums, ko jānoraida vai jāpārveido.

---

## 14. Darba iesniegšana

Gala versiju augšupielādējiet GitHub.

Iesniedziet:

- GitHub repozitorija saiti;
- pilnu projekta pirmkodu mapē `week04-react`;
- Git izmaiņu vēsturi;
- aizpildītu `AI_USAGE.md`;
- aizpildītu `REFLECTION.md`.

Pirms iesniegšanas pārbaudiet, ka:

- `npm install` izpildās bez kļūdām;
- **`npm run build` izpildās bez kļūdām**;
- **`npm run lint` neparāda brīdinājumus**;
- kodā nav `any`, `@ts-ignore`, `as` API datiem, `useEffect`, `querySelector`, `innerHTML`, `dangerouslySetInnerHTML`;
- `src/types.ts`, `src/guards.ts` un `src/api.ts` ir tādi paši kā `week03-api`;
- projektā nav `render.ts`, `App.css` un veidnes demo failu;
- katrai komponentei ar datiem ir `interface ...Props`;
- sarakstos `key` ir `id` no datiem;
- visas 8 pārbaudes (11. sadaļa) ir izietas;
- lapa izskatās tāpat kā 3. nedēļā (izņemot formu), arī šaurā logā.
