# 2. nedēļas praktiskais uzdevums — CampusFlow ar TypeScript

## Mērķis

Pārveidot **CampusFlow** no statiskas lapas par **datu vadītu** lapu, izmantojot **TypeScript**:

- projekti un termiņi tiek glabāti tipizētos datos, nevis ierakstīti HTML;
- lapas saturs tiek ģenerēts no šiem datiem;
- lietotājs var pievienot jaunu projektu caur formu;
- pievienotie projekti saglabājas pēc lapas pārlādes.

Vizuālajam noformējumam jāpaliek tādam pašam kā jūsu 1. nedēļas Tailwind versijā.

Mācīšanās un praktiskā darba laikā ir atļauts izmantot:

- oficiālo dokumentāciju;
- meklētājprogrammas;
- pamācības;
- mākslīgā intelekta rīkus.

Noslēguma tests un individuālā refleksija jāizpilda **patstāvīgi, neizmantojot mākslīgā intelekta rīkus**.

---

## 0. Pirms sākat

Ja 1. nedēļas uzdevums (`week01-tailwind`) vēl nav pabeigts — **vispirms pabeidziet to**. Šis uzdevums balstās uz tā rezultātu.

Pārbaudiet Node.js versiju:

```bash
node -v
```

Nepieciešama **Node.js 20.19+ vai 22.12+** (ieteicams jaunākais LTS). Ar vecāku versiju Vite projekts neuzbūvēsies (`npm run build` beigsies ar kļūdu).

---

## 1. Vite projekta izveide

Repozitorija saknē izveidojiet jaunu Vite projektu mapē `week02-typescript` un izvēlieties:

- **Framework:** Vanilla
- **Variant:** TypeScript

Instalējiet atkarības, Tailwind CSS un Vite spraudni — tāpat kā 1. nedēļā:

```bash
npm install
npm install tailwindcss @tailwindcss/vite
```

Konfigurējiet Tailwind CSS (`vite.config.ts` + `@import "tailwindcss";` CSS failā).

Izdzēsiet Vite parauga saturu (`counter.ts`, parauga attēlus un parauga HTML `main.ts` failā) un pārnesiet savu 1. nedēļas lapu:

- HTML → `index.html`;
- savus individuālos CSS stilus / `@theme` iestatījumus → `src/style.css`.

Pārliecinieties, ka lapa izskatās tāpat kā 1. nedēļā.

Šajā uzdevumā **nedrīkst izmantot Tailwind CSS caur CDN**.

---

## 2. Git kontrolpunkti

### Obligātie minimālie kontrolpunkti

1. `Set up Vite, TypeScript and Tailwind`
2. `Add types and project data`
3. `Render projects and deadlines from data`
4. `Add typed filters and navigation`
5. `Add project form with validation and localStorage`

Commit ziņojumiem nav obligāti precīzi jāsakrīt ar šiem piemēriem, taču katram kontrolpunktam jāatspoguļo būtisks paveiktā darba posms.

Nav pieļaujams viss darbs vienā noslēguma commit.

---

## 3. TypeScript noteikumi šim uzdevumam

Vite TypeScript projektā **stingrais režīms (strict) jau ir ieslēgts**. Tas nozīmē, ka TypeScript neļaus, piemēram, izmantot elementu, kas varētu būt `null`.

Visā darbā **aizliegts**:

- `any`;
- `// @ts-ignore` un `// @ts-expect-error`;
- izslēgt `strict` vai citus `tsconfig.json` iestatījumus.

`enum` šajā projektā nedarbosies (`erasableSyntaxOnly`). Tā vietā izmantojiet **union tipus**, piemēram:

```ts
type ProjectStatus = "active" | "done";
```

Kļūdu pārbaude:

```bash
npm run build
```

`npm run dev` rāda lapu **pat tad, ja kodā ir tipu kļūdas**. Tipus pārbauda tikai `npm run build` (tas palaiž `tsc`). Palaidiet to regulāri.

---

## 4. Tipi un dati

Izveidojiet failu `src/types.ts` un aprakstiet tajā vismaz:

- `ProjectStatus` — `"active"` vai `"done"`;
- `Category` — projektu kategorijas (vismaz `"Frontend"`, `"API"`, `"JavaScript"` + viena jūsu izvēlēta);
- `Project` — `interface` ar laukiem: `id`, `title`, `description`, `category`, `status`, `dueDate`, `progress`;
- `Deadline` — `interface` termiņam (nosaukums, kurss, datums, laiks).

Izveidojiet failu `src/data.ts` ar sākotnējiem datiem — tiem pašiem 3 projektiem un 3 termiņiem, kas bija HTML.

Datumus glabājiet formātā `YYYY-MM-DD` (piemēram, `"2026-09-28"`).

---

## 5. Lapas ģenerēšana no datiem

No `index.html` **izdzēsiet** ierakstītās projektu kartītes un termiņu rindas. Atstājiet tikai tukšus konteinerus (piemēram, `<div id="projectGrid">`).

Izveidojiet funkcijas (ieteicams failā `src/render.ts`), kas no datiem izveido HTML:

- `renderProjects(...)` — projektu kartītes;
- `renderDeadlines(...)` — termiņu saraksts.

