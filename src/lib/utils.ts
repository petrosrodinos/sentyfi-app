import type { AuthUser } from "@/interfaces/auth";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const generateInitials = (value: string) => {
  if (!value) return "AN";
  const names = value.split(" ");
  const initials = names.map((name) => name[0]).join("").toUpperCase();
  return initials;
};

export const formatAuthUser = (data: any): AuthUser => {
  return {
    user_id: data.user.id,
    email: data.user.email,
    access_token: data.session.access_token,
    expires_at: data.session.expires_at,
    avatar: data?.avatar?.url ?? null,
    full_name: data?.full_name ?? "A/N",
  };
};