import { Gantt, Willow } from "@svar-ui/react-gantt";
import "@svar-ui/react-gantt/all.css";
import { useRef } from "react";

const tasks = [
    {
        id: 20,
        text: "New Task",
        start: new Date(2024, 5, 11),
        end: new Date(2024, 6, 12),
        duration: 1,
        progress: 2,
        type: "task",
        lazy: false,
    },
    {
        id: 47,
        text: "[1] Master project",
        start: new Date(2024, 5, 12),
        end: new Date(2024, 7, 12),
        duration: 8,
        progress: 0,
        parent: 0,
        type: "summary",
    },
    {
        id: 22,
        text: "Task",
        start: new Date(2024, 7, 11),
        end: new Date(2024, 8, 12),
        duration: 8,
        progress: 0,
        parent: 47,
        type: "task",
    },
    {
        id: 21,
        text: "New Task 2",
        start: new Date(2024, 7, 10),
        end: new Date(2024, 8, 12),
        duration: 3,
        progress: 0,
        type: "task",
        lazy: false,
    },
];

const links = [{ id: 1, source: 20, target: 21, type: "e2e" }];

const scales = [
    { unit: "month", step: 1, format: "MMMM yyy" },
    { unit: "day", step: 1 },
];

export default function App() {
    const containerRef = useRef<HTMLDivElement>(null);

    const toggleFullscreen = () => {
        if (!containerRef.current) return;

        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };


    const dayStyle = (date: Date) => {
        const day = date.getDay() === 5 || date.getDay() === 6;
        return day ? "sday" : "";
    };

    function hoursTemplate(a: Date, b: Date) {
        return `${new Date(a).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - ${new Date(b).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    }

    const zoomConfig = {
        level: 3,
        levels: [
            {
                minCellWidth: 200,
                maxCellWidth: 400,
                scales: [{ unit: "year", step: 1, format: "yyyy" }],
            },
            {
                minCellWidth: 150,
                maxCellWidth: 400,
                scales: [
                    { unit: "year", step: 1, format: "yyyy" },
                    { unit: "quarter", step: 1, format: "QQQQ" },
                ],
            },
            {
                minCellWidth: 250,
                maxCellWidth: 350,
                scales: [
                    { unit: "quarter", step: 1, format: "QQQQ" },
                    { unit: "month", step: 1, format: "MMMM yyy" },
                ],
            },
            {
                minCellWidth: 100,
                scales: [
                    { unit: "month", step: 1, format: "MMMM yyy" },
                    { unit: "week", step: 1, format: "'week' w" },
                ],
            },
            {
                maxCellWidth: 200,
                scales: [
                    { unit: "month", step: 1, format: "MMMM yyy" },
                    { unit: "day", step: 1, format: "d", css: dayStyle },
                ],
            },
            {
                minCellWidth: 25,
                maxCellWidth: 100,
                scales: [
                    { unit: "day", step: 1, format: "MMM d", css: dayStyle },
                    { unit: "hour", step: 6, format: hoursTemplate },
                ],
            },
            {
                maxCellWidth: 120,
                scales: [
                    { unit: "day", step: 1, format: "MMM d", css: dayStyle },
                    { unit: "hour", step: 1, format: "HH:mm" },
                ],
            },
        ],
    };




    return (
        <div ref={containerRef} className="">
            <button onClick={toggleFullscreen} className=" z-10 bg-blue-500 text-white px-4 py-2 rounded">
                Toggle Fullscreen
            </button>
            <Willow >
                <Gantt
                    tasks={tasks}
                    links={links}
                    scales={scales}
                    readonly
                    zoom={zoomConfig as any}
                />
            </Willow>
        </div>
    )
}