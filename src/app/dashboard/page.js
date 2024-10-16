"use client";
import { useCountryStore } from "@/stores/country";
import { useEffect, useState } from "react";
import { MultilineChart } from "@/components/multiline-chart";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Dashboard() {
    // Get the relevant data for the countries using defined API calls
    // Population, GDP, GDP per capita, birth rate, etc.
    const { countries } = useCountryStore();
    const [countryData, setCountryData] = useState([]);
    // Fetch country data from the backend API
    useEffect(() => {
        async function fetchCountryData() {
            let response = await fetch("http://localhost:3001/indicators", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    countries: countries,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setCountryData(Object.entries(data));
            } else {
                console.error("Failed to fetch data");
            }
        }
        fetchCountryData();
    }, [countries]); // Add countries as a dependency to make the effect to re-run when countries change

    if (countries.length === 0) {
        return (
            <div className="flex h-screen flex-col justify-center items-center">
                <h1>Select at least one country to analyze.</h1>
                <Link href="/">
                    <Button variant="destructive" className="my-2">
                        Go to map
                    </Button>
                </Link>
            </div>
        );
    } else {
        return (
            <div>
                <h1 className="flex justify-center mb-2">Comparing: {countries.map((name) => name + ", ")}</h1>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                    {/* Create a multiline chart for each indicator in countryData */}
                    {countryData.map((indicator) => (
                        <MultilineChart
                            key={indicator[0]}
                            indicatorName={indicator[0]}
                            data={indicator[1]}
                        />
                    ))}
                </div>
                <div>
                    <Link href="/">
                        <Button variant="secondary" className="my-4">
                            Return to Map
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }
}
