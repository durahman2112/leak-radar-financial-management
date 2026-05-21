<template>
  <div class="min-h-screen text-slate-100">
    <NuxtRouteAnnouncer />

    <div class="flex min-h-screen">
      <aside
        class="hidden w-72 shrink-0 border-r border-white/10 bg-slate-950/80 p-5 backdrop-blur-xl lg:block"
      >
        <div class="flex items-center gap-3">
          <div
            class="grid size-12 place-items-center rounded-2xl bg-cyan-300 text-xl font-black text-slate-950 shadow-lg shadow-cyan-400/20"
          >
            LR
          </div>
          <div>
            <p
              class="text-xs font-bold uppercase tracking-[0.28em] text-cyan-200"
            >
              Leak Radar
            </p>
            <h1 class="font-black text-white">Pusat Kendali</h1>
          </div>
        </div>

        <nav class="mt-8 space-y-2">
          <button
            v-for="menu in menus"
            :key="menu.id"
            :data-testid="`menu-${menu.id}`"
            :class="
              activeMenu === menu.id
                ? 'border-cyan-300/30 bg-cyan-300/15 text-cyan-100'
                : 'border-transparent text-slate-400 hover:bg-white/[0.05] hover:text-white'
            "
            class="flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-bold transition"
            @click="activeMenu = menu.id"
          >
            <span>{{ menu.label }}</span>
            <span class="text-lg">{{ menu.icon }}</span>
          </button>
        </nav>

        <button
          class="mt-8 w-full rounded-2xl border border-white/10 px-4 py-3 text-sm font-black text-slate-200 transition hover:bg-white/10"
          type="button"
          @click="resetAllData"
        >
          Reset Data
        </button>
      </aside>

      <main class="min-w-0 flex-1">
        <header
          class="sticky top-0 z-20 border-b border-white/10 bg-slate-950/70 px-5 py-4 backdrop-blur-xl lg:px-8"
        >
          <div
            class="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between"
          >
            <div>
              <p
                class="text-sm font-bold uppercase tracking-[0.25em] text-cyan-200"
              >
                {{ activePage.kicker }}
              </p>
              <h2 class="mt-1 text-3xl font-black tracking-tight text-white">
                {{ activePage.title }}
              </h2>
            </div>

            <div class="flex gap-2 overflow-x-auto lg:hidden">
              <button
                v-for="menu in menus"
                :key="menu.id"
                :class="
                  activeMenu === menu.id
                    ? 'bg-cyan-300 text-slate-950'
                    : 'bg-white/10 text-slate-200'
                "
                class="shrink-0 rounded-full px-4 py-2 text-sm font-black"
                @click="activeMenu = menu.id"
              >
                {{ menu.label }}
              </button>
            </div>

            <div class="grid grid-cols-3 gap-2 sm:min-w-[34rem]">
              <div
                v-for="metric in topMetrics"
                :key="metric.label"
                class="rounded-2xl border border-white/10 bg-white/[0.04] p-3"
              >
                <p class="text-xs text-slate-400">{{ metric.label }}</p>
                <p class="mt-1 text-lg font-black text-white">
                  {{ metric.value }}
                </p>
              </div>
            </div>

            <button
              class="w-fit rounded-2xl border border-white/10 px-4 py-3 text-sm font-black text-slate-200 transition hover:bg-white/10 xl:hidden"
              type="button"
              @click="resetAllData"
            >
              Reset Data
            </button>
          </div>
        </header>

        <section class="p-5 lg:p-8">
          <div
            v-if="actionMessage"
            class="mb-5 rounded-3xl border border-cyan-300/20 bg-cyan-300/10 px-5 py-3 text-sm font-bold text-cyan-100"
          >
            {{ actionMessage }}
          </div>

          <section
            v-if="activeMenu === 'overview'"
            class="grid gap-5 xl:grid-cols-[1.05fr_.95fr]"
          >
            <article
              class="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-black/30"
            >
              <div
                class="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-sm font-bold text-cyan-100"
              >
                <span class="size-2 rounded-full bg-emerald-300" />
                Audit AI siap · {{ leakCount }} kebocoran terdeteksi
              </div>
              <h3
                class="mt-6 max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl"
              >
                Deteksi, prioritaskan, dan hentikan kebocoran uang berulang.
              </h3>
              <p class="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                Aplikasi finansial berbasis dashboard untuk langganan, biaya
                tersembunyi, risiko uji coba, kontrol arus kas bulanan, dan alur
                pembatalan.
              </p>

              <div class="mt-8 grid gap-3 md:grid-cols-3">
                <div
                  v-for="card in insightCards"
                  :key="card.label"
                  class="rounded-3xl border border-white/10 bg-white/[0.04] p-5"
                >
                  <p class="text-sm text-slate-400">{{ card.label }}</p>
                  <p class="mt-2 text-2xl font-black text-white">
                    {{ card.value }}
                  </p>
                  <p :class="card.tone" class="mt-1 text-sm font-bold">
                    {{ card.caption }}
                  </p>
                </div>
              </div>
            </article>

            <article
              class="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6"
            >
              <h3 class="text-2xl font-black text-white">
                Peringatan Prioritas
              </h3>
              <div class="mt-5 space-y-3">
                <button
                  v-for="alert in priorityAlerts"
                  :key="alert.title"
                  class="w-full rounded-3xl border border-white/10 bg-slate-950/60 p-4 text-left transition hover:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-cyan-300/20"
                  type="button"
                  @click="activeMenu = alert.target"
                >
                  <div class="flex items-start justify-between gap-4">
                    <div>
                      <p class="font-black text-white">{{ alert.title }}</p>
                      <p class="mt-1 text-sm leading-6 text-slate-400">
                        {{ alert.copy }}
                      </p>
                    </div>
                    <span
                      :class="alert.class"
                      class="rounded-full px-3 py-1 text-xs font-black"
                      >{{ alert.level }}</span
                    >
                  </div>
                </button>
              </div>
            </article>
          </section>

          <section
            v-else-if="activeMenu === 'monthly'"
            class="grid gap-5 xl:grid-cols-[.42fr_.58fr]"
          >
            <form
              class="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6"
              @submit.prevent="saveMonthlyRecord"
            >
              <h3 class="text-2xl font-black text-white">
                {{
                  editingMonthlyId
                    ? "Ubah Catatan Bulanan"
                    : "Tambah Catatan Bulanan"
                }}
              </h3>
              <div class="mt-5 space-y-4">
                <label class="block">
                  <span class="text-sm font-bold text-slate-300">Bulan</span>
                  <input
                    v-model="monthlyForm.month"
                    data-testid="monthly-month"
                    class="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-cyan-300"
                    required
                    type="month"
                  />
                </label>

                <div class="grid gap-4 sm:grid-cols-2">
                  <CurrencyInput
                    v-model="monthlyForm.income"
                    label="Pemasukan Bulanan"
                    test-id="monthly-income"
                  />
                  <CurrencyInput
                    v-model="monthlyForm.essentialSpend"
                    label="Pengeluaran Pokok"
                    test-id="monthly-essential"
                  />
                  <CurrencyInput
                    v-model="monthlyForm.discretionarySpend"
                    label="Pengeluaran Fleksibel"
                    test-id="monthly-discretionary"
                  />
                  <CurrencyInput
                    v-model="monthlyForm.savingsGoal"
                    label="Target Tabungan"
                    test-id="monthly-savings"
                  />
                </div>

                <label class="block">
                  <span class="text-sm font-bold text-slate-300">Catatan</span>
                  <input
                    v-model="monthlyForm.note"
                    data-testid="monthly-note"
                    class="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-cyan-300"
                    placeholder="contoh: anggaran mudik, bulan bonus"
                  />
                </label>
              </div>

              <div class="mt-5 flex gap-3">
                <button
                  data-testid="save-monthly"
                  class="rounded-2xl bg-cyan-300 px-5 py-3 font-black text-slate-950 hover:bg-cyan-200"
                >
                  {{ editingMonthlyId ? "Simpan Perubahan" : "Tambah Bulan" }}
                </button>
                <button
                  v-if="editingMonthlyId"
                  class="rounded-2xl border border-white/10 px-5 py-3 font-black text-white hover:bg-white/10"
                  type="button"
                  @click="resetMonthlyForm"
                >
                  Batal
                </button>
              </div>
            </form>

            <article
              class="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6"
            >
              <div
                class="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <h3 class="text-2xl font-black text-white">
                    Pelacakan Keuangan Bulanan
                  </h3>
                  <p class="mt-1 text-sm text-slate-400">
                    Pemasukan, pengeluaran, dampak kebocoran, dan selisih target
                    tabungan dalam Rupiah.
                  </p>
                </div>
                <span
                  class="rounded-full bg-cyan-300/15 px-3 py-1 text-sm font-bold text-cyan-100"
                  >{{ monthlyRecords.length }} bulan</span
                >
              </div>

              <div class="mb-5 grid gap-3 md:grid-cols-3">
                <div
                  v-for="item in monthlySummaryCards"
                  :key="item.label"
                  class="rounded-3xl border border-white/10 bg-white/[0.04] p-4"
                >
                  <p class="text-sm text-slate-400">{{ item.label }}</p>
                  <p class="mt-2 text-xl font-black text-white">
                    {{ item.value }}
                  </p>
                  <p :class="item.tone" class="mt-1 text-xs font-bold">
                    {{ item.caption }}
                  </p>
                </div>
              </div>

              <div
                v-if="monthlyRecords.length === 0"
                class="rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-6 text-center"
              >
                <p class="font-black text-white">Belum ada catatan bulanan</p>
                <p class="mt-2 text-sm leading-6 text-slate-400">
                  Tambahkan pemasukan, pengeluaran, dan target tabungan dari
                  formulir di samping.
                </p>
              </div>

              <div v-else class="space-y-3">
                <div
                  v-for="record in sortedMonthlyRecords"
                  :key="record.id"
                  class="rounded-3xl border border-white/10 bg-white/[0.04] p-4"
                >
                  <div
                    class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <p class="font-black text-white">
                        {{ formatMonth(record.month) }}
                      </p>
                      <p class="text-sm text-slate-400">
                        Dampak bocor {{ formatCurrency(monthlyLeakage) }} · Sisa
                        setelah bocor
                        {{ formatCurrency(getNetAfterLeaks(record)) }}
                      </p>
                      <p v-if="record.note" class="mt-1 text-sm text-slate-500">
                        {{ record.note }}
                      </p>
                    </div>
                    <div class="flex flex-wrap items-center gap-2">
                      <span
                        class="rounded-full bg-white/10 px-3 py-1 text-sm font-bold"
                        >{{ formatCurrency(record.income) }}</span
                      >
                      <button
                        class="rounded-full bg-amber-300 px-3 py-1 text-sm font-black text-amber-950"
                        @click="editMonthlyRecord(record)"
                      >
                        Ubah
                      </button>
                      <button
                        class="rounded-full bg-rose-300 px-3 py-1 text-sm font-black text-rose-950"
                        @click="deleteMonthlyRecord(record.id)"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </section>

          <section
            v-else-if="activeMenu === 'radar'"
            class="grid gap-5 xl:grid-cols-[.95fr_1.05fr]"
          >
            <article
              class="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6"
            >
              <div
                class="relative mx-auto aspect-square max-w-[35rem] overflow-visible rounded-full border border-cyan-200/20 bg-slate-950/90 shadow-inner shadow-cyan-950"
              >
                <div
                  class="absolute inset-[9%] z-0 rounded-full border border-cyan-200/10"
                />
                <div
                  class="absolute inset-[22%] z-0 rounded-full border border-cyan-200/10"
                />
                <div
                  class="absolute inset-[35%] z-0 rounded-full border border-cyan-200/10"
                />
                <div
                  class="absolute left-1/2 top-0 z-0 h-full w-px bg-cyan-100/10"
                />
                <div
                  class="absolute left-0 top-1/2 z-0 h-px w-full bg-cyan-100/10"
                />
                <div
                  class="radar-sweep pointer-events-none absolute inset-0 z-0 rounded-full bg-[conic-gradient(from_0deg,rgba(34,211,238,.55),rgba(34,211,238,.12),transparent_22%)]"
                />
                <div
                  v-if="radarMarkers.length === 0"
                  class="absolute inset-0 z-10 grid place-items-center px-12 text-center"
                >
                  <div>
                    <p class="text-lg font-black text-white">
                      Belum ada kebocoran terdeteksi
                    </p>
                    <p class="mt-2 text-sm leading-6 text-slate-400">
                      Tambahkan langganan atau biaya berulang dari menu
                      Langganan.
                    </p>
                  </div>
                </div>
                <button
                  v-for="marker in radarMarkers"
                  :key="marker.subscription.id"
                  :aria-label="`Buka detail kebocoran untuk ${marker.subscription.name}`"
                  :class="[marker.class, marker.colorClass]"
                  data-testid="radar-marker"
                  class="pulse-marker group absolute z-20 rounded-full border border-white/60 shadow-lg outline-none ring-cyan-200/50 transition hover:z-[70] hover:scale-125 focus:z-[70] focus:ring-4"
                  type="button"
                  @blur="hoveredRadarId = null"
                  @click="openRadarLeak(marker.subscription)"
                  @focus="hoveredRadarId = marker.subscription.id"
                  @mouseenter="hoveredRadarId = marker.subscription.id"
                  @mouseleave="hoveredRadarId = null"
                >
                  <span class="sr-only">{{ marker.subscription.name }}</span>
                  <span
                    v-if="hoveredRadarId === marker.subscription.id"
                    class="pointer-events-none absolute bottom-full left-1/2 z-[80] mb-4 w-64 -translate-x-1/2 rounded-2xl border border-cyan-200/20 bg-slate-950/95 p-3 text-left shadow-2xl shadow-black/50"
                  >
                    <span class="block text-sm font-black text-white">{{
                      marker.subscription.name
                    }}</span>
                    <span class="mt-1 block text-xs leading-5 text-slate-400">{{
                      marker.subscription.signal
                    }}</span>
                    <span
                      class="mt-2 flex items-center justify-between text-xs font-bold"
                    >
                      <span :class="getRiskClass(marker.subscription.risk)">{{
                        getRiskLabel(marker.subscription.risk)
                      }}</span>
                      <span class="text-cyan-100"
                        >{{
                          formatCurrency(marker.subscription.monthlyCost)
                        }}/bln</span
                      >
                    </span>
                  </span>
                </button>
                <div
                  v-if="radarMarkers.length > 0"
                  class="pointer-events-none absolute inset-[41%] z-10 grid place-items-center rounded-full border border-cyan-200/20 bg-slate-950 text-center"
                >
                  <p class="text-xs uppercase tracking-[0.24em] text-slate-400">
                    Indeks Bocor
                  </p>
                  <p class="text-5xl font-black text-cyan-200">
                    {{ leakIndex }}
                  </p>
                </div>
              </div>
            </article>

            <article
              class="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6"
            >
              <h3 class="text-2xl font-black text-white">Sinyal Radar</h3>
              <div class="mt-5 space-y-3">
                <div
                  v-if="highRiskSubscriptions.length === 0"
                  class="rounded-3xl border border-dashed border-white/15 bg-slate-950/50 p-6 text-center"
                >
                  <p class="font-black text-white">
                    Tidak ada sinyal risiko tinggi
                  </p>
                  <p class="mt-2 text-sm leading-6 text-slate-400">
                    Data risiko baru akan muncul setelah langganan ditambahkan
                    atau diubah.
                  </p>
                </div>
                <button
                  v-for="subscription in highRiskSubscriptions"
                  :key="subscription.id"
                  class="flex w-full items-center justify-between rounded-3xl bg-slate-950/60 p-4 text-left transition hover:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-cyan-300/20"
                  type="button"
                  @click="openRadarLeak(subscription)"
                >
                  <div>
                    <p class="font-black text-white">{{ subscription.name }}</p>
                    <p class="text-sm text-slate-400">
                      {{ subscription.signal }}
                    </p>
                  </div>
                  <p class="text-lg font-black text-rose-200">
                    {{ formatCurrency(subscription.monthlyCost) }}
                  </p>
                </button>
              </div>
            </article>
          </section>

          <section
            v-else-if="activeMenu === 'subscriptions'"
            class="grid gap-5 xl:grid-cols-[.42fr_.58fr]"
          >
            <form
              class="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6"
              @submit.prevent="saveSubscription"
            >
              <h3 class="text-2xl font-black text-white">
                {{ editingId ? "Ubah Langganan" : "Tambah Langganan" }}
              </h3>
              <div class="mt-5 space-y-4">
                <label class="block">
                  <span class="text-sm font-bold text-slate-300">Penyedia</span>
                  <input
                    v-model="subscriptionForm.name"
                    data-testid="subscription-name"
                    class="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-cyan-300"
                    required
                  />
                </label>

                <div>
                  <span class="text-sm font-bold text-slate-300">Kategori</span>
                  <Listbox v-model="subscriptionForm.category">
                    <div class="relative mt-2">
                      <ListboxButton
                        data-testid="subscription-category-button"
                        class="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-left text-white outline-none focus:border-cyan-300"
                      >
                        <span>{{
                          subscriptionForm.category || "Pilih kategori"
                        }}</span>
                        <span class="text-slate-400">⌄</span>
                      </ListboxButton>
                      <ListboxOptions
                        class="absolute z-30 mt-2 max-h-60 w-full overflow-auto rounded-2xl border border-white/10 bg-slate-950 p-2 shadow-2xl shadow-black/50 outline-none"
                      >
                        <ListboxOption
                          v-for="category in categories"
                          :key="category"
                          v-slot="{ active, selected }"
                          :value="category"
                        >
                          <li
                            :data-testid="`subscription-category-${toTestId(category)}`"
                            :class="[
                              active
                                ? 'bg-cyan-300/15 text-cyan-100'
                                : 'text-slate-300',
                              'cursor-pointer rounded-xl px-3 py-2 text-sm font-bold',
                            ]"
                          >
                            {{ selected ? "✓ " : "" }}{{ category }}
                          </li>
                        </ListboxOption>
                      </ListboxOptions>
                    </div>
                  </Listbox>
                </div>

                <div class="grid gap-4 sm:grid-cols-2">
                  <CurrencyInput
                    v-model="subscriptionForm.monthlyCost"
                    label="Biaya Bulanan"
                    test-id="subscription-cost"
                  />
                  <label class="block">
                    <span class="text-sm font-bold text-slate-300"
                      >Tanggal Terakhir Dipakai</span
                    >
                    <input
                      v-model="subscriptionForm.lastUsedDate"
                      data-testid="subscription-last-used"
                      class="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-cyan-300"
                      required
                      type="date"
                    />
                  </label>
                </div>

                <label class="block">
                  <span class="text-sm font-bold text-slate-300">Sinyal</span>
                  <input
                    v-model="subscriptionForm.signal"
                    data-testid="subscription-signal"
                    class="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-cyan-300"
                    required
                  />
                </label>

                <div
                  class="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3"
                >
                  <div>
                    <p class="text-sm font-bold text-white">
                      Penjaga Uji Coba Aktif
                    </p>
                    <p class="text-xs text-slate-400">
                      Komponen alih Headless UI
                    </p>
                  </div>
                  <Switch
                    v-model="subscriptionForm.trialGuarded"
                    data-testid="trial-guard-switch"
                    :class="
                      subscriptionForm.trialGuarded
                        ? 'bg-cyan-300'
                        : 'bg-slate-700'
                    "
                    class="relative inline-flex h-7 w-12 items-center rounded-full transition"
                  >
                    <span class="sr-only">Alihkan Penjaga Uji Coba</span>
                    <span
                      :class="
                        subscriptionForm.trialGuarded
                          ? 'translate-x-6 bg-slate-950'
                          : 'translate-x-1 bg-white'
                      "
                      class="inline-block size-5 rounded-full transition"
                    />
                  </Switch>
                </div>
              </div>
              <div class="mt-5 flex gap-3">
                <button
                  data-testid="save-subscription"
                  class="rounded-2xl bg-cyan-300 px-5 py-3 font-black text-slate-950 hover:bg-cyan-200"
                >
                  {{ editingId ? "Simpan Perubahan" : "Tambah Item" }}
                </button>
                <button
                  v-if="editingId"
                  class="rounded-2xl border border-white/10 px-5 py-3 font-black text-white hover:bg-white/10"
                  type="button"
                  @click="resetForm"
                >
                  Batal
                </button>
              </div>
            </form>

            <article
              class="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6"
            >
              <div class="mb-5 flex items-center justify-between">
                <h3 class="text-2xl font-black text-white">Kelola Langganan</h3>
                <span
                  class="rounded-full bg-cyan-300/15 px-3 py-1 text-sm font-bold text-cyan-100"
                  >{{ subscriptions.length }} data</span
                >
              </div>
              <div
                v-if="subscriptions.length === 0"
                class="rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-6 text-center"
              >
                <p class="font-black text-white">Belum ada langganan</p>
                <p class="mt-2 text-sm leading-6 text-slate-400">
                  Gunakan formulir tambah untuk membuat data pertama. Setelah
                  tersimpan, data langsung muncul di Radar, Bulanan, dan Sakelar
                  Batal.
                </p>
              </div>

              <div v-else class="space-y-3">
                <div
                  v-for="subscription in subscriptions"
                  :key="subscription.id"
                  class="rounded-3xl border border-white/10 bg-white/[0.04] p-4"
                >
                  <div
                    class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <p class="font-black text-white">
                        {{ subscription.name }}
                      </p>
                      <p class="text-sm text-slate-400">
                        {{ subscription.category }} · {{ subscription.signal }}
                      </p>
                    </div>
                    <div class="flex flex-wrap items-center gap-2">
                      <span
                        class="rounded-full bg-white/10 px-3 py-1 text-sm font-bold"
                        >{{ formatCurrency(subscription.monthlyCost) }}/bln</span
                      >
                      <span
                        class="rounded-full bg-white/10 px-3 py-1 text-sm font-bold"
                        >{{ formatDate(subscription.lastUsedDate) }}</span
                      >
                      <span
                        v-if="subscription.trialGuarded"
                        class="rounded-full bg-cyan-300/15 px-3 py-1 text-sm font-bold text-cyan-100"
                        >Dijaga</span
                      >
                      <button
                        class="rounded-full bg-amber-300 px-3 py-1 text-sm font-black text-amber-950"
                        @click="editSubscription(subscription)"
                      >
                        Ubah
                      </button>
                      <button
                        class="rounded-full bg-rose-300 px-3 py-1 text-sm font-black text-rose-950"
                        @click="deleteSubscription(subscription.id)"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </section>

          <section
            v-else-if="activeMenu === 'fees'"
            class="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
          >
            <article
              v-if="fees.length === 0"
              class="rounded-[2rem] border border-dashed border-white/15 bg-white/[0.03] p-6 text-center md:col-span-2 xl:col-span-3"
            >
              <p class="font-black text-white">
                Belum ada biaya tersembunyi
              </p>
              <p class="mt-2 text-sm leading-6 text-slate-400">
                Tambahkan langganan dengan kategori Biaya Bank atau sinyal
                berisi biaya admin, fee, atau biaya tersembunyi.
              </p>
            </article>
            <article
              v-for="fee in fees"
              :key="fee.name"
              class="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6"
            >
              <p
                class="text-sm font-bold uppercase tracking-[0.25em] text-amber-200"
              >
                {{ fee.type }}
              </p>
              <h3 class="mt-3 text-2xl font-black text-white">
                {{ fee.name }}
              </h3>
              <p class="mt-3 text-sm leading-6 text-slate-400">
                {{ fee.recommendation }}
              </p>
              <p class="mt-5 text-3xl font-black text-white">
                {{ formatCurrency(fee.monthlyCost) }}/bln
              </p>
              <button
                :class="fixedFees.includes(fee.name) ? 'bg-emerald-300 text-emerald-950' : 'bg-amber-300 text-amber-950 hover:bg-amber-200'"
                class="mt-5 rounded-2xl px-4 py-3 text-sm font-black"
                type="button"
                @click="fixFee(fee.name)"
              >
                {{ fixedFees.includes(fee.name) ? 'Sudah diperbaiki' : 'Tandai diperbaiki' }}
              </button>
            </article>
          </section>

          <section
            v-else-if="activeMenu === 'trialGuard'"
            class="grid gap-5 xl:grid-cols-[.8fr_1.2fr]"
          >
            <article
              class="rounded-[2rem] border border-cyan-200/20 bg-cyan-300/10 p-6"
            >
              <p
                class="text-sm font-bold uppercase tracking-[0.25em] text-cyan-100"
              >
                Ekstensi Browser
              </p>
              <h3 class="mt-3 text-4xl font-black text-white">Penjaga Uji Coba</h3>
              <p class="mt-4 leading-8 text-cyan-50/80">
                Mendeteksi bahasa uji coba, informasi siklus tagihan, dan
                formulir checkout sebelum uji coba berubah menjadi kebocoran
                berulang.
              </p>
              <button
                class="mt-6 rounded-2xl bg-cyan-300 px-5 py-3 font-black text-slate-950 hover:bg-cyan-200"
                type="button"
                @click="guardAllTrials"
              >
                Aktifkan Simulasi Penjaga
              </button>
            </article>
            <article
              class="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6"
            >
              <h3 class="text-2xl font-black text-white">
                Halaman Uji Coba Terdeteksi
              </h3>
              <div class="mt-5 space-y-3">
                <div
                  v-if="trials.length === 0"
                  class="rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-6 text-center"
                >
                  <p class="font-black text-white">
                    Belum ada uji coba terdeteksi
                  </p>
                  <p class="mt-2 text-sm leading-6 text-slate-400">
                    Tambahkan langganan kategori Uji Coba atau sinyal yang
                    mengandung kata trial/uji coba.
                  </p>
                </div>
                <div
                  v-for="trial in trials"
                  :key="trial.service"
                  class="flex items-center justify-between rounded-3xl border border-white/10 bg-white/[0.04] p-4"
                >
                  <div>
                    <p class="font-black text-white">{{ trial.service }}</p>
                    <p class="text-sm text-slate-400">
                      Ditagih dalam {{ trial.daysLeft }} hari · {{ trial.copy }}
                    </p>
                  </div>
                  <button
                    class="rounded-full bg-amber-300 px-3 py-1 text-sm font-black text-amber-950"
                    type="button"
                    @click="guardTrial(trial)"
                  >
                    Jaga
                  </button>
                </div>
              </div>
            </article>
          </section>

          <section
            v-else-if="activeMenu === 'killSwitch'"
            class="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6"
          >
            <div
              class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p
                  class="text-sm font-bold uppercase tracking-[0.25em] text-rose-200"
                >
                  Aksi Massal
                </p>
                <h3 class="text-3xl font-black text-white">
                  Antrean Sakelar Batal
                </h3>
              </div>
              <button
                :disabled="killQueue.length === 0"
                data-testid="run-kill-switch"
                class="rounded-2xl bg-rose-300 px-5 py-3 font-black text-rose-950 hover:bg-rose-200 disabled:cursor-not-allowed disabled:opacity-50"
                type="button"
                @click="runKillSwitch"
              >
                Jalankan Alur Pembatalan
              </button>
            </div>
            <div
              v-if="subscriptions.length === 0"
              class="mt-6 rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-6 text-center"
            >
              <p class="font-black text-white">Antrean pembatalan kosong</p>
              <p class="mt-2 text-sm leading-6 text-slate-400">
                Tambahkan langganan dulu, lalu centang item yang ingin diproses.
              </p>
            </div>
            <div v-else class="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              <label
                v-for="subscription in subscriptions"
                :key="subscription.id"
                class="flex cursor-pointer items-center gap-3 rounded-3xl border border-white/10 bg-white/[0.04] p-4"
              >
                <input
                  v-model="killQueue"
                  :value="subscription.id"
                  class="size-5 accent-rose-300"
                  type="checkbox"
                />
                <span>
                  <span class="block font-black text-white">{{
                    subscription.name
                  }}</span>
                  <span class="text-sm text-slate-400"
                    >{{ formatCurrency(subscription.monthlyCost) }}/bln ·
                    {{ subscription.signal }}</span
                  >
                </span>
              </label>
            </div>
          </section>
        </section>

        <Dialog
          :open="selectedRadarLeak !== null"
          class="relative z-50"
          @close="selectedRadarLeak = null"
        >
          <div
            class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            aria-hidden="true"
          />
          <div class="fixed inset-0 grid place-items-center p-5">
            <DialogPanel
              v-if="selectedRadarLeak"
              data-testid="radar-detail-dialog"
              class="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-[2rem] border border-white/10 bg-slate-950 p-6 shadow-2xl shadow-black"
            >
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p
                    class="text-sm font-bold uppercase tracking-[0.25em] text-cyan-200"
                  >
                    Detail Kebocoran
                  </p>
                  <DialogTitle class="mt-2 text-3xl font-black text-white">
                    {{ selectedRadarLeak.name }}
                  </DialogTitle>
                </div>
                <button
                  class="rounded-full bg-white/10 px-3 py-1 text-sm font-black text-white hover:bg-white/20"
                  @click="selectedRadarLeak = null"
                >
                  Tutup
                </button>
              </div>

              <div class="mt-6 grid gap-3 sm:grid-cols-3">
                <div
                  class="rounded-3xl border border-white/10 bg-white/[0.04] p-4"
                >
                  <p class="text-xs text-slate-400">Bocor bulanan</p>
                  <p class="mt-1 text-lg font-black text-white">
                    {{ formatCurrency(selectedRadarLeak.monthlyCost) }}
                  </p>
                </div>
                <div
                  class="rounded-3xl border border-white/10 bg-white/[0.04] p-4"
                >
                  <p class="text-xs text-slate-400">Dampak tahunan</p>
                  <p class="mt-1 text-lg font-black text-white">
                    {{ formatCurrency(selectedRadarLeak.monthlyCost * 12) }}
                  </p>
                </div>
                <div
                  class="rounded-3xl border border-white/10 bg-white/[0.04] p-4"
                >
                  <p class="text-xs text-slate-400">Tingkat risiko</p>
                  <p
                    :class="getRiskClass(selectedRadarLeak.risk)"
                    class="mt-1 text-lg font-black"
                  >
                    {{ getRiskLabel(selectedRadarLeak.risk) }}
                  </p>
                </div>
              </div>

              <div
                class="mt-5 rounded-3xl border border-white/10 bg-white/[0.04] p-4"
              >
                <p class="text-sm font-bold text-slate-300">Sinyal</p>
                <p class="mt-2 leading-7 text-white">
                  {{ selectedRadarLeak.signal }}
                </p>
                <p class="mt-3 text-sm text-slate-400">
                  Kategori: {{ selectedRadarLeak.category }} · Terakhir dipakai:
                  {{ formatDate(selectedRadarLeak.lastUsedDate) }} · Penjaga
                  Uji Coba:
                  {{ selectedRadarLeak.trialGuarded ? "aktif" : "nonaktif" }}
                </p>
              </div>

              <div class="mt-6 flex flex-wrap gap-3">
                <button
                  data-testid="queue-cancellation"
                  class="rounded-2xl bg-rose-300 px-5 py-3 font-black text-rose-950 hover:bg-rose-200"
                  @click="queueLeakForCancellation(selectedRadarLeak)"
                >
                  Masukkan ke Sakelar Batal
                </button>
                <button
                  class="rounded-2xl bg-cyan-300 px-5 py-3 font-black text-slate-950 hover:bg-cyan-200"
                  @click="editLeakFromRadar(selectedRadarLeak)"
                >
                  Ubah Langganan
                </button>
                <button
                  class="rounded-2xl border border-white/10 px-5 py-3 font-black text-white hover:bg-white/10"
                  @click="selectedRadarLeak = null"
                >
                  Pantau Saja
                </button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Switch,
} from "@headlessui/vue";
import { computed, defineComponent, h } from "vue";

