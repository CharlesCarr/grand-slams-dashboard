import EnterDashBtn from "@/components/enter-dash-btn";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function IndexPage() {
  return (
    <div className="w-screen h-screen flex justify-center items-center px-2">
      <Card className="w-full sm:w-[500px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl">Welcome! &#127934;</CardTitle>
          <CardDescription>
            Click the button below to enter the dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col px-10 gap-4">
          <p className="text-base">
            This is a tennis grand slam title dashboard to display data
            visualizations for players in the Open Era.
          </p>
          <p className="text-sm">
            WIP: I started building this project to expand my Next.js 13
            knowledge (app router/server components) as well as try out
            shadcn/ui (Tailwind/Radix) modern styling approach.
          </p>

          <div className="pb-2">
            <p className="mb-1">Feature / Functionality Roadmap:</p>
            <ul className="list-disc ml-8 text-sm flex flex-col gap-1">
              <li>Dynamic routes for each player to provide additional info</li>
              <li>Framer Motion animations</li>
              <li>US Open specific content for the upcoming tournament</li>
              <li>Additional filters for more granularity (ex. Country)</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <EnterDashBtn />
        </CardFooter>
      </Card>
    </div>
  );
}
