import Button from "@/components/Button";
// import { getUser } from "@/utils/getUser";
import Link from "next/link";

export default async function IndexPage() {
  return (
    <div className="flex h-[100vh] items-center justify-center">
      <Button>
        <Link href="/register" prefetch={false}>
          Register
        </Link>
      </Button>
      <Button>
        <Link href="/login" prefetch={false}>
          Login
        </Link>
      </Button>
    </div>
  );
}