type MenuId =
  | "overview"
  | "monthly"
  | "radar"
  | "subscriptions"
  | "fees"
  | "trialGuard"
  | "killSwitch";

type Subscription = {
  id: number;
  name: string;
  category: string;
  monthlyCost: number;
  lastUsedDate: string;
  signal: string;
  risk: "low" | "medium" | "high";
  trialGuarded: boolean;
};

type SubscriptionForm = Omit<Subscription, "id" | "risk">;

type MonthlyRecord = {
  id: number;
  month: string;
  income: number;
  essentialSpend: number;
  discretionarySpend: number;
  savingsGoal: number;
  note: string;
};

type MonthlyForm = Omit<MonthlyRecord, "id">;

type RadarMarker = {
  subscription: Subscription;
  class: string;
  colorClass: string;
};

type HiddenFee = {
  name: string;
  type: string;
  monthlyCost: number;
  recommendation: string;
};

type TrialDetection = {
  service: string;
  daysLeft: number;
  copy: string;
  monthlyCost: number;
};

const STORAGE_KEY = "leak-radar-state-v3";
const LEGACY_STORAGE_KEYS = ["leak-radar-state-v2"];

const categories = [
  "Streaming",
  "Penyimpanan",
  "Biaya Bank",
  "Uji Coba",
  "Kebugaran",
  "Produktivitas",
  "Utilitas",
  "Lainnya",
];

