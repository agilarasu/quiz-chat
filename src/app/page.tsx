'use client';

import { useChat } from 'ai/react';
import MCQ from '@/components/mcq';
import QuizSettings from '@/components/quiz-settings';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from 'react';

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit, append } = useChat();
  const [quizStarted, setQuizStarted] = useState(false);

  const handleStartQuiz = (topic: string, questionCount: number) => {
    setQuizStarted(true);
    append({
      role: 'user',
      content: `Start a quiz about ${topic} with ${questionCount} questions.`
    });
  };

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto p-4">
      {!quizStarted ? (
        <QuizSettings onStart={handleStartQuiz} />
      ) : (
        <>
          <ScrollArea className="flex-grow mb-4 p-4 border rounded-lg">
            {messages.map(message => (
              <div key={message.id} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                  {message.content}
                </div>
                <div>
                  {message.toolInvocations?.map(toolInvocation => {
                    const { toolName, toolCallId, state } = toolInvocation;
                    if (state === 'result' && toolName === 'askMCQ') {
                      const { result } = toolInvocation;
                      return (
                        <div key={toolCallId} className="mt-2">
                          <MCQ 
                            question={result.question} 
                            options={result.options}
                            hint={result.hint}
                            onAnswer={answer => {
                              append({
                                role: 'user',
                                content: `My answer is : ${answer}`
                              });
                            }}
                          /> 
                        </div>
                      );
                    } else if (state !== 'result' && toolName === 'askMCQ') {
                      return (
                        <div key={toolCallId} className="mt-2 text-gray-500">
                          Loading next question...
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            ))}
          </ScrollArea>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type a message..."
              className="flex-grow"
            />
            <Button type="submit">Send</Button>
          </form>
        </>
      )}
    </div>
  );
}
