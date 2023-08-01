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
        <CardContent className="flex flex-col px-6 sm:px-10 gap-4">
          <p className="text-sm sm:text-base">
            This is a tennis grand slam title dashboard to display data
            visualizations for players in the Open Era.
          </p>

          <div className="pb-2">
            <p className="mb-1 text-sm sm:text-base">Feature Roadmap:</p>
            <ul className="list-disc ml-5 sm:ml-8 text-xs sm:text-sm flex flex-col gap-1">
              <li>User profiles for saving preferences and searches</li>
              <li>More stats / data on each player page</li>
              <li>US Open specific content for the upcoming major</li>
              <li>Additional data visualizations and filtering</li>
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