const toTestId = (value: string) =>
  value
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

const CurrencyInput = defineComponent({
  props: {
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Number,
      required: true,
    },
    testId: {
      type: String,
      default: undefined,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const formattedValue = computed(() => {
      if (!props.modelValue) {
        return "";
      }

      return new Intl.NumberFormat("id-ID", {
        maximumFractionDigits: 0,
      }).format(props.modelValue);
    });

    const parseCurrency = (value: string) => {
      const numericValue = Number(value.replace(/\D/g, ""));

      return Number.isFinite(numericValue) ? numericValue : 0;
    };

    return () =>
      h("label", { class: "block" }, [
        h("span", { class: "text-sm font-bold text-slate-300" }, props.label),
        h(
          "div",
          {
            class:
              "mt-2 flex overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 focus-within:border-cyan-300",
          },
          [
            h(
              "span",
              {
                class:
                  "grid place-items-center border-r border-white/10 px-4 text-sm font-black text-cyan-100",
              },
              "Rp",
            ),
            h("input", {
              class:
                "min-w-0 flex-1 bg-transparent px-4 py-3 text-white outline-none",
              "data-testid": props.testId,
              inputmode: "numeric",
              placeholder: "0",
              type: "text",
              value: formattedValue.value,
              onInput: (event: Event) => {
                emit(
                  "update:modelValue",
                  parseCurrency((event.target as HTMLInputElement).value),
                );
              },
            }),
          ],
        ),
      ]);
  },
});

