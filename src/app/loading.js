import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export default function Loading() {
    return (
        <Button disabled variant="secondary">
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Loading...
        </Button>
    );
}