Prasības:

- katrai funkcijai ir norādīti parametru tipi un atgriežamās vērtības tips;
- kartītēm jāizskatās tāpat kā 1. nedēļā (tās pašas Tailwind klases);
- kategorijas krāsai izmantojiet `Record<Category, string>` — objektu, kurā katrai kategorijai ir sava Tailwind klase. Ja pievienojat jaunu kategoriju un aizmirstat tai krāsu, TypeScript to pamanīs;
- projektu kartīšu izkārtojums paliek 1 / 2 / 3 kolonnas.

### Drošība

Lietotāja ievadīto tekstu (projekta nosaukumu, aprakstu) **nedrīkst ievietot lapā ar `innerHTML`**. Izmantojiet `document.createElement(...)` un `textContent`.

Pārbaudiet: pievienojiet projektu ar nosaukumu `<b>test</b>`. Kartītē jābūt redzamam tekstam `<b>test</b>`, nevis treknam vārdam "test".

---

## 6. Filtri un navigācija TypeScript

Pārrakstiet 1. nedēļas `app.js` funkcionalitāti TypeScript:

- mobilā navigācija (atvērt/aizvērt, `aria-expanded`);
- projektu filtri *All / Active / Done*.

Prasības:

- filtra vērtībai izmantojiet tipu `type ProjectFilter = ProjectStatus | "all"`;
- filtrēšana notiek **datos** (masīva `filter`) un pēc tam lapa tiek uzzīmēta no jauna — nevis slēpjot HTML elementus;
- katram `querySelector` rezultātam jāapstrādā gadījums, kad elements netiek atrasts (`null`).

---

## 7. Jauna projekta pievienošana

Pievienojiet lapai formu *"Add a project"* ar laukiem:

- nosaukums;
- apraksts;
- kategorija (`select`);
- termiņš (`date`);
- progress (0–100 %).

### 7.1. Validācija

Pirms projekta pievienošanas pārbaudiet:

- nosaukums — vismaz 3 simboli;
- apraksts — vismaz 10 simboli;
- kategorija — izvēlēta;
- termiņš — norādīts;
- progress — vesels skaitlis no 0 līdz 100.

Kļūdas paziņojumam jābūt redzamam **pie attiecīgā lauka**. Nederīgs projekts netiek pievienots.

### 7.2. Pievienošana

Derīgs projekts:

- saņem unikālu `id` (piemēram, `crypto.randomUUID()` — darbojas uz `localhost`, bet ne tad, ja lapu atverat caur tīkla IP adresi, piem., telefonā);
- saņem statusu `"done"`, ja progress ir 100, citādi `"active"`;
- uzreiz parādās projektu sarakstā;
- formas lauki tiek notīrīti.

### 7.3. Saglabāšana (localStorage)

- Projektu saraksts tiek saglabāts `localStorage`.
- Pēc lapas pārlādes pievienotie projekti joprojām ir redzami.
- Ja `localStorage` datu nav vai tie ir bojāti, lapa **nesalūzt**, bet izmanto sākotnējos datus no `data.ts` (`JSON.parse` ietiniet `try/catch`).

Pārbaude: DevTools → *Application* → *Local Storage* → ierakstiet vērtībā nejēdzību un pārlādējiet lapu.

---

## 8. Papildu uzdevumi (izvēles)

Ja pamata darbs pabeigts, izvēlieties vismaz vienu:

- statistikas kartīte *Active projects* rāda skaitu, kas **aprēķināts no datiem**;
- termiņu nozīmīte (*2 days*, *Overdue*) tiek aprēķināta no datuma, nevis ierakstīta;
- tukšā stāvokļa paziņojums, ja filtrā nav neviena projekta (var izmantot 1. nedēļas komponentu);
- poga projekta dzēšanai;
- `localStorage` datu pārbaude ar **type guard** funkciju (`function isProject(value: unknown): value is Project`).

---

## 9. Mākslīgā intelekta izmantošana

Mācīšanās un praktiskā darba laikā mākslīgā intelekta izmantošana ir atļauta.

Aizpildiet `AI_USAGE.md` pirms darba iesniegšanas.

Nav nepieciešams pievienot pilnas sarakstes ar mākslīgā intelekta rīkiem.

---

## 10. Darba iesniegšana

Gala versiju augšupielādējiet GitHub.

Iesniedziet:

- GitHub repozitorija saiti;
- pilnu projekta pirmkodu mapē `week02-typescript`;
- Git izmaiņu vēsturi;
- aizpildītu `AI_USAGE.md`;
- aizpildītu `REFLECTION.md`.

Pirms iesniegšanas pārbaudiet, ka:

- `npm install` izpildās bez kļūdām;
- **`npm run build` izpildās bez kļūdām** (neviena TypeScript kļūda);
- kodā nav `any` un `@ts-ignore`;
- projekti un termiņi tiek ģenerēti no datiem;
- filtri un mobilā navigācija darbojas;
- jauns projekts tiek pievienots, validācija darbojas;
- pēc pārlādes pievienotie projekti saglabājas;
- `<b>test</b>` nosaukumā tiek parādīts kā teksts;
- pārlūkprogrammas konsolē nav būtisku kļūdu.
