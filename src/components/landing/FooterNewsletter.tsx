import { useId, useState, type FormEvent } from "react";

import { Icon } from "@/components/Icon";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormStatus = "idle" | "invalid" | "unavailable";

export function FooterNewsletter() {
  const inputId = useId();
  const messageId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!EMAIL_PATTERN.test(email.trim())) {
      setStatus("invalid");
      return;
    }

    setStatus("unavailable");
  };

  const message =
    status === "invalid"
      ? "Enter a valid email address."
      : status === "unavailable"
        ? "Newsletter signup isn't connected yet."
        : "";

  return (
    <form className="mt-5 max-w-[360px]" onSubmit={handleSubmit} noValidate>
      <label htmlFor={inputId} className="sr-only">
        Email address
      </label>

      <div
        className={`flex h-12 items-center gap-1.5 p-1 pl-3 ${
          status === "invalid"
            ? "bg-brand/[0.08]"
            : "bg-white/[0.04] focus-within:bg-white/[0.07]"
        }`}
      >
        <input
          id={inputId}
          type="email"
          name="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status !== "idle") setStatus("idle");
          }}
          placeholder="Email address"
          autoComplete="email"
          inputMode="email"
          spellCheck={false}
          maxLength={254}
          aria-invalid={status === "invalid"}
          aria-describedby={messageId}
          className="min-w-0 flex-1 bg-transparent px-0 text-[15px] tracking-[-0.01em] text-text outline-none placeholder:text-faint"
        />

        <button
          type="submit"
          className="inline-flex h-full shrink-0 items-center justify-center gap-1.5 rounded-lg border border-[#2dd4bf] bg-[#2dd4bf] px-3.5 text-[14px] font-medium tracking-[-0.01em] text-[#03201c] shadow-none transition-colors duration-150 hover:bg-[#5eead4]"
        >
          Subscribe
          <Icon name="arrowRight" size={13} />
        </button>
      </div>

      <p
        id={messageId}
        aria-live="polite"
        className={`mt-2 min-h-[16px] text-[13px] leading-[1.5] ${
          status === "invalid" ? "text-brand" : "text-faint"
        }`}
      >
        {message}
      </p>
    </form>
  );
}