const menus: {
  id: MenuId;
  label: string;
  icon: string;
  title: string;
  kicker: string;
}[] = [
  {
    id: "overview",
    label: "Ringkasan",
    icon: "⌁",
    title: "Ringkasan Kebocoran Finansial",
    kicker: "Dasbor",
  },
  {
    id: "monthly",
    label: "Bulanan",
    icon: "▤",
    title: "Pelacakan Keuangan Bulanan",
    kicker: "Arus Kas",
  },
  {
    id: "radar",
    label: "Radar Bocor",
    icon: "◉",
    title: "Radar Tingkat Kebocoran",
    kicker: "Visualisasi",
  },
  {
    id: "subscriptions",
    label: "Langganan",
    icon: "▦",
    title: "Manajer Langganan",
    kicker: "Kelola Lokal",
  },
  {
    id: "fees",
    label: "Biaya Tersembunyi",
    icon: "◇",
    title: "Pencari Biaya Pintar",
    kicker: "Deteksi",
  },
  {
    id: "trialGuard",
    label: "Penjaga Uji Coba",
    icon: "◐",
    title: "Perlindungan Uji Coba",
    kicker: "Konsep Ekstensi",
  },
  {
    id: "killSwitch",
    label: "Sakelar Batal",
    icon: "×",
    title: "Antrean Pembatalan Massal",
    kicker: "Pusat Aksi",
  },
];

