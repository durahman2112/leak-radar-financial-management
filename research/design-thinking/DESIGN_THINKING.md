# Design Thinking: Leak Radar Financial Management
**Perspective:** Personal POV

## Phase 1: Empathize
*Understanding the experience of financial "leaks" from a personal perspective.*

### Empathy Map: The Modern Saver
- **Says:** 
    - "Where did my money go this month?"
    - "I thought I had more in my account."
    - "I forgot about that subscription I signed up for six months ago."
- **Thinks:** 
    - "I'm working hard but my savings aren't growing as fast as they should."
    - "Managing finances feels like a second job I'm failing at."
    - "Is there a 'hidden tax' on my lifestyle I'm not seeing?"
- **Does:** 
    - Checks bank apps frequently but only for the balance, not the details.
    - Feels a pang of guilt after a large purchase or seeing a recurring charge.
    - Occasionally tries a spreadsheet but abandons it due to the manual effort.
- **Feels:** 
    - **Anxiety:** About whether they can afford their future goals.
    - **Frustration:** At the "death by a thousand cuts" from small recurring costs.
    - **Overwhelm:** From the sheer number of digital accounts and micro-transactions.
- **Pains:** 
    - Subscription fatigue (forgotten free trials, unused services).
    - "Ghost" expenses (bank fees, convenience surcharges, late fees).
    - The high mental load of manual transaction categorization.
- **Gains:** 
    - **Peace of Mind:** Knowing exactly where every dollar goes.
    - **Empowerment:** Feeling in control of financial destiny.
    - **Surplus:** Reclaiming "leaked" money for meaningful goals (travel, investing).

---

## Phase 2: Define
*Framing the core problem based on empathy insights.*

### POV Statement
**User:** A digitally active individual with multiple accounts and subscriptions.
**Need:** To automatically detect, visualize, and eliminate "financial leaks" (unnecessary recurring costs, hidden fees, and lifestyle creep).
**Insight:** Manual tracking is unsustainable because modern spending is fragmented across dozens of micro-transactions, leading to a loss of financial agency and "invisible" wealth erosion.

### How Might We (HMW) Questions
1. **HMW** make financial leaks visible in real-time without any manual data entry?
2. **HMW** transform the "guilt" of spending into the "satisfaction" of plugging a leak?
3. **HMW** create an "early warning system" for upcoming leaks (e.g., free trial expirations)?

---

## Phase 3: Ideate
*Brainstorming creative solutions to the HMW questions.*

- **The "Subscription Audit" Bot:** An AI that scans statements and periodically presents a "Keep/Kill/Negotiate" list of all recurring charges.
- **Leakage Heat Map:** A visual dashboard where "leaks" are represented as actual water drips—the faster the drip, the bigger the financial leak.
- **Smart Fee Finder:** Automatically identifies ATM fees, foreign transaction fees, or account maintenance fees and suggests alternative banks or settings.
- **Deep-Dive Audit Dashboard:** Utilizing the larger screen real estate of a web app to show complex data visualizations (e.g., Sankey diagrams of cash flow, detailed subscription tables) that wouldn't fit on mobile.
- **Trial Guard Browser Extension:** A Chrome/Edge extension that detects when a user is on a checkout page for a "Free Trial" and automatically sets a cancellation reminder or blocks the charge after the trial ends.

---

## Phase 4: Prototype
*Low-fidelity concept for the "Leak Radar" web platform.*

### Concept: Leak Radar Web Platform
- **Screen 1: The Command Center (Dashboard):** A wide, multi-panel layout. Left sidebar for navigation, main canvas for the "Radar" data visualization (showing leaks), and a right-hand panel for actionable alerts.
- **Screen 2: The Kill Switch Data Grid:** A rich, sortable table view of all recurring charges, allowing users to select multiple subscriptions and click a bulk "Cancel Selected" button.
- **Screen 3: The Extension Popup:** A mockup of a browser extension dropping down when a user visits a service's checkout page, showing a "Guard this Trial" button and automatic reminder settings.

---

## Phase 5: Test
*How to validate the concept.*

1. **Contextual Usability Test (Extension):** Have a user sit at a laptop and "shop" for a subscription. Show the mock Extension Popup at checkout.
    - *Question:* "Does this feel like a helpful guard or an annoying interruption?"
    - *Observation:* Do they trust the "Guard this Trial" button?
2. **Information Density Check (Dashboard):** Show the rich data grid of the "Command Center."
    - *Question:* "Is this too much information, or does it give you the control you've been missing?"
    - *Metric:* Time taken to identify their highest-priority "leak" from the grid.
3. **Kill Switch Trust Test:** Ask if they would trust a web platform to bulk-cancel subscriptions on their behalf.
    - *Goal:* Identify the level of automation users are comfortable with on a desktop vs. mobile device.
