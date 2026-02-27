"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

interface FormValues {
  name: string;
  email: string;
  phone?: string;
  wechat?: string;
  visaType?: string;
  state: string;
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
            <p className="mt-1 text-xs text-red-primary">{t("validationName")}</p>
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
            <p className="mt-1 text-xs text-red-primary">{t("validationEmail")}</p>
          )}
        </div>
      </div>

      {/* Phone + WeChat row */}
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
            {t("wechat")}
          </label>
          <input
            type="text"
            placeholder={t("wechatPlaceholder")}
            className={inputBase}
            {...register("wechat")}
          />
        </div>
      </div>

      {/* Visa Type + State of Residence row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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

        <div>
          <label className="block text-xs font-medium text-muted uppercase tracking-wider mb-1.5">
            {t("state")}{" "}
            <span className="text-red-primary normal-case font-normal tracking-normal">
              {t("required")}
            </span>
          </label>
          <select
            className={`${inputBase} cursor-pointer ${errors.state ? inputError : ""}`}
            defaultValue=""
            {...register("state", { required: true })}
          >
            <option value="" disabled>{t("statePlaceholder")}</option>
            <option value="Alabama">{t("states.alabama")}</option>
            <option value="Arkansas">{t("states.arkansas")}</option>
            <option value="Delaware">{t("states.delaware")}</option>
            <option value="District of Columbia">{t("states.dc")}</option>
            <option value="Florida">{t("states.florida")}</option>
            <option value="Georgia">{t("states.georgia")}</option>
            <option value="Kentucky">{t("states.kentucky")}</option>
            <option value="Louisiana">{t("states.louisiana")}</option>
            <option value="Maryland">{t("states.maryland")}</option>
            <option value="Mississippi">{t("states.mississippi")}</option>
            <option value="North Carolina">{t("states.northCarolina")}</option>
            <option value="Oklahoma">{t("states.oklahoma")}</option>
            <option value="Puerto Rico">{t("states.puertoRico")}</option>
            <option value="South Carolina">{t("states.southCarolina")}</option>
            <option value="Tennessee">{t("states.tennessee")}</option>
            <option value="Texas">{t("states.texas")}</option>
            <option value="Virginia">{t("states.virginia")}</option>
            <option value="West Virginia">{t("states.westVirginia")}</option>
          </select>
          {errors.state && (
            <p className="mt-1 text-xs text-red-primary">{t("validationState")}</p>
          )}
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
          <p className="mt-1 text-xs text-red-primary">{t("validationMessage")}</p>
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
