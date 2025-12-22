import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Trash2, AlertTriangle, Heart } from "lucide-react";
import { useDataExport } from "@/hooks/useDataExport";
import { useCompassionateToast } from "@/hooks/useCompassionateToast";

interface AccountDeletionDialogProps {
  trigger?: React.ReactNode;
}

export function AccountDeletionDialog({ trigger }: AccountDeletionDialogProps) {
  const [step, setStep] = useState<'initial' | 'confirm' | 'final'>('initial');
  const [confirmText, setConfirmText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { requestDataDeletion, deleting, exportUserData, exporting } = useDataExport();
  const { toast } = useCompassionateToast();

  const handleExportFirst = async () => {
    try {
      await exportUserData();
      toast({
        title: "Your data is safe",
        description: "We've downloaded a copy of your data for you.",
      });
    } catch {
      // Error handled in hook
    }
  };

  const handleDelete = async () => {
    if (confirmText !== 'DELETE') return;
    
    try {
      await requestDataDeletion();
      setIsOpen(false);
    } catch {
      // Error handled in hook
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setStep('initial');
      setConfirmText('');
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        {trigger || (
          <Button variant="destructive" className="gap-2">
            <Trash2 className="h-4 w-4" />
            Delete My Account
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md">
        {step === 'initial' && (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-[#B87333]" />
                We're sorry to see you go
              </AlertDialogTitle>
              <AlertDialogDescription className="space-y-3">
                <p>
                  Before you leave, we want you to know that your journey matters to us. 
                  Whatever led you here, we hope ThriveMT has been helpful.
                </p>
                <p className="font-medium text-foreground">
                  Would you like to download a copy of your data first?
                </p>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col gap-2 sm:flex-row">
              <Button
                variant="outline"
                onClick={handleExportFirst}
                disabled={exporting}
                className="w-full sm:w-auto"
              >
                {exporting ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Download My Data
              </Button>
              <AlertDialogAction
                onClick={() => setStep('confirm')}
                className="bg-gray-600 hover:bg-gray-700 w-full sm:w-auto"
              >
                Continue to Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </>
        )}

        {step === 'confirm' && (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                This action cannot be undone
              </AlertDialogTitle>
              <AlertDialogDescription className="space-y-3">
                <p>Deleting your account will permanently remove:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Your profile and preferences</li>
                  <li>Journal entries and mood logs</li>
                  <li>Assessment results and progress</li>
                  <li>Messages with your care team</li>
                  <li>All other personal data</li>
                </ul>
                <p className="font-medium text-foreground pt-2">
                  Type "DELETE" to confirm:
                </p>
                <Input
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value.toUpperCase())}
                  placeholder="Type DELETE"
                  className="mt-2"
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setStep('initial')}>
                Go Back
              </AlertDialogCancel>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={confirmText !== 'DELETE' || deleting}
              >
                {deleting ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Delete My Account
              </Button>
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AccountDeletionDialog;