const activeMenu = ref<MenuId>("overview");
const editingId = ref<number | null>(null);
const editingMonthlyId = ref<number | null>(null);
const killQueue = ref<number[]>([]);
const hasHydrated = ref(false);
const hoveredRadarId = ref<number | null>(null);
const selectedRadarLeak = ref<Subscription | null>(null);
const actionMessage = ref("");
const fixedFees = ref<string[]>([]);

const subscriptions = ref<Subscription[]>([]);

const monthlyRecords = ref<MonthlyRecord[]>([]);

const cloneSubscriptions = (items: Subscription[]) =>
  items.map((subscription) => ({ ...subscription }));

const cloneMonthlyRecords = (items: MonthlyRecord[]) =>
  items.map((record) => ({ ...record }));

const defaultSubscriptions = cloneSubscriptions(subscriptions.value);
const defaultMonthlyRecords = cloneMonthlyRecords(monthlyRecords.value);
const defaultKillQueue = [...killQueue.value];

const subscriptionForm = ref<SubscriptionForm>({
  name: "",
  category: categories[0],
  monthlyCost: 0,
  lastUsedDate: new Date().toISOString().slice(0, 10),
  signal: "",
  trialGuarded: false,
});

const monthlyForm = ref<MonthlyForm>({
  month: new Date().toISOString().slice(0, 7),
  income: 0,
  essentialSpend: 0,
  discretionarySpend: 0,
  savingsGoal: 0,
  note: "",
});

