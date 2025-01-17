"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface QuizSettingsProps {
    onStart: (topic: string, questionCount: number, file: any) => void;
}

export default function QuizSettings({ onStart }: QuizSettingsProps) {
    const [topic, setTopic] = useState("");
    const [questionCount, setQuestionCount] = useState<number>(5);
    const [file, setFile] = useState<any>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64 = reader.result as string;
                setFile({
                    name: selectedFile.name,
                    type: selectedFile.type,
                    content: base64.split(",")[1], // Strip the prefix
                });
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleStart = () => {
        if (topic) {
            onStart(topic, questionCount, file);
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Quiz Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="topic" className="text-sm font-medium">Topic of Interest</label>
                    <Input
                        id="topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="Enter your topic of interest"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="questionCount" className="text-sm font-medium">Number of Questions</label>
                    <Select value={questionCount.toString()} onValueChange={(value) => setQuestionCount(Number(value))}>
                        <SelectTrigger id="questionCount">
                            <SelectValue placeholder="Select number of questions" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <label htmlFor="file" className="text-sm font-medium">Upload File (Optional)</label>
                    <Input
                        id="file"
                        type="file"
                        accept=".pdf" // Restrict file types if needed
                        onChange={handleFileChange}
                    />
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full" onClick={handleStart} disabled={!topic}>
                    Start Quiz
                </Button>
            </CardFooter>
        </Card>
    );
}
