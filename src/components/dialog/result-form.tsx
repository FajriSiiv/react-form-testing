import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { UserSaaS } from "@/pages/form-saas";

interface ResultDialogProps {
  isSubmitting: boolean;
  isValid: boolean;
  submitData: UserSaaS | null
}

export function ResultDialog({ isSubmitting, isValid, submitData }: ResultDialogProps) {
  return (
    <Dialog>
      <div>
        <DialogTrigger asChild>
          <Button type="submit" disabled={isSubmitting || !isValid} className="">Submit</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Detail your account</DialogTitle>
          </DialogHeader>

          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(submitData, null, 2)}
          </pre>
        </DialogContent>
      </div>
    </Dialog>
  )
}
