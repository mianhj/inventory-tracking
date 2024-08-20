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
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Product from '@/types/Product';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export type DeleteProductModalProps = {
  open: boolean;
  onClose: () => void;
  product: Product;
  onDelete: () => void;
};

function DeleteProductModal({
  open,
  onClose,
  product,
  onDelete,
}: DeleteProductModalProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/products/' + product.id, {
        method: 'DELETE',
      });

      if (res.status === 200) {
        const { dismiss } = toast({
          title: 'Deleted Successfully',
          description: `${product.name} has been deleted successfuly.`,
        });
        setTimeout(dismiss, 5000);
        onClose();
        onDelete?.();
      } else if (res.status === 403) {
        router.push('login');
      } else {
        throw await res.json();
      }
    } catch (err: any) {
      const { dismiss } = toast({
        title: 'Delete Failed',
        description: err.error,
        className: 'bg-red-600 text-white',
      });

      setTimeout(dismiss, 5000);
    } finally {
      setLoading(false);
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={() => onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {product.name}</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this product?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <Button onClick={handleDelete} variant="destructive">
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteProductModal;
