import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, Control, Path, FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import PassResetDialog from "@/components/pass-reset-dialog";

interface PassProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  passComplete?: "new-password" | "current-password";
  forgetPass?: boolean;
}

export default function PassController<TFieldValues extends FieldValues>({
  control,
  name,
  passComplete,
  forgetPass,
}: PassProps<TFieldValues>) {
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("password");
  const [toggle, setToggle] = useState(<Eye />);

  const showPass = () => {
    const next = !visible;
    setVisible(next);
    setType(next ? "text" : "password");
    setToggle(next ? <EyeOff /> : <Eye />);
  };

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Field>
            <div className="relative">
              <FieldLabel htmlFor={field.name}>Password</FieldLabel>

              {forgetPass && (
                <Dialog>
                  <DialogTrigger asChild>
                    <span className="absolute right-0 top-0 text-sm font-semibold text-blue-500">
                      Forget Password?
                    </span>
                  </DialogTrigger>
                  <PassResetDialog />
                </Dialog>
              )}
            </div>

            <div className="relative">
              <Input
                {...field}
                type={type}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="●●●●●●●●●●"
                autoComplete={passComplete}
                className="pr-10"
              />

              <Button
                type="button"
                variant="ghost"
                size="icon-lg"
                onClick={showPass}
                className="absolute right-0 -top-0.5"
              >
                {toggle}
              </Button>
            </div>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </>
  );
}
