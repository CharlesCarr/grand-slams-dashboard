"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

function EnterDashBtn() {
  const router = useRouter();

  return (
    <Button className="w-full" onClick={() => router.push("/dashboard")}>
      View Dashboard
    </Button>
  );
}

export default EnterDashBtn;
