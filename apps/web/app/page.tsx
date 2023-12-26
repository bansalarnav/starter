import Button from "@/components/Button";
import { getUser } from "@/utils/getUser";
import Link from "next/link";

export default async function IndexPage() {
    const user = await getUser();

    return (
        <div>
            <Button>
                <Link href="/register">Register</Link>
            </Button>
            <Button>
                <Link href="/login">Login</Link>
            </Button>
        </div>
    );
}
