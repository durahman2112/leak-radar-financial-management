import { expect, test, type Page } from "@playwright/test";

type SubscriptionFixture = {
  name: string;
  category: string;
  cost: string;
  lastUsed: string;
  signal: string;
  guarded?: boolean;
};

const showStep = async (page: Page, message: string) => {
  await page.evaluate((text) => {
    const existingStep = document.querySelector("[data-demo-step]");
    existingStep?.remove();

    const step = document.createElement("div");
    step.dataset.demoStep = "true";
    step.textContent = text;
    step.style.position = "fixed";
    step.style.left = "50%";
    step.style.bottom = "24px";
    step.style.transform = "translateX(-50%)";
    step.style.zIndex = "9999";
    step.style.maxWidth = "960px";
    step.style.padding = "14px 22px";
    step.style.borderRadius = "999px";
    step.style.border = "1px solid rgba(103, 232, 249, 0.45)";
    step.style.background = "rgba(2, 6, 23, 0.92)";
    step.style.boxShadow = "0 24px 80px rgba(0, 0, 0, 0.45)";
    step.style.color = "white";
    step.style.font = "700 16px Inter, ui-sans-serif, system-ui";
    step.style.textAlign = "center";
    document.body.appendChild(step);
  }, message);

  await page.waitForTimeout(900);
};

const selectMenu = async (page: Page, menuId: string, step: string) => {
  await showStep(page, step);
  await page.getByTestId(`menu-${menuId}`).click();
  await page.waitForTimeout(500);
};

const selectCategory = async (page: Page, category: string) => {
  await page.getByTestId("subscription-category-button").click();
  const categoryTestId = category.toLowerCase().replace(/\s+/g, "-");

  await page.getByTestId(`subscription-category-${categoryTestId}`).click();
};

const addSubscription = async (
  page: Page,
  subscription: SubscriptionFixture,
) => {
  await page.getByTestId("subscription-name").fill(subscription.name);
  await selectCategory(page, subscription.category);
  await page.getByTestId("subscription-cost").fill(subscription.cost);
  await page.getByTestId("subscription-last-used").fill(subscription.lastUsed);
  await page.getByTestId("subscription-signal").fill(subscription.signal);

  if (subscription.guarded) {
    await page.getByTestId("trial-guard-switch").click();
  }

  await page.getByTestId("save-subscription").click();
  await expect(
    page.getByText("Data langganan berhasil disimpan."),
  ).toBeVisible();
};

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.clear());
});

test("records a full Leak Radar product demo video with real data", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByText("Ringkasan Kebocoran Finansial")).toBeVisible();
  await showStep(
    page,
    "Mulai dari dasbor kosong: semua data akan dibuat lewat form CRUD dan disimpan di localStorage.",
  );

  await selectMenu(
    page,
    "monthly",
    "1. Buat catatan bulanan: pemasukan, pengeluaran pokok, pengeluaran fleksibel, dan target tabungan.",
  );
  await page.getByTestId("monthly-month").fill("2026-05");
  await page.getByTestId("monthly-income").fill("18500000");
  await page.getByTestId("monthly-essential").fill("7200000");
  await page.getByTestId("monthly-discretionary").fill("3900000");
  await page.getByTestId("monthly-savings").fill("4500000");
  await page
    .getByTestId("monthly-note")
    .fill("Bulan audit: gaji, cicilan, hiburan, dan target dana darurat.");
  await expect(page.getByTestId("monthly-income")).toHaveValue("18.500.000");
  await page.getByTestId("save-monthly").click();
  await expect(page.getByText("Mei 2026")).toBeVisible();

  await selectMenu(
    page,
    "subscriptions",
    "2. Tambahkan data berulang yang realistis. Data ini menjadi sumber Radar, Biaya Tersembunyi, Trial, dan Sakelar Batal.",
  );
  await addSubscription(page, {
    name: "Netflix Premium Keluarga",
    category: "Streaming",
    cost: "186000",
    lastUsed: "2026-02-20",
    signal: "Tidak aktif selama 90 hari",
  });
  await addSubscription(page, {
    name: "Biaya Admin Bank Prioritas",
    category: "Biaya Bank",
    cost: "35000",
    lastUsed: "2026-05-01",
    signal: "Biaya admin tersembunyi berulang",
  });
  await addSubscription(page, {
    name: "Canva Pro Trial",
    category: "Uji Coba",
    cost: "95000",
    lastUsed: "2026-05-21",
    signal: "Uji coba berubah menjadi tagihan besok",
    guarded: true,
  });
  await expect(page.getByText("Netflix Premium Keluarga")).toBeVisible();
  await expect(page.getByText("Biaya Admin Bank Prioritas")).toBeVisible();
  await expect(page.getByText("Canva Pro Trial")).toBeVisible();

  await selectMenu(
    page,
    "overview",
    "3. Ringkasan otomatis menghitung kebocoran bulanan, potensi tahunan, dan peringatan prioritas dari data yang baru dibuat.",
  );
  await expect(page.getByText("Rp316.000").first()).toBeVisible();

  await selectMenu(
    page,
    "radar",
    "4. Radar menampilkan titik kebocoran. Hover untuk tooltip, klik untuk popup detail kebocoran.",
  );
  const firstMarker = page.getByTestId("radar-marker").first();
  await firstMarker.hover();
  await page.waitForTimeout(800);
  await firstMarker.click();
  await expect(page.getByTestId("radar-detail-dialog")).toBeVisible();
  await page.getByTestId("queue-cancellation").click();
  await expect(
    page
      .getByText(
        /masuk ke antrean Sakelar Batal|sudah ada di antrean Sakelar Batal/,
      )
      .first(),
  ).toBeVisible();
  await page.getByRole("button", { name: "Tutup" }).click();

  await selectMenu(
    page,
    "fees",
    "5. Biaya tersembunyi terbentuk otomatis dari kategori Biaya Bank atau sinyal biaya/admin/fee.",
  );
  await expect(page.getByText("Biaya Admin Bank Prioritas")).toBeVisible();

  await selectMenu(
    page,
    "trialGuard",
    "6. Penjaga Uji Coba membaca langganan kategori Uji Coba dan menandainya sebagai risiko yang perlu dijaga.",
  );
  await expect(page.getByText("Canva Pro Trial")).toBeVisible();

  await selectMenu(
    page,
    "killSwitch",
    "7. Sakelar Batal memproses item dari radar dan menghapus langganan yang sudah masuk antrean.",
  );
  await page.getByTestId("run-kill-switch").click();
  await expect(
    page.getByText(/langganan diproses lewat Sakelar Batal/),
  ).toBeVisible();

  await selectMenu(
    page,
    "overview",
    "Selesai: video ini menunjukkan alur penggunaan dari data kosong sampai keputusan pembatalan.",
  );
  await page.waitForTimeout(1_500);
});