const activePage = computed(
  () => menus.find((menu) => menu.id === activeMenu.value) ?? menus[0],
);
const sortedMonthlyRecords = computed(() =>
  [...monthlyRecords.value].sort((left, right) =>
    right.month.localeCompare(left.month),
  ),
);
const currentMonthlyRecord = computed(() => sortedMonthlyRecords.value[0]);

const monthlyLeakage = computed(() =>
  subscriptions.value.reduce(
    (sum, subscription) => sum + subscription.monthlyCost,
    0,
  ),
);

const leakCount = computed(
  () =>
    subscriptions.value.filter((subscription) => subscription.risk !== "low")
      .length,
);
const leakIndex = computed(() =>
  Math.min(99, Math.round(monthlyLeakage.value / 10000)),
);
const highRiskSubscriptions = computed(() =>
  subscriptions.value.filter((subscription) => subscription.risk === "high"),
);

const fees = computed<HiddenFee[]>(() =>
  subscriptions.value
    .filter((subscription) => {
      const signal = subscription.signal.toLowerCase();

      return (
        subscription.category === "Biaya Bank" ||
        signal.includes("biaya") ||
        signal.includes("fee") ||
        signal.includes("admin") ||
        signal.includes("tersembunyi")
      );
    })
    .map((subscription) => ({
      name: subscription.name,
      type:
        subscription.category === "Biaya Bank" ? "Biaya Bank" : "Tersembunyi",
      monthlyCost: subscription.monthlyCost,
      recommendation:
        "Tinjau sumber tagihan, ubah metode pembayaran, atau hentikan biaya dari penyedia.",
    })),
);

const trials = computed<TrialDetection[]>(() =>
  subscriptions.value
    .filter((subscription) => {
      const signal = subscription.signal.toLowerCase();

      return (
        subscription.category === "Uji Coba" ||
        signal.includes("uji coba") ||
        signal.includes("trial")
      );
    })
    .map((subscription) => ({
      service: subscription.name,
      daysLeft: subscription.trialGuarded ? 0 : 1,
      copy: subscription.signal || "Uji coba perlu dikonfirmasi",
      monthlyCost: subscription.monthlyCost,
    })),
);

const topMetrics = computed(() => [
  { label: "Bocor bulanan", value: formatCurrency(monthlyLeakage.value) },
  { label: "Potensi tahunan", value: formatCurrency(monthlyLeakage.value * 12) },
  { label: "Antrean batal", value: `${killQueue.value.length}` },
]);

const insightCards = computed(() => [
  {
    label: "Kebocoran bulanan",
    value: formatCurrency(monthlyLeakage.value),
    caption: "Pengeluaran berulang terdeteksi",
    tone: "text-rose-300",
  },
  {
    label: "Potensi diselamatkan",
    value: formatCurrency(monthlyLeakage.value * 12),
    caption: "Jika semua kebocoran dihentikan",
    tone: "text-emerald-300",
  },
  {
    label: "Dampak target tabungan",
    value: formatCurrency(currentSavingsGap.value),
    caption: "Bulan berjalan setelah kebocoran",
    tone: "text-amber-300",
  },
]);

const priorityAlerts = computed(() => {
  const trialLeak = subscriptions.value.find(
    (subscription) =>
      subscription.category === "Uji Coba" ||
      subscription.signal.toLowerCase().includes("uji coba") ||
      subscription.signal.toLowerCase().includes("trial"),
  );
  const largestLeak = [...subscriptions.value].sort(
    (left, right) => right.monthlyCost - left.monthlyCost,
  )[0];
  const unresolvedFee = fees.value.find(
    (fee) => !fixedFees.value.includes(fee.name),
  );
  const alerts: {
    title: string;
    copy: string;
    level: string;
    class: string;
    target: MenuId;
  }[] = [];

  if (trialLeak) {
    alerts.push({
      title: `${trialLeak.name} perlu dijaga`,
      copy: `${trialLeak.signal}. Nilai risiko ${formatCurrency(trialLeak.monthlyCost)}/bln.`,
      level: "Tinggi",
      class: "bg-rose-300 text-rose-950",
      target: "trialGuard",
    });
  }

  if (largestLeak) {
    alerts.push({
      title: `${largestLeak.name} kebocoran terbesar`,
      copy: `${formatCurrency(largestLeak.monthlyCost)} mengurangi ruang tabungan setiap bulan.`,
      level: largestLeak.risk === "high" ? "Tinggi" : "Pantau",
      class:
        largestLeak.risk === "high"
          ? "bg-rose-300 text-rose-950"
          : "bg-amber-300 text-amber-950",
      target: "radar",
    });
  }

  if (unresolvedFee) {
    alerts.push({
      title: `${unresolvedFee.name} belum diperbaiki`,
      copy: unresolvedFee.recommendation,
      level: "Perbaiki",
      class: "bg-cyan-300 text-slate-950",
      target: "fees",
    });
  }

  if (alerts.length === 0) {
    alerts.push({
      title: "Belum ada data untuk diaudit",
      copy: "Tambahkan langganan atau catatan bulanan agar dasbor bisa menghitung kebocoran.",
      level: "Mulai",
      class: "bg-cyan-300 text-slate-950",
      target: "subscriptions",
    });
  }

  return alerts;
});

