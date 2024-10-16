"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

export function MultilineChart(props) {
    // Destructure the props
    let { indicatorName, data } = props;
    // Titlecase the indicator name and replace underscores with spaces
    indicatorName = indicatorName
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

    // Loop through the data objects and create a list of objects formatted like this: { year: "year", country1: value, country2: value, etc. }
    const chartData = Object.entries(data).map(([year, values]) => {
        const obj = { year };
        Object.entries(values).forEach(([country, value]) => {
            obj[country] = value;
        });
        return obj;
    });
    // Set first and last year
    const firstYear = chartData[0].year;
    const lastYear = chartData[chartData.length - 1].year;

    const chartConfig = {};

    const colors = [
        "#8884d8", // Light purple
        "#82ca9d", // Green
        "#ffc658", // Yellow
        "#ff7300", // Orange
        "#413ea0", // Dark blue
        "#ff4040", // Red
        "#00c49f", // Teal
        "#0088FE", // Light blue
        "#FFBB28", // Gold
    ];

    // Function that makes the numbers readable
    function formatNumber(number) {
        // If the number is less than 10, return it rounded to 2 decimal places
        if (number < 10) {
            return number.toFixed(2);
        }
        // If the number is bigger than 1 million, return it in millions
        if (number > 1000000) {
            return (number / 1000000).toFixed(2) + "M";
        }
        // If the number is bigger than 1 billion return it in billions
        if (number > 1000000000) {
            return (number / 1000000000).toFixed(2) + "B";
        }
        // If the number is bigger than 1 trillion return it in trillions
        if (number > 1000000000000) {
            return (number / 1000000000000).toFixed(2) + "T";
        }
        return number;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{indicatorName}</CardTitle>
                <CardDescription>
                    {firstYear} - {lastYear}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="year"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        {/* Create a Line component for each country */}
                        {Object.keys(data[Object.keys(data)[0]]).map((country, index) => (
                            <Line
                                key={country}
                                type="monotone"
                                dataKey={country}
                                stroke={colors[index % colors.length]}
                                strokeWidth={2}
                                dot={false}
                            />
                        ))}
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            Source: World Bank.
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}
