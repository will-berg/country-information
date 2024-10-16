import { ModeToggle } from "@/components/ui/mode-toggle";
import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Navbar() {
    return (
        <NavigationMenu className="my-4">
            <NavigationMenuList className="flex text-muted-foreground">
                <NavigationMenuItem>
                    <Link href="/" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Map
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/about" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
							About
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem className="">
                    <Dialog>
                        <DialogTrigger asChild>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Login
                            </NavigationMenuLink>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Login</DialogTitle>
                                <DialogDescription>
                                    Enter your credentials to login to an existing account.
                                </DialogDescription>
                            </DialogHeader>
                            <Input type="username" placeholder="Username" />
                            <Input type="password" placeholder="Password" />
                            <DialogFooter>
                                <Button type="submit">Login</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Dialog>
                        <DialogTrigger asChild>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Sign Up
                            </NavigationMenuLink>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Sign Up</DialogTitle>
                                <DialogDescription>
                                    Enter a username and password to create an account.
                                </DialogDescription>
                            </DialogHeader>
                            <Input type="username" placeholder="Username" />
                            <Input type="password" placeholder="Password" />
                            <DialogFooter>
                                <Button type="submit">Sign Up</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </NavigationMenuItem>
            </NavigationMenuList>
            <ModeToggle />
        </NavigationMenu>
    );
}