const monthlySummaryCards = computed(() => {
  const record = currentMonthlyRecord.value;

  if (!record) {
    return [];
  }

  const totalSpend =
    record.essentialSpend + record.discretionarySpend + monthlyLeakage.value;
  const netAfterLeaks = getNetAfterLeaks(record);
  const leakRatio =
    record.income > 0 ? (monthlyLeakage.value / record.income) * 100 : 0;

  return [
    {
      label: "Total pengeluaran + bocor",
      value: formatCurrency(totalSpend),
      caption: `${leakRatio.toFixed(1)}% pemasukan menjadi kebocoran`,
      tone: "text-rose-300",
    },
    {
      label: "Sisa setelah bocor",
      value: formatCurrency(netAfterLeaks),
      caption: "Pemasukan dikurangi pengeluaran dan kebocoran",
      tone: netAfterLeaks >= 0 ? "text-emerald-300" : "text-rose-300",
    },
    {
      label: "Selisih target tabungan",
      value: formatCurrency(currentSavingsGap.value),
      caption: "Nilai positif berarti target belum tercapai",
      tone: currentSavingsGap.value > 0 ? "text-amber-300" : "text-emerald-300",
    },
  ];
});

const currentSavingsGap = computed(() => {
  const record = currentMonthlyRecord.value;

  if (!record) {
    return 0;
  }

  return record.savingsGoal - getNetAfterLeaks(record);
});

const radarPositions = [
  "left-[67%] top-[21%]",
  "left-[24%] top-[38%]",
  "left-[56%] top-[68%]",
  "left-[31%] top-[72%]",
  "left-[77%] top-[54%]",
  "left-[42%] top-[18%]",
  "left-[18%] top-[58%]",
  "left-[70%] top-[76%]",
];

const radarMarkers = computed<RadarMarker[]>(() =>
  subscriptions.value.map((subscription, index) => ({
    subscription,
    class: `${radarPositions[index % radarPositions.length]} ${getRadarSizeClass(subscription)}`,
    colorClass: getRadarColorClass(subscription.risk),
  })),
);

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));

const formatMonth = (value: string) =>
  new Intl.DateTimeFormat("id-ID", {
    month: "long",
    year: "numeric",
  }).format(new Date(`${value}-01`));

const getNetAfterLeaks = (record: MonthlyRecord) =>
  record.income -
  record.essentialSpend -
  record.discretionarySpend -
  monthlyLeakage.value;

const getNextId = (records: { id: number }[]) =>
  records.length > 0 ? Math.max(...records.map((record) => record.id)) + 1 : 1;

const getDaysSinceUsed = (lastUsedDate: string) => {
  const lastUsedTime = new Date(lastUsedDate).getTime();

  if (!Number.isFinite(lastUsedTime)) {
    return 0;
  }

  return Math.max(0, Math.floor((Date.now() - lastUsedTime) / 86_400_000));
};

const getRadarSizeClass = (subscription: Subscription) => {
  if (subscription.monthlyCost >= 150000 || subscription.risk === "high") {
    return "size-6";
  }

  if (subscription.monthlyCost >= 75000 || subscription.risk === "medium") {
    return "size-5";
  }

  return "size-4";
};

const getRadarColorClass = (risk: Subscription["risk"]) => {
  if (risk === "high") {
    return "bg-rose-300";
  }

  if (risk === "medium") {
    return "bg-amber-300";
  }

  return "bg-emerald-300";
};

const getRiskClass = (risk: Subscription["risk"]) => {
  if (risk === "high") {
    return "text-rose-300";
  }

  if (risk === "medium") {
    return "text-amber-300";
  }

  return "text-emerald-300";
};

const getRiskLabel = (risk: Subscription["risk"]) => {
  if (risk === "high") {
    return "TINGGI";
  }

  if (risk === "medium") {
    return "SEDANG";
  }

  return "RENDAH";
};

const setActionMessage = (message: string) => {
  actionMessage.value = message;
};

const openRadarLeak = (subscription: Subscription) => {
  selectedRadarLeak.value = subscription;
};

const queueLeakForCancellation = (subscription: Subscription) => {
  if (!killQueue.value.includes(subscription.id)) {
    killQueue.value = [...killQueue.value, subscription.id];
    setActionMessage(`${subscription.name} masuk ke antrean Sakelar Batal.`);
  } else {
    setActionMessage(`${subscription.name} sudah ada di antrean Sakelar Batal.`);
  }
};

const fixFee = (feeName: string) => {
  if (!fixedFees.value.includes(feeName)) {
    fixedFees.value = [...fixedFees.value, feeName];
    subscriptions.value = subscriptions.value.filter(
      (subscription) => subscription.name !== feeName,
    );
    killQueue.value = killQueue.value.filter((queuedId) =>
      subscriptions.value.some((subscription) => subscription.id === queuedId),
    );
    if (selectedRadarLeak.value?.name === feeName) {
      selectedRadarLeak.value = null;
    }
    setActionMessage(`${feeName} ditandai sudah diperbaiki.`);
  }
};

const guardTrial = (trial: TrialDetection) => {
  const existingSubscription = subscriptions.value.find(
    (subscription) => subscription.name === trial.service,
  );

  if (existingSubscription) {
    subscriptions.value = subscriptions.value.map((subscription) =>
      subscription.id === existingSubscription.id
        ? {
            ...subscription,
            category: "Uji Coba",
            signal: `${trial.copy}; ditagih dalam ${trial.daysLeft} hari`,
            monthlyCost: trial.monthlyCost,
            trialGuarded: true,
            risk: "high",
          }
        : subscription,
    );
  } else {
    subscriptions.value.unshift({
      id: getNextId(subscriptions.value),
      name: trial.service,
      category: "Uji Coba",
      monthlyCost: trial.monthlyCost,
      lastUsedDate: new Date().toISOString().slice(0, 10),
      signal: `${trial.copy}; ditagih dalam ${trial.daysLeft} hari`,
      risk: "high",
      trialGuarded: true,
    });
  }

  setActionMessage(`${trial.service} sekarang dijaga oleh Penjaga Uji Coba.`);
};

const guardAllTrials = () => {
  trials.value.forEach((trial) => guardTrial(trial));
  setActionMessage("Semua uji coba terdeteksi sudah dijaga.");
};

const runKillSwitch = () => {
  const queuedIds = new Set(killQueue.value);
  const cancelledCount = subscriptions.value.filter((subscription) =>
    queuedIds.has(subscription.id),
  ).length;

  subscriptions.value = subscriptions.value.filter(
    (subscription) => !queuedIds.has(subscription.id),
  );
  killQueue.value = [];
  selectedRadarLeak.value = null;
  setActionMessage(`${cancelledCount} langganan diproses lewat Sakelar Batal.`);
};

const editLeakFromRadar = (subscription: Subscription) => {
  editSubscription(subscription);
  selectedRadarLeak.value = null;
  activeMenu.value = "subscriptions";
};

const resetForm = () => {
  editingId.value = null;
  subscriptionForm.value = {
    name: "",
    category: categories[0],
    monthlyCost: 0,
    lastUsedDate: new Date().toISOString().slice(0, 10),
    signal: "",
    trialGuarded: false,
  };
};

const resetMonthlyForm = () => {
  editingMonthlyId.value = null;
  monthlyForm.value = {
    month: new Date().toISOString().slice(0, 7),
    income: 0,
    essentialSpend: 0,
    discretionarySpend: 0,
    savingsGoal: 0,
    note: "",
  };
};

