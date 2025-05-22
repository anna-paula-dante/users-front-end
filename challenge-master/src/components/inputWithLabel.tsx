import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormFieldControl {
  labelText?: string;
  htmlFor: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export function InputWithLabel({
  labelText,
  htmlFor,
  placeholder,
  value = "",
  ...props
}: FormFieldControl) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={htmlFor}>{labelText}</Label>
      <Input id={htmlFor} placeholder={placeholder} value={value} {...props} />
    </div>
  );
}
