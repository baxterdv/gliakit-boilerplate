import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/*
 * The theme's control heights (h-control, size-control-sm…, from
 * globals.css) are heights and sizes like h-9: a later h-6 or size-7 must
 * replace them, not sit beside them and lose to the custom utility.
 */
const CONTROL = ["control", "control-sm", "control-lg"]
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      h: [{ h: CONTROL }],
      "min-h": [{ "min-h": CONTROL }],
      size: [{ size: CONTROL }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
