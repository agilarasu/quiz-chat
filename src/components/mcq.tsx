"use client";
import { memo, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from 'lucide-react';

const MCQ = memo(({ question, options, hint, onAnswer }: { question: string; options: string[]; hint: string; onAnswer: (answer: string) => void }) => {
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
    const [showHint, setShowHint] = useState(false);

    const handleAnswer = (index: number) => {
        setSelectedAnswerIndex(index);
    };

    const handleSubmit = () => {
        if (selectedAnswerIndex !== null) {
            onAnswer(options[selectedAnswerIndex]);
        }
    };

    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-semibold">{question}</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setShowHint(!showHint)}>
                    <Lightbulb className={showHint ? "text-yellow-500" : "text-gray-500"} />
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {options.map((option, index) => (
                        <Button
                            key={index}
                            variant={selectedAnswerIndex === index ? "default" : "outline"}
                            className="w-full justify-start text-left"
                            onClick={() => handleAnswer(index)}
                        >
                            {option}
                        </Button>
                    ))}
                </div>
                {showHint && (
                    <div className="mt-4 p-3 bg-yellow-100 rounded-md">
                        <span className="font-semibold">Hint:</span> {hint}
                    </div>
                )}
            </CardContent>
            <CardFooter>
                <Button
                    className="w-full"
                    onClick={handleSubmit}
                    disabled={selectedAnswerIndex === null}
                >
                    Submit
                </Button>
            </CardFooter>
        </Card>
    );
});

MCQ.displayName = 'MCQ';

export default MCQ;

