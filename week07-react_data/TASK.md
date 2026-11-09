# 7. nedēļas praktiskais uzdevums — CampusFlow: React ielādē datus pats

## Mērķis

Pārcelt datu ielādi no `main.tsx` uz **React komponentēm**:

| Kas | Līdz šim (`week06-router`) | Tagad (`week07-react-data`) |
|---|---|---|
| Kur ielādē projektus un termiņus | `main.tsx`, ārpus React | `App` ar `useFetch` |
| Kur ielādē laikapstākļus | `main.tsx` | `WeatherCard` pats ar `useFetch` |
| Kā React uzzina par jauniem datiem | `main.tsx` vēlreiz izsauc `root.render(...)` | `useFetch` maina stāvokli, React pārzīmē pats |
| Ko dara `main.tsx` | 3 stāvokļi, `load()`, `render()` | **viens** `root.render` |
| Kas notiek ar pieprasījumu, ja komponente pazūd | nekas | tas tiek **atcelts** (`AbortController`) |
| Kur atveras jauna lapa | tajā pašā ritinājuma vietā | **no augšas** |

Lietotājam lapai jāizskatās un jāstrādā **tāpat kā 6. nedēļā**. Mainās tas, kur un kā notiek ielāde.

Mācīšanās un praktiskā darba laikā ir atļauts izmantot:

