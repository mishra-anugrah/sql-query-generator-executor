# SQL Query Builder and Executor

- Built by Anugrah Mishra with `ReactJS`
- Live demo : https://anm-query-execurator.netlify.app/
- Load time : 0.2s (Lighthouse)

<br>

---

<br>

## App overview:

- The app contains three sections:

  - Pre defined queries executor
  - Query Builder (Build queries using dropdowns)
  - Custom Query Executor

<br>

- Libraries used:

  - Material-UI
  - SASS

<br>

- Optimizations used:

  - Avoided in line styling
  - Used traditional `for` loops at some places insteach of map
  - **-** : Can use pagination / lazy loading on tables to avoid large loading times as the `orders` table data is around 900 rows
