# -*- coding: utf-8 -*-
"""
build_gaijinblog_movein_table.py -- Le tableau move-in costs commande par Fernando
(GaijinBlog) le 03/09/2026, a SON format: depot, key money, frais d'agence, societe
de garantie, 1er mois, total estime, + le nombre d'observations par ward.

⚠️ LA REGLE QUI TIENT L'ARTICLE: separer ce qui est MESURE de ce qui est CONVENTION.
  - MESURE (annonces actives): loyer, depot 敷金, key money 礼金.
  - CONVENTION (jamais publie dans une annonce): frais d'agence, societe de garantie.
Les colonnes convention sont prefixees "convention_" pour qu'aucune relecture ne
puisse les confondre avec de la donnee.

Depend de generate_entry_cost_by_ward_chart.py (meme calcul, meme source).

  python scripts/build_gaijinblog_movein_table.py
"""
import io
import sys
from pathlib import Path

import pandas as pd

sys.path.insert(0, str(Path(__file__).parent))
from generate_entry_cost_by_ward_chart import load  # noqa: E402

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

ROOT = Path("C:/Users/alegu/Desktop/tokyo-expat")

# Conventions de marche, assumees et etiquetees comme telles.
AGENCY_MONTHS = 1.10   # 1 mois + 10 % de taxe a la consommation (plafond legal residentiel)
GUARANTOR_MONTHS = 0.50  # part initiale usuelle: 50 % du 1er mois (fourchette 50-100 %)


def main():
    d, g = load()
    g = g.sort_values("median_rent_jpy" if "median_rent_jpy" in g else "rent_med",
                      ascending=False)

    out = pd.DataFrame({
        "ward": g["ward_en"],
        "ward_jp": g.index,
        "listings_observed": g["n"].astype(int),
        "measured_first_month_rent_jpy": g["rent_med"].round(0).astype(int),
        "measured_deposit_shikikin_jpy": g["dep_med"].round(0).astype(int),
        "measured_pct_listings_no_deposit": g["zero_dep"].round(1),
        "measured_key_money_reikin_jpy": g["key_med"].round(0).astype(int),
        "measured_pct_listings_no_key_money": g["zero_key"].round(1),
    })

    out["measured_subtotal_jpy"] = (
        out["measured_first_month_rent_jpy"]
        + out["measured_deposit_shikikin_jpy"]
        + out["measured_key_money_reikin_jpy"]
    )
    out["convention_agency_fee_jpy"] = (
        out["measured_first_month_rent_jpy"] * AGENCY_MONTHS).round(0).astype(int)
    out["convention_guarantor_fee_jpy"] = (
        out["measured_first_month_rent_jpy"] * GUARANTOR_MONTHS).round(0).astype(int)
    out["estimated_total_upfront_jpy"] = (
        out["measured_subtotal_jpy"]
        + out["convention_agency_fee_jpy"]
        + out["convention_guarantor_fee_jpy"]
    )
    out["estimated_total_in_months_of_rent"] = (
        out["estimated_total_upfront_jpy"] / out["measured_first_month_rent_jpy"]).round(2)

    csv = ROOT / "outreach" / "gaijinblog-movein-costs-by-ward.csv"
    out.to_csv(csv, index=False, encoding="utf-8-sig")
    print(f"Ecrit: {csv}")

    print(f"\nn total = {len(d):,} annonces | wards = {len(out)}")
    print(f"observations par ward: {out['listings_observed'].min():,} a "
          f"{out['listings_observed'].max():,}")
    print(f"total estime median: ¥{out['estimated_total_upfront_jpy'].median():,.0f} "
          f"({out['estimated_total_in_months_of_rent'].median():.2f} mois de loyer)")
    print(f"\nle plus cher : {out.iloc[0]['ward']} "
          f"¥{out.iloc[0]['estimated_total_upfront_jpy']:,}")
    print(f"le moins cher: {out.iloc[-1]['ward']} "
          f"¥{out.iloc[-1]['estimated_total_upfront_jpy']:,}")
    print("\n" + out[["ward", "listings_observed", "measured_first_month_rent_jpy",
                      "measured_deposit_shikikin_jpy", "measured_key_money_reikin_jpy",
                      "estimated_total_upfront_jpy",
                      "estimated_total_in_months_of_rent"]].to_string(index=False))


if __name__ == "__main__":
    main()
