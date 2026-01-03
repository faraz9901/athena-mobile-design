import { useEffect, useMemo, useRef, useState } from "react"

const tasks = [
    { id: "1", label: "Planning", start: "2026-01-01", end: "2026-01-05" },
    { id: "2", label: "Design", start: "2026-01-04", end: "2026-01-10", color: "bg-blue-500" },
    { id: "3", label: "Development", start: "2026-01-08", end: "2026-01-20", color: "bg-green-500" },
]

export function GanttChart() {
    const containerRef = useRef<HTMLDivElement>(null)

    const [isFullscreen, setIsFullscreen] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [offsetX, setOffsetX] = useState(0)
    const [startDragX, setStartDragX] = useState(0)

    /* ---------------- Timeline calculations ---------------- */

    const { startDate, totalDays } = useMemo(() => {
        const starts = tasks.map(t => new Date(t.start).getTime())
        const ends = tasks.map(t => new Date(t.end).getTime())
        const start = new Date(Math.min(...starts))
        const end = new Date(Math.max(...ends))
        const days = Math.ceil((end.getTime() - start.getTime()) / 86400000) + 1
        return { startDate: start, totalDays: days }
    }, [])

    const dayWidth = 40

    /* ---------------- Fullscreen ---------------- */

    const toggleFullscreen = async () => {
        if (!document.fullscreenElement && containerRef.current) {
            await containerRef.current.requestFullscreen()
            setOffsetX(0)
            setIsDragging(false)
            setIsFullscreen(true)
        } else {
            await document.exitFullscreen()
            setIsFullscreen(false)
        }
    }

    useEffect(() => {
        const handler = () => {
            if (!document.fullscreenElement) setIsFullscreen(false)
        }
        document.addEventListener("fullscreenchange", handler)
        return () => document.removeEventListener("fullscreenchange", handler)
    }, [])

    /* ---------------- Drag (X-axis only) ---------------- */

    const onMouseDown = (e: React.MouseEvent) => {
        if (isFullscreen) return
        setIsDragging(true)
        setStartDragX(e.clientX - offsetX)
    }

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || isFullscreen) return
        setOffsetX(e.clientX - startDragX)
    }

    const onMouseUp = () => setIsDragging(false)

    /* ---------------- Render ---------------- */

    return (
        <div
            ref={containerRef}
            className={`relative bg-white border rounded-lg shadow-sm 
        ${isFullscreen ? "w-screen h-screen" : "h-[300px] overflow-hidden"}`}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b bg-gray-50 z-50">
                <h3 className="font-semibold">Gantt Graph</h3>
                <button
                    onClick={toggleFullscreen}
                    className="text-sm px-3 py-1 rounded-md border hover:bg-gray-100"
                >
                    {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                </button>
            </div>

            {/* Timeline Container */}
            <div
                className="relative w-full h-full overflow-y-auto overflow-x-hidden cursor-grab active:cursor-grabbing"
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
            >
                <div
                    className="absolute top-0 left-0"
                    style={{
                        transform: `translateX(${offsetX}px)`,
                        width: totalDays * dayWidth + 200,
                    }}
                >
                    {/* Day headers */}
                    <div className="flex sticky top-0 z-10 bg-white">
                        <div className="w-48 shrink-0 border-r bg-gray-50" />
                        {Array.from({ length: totalDays }).map((_, i) => {
                            const d = new Date(startDate)
                            d.setDate(d.getDate() + i)
                            return (
                                <div
                                    key={i}
                                    className="w-[40px] text-[10px] text-center border-r py-1 text-gray-500"
                                >
                                    {d.toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </div>
                            )
                        })}
                    </div>

                    {/* Tasks */}
                    {tasks.map(task => {
                        const taskStart =
                            (new Date(task.start).getTime() - startDate.getTime()) / 86400000
                        const taskEnd =
                            (new Date(task.end).getTime() - startDate.getTime()) / 86400000

                        return (
                            <div key={task.id} className="flex items-center h-12 border-b">
                                <div className="w-48 px-2 text-sm truncate border-r">
                                    {task.label}
                                </div>

                                <div className="relative flex-1 h-full">
                                    <div
                                        className={`absolute top-2 h-6 rounded-md text-xs text-white px-2 flex items-center
                      ${task.color || "bg-indigo-500"}`}
                                        style={{
                                            left: taskStart * dayWidth,
                                            width: (taskEnd - taskStart + 1) * dayWidth,
                                        }}
                                    >
                                        {task.label}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
