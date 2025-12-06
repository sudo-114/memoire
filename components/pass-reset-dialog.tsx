import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function PassResetDialog() {
  const handleSubmit = () => {
    if (emailRef.current?.value === "") return;
    toast("Reset password", { description: "Email submitted!" });
  };

  const emailRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <DialogContent>
        <DialogTitle>Reset password</DialogTitle>
        <DialogDescription>
          Enter your account&apos;s email address, and we&apos;ll send you a
          link to reset your password.
        </DialogDescription>

        <Input
          type="email"
          ref={emailRef}
          placeholder="jdoe@example.com"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />

        <DialogFooter>
          <div className="flex justify-end gap-x-0.5">
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>

            <Button onClick={handleSubmit}>Continue</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </>
  );
}
