"use client";

import { useCalculatorStore } from "@/lib/calculator-store";
import { DISKON_REFF } from "@/lib/data";
import { formatIdr } from "@/lib/utils";
import { Check, AlertCircle, Tag } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const reffSchema = z.object({
  code: z.string().optional(),
});

type ReffForm = z.infer<typeof reffSchema>;

export function ReffInput() {
  const { reffCode, reffValid, reffNama, setReffCode, validateReff } = useCalculatorStore();
  const { register, handleSubmit, formState: { errors } } = useForm<ReffForm>({
    resolver: zodResolver(reffSchema),
    defaultValues: { code: reffCode },
    mode: "onChange",
  });

  const onSubmit = (data: ReffForm) => {
    setReffCode(data.code || "");
    validateReff();
  };

  return (
    <fieldset className="space-y-4">
      <legend className="text-lg font-semibold text-ink flex items-center gap-2">
        <Tag className="h-5 w-5 text-accent" />
        5. Kode Referral (Opsional)
      </legend>
      <p className="text-sm text-ink-muted">Masukkan kode referral untuk potongan {formatIdr(DISKON_REFF)}.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3">
        <div className="flex-1">
          <label htmlFor="reff-code" className="sr-only">Kode referral</label>
          <input
            id="reff-code"
            type="text"
            placeholder="Contoh: BUDI01"
            maxLength={10}
            {...register("code", {
              onChange: (e) => setReffCode(e.target.value.toUpperCase()),
              value: reffCode,
            })}
            className="field text-uppercase tracking-wider"
            autoComplete="off"
          />
          {errors.code && (
            <p className="mt-1 text-xs text-accent" role="alert">Format kode tidak valid</p>
          )}
        </div>
        <button type="submit" className="button-secondary shrink-0 px-5">Cek</button>
      </form>
      {reffCode && (
        <div className={reffValid ? "flex items-center gap-2 text-sm text-lime" : "flex items-center gap-2 text-sm text-accent"} role="status">
          {reffValid ? (
            <>
              <Check className="h-4 w-4 shrink-0" />
              <span>Kode valid — <strong>{reffNama}</strong> (Potongan {formatIdr(DISKON_REFF)})</span>
            </>
          ) : (
            <>
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>Kode <strong>"{reffCode}"</strong> tidak ditemukan atau tidak aktif</span>
            </>
          )}
        </div>
      )}
    </fieldset>
  );
}