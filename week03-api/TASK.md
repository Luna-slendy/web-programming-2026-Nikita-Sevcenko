# 3. nedēļas praktiskais uzdevums — CampusFlow: dati no API

## Mērķis

Pārveidot **CampusFlow** tā, lai dati nāk **no API**, nevis ir ierakstīti kodā:

- projekti un termiņi tiek ielādēti ar `fetch` no JSON API;
- atnākušie dati tiek **pārbaudīti** ar type guard funkcijām, pirms lapa tos izmanto;
- lietotājs redz, kas notiek: dati **ielādējas**, ielāde **neizdevās** (ar pogu *Try again*) vai datu **nav**;
- lapā ir pašreizējie laikapstākļi Rīgā no ārēja API (**Open-Meteo**);
- viss darbs ar tīklu ir vienā atsevišķā modulī `src/api.ts`.

Vizuālajam noformējumam jāpaliek tādam pašam kā jūsu 2. nedēļas versijā.

Mācīšanās un praktiskā darba laikā ir atļauts izmantot:

- oficiālo dokumentāciju;
- meklētājprogrammas;
- pamācības;
- mākslīgā intelekta rīkus.

Individuālā refleksija jāizpilda **patstāvīgi, neizmantojot mākslīgā intelekta rīkus**.

---

## 0. Pirms sākat

Ja 2. nedēļas uzdevums (`week02-typescript`) vēl nav pabeigts — **vispirms pabeidziet to**. Šis uzdevums balstās uz tā rezultātu.

Pārbaudiet Node.js versiju:

```bash
node -v
```

Nepieciešama **Node.js 20.19+ vai 22.12+**. Ar vecāku versiju `npm install` var "izdoties", bet `npm run build` beigsies ar kļūdu.

---

## 1. Jaunā mape `week03-api`

Šoreiz projektu **neveidojiet no nulles** — nokopējiet savu 2. nedēļas darbu:

1. Repozitorija saknē nokopējiet mapi `week02-typescript` un nosauciet kopiju `week03-api`.
2. Kopijā **izdzēsiet** mapes `node_modules` un `dist` (ja tās ir).
3. `package.json` laukā `"name"` ierakstiet `"week03-api"`.
4. Mapē `week03-api` palaidiet:

```bash
npm install
npm run dev
```

Pārliecinieties, ka lapa strādā tāpat kā 2. nedēļā.

---

## 2. Git kontrolpunkti

### Obligātie minimālie kontrolpunkti

1. `Copy week02 as week03-api`
2. `Move projects and deadlines to JSON API files`
3. `Add typed API layer with type guards`
4. `Add loading, error and empty states`
5. `Add weather from Open-Meteo`

Commit ziņojumiem nav obligāti precīzi jāsakrīt ar šiem piemēriem, taču katram kontrolpunktam jāatspoguļo būtisks paveiktā darba posms.

Nav pieļaujams viss darbs vienā noslēguma commit.

---

## 3. TypeScript noteikumi šim uzdevumam

Paliek spēkā 2. nedēļas noteikumi — **aizliegts**:

- `any`;
- `// @ts-ignore` un `// @ts-expect-error`;
- izslēgt `strict` vai citus `tsconfig.json` iestatījumus.

Šonedēļ klāt nāk vēl divi:

- API datiem **aizliegts `as`** (piemēram, `data as Project[]`). `as` neko nepārbauda — tas tikai liek TypeScript noticēt. Dati jāpārbauda ar type guard funkciju.
- `response.json()` tipā ir **`Promise<any>`**. Tas nozīmē, ka `any` var ielīst kodā, pat ja jūs to nekad neuzrakstāt — un `npm run build` **neparādīs nevienu kļūdu**. Tāpēc rezultātu vienmēr saglabājiet kā `unknown`:

```ts
const data: unknown = await response.json();
```

Kļūdu pārbaude, tāpat kā iepriekš:

```bash
npm run build
```

