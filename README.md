# Civil Engineering Learning Tools

**▶ Open the lessons: [rasmusmott.github.io/civil-engineering-learning-tools/](https://rasmusmott.github.io/civil-engineering-learning-tools/)**

Interactive lessons for the core subjects of a civil and structural engineering degree, by Rasmus Mott Frandsen.
Each lesson has a live model to play with, every formula worked through with your own numbers, and exercises that check each step.
Nothing to install: the lessons run in any modern browser, on a computer or a phone.

## Topics

**Foundation**

- 1. [Mechanics fundamentals](https://rasmusmott.github.io/civil-engineering-learning-tools/topics/mechanics-fundamentals/index.html) — Vectors, forces, Newton’s laws, energy and momentum, told through a construction site. Units and dimensions run through every lesson. *(in progress)*
- 2. Statics — Free-body diagrams, supports, equilibrium, trusses and frames. *(planned)*
- 3. Strength of materials — Stress and strain, bending, shear, torsion, Mohr’s circle. *(planned)*
- 4. Beam deflections and indeterminate structures — Superposition, force method, virtual work. *(planned)*
- 5. Stability — Euler columns, buckling lengths, imperfections. *(planned)*

**Codes and materials**

- 6. Basis of design and loads — Limit states, partial factors, load combinations, wind and snow. *(planned)*
- 7. Reinforced concrete — Bending, shear, cracking and deflection. *(planned)*
- 8. Steel — Section classes, resistance, lateral-torsional buckling. *(planned)*
- 9. Timber — Strength classes, modification factors, members. *(planned)*
- 10. Geotechnics basics — Effective stress, bearing capacity, earth pressure. *(planned)*
- 11. Structural documentation — Design basis and how a calculation report is built up. *(planned)*

**Methods**

- 12. Numerical methods for engineers — Root finding, linear algebra, ordinary differential equations. *(planned)*
- 13. Matrix stiffness method — From truss to frame, by hand and by matrix. *(planned)*
- 14. Finite element method — Bar, beam and plane elements, convergence, pitfalls. *(planned)*
- 15. Fluid mechanics and CFD basics — Pressure, flow, drag, and what a CFD solver does. *(planned)*
- 16. [Structural dynamics](https://rasmusmott.github.io/civil-engineering-learning-tools/topics/structural-dynamics/index.html) — Vibration, resonance, time stepping and modes, told through an offshore wind turbine. Waves, spectra, fatigue and soil follow after the topics they build on.

**Computational design**

- 17. Parametric and computational design — Form finding and generative design. *(planned)*
- 18. Optimisation and surrogate models — Evolutionary optimisation with fast approximate models. *(planned)*

## What is in this repository

This repository holds the **published build** that GitHub Pages serves. You do not need to download anything to use the lessons; use the link above.

| Folder or file | What it is |
|---|---|
| `index.html` | The start page with all topics |
| `topics/<topic>/index.html` | One topic with its lessons |
| `topics/<topic>/core/` | The calculations (minified) |
| `topics/<topic>/app/` | The lesson pages, drawings and exercises (minified) |
| `kit/` | Shared layout and helpers (minified) |

The readable source code, the automated test suite (unit checks, benchmarks with known answers and an independent SciPy cross-check) and the design notes are kept in a private repository. They are available on request to employers and reviewers.

## Copyright

© 2026 Rasmus Mott Frandsen. All rights reserved. You are welcome to use the lessons for study and to link to them. Copying or republishing the code or content is not permitted without written permission. See [LICENSE](LICENSE).

These are learning tools. They are not verified for design and do not replace a standard, a validated code or an engineer's judgement.
