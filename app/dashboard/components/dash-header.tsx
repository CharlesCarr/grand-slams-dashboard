import TourSelect from "./tour-select";
import { ModeToggle } from "@/components/mode-toggle";

const DashHeader = () => {
  return (
    <header className="flex flex-col-reverse sm:flex-row w-full justify-between items-center">
      <h1 className="text-4xl sm:text-4xl font-bold tracking-tight  mt-4 sm:mt-0">
        Grand Slam Titles
      </h1>
      <div className="flex items-center gap-3">
        <TourSelect />
        <ModeToggle />
      </div>
    </header>
  );
};

export default DashHeader;
