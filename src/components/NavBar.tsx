import { getServerSession } from "next-auth"
import Link from "next/link";
import { buttonVariants } from "@/ui/Button";
import SignInButton from "@/components/SignInButton";
import SignOutButton from "@/components/SignOutButton";

const NavBar = async () => {
    const session = await getServerSession();

    return <div className="fixed backdrop-blur-sm bg-white/75 dark:bg-slate-900 z-50 top-0 right-0 h-20 border-b border-slate-300 dark:border-slate-700 shadow-sm flex items-center justify-between w-full">
        <div className="container max-w-7xl mx-auto w-full justify-between items-center flex">
            <Link href="/" className={buttonVariants({ variant: 'link' })}>
                Similarity API One.O
            </Link>

            <div className="md:hidden">
                {/* <ThemeToggle /> */}
            </div>

            <div className="hidden: md:flex gap-4">
                {/* <ThemeToggle /> */}
                <Link href={'/documentation'} className={buttonVariants({ variant: 'ghost' })}>Documentation</Link>
                {session ? (
                    <>
                        <Link href={"/dashboard"} className={buttonVariants({ variant: 'ghost' })}></Link>
                        <SignOutButton />
                    </>
                ) : <SignInButton />}
            </div>
        </div>
    </div>
}

export default NavBar