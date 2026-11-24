"use client";

import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { AlertDialog as AlertDialogPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

/**
 * Asks before something that can't be undone. Unlike Dialog there is no
 * close button and clicking the scrim does nothing: the user must choose
 * Cancel or the action.
 */
function AlertDialogContent({
  title,
  description,
  className,
  children,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content> & {
  title: string;
  description?: React.ReactNode;
}) {
  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 flex-col gap-2 rounded-lg border border-border bg-card px-5 pt-5 shadow-2xl outline-none",
          className,
        )}
        {...props}
      >
        <AlertDialogPrimitive.Title className="text-base font-semibold text-foreground">
          {title}
        </AlertDialogPrimitive.Title>
        {description && (
          <AlertDialogPrimitive.Description className="text-sm text-muted-foreground">
            {description}
          </AlertDialogPrimitive.Description>
        )}
        {children}
      </AlertDialogPrimitive.Content>
    </AlertDialogPrimitive.Portal>
  );
}

function AlertDialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn("-mx-5 mt-3 flex justify-end gap-2 px-5 pb-5", className)}
      {...props}
    />
  );
}

type ButtonLook = Pick<VariantProps<typeof buttonVariants>, "variant">;

/** The confirming button. Use `variant="destructive"` for deletes. */
function AlertDialogAction({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action> & ButtonLook) {
  return (
    <AlertDialogPrimitive.Action
      data-slot="alert-dialog-action"
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    />
  );
}

function AlertDialogCancel({
  className,
  variant = "ghost",
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel> & ButtonLook) {
  return (
    <AlertDialogPrimitive.Cancel
      data-slot="alert-dialog-cancel"
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    />
  );
}

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
};
