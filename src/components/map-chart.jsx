import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Tooltip } from "react-tooltip";

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

export default function MapChart(props) {
    // Deconstruct the props
    const { countries, setCountries } = props;

    return (
        <div>
            <Tooltip id="country-name" float="true" />
            <ComposableMap projection="geoEqualEarth">
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies
                            .filter(
                                (geo) =>
                                    geo.properties.name !== "Antarctica" &&
                                    geo.properties.name !== "Fr. S. Antarctic Lands" &&
                                    geo.properties.name !== "Falkland Is."
                            )
                            .map((geo) => (
                                <Geography
                                    data-tooltip-id="country-name"
                                    data-tooltip-content={geo.properties.name}
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill={
                                        countries.includes(geo.properties.name)
                                            ? "#22c55e"
											/* Set color depending on theme */
                                            : "black"
                                    }
                                    stroke="gray"
                                    strokeWidth={0.5}
                                    onClick={() => {
                                        if (countries.includes(geo.properties.name)) {
                                            setCountries(
                                                countries.filter(
                                                    (c) => c !== geo.properties.name
                                                )
                                            );
                                        } else {
                                            setCountries([...countries, geo.properties.name]);
                                        }
                                    }}
                                    className="hover:fill-emerald-400"
                                />
                            ))
                    }
                </Geographies>
            </ComposableMap>
        </div>
    );
}
