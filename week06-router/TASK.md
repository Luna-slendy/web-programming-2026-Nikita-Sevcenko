# 6. nedēļas praktiskais uzdevums — CampusFlow: maršrutēšana un lietotnes struktūra

## Mērķis

Sadalīt **CampusFlow** vienu garo lapu atsevišķās lapās ar īstām adresēm:

| Adrese | Lapa |
|---|---|
| `/` | Dashboard: Hero, statistika, 3 tuvākie termiņi, Resources |
| `/projects` | Visi projekti, filtrs, forma *Add a project* |
| `/projects/p1` | Viena projekta detaļas — projekta id ir adresē |
| `/deadlines` | Visi termiņi |
| jebkura cita | 404 lapa |

Galvene un kājene ir **kopīgas** visām lapām. Pāreja starp lapām notiek **bez lapas pārlādes**. API dati joprojām ienāk caur props no `main.tsx`, pievienotie projekti joprojām glabājas `App` stāvoklī un `localStorage`.

Vizuālajam noformējumam jāpaliek tādam pašam kā 5. nedēļā.

Mācīšanās un praktiskā darba laikā ir atļauts izmantot:

- oficiālo dokumentāciju ([reactrouter.com](https://reactrouter.com/start/declarative/routing) — sadaļa **Declarative**);
- meklētājprogrammas;
- pamācības;
- mākslīgā intelekta rīkus.

Individuālā refleksija jāizpilda **patstāvīgi, neizmantojot mākslīgā intelekta rīkus**.

---

## 0. Pirms sākat

Ja 5. nedēļas uzdevums (`week05-state`) vēl nav pabeigts — **vispirms pabeidziet to**. Šis uzdevums balstās uz tā rezultātu.

Nepieciešama **Node.js 20.19+ vai 22.12+** (`node -v`).

---

## 1. Jaunā mape `week06-router`

1. Repozitorija saknē nokopējiet mapi `week05-state` un nosauciet kopiju `week06-router`.
2. Kopijā **izdzēsiet** mapes `node_modules` un `dist` (ja tās ir).
3. `package.json` laukā `"name"` ierakstiet `"week06-router"`.
4. Mapē `week06-router` palaidiet:

```bash
npm install
npm install react-router
npm run dev
```

Pārliecinieties, ka lapa strādā tāpat kā 5. nedēļā.

**Pakotnes nosaukums ir `react-router`, nevis `react-router-dom`** (sk. 11. sadaļu).

Ja Node ir vecāks par 22.22, `npm install` parādīs *npm warn EBADENGINE Unsupported engine ... react-router@8.5.1*. Tas ir **brīdinājums, nevis kļūda**: React Router 8 oficiāli prasa Node 22.22+, bet šim uzdevumam pārbaudīts, ka viss strādā arī ar Node 20.19 un 22.12.

5. Atjaunojiet datumus `public/api/*.json`, lai termiņi ir nākotnē.
6. `deadlines.json` pievienojiet vēl **divus** termiņus (kopā 5) — tie būs vajadzīgi 6. sadaļā.

---

## 2. Git kontrolpunkti

### Obligātie minimālie kontrolpunkti

1. `Create week06-router from week05-state`
2. `Add React Router and a shared Layout`
3. `Split the dashboard into pages`
4. `Add project details with a URL parameter`
5. `Add the 404 page and connect all links`

Commit ziņojumiem nav obligāti precīzi jāsakrīt ar šiem piemēriem, taču katram kontrolpunktam jāatspoguļo būtisks paveiktā darba posms.

Nav pieļaujams viss darbs vienā noslēguma commit.

---

## 3. Noteikumi šim uzdevumam

Paliek spēkā iepriekšējo nedēļu noteikumi — **aizliegts**:

- `any`, `// @ts-ignore`, `// @ts-expect-error`;
- `as` API datiem, `localStorage` datiem **un adreses parametriem**;
- izslēgt `strict` vai citus `tsconfig` iestatījumus;
- izsaukt `fetch` ārpus `src/api.ts`, `localStorage` ārpus `src/hooks/useLocalStorage.ts`;
- `document.querySelector`, `createElement`, `innerHTML`, `dangerouslySetInnerHTML`;
- mainīt stāvokli uz vietas;
- **`useEffect`** — tas būs 7. nedēļā.

Šonedēļ klāt nāk:

- pāreja uz citu CampusFlow lapu notiek **tikai** ar `Link` vai `NavLink`, nevis `<a href="/...">`;
- dati lapām ienāk **caur props no `App`**. `createBrowserRouter`, `loader`, `useLoaderData` šonedēļ nelietojam;
- `src/types.ts`, `src/api.ts` un `src/guards.ts` paliek tādi paši kā `week05-state`.

Pārbaude — tās pašas **divas** komandas:

```bash
npm run build
npm run lint
```

---

## 4. Maršruti un kopīgais rāmis

### 4.1. `BrowserRouter`

`src/main.tsx` funkcijā `render()` aptiniet `App`:

```tsx
import { BrowserRouter } from "react-router";

<StrictMode>
  <BrowserRouter>
    <App ... />
  </BrowserRouter>
</StrictMode>
```

Pārējais `main.tsx` nemainās. Kad ielādējas, piemēram, laikapstākļi, `main.tsx` atkal izsauc `root.render(...)` — bet aktīvā lapa un formā ierakstītais teksts **paliek**.

### 4.2. `Layout` un `Outlet`

Izveidojiet `src/components/Layout.tsx`. Tajā pāriet `Header` un `Footer`, kas līdz šim bija `App`:

```tsx
import { Outlet } from "react-router";

function Layout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header userName="Alex Student" userInitials="AZ" course="Web Programming" />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer note="Week 6 — Routing" />
    </div>
  );
}
```

`<Outlet />` ir vieta, kurā parādās aktīvā lapa. `flex-1` tur kājeni ekrāna apakšā arī īsā lapā.

### 4.3. Maršruti `App.tsx`

Izveidojiet mapi `src/pages/`. `App` vairs nezīmē sadaļas pats. Tas glabā `localProjects` kā līdz šim un atgriež maršrutus:

```tsx
import { Route, Routes } from "react-router";

return (
  <Routes>
    <Route element={<Layout />}>
      <Route index element={<DashboardPage ... />} />
      <Route path="projects" element={<ProjectsPage ... />} />
      <Route path="projects/:projectId" element={<ProjectDetailsPage ... />} />
      <Route path="deadlines" element={<DeadlinesPage ... />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);
```

- maršruts **bez `path`** ir kopīgais rāmis: tas neko nepievieno adresei;
- **`index`** ir lapa vecāka adresē, šeit `/`;
- **`:projectId`** ir mainīga adreses daļa;
- **`*`** ir viss pārējais.

Pagaidām lapas var būt vienkārši `<h1>` — pārliecinieties, ka adreses strādā, un commit. Saturs nāk 6. sadaļā.

Atslēgu nomainiet uz `campusflow.week06.localProjects`.

---

## 5. Saites

### 5.1. `NavLink` galvenē

`Header.tsx` izvēlnē paliek **trīs** saites: *Dashboard* (`/`), *Projects* (`/projects`), *Deadlines* (`/deadlines`). `Resources` no izvēlnes izņemiet — tas paliek Dashboard lapā.

`NavItem` laukā `href` kļūst par `to`. Iepriekš aktīvo saiti noteica `index === 0`. `NavLink` to zina pats, un `className` var būt **funkcija**:

```tsx
function navClass({ isActive }: { isActive: boolean }): string {
  return `${navLink} ${isActive ? "bg-[#f1f3f8] text-ink" : "text-muted transition hover:bg-[#f1f3f8] hover:text-ink"}`;
}

<NavLink key={item.label} className={navClass} to={item.to} onClick={closeMenu}>
  {item.label}
</NavLink>
```

*Projects* jābūt izceltam arī lapā `/projects/p1`. Tā tas ir pēc noklusējuma. Ja saitei pievienosiet `end`, tā būs aktīva tikai precīzi `/projects`.

**Mobilā izvēlne.** `Header` tagad dzīvo `Layout`, un, mainoties lapai, tas **nepazūd** — tāpēc izvēlne pati neaizvērsies. `closeMenu` ir funkcija, kas izsauc `setIsMenuOpen(false)`. Pievienojiet to arī logotipa saitei.

### 5.2. Pārējās saites

| Kur | Bija | Tagad |
|---|---|---|
| Logotips | `href="#"` | `<Link to="/">` |
| Hero *View projects* | `href="#projects"` | `<Link to="/projects">` |
| Hero *Open resources* | `href="#resources"` | **paliek** `<a href="#resources">` — tas ir enkurs tajā pašā lapā |
| `ProjectCard` *Open project* / *View submission* | `href="#"` | ``<Link to={`/projects/${project.id}`}>`` |
| `DeadlineSection` *See all* | `href="#"` | `<Link to="/deadlines">` |

Ceļi sākas ar `/`. Bez tā saite ir **relatīva**: ``to={`projects/${project.id}`}`` lapā `/projects` aizved uz `/projects/projects/p1`.

---

## 6. Lapas

Katra lapa ir komponente mapē `src/pages/`, kas datus saņem caur props no `App`. `withLocalProjects(...)` rezultātu saņem visas lapas, kurām vajag projektus.

- **`DashboardPage`** — `Hero`, *Your workspace* ar četrām kartītēm (`activeCountText` pārceļas šeit), `DeadlineSection` ar `limit={3}`, `Resources`.
- **`ProjectsPage`** — `ProjectSection`, tāpat kā līdz šim.
- **`DeadlinesPage`** — `DeadlineSection` bez `limit`.

`DeadlineSection` saņem neobligātu `limit?: number`:

- ar `limit`: virsraksts *Coming up*, redzama saite *See all*, sakārtotajam sarakstam `slice(0, limit)`;
- bez `limit`: virsraksts *All deadlines*, nav saites *See all*, redzami visi.

---

## 7. Projekta detaļas

`src/pages/ProjectDetailsPage.tsx` saņem `projects: LoadState<Project[]>` un `onRetry`. Kuru projektu rādīt, pasaka **adrese**:

```tsx
import { useParams } from "react-router";

const { projectId } = useParams();
```

Nosaukumam jāsakrīt ar `:projectId` maršrutā. `projectId` tips ir `string | undefined`: TypeScript nezina, kurā maršrutā komponente izmantota. Salīdzināšanai ar `===` tas netraucē, bet funkcijai, kas prasa `string`, tas dod *TS2345: Argument of type 'string | undefined' is not assignable to parameter of type 'string'*. Arī `useParams<{ projectId: string }>()` tipu **nesašaurina** — lauks joprojām var būt `undefined`.

Lapas augšā ir saite `← All projects` (`<Link to="/projects">`). Zem tās — **precīzi šādā secībā**:

1. `loading` → `<LoadingBox text="Loading project…" />`;
2. `error` → `<ErrorBox message={...} onRetry={onRetry} />`;
3. `projects.data.find(...)`: `undefined` → `<EmptyBox title="Project not found" text={...} />`, tekstā norādot meklēto id;
4. citādi — detaļas: kategorija, statuss, nosaukums (`<h1>`), apraksts, termiņa teksts, progress josla.

`find` atgriež `Project | undefined`. Bez pārbaudes `project.title` dod *TS18048: 'project' is possibly 'undefined'*.

Termiņa teksts: pabeigtam projektam `Submitted Sep 28`, pārējiem `Due Nov 13 — in 11 days` (`formatDate` + `daysUntil` no `format.ts`). Ja termiņš pagājis: `Overdue since ...`.

Krāsu objektus `categoryBadge`, `progressColor`, `statusLabel` tagad vajag arī šeit. Pārceliet tos uz `src/projectStyles.ts`. Ja tos eksportēsiet tieši no `ProjectCard.tsx`, `npm run lint` brīdinās: *Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components.*

---

## 8. 404 lapa

`NotFoundPage`: virsraksts *Page not found*, teksts ar nepareizo adresi, saite atpakaļ uz `/`.

```tsx
import { useLocation } from "react-router";

const { pathname } = useLocation();
```

Lapa ir `Layout` iekšā, tāpēc galvene un kājene ir redzamas.

---

## 9. Izmēģiniet un pierakstiet, ko redzat (vajadzēs refleksijā)

Katru izmēģinājumu pēc tam **atjaunojiet**.

1. **`<a>` pret `Link`.** Atveriet DevTools → *Network*, ieslēdziet *Preserve log*. Lapā `/projects` *Title* laukā ierakstiet tekstu un paskatieties, cik pieprasījumu ir sarakstā. Noklikšķiniet *Deadlines* un atgriezieties ar *Projects*. Tagad `NavLink` galvenē uz brīdi aizstājiet ar `<a key={item.label} className={navLink} href={item.to}>{item.label}</a>` un atkārtojiet. Kas notiek ar pieprasījumu skaitu? Kas — ar ierakstīto tekstu?
2. **Kas pazūd, mainot lapu.** Lapā `/projects` pievienojiet projektu. Ieslēdziet filtru **Done**, *Title* laukā ierakstiet tekstu. Aizejiet uz *Deadlines* un ar pārlūka pogu **Atpakaļ** atgriezieties. Kas ir ar filtru? Ar tekstu? Ar pievienoto projektu?
3. **Secība detaļu lapā.** `src/api.ts` funkcijas `fetchProjects` pirmajā rindā uz brīdi ierakstiet `await new Promise((resolve) => setTimeout(resolve, 3000));` un pārlādējiet `/projects/p1`. Ko redzat pirmās trīs sekundes? Tagad `ProjectDetailsPage` izdzēsiet `loading` un `error` pārbaudes, un `find` rindu aizstājiet ar:
   ```tsx
   const project = projects.status === "success" ? projects.data.find((item) => item.id === projectId) : undefined;
   ```
   Pārlādējiet vēlreiz. Ko lietotājs redz tagad?

---

## 10. Pārbaude

5. nedēļas pārbaudes (TASK 9. sadaļa) jāiztur arī tagad — tās tagad veicamas lapā `/projects`. Tīra konsole.

Jaunas pārbaudes:

1. **Tieša adrese:** ierakstiet adreses joslā `/projects`, `/deadlines`, `/projects/p1` un pārlādējiet (F5) → katru reizi atveras pareizā lapa.
2. **Bez pārlādes:** *Network* cilnē, klikšķinot pa izvēlni, **nav** jaunu `projects.json`, `deadlines.json` un laikapstākļu pieprasījumu.
3. **Atpakaļ / uz priekšu:** pārlūka pogas strādā starp visām lapām.
4. **Aktīvā saite:** izcelta tieši viena — *Dashboard* lapā `/`, *Projects* lapās `/projects` un `/projects/p1`, *Deadlines* lapā `/deadlines`. 404 lapā — neviena.
5. **Dashboard:** redzami 3 tuvākie termiņi; *See all* → `/deadlines`, redzami visi 5.
6. **Detaļas:** *Open project* kartītē → pareizais projekts, *← All projects* → atpakaļ.
7. **Nezināms id:** `/projects/nav-tada` → *Project not found* ar šo id.
8. **Ielāde:** ar 9. sadaļas 3. izmēģinājuma `setTimeout` lapā `/projects/p1` redzams *Loading project…*, **nekad** *Project not found*.
9. **Kļūda:** DevTools → *Network* → bloķējiet `projects.json`, pārlādējiet `/projects/p1` → kļūda un *Try again*, nevis *Project not found*.
10. **Pašu projekts:** pievienojiet projektu, atveriet tā detaļas, pārlādējiet → detaļas joprojām redzamas (adresē ir tā id).
11. **Dashboard skaitītājs:** pēc pievienošanas *Active projects* lapā `/` ir par 1 lielāks.
12. **404:** `/kaut-kas/cits` → 404 lapa ar galveni un kājeni, saite atpakaļ strādā.
13. **Teksts paliek teksts:** `/projects/<img src=x onerror=alert(1)>` → šie simboli redzami kā teksts.
14. **Šaurā logā (390 px):** izvēlne atveras, pēc klikšķa uz saites aizveras, nav horizontālas ritjoslas nevienā lapā.
15. **`main.tsx` zīmē atkārtoti:** ar `setTimeout` funkcijā `fetchWeather` lapā `/projects` sāciet rakstīt *Title* laukā. Kad laikapstākļi ielādējas, lapa nemainās un teksts paliek.

**Zināms trūkums, kuru šonedēļ nelabojam.** Mainot lapu, ritinājuma pozīcija paliek: šaurā logā, nospiežot *See all* Dashboard apakšā, jaunā lapa neatveras no augšas. To labo ar `useEffect` — 7. nedēļā.

---

## 11. Mākslīgā intelekta izmantošana

Mācīšanās un praktiskā darba laikā mākslīgā intelekta izmantošana ir atļauta.

Aizpildiet `AI_USAGE.md` pirms darba iesniegšanas.

Nav nepieciešams pievienot pilnas sarakstes ar mākslīgā intelekta rīkiem.

Ņemiet vērā, ko MI rīki šai tēmai gandrīz vienmēr piedāvā — un kāpēc šonedēļ to **nedrīkst**:

- **`react-router-dom`.** Tā ir vecā pakotne. Ja to uzinstalē līdzās `react-router`, projektā ir **divas** bibliotēkas versijas (7.18 un 8.5). Ja `BrowserRouter` importēts no vienas, bet `Routes` no otras, `npm run build` **klusē**, bet lapa ir tukša, un konsolē ir *useRoutes() may be used only in the context of a &lt;Router&gt; component* — lai gan `BrowserRouter` tur ir. Visu importējiet no `react-router`;
- `createBrowserRouter` + `loader` — cits darba režīms, mūsu dati ienāk caur props (3. sadaļa);
- `Switch`, `useHistory` — no ļoti vecām versijām: *TS2305: Module '"react-router"' has no exported member 'Switch'*;
- `useEffect`, lai reaģētu uz adreses maiņu (3. sadaļa);
- `projectId as string` (3. sadaļa — šeit tas nav vajadzīgs vispār).

---

## 12. Papildu uzdevumi (izvēles)

Ja pamata darbs pabeigts, izvēlieties vismaz vienu:

- **Lapas virsraksts.** React 19 ļauj ierakstīt `<title>` jebkurā komponentē, un tas nonāk `<head>`. Katrai lapai savs nosaukums. Detaļu lapā izmantojiet **vienu** teksta virkni:
  ```tsx
  <title>{`${project.title} · CampusFlow`}</title>
  ```
  `<title>{project.title} · CampusFlow</title>` ir vairāki bērni, un cilnes nosaukums paliek **tukšs** — bez jebkādas kļūdas.
- **Filtrs adresē.** Filtrs pazūd, mainot lapu (9. sadaļas 2. izmēģinājums). Pārceliet to no `useState` uz adresi, `/projects?status=done`:
  ```tsx
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get("status");
  const filter: ProjectFilter = status === "active" || status === "done" ? status : "all";

  function setFilter(next: ProjectFilter): void {
    setSearchParams(next === "all" ? {} : { status: next });
  }
  ```
  Pārbaudiet: pēc *Deadlines* → **Atpakaļ** filtrs ir vietā, un adresi var iedot citam.
- **Pēc pievienošanas uz detaļām.** `ProjectSection` funkcijā `handleAdd` pēc `onAdd(project)` izsauciet ``navigate(`/projects/${project.id}`)`` (`const navigate = useNavigate();`). `useNavigate` ir domāts tieši tam, kad pāreju izraisa nevis saite, bet darbības rezultāts.

---

## 13. Darba iesniegšana

Gala versiju augšupielādējiet GitHub.

Iesniedziet:

- GitHub repozitorija saiti;
- pilnu projekta pirmkodu mapē `week06-router`;
- Git izmaiņu vēsturi;
- aizpildītu `AI_USAGE.md`;
- aizpildītu `REFLECTION.md`.

Pirms iesniegšanas pārbaudiet, ka:

- `npm install` izpildās bez kļūdām;
- **`npm run build` izpildās bez kļūdām**;
- **`npm run lint` neparāda brīdinājumus**;
- `package.json` ir `react-router` un **nav** `react-router-dom`;
- kodā nav `any`, `@ts-ignore`, `as` API, `localStorage` vai adreses datiem, `useEffect`, `querySelector`, `innerHTML`, `dangerouslySetInnerHTML`, `createBrowserRouter`;
- pārejām uz citu CampusFlow lapu nekur nav `<a href="/...">`;
- `src/types.ts`, `src/api.ts`, `src/guards.ts` nav mainīti (izmēģinājumu `setTimeout` izdzēsts);
- visas 5. nedēļas un 15 jaunās pārbaudes (10. sadaļa) ir izietas;
- lapa izskatās tāpat kā 5. nedēļā, arī šaurā logā.
