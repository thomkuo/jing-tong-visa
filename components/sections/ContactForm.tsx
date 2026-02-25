"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

interface FormValues {
  name: string;
  email: string;
  phone?: string;
  visaType?: string;
  message: string;
}

const inputBase =
  "w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-foreground text-sm placeholder:text-muted focus:outline-none focus:border-red-primary/50 transition-colors duration-150";
const inputError =
  "border-red-primary/60 focus:border-red-primary";

export function ContactForm() {
  const t = useTranslations("contactPage");
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    setServerError(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setServerError(true);
      }
    } catch {
      setServerError(true);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-8 bg-surface border border-red-primary/20 rounded-2xl">
        <div className="text-5xl mb-5">✉️</div>
        <h3 className="font-display text-2xl font-bold text-foreground mb-3">
          {t("successTitle")}
        </h3>
        <p className="text-muted max-w-sm leading-relaxed">{t("successText")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      {/* Name + Email row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-medium text-muted uppercase tracking-wider mb-1.5">
            {t("name")}{" "}
            <span className="text-red-primary normal-case font-normal tracking-normal">
              {t("required")}
            </span>
          </label>
          <input
            type="text"
            placeholder={t("namePlaceholder")}
            className={`${inputBase} ${errors.name ? inputError : ""}`}
            {...register("name", {
              required: true,
              minLength: 2,
            })}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-primary">Please enter your name.</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-muted uppercase tracking-wider mb-1.5">
            {t("email")}{" "}
            <span className="text-red-primary normal-case font-normal tracking-normal">
              {t("required")}
            </span>
          </label>
          <input
            type="email"
            placeholder={t("emailPlaceholder")}
            className={`${inputBase} ${errors.email ? inputError : ""}`}
            {...register("email", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-primary">Please enter a valid email.</p>
          )}
        </div>
      </div>

      {/* Phone + Visa Type row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-medium text-muted uppercase tracking-wider mb-1.5">
            {t("phone")}
          </label>
          <input
            type="tel"
            placeholder={t("phonePlaceholder")}
            className={inputBase}
            {...register("phone")}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-muted uppercase tracking-wider mb-1.5">
            {t("visaType")}
          </label>
          <select
            className={`${inputBase} cursor-pointer`}
            {...register("visaType")}
            defaultValue=""
          >
            <option value="" disabled>
              {t("visaTypePlaceholder")}
            </option>
            <option value="Tourist Visa (L Visa)">{t("visaTypes.tourist")}</option>
            <option value="Student Visa (X Visa)">{t("visaTypes.student")}</option>
            <option value="Family Reunion Visa (S Visa)">{t("visaTypes.family")}</option>
            <option value="Business Visa (M Visa)">{t("visaTypes.business")}</option>
            <option value="Other">{t("visaTypes.other")}</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs font-medium text-muted uppercase tracking-wider mb-1.5">
          {t("message")}{" "}
          <span className="text-red-primary normal-case font-normal tracking-normal">
            {t("required")}
          </span>
        </label>
        <textarea
          rows={5}
          placeholder={t("messagePlaceholder")}
          className={`${inputBase} resize-none ${errors.message ? inputError : ""}`}
          {...register("message", { required: true, minLength: 10 })}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-primary">
            Please write a message (at least 10 characters).
          </p>
        )}
      </div>

      {/* Server error */}
      {serverError && (
        <p className="text-sm text-red-primary bg-red-primary/10 border border-red-primary/30 rounded-lg px-4 py-3">
          {t("errorText")}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="self-start bg-red-primary hover:bg-red-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium px-8 py-3 rounded-lg transition-colors duration-200"
      >
        {isSubmitting ? t("sending") : t("submit")}
      </button>
    </form>
  );
}
