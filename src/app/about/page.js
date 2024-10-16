export default function About() {
    return (
        <div>
            <h1>About</h1>
            <p>
                This is a website for visually comparing countries on a set of indicators
                reported by the World Bank.
            </p>
            <ul>
                <li>
                    <p>You can select countries by clicking on them in the map.</p>
                </li>
                <li>
                    <p>
                        You can analyze the selected countries by clicking the "Analyze
                        selected" button. This will take you to a dashboard where you can
                        compare the selected countries on a set of indicators.
                    </p>
                </li>
                <li>
                    <p>
                        You can clear the selected countries by clicking the "Clear selected"
                        button.
                    </p>
                </li>
                <li>
                    <p>
                        You can navigate back to the map clicking the map entry in the navbar
                        in the dashboard.
                    </p>
                </li>
                <li>
                    <p>
                        If data seems to be missing in the charts in the dashboard, it is
                        because the data is not available for the selected countries during
                        those years.
                    </p>
                </li>
            </ul>
        </div>
    );
}