---

## 4. Dati kā API

Vite visu, kas atrodas mapē `public/`, pasniedz kā parastus failus. To izmantosim kā vienkāršu API.

1. Izveidojiet mapi `public/api/` un tajā divus failus:
   - `projects.json` — jūsu projektu masīvs;
   - `deadlines.json` — jūsu termiņu masīvs.
2. Pārnesiet datus no `data.ts` uz šiem failiem, tad **izdzēsiet** `src/data.ts`.
3. Pievienojiet `projects.json` **vismaz vienu jaunu projektu** — tā redzēsiet, ka dati tiešām nāk no API.
4. Atjaunojiet datumus, lai tie būtu nākotnē (formāts `YYYY-MM-DD`, kā iepriekš).

Pārbaude: pārlūkā atveriet `http://localhost:5173/api/projects.json` — jāredz jūsu JSON.

JSON nav TypeScript: atslēgām un tekstiem **tikai dubultpēdiņas**, aiz pēdējā elementa **nav komata**, komentāri nav atļauti.

---

## 5. Datu slānis `src/api.ts`

Izveidojiet failu `src/api.ts`. **Tā ir vienīgā vieta lietotnē, kur tiek izsaukts `fetch`.** `main.ts` un `render.ts` paši tīklu neaiztiek.

### 5.1. `getJson`

Uzrakstiet funkciju, ko izmanto visi pārējie pieprasījumi:

```ts
async function getJson(url: string): Promise<unknown>
```

Prasības:

- izmanto `fetch` un `async/await` (nevis `.then()` ķēdes);
- pārbauda `response.ok`. **`fetch` nemet kļūdu, ja serveris atbild ar 404 vai 500** — tas jādara jums pašiem (`throw new Error(...)` ar statusa kodu ziņojumā);
- atgriež `unknown`, nevis `any`.

### 5.2. Type guard funkcijas

Failā `src/guards.ts` uzrakstiet:

- `isProject(value: unknown): value is Project`;
- `isDeadline(value: unknown): value is Deadline`.

Ja 2. nedēļā type guard jau uzrakstījāt (papildu uzdevums), pārnesiet to uz šo failu un izmantojiet abās vietās — gan API datiem, gan `localStorage`.

Padoms: palīgfunkcija `isRecord(value: unknown): value is Record<string, unknown>` ļauj pēc tam rakstīt `typeof value.title === "string"`.

### 5.3. Ielādes funkcijas

```ts
export async function fetchProjects(): Promise<Project[]>
export async function fetchDeadlines(): Promise<Deadline[]>
```

Katra funkcija izsauc `getJson`, pārbauda, vai rezultāts ir masīvs un **katrs** tā elements iztur type guard (`Array.isArray(...)` + `.every(isProject)`). Ja nē — `throw new Error(...)` ar saprotamu ziņojumu (piemēram, *"Projects came back in an unexpected format."*).

---

## 6. Ielādes, kļūdu un tukšie stāvokļi

### 6.1. Tips `LoadState<T>`

Pievienojiet `src/types.ts`:

```ts
export type LoadState<T> =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; data: T };
```

Šis ir **union tips ar kopīgu lauku** `status`. Kad pārbaudāt `if (state.status === "success")`, TypeScript zina, ka tieši šajā zarā eksistē `state.data`, un citos zaros tā nav.

### 6.2. Katrai sadaļai savs stāvoklis

Projektiem un termiņiem ir **atsevišķi** `LoadState` mainīgie. Ja neizdodas ielādēt termiņus, projektiem tik un tā jāstrādā.

Ielādes gaita katrai sadaļai:

1. stāvoklis → `loading`, lapa tiek uzzīmēta;
2. `await fetchProjects()` iekš `try/catch`;
3. veiksmes gadījumā stāvoklis → `success`, kļūdas gadījumā → `error` ar ziņojumu;
4. lapa tiek uzzīmēta vēlreiz.

