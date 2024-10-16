"use client";
import MapChart from "@/components/map-chart";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useCountryStore } from "@/stores/country";

export default function Home() {
	const { countries, setCountries } = useCountryStore();
    const router = useRouter();

    return (
        <div>
            <Button onClick={() => setCountries([])}>Clear selected</Button>
            <Button
                className="ml-2"
                onClick={() => {
                    if (countries.length === 0) {
                        alert("Please select at least one country to analyze.");
                        return;
                    } else {
                        // Go to the dashboard page
                        router.push("/dashboard");
                    }
                }}
            >
                Analyze selected
            </Button>
			{/* Add function to search and select country */}
            <MapChart countries={countries} setCountries={setCountries} />
        </div>
    );
}
