import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex h-screen flex-col justify-center items-center">
            <h1>404 | This page could not be found.</h1>
            <Link href="/">
                <Button variant="secondary" className="mt-4">
                    Return Home
                </Button>
            </Link>
        </div>
    );
}
