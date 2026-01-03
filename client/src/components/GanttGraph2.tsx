import { Gantt, Willow, Tooltip } from "@svar-ui/react-gantt";
import "@svar-ui/react-gantt/all.css";
import { useRef, useState } from "react";
import { Button } from "./ui/button";

export const ganttTasks = [
    /* =======================
       PARENT 1 : TASKS & ACTIONS
    ======================== */
    {
        id: 100,
        text: "Tasks & Actions",
        financeText: "",
        start: new Date(2024, 5, 10),
        end: new Date(2024, 8, 30),
        progress: 40,
        type: "summary",
        parent: 0,
    },

    {
        id: 101,
        text: "Upload Tender Documents — —",
        financeText: "—",
        start: new Date(2024, 5, 10),
        end: new Date(2024, 5, 12),
        progress: 100,
        type: "task",
        parent: 100,
    },
    {
        id: 102,
        text: "Review Extracted Tender Data — EMD ₹90,000",
        financeText: "EMD ₹90,000",
        start: new Date(2024, 5, 13),
        end: new Date(2024, 5, 15),
        progress: 100,
        type: "task",
        parent: 100,
    },
    {
        id: 103,
        text: "Tender Secured — Bid ₹45,00,000",
        financeText: "Bid ₹45,00,000",
        start: new Date(2024, 5, 16),
        end: new Date(2024, 5, 18),
        progress: 100,
        type: "task",
        parent: 100,
    },
    {
        id: 104,
        text: "Upload LOA / Work Order — Advance ₹4,50,000",
        financeText: "Advance ₹4,50,000",
        start: new Date(2024, 5, 19),
        end: new Date(2024, 5, 22),
        progress: 100,
        type: "task",
        parent: 100,
    },
    {
        id: 105,
        text: "Daily Progress Tracking — Execution Phase",
        financeText: "Execution Phase",
        start: new Date(2024, 5, 23),
        end: new Date(2024, 7, 31),
        progress: 40,
        type: "task",
        parent: 100,
    },
    {
        id: 106,
        text: "Running Bill Submitted — ₹12,00,000",
        financeText: "₹12,00,000",
        start: new Date(2024, 7, 10),
        end: new Date(2024, 7, 12),
        progress: 0,
        type: "task",
        parent: 100,
    },
    {
        id: 107,
        text: "Payment Received — ₹11,40,000",
        financeText: "₹11,40,000",
        start: new Date(2024, 7, 20),
        end: new Date(2024, 7, 22),
        progress: 0,
        type: "task",
        parent: 100,
    },
    {
        id: 108,
        text: "Project Closure — Final Settlement",
        financeText: "Final Settlement",
        start: new Date(2024, 8, 20),
        end: new Date(2024, 8, 30),
        progress: 0,
        type: "task",
        parent: 100,
    },

    /* =======================
       PARENT 2 : FINANCES
    ======================== */
    {
        id: 200,
        text: "Finances",
        financeText: "",
        start: new Date(2024, 5, 23),
        end: new Date(2024, 8, 30),
        progress: 55,
        type: "summary",
        parent: 0,
    },

    {
        id: 201,
        text: "Material Procurement — ₹42,000 | Cement",
        financeText: "₹42,000 | Cement",
        start: new Date(2024, 6, 1),
        end: new Date(2024, 6, 5),
        progress: 100,
        type: "task",
        parent: 200,
    },
    {
        id: 202,
        text: "Labour Expenses — ₹10,500 | Cash",
        financeText: "₹10,500 | Cash",
        start: new Date(2024, 6, 2),
        end: new Date(2024, 6, 6),
        progress: 100,
        type: "task",
        parent: 200,
    },
    {
        id: 203,
        text: "Machine & Transport — ₹9,500",
        financeText: "₹9,500",
        start: new Date(2024, 6, 3),
        end: new Date(2024, 6, 7),
        progress: 100,
        type: "task",
        parent: 200,
    },
    {
        id: 204,
        text: "GST & Taxes — ₹2,10,000",
        financeText: "₹2,10,000",
        start: new Date(2024, 8, 10),
        end: new Date(2024, 8, 15),
        progress: 0,
        type: "task",
        parent: 200,
    },
    {
        id: 205,
        text: "Final Profit — ₹6,80,000",
        financeText: "₹6,80,000",
        start: new Date(2024, 8, 20),
        end: new Date(2024, 8, 30),
        progress: 0,
        type: "task",
        parent: 200,
    },
];

export default function App() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [api, setApi] = useState<any>(null);

    const toggleFullscreen = () => {
        if (!containerRef.current) return;

        if (!isFullscreen) {
            containerRef.current.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
                setIsFullscreen(false);
            });
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullscreen(false);
            }
        }
    };

    return (
        <div ref={containerRef} className="bg-white p-4  shadow-md">

            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">City Center Mall Renovation</h2>

                <Button
                    onClick={toggleFullscreen}
                // variant="outline"
                >
                    {isFullscreen ? 'Exit Fullscreen' : 'Full Screen'}
                </Button>
            </div>
            <Willow >
                <Tooltip api={api}>
                    <Gantt
                        readonly
                        tasks={ganttTasks}
                        zoom={true}
                        init={setApi}
                    />
                </Tooltip>
            </Willow>
        </div>
    )
}