const resetAllData = () => {
  localStorage.removeItem(STORAGE_KEY);
  LEGACY_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
  subscriptions.value = cloneSubscriptions(defaultSubscriptions);
  monthlyRecords.value = cloneMonthlyRecords(defaultMonthlyRecords);
  killQueue.value = [...defaultKillQueue];
  fixedFees.value = [];
  selectedRadarLeak.value = null;
  activeMenu.value = "overview";
  resetForm();
  resetMonthlyForm();
  setActionMessage(
    "Data lokal dihapus. Semua fitur CRUD siap dipakai dari awal.",
  );
};

const saveSubscription = () => {
  if (editingId.value) {
    subscriptions.value = subscriptions.value.map((subscription) =>
      subscription.id === editingId.value
        ? {
            ...subscription,
            ...subscriptionForm.value,
            risk: getRisk(subscriptionForm.value),
          }
        : subscription,
    );
  } else {
    subscriptions.value.unshift({
      id: getNextId(subscriptions.value),
      ...subscriptionForm.value,
      risk: getRisk(subscriptionForm.value),
    });
  }

  setActionMessage("Data langganan berhasil disimpan.");
  resetForm();
};

const saveMonthlyRecord = () => {
  if (editingMonthlyId.value) {
    monthlyRecords.value = monthlyRecords.value.map((record) =>
      record.id === editingMonthlyId.value
        ? { ...record, ...monthlyForm.value }
        : record,
    );
  } else {
    monthlyRecords.value.unshift({
      id: getNextId(monthlyRecords.value),
      ...monthlyForm.value,
    });
  }

  setActionMessage("Catatan bulanan berhasil disimpan.");
  resetMonthlyForm();
};

const editSubscription = (subscription: Subscription) => {
  editingId.value = subscription.id;
  subscriptionForm.value = {
    name: subscription.name,
    category: subscription.category,
    monthlyCost: subscription.monthlyCost,
    lastUsedDate: subscription.lastUsedDate,
    signal: subscription.signal,
    trialGuarded: subscription.trialGuarded,
  };
};

const editMonthlyRecord = (record: MonthlyRecord) => {
  editingMonthlyId.value = record.id;
  monthlyForm.value = {
    month: record.month,
    income: record.income,
    essentialSpend: record.essentialSpend,
    discretionarySpend: record.discretionarySpend,
    savingsGoal: record.savingsGoal,
    note: record.note,
  };
};

const deleteSubscription = (id: number) => {
  subscriptions.value = subscriptions.value.filter(
    (subscription) => subscription.id !== id,
  );
  killQueue.value = killQueue.value.filter((queuedId) => queuedId !== id);

  if (editingId.value === id) {
    resetForm();
  }

  setActionMessage("Langganan berhasil dihapus.");
};

const deleteMonthlyRecord = (id: number) => {
  monthlyRecords.value = monthlyRecords.value.filter(
    (record) => record.id !== id,
  );

  if (editingMonthlyId.value === id) {
    resetMonthlyForm();
  }

  setActionMessage("Catatan bulanan berhasil dihapus.");
};

const getRisk = (subscription: SubscriptionForm): Subscription["risk"] => {
  const text = `${subscription.category} ${subscription.signal}`.toLowerCase();
  const daysSinceUsed = getDaysSinceUsed(subscription.lastUsedDate);

  if (
    subscription.trialGuarded ||
    text.includes("trial") ||
    text.includes("uji coba") ||
    text.includes("tomorrow") ||
    text.includes("besok") ||
    daysSinceUsed >= 60
  ) {
    return "high";
  }

  if (
    text.includes("fee") ||
    text.includes("biaya") ||
    text.includes("duplicate") ||
    text.includes("duplikat") ||
    subscription.monthlyCost >= 100000
  ) {
    return "medium";
  }

  return "low";
};

const translateCategory = (category: string) => {
  const categoryMap: Record<string, string> = {
    Storage: "Penyimpanan",
    "Bank Fee": "Biaya Bank",
    Trial: "Uji Coba",
    Fitness: "Kebugaran",
    Productivity: "Produktivitas",
    Utilities: "Utilitas",
    Other: "Lainnya",
  };

  return categoryMap[category] ?? category;
};

const translateSignal = (signal: string) => {
  const signalMap: Record<string, string> = {
    "No activity in 64 days": "Tidak aktif selama 64 hari",
    "Duplicate storage plan": "Paket penyimpanan duplikat",
    "Recurring ghost fee": "Biaya tersembunyi berulang",
    "Trial converts tomorrow": "Uji coba berubah tagihan besok",
    "Last workout 93 days ago": "Terakhir dipakai 93 hari lalu",
    "Needs review": "Perlu ditinjau",
  };

  return signalMap[signal] ?? signal;
};

const normalizeSubscription = (
  subscription: Partial<Subscription> & { lastUsed?: string },
): Subscription => {
  const normalized = {
    id: subscription.id ?? Date.now(),
    name: subscription.name ?? "Langganan Tanpa Nama",
    category: translateCategory(subscription.category ?? categories[0]),
    monthlyCost: Number(subscription.monthlyCost ?? 0),
    lastUsedDate:
      subscription.lastUsedDate ?? new Date().toISOString().slice(0, 10),
    signal: translateSignal(subscription.signal ?? subscription.lastUsed ?? "Perlu ditinjau"),
    risk: subscription.risk ?? "low",
    trialGuarded: Boolean(subscription.trialGuarded ?? (subscription as { trialDijaga?: boolean }).trialDijaga),
  } satisfies Subscription;

  return {
    ...normalized,
    risk: getRisk(normalized),
  };
};

const persistState = () => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      activeMenu: activeMenu.value,
      subscriptions: subscriptions.value,
      monthlyRecords: monthlyRecords.value,
      killQueue: killQueue.value,
      fixedFees: fixedFees.value,
    }),
  );
};

onMounted(() => {
  LEGACY_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));

  const savedState = localStorage.getItem(STORAGE_KEY);

  if (savedState) {
    try {
      const parsedState = JSON.parse(savedState) as {
        activeMenu?: MenuId;
        subscriptions?: Subscription[];
        monthlyRecords?: MonthlyRecord[];
        killQueue?: number[];
        fixedFees?: string[];
      };

      if (
        parsedState.activeMenu &&
        menus.some((menu) => menu.id === parsedState.activeMenu)
      ) {
        activeMenu.value = parsedState.activeMenu;
      }

      if (Array.isArray(parsedState.subscriptions)) {
        subscriptions.value = parsedState.subscriptions.map((subscription) =>
          normalizeSubscription(subscription),
        );
      }

      if (Array.isArray(parsedState.monthlyRecords)) {
        monthlyRecords.value = parsedState.monthlyRecords;
      }

      if (Array.isArray(parsedState.killQueue)) {
        killQueue.value = parsedState.killQueue;
      }

      if (Array.isArray(parsedState.fixedFees)) {
        fixedFees.value = parsedState.fixedFees;
      }

      killQueue.value = killQueue.value.filter((queuedId) =>
        subscriptions.value.some(
          (subscription) => subscription.id === queuedId,
        ),
      );
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  hasHydrated.value = true;
});

watch(
  [activeMenu, subscriptions, monthlyRecords, killQueue, fixedFees],
  () => {
    if (hasHydrated.value) {
      persistState();
    }
  },
  { deep: true },
);
</script>
