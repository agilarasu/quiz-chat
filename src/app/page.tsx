'use client';

import { useChat } from 'ai/react';
import MCQ from '@/components/mcq';
import QuizSettings from '@/components/quiz-settings';
import Result from '@/components/result';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from 'react';

export default function Page() {
  const { messages, setMessages, reload, input, handleInputChange, handleSubmit, append, isLoading } = useChat();
  const [quizStarted, setQuizStarted] = useState(false);


  // Convert file to a Data URL
  const convertToDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('File reading failed'));
      reader.readAsDataURL(file);
    });
  };

  const handleStartQuiz = async (topic: string, questionCount: number, file: any) => {
    setQuizStarted(true);
    if (file) {

      // Convert the file to a Data URL
      const dataURL = await convertToDataURL(file);

      // Create the attachment object
      const attachment = {
        name: file.name, // File name
        contentType: file.type, // File MIME type
        url: dataURL, // Base64-encoded Data URL
      };

      setMessages([
        {
          id: Date.now().toString(),
          role: 'user',
          content: `Start quiz on ${topic} with ${questionCount} questions. Refer the attachment for more context`,
          experimental_attachments: [attachment]
        },
      ]);
    }
    else {
      setMessages([
        { id: Date.now().toString(), role: 'user', content: `Start quiz on ${topic} with ${questionCount} questions` },
      ]);
    }
    // The Saviour !!!
    reload();
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
                    if (state === 'result') {
                      if (toolName === 'askMCQ') {
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
                      } else if (toolName === 'showResult') {
                        const { result } = toolInvocation;
                        return (
                          <div key={toolCallId} className="mt-2">
                            <Result score={result.score} maxScore={result.maxScore} />
                          </div>
                        );
                      }
                    } else if (toolName === 'askMCQ') {
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
            {
              isLoading && (
                <div ref={el => el?.scrollIntoView({ behavior: 'smooth', block: 'start' })} />
                // behaviour: smooth is used to scroll smoothly to the bottom of the chat window
                // block: start is used to scroll to the top of the new message
              )
            }
          </ScrollArea>
          <form onSubmit={handleSubmit} className="flex gap-2" id='chat-form'>
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