### 6.3. Ko redz lietotājs

| Stāvoklis | Projektu sadaļā | Termiņu sadaļā |
|---|---|---|
| `loading` | teksts *"Loading projects…"* | teksts *"Loading deadlines…"* |
| `error` | kļūdas ziņojums + poga **Try again** | kļūdas ziņojums + poga **Try again** |
| `success`, bet saraksts tukšs | tukšā stāvokļa paziņojums | paziņojums *"No upcoming deadlines."* |
| `success` | kartītes, kā iepriekš | termiņu saraksts, kā iepriekš |

Papildus:

- **Try again** ielādē no jauna **tikai savu** sadaļu;
- kļūdas blokam ir `role="alert"`, ielādes tekstam `role="status"` (ekrāna lasītājiem);
- statistikas kartīte *Active projects* rāda `…` ielādes laikā un `–` kļūdas gadījumā;
- poga **Add project** ir atspējota (`disabled`), kamēr projekti nav veiksmīgi ielādēti;
- renderēšanas funkcijas saņem `LoadState`, nevis tikai masīvu.

### 6.4. Pievienotie projekti un `localStorage`

Projekti no API **netiek** glabāti `localStorage` — tie katru reizi nāk no API. `localStorage` glabā **tikai lietotāja pievienotos** projektus. Lapā redzams: API projekti + pievienotie projekti.

Izmantojiet **jaunu** atslēgu, piemēram, `campusflow.week03.localProjects`. Iemesls: `week02` un `week03` abi darbojas uz `localhost:5173`, tātad tiem ir **viens kopīgs** `localStorage`.

### 6.5. Pārbaude ar DevTools

Pārbaudiet katru stāvokli un pārliecinieties, ka lapa **nekad** nepaliek tukša bez paskaidrojuma:

1. **Ielāde:** *Network* panelī ieslēdziet *Disable cache* un throttling izvēlnē (*No throttling*) izvēlieties *Slow 4G* (vecākās Chrome versijās: *Slow 3G*) → pārlādējiet lapu.
2. **Bloķēts pieprasījums:** *Network* panelī ar labo peles pogu uzklikšķiniet uz `projects.json` → **Block request** (vecākās Chrome versijās: *Block request URL*) → pārlādējiet. Bloķēšanu izslēdz *Request conditions* panelī.
3. **Trūkstošs fails:** pārdēvējiet `projects.json` → pārlādējiet. Uzmanību: Vite dev serveris neeksistējošam failam **neatbild ar 404**, bet atdod `index.html` ar statusu **200**. Tātad `response.ok` būs `true`, bet `response.json()` nevarēs nolasīt HTML kā JSON. Lapai tik un tā jāparāda kļūda. Pārdēvējiet failu atpakaļ un nospiediet **Try again**.
4. **Nepareiza forma:** `projects.json` vienam projektam ierakstiet `"progress": "50"` (teksts, nevis skaitlis) → jāparādās kļūdai par nepareizu formātu.
5. **Tukšs saraksts:** `projects.json` saturu aizstājiet ar `[]` → jāparādās tukšā stāvokļa paziņojumam.

Pēc pārbaudēm atjaunojiet īstos datus.

---

## 7. Laikapstākļi no Open-Meteo

