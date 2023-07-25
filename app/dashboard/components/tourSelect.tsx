"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { atom, useAtom } from "jotai";

export const tourAtom = atom("mens");

const TourSelect = () => {
  const [tour, setTour] = useAtom(tourAtom);
  console.log(tour);

  return (
    <Select value={tour} onValueChange={setTour}>
      <SelectTrigger className="w-[130px] text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="mens" className="text-xs">
          Mens (ATP)
        </SelectItem>
        <SelectItem value="womens" className="text-xs">
          Womens (WTA)
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default TourSelect;
