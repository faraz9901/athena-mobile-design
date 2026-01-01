import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SmartInputProps extends React.ComponentProps<typeof Input> {
    suggestions?: string[];
    /**
     * Optional label shown at top of suggestion list.
     */
    suggestionsLabel?: string;
    /**
     * Control whether the suggestions icon + popup are shown.
     * Defaults to true.
     */
    enableSuggestions?: boolean;
}

export const SmartInput = React.forwardRef<HTMLInputElement, SmartInputProps>(
    (
        {
            className,
            suggestions,
            suggestionsLabel = "Extracted values",
            enableSuggestions = true,
            ...props
        },
        ref
    ) => {
        const hasSuggestions = enableSuggestions && !!suggestions && suggestions.length > 0;

        const handleSelect = (value: string) => {
            if (props.onChange) {
                const event = {
                    target: { value },
                } as React.ChangeEvent<HTMLInputElement>;
                props.onChange(event);
            }
        };

        return (
            <div className="relative flex items-center">
                <Input
                    ref={ref}
                    className={cn("pr-10", className)}
                    {...props}
                />
                {hasSuggestions && (
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-1.5 h-7 w-7 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10"
                            >
                                <Sparkles className="h-3.5 w-3.5" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent side="top" align="end" className="w-72 p-3 space-y-2">
                            <div className="flex items-center justify-between">
                                <p className="text-xs font-medium text-muted-foreground">{suggestionsLabel}</p>
                            </div>
                            <div className="space-y-1 max-h-60 overflow-auto">
                                {suggestions!.map((value, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => handleSelect(value)}
                                        className="w-full text-left text-xs px-2 py-1.5 rounded-md hover:bg-secondary/60 border border-transparent hover:border-border/70 transition-colors"
                                    >
                                        <div className="line-clamp-2 text-foreground">{value}</div>
                                    </button>
                                ))}
                            </div>
                        </PopoverContent>
                    </Popover>
                )}
            </div>
        );
    }
);

SmartInput.displayName = "SmartInput";