[Open-Meteo](https://open-meteo.com/en/docs) ir bezmaksas laikapstākļu API bez reģistrācijas un atslēgas. Pašreizējie laikapstākļi Rīgā:

```
https://api.open-meteo.com/v1/forecast?latitude=56.95&longitude=24.11&current=temperature_2m,wind_speed_10m,weather_code&timezone=Europe%2FRiga
```

Atveriet šo adresi pārlūkā un apskatiet atbildes struktūru (vajadzīgie dati ir objektā `current`).

### Prasības

1. `src/types.ts` aprakstiet **savu** tipu:

```ts
export interface CurrentWeather {
  time: string;
  temperature: number;
  windSpeed: number;
  weatherCode: number;
}
```

2. `src/api.ts` uzrakstiet `fetchWeather(): Promise<CurrentWeather>`, kas:
   - izmanto `getJson`;
   - pārbauda, ka `current` ir objekts un tajā ir vajadzīgie lauki ar pareiziem tipiem;
   - **pārveido** API atbildi jūsu tipā (`temperature_2m` → `temperature` utt.). Pārējā lietotne Open-Meteo lauku nosaukumus nezina.
3. Aizstājiet ceturto statistikas kartīti (*Focus time*) ar kartīti *Rīga now*: temperatūra (°C, noapaļota) un vēja ātrums (km/h).
4. Laikapstākļiem ir **savs** `LoadState`. Ja tie neielādējas, kartītē redzams *"Weather unavailable"*, bet projekti un termiņi strādā.

### Pārbaude

- **Bloķēts pieprasījums:** ar labo peles pogu uz `forecast?...` pieprasījuma → **Block request** → pārlādējiet. Jāredz *"Weather unavailable"*, pārējā lapa strādā.
- **HTTP kļūda:** URL uz brīdi nomainiet `latitude=56.95` pret `latitude=999`. Open-Meteo atbildēs ar statusu **400**. Pārbaudiet *Network* panelī, ka tieši jūsu `response.ok` pārbaude to noķēra. Pēc tam atjaunojiet URL.

---

## 8. Papildu uzdevumi (izvēles)

Ja pamata darbs pabeigts, izvēlieties vismaz vienu:

- **noildze:** ja serveris neatbild 8 sekunžu laikā, pieprasījums tiek pārtraukts (`fetch(url, { signal: AbortSignal.timeout(8000) })`) un lietotājs redz saprotamu ziņojumu;
- **dažādi kļūdu ziņojumi:** atšķiriet tīkla kļūdu (`TypeError`), nederīgu JSON (`SyntaxError`), HTTP statusu un nepareizu datu formu;
- **viena ģeneriska ielādes funkcija** visām sadaļām: `async function load<T>(fetcher: () => Promise<T>, setState: (state: LoadState<T>) => void): Promise<void>`;
- **pilnīga `switch` pārbaude:** `switch (state.status)` ar `default` zaru, kurā `const check: never = state; return check;` — ja kādreiz pievienos jaunu stāvokli un aizmirsīs to apstrādāt, TypeScript to pamanīs;
- **laikapstākļu apraksts:** `weather_code` pārveidojiet tekstā (*Clear sky*, *Rain*, ...) pēc Open-Meteo dokumentācijas tabulas *WMO Weather interpretation codes*;
- **pilsētas izvēle:** `select` ar 3 pilsētām, koordinātas glabātas `Record<City, { latitude: number; longitude: number }>`.

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
- pilnu projekta pirmkodu mapē `week03-api`;
- Git izmaiņu vēsturi;
- aizpildītu `AI_USAGE.md`;
- aizpildītu `REFLECTION.md`.

Pirms iesniegšanas pārbaudiet, ka:

- `npm install` izpildās bez kļūdām;
- **`npm run build` izpildās bez kļūdām**;
- kodā nav `any`, `@ts-ignore` un `as` API datiem;
- `fetch` tiek izsaukts tikai `src/api.ts`;
- `src/data.ts` vairs nav — projekti un termiņi nāk no `public/api/*.json`;
- visi 5 DevTools pārbaudes gadījumi (6.5. sadaļa) parāda saprotamu stāvokli;
- laikapstākļi tiek parādīti, un, ja tie neielādējas, pārējā lapa strādā;
- pievienots projekts saglabājas pēc pārlādes, `<b>test</b>` nosaukumā tiek parādīts kā teksts;
- pārlūkprogrammas konsolē nav būtisku kļūdu (pārbaužu laikā pārlūks pats ziņo par bloķētiem pieprasījumiem — tas ir normāli).