- oficiālo dokumentāciju ([react.dev — Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects), [react.dev — useEffect](https://react.dev/reference/react/useEffect));
- meklētājprogrammas;
- pamācības;
- mākslīgā intelekta rīkus.

Individuālā refleksija jāizpilda **patstāvīgi, neizmantojot mākslīgā intelekta rīkus**.

---

## 0. Pirms sākat

Ja 6. nedēļas uzdevums (`week06-router`) vēl nav pabeigts — **vispirms pabeidziet to**. Šis uzdevums balstās uz tā rezultātu.

Nepieciešama **Node.js 20.19+ vai 22.12+** (`node -v`). Jaunas pakotnes šonedēļ nav vajadzīgas.

**16.11 nodarbības sākumā — B bloka tests** (Wayground, ~15 min, bez MI). Sk. `README.md`.

---

## 1. Jaunā mape `week07-react-data`

1. Repozitorija saknē nokopējiet mapi `week06-router` un nosauciet kopiju `week07-react-data`.
2. Kopijā **izdzēsiet** mapes `node_modules` un `dist` (ja tās ir).
3. `package.json` laukā `"name"` ierakstiet `"week07-react-data"`.
4. Mapē `week07-react-data` palaidiet:

```bash
npm install
npm run dev
```

Pārliecinieties, ka lapa strādā tāpat kā 6. nedēļā.

5. Atjaunojiet datumus `public/api/*.json`, lai termiņi ir nākotnē.

---

## 2. Git kontrolpunkti

### Obligātie minimālie kontrolpunkti

1. `Create week07-react-data from week06-router`
2. `Pass an AbortSignal through the API layer`
3. `Add the useFetch hook`
4. `Load data in components and simplify main.tsx`
5. `Scroll to the top on route change`

Commit ziņojumiem nav obligāti precīzi jāsakrīt ar šiem piemēriem, taču katram kontrolpunktam jāatspoguļo būtisks paveiktā darba posms.

Nav pieļaujams viss darbs vienā noslēguma commit.

---

## 3. Noteikumi šim uzdevumam

Paliek spēkā iepriekšējo nedēļu noteikumi — **aizliegts**:

- `any`, `// @ts-ignore`, `// @ts-expect-error`;
- `as` API datiem, `localStorage` datiem un adreses parametriem;
- izslēgt `strict` vai citus `tsconfig` iestatījumus;
- izsaukt `fetch` ārpus `src/api.ts`, `localStorage` ārpus `src/hooks/useLocalStorage.ts`;
- `document.querySelector`, `createElement`, `innerHTML`, `dangerouslySetInnerHTML`;
- mainīt stāvokli uz vietas;
- pāreja uz citu CampusFlow lapu ar `<a href="/...">`.

Šonedēļ:

- **`useEffect` ir atļauts** — bet **tikai** divās vietās: `src/hooks/useFetch.ts` (ielāde) un `src/components/Layout.tsx` (ritinājums). Papildu uzdevumos (12. sadaļa) — arī tur norādītajās vietās;
- datus no API komponentes ielādē **tikai** ar `useFetch`;
- `useLocalStorage` paliek **bez** `useEffect` (6. nedēļas risinājums jau ir pareizs);
- `src/types.ts` un `src/guards.ts` paliek tādi paši kā `week06-router`. `src/api.ts` mainās **tikai** 4. sadaļā aprakstītajā veidā.

Pārbaude — tās pašas **divas** komandas:

```bash
npm run build
npm run lint
```

Šonedēļ `npm run lint` ir īpaši svarīgs: vairākas `useEffect` kļūdas atrod **tikai** linteris, nevis `tsc` (sk. 11. sadaļu).

---

## 4. API slānis pieņem `signal`

Pieprasījumu var atcelt tikai tas, kurš to sāka. Tāpēc `src/api.ts` funkcijām jāpieņem `AbortSignal` un jānodod tas `fetch`:

```ts
async function getJson(url: string, signal: AbortSignal): Promise<unknown> {
  const response = await fetch(url, { signal: AbortSignal.any([signal, AbortSignal.timeout(TIMEOUT_MS)]) });
  // ... pārējais bez izmaiņām
}

export async function fetchProjects(signal: AbortSignal): Promise<Project[]> {
  const data = await getJson(PROJECTS_URL, signal);
  // ... pārējais bez izmaiņām
}
```

Tāpat `fetchDeadlines(signal)` un `fetchWeather(signal)`.

`AbortSignal.any([...])` apvieno divus signālus: pieprasījums apstājas, ja to atceļ komponente **vai** ja serveris neatbild 8 sekundēs (3. nedēļas noildze paliek). Ja 3. nedēļā noildzi neuztaisījāt, pietiek ar `{ signal }`.

Ja kaut kur palika izsaukums bez argumenta, `tsc` to atradīs: *TS2554: Expected 1 arguments, but got 0.*

---

## 5. Pašu hook `useFetch<T>`

Izveidojiet `src/hooks/useFetch.ts`. Tas dara to pašu, ko līdz šim `main.tsx` funkcija `load()`, tikai React iekšā:

```ts
import { useEffect, useState } from "react";
import type { LoadState } from "../types.ts";

export interface FetchResult<T> {
  state: LoadState<T>;
  retry: () => void;
}

export function useFetch<T>(fetcher: (signal: AbortSignal) => Promise<T>): FetchResult<T> {
  const [state, setState] = useState<LoadState<T>>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function load(): Promise<void> {
      try {
        const data = await fetcher(controller.signal);
        if (!controller.signal.aborted) setState({ status: "success", data });
      } catch (error) {
        if (!controller.signal.aborted) setState({ status: "error", message: errorMessage(error) });
      }
    }

    void load();
    return () => controller.abort();
  }, [fetcher, attempt]);

  function retry(): void {
    setState({ status: "loading" });
    setAttempt((current) => current + 1);
  }

  return { state, retry };
}
```

Funkciju `errorMessage` pārceliet no `main.tsx` uz šo failu.

Kas ir kas:

- **`useEffect(() => { ... }, [fetcher, attempt])`** — kods, kas jāizpilda **pēc** tam, kad komponente parādījusies ekrānā. Masīvs beigās ir **atkarības**: efekts palaižas vēlreiz tikai tad, ja kāda no tām mainījusies;
- **`return () => controller.abort()`** — **tīrīšana**. React to izsauc, kad komponente pazūd, un pirms efekts palaižas vēlreiz. Nepabeigts pieprasījums tiek atcelts;
- **`if (!controller.signal.aborted)`** — atcelts pieprasījums nav kļūda: komponente vairs neeksistē vai jau sākusies jauna ielāde. Par to nerādām *Could not load data*;
- **`async function load()`** efekta iekšā — pats efekts nedrīkst būt `async` (sk. 11. sadaļu);
- **`attempt`** — skaitlis, kuru palielina *Try again*. Tas ir atkarībās, tāpēc efekts palaižas vēlreiz;
- **`setState({ status: "loading" })` funkcijā `retry`**, nevis efektā — lietotājs nospieda pogu un uzreiz redz ielādi. Ja to ieliek efekta sākumā, `npm run lint` brīdina: *react(set-state-in-effect): Calling setState synchronously within an effect can trigger cascading renders*.

**Svarīgi:** `fetcher` jābūt funkcijai, kas definēta **ārpus** komponentes, piemēram, `fetchProjects` no `api.ts`. Sk. 9. sadaļas 3. izmēģinājumu.

---

## 6. `App` ielādē, `main.tsx` tikai zīmē

`App.tsx` vairs nesaņem datus caur props. Tas tos ielādē pats:

```tsx
function App() {
  const { state: projects, retry: onRetryProjects } = useFetch(fetchProjects);
  const { state: deadlines, retry: onRetryDeadlines } = useFetch(fetchDeadlines);
  // ... localProjects, withLocalProjects, Routes — kā līdz šim
}
```

`interface AppProps` izdzēsiet. Lapām props paliek tādi paši — mainās tikai tas, no kurienes `App` tos ņem.

`App` atrodas **virs** maršrutiem un nepazūd, mainot lapu. Tāpēc projekti un termiņi ielādējas **vienreiz**, nevis katrā lapā.

`main.tsx` paliek tikai šis:

```tsx
createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
```

No `main.tsx` izdzēsiet `let projects/deadlines/weather`, `render()`, `load()`, `loadProjects()` un pārējās ielādes funkcijas, kā arī `api.ts` importu.

Atslēgu nomainiet uz `campusflow.week07.localProjects`.

---

## 7. `WeatherCard` ielādē pats

Laikapstākļus vajag **tikai** vienai kartītei Dashboard lapā. Tāpēc tā tos ielādē pati:

```tsx
function WeatherCard({ index }: WeatherCardProps) {
  const { state: weather } = useFetch(fetchWeather);
  // ... loading / error / success — kā līdz šim
}
```

No `WeatherCardProps` izņemiet `weather`, no `DashboardPage` — `weather` prop.

Tas nozīmē: laikapstākļi ielādējas **katru reizi, kad atver Dashboard**, un, aizejot no Dashboard, nepabeigts pieprasījums tiek atcelts. Projekti un termiņi — nē, jo tie dzīvo `App`. Kur atrodas `useFetch`, nosaka, **cik bieži** notiek ielāde.

---

## 8. Ritinājums uz augšu

6. nedēļā solījām: mainot lapu, ritinājums palika vietā. Šaurā logā Dashboard apakšā nospiežot *See all*, jaunā lapa atvērās vidū. Labojums `Layout.tsx`:

```tsx
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";

function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  // ... return kā līdz šim
}
```

- Atkarība ir `pathname`: efekts palaižas, kad mainās **adrese**, nevis katrā zīmēšanā;
- `"instant"` tāpēc, ka `index.css` ir `scroll-behavior: smooth`. Ar `window.scrollTo(0, 0)` lapa uz augšu **aizbrauc** (īsa animācija), ar `"instant"` — uzreiz ir augšā;
- *Open resources* (`#resources`) joprojām ritina uz leju: adrese mainās tikai aiz `#`, `pathname` paliek `/`.

---

## 9. Izmēģiniet un pierakstiet, ko redzat (vajadzēs refleksijā)

Katru izmēģinājumu pēc tam **atjaunojiet**. DevTools → *Network*, filtrs **Fetch/XHR**, **Preserve log** ieslēgts.

1. **Divi pieprasījumi dev režīmā.** `useFetch` efektā pirmajā rindā ielieciet `console.log("effect start");`, tīrīšanu pārrakstiet par `return () => { console.log("cleanup"); controller.abort(); };`. Pārlādējiet `/deadlines`. Ko rāda konsole? Cik `deadlines.json` ir *Network* sarakstā, un kāds ir pirmā statuss? Tad palaidiet `npm run build` un `npm run preview` un atveriet to pašu lapu tur. Cik pieprasījumu tagad?
2. **Bez atkarību masīva.** `useFetch` izdzēsiet `, [fetcher, attempt]` (paliek `});`). Pārlādējiet `/deadlines` un paskatieties uz lapu, uz konsoli un uz *Network* sarakstu. Ko saka `npm run lint`?
3. **Funkcija komponentes iekšā.** Atjaunojiet masīvu. `App.tsx` aizstājiet `useFetch(fetchProjects)` ar `useFetch((signal: AbortSignal) => fetchProjects(signal))`. Pārlādējiet `/projects`. Ko rāda *Network*? Ko saka `npm run build` un `npm run lint`?
4. **Aiziet, kamēr ielādējas.** `api.ts` funkcijas `fetchWeather` pirmajā rindā ielieciet `await new Promise((resolve) => setTimeout(resolve, 3000));`. Atveriet `/`, un, kamēr kartītē ir *Loading weather…*, aizejiet uz *Projects*. Pagaidiet 5 sekundes. Vai *Network* parādījās `forecast`? Vai konsolē ir kļūda? Atgriezieties uz Dashboard — ko redzat?

---

## 10. Pārbaude

6. nedēļas pārbaudes (TASK 10. sadaļa) jāiztur arī tagad. Tīra konsole.

Jaunas pārbaudes:

1. **Dev režīmā** (`npm run dev`), atverot `/`: `projects.json`, `deadlines.json` un `forecast` — katrs **divreiz**, pirmais ar statusu *(canceled)*. Tā strādā `StrictMode` — tā nav kļūda.
2. **Preview režīmā** (`npm run build`, tad `npm run preview`): katrs **vienreiz**.
3. **Pāreja starp lapām:** klikšķinot pa izvēlni, `projects.json` un `deadlines.json` **neparādās** vēlreiz; `forecast` parādās katru reizi, kad atverat Dashboard.
4. **Aiziet, kamēr ielādējas** (9. sadaļas 4. izmēģinājums): pēc atgriešanās kartīte rāda *Loading weather…*, tad laikapstākļus. Konsolē nav kļūdu, nekur neparādās *Weather unavailable*.
5. **Try again:** DevTools → *Network* → bloķējiet `deadlines.json`, pārlādējiet `/` → kļūda. Atbloķējiet, spiediet *Try again* → *Loading deadlines…* → saraksts. Vēlreiz ielādējas **tikai** `deadlines.json`.
6. **Tieša adrese ielādes laikā:** ar `setTimeout` funkcijā `fetchProjects` lapā `/projects/p1` vispirms *Loading project…*, **nekad** *Project not found* (kā 6. nedēļā).
7. **Ritinājums:** šaurā logā (390 px) Dashboard apakšā *See all* → `/deadlines` atveras **no augšas**. Tāpat *Open project* no `/projects` apakšas.
8. **Enkurs joprojām strādā:** Dashboard *Open resources* ritina uz leju līdz *Useful links*.
9. **`main.tsx`:** viens `root.render`, nav `api.ts` importa, nav `let` stāvokļu.
10. **`npm run lint`** — bez brīdinājumiem.

---

## 11. Mākslīgā intelekta izmantošana

Mācīšanās un praktiskā darba laikā mākslīgā intelekta izmantošana ir atļauta.

Aizpildiet `AI_USAGE.md` pirms darba iesniegšanas.

Nav nepieciešams pievienot pilnas sarakstes ar mākslīgā intelekta rīkiem.

Ņemiet vērā, ko MI rīki šai tēmai bieži piedāvā — un ko tas dara (viss pārbaudīts ar šo projektu):

- **`useEffect(async () => { ... })`.** `tsc`: *TS2345: Argument of type '() => Promise&lt;void&gt;' is not assignable to parameter of type 'EffectCallback'.* Linteris: *Effect callbacks are synchronous to prevent race conditions.* Async funkcija jāliek **efekta iekšā** (5. sadaļa);
- **efekts bez atkarību masīva.** Lapa izskatās **normāla**, konsole **klusē**, bet *Network* sarakstā — simtiem pieprasījumu sekundē (mērīts: vairāk nekā 1000 trīs sekundēs). Efekts maina stāvokli → React pārzīmē → efekts palaižas atkal;
- **`fetcher` kā funkcija komponentes iekšā** (`useFetch((signal) => fetchProjects(signal))`) — tieši tas pats: katrā zīmēšanā jauna funkcija → atkarība mainījusies → jauna ielāde. **`tsc` un `npm run lint` klusē.** Tāpēc `useFetch` iedodiet funkciju no `api.ts`;
- **trūkstoša atkarība** — `npm run lint`: *react-hooks(exhaustive-deps): React Hook useEffect has a missing dependency: '...'*. Neizslēdziet brīdinājumu ar komentāru — pievienojiet atkarību;
- **efekts bez tīrīšanas** (`return` nav) — lapa strādā, nekas redzami nesalūzt. To atklāj tikai 10. sadaļas 1. pārbaude: dev režīmā abi pieprasījumi aiziet līdz galam, un neviens nav *(canceled)*. Tīrīšana ir vienīgais, kas aptur pieprasījumu, kas vairs nevienam nav vajadzīgs;
- **izslēgt `StrictMode`, lai „pazustu” dubultais pieprasījums.** Nē: tas ir tikai dev režīmā un tieši pārbauda, vai tīrīšana strādā;
- **TanStack Query / SWR / `use()`** — labi rīki, bet šonedēļ mērķis ir saprast, ko tie dara iekšā. Neinstalējiet.

---

## 12. Papildu uzdevumi (izvēles)

Ja pamata darbs pabeigts, izvēlieties vismaz vienu:

- **Escape aizver izvēlni.** `Header.tsx` (`useEffect` atļauts arī šeit). Klausītājs ir `window`, kas ir ārpus React, tāpēc tīrīšanā tas **jānoņem**:
  ```tsx
  useEffect(() => {
    if (!isMenuOpen) return;
    function handleKey(event: KeyboardEvent): void {
      if (event.key === "Escape") setIsMenuOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isMenuOpen]);
  ```
  Pārbaudiet šaurā logā: atveriet izvēlni, nospiediet **Esc** → aizveras.
- **Laikapstākļi atjaunojas paši.** `useFetch` pieņem neobligātu `refreshMs?: number` un ar otru efektu ik pēc `refreshMs` palielina `attempt`:
  ```ts
  useEffect(() => {
    if (refreshMs === undefined) return;
    const id = window.setInterval(() => setAttempt((current) => current + 1), refreshMs);
    return () => window.clearInterval(id);
  }, [refreshMs]);
  ```
  `WeatherCard`: `useFetch(fetchWeather, 10 * 60 * 1000)`. Pārbaudei uz brīdi ielieciet `1000`: *Network* ik sekundi jauns `forecast`, kartīte nemirgo (stāvoklis paliek `success`, līdz atnāk jaunie dati). Aizejot no Dashboard, pieprasījumi **apstājas** — to izdara `clearInterval` tīrīšanā.

---

## 13. Darba iesniegšana

Gala versiju augšupielādējiet GitHub.

Iesniedziet:

- GitHub repozitorija saiti;
- pilnu projekta pirmkodu mapē `week07-react-data`;
- Git izmaiņu vēsturi;
- aizpildītu `AI_USAGE.md`;
- aizpildītu `REFLECTION.md`.

Pirms iesniegšanas pārbaudiet, ka:

- `npm install` izpildās bez kļūdām;
- **`npm run build` izpildās bez kļūdām**;
- **`npm run lint` neparāda brīdinājumus**;
- `useEffect` ir tikai `useFetch.ts` un `Layout.tsx` (un papildu uzdevumu vietās);
- `main.tsx` ir viens `root.render` un nav datu ielādes;
- kodā nav `any`, `@ts-ignore`, `as` API, `localStorage` vai adreses datiem, `querySelector`, `innerHTML`, `dangerouslySetInnerHTML`, `<a href="/...">` pārejām;
- `src/types.ts`, `src/guards.ts` nav mainīti; `src/api.ts` mainīts tikai ar `signal` (izmēģinājumu `setTimeout` izdzēsts);
- visas 6. nedēļas un 10 jaunās pārbaudes (10. sadaļa) ir izietas;
- lapa izskatās tāpat kā 6. nedēļā, arī šaurā logā.
