import React, { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import { CompareContext } from "../utils/comparecontext";
import { DataContext } from "../utils/dataContext";
import { Groq } from "groq-sdk";
import { GROQ_API_KEY } from "../secrets/env";

const ComparisonChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [userPreferences, setUserPreferences] = useState({
    priceRange: "",
    priority: "",
    usage: "",
    additionalNeeds: "",
  });
  const messagesEndRef = useRef(null);
  const { compareList } = useContext(CompareContext);
  const { data } = useContext(DataContext);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef(null);

  // Initialize Groq client
  const groq = new Groq({
    apiKey: GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting when chatbot is opened
      setMessages([
        {
          type: "bot",
          content:
            "Hello! I'm your comparison assistant. I can help you analyze and compare the machines you've selected. What would you like to know?",
        },
      ]);
    }
  }, [isOpen]);

  // Reset messages when comparison list changes
  useEffect(() => {
    if (compareList.length > 0) {
      setMessages([
        {
          type: "bot",
          content:
            "I see you've selected some machines for comparison. What would you like to know about them?",
        },
      ]);
    }
  }, [compareList]);

  const handleDragStart = (e) => {
    setIsDragging(true);
    const rect = dragRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    dragRef.current.style.cursor = "grabbing";
    dragRef.current.style.zIndex = 1000;
    dragRef.current.style.position = "absolute";
    dragRef.current.style.left = `${e.clientX - offsetX}px`;
    dragRef.current.style.top = `${e.clientY - offsetY}px`;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (dragRef.current) {
      dragRef.current.style.cursor = "grab";
      dragRef.current.style.zIndex = 50;
    }
  };

  const handleDrag = (e) => {
    if (isDragging && dragRef.current) {
      const rect = dragRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;
      dragRef.current.style.left = `${e.clientX - offsetX}px`;
      dragRef.current.style.top = `${e.clientY - offsetY}px`;
    }
  };

  const analyzeMachines = (machines, preferences) => {
    if (!machines || machines.length === 0) {
      return "I don't see any machines selected for comparison. Please add some machines to compare first.";
    }

    let analysis = [];

    // Price analysis
    if (preferences.priceRange) {
      const prices = machines
        .map((m) => {
          const price = Object.entries(m).find(([key]) =>
            key.toLowerCase().includes("price")
          );
          return price ? parseFloat(price[1]) : null;
        })
        .filter((p) => !isNaN(p));

      if (prices.length > 0) {
        const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);

        analysis.push(
          `The machines you're comparing range from ₹${minPrice.toLocaleString()} to ₹${maxPrice.toLocaleString()}, with an average price of ₹${avgPrice.toLocaleString()}.`
        );

        if (preferences.priceRange === "budget" && avgPrice > 50000) {
          analysis.push(
            "Note: These machines are on the higher end of the price spectrum. Would you like to see some more budget-friendly options?"
          );
        } else if (preferences.priceRange === "premium" && avgPrice < 30000) {
          analysis.push(
            "These machines are relatively affordable. Would you like to see some premium options with more advanced features?"
          );
        }
      }
    }

    // Performance analysis
    if (preferences.priority === "performance") {
      const performanceMetrics = machines.map((machine) => {
        const metrics = Object.entries(machine)
          .filter(([key]) =>
            ["power", "speed", "capacity", "efficiency"].some((term) =>
              key.toLowerCase().includes(term)
            )
          )
          .map(([key, value]) => ({ key, value: parseFloat(value) }));
        return { machine: machine.MachineName || "Unknown", metrics };
      });

      if (performanceMetrics.length > 0) {
        analysis.push("\nPerformance Analysis:");
        performanceMetrics.forEach(({ machine, metrics }) => {
          metrics.forEach(({ key, value }) => {
            if (!isNaN(value)) {
              analysis.push(`- ${machine}: ${key} = ${value}`);
            }
          });
        });
      }
    }

    // Usage analysis
    if (preferences.usage === "heavy") {
      const durabilityMetrics = machines.map((machine) => {
        const metrics = Object.entries(machine)
          .filter(([key]) =>
            ["durability", "warranty", "life"].some((term) =>
              key.toLowerCase().includes(term)
            )
          )
          .map(([key, value]) => ({ key, value }));
        return { machine: machine.MachineName || "Unknown", metrics };
      });

      if (durabilityMetrics.length > 0) {
        analysis.push("\nDurability Analysis for Heavy Usage:");
        durabilityMetrics.forEach(({ machine, metrics }) => {
          metrics.forEach(({ key, value }) => {
            analysis.push(`- ${machine}: ${key} = ${value}`);
          });
        });
      }
    }

    return (
      analysis.join("\n") ||
      "Here's a general comparison of the selected machines:\n" +
        machines
          .map(
            (m) =>
              `- ${m.MachineName || "Unknown"}: ${Object.entries(m)
                .filter(([key]) => !["MachineName", "Image URL"].includes(key))
                .map(([key, value]) => `${key}: ${value}`)
                .join(", ")}`
          )
          .join("\n")
    );
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      type: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      // Prepare context for the chatbot - only use current state
      const context = {
        machines: compareList,
        preferences: userPreferences,
        allData: data,
      };

      // Create a prompt for Groq that focuses only on current context
      const prompt = `You are a helpful assistant for comparing food processing machines. 
      Current context:
      - Selected machines for comparison: ${JSON.stringify(context.machines)}
      - User preferences: ${JSON.stringify(context.preferences)}
      - Available machine data: ${JSON.stringify(context.allData)}
      
      User message: ${input}
      
      Please provide a helpful response focusing ONLY on the currently selected machines and available data. Do not reference any previous conversations or comparisons.`;

      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant for comparing food processing machines. Provide detailed, accurate comparisons based on the current selection of machines and user preferences. Do not reference any previous conversations.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        max_tokens: 1024,
      });

      const botMessage = {
        type: "bot",
        content:
          completion.choices[0]?.message?.content ||
          "I apologize, but I couldn't generate a response at this time.",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content:
            "I apologize, but I'm having trouble processing your request right now. Please try again later.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handlePreferenceChange = (e) => {
    const { name, value } = e.target;
    setUserPreferences((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          <span>Compare Assistant</span>
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-xl w-96 h-[600px] flex flex-col">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Comparison Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Preferences Section */}
          <div className="p-4 border-b">
            <div className="space-y-3">
              <select
                name="priceRange"
                value={userPreferences.priceRange}
                onChange={handlePreferenceChange}
                className="w-full p-2 border rounded-md text-sm"
              >
                <option value="">Select Price Range</option>
                <option value="budget">Budget Friendly</option>
                <option value="mid">Mid Range</option>
                <option value="premium">Premium</option>
              </select>

              <select
                name="priority"
                value={userPreferences.priority}
                onChange={handlePreferenceChange}
                className="w-full p-2 border rounded-md text-sm"
              >
                <option value="">Select Priority</option>
                <option value="performance">Performance</option>
                <option value="efficiency">Efficiency</option>
                <option value="durability">Durability</option>
                <option value="cost">Cost Effectiveness</option>
              </select>

              <select
                name="usage"
                value={userPreferences.usage}
                onChange={handlePreferenceChange}
                className="w-full p-2 border rounded-md text-sm"
              >
                <option value="">Select Usage</option>
                <option value="light">Light Usage</option>
                <option value="medium">Medium Usage</option>
                <option value="heavy">Heavy Usage</option>
              </select>

              <input
                type="text"
                name="additionalNeeds"
                value={userPreferences.additionalNeeds}
                onChange={handlePreferenceChange}
                placeholder="Additional Requirements"
                className="w-full p-2 border rounded-md text-sm"
              />
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {message.type === "bot" ? (
                    <pre
                      style={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}
                    >
                      {message.content.split("\n").map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                    </pre>
                  ) : (
                    message.content
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="1"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparisonChatbot;
