import { auth } from "@/auth";
import Login from "@/components/auth/login";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const LoginPage = async () => {
    const session = await auth();
    console.log("user->", session?.user);
    return (
        <Login

        />
    )
}

export default LoginPage